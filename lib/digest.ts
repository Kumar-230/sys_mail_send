import Parser from "rss-parser";
import { Redis } from "@upstash/redis";
import OpenAI from "openai";
import { SOURCES, PRIORITY, type Category } from "./sources";
import { saveToArchive } from "./archive";

const parser = new Parser({ timeout: 8000 });
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
};

function clean(s = "") {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function itemId(link: string, title: string) {
  return `digest:item:${Buffer.from(`${link}|${title}`).toString("base64url").slice(0, 180)}`;
}

async function fetchSource(source: typeof SOURCES[number]): Promise<Item[]> {
  try {
    const feed = await parser.parseURL(source.feed);
    return (feed.items || []).slice(0, 15).map((x) => ({
      id: itemId(x.link || "", x.title || ""),
      title: clean(x.title || "Untitled"),
      link: x.link || "",
      pubDate: x.isoDate || x.pubDate,
      source: source.name,
      category: source.category,
      weight: source.weight,
      description: clean(x.contentSnippet || x.content || x.summary || "")
    })).filter(x => x.link && x.title);
  } catch (e) {
    console.error(`Feed failed: ${source.name}`, e);
    return [];
  }
}

async function unseen(items: Item[]) {
  const result: Item[] = [];
  for (const item of items) {
    const exists = await redis.exists(item.id);
    if (!exists) result.push(item);
  }
  return result;
}

function score(x: Item) {
  const ageHours = x.pubDate ? Math.max(0, (Date.now() - new Date(x.pubDate).getTime()) / 36e5) : 999;
  const freshness = Math.max(0, 24 - ageHours) / 24;
  const categoryBonus = (PRIORITY.indexOf(x.category) + 1) * 0.25;
  return x.weight + freshness * 3 + categoryBonus;
}

async function summarize(items: Item[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return items.map(x => ({ ...x, summary: x.description || "Open the article for the full explanation." }));

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || "gpt-5-mini";
  const prompt = `You are creating a concise engineering learning digest for a data scientist moving into system design.
For each article, produce:
1) a 2-sentence factual summary;
2) one sentence called "Why it matters" connecting it to production data/model systems when appropriate.
Do not invent facts. Return JSON array with fields id, summary, whyItMatters.
Articles:
${items.map(x => `ID: ${x.id}\nTitle: ${x.title}\nSource: ${x.source}\nDescription: ${x.description}`).join("\n\n")}`;

  const response = await client.responses.create({
    model,
    input: prompt,
  });
  const text = response.output_text || "[]";
  let parsed: any[] = [];
  try { parsed = JSON.parse(text); } catch { parsed = []; }

  return items.map(x => {
    const y = parsed.find(v => v.id === x.id);
    return { ...x, summary: y?.summary || x.description || "Open the article for the full explanation.", whyItMatters: y?.whyItMatters || "" };
  });
}

export async function buildDigest() {
  const feeds = (await Promise.all(SOURCES.map(fetchSource))).flat();
  const candidates = await unseen(feeds);
  candidates.sort((a, b) => score(b) - score(a));

  // Keep the digest balanced rather than allowing one source/category to dominate.
  const selected: Item[] = [];
  const categoryCounts = new Map<Category, number>();
  for (const item of candidates) {
    const count = categoryCounts.get(item.category) || 0;
    if (count >= 2) continue;
    selected.push(item);
    categoryCounts.set(item.category, count + 1);
    if (selected.length >= 8) break;
  }

  const enriched = await summarize(selected);

  // Mark only successfully selected items as seen and persist the enriched content
  // so the Vercel site can act as the permanent learning dashboard.
  for (const item of selected) {
    await redis.set(item.id, "1", { ex: 60 * 60 * 24 * 60 });
  }
  await saveToArchive(enriched);

  return enriched;
}

export function renderHtml(items: any[]) {
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeZone: "Asia/Kolkata" }).format(new Date());
  const grouped = new Map<string, any[]>();
  for (const x of items) {
    const arr = grouped.get(x.category) || [];
    arr.push(x);
    grouped.set(x.category, arr);
  }

  const sections = [...grouped.entries()].map(([category, rows]) => `
    <h2 style="font-size:18px;margin:26px 0 10px">${category}</h2>
    ${rows.map(x => `
      <div style="padding:16px 0;border-top:1px solid #e5e7eb">
        <div style="font-size:11px;color:#667085;text-transform:uppercase;letter-spacing:.04em">${x.source}</div>
        <a href="${x.link}" style="font-size:17px;font-weight:650;color:#172033;text-decoration:none">${x.title}</a>
        <p style="line-height:1.55;color:#344054;margin:8px 0">${x.summary}</p>
        ${x.whyItMatters ? `<p style="line-height:1.55;color:#475467;margin:8px 0"><b>Why it matters:</b> ${x.whyItMatters}</p>` : ""}
        <a href="${x.link}" style="font-size:13px">Read source →</a>
      </div>`).join("")}
  `).join("");

  return `<!doctype html><html><body style="margin:0;background:#f6f7f9;font-family:Arial,sans-serif;color:#172033">
  <div style="max-width:720px;margin:0 auto;padding:28px 18px">
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:26px">
      <div style="font-size:12px;color:#667085;text-transform:uppercase;letter-spacing:.06em">Learning habit</div>
      <h1 style="margin:6px 0 4px;font-size:27px">System Design & Security Digest</h1>
      <p style="color:#667085;margin-top:0">${date}</p>
      ${items.length ? sections : `<p>No new high-signal items were found in this run. That's okay—use the time to review a previous article.</p>`}
      <div style="margin-top:28px;padding:16px;background:#f9fafb;border-radius:10px">
        <b>Habit prompt</b>
        <p style="margin-bottom:0;color:#475467">Spend 20–30 minutes on one article. Write down one architectural decision, one failure mode, and one security implication.</p>
      </div>
    </div>
  </div></body></html>`;
}
