import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import type { NewsWithCategory, NewsCategory } from "@/types/database.types";
import {
  Newspaper,
  Search,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowRight,
  X,
  Clock,
  BookOpen,
} from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện - Trường Lái Xe Chiến Thắng",
  description:
    "Cập nhật tin tức mới nhất, luật giao thông đường bộ và kinh nghiệm thi bằng lái xe an toàn từ Trường lái xe Chiến Thắng Đồng Tháp.",
};

// Revalidate public news listing every 15 minutes
export const revalidate = 900;

const ITEMS_PER_PAGE = 6;

async function getCategories() {
  const supabase = await createClient();

  // Fetch all categories and published news category_ids in parallel
  const [categoriesRes, newsItemsRes] = await Promise.all([
    supabase.from("news_categories").select("*").order("display_order"),
    supabase
      .from("news")
      .select("category_id")
      .eq("is_published", true),
  ]);

  const categories = categoriesRes.data as unknown as NewsCategory[] | null;
  const newsItems = newsItemsRes.data as unknown as { category_id: string | null }[] | null;

  const counts: Record<string, number> = {};
  newsItems?.forEach((item) => {
    if (item.category_id) {
      counts[item.category_id] = (counts[item.category_id] || 0) + 1;
    }
  });

  return (categories ?? []).map((cat) => ({
    ...cat,
    count: counts[cat.id] || 0,
  }));
}

async function getFeaturedNews(): Promise<
  { id: string; title: string; slug: string; published_at: string | null; cover_image: string | null }[]
> {
  const supabase = await createClient();
  const { data } = (await supabase
    .from("news")
    .select("id, title, slug, published_at, cover_image")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(4)) as unknown as {
    data:
      | {
          id: string;
          title: string;
          slug: string;
          published_at: string | null;
          cover_image: string | null;
        }[]
      | null;
  };
  return data ?? [];
}

async function getNews(
  categorySlug?: string,
  search?: string,
  page: number = 1
): Promise<{ news: NewsWithCategory[]; count: number }> {
  const supabase = await createClient();
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("news")
    .select("*, news_categories!inner(id, name, slug)", { count: "exact" })
    .eq("is_published", true);

  if (categorySlug) {
    query = query.eq("news_categories.slug", categorySlug);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, count } = await query
    .order("published_at", { ascending: false })
    .range(start, end);

  return {
    news: (data as NewsWithCategory[]) ?? [],
    count: count ?? 0,
  };
}

