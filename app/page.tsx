import Dashboard from "./dashboard";
import { getArchive, getReadIds } from "@/lib/archive";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const items = await getArchive(60);
    const readIds = await getReadIds(items.map(x => x.id));
    return <Dashboard items={items} initialReadIds={readIds} />;
  } catch (error) {
    console.error("Dashboard load failed", error);
    return (
      <main style={{ maxWidth: 760, margin: "60px auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
        <h1>System Design &amp; Security</h1>
        <p>The learning feed could not be loaded right now.</p>
        <p style={{ color: "#667085" }}>The digest API may still be working. Check the Vercel logs for the underlying Redis/archive error.</p>
      </main>
    );
  }
}
