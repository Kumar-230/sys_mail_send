import Dashboard from "./dashboard";
import { getArchive, getReadIds } from "@/lib/archive";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getArchive(60);
  const readIds = await getReadIds(items.map(x => x.id));
  return <Dashboard items={items} initialReadIds={readIds} />;
}
