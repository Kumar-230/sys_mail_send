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
 * Source strategy
 * ---------------
 *
 * Priority:
 *   5 = core learning source
 *   4 = very strong source
 *   3 = useful supporting source
 *
 * The goal is NOT to surface every article from every source.
 * The digest/ranking layer should select the strongest material.
 *
 * Categories are intentionally broad because many engineering blogs
 * overlap (e.g. AWS Architecture covers system design, cloud, networking,
 * security and distributed systems).
 */

export const SOURCES: Source[] = [

  // ============================================================
  // SYSTEM DESIGN / SOFTWARE ARCHITECTURE
  // ============================================================

  {
    name: "ByteByteGo",
    feed: "https://blog.bytebytego.com/feed",
    category: "System Design",
    weight: 5,
  },
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
    name: "Microsoft Azure Architecture",
    feed: "https://azure.microsoft.com/en-us/blog/feed/",
    category: "System Design",
    weight: 4,
  },
  {
    name: "InfoQ Architecture",
    feed: "https://www.infoq.com/feed/architecture-design/",
    category: "System Design",
    weight: 4,
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
    weight: 4,
  },
  {
    name: "Codecentric",
    feed: "https://blog.codecentric.de/feed",
    category: "System Design",
    weight: 3,
  },
  {
    name: "The Architect Elevator",
    feed: "https://architectelevator.com/feed/",
    category: "System Design",
    weight: 4,
  },
  {
    name: "Thoughtworks Technology Radar",
    feed: "https://www.thoughtworks.com/en-us/radar/feed",
    category: "System Design",
    weight: 4,
  },
  {
    name: "Engineering at Meta",
    feed: "https://engineering.fb.com/feed/",
    category: "System Design",
    weight: 5,
  },
  {
    name: "Netflix TechBlog",
    feed: "https://netflixtechblog.com/feed",
    category: "System Design",
    weight: 5,
  },
  {
    name: "Uber Engineering",
    feed: "https://www.uber.com/blog/engineering/feed/",
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
    feed: "https://slack.engineering/feed/",
    category: "System Design",
    weight: 4,
  },
  {
    name: "Shopify Engineering",
    feed: "https://shopify.engineering/blogs/engineering.atom",
    category: "System Design",
    weight: 4,
  },
  {
    name: "GitHub Engineering",
    feed: "https://github.blog/feed/",
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
    name: "Uber Engineering",
    feed: "https://www.uber.com/blog/engineering/feed/",
    category: "Backend & APIs",
    weight: 5,
  },
  {
    name: "Netflix TechBlog",
    feed: "https://netflixtechblog.com/feed",
    category: "Backend & APIs",
    weight: 5,
  },
  {
    name: "Dropbox Tech",
    feed: "https://dropbox.tech/feed",
    category: "Backend & APIs",
    weight: 5,
  },
  {
    name: "Slack Engineering",
    feed: "https://slack.engineering/feed/",
    category: "Backend & APIs",
    weight: 4,
  },
  {
    name: "Shopify Engineering",
    feed: "https://shopify.engineering/blogs/engineering.atom",
    category: "Backend & APIs",
    weight: 4,
  },
  {
    name: "GitHub Engineering",
    feed: "https://github.blog/feed/",
    category: "Backend & APIs",
    weight: 4,
  },
  {
    name: "Cloudflare Blog",
    feed: "https://blog.cloudflare.com/rss/",
    category: "Backend & APIs",
    weight: 5,
  },
  {
    name: "Fastly Blog",
    feed: "https://www.fastly.com/blog/rss.xml",
    category: "Backend & APIs",
    weight: 3,
  },
  {
    name: "NGINX Blog",
    feed: "https://www.nginx.com/feed/",
    category: "Backend & APIs",
    weight: 4,
  },
  {
    name: "Envoy Proxy Blog",
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
    name: "DZone Architecture",
    feed: "https://feeds.dzone.com/architecture",
    category: "Backend & APIs",
    weight: 3,
  },

  // ============================================================
  // DATABASES / STORAGE / DATA INFRASTRUCTURE
  // ============================================================

  {
    name: "PostgreSQL",
    feed: "https://www.postgresql.org/feeds/planetpostgresql.xml",
    category: "Databases",
    weight: 5,
  },
  {
    name: "PostgreSQL Planet",
    feed: "https://planet.postgresql.org/rss10.xml",
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
    name: "PlanetScale",
    feed: "https://planetscale.com/blog/rss.xml",
    category: "Databases",
    weight: 4,
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
    name: "MySQL",
    feed: "https://blogs.oracle.com/mysql/rss",
    category: "Databases",
    weight: 4,
  },
  {
    name: "SQLite",
    feed: "https://sqlite.org/changes.rss",
    category: "Databases",
    weight: 3,
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
    weight: 4,
  },
  {
    name: "Snowflake Engineering",
    feed: "https://www.snowflake.com/en/blog/feed/",
    category: "Databases",
    weight: 4,
  },
  {
    name: "Databricks Engineering",
    feed: "https://www.databricks.com/blog/feed",
    category: "Databases",
    weight: 4,
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
    name: "Apache Cassandra",
    feed: "https://cassandra.apache.org/_/blog/index.html",
    category: "Databases",
    weight: 3,
  },
  {
    name: "DataStax",
    feed: "https://www.datastax.com/blog/rss.xml",
    category: "Databases",
    weight: 3,
  },

  // ============================================================
  // CLOUD / INFRASTRUCTURE / NETWORKING / DEVOPS
  // ============================================================

  {
    name: "AWS Architecture Blog",
    feed: "https://aws.amazon.com/blogs/architecture/feed/",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "AWS Compute Blog",
    feed: "https://aws.amazon.com/blogs/compute/feed/",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "AWS Networking & Content Delivery",
    feed: "https://aws.amazon.com/blogs/networking-and-content-delivery/feed/",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "AWS Database Blog",
    feed: "https://aws.amazon.com/blogs/database/feed/",
    category: "Cloud",
    weight: 4,
  },
  {
    name: "AWS DevOps Blog",
    feed: "https://aws.amazon.com/blogs/devops/feed/",
    category: "Cloud",
    weight: 4,
  },
  {
    name: "AWS News",
    feed: "https://aws.amazon.com/blogs/aws/feed/",
    category: "Cloud",
    weight: 3,
  },
  {
    name: "Google Cloud Infrastructure",
    feed: "https://cloud.google.com/feeds/blog.xml",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "Google Cloud Blog",
    feed: "https://cloud.google.com/blog/rss",
    category: "Cloud",
    weight: 4,
  },
  {
    name: "Microsoft Azure Blog",
    feed: "https://azure.microsoft.com/en-us/blog/feed/",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "Cloudflare Blog",
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
    name: "Kubernetes Blog",
    feed: "https://kubernetes.io/feed.xml",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "Docker Blog",
    feed: "https://www.docker.com/feed/",
    category: "Cloud",
    weight: 3,
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
    name: "CNCF",
    feed: "https://www.cncf.io/feed/",
    category: "Cloud",
    weight: 4,
  },
  {
    name: "Google SRE",
    feed: "https://sre.google/blog/feed.xml",
    category: "Cloud",
    weight: 5,
  },
  {
    name: "Netflix TechBlog",
    feed: "https://netflixtechblog.com/feed",
    category: "Cloud",
    weight: 4,
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
    feed: "https://security.googleblog.com/feeds/posts/default?alt=rss",
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
    name: "SANS Institute",
    feed: "https://www.sans.org/blog/feed/",
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
    name: "BleepingComputer",
    feed: "https://www.bleepingcomputer.com/feed/",
    category: "Cybersecurity",
    weight: 4,
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
    name: "Malwarebytes Labs",
    feed: "https://blog.malwarebytes.com/feed/",
    category: "Cybersecurity",
    weight: 4,
  },
  {
    name: "Sophos News",
    feed: "https://news.sophos.com/en-us/category/security-operations/feed/",
    category: "Cybersecurity",
    weight: 4,
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
    name: "The Hacker News",
    feed: "https://feeds.feedburner.com/TheHackersNews",
    category: "Cybersecurity",
    weight: 3,
  },

  // ============================================================
  // PRIORITY ORDER
  // ============================================================

];

export const PRIORITY: Category[] = [
  "System Design",
  "Backend & APIs",
  "Databases",
  "Cloud",
  "Cybersecurity",
];
