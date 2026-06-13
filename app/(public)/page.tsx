import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Phone, Mail, MapPin, Calendar, Users, Clock, Award, Shield, Check, ExternalLink, ArrowRight } from "lucide-react";
import type { Course, NewsWithCategory } from "@/types/database.types";
import { HomepageContactForm } from "@/components/public/HomepageContactForm";

export const metadata: Metadata = {
  title: "Trường Lái Xe Chiến Thắng — Đào tạo lái xe uy tín tại Tiền Giang",
  description:
    "Trường lái xe Chiến Thắng — hơn 10 năm kinh nghiệm đào tạo lái xe hạng B1, B2, C. Tỉ lệ đậu thi cao, giáo viên tận tâm, sân sát hạch đạt chuẩn.",
};

export const revalidate = 3600;

async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  return data ?? [];
}

function formatPrice(price: number) {
  return (price / 1000000).toFixed(1).replace(".0", "") + " triệu";
}

function getStudentsCount(classCode: string) {
  if (classCode === "B01") return "560 học viên đăng ký";
  if (classCode === "B") return "720 học viên đăng ký";
  if (classCode === "C1") return "1180 học viên đăng ký";
  return "350+ học viên đăng ký";
}

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <div className="bg-neutral-50/30">
      
      {/* 1. Hero Section with dynamic blue car background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero_bg.png"
            alt="Sân sát hạch Chiến Thắng"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark Navy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-neutral-950/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 z-10 animate-fade-in">
          <div className="max-w-3xl">
            {/* Sub-tag */}
            <div className="inline-block bg-[#b45309] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-6">
              TRUNG TÂM ĐÀO TẠO LÁI XE CHIẾN THẮNG
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Trung tâm duy nhất tại tỉnh Tiền Giang{" "}
              <span className="text-amber-400 block sm:inline">có sân sát hạch</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-8 max-w-xl">
              Với tổng diện tích hơn 20.000m², phòng học hiện đại đáp ứng nhu cầu học và thi sát
              hạch lái xe. Hệ thống xe tập lái mới 100%, đội ngũ giáo viên giàu kinh nghiệm, tận tâm.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/khoa-hoc"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3.5 rounded-md text-sm transition-all shadow-md hover:-translate-y-0.5"
              >
                Xem lộ trình đào tạo →
              </Link>
              <Link
                href="/lien-he"
                className="border border-white hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-md text-sm transition-all hover:-translate-y-0.5"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>

        {/* Floating golden call widget */}
        <div className="absolute right-6 bottom-12 z-20">
          <a
            href="tel:0888861888"
            className="w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all animate-bounce"
            title="Gọi ngay cho chúng tôi"
          >
            <Phone className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* 2. Three highlights cards below hero */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-6 flex gap-4 items-start hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-700">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1 uppercase tracking-wide">
                Sân sát hạch tại nhà
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Học và thi ngay tại trung tâm, giúp học viên tự tin và tỷ lệ đậu cao nhất.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-6 flex gap-4 items-start hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-700">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1 uppercase tracking-wide">
                Xe tập lái mới
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Được học trên xe đời mới 2022 - 2023, máy lạnh đầy đủ, vận hành êm ái.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-6 flex gap-4 items-start hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-700">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1 uppercase tracking-wide">
                Lịch học linh hoạt
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Học viên chủ động sắp xếp thời gian kể cả thứ 7 và Chủ nhật.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Courses section "Thông tin các khóa học tại Chiến Thắng" */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-slide-up">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a]">
              Thông tin các khóa học tại Chiến Thắng
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Course Image */}
                    <div className="relative aspect-video w-full bg-neutral-100">
                      {course.image_url ? (
                        <Image
                          src={course.image_url}
                          alt={course.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                          <Users className="w-12 h-12" />
                        </div>
                      )}
                      {course.badge && (
                        <div className="absolute top-3 left-3 bg-[#b45309] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                          {course.badge}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-neutral-500 text-xs leading-relaxed mb-6 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="space-y-2.5 border-t border-neutral-100 pt-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                          <span className="text-neutral-400 font-normal">Học phí:</span>
                          <span className="text-amber-700">{formatPrice(course.sale_price)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                          <span className="text-neutral-400 font-normal">Học viên:</span>
                          <span>{getStudentsCount(course.class_code)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4">
                    <Link
                      href={`/khoa-hoc/${course.class_code.toLowerCase() === "b01" ? "b1" : course.class_code.toLowerCase() === "b" ? "b2" : "c"}`}
                      className="block text-center bg-[#78350f] hover:bg-[#92400e] text-white font-bold py-2.5 rounded text-xs transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-400">
              Hiện tại trung tâm đang cập nhật danh sách khóa học. Vui lòng liên hệ hotline.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc] border-y border-neutral-200/60 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-extrabold text-[#1e3a8a] tracking-wide uppercase">
              LỊCH THI TỐT NGHIỆP & SÁT HẠCH
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-3" />
          </div>

          {/* Central Logo Emblem */}
          <div className="flex justify-center mb-10">
            <div className="px-6 py-4 rounded-xl border border-neutral-200/80 bg-white shadow-sm flex items-center justify-center max-w-[240px]">
              <Image
                src="/logo-win.png"
                alt="Emblem Chiến Thắng"
                width={180}
                height={55}
                className="object-contain h-12 w-auto animate-pulse"
              />
            </div>
          </div>

          {/* Timeline Months grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { m: "Tháng 07", y: "Năm 2024", active: false },
              { m: "Tháng 08", y: "Năm 2024", active: false },
              { m: "Tháng 09", y: "Năm 2024", active: true },
              { m: "Tháng 10", y: "Năm 2024", active: false },
              { m: "Tháng 11", y: "Năm 2024", active: false },
            ].map((month, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl text-center shadow-xs border transition-all flex flex-col items-center justify-between ${
                  month.active
                    ? "bg-white border-amber-500 ring-2 ring-amber-500/20"
                    : "bg-white border-neutral-200/60"
                }`}
              >
                <div className="mb-3 flex justify-center">
                  <Image
                    src="/logo-win.png"
                    alt="Logo Chiến Thắng"
                    width={50}
                    height={50}
                    className="object-contain h-10 w-auto"
                  />
                </div>
                <div>
                  <div className={`text-sm font-bold ${month.active ? "text-amber-700" : "text-neutral-700"}`}>
                    {month.m}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium mt-1">{month.y}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 border-b border-neutral-100 pb-5">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-[#1e3a8a]">
                Cơ sở vật chất hiện đại
              </h2>
              <p className="text-neutral-500 text-xs mt-2">
                Hệ thống sân tập và phòng học đạt tiêu chuẩn của Bộ Giao thông Vận tải.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-brand-600 font-semibold"
            >
              <span>Xem tất cả hình ảnh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grid structure matching cairo layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Left large photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[350px] shadow-sm group">
              <Image
                src="/facility_yard.png"
                alt="Sân sát hạch chính thức"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
              {/* Bottom text */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <h3 className="text-base font-bold">Sân sát hạch chính thức</h3>
              </div>
            </div>

            {/* Right side grid of 3 */}
            <div className="grid gap-6">
              {/* Theory Classroom */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-sm group">
                <Image
                  src="/facility_classroom.png"
                  alt="Phòng học lý thuyết"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <h3 className="text-sm font-bold">Phòng học lý thuyết</h3>
                </div>
              </div>

              {/* Bottom 2 rows */}
              <div className="grid grid-cols-2 gap-6">
                {/* Cars */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm group">
                  <Image
                    src="/facility_cars.png"
                    alt="Đoàn xe tập lái"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                    <h3 className="text-xs font-bold">Đoàn xe tập lái</h3>
                  </div>
                </div>

                {/* Simulator */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm group">
                  <Image
                    src="/facility_simulator.png"
                    alt="Phòng mô phỏng"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                    <h3 className="text-xs font-bold">Phòng mô phỏng</h3>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc] border-t border-neutral-200/60 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Form & details Left (span 5) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-[#1e3a8a]">
                  Liên hệ tư vấn
                </h2>
                <p className="text-neutral-500 text-xs mt-2 leading-relaxed">
                  Để lại thông tin, đội ngũ tư vấn sẽ liên hệ lại ngay với bạn để hỗ trợ thông tin
                  khóa học và thủ tục đăng ký.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                      HOTLINE TƯ VẤN
                    </h4>
                    <p className="text-neutral-800 font-bold text-base mt-0.5">088 88 618 88</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                      EMAIL HỖ TRỢ
                    </h4>
                    <p className="text-neutral-800 font-bold text-sm mt-0.5">
                      hr.truonglaixechienthangtg@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <HomepageContactForm />
            </div>

            {/* Map Right (span 7) */}
            <div className="lg:col-span-7 h-[380px] rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.63942007817!2d106.02196657579737!3d10.407989989718872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa8593d6e5229%3A0xe5a36ad2e245a498!2zVHLGsOG7nW5nIEzDoWkgWGUgQ2hp4bq_biBUaOG6r25n!5e0!3m2!1svi!2s!4v1718278000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Trường lái xe Chiến Thắng"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
