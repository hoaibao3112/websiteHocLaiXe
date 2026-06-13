import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import type { NewsWithCategory, NewsCategory } from "@/types/database.types";
import { Newspaper, Search, Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện",
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
    <main className="py-20 bg-neutral-50/50 min-h-screen">
      {/* Dark Breadcrumb and Header Banner */}
      <section className="bg-[#1f2937] text-white py-14 px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-200">Tin tức</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Tin tức & Sự kiện
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Sidebar Filters (span 4) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Search Box */}
            <div className="bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
                Tìm kiếm
              </h3>
              <form action="/tin-tuc" method="GET" className="relative">
                {currentCategory && (
                  <input type="hidden" name="category" value={currentCategory} />
                )}
                <input
                  type="text"
                  name="search"
                  defaultValue={currentSearch}
                  placeholder="Nhập từ khóa..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-neutral-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
                Chuyên mục
              </h3>
              <div className="space-y-1">
                <Link
                  href="/tin-tuc"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    !currentCategory
                      ? "text-brand-700 bg-amber-50"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <span>Tất cả bài viết</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    !currentCategory ? "bg-amber-100 text-amber-800" : "bg-neutral-100 text-neutral-500"
                  }`}>
                    {categories.reduce((acc, cat) => acc + cat.count, 0)}
                  </span>
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/tin-tuc?category=${cat.slug}`}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                      currentCategory === cat.slug
                        ? "text-brand-700 bg-amber-50"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      currentCategory === cat.slug ? "bg-amber-100 text-amber-800" : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {String(cat.count).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured news */}
            <div className="bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
                Tin nổi bật
              </h3>
              <div className="space-y-4">
                {featuredList.map((item) => (
                  <Link
                    key={item.id}
                    href={`/tin-tuc/${item.slug}`}
                    className="block group border-b border-neutral-100 last:border-0 pb-3 last:pb-0"
                  >
                    <h4 className="text-sm font-semibold text-neutral-800 group-hover:text-brand-700 line-clamp-2 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.published_at!).toLocaleDateString("vi-VN")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column: News Grid & Pagination (span 8) */}
          <div className="lg:col-span-8 space-y-10">
            {news.length > 0 ? (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  {news.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white rounded-xl overflow-hidden border border-neutral-200/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image & tag */}
                        <div className="relative aspect-video overflow-hidden bg-neutral-100">
                          {item.cover_image ? (
                            <Image
                              src={item.cover_image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                              <Newspaper className="w-12 h-12" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-[#b45309] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {item.news_categories?.name}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <span className="text-neutral-400 text-xs flex items-center gap-1.5 mb-2 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(item.published_at!).toLocaleDateString("vi-VN")}
                          </span>
                          <h3 className="font-bold text-neutral-900 text-base leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-neutral-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-neutral-100/50 mt-4">
                        <Link
                          href={`/tin-tuc/${item.slug}`}
                          className="inline-flex items-center gap-1 text-[#b45309] hover:text-[#92400e] font-bold text-xs pt-3"
                        >
                          <span>Xem chi tiết</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12 border-t border-neutral-200/60 pt-6">
                    <Link
                      href={`/tin-tuc?${
                        currentCategory ? `category=${currentCategory}&` : ""
                      }${currentSearch ? `search=${currentSearch}&` : ""}page=${currentPage - 1}`}
                      className={`px-3 py-2 rounded border text-xs font-bold transition-all ${
                        currentPage <= 1
                          ? "pointer-events-none opacity-40 bg-neutral-100 text-neutral-400"
                          : "bg-white hover:bg-neutral-50 text-neutral-700"
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
                          className={`w-9 h-9 flex items-center justify-center rounded text-xs font-bold transition-all ${
                            isActive
                              ? "bg-[#b45309] text-white"
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
                      className={`px-3 py-2 rounded border text-xs font-bold transition-all ${
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-40 bg-neutral-100 text-neutral-400"
                          : "bg-white hover:bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      &gt;
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center bg-white border border-neutral-200/60 rounded-xl p-16 max-w-md mx-auto shadow-xs">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-bold text-neutral-900 text-lg mb-1">Chưa có bài viết</h3>
                <p className="text-sm text-neutral-400">
                  {currentSearch
                    ? "Không tìm thấy bài viết nào khớp với từ khóa của bạn."
                    : "Hiện tại danh mục này chưa có bài viết nào được đăng."}
                </p>
                <Link href="/tin-tuc">
                  <Button className="mt-6 font-semibold" variant="outline">
                    Xem tất cả bài viết
                  </Button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
