import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://talktogenie.ai"
  return ["", "/product", "/how-it-works", "/integrations", "/lamp", "/pricing", "/meet"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }))
}
