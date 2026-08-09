import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export type ArchivedItem = {
  id: string;
  title: string;
  link: string;
  pubDate?: string;
  source: string;
  category: string;
  weight: number;
  description?: string;
  summary?: string;
  whyItMatters?: string;
  archivedAt: string;
};

export async function saveToArchive(items: Omit<ArchivedItem, "archivedAt">[]) {
  if (!items.length) return;
  for (const item of items) {
    const archived: ArchivedItem = { ...item, archivedAt: new Date().toISOString() };
    await redis.set(`digest:content:${item.id}`, JSON.stringify(archived), { ex: 60 * 60 * 24 * 180 });
    await redis.lpush("digest:archive", item.id);
  }
  await redis.ltrim("digest:archive", 0, 199);
}

export async function getArchive(limit = 60): Promise<ArchivedItem[]> {
  const ids = await redis.lrange<string>("digest:archive", 0, limit - 1);
  if (!ids?.length) return [];
  const rows = await Promise.all(ids.map(id => redis.get<string>(`digest:content:${id}`)));
  return rows.filter(Boolean).map(x => JSON.parse(x as string));
}

export async function getReadIds(ids: string[]) {
  if (!ids.length) return [];
  const values = await Promise.all(ids.map(id => redis.exists(`digest:read:${id}`)));
  return ids.filter((_, i) => Boolean(values[i]));
}

export async function markRead(id: string) {
  await redis.set(`digest:read:${id}`, "1", { ex: 60 * 60 * 24 * 365 });
}
