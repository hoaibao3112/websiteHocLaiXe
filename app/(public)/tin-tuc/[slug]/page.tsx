import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { NewsWithCategory } from "@/types/database.types";
import { NewsGallery } from "@/components/public/NewsGallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // ISR revalidate every 1 hour

// Pre-render top 10 most recent published articles
export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data } = (await supabase
    .from("news")
    .select("slug")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(10)) as { data: { slug: string }[] | null };

  return data?.map((item) => ({ slug: item.slug })) || [];
}

async function getNewsDetail(slug: string): Promise<NewsWithCategory | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*, news_categories(id, name, slug)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return (data as unknown as NewsWithCategory) || null;
}

async function getRecentNews(excludeId: string): Promise<NewsWithCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*, news_categories(id, name, slug)")
    .eq("is_published", true)
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(10);

  return (data as NewsWithCategory[]) || [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: news.meta_title || news.title,
    description: (news.meta_description || news.excerpt) ?? undefined,
    openGraph: {
      title: news.meta_title || news.title,
      description: (news.meta_description || news.excerpt) ?? undefined,
      images: news.cover_image ? [news.cover_image] : [],
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) {
    notFound();
  }

  const recentNews = await getRecentNews(news.id);

  return (
    <main className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-neutral-400 text-sm mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tin-tuc" className="hover:text-brand-600 transition-colors">
            Tin tức
          </Link>
          <ChevronRight className="w-4 h-4" />
          {news.news_categories && (
            <>
              <Link
                href={`/tin-tuc?category=${news.news_categories.slug}`}
                className="hover:text-brand-600 transition-colors"
              >
                {news.news_categories.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-neutral-600 truncate max-w-[200px] md:max-w-sm">
            {news.title}
          </span>
        </nav>

        {/* Back Link */}
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-600 text-sm font-semibold mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Quay lại danh sách tin
        </Link>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <article className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-10 border border-neutral-100 shadow-sm">
            {/* Header info */}
            {news.news_categories && (
              <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Tag className="w-3 h-3" />
                {news.news_categories.name}
              </span>
            )}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-neutral-400 text-xs sm:text-sm border-b border-neutral-100 pb-6 mb-8">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.published_at ?? news.created_at}>
                  {formatDate(news.published_at ?? news.created_at)}
                </time>
              </div>
            </div>

            {/* Cover image */}
            {news.cover_image && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 mb-8">
                <Image
                  src={news.cover_image}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            )}

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-neutral-500 font-medium text-lg leading-relaxed border-l-4 border-brand-500 pl-4 mb-8">
                {news.excerpt}
              </p>
            )}

            {/* HTML Content */}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {/* Gallery Images */}
            <NewsGallery images={news.images} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm lg:sticky lg:top-28">
              <h2 className="font-bold text-neutral-900 text-lg mb-6 border-b border-neutral-100 pb-3 flex items-center gap-2">
                <span>📰</span> Bài viết mới nhất
              </h2>
              {recentNews.length > 0 ? (
                <div className="space-y-6 max-h-[550px] overflow-y-auto pr-2">
                  {recentNews.map((item) => (
                    <div key={item.id} className="group flex items-start gap-4">
                      {item.cover_image ? (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                          <Image
                            src={item.cover_image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-brand-50 flex items-center justify-center text-2xl flex-shrink-0">
                          📰
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {item.news_categories && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-600 mb-1 block">
                            {item.news_categories.name}
                          </span>
                        )}
                        <h3 className="font-semibold text-neutral-900 text-sm group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-1">
                          <Link href={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <time className="text-[10px] text-neutral-400 block">
                          {formatDate(item.published_at ?? item.created_at)}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">Không có bài viết nào khác.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
