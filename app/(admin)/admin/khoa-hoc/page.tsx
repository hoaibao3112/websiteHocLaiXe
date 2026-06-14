"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, GraduationCap, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Course } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseActiveToggle } from "@/components/admin/CourseActiveToggle";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setCourses(data ?? []);
    } catch (err) {
      console.error("Failed to load courses data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${name}"?`)) return;

    try {
      const supabase = createClient();
      const { error } = await (supabase.from("courses") as any).delete().eq("id", id);
      if (error) throw error;
      setCourses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("Không thể xóa khóa học. Vui lòng thử lại sau.");
    }
  };

  // Lọc khóa học theo tên
  const filteredCourses = courses.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.class_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Quản lý khóa học</h1>
          <p className="text-neutral-500 mt-1">Cấu hình, cập nhật thông tin và học phí các hạng đào tạo lái xe.</p>
        </div>
        <Link href="/admin/khoa-hoc/moi">
          <Button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="w-5 h-5" />
            Tạo khóa học mới
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Tìm kiếm theo tên khóa học hoặc mã hạng bằng (ví dụ: B1, B2)..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase">
                  <th className="py-4 px-6 w-24">Ảnh minh họa</th>
                  <th className="py-4 px-6">Khóa học / Hạng bằng</th>
                  <th className="py-4 px-6 w-36 text-right">Học phí gốc</th>
                  <th className="py-4 px-6 w-36 text-right">Học phí giảm</th>
                  <th className="py-4 px-6 w-28 text-center">Thứ tự</th>
                  <th className="py-4 px-6 w-32">Trạng thái</th>
                  <th className="py-4 px-6 w-32 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                {filteredCourses.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-6">
                      {item.image_url ? (
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-100">
                          <Image
                            src={item.image_url}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-lg border border-neutral-100">
                          🚗
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-neutral-900">
                        <Link href={`/admin/khoa-hoc/${item.id}`} className="hover:text-emerald-700 transition-colors">
                          {item.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                        <span className="font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                          Hạng {item.class_code}
                        </span>
                        {item.badge && (
                          <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium border border-amber-100">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-neutral-500 line-through">
                      {item.original_price ? formatCurrency(item.original_price) : "—"}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-700">
                      {formatCurrency(item.sale_price)}
                    </td>
                    <td className="py-4 px-6 text-center font-medium text-neutral-600">
                      {item.display_order}
                    </td>
                    <td className="py-4 px-6">
                      <CourseActiveToggle id={item.id} isActive={item.is_active} />
                    </td>
                    <td className="py-4 px-6 text-right space-x-1">
                      <Link href={`/admin/khoa-hoc/${item.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-emerald-50 hover:text-emerald-700 text-neutral-400"
                          title="Sửa khóa học"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id, item.name)}
                        className="hover:bg-red-50 hover:text-red-600 text-neutral-400"
                        title="Xóa khóa học"
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
            <GraduationCap className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="font-bold text-neutral-900 text-lg mb-1">Không tìm thấy khóa học</h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Không tìm thấy khóa học nào khớp với từ khóa tìm kiếm của bạn.
          </p>
        </div>
      )}
    </div>
  );
}
