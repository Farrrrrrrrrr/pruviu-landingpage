import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://pruviu.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The internal wiki is intentionally omitted here: robots.txt is a
      // public file, and listing an unlisted/secret path in it would leak
      // that path to anyone who reads it. Its pages carry noindex/nofollow
      // meta tags instead, which is enough to keep them out of search
      // results without advertising the URL.
      disallow: ["/coming-soon"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
