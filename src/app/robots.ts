import type { MetadataRoute } from "next";
import { siteIdentity } from "@/data/siteData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteIdentity.siteUrl}/sitemap.xml`
  };
}
