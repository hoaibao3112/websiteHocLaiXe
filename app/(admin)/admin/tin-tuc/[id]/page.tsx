"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { createNewsSchema, type CreateNewsInput } from "@/lib/validations/news.schema";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MultipleImageUpload } from "@/components/admin/MultipleImageUpload";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import type { NewsCategory, News } from "@/types/database.types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditNewsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isSlugTouched, setIsSlugTouched] = useState(true); // default to true since it's already created

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: null as string | null,
      images: [] as string[],
      category_id: null as string | null,
      is_published: false,
      meta_title: "" as string | null,
      meta_description: "" as string | null,
    },
  });

  const titleValue = watch("title");

  // Load categories and post data
  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();

        // Load categories
        const { data: cats } = await supabase
          .from("news_categories")
          .select("*")
          .order("display_order");
        setCategories(cats ?? []);

        // Load news article details
        const { data: newsItem, error } = (await supabase
          .from("news")
          .select("*")
          .eq("id", id)
          .single()) as { data: News | null; error: any };

        if (error || !newsItem) {
          alert("Không tìm thấy bài viết cần chỉnh sửa.");
          router.push("/admin/tin-tuc");
          return;
        }

        reset({
          title: newsItem.title,
          slug: newsItem.slug,
          excerpt: newsItem.excerpt || "",
          content: newsItem.content,
          cover_image: newsItem.cover_image,
          images: newsItem.images || [],
          category_id: newsItem.category_id,
          is_published: newsItem.is_published,
          meta_title: newsItem.meta_title || "",
          meta_description: newsItem.meta_description || "",
        });
      } catch (err) {
        console.error("Failed to load news article data:", err);
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, [id, reset, router]);

  // Auto slug from title (only if not manually touched)
  useEffect(() => {
    if (!isSlugTouched && titleValue) {
      const generatedSlug = slugify(titleValue, {
        lower: true,
        locale: "vi",
        strict: true,
      });
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [titleValue, isSlugTouched, setValue]);

  const onSubmit = async (data: CreateNewsInput) => {
    setSubmitting(true);
    try {
      const supabase = createClient();

      // Check if slug is unique (exclude current post)
      const { data: existingSlug } = await supabase
        .from("news")
        .select("id")
        .eq("slug", data.slug)
        .neq("id", id)
        .maybeSingle();

      if (existingSlug) {
        alert("Đường dẫn (slug) đã tồn tại. Vui lòng đổi tiêu đề hoặc đổi slug khác.");
        setSubmitting(false);
        return;
      }

      // Update news post
      const { error } = await (supabase.from("news") as any)
        .update({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || null,
          content: data.content,
          cover_image: data.cover_image || null,
          images: data.images || [],
          category_id: data.category_id || null,
          is_published: data.is_published,
          published_at: data.is_published ? new Date().toISOString() : null,
          meta_title: data.meta_title || data.title.slice(0, 60),
          meta_description: data.meta_description || data.excerpt?.slice(0, 160) || null,
        })
        .eq("id", id);

      if (error) throw error;

      router.push("/admin/tin-tuc");
      router.refresh();
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Đã xảy ra lỗi khi cập nhật bài viết. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
        <p className="text-sm text-neutral-500 font-medium">Đang tải thông tin bài viết...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Back button & title */}
      <div className="flex items-center gap-4">
        <Link href="/admin/tin-tuc">
          <Button variant="ghost" size="icon" className="hover:bg-neutral-100 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Chỉnh sửa bài viết</h1>
          <p className="text-neutral-500 mt-1">Cập nhật thông tin bài viết của bạn.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main content panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* General info */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Thông tin chung
            </h2>

            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề bài viết <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="Ví dụ: Hướng dẫn học lái xe B2 cho người mới bắt đầu"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Đường dẫn tĩnh (Slug) <span className="text-red-500">*</span></Label>
              <Input
                id="slug"
                placeholder="huong-dan-hoc-lai-xe-b2"
                {...register("slug")}
                onChange={(e) => {
                  setIsSlugTouched(true);
                  register("slug").onChange(e);
                }}
              />
              {errors.slug && (
                <p className="text-xs text-red-500">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Tóm tắt ngắn</Label>
              <Textarea
                id="excerpt"
                placeholder="Viết một đoạn tóm tắt ngắn..."
                className="h-20 resize-none"
                {...register("excerpt")}
              />
              {errors.excerpt && (
                <p className="text-xs text-red-500">{errors.excerpt.message}</p>
              )}
            </div>
          </div>

          {/* Editor content */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <Label>Nội dung bài viết <span className="text-red-500">*</span></Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  content={field.value}
                  onChange={(html) => field.onChange(html)}
                />
              )}
            />
            {errors.content && (
              <p className="text-xs text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Cấu hình SEO (Tùy chọn)
            </h2>

            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                placeholder="Nhập tiêu đề SEO..."
                {...register("meta_title")}
              />
              {errors.meta_title && (
                <p className="text-xs text-red-500">{errors.meta_title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                placeholder="Nhập mô tả SEO..."
                className="h-20 resize-none"
                {...register("meta_description")}
              />
              {errors.meta_description && (
                <p className="text-xs text-red-500">{errors.meta_description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar settings panel */}
        <div className="space-y-6">
          {/* Publication settings */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Cài đặt bài viết
            </h2>

            <div className="space-y-2">
              <Label htmlFor="category_id">Chuyên mục bài viết</Label>
              <Select
                id="category_id"
                {...register("category_id")}
                onChange={(e) => setValue("category_id", e.target.value || null)}
              >
                <option value="">-- Chưa phân loại --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              {errors.category_id && (
                <p className="text-xs text-red-500">{errors.category_id.message}</p>
              )}
            </div>

            <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-700">Công khai bài viết</span>
                <span className="text-xs text-neutral-400">Hiển thị trên trang chủ</span>
              </div>
              <input
                type="checkbox"
                id="is_published"
                className="w-5 h-5 rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                {...register("is_published")}
              />
            </div>

            <div className="border-t border-neutral-100 pt-5 flex gap-3">
              <Button type="submit" className="flex-1 inline-flex items-center justify-center gap-2" disabled={submitting}>
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Lưu thay đổi
              </Button>
              <Link href="/admin/tin-tuc" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Hủy bỏ
                </Button>
              </Link>
            </div>
          </div>

          {/* Cover image setting */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Ảnh bìa (Cover Image)
            </h2>
            <Controller
              name="cover_image"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ""}
                  onChange={(url) => field.onChange(url || null)}
                />
              )}
            />
            {errors.cover_image && (
              <p className="text-xs text-red-500">{errors.cover_image.message}</p>
            )}
          </div>

          {/* Multiple images upload container */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Album ảnh bài viết
            </h2>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <MultipleImageUpload
                  value={field.value || []}
                  onChange={(urls) => field.onChange(urls)}
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
