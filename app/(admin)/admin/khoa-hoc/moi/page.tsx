"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourseSchema, type CreateCourseInput } from "@/lib/validations/course.schema";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "",
      class_code: "",
      description: "",
      original_price: null as number | null,
      sale_price: 0,
      image_url: null as string | null,
      badge: "" as string | null,
      is_active: true,
      display_order: 1,
      features: [""] as string[], // Bắt đầu bằng 1 trường rỗng
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as never,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        router.push("/admin/dang-nhap");
        return;
      }

      // Lọc các feature trống
      const filteredFeatures = (data.features as string[])
        .map((f) => f.trim())
        .filter((f) => f !== "");

      // Insert course
      const { error } = await (supabase.from("courses") as any).insert({
        name: data.name,
        class_code: data.class_code.toUpperCase().trim(),
        description: data.description || null,
        original_price: data.original_price ? Number(data.original_price) : null,
        sale_price: Number(data.sale_price),
        image_url: data.image_url || null,
        badge: data.badge || null,
        is_active: data.is_active,
        display_order: Number(data.display_order),
        features: filteredFeatures.length > 0 ? filteredFeatures : null,
      });

      if (error) throw error;

      router.push("/admin/khoa-hoc");
      router.refresh();
    } catch (err) {
      console.error("Failed to create course:", err);
      alert("Đã xảy ra lỗi khi tạo khóa học. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Back button & title */}
      <div className="flex items-center gap-4">
        <Link href="/admin/khoa-hoc">
          <Button variant="ghost" size="icon" className="hover:bg-neutral-100 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Tạo khóa học mới</h1>
          <p className="text-neutral-500 mt-1">Cấu hình thông tin, học phí và các quyền lợi của khóa học.</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label htmlFor="name">Tên khóa học <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  placeholder="Ví dụ: Khóa học lái xe ô tô hạng B2 (Số sàn)"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="class_code">Mã hạng bằng (Hạng bằng) <span className="text-red-500">*</span></Label>
                <Select
                  id="class_code"
                  {...register("class_code")}
                >
                  <option value="">-- Chọn hạng bằng --</option>
                  <option value="B01">B1 (Số tự động)</option>
                  <option value="B">B2 (Số sàn & Số tự động)</option>
                  <option value="C1">C (Xe tải)</option>
                  <option value="A1">A1 (Xe máy)</option>
                  <option value="A">A (Mô tô phân khối lớn)</option>
                  <option value="NH">NH (Nâng hạng bằng)</option>
                </Select>
                {errors.class_code && (
                  <p className="text-xs text-red-500">{errors.class_code.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="badge">Nhãn hiển thị (Badge)</Label>
                <Input
                  id="badge"
                  placeholder="Ví dụ: Giảm 30%, Bán chạy..."
                  {...register("badge")}
                />
                {errors.badge && (
                  <p className="text-xs text-red-500">{errors.badge.message as string}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả ngắn khóa học</Label>
              <Textarea
                id="description"
                placeholder="Giới thiệu sơ lược về khóa học, thời gian đào tạo, quyền lợi..."
                className="h-28 resize-none"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description.message as string}</p>
              )}
            </div>
          </div>

          {/* Dynamic Features Input list */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-50 pb-3">
              <h2 className="font-bold text-neutral-900 text-lg">
                Đặc điểm nổi bật (Quyền lợi khóa học)
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/80"
                onClick={() => append("")}
              >
                <Plus className="w-4 h-4" />
                Thêm dòng
              </Button>
            </div>
            
            <p className="text-xs text-neutral-400">
              Các đặc điểm này sẽ được hiển thị dạng bullet-points để học viên dễ so sánh (Ví dụ: "Học 1 kèm 1", "Sân thi đạt chuẩn", "Bao gồm lệ phí thi").
            </p>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Đặc điểm thứ ${index + 1}`}
                    {...register(`features.${index}` as never)}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-50 hover:text-red-600 text-neutral-400"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar settings panel */}
        <div className="space-y-6">
          {/* Price and publishing settings */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Học phí & Thứ tự
            </h2>

            <div className="space-y-2">
              <Label htmlFor="original_price">Học phí gốc (VND)</Label>
              <Input
                id="original_price"
                type="number"
                placeholder="Ví dụ: 15000000"
                {...register("original_price", { valueAsNumber: true })}
              />
              {errors.original_price && (
                <p className="text-xs text-red-500">{errors.original_price.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sale_price">Học phí thực tế (VND) <span className="text-red-500">*</span></Label>
              <Input
                id="sale_price"
                type="number"
                placeholder="Ví dụ: 12000000"
                {...register("sale_price", { valueAsNumber: true })}
              />
              {errors.sale_price && (
                <p className="text-xs text-red-500">{errors.sale_price.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Thứ tự hiển thị</Label>
              <Input
                id="display_order"
                type="number"
                placeholder="Ví dụ: 1 (hiển thị đầu tiên)"
                {...register("display_order", { valueAsNumber: true })}
              />
              {errors.display_order && (
                <p className="text-xs text-red-500">{errors.display_order.message as string}</p>
              )}
            </div>

            <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-700">Kích hoạt hiển thị</span>
                <span className="text-xs text-neutral-400">Hiển thị ngay trên trang chủ</span>
              </div>
              <input
                type="checkbox"
                id="is_active"
                className="w-5 h-5 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                {...register("is_active")}
              />
            </div>

            <div className="border-t border-neutral-100 pt-5 flex gap-3">
              <Button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Lưu khóa học
              </Button>
              <Link href="/admin/khoa-hoc" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Hủy bỏ
                </Button>
              </Link>
            </div>
          </div>

          {/* Cover image upload container */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg border-b border-neutral-50 pb-3">
              Ảnh khóa học (Cover Image)
            </h2>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ""}
                  onChange={(url) => field.onChange(url || null)}
                />
              )}
            />
            {errors.image_url && (
              <p className="text-xs text-red-500">{errors.image_url.message as string}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
