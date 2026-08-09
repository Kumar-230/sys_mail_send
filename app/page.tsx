export default function Home() {
  return (
    <main>
      <div className="card">
        <h1>System Design & Security Digest</h1>
        <p className="small">
          A Vercel-hosted learning habit that collects recent material twice a day
          across system design, backend/API architecture, databases, cloud and cybersecurity.
        </p>
        <h2>Schedule</h2>
        <p>08:00 and 20:00 IST every day.</p>
        <h2>What each digest contains</h2>
        <ul>
          <li>5–8 high-signal recent articles, deduplicated across runs.</li>
          <li>Category labels and source links.</li>
          <li>Short summaries when <code>OPENAI_API_KEY</code> is configured.</li>
          <li>A small “study this” section so the email becomes an actual learning habit.</li>
        </ul>
        <p className="small">
          Deploy this project to Vercel, connect Upstash Redis, and configure Resend.
          The cron endpoint is protected with <code>CRON_SECRET</code>.
        </p>
      </div>
    </main>
  );
}