"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Newspaper, Loader2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { NewsWithCategory, NewsCategory } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsWithCategory[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      
      // Fetch categories
      const { data: cats } = await supabase
        .from("news_categories")
        .select("*")
        .order("display_order");
      setCategories(cats ?? []);

      // Fetch news
      const { data: articles } = await supabase
        .from("news")
        .select("*, news_categories(id, name, slug)")
        .order("created_at", { ascending: false });

      setNews((articles as NewsWithCategory[]) ?? []);
    } catch (err) {
      console.error("Failed to load news data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
      setNews((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete news:", err);
      alert("Không thể xóa bài viết. Vui lòng thử lại sau.");
    }
  };

  // Filters news locally for fast feedback loop
  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? item.category_id === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Quản lý bài viết</h1>
          <p className="text-neutral-500 mt-1">Đăng tải, chỉnh sửa hoặc ẩn/hiển thị tin tức và cẩm nang trên website.</p>
        </div>
        <Link href="/admin/tin-tuc/moi">
          <Button className="inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo bài viết mới
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Tìm kiếm theo tiêu đề bài viết..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-56">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả chuyên mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Content Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase">
                  <th className="py-4 px-6 w-20">Ảnh bìa</th>
                  <th className="py-4 px-6">Bài viết</th>
                  <th className="py-4 px-6 w-40">Chuyên mục</th>
                  <th className="py-4 px-6 w-36">Ngày đăng</th>
                  <th className="py-4 px-6 w-32">Trạng thái</th>
                  <th className="py-4 px-6 w-36 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                {filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-6">
                      {item.cover_image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-100">
                          <Image
                            src={item.cover_image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-xl">
                          📰
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-semibold text-neutral-900 group">
                        <Link href={`/admin/tin-tuc/${item.id}`} className="hover:text-brand-600 transition-colors line-clamp-2">
                          {item.title}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                        <span>Lượt xem: {item.view_count}</span>
                        {item.is_published && (
                          <>
                            <span>•</span>
                            <a
                              href={`/tin-tuc/${item.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-0.5 hover:text-brand-600"
                            >
                              Xem trang ngoài
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-neutral-600">
                        {item.news_categories?.name || "Chưa phân loại"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-neutral-500">
                      {formatDate(item.published_at || item.created_at)}
                    </td>
                    <td className="py-4 px-6">
                      <PublishToggle id={item.id} isPublished={item.is_published} />
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5">
                      <Link href={`/admin/tin-tuc/${item.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-brand-50 hover:text-brand-600 text-neutral-400"
                          title="Sửa bài viết"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id, item.title)}
                        className="hover:bg-red-50 hover:text-red-600 text-neutral-400"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white border border-neutral-100 rounded-3xl p-16 shadow-sm">
          <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-150">
            <Newspaper className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="font-bold text-neutral-900 text-lg mb-1">Không tìm thấy bài viết</h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Không tìm thấy bài viết nào khớp với từ khóa tìm kiếm hoặc chuyên mục của bạn.
          </p>
        </div>
      )}
    </div>
  );
}
