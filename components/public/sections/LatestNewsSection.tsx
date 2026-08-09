import Image from "next/image";
import Link from "next/link";
import { Calendar, Sparkles, ArrowRight, Newspaper } from "lucide-react";
import type { NewsWithCategory } from "@/types/database.types";
import { ScrollReveal } from "@/components/public/ScrollReveal";

interface LatestNewsSectionProps {
  latestNews: NewsWithCategory[];
}

export function LatestNewsSection({ latestNews }: LatestNewsSectionProps) {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                Tin tức mới nhất
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a]">
                Tin tức & Cẩm nang lái xe
              </h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-sm">
                Cập nhật tin tức sự kiện mới nhất và những kinh nghiệm bổ ích khi học lái xe.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full" />
            </div>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1.5 text-xs text-[#1e3a8a] hover:text-amber-700 font-extrabold transition-colors group uppercase tracking-wider"
            >
              <span>Xem tất cả tin tức</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((item, index) => (
              <ScrollReveal
                key={item.id}
                animation="slide-up"
                delay={index * 150}
                className="flex flex-col"
              >
                <article className="hover-lift bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group h-full">
                  <div>
                    {/* Image & Category Tag */}
                    <div className="relative aspect-video overflow-hidden bg-slate-50 img-zoom border-b border-neutral-100/60">
                      {item.cover_image ? (
                        <Image
                          src={item.cover_image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-slate-300 animate-pulse" />
                        </div>
                      )}
                      {item.news_categories?.name && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {item.news_categories.name}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-neutral-400 text-[10px] flex items-center gap-1.5 mb-3 font-semibold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {item.published_at ? new Date(item.published_at).toLocaleDateString("vi-VN") : ""}
                      </span>
                      <h3 className="font-bold text-neutral-900 text-base leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
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
        ) : (
          <p className="text-center text-neutral-400 py-10">
            Hiện tại trung tâm chưa đăng tải tin tức nào.
          </p>
        )}
      </div>
    </section>
  );
}
