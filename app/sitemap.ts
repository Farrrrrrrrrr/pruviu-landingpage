import type { MetadataRoute } from "next";

const siteUrl = "https://pruviu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/kontak", priority: 0.7, changeFrequency: "monthly" },
    { path: "/tentang-kami", priority: 0.7, changeFrequency: "monthly" },
    { path: "/laporan", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
