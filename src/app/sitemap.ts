export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteIdentity } from "@/data/siteData";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteIdentity.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
