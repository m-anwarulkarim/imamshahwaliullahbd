const SITE_URL = "https://imamshahwaliullahbd.com";
const SITE_NAME = "Imam Shah Waliullah Dehlawi Research Institute";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.webp`;

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string | undefined;
  ogType?: string | undefined;
  twitterCard?: "summary" | "summary_large_image" | undefined;
  keywords?: string | undefined;
  noindex?: boolean | undefined;
  jsonLd?: Record<string, unknown> | undefined;
}

export function seo(opts: SeoOptions) {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.ogImage ?? DEFAULT_OG_IMAGE;
  const card = opts.twitterCard ?? "summary_large_image";

  const meta: Record<string, string>[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.ogType ?? "website" },
    { property: "og:image", content: image },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: card },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];

  if (opts.keywords) {
    meta.push({ name: "keywords", content: opts.keywords });
  }
  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links: Record<string, string>[] = [{ rel: "canonical", href: url }];

  const scripts: Record<string, string>[] = [];
  if (opts.jsonLd) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(opts.jsonLd),
    });
  }

  return { meta, links, scripts };
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
