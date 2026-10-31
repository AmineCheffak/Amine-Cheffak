import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aminecheffak-dev.vercel.app/",
      lastModified: "2026-10-31",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}