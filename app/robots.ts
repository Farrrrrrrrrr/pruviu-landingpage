import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://pruviu.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/coming-soon"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
