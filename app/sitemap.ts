import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://chienthang.edu.vn";

  // Static routes
  const staticRoutes = [
    "",
    "/ve-chung-toi",
    "/khoa-hoc",
    "/ho-so-dang-ky",
    "/lien-he",
    "/tin-tuc",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic news slugs
  try {
    const supabase = createAdminClient();
    const { data: newsItems } = (await supabase
      .from("news")
      .select("slug, updated_at")
      .eq("is_published", true)) as { data: { slug: string; updated_at: string }[] | null };

    const dynamicRoutes = (newsItems ?? []).map((item) => ({
      url: `${baseUrl}/tin-tuc/${item.slug}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (err) {
    console.error("Failed to generate dynamic sitemap routes:", err);
    return staticRoutes;
  }
}
