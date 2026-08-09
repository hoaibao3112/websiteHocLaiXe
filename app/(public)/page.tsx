import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Course, NewsWithCategory } from "@/types/database.types";

import { HeroHomepage } from "@/components/public/sections/HeroHomepage";
import { StatsSection } from "@/components/public/sections/StatsSection";
import { WhyChooseUs } from "@/components/public/sections/WhyChooseUs";
import { CoursesSection } from "@/components/public/sections/CoursesSection";
import { LatestNewsSection } from "@/components/public/sections/LatestNewsSection";
import { FacilitiesSection } from "@/components/public/sections/FacilitiesSection";
import { ContactSection } from "@/components/public/sections/ContactSection";
import { CTABanner } from "@/components/public/sections/CTABanner";

export const metadata: Metadata = {
  title: "Trường Lái Xe Chiến Thắng — Đào tạo lái xe uy tín tại Đồng Tháp",
  description:
    "Trường lái xe Chiến Thắng — hơn 10 năm kinh nghiệm đào tạo lái xe hạng A1, A, B1, B2, C. Tỉ lệ đậu thi cao, giáo viên tận tâm, sân sát hạch đạt chuẩn.",
};

export const revalidate = 3600;

async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  return data ?? [];
}

async function getLatestNews(): Promise<NewsWithCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*, news_categories(id, name, slug)")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);
  return (data as NewsWithCategory[]) ?? [];
}

export default async function HomePage() {
  const [courses, latestNews] = await Promise.all([
    getCourses(),
    getLatestNews(),
  ]);

  return (
    <div className="bg-white overflow-x-hidden">
      <HeroHomepage />
      <StatsSection />
      <WhyChooseUs />
      <CoursesSection courses={courses} />
      <LatestNewsSection latestNews={latestNews} />
      <FacilitiesSection />
      <ContactSection />
      <CTABanner />
    </div>
  );
}
