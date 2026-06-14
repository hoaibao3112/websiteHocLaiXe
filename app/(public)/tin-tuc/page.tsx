import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import type { NewsWithCategory, NewsCategory } from "@/types/database.types";
import { Newspaper, Search, Calendar, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện - Trường Lái Xe Chiến Thắng",
  description:
    "Cập nhật tin tức mới nhất, luật giao thông đường bộ và kinh nghiệm lái xe an toàn từ Trường lái xe Chiến Thắng.",
};

// Revalidate public news listing every 15 minutes
export const revalidate = 900;

const ITEMS_PER_PAGE = 4;

async function getCategories() {
  const supabase = await createClient();
  
  // Fetch all categories
  const { data: categories } = await supabase
    .from("news_categories")
    .select("*")
    .order("display_order") as unknown as { data: NewsCategory[] | null };

  // Fetch all published news category_ids to count them in JS safely
  const { data: newsItems } = await supabase
    .from("news")
    .select("category_id")
    .eq("is_published", true) as unknown as { data: { category_id: string | null }[] | null };

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

async function getFeaturedNews(): Promise<{ id: string; title: string; slug: string; published_at: string | null }[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("id, title, slug, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3) as unknown as { data: { id: string; title: string; slug: string; published_at: string | null }[] | null };
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
  const currentPage = Number(params.page || "1");

  const [categories, featuredList, { news, count }] = await Promise.all([
    getCategories(),
    getFeaturedNews(),
    getNews(currentCategory, currentSearch, currentPage),
  ]);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <main className="py-20 bg-white min-h-screen overflow-x-hidden">
      {/* Dark Breadcrumb and Header Banner */}
      <section className="relative bg-[#1f2937] text-white py-20 px-4 mb-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/banner-page.jpg"
            alt="Tin tức Chiến Thắng"
            fill
            className="object-cover object-right opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal animation="fade-in">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-6 uppercase tracking-wider font-semibold">
              <Link href="/" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-amber-400">Tin tức & Sự kiện</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-4 uppercase leading-tight text-white">
              TIN TỨC & SỰ KIỆN CHIẾN THẮNG
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Cập nhật quy định mới, mẹo thi sát hạch lý thuyết & thực hành dễ đỗ, và các hoạt động sôi nổi từ trung tâm.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sidebar Filters (span 4) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Search Box */}
            <ScrollReveal animation="slide-right">
              <div className="bg-slate-50 rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-200/60 pb-3.5 mb-5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-250 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all bg-white font-medium"
                  />
                  <Search className="w-4.5 h-4.5 text-neutral-400 absolute left-4 top-3.5" />
                </form>
              </div>
            </ScrollReveal>

            {/* Categories */}
            <ScrollReveal animation="slide-right" delay={100}>
              <div className="bg-slate-50 rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-200/60 pb-3.5 mb-5">
                  Chuyên mục
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/tin-tuc"
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      !currentCategory
                        ? "text-amber-800 bg-amber-50 border border-amber-200 shadow-sm"
                        : "text-neutral-600 border border-transparent hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <span>Tất cả bài viết</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      !currentCategory ? "bg-amber-500 text-white" : "bg-neutral-200/80 text-neutral-500"
                    }`}>
                      {categories.reduce((acc, cat) => acc + cat.count, 0)}
                    </span>
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/tin-tuc?category=${cat.slug}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        currentCategory === cat.slug
                          ? "text-amber-800 bg-amber-50 border border-amber-200 shadow-sm"
                          : "text-neutral-600 border border-transparent hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        currentCategory === cat.slug ? "bg-amber-500 text-white" : "bg-neutral-200/80 text-neutral-500"
                      }`}>
                        {String(cat.count).padStart(2, "0")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Featured news */}
            <ScrollReveal animation="slide-right" delay={200}>
              <div className="bg-slate-50 rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-200/60 pb-3.5 mb-5">
                  Tin nổi bật nhất
                </h3>
                <div className="space-y-4">
                  {featuredList.map((item) => (
                    <Link
                      key={item.id}
                      href={`/tin-tuc/${item.slug}`}
                      className="block group border-b border-neutral-200/60 last:border-0 pb-3.5 last:pb-0"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-amber-700 line-clamp-2 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.published_at!).toLocaleDateString("vi-VN")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </aside>

          {/* Right Column: News Grid & Pagination (span 8) */}
          <div className="lg:col-span-8 space-y-10">
            {news.length > 0 ? (
              <div>
                <div className="grid sm:grid-cols-2 gap-8">
                  {news.map((item, idx) => (
                    <ScrollReveal key={item.id} animation="slide-up" delay={idx * 100}>
                      <article className="hover-lift card-underline bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group h-full">
                        <div>
                          {/* Image & tag */}
                          <div className="relative aspect-video overflow-hidden bg-slate-50 img-zoom border-b border-neutral-100/60">
                            {item.cover_image ? (
                              <Image
                                src={item.cover_image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <Newspaper className="w-14 h-14 text-slate-300 animate-pulse" />
                              </div>
                            )}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                              {item.news_categories?.name}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <span className="text-neutral-400 text-[10px] flex items-center gap-1.5 mb-3 font-semibold uppercase tracking-wider">
                              <Calendar className="w-3.5 h-3.5 text-amber-500" />
                              {new Date(item.published_at!).toLocaleDateString("vi-VN")}
                            </span>
                            <h3 className="font-extrabold text-neutral-900 text-base leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-neutral-500 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed font-medium">
                              {item.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="p-6 pt-0 mt-4">
                          <Link
                            href={`/tin-tuc/${item.slug}`}
                            className="group/btn inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-900 font-extrabold text-xs uppercase tracking-wider pt-4 border-t border-neutral-150 w-full"
                          >
                            <span>Xem chi tiết bài viết</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </article>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <ScrollReveal animation="fade-in">
                    <div className="flex justify-center items-center gap-2 mt-16 border-t border-neutral-100 pt-8">
                      <Link
                        href={`/tin-tuc?${
                          currentCategory ? `category=${currentCategory}&` : ""
                        }${currentSearch ? `search=${currentSearch}&` : ""}page=${currentPage - 1}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl border text-xs font-bold transition-all shadow-xs ${
                          currentPage <= 1
                            ? "pointer-events-none opacity-40 bg-neutral-50 text-neutral-400 border-neutral-200"
                            : "bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200"
                        }`}
                      >
                        &lt;
                      </Link>
                      
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const p = idx + 1;
                        const isActive = p === currentPage;
                        return (
                          <Link
                            key={p}
                            href={`/tin-tuc?${
                              currentCategory ? `category=${currentCategory}&` : ""
                            }${currentSearch ? `search=${currentSearch}&` : ""}page=${p}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${
                              isActive
                                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                : "bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200"
                            }`}
                          >
                            {p}
                          </Link>
                        );
                      })}

                      <Link
                        href={`/tin-tuc?${
                          currentCategory ? `category=${currentCategory}&` : ""
                        }${currentSearch ? `search=${currentSearch}&` : ""}page=${currentPage + 1}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl border text-xs font-bold transition-all shadow-xs ${
                          currentPage >= totalPages
                            ? "pointer-events-none opacity-40 bg-neutral-50 text-neutral-400 border-neutral-200"
                            : "bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200"
                        }`}
                      >
                        &gt;
                      </Link>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            ) : (
              <ScrollReveal animation="scale-in">
                <div className="text-center bg-slate-50 border border-neutral-100 rounded-3xl p-16 max-w-md mx-auto shadow-sm">
                  <div className="w-16 h-16 bg-neutral-200/50 text-neutral-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs animate-bounce-gentle">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-neutral-900 text-lg mb-2">Chưa có bài viết</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                    {currentSearch
                      ? "Không tìm thấy bài viết nào khớp với từ khóa của bạn."
                      : "Hiện tại danh mục này chưa có bài viết nào được đăng."}
                  </p>
                  <Link href="/tin-tuc">
                    <Button className="mt-8 font-extrabold text-xs tracking-wider uppercase bg-neutral-900 text-white rounded-xl py-3 px-6 hover:bg-neutral-800" variant="outline">
                      Xem tất cả bài viết
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