interface PageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function NewsListingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentCategory = params.category;
  const currentSearch = params.search || "";
  const currentPage = Math.max(1, Number(params.page || "1"));

  const [categories, featuredList, { news, count }] = await Promise.all([
    getCategories(),
    getFeaturedNews(),
    getNews(currentCategory, currentSearch, currentPage),
  ]);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  const totalAllArticles = categories.reduce((acc, cat) => acc + cat.count, 0);

  // Determine current active category name for breadcrumbs & filter labels
  const activeCategoryObj = categories.find((cat) => cat.slug === currentCategory);

  // Smart pagination numbers generator (avoiding overflow on small screens)
  const getPaginationPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <div className="pt-16 sm:pt-20 pb-20 sm:pb-28 bg-neutral-50/70 min-h-screen overflow-x-hidden">
      {/* ── Top Hero Banner ── */}
      <section className="relative bg-[#111827] text-white py-8 sm:py-14 lg:py-18 px-4 mb-6 sm:mb-10 overflow-hidden shadow-inner">
        {/* Background Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/banner-page.jpg"
            alt="Tin tức Chiến Thắng"
            fill
            className="object-cover object-center opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-900/60" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal animation="fade-in">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 mb-3 sm:mb-4 uppercase tracking-wider font-semibold">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <Link
                href="/tin-tuc"
                className={`${!currentCategory ? "text-amber-400" : "hover:text-amber-400 transition-colors"}`}
              >
                Tin tức & Sự kiện
              </Link>
              {activeCategoryObj && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                  <span className="text-amber-400 truncate max-w-[200px]">
                    {activeCategoryObj.name}
                  </span>
                </>
              )}
            </nav>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1 mb-2 sm:mb-3 uppercase leading-tight text-white">
              TIN TỨC & SỰ KIỆN CHIẾN THẮNG
            </h1>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Cập nhật quy định mới, mẹo ôn thi lý thuyết 600 câu, kinh nghiệm sát hạch sa hình & đường trường dễ đỗ.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Mobile-Only Search & Quick Filter Bar (prominent at top) ── */}
        <div className="lg:hidden mb-6 space-y-3.5">
          {/* Mobile Search Box */}
          <form action="/tin-tuc" method="GET" className="relative w-full">
            {currentCategory && (
              <input type="hidden" name="category" value={currentCategory} />
            )}
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-250 bg-white text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-xs"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            {currentSearch && (
              <Link
                href={`/tin-tuc${currentCategory ? `?category=${currentCategory}` : ""}`}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </Link>
            )}
          </form>

          {/* Horizontal Category Scroll with Fade Indicators */}
          <div className="relative">
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
              <Link
                href="/tin-tuc"
                className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  !currentCategory
                    ? "bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/20"
                    : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <span>Tất cả</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    !currentCategory
                      ? "bg-amber-700/80 text-white"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {totalAllArticles}
                </span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/tin-tuc?category=${cat.slug}${currentSearch ? `&search=${currentSearch}` : ""}`}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    currentCategory === cat.slug
                      ? "bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/20"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      currentCategory === cat.slug
                        ? "bg-amber-700/80 text-white"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Active Filter Bar Notification ── */}
        {(currentSearch || currentCategory) && (
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-amber-50 border border-amber-200/90 rounded-xl px-4 py-3 text-xs text-amber-900 mb-6 shadow-2xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-neutral-600">Đang lọc:</span>
              {currentCategory && (
                <span className="inline-flex items-center gap-1 bg-amber-200/70 text-amber-900 px-2.5 py-1 rounded-md font-bold text-xs">
                  Danh mục: {activeCategoryObj?.name || currentCategory}
                </span>
              )}
              {currentSearch && (
                <span className="inline-flex items-center gap-1 bg-amber-200/70 text-amber-900 px-2.5 py-1 rounded-md font-bold text-xs">
                  Từ khóa: &ldquo;{currentSearch}&rdquo;
                </span>
              )}
              <span className="text-neutral-500 font-medium ml-1">
                ({count} bài viết)
              </span>
            </div>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1 font-bold text-amber-700 hover:text-amber-900 bg-white border border-amber-300/80 hover:bg-amber-100/50 px-3 py-1 rounded-lg transition-colors ml-auto text-xs"
            >
              <X className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </Link>
          </div>
        )}

        {/* ── 2-Column Responsive Grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ── Left Column: Desktop Sticky Sidebar (lg:col-span-4) ── */}
          <aside className="lg:col-span-4 space-y-6 sm:space-y-8 order-2 lg:order-1 lg:sticky lg:top-28">
            
            {/* Desktop Search Box */}
            <div className="hidden lg:block">
              <ScrollReveal animation="fade-in">
                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
                  <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest border-b border-neutral-100 pb-3.5 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Tìm kiếm bài viết
                  </h3>
                  <form action="/tin-tuc" method="GET" className="relative">
                    {currentCategory && (
                      <input type="hidden" name="category" value={currentCategory} />
                    )}
                    <input
                      type="text"
                      name="search"
                      defaultValue={currentSearch}
                      placeholder="Nhập từ khóa cần tìm..."
                      className="w-full pl-11 pr-9 py-3 rounded-xl border border-neutral-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-neutral-50/50 font-medium"
                    />
                    <Search className="w-4.5 h-4.5 text-neutral-400 absolute left-3.5 top-3.5" />
                    {currentSearch && (
                      <Link
                        href={`/tin-tuc${currentCategory ? `?category=${currentCategory}` : ""}`}
                        className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700"
                        title="Xóa tìm kiếm"
                      >
                        <X className="w-4 h-4" />
                      </Link>
                    )}
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Desktop Categories List (hidden on mobile to prevent duplicate clutter) */}
            <div className="hidden lg:block">
              <ScrollReveal animation="fade-in" delay={100}>
                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
                  <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest border-b border-neutral-100 pb-3.5 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    Chuyên mục bài viết
                  </h3>
                  <div className="space-y-1.5">
                    <Link
                      href="/tin-tuc"
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        !currentCategory
                          ? "text-amber-900 bg-amber-50/90 border border-amber-200 shadow-2xs font-bold"
                          : "text-neutral-600 border border-transparent hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                    >
                      <span>Tất cả bài viết</span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          !currentCategory
                            ? "bg-amber-500 text-white"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {totalAllArticles}
                      </span>
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/tin-tuc?category=${cat.slug}${currentSearch ? `&search=${currentSearch}` : ""}`}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          currentCategory === cat.slug
                            ? "text-amber-900 bg-amber-50/90 border border-amber-200 shadow-2xs font-bold"
                            : "text-neutral-600 border border-transparent hover:bg-neutral-50 hover:text-neutral-900"
                        }`}
                      >
                        <span className="truncate mr-2">{cat.name}</span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                            currentCategory === cat.slug
                              ? "bg-amber-500 text-white"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {String(cat.count).padStart(2, "0")}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Featured news (visible on desktop and mobile with compact thumbnail cards) */}
            <ScrollReveal animation="fade-in" delay={200}>
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest border-b border-neutral-100 pb-3.5 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Tin nổi bật nhất
                </h3>
                <div className="divide-y divide-neutral-100">
                  {featuredList.map((item) => (
                    <Link
                      key={item.id}
                      href={`/tin-tuc/${item.slug}`}
                      className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0 transition-all"
                    >
                      {item.cover_image ? (
                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
                          <Image
                            src={item.cover_image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="72px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                          <Newspaper className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-amber-700 line-clamp-2 transition-colors leading-snug break-words">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-neutral-400 mt-1.5 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          {item.published_at
                            ? new Date(item.published_at).toLocaleDateString("vi-VN")
                            : "Mới cập nhật"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </aside>

          {/* ── Right Column: News Grid & Pagination (lg:col-span-8) ── */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 order-1 lg:order-2 min-w-0">
            
            {news.length > 0 ? (
              <div>
                {/* News Grid (1 col on mobile, 2 cols on tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {news.map((item, idx) => (
                    <ScrollReveal
                      key={item.id}
                      animation="slide-up"
                      delay={Math.min(idx * 75, 300)}
                      className="h-full min-w-0"
                    >
                      <Link
                        href={`/tin-tuc/${item.slug}`}
                        className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-amber-400/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full min-w-0 w-full relative"
                      >
                        <div className="min-w-0">
                          {/* Image & Category Tag */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                            {item.cover_image ? (
                              <Image
                                src={item.cover_image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-amber-50 flex items-center justify-center">
                                <Newspaper className="w-12 h-12 text-neutral-300" />
                              </div>
                            )}

                            {/* Category Badge */}
                            {item.news_categories && (
                              <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-xs">
                                {item.news_categories.name}
                              </div>
                            )}

                            {/* Date Badge */}
                            <div className="absolute bottom-3 right-3 bg-neutral-900/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                              <Calendar className="w-3 h-3 text-amber-400" />
                              <span>
                                {item.published_at
                                  ? new Date(item.published_at).toLocaleDateString("vi-VN")
                                  : "Mới đăng"}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 sm:p-5 min-w-0">
                            <h2 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors break-words">
                              {item.title}
                            </h2>
                            {item.excerpt && (
                              <p className="text-neutral-500 text-xs sm:text-sm mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed font-normal break-words">
                                {item.excerpt}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Card Action Link */}
                        <div className="p-4 sm:p-5 pt-0">
                          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-amber-700 group-hover:text-amber-800 font-extrabold text-xs uppercase tracking-wider">
                            <span>Xem chi tiết bài viết</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>

                {/* ── Responsive Pagination ── */}
                {totalPages > 1 && (
                  <ScrollReveal animation="fade-in">
                    <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-10 sm:mt-14 pt-6 border-t border-neutral-200/80">
                      {/* Prev Button */}
                      <Link
                        href={`/tin-tuc?${
                          currentCategory ? `category=${currentCategory}&` : ""
                        }${currentSearch ? `search=${currentSearch}&` : ""}page=${currentPage - 1}`}
                        className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 px-2.5 flex items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                          currentPage <= 1
                            ? "pointer-events-none opacity-40 bg-neutral-50 text-neutral-400 border-neutral-200"
                            : "bg-white hover:bg-amber-50 hover:text-amber-800 text-neutral-700 border-neutral-200 shadow-2xs"
                        }`}
                        aria-label="Trang trước"
                      >
                        &lt;
                      </Link>

                      {/* Numbered Buttons with Smart Ellipsis */}
                      {getPaginationPages().map((pageNum, idx) => {
                        if (pageNum === "...") {
                          return (
                            <span
                              key={`ellipsis-${idx}`}
                              className="w-7 sm:w-8 text-center text-neutral-400 text-xs font-bold select-none"
                            >
                              ...
                            </span>
                          );
                        }

                        const p = Number(pageNum);
                        const isActive = p === currentPage;

                        return (
                          <Link
                            key={p}
                            href={`/tin-tuc?${
                              currentCategory ? `category=${currentCategory}&` : ""
                            }${currentSearch ? `search=${currentSearch}&` : ""}page=${p}`}
                            className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 px-2 flex items-center justify-center rounded-xl text-xs font-black transition-all ${
                              isActive
                                ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20"
                                : "bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-2xs"
                            }`}
                          >
                            {p}
                          </Link>
                        );
                      })}

                      {/* Next Button */}
                      <Link
                        href={`/tin-tuc?${
                          currentCategory ? `category=${currentCategory}&` : ""
                        }${currentSearch ? `search=${currentSearch}&` : ""}page=${currentPage + 1}`}
                        className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 px-2.5 flex items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                          currentPage >= totalPages
                            ? "pointer-events-none opacity-40 bg-neutral-50 text-neutral-400 border-neutral-200"
                            : "bg-white hover:bg-amber-50 hover:text-amber-800 text-neutral-700 border-neutral-200 shadow-2xs"
                        }`}
                        aria-label="Trang sau"
                      >
                        &gt;
                      </Link>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            ) : (
              /* Empty State */
              <ScrollReveal animation="scale-in">
                <div className="text-center bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-14 max-w-md mx-auto shadow-xs">
                  <div className="w-16 h-16 bg-amber-50 border border-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xs">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-neutral-900 text-base sm:text-lg mb-2">
                    Không tìm thấy bài viết
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">
                    {currentSearch
                      ? `Không có bài viết nào phù hợp với từ khóa "${currentSearch}".`
                      : "Hiện tại danh mục này chưa có bài viết nào được đăng tải."}
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Link href="/tin-tuc">
                      <Button
                        className="font-bold text-xs tracking-wider uppercase bg-neutral-900 text-white rounded-xl py-2.5 px-5 hover:bg-neutral-800 cursor-pointer"
                        variant="outline"
                      >
                        Xem tất cả tin tức
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
