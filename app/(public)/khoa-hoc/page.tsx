import type { Metadata } from "next";
import { CourseCard } from "@/components/public/CourseCard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight, HelpCircle, ArrowRight, Sparkles, MessageCircleQuestion } from "lucide-react";
import type { Course } from "@/types/database.types";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Khóa học lái xe - Trường Lái Xe Chiến Thắng",
  description:
    "Các khóa học lái xe hạng B1, B2, C tại trường lái xe Chiến Thắng. Học phí hợp lý, chất lượng đào tạo cao.",
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
    q: "Thời gian đào tạo mỗi khóa học lái xe ô tô là bao lâu?",
    a: "Thời gian học chuẩn theo quy định của Tổng cục Đường bộ: Hạng B (số tự động) khoảng 3 - 3,5 tháng, Hạng B (số sàn) khoảng 4 - 4,5 tháng, Hạng C1 (xe tải) từ 4,5 - 5 tháng. Lịch học thực hành phân bổ linh hoạt theo lịch cá nhân của học viên.",
  },
  {
    q: "Học phí đã bao gồm trọn gói hay có phát sinh chi phí gì khác không?",
    a: "Học phí tại Chiến Thắng cam kết công khai, rõ ràng và trọn gói. Đã bao gồm chi phí xăng xe, sân tập, công thầy giảng dạy, tài liệu lý thuyết, và phần mềm mô phỏng. Cam kết không phát sinh bất kỳ khoản phí tiêu cực nào trong suốt khóa học.",
  },
  {
    q: "Lịch học lý thuyết và thực hành được sắp xếp thế nào?",
    a: "Học viên được hoàn toàn chủ động đăng ký giờ học thực hành trực tiếp với giáo viên (ca Sáng - Chiều - Tối, kể cả Thứ Bảy và Chủ Nhật) phù hợp cho người đi làm bận rộn. Các buổi lý thuyết được tổ chức linh hoạt hàng tuần tại trung tâm.",
  },
  {
    q: "Tôi có được tập xe thiết bị (xe cabin mô phỏng) không?",
    a: "Có! Chương trình học được cập nhật đầy đủ bài học trên cabin mô phỏng thực tế ảo và đủ số km thực hành trên đường trường có gắn thiết bị giám sát hành trình (DAT) theo đúng tiêu chuẩn mới nhất của Bộ Giao thông Vận tải.",
  },
];

export default async function KhoaHocPage() {
  const courses = await getCourses();

  return (
    <div className="pt-20 bg-white overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-[#1f2937] text-white py-20 px-4 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/banner-page.jpg"
            alt="Khóa học lái xe Chiến Thắng"
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
              <span className="text-amber-400">Khóa học đào tạo</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-4 uppercase leading-tight text-white">
              CHƯƠNG TRÌNH ĐÀO TẠO LÁI XE
            </h1>
            <p className="text-neutral-350 text-sm sm:text-base max-w-2xl leading-relaxed">
              Lộ trình đào tạo chuẩn quy định, cam kết tay lái vững vàng cùng tỉ lệ đỗ thi sát hạch vượt trội tại Đồng Tháp.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                Lựa chọn tối ưu
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a]">
                Các Khóa Học Tuyển Sinh Mới
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <ScrollReveal key={course.id} animation="slide-up" delay={idx * 150}>
                  <CourseCard course={course} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal animation="scale-in">
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-neutral-100 max-w-lg mx-auto p-8 shadow-sm">
                <p className="text-neutral-500 text-sm sm:text-base mb-6 font-medium">
                  Trung tâm hiện đang cập nhật lịch chi tiết các khóa học mới. Vui lòng kết nối Hotline để được tư vấn nhanh nhất.
                </p>
                <a
                  href="tel:0902868928"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold px-8 py-4 rounded-xl text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  GỌI TƯ VẤN: 0902.868.928
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-t border-neutral-100/60 relative">
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <MessageCircleQuestion className="w-3.5 h-3.5" />
                Giải đáp thắc mắc
              </div>
              <h2 className="font-display text-3xl font-extrabold text-[#1e3a8a]">
                Câu Hỏi Thường Gặp
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-5">
            {FAQ.map((item, i) => (
              <ScrollReveal key={i} animation="slide-up" delay={i * 100}>
                <div className="hover-lift bg-white rounded-2xl p-6 sm:p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm font-black text-xs">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                        {item.q}
                      </h3>
                      <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mt-3 pt-3 border-t border-neutral-100/60">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="scale-in" delay={200}>
            <div className="mt-14 text-center bg-white rounded-3xl border border-neutral-100 p-8 shadow-xl max-w-xl mx-auto">
              <p className="text-neutral-500 text-xs sm:text-sm mb-5 font-semibold">
                Bạn vẫn còn những băn khoăn hay cần tư vấn lộ trình học phù hợp nhất?
              </p>
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold px-8 py-4 rounded-xl text-xs transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                <span>LIÊN HỆ TƯ VẤN MIỄN PHÍ</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
