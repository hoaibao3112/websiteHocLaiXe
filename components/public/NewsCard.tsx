import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { formatDate, truncate } from "@/lib/utils";
import type { NewsWithCategory } from "@/types/database.types";

interface NewsCardProps {
  news: NewsWithCategory;
  featured?: boolean;
}

export function NewsCard({ news, featured = false }: NewsCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-neutral-100 flex flex-col ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* Cover image */}
      <div
        className={`relative overflow-hidden bg-neutral-100 ${
          featured ? "lg:w-2/5 h-52 lg:h-auto" : "h-48"
        }`}
      >
        {news.cover_image ? (
          <Image
            src={news.cover_image}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={featured ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-5xl">📰</span>
          </div>
        )}

        {/* Category badge */}
        {news.news_categories && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {news.news_categories.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={news.published_at ?? news.created_at}>
            {formatDate(news.published_at ?? news.created_at)}
          </time>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-neutral-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          <Link href={`/tin-tuc/${news.slug}`} className="line-clamp-2">
            {news.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {news.excerpt && (
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1 mb-4">
            {news.excerpt}
          </p>
        )}

        {/* Read more */}
        <Link
          href={`/tin-tuc/${news.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors mt-auto"
        >
          Đọc thêm
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
