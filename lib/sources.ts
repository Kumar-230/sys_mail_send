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

/*
 * SOURCE DESIGN
 *
 * Priority:
 *
 * 5 = Core learning source
 * 4 = Strong technical source
 * 3 = Supporting source
 *
 * The list is intentionally conservative.
 *
 * IMPORTANT:
 * A website being active does NOT necessarily mean its RSS endpoint
 * works reliably from a Vercel serverless function.
 *
 * Prefer:
 *   - official RSS / Atom feeds
 *   - stable publisher URLs
 *   - sources with technical rather than news-heavy content
 *
 * Avoid:
 *   - guessed /feed URLs
 *   - abandoned feed URLs
 *   - feeds known to return 403/404/406 to server-side clients
 */

export const SOURCES: Source[] = [

  // ============================================================
  // SYSTEM DESIGN
  // ============================================================

  {
    name: "Martin Fowler",
    feed: "https://martinfowler.com/feed.atom",
    category: "System Design",
    weight: 5,
  },

  {
    name: "AWS Architecture Blog",
    feed: "https://aws.amazon.com/blogs/architecture/feed/",
    category: "System Design",
    weight: 5,
  },

  {
    name: "Microservices.io",
    feed: "https://microservices.io/feed.xml",
    category: "System Design",
    weight: 5,
  },

  {
    name: "SEI Software Architecture",
    feed: "https://insights.sei.cmu.edu/blog/topic/software-architecture/feed/",
    category: "System Design",
    weight: 5,
  },

  {
    name: "Engineering at Meta",
    feed: "https://engineering.fb.com/feed",
    category: "System Design",
    weight: 5,
  },

  {
    name: "Netflix Technology Blog",
    feed: "https://netflixtechblog.com/feed",
    category: "System Design",
    weight: 5,
  },

  {
    name: "Dropbox Tech",
    feed: "https://dropbox.tech/feed",
    category: "System Design",
    weight: 5,
  },

  {
    name: "Slack Engineering",
    feed: "https://slack.engineering/feed",
    category: "System Design",
    weight: 4,
  },

  {
    name: "GitHub Engineering",
    feed: "https://github.blog/feed/",
    category: "System Design",
    weight: 4,
  },

  {
    name: "Thoughtworks Insights",
    feed: "https://www.thoughtworks.com/insights/rss",
    category: "System Design",
    weight: 4,
  },

  // ============================================================
  // BACKEND / APIs / DISTRIBUTED SYSTEMS
  // ============================================================

  {
    name: "Stripe Engineering",
    feed: "https://stripe.com/blog/feed.rss",
    category: "Backend & APIs",
    weight: 5,
  },

  {
    name: "Cloudflare Blog",
    feed: "https://blog.cloudflare.com/rss/",
    category: "Backend & APIs",
    weight: 5,
  },

  {
    name: "NGINX Blog",
    feed: "https://www.nginx.com/feed/",
    category: "Backend & APIs",
    weight: 4,
  },

  {
    name: "Envoy Proxy",
    feed: "https://blog.envoyproxy.io/feed",
    category: "Backend & APIs",
    weight: 4,
  },

  {
    name: "Kubernetes Blog",
    feed: "https://kubernetes.io/feed.xml",
    category: "Backend & APIs",
    weight: 4,
  },

  {
    name: "Docker Blog",
    feed: "https://www.docker.com/feed/",
    category: "Backend & APIs",
    weight: 3,
  },

  {
    name: "Stack Overflow Blog",
    feed: "https://stackoverflow.blog/feed/",
    category: "Backend & APIs",
    weight: 3,
  },

  {
    name: "Fastly Blog",
    feed: "https://www.fastly.com/blog/rss.xml",
    category: "Backend & APIs",
    weight: 4,
  },

  // ============================================================
  // DATABASES / STORAGE / DATA INFRASTRUCTURE
  // ============================================================

  {
    name: "Planet PostgreSQL",
    feed: "https://planet.postgresql.org/rss20.xml",
    category: "Databases",
    weight: 5,
  },

  {
    name: "CockroachDB",
    feed: "https://www.cockroachlabs.com/blog/index.xml",
    category: "Databases",
    weight: 5,
  },

  {
    name: "Redis",
    feed: "https://redis.io/blog/rss.xml",
    category: "Databases",
    weight: 4,
  },

  {
    name: "MongoDB",
    feed: "https://www.mongodb.com/blog/rss",
    category: "Databases",
    weight: 4,
  },

  {
    name: "Elastic",
    feed: "https://www.elastic.co/blog/feed",
    category: "Databases",
    weight: 4,
  },

  {
    name: "ClickHouse",
    feed: "https://clickhouse.com/blog/rss.xml",
    category: "Databases",
    weight: 5,
  },

  {
    name: "Confluent",
    feed: "https://www.confluent.io/blog/feed/",
    category: "Databases",
    weight: 5,
  },

  {
    name: "Apache Kafka",
    feed: "https://kafka.apache.org/blog/feed",
    category: "Databases",
    weight: 4,
  },

  {
    name: "DataStax",
    feed: "https://www.datastax.com/blog/rss.xml",
    category: "Databases",
    weight: 3,
  },

  // ============================================================
  // CLOUD / INFRASTRUCTURE / NETWORKING / SRE
  // ============================================================

  {
    name: "AWS Architecture",
    feed: "https://aws.amazon.com/blogs/architecture/feed/",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "AWS Compute",
    feed: "https://aws.amazon.com/blogs/compute/feed/",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "AWS Networking",
    feed: "https://aws.amazon.com/blogs/networking-and-content-delivery/feed/",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "AWS Database",
    feed: "https://aws.amazon.com/blogs/database/feed/",
    category: "Cloud",
    weight: 4,
  },

  {
    name: "AWS DevOps",
    feed: "https://aws.amazon.com/blogs/devops/feed/",
    category: "Cloud",
    weight: 4,
  },

  {
    name: "Google Cloud Blog",
    feed: "https://cloud.google.com/blog/rss",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "Google Cloud Infrastructure",
    feed: "https://cloud.google.com/feeds/blog.xml",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "Microsoft Azure Blog",
    feed: "https://azure.microsoft.com/en-us/blog/feed/",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "Cloudflare",
    feed: "https://blog.cloudflare.com/rss/",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "HashiCorp",
    feed: "https://www.hashicorp.com/blog/feed.xml",
    category: "Cloud",
    weight: 4,
  },

  {
    name: "Kubernetes",
    feed: "https://kubernetes.io/feed.xml",
    category: "Cloud",
    weight: 5,
  },

  {
    name: "CNCF",
    feed: "https://www.cncf.io/feed/feed",
    category: "Cloud",
    weight: 4,
  },

  {
    name: "Grafana Labs",
    feed: "https://grafana.com/blog/index.xml",
    category: "Cloud",
    weight: 4,
  },

  {
    name: "Prometheus",
    feed: "https://prometheus.io/blog/feed.xml",
    category: "Cloud",
    weight: 4,
  },

  {
    name: "Google SRE",
    feed: "https://sre.google/blog/feed.xml",
    category: "Cloud",
    weight: 5,
  },

  // ============================================================
  // CYBERSECURITY
  // ============================================================

  {
    name: "OWASP",
    feed: "https://owasp.org/feed.xml",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "Google Security Blog",
    feed: "https://security.googleblog.com/feeds/posts/default",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "Microsoft Security",
    feed: "https://www.microsoft.com/en-us/security/blog/feed/",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "Microsoft Security Response Center",
    feed: "https://msrc.microsoft.com/blog/feed/",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "Cloudflare Security",
    feed: "https://blog.cloudflare.com/rss/",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "SANS Internet Storm Center",
    feed: "https://isc.sans.edu/rssfeed_full.xml",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "PortSwigger Web Security",
    feed: "https://portswigger.net/blog/rss",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "PortSwigger Research",
    feed: "https://portswigger.net/research/rss",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "CISA Blog",
    feed: "https://www.cisa.gov/blog.xml",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "CISA Cybersecurity Advisories",
    feed: "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "CISA ICS Advisories",
    feed: "https://www.cisa.gov/cybersecurity-advisories/ics-advisories.xml",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "Palo Alto Unit 42",
    feed: "https://unit42.paloaltonetworks.com/feed/",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "Krebs on Security",
    feed: "https://krebsonsecurity.com/feed/",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "Schneier on Security",
    feed: "https://www.schneier.com/feed/atom/",
    category: "Cybersecurity",
    weight: 5,
  },

  {
    name: "SecurityWeek",
    feed: "https://www.securityweek.com/feed/",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "Ars Technica Security",
    feed: "https://arstechnica.com/security/feed/",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "ESET WeLiveSecurity",
    feed: "https://www.welivesecurity.com/en/rss/feed/",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "Eclypsium",
    feed: "https://eclypsium.com/feed/",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "Dark Reading",
    feed: "https://www.darkreading.com/rss.xml",
    category: "Cybersecurity",
    weight: 3,
  },

  {
    name: "Tenable",
    feed: "https://www.tenable.com/blog/feed",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "Securelist",
    feed: "https://securelist.com/feed/",
    category: "Cybersecurity",
    weight: 4,
  },

  {
    name: "Malwarebytes Labs",
    feed: "https://blog.malwarebytes.com/feed/",
    category: "Cybersecurity",
    weight: 4,
  },

  // ============================================================
  // CURATION PRIORITY
  // ============================================================

];

export const PRIORITY: Category[] = [
  "System Design",
  "Backend & APIs",
  "Databases",
  "Cloud",
  "Cybersecurity",
];
