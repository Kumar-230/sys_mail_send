"use client";

import { useMemo, useState } from "react";

type Item = {
  id: string;
  title: string;
  link: string;
  pubDate?: string;
  source: string;
  category: string;
  summary?: string;
  whyItMatters?: string;
  archivedAt: string;
};

const categories = ["All", "System Design", "Backend & APIs", "Databases", "Cloud", "Cybersecurity"];

function formatDate(value?: string) {
  if (!value) return "Recent";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent";
  try {
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date);
  } catch {
    return "Recent";
  }
}

export default function Dashboard({ items, initialReadIds }: { items: Item[]; initialReadIds: string[] }) {
  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState(() => new Set(initialReadIds));

  const filtered = useMemo(
    () => filter === "All" ? items : items.filter(x => x.category === filter),
    [filter, items]
  );

  const unreadCount = items.filter(x => !readIds.has(x.id)).length;

  async function markRead(id: string) {
    if (readIds.has(id)) return;
    setReadIds(prev => new Set(prev).add(id));
    try {
      await fetch("/api/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Keep the local state useful even if the network request fails.
    }
  }

  return (
    <main className="dashboard">
      <header className="hero">
        <div>
          <div className="eyebrow">Personal learning system</div>
          <h1>System Design &amp; Security</h1>
          <p>Twice-daily, curated engineering material for building stronger production systems.</p>
        </div>
        <div className="stat">
          <strong>{unreadCount}</strong>
          <span>unread</span>
        </div>
      </header>

      <section className="habit card">
        <div>
          <div className="eyebrow">Your learning loop</div>
          <h2>20–30 minutes, twice a day</h2>
          <p>Pick one article. Note one architectural decision, one failure mode, and one security implication.</p>
        </div>
        <div className="schedule">08:00 · 20:00 IST</div>
      </section>

      <nav className="filters" aria-label="Filter by category">
        {categories.map(category => (
          <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
            {category}
          </button>
        ))}
      </nav>

      <section className="feed">
        {filtered.length === 0 ? (
          <div className="empty card">
            <h2>No articles yet</h2>
            <p>The first scheduled digest will populate this dashboard. You can also trigger <code>/api/test</code> once after deployment to seed it.</p>
          </div>
        ) : filtered.map(item => {
          const isRead = readIds.has(item.id);
          return (
            <article key={item.id} className={`article card ${isRead ? "read" : ""}`}>
              <div className="article-top">
                <span className="tag">{item.category}</span>
                <span className="source">{item.source}</span>
              </div>
              <h2><a href={item.link} target="_blank" rel="noreferrer" onClick={() => markRead(item.id)}>{item.title}</a></h2>
              <div className="date">{formatDate(item.pubDate)}</div>
              {item.summary && <p>{item.summary}</p>}
              {item.whyItMatters && <div className="why"><strong>Why it matters</strong><span>{item.whyItMatters}</span></div>}
              <div className="article-actions">
                <a className="read-link" href={item.link} target="_blank" rel="noreferrer" onClick={() => markRead(item.id)}>Read source →</a>
                <button className="read-button" onClick={() => markRead(item.id)}>{isRead ? "✓ Read" : "Mark as read"}</button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
