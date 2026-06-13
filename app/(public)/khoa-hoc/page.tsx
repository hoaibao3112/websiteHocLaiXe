import type { Metadata } from "next";
import { CourseCard } from "@/components/public/CourseCard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { Course } from "@/types/database.types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Khóa học lái xe",
  description:
    "Các khóa học lái xe hạng B1, B2, C1 tại trường lái xe Chiến Thắng. Học phí hợp lý, chất lượng đào tạo cao.",
};

async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  return data ?? [];
}

const FAQ = [
  {
    q: "Thời gian đào tạo mỗi khóa là bao lâu?",
    a: "Tùy theo hạng bằng: Hạng B1 khoảng 2.5 tháng, Hạng B2 khoảng 4 tháng, Hạng C khoảng 4 – 6 tháng. Bao gồm đủ giờ học lý thuyết và thực hành theo quy định.",
  },
  {
    q: "Tôi cần chuẩn bị những gì khi đăng ký học?",
    a: "CMND/CCCD bản gốc, ảnh thẻ 3x4, giấy khám sức khỏe và học phí theo từng khóa. Chi tiết xem trang Hồ sơ đăng ký.",
  },
  {
    q: "Chính sách thi lại như thế nào?",
    a: "Trung tâm cam kết hỗ trợ tối đa cho học viên ôn tập và thi sát hạch để đạt kết quả tốt nhất ngay tại sân sát hạch riêng của trường.",
  },
  {
    q: "Lịch học có linh hoạt không?",
    a: "Có! Chúng tôi tổ chức học theo ca sáng, chiều và tối, giúp học viên đi làm hoặc sinh viên dễ sắp xếp.",
  },
];

export default async function KhoaHocPage() {
  const courses = await getCourses();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-950 to-brand-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">
            Khóa học
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Chọn khóa học phù hợp
          </h1>
          <p className="text-lg text-neutral-300">
            Đa dạng khóa học từ hạng B đến C, học phí cạnh tranh, chất lượng đào tạo cao.
          </p>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-lg mb-4">
                Đang cập nhật thông tin khóa học.
              </p>
              <a
                href="tel:0888861888"
                className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-full font-semibold"
              >
                <Phone className="w-5 h-5" />
                Liên hệ để biết thêm
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-neutral-900">
              Câu hỏi thường gặp
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">{item.q}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-neutral-500 text-sm mb-4">
              Còn câu hỏi khác? Liên hệ tư vấn miễn phí.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
