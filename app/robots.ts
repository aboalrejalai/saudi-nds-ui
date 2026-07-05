import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/r/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/r/"],
      },
    ],
    sitemap: "https://nds.aboalrejal.com/sitemap.xml",
    host: "https://nds.aboalrejal.com",
  }
}
