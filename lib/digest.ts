import { Redis } from "@upstash/redis";
import OpenAI from "openai";
import { SOURCES, PRIORITY, type Category } from "./sources";
import { saveToArchive } from "./archive";

const redis = Redis.fromEnv();

type Item = {
  id: string;
  title: string;
  link: string;
  pubDate?: string;
  source: string;
  category: Category;
  weight: number;
  description?: string;
  summary?: string;
  whyItMatters?: string;
};

/**
 * Minimal XML text cleanup.
 *
 * We only need title/link/date from feeds, so don't try to parse
 * descriptions, media, author metadata, etc.
 */
function cleanText(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .trim();
}

function extractTag(
  xml: string,
  tag: string
): string | null {
  const regex = new RegExp(
    `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
    "i"
  );

  const match = xml.match(regex);

  return match ? cleanText(match[1]) : null;
}

function extractLink(block: string): string | null {
  // RSS <link>https://...</link>
  const rssLink = extractTag(block, "link");

  if (rssLink && /^https?:\/\//i.test(rssLink)) {
    return rssLink;
  }

  // Atom <link href="https://..." />
  const atomLink = block.match(
    /<link[^>]+href=["']([^"']+)["'][^>]*\/?>/i
  );

  if (atomLink) {
    return atomLink[1];
  }

  return null;
}

function parseMinimalFeed(xml: string): {
  title: string;
  link: string;
  date: string;
}[] {
  const items: {
    title: string;
    link: string;
    date: string;
  }[] = [];

  // RSS
  const rssItems =
    xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  for (const item of rssItems) {
    const title = extractTag(item, "title");
    const link = extractLink(item);

    const date =
      extractTag(item, "pubDate") ||
      extractTag(item, "published") ||
      extractTag(item, "updated") ||
      "";

    if (title && link) {
      items.push({
        title,
        link,
        date,
      });
    }
  }

  // Atom
  const atomEntries =
    xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];

  for (const entry of atomEntries) {
    const title = extractTag(entry, "title");
    const link = extractLink(entry);

    const date =
      extractTag(entry, "published") ||
      extractTag(entry, "updated") ||
      "";

    if (title && link) {
      items.push({
        title,
        link,
        date,
      });
    }
  }

  return items;
}

function itemId(link: string, title: string) {
  return `digest:item:${Buffer.from(
    `${link}|${title}`
  )
    .toString("base64url")
    .slice(0, 180)}`;
}

function clean(s = "") {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fetch one source.
 *
 * Deliberately does NOT use rss-parser.
 * We only extract title, link and date.
 */
async function fetchSource(
  source: (typeof SOURCES)[number]
): Promise<Item[]> {
  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000);

    let response: Response;

    try {
      response = await fetch(source.feed, {
        signal: controller.signal,
        cache: "no-store",
        headers: {
          "User-Agent":
            "SystemDesignDigest/1.0 (+personal learning aggregator)",
          Accept:
            "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        },
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(
        `Status code ${response.status}`
      );
    }

    const xml = await response.text();

    const parsed = parseMinimalFeed(xml);

    return parsed
      .slice(0, 15)
      .map((x) => ({
        id: itemId(x.link, x.title),
        title: clean(x.title || "Untitled"),
        link: x.link,
        pubDate: x.date || undefined,
        source: source.name,
        category: source.category,
        weight: source.weight,
      }))
      .filter(
        (x) =>
          x.link &&
          x.title &&
          /^https?:\/\//i.test(x.link)
      );
  } catch (e) {
    console.error(
      `Feed failed: ${source.name}`,
      e
    );

    return [];
  }
}

async function unseen(items: Item[]) {
  const result: Item[] = [];

  for (const item of items) {
    const exists = await redis.exists(item.id);

    if (!exists) {
      result.push(item);
    }
  }

  return result;
}

function score(x: Item) {
  const parsedDate = x.pubDate
    ? new Date(x.pubDate).getTime()
    : NaN;

  const ageHours = Number.isFinite(parsedDate)
    ? Math.max(
        0,
        (Date.now() - parsedDate) / 36e5
      )
    : 999;

  const freshness =
    Math.max(0, 24 - ageHours) / 24;

  const categoryBonus =
    (PRIORITY.indexOf(x.category) + 1) *
    0.25;

  return (
    x.weight +
    freshness * 3 +
    categoryBonus
  );
}

async function summarize(items: Item[]) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return items.map((x) => ({
      ...x,
      summary:
        "Open the article for the full explanation.",
      whyItMatters: "",
    }));
  }

  const client = new OpenAI({
    apiKey,
  });

  const model =
    process.env.OPENAI_MODEL || "gpt-5-mini";

  const prompt = `
You are creating a concise engineering learning digest
for a data scientist moving into system design, backend
engineering, databases, cloud and cybersecurity.

For each article produce:

1. A concise 2-sentence factual summary.
2. One sentence called "Why it matters", connecting it
   to production data/model systems when appropriate.

Do not invent facts.

Return ONLY valid JSON:
[
  {
    "id": "...",
    "summary": "...",
    "whyItMatters": "..."
  }
]

Articles:

${items
  .map(
    (x) =>
      `ID: ${x.id}
Title: ${x.title}
Source: ${x.source}
Category: ${x.category}`
  )
  .join("\n\n")}
`;

  try {
    const response =
      await client.responses.create({
        model,
        input: prompt,
      });

    const text =
      response.output_text || "[]";

    let parsed: any[] = [];

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = [];
    }

    return items.map((x) => {
      const y = parsed.find(
        (v) => v?.id === x.id
      );

      return {
        ...x,
        summary:
          y?.summary ||
          "Open the article for the full explanation.",
        whyItMatters:
          y?.whyItMatters || "",
      };
    });
  } catch (e) {
    console.error(
      "OpenAI summarization failed",
      e
    );

    return items.map((x) => ({
      ...x,
      summary:
        "Open the article for the full explanation.",
      whyItMatters: "",
    }));
  }
}

export async function buildDigest() {
  const feeds = (
    await Promise.all(
      SOURCES.map(fetchSource)
    )
  ).flat();

  const candidates =
    await unseen(feeds);

  candidates.sort(
    (a, b) => score(b) - score(a)
  );

  // Keep the digest balanced.
  const selected: Item[] = [];

  const categoryCounts =
    new Map<Category, number>();

  for (const item of candidates) {
    const count =
      categoryCounts.get(item.category) || 0;

    if (count >= 2) {
      continue;
    }

    selected.push(item);

    categoryCounts.set(
      item.category,
      count + 1
    );

    if (selected.length >= 8) {
      break;
    }
  }

  const enriched =
    await summarize(selected);

  // Mark only successfully selected items as seen.
  for (const item of selected) {
    await redis.set(
      item.id,
      "1",
      {
        ex: 60 * 60 * 24 * 60,
      }
    );
  }

  await saveToArchive(enriched);

  return enriched;
}

export function renderHtml(items: any[]) {
  const date =
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

  const grouped =
    new Map<string, any[]>();

  for (const x of items) {
    const arr =
      grouped.get(x.category) || [];

    arr.push(x);

    grouped.set(
      x.category,
      arr
    );
  }

  const sections =
    [...grouped.entries()]
      .map(
        ([category, rows]) => `
          <h2 style="font-size:18px;margin:26px 0 10px">
            ${category}
          </h2>

          ${rows
            .map(
              (x) => `
                <article style="margin:0 0 22px">
                  <div style="font-size:13px;color:#667085">
                    ${x.source}
                  </div>

                  <div style="font-size:17px;font-weight:600;margin:4px 0">
                    ${x.title}
                  </div>

                  ${
                    x.summary
                      ? `<p style="line-height:1.55;color:#344054">
                           ${x.summary}
                         </p>`
                      : ""
                  }

                  ${
                    x.whyItMatters
                      ? `<p style="line-height:1.55;color:#475467">
                           <b>Why it matters:</b>
                           ${x.whyItMatters}
                         </p>`
                      : ""
                  }

                  <a href="${x.link}">
                    Read source →
                  </a>
                </article>
              `
            )
            .join("")}
        `
      )
      .join("");

  return `
    <!doctype html>
    <html>
      <body style="font-family:Arial,sans-serif;max-width:760px;margin:40px auto;padding:0 20px">
        <h1>System Design & Security Digest</h1>

        <p style="color:#667085">
          ${date}
        </p>

        ${sections}
      </body>
    </html>
  `;
}
