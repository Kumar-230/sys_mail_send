export type Category =
  | "System Design"
  | "Backend & APIs"
  | "Databases"
  | "Cloud"
  | "Cybersecurity";

export type Source = {
  name: string;
  feed: string;
  category: Category;
  weight: number;
};

export const SOURCES: Source[] = [
  { name: "ByteByteGo", feed: "https://blog.bytebytego.com/feed", category: "System Design", weight: 5 },
  { name: "AWS Architecture Blog", feed: "https://aws.amazon.com/blogs/architecture/feed/", category: "Cloud", weight: 5 },
  { name: "Martin Fowler", feed: "https://martinfowler.com/feed.atom", category: "System Design", weight: 5 },
  { name: "Cloudflare Blog", feed: "https://blog.cloudflare.com/rss/", category: "Cloud", weight: 4 },
  { name: "Stripe Engineering", feed: "https://stripe.com/blog/feed.rss", category: "Backend & APIs", weight: 5 },
  { name: "PostgreSQL News", feed: "https://www.postgresql.org/feeds/news.xml", category: "Databases", weight: 5 },
  { name: "Google Security Blog", feed: "https://security.googleblog.com/feeds/posts/default?alt=rss", category: "Cybersecurity", weight: 5 },
  { name: "Microsoft Security Blog", feed: "https://www.microsoft.com/en-us/security/blog/feed/", category: "Cybersecurity", weight: 4 },
  { name: "OWASP", feed: "https://owasp.org/feed.xml", category: "Cybersecurity", weight: 5 },
  { name: "InfoQ Architecture", feed: "https://feed.infoq.com/architecture-design", category: "System Design", weight: 4 }
];

export const PRIORITY: Category[] = [
  "System Design",
  "Backend & APIs",
  "Databases",
  "Cloud",
  "Cybersecurity"
];