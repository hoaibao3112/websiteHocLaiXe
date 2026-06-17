import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Users,
  Clock,
  Award,
  Shield,
  Check,
  ExternalLink,
  ArrowRight,
  Star,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import type { Course, NewsWithCategory } from "@/types/database.types";
import { HomepageContactForm } from "@/components/public/HomepageContactForm";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { AnimatedCounter } from "@/components/public/AnimatedCounter";

export const metadata: Metadata = {
  title: "Trường Lái Xe Chiến Thắng — Đào tạo lái xe uy tín tại Đồng Tháp",
  description:
    "Trường lái xe Chiến Thắng — hơn 10 năm kinh nghiệm đào tạo lái xe hạng A1, A, B1, B2, C. Tỉ lệ đậu thi cao, giáo viên tận tâm, sân sát hạch đạt chuẩn.",
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

async function getLatestNews(): Promise<NewsWithCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*, news_categories(id, name, slug)")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);
  return (data as NewsWithCategory[]) ?? [];
}

function formatPrice(price: number) {
  return (price / 1000000).toFixed(1).replace(".0", "") + " triệu";
}

function getStudentsCount(classCode: string) {
  if (classCode === "B01") return 560;
  if (classCode === "B") return 720;
  if (classCode === "C1") return 1180;
  return 350;
}

const STATS = [
  { value: 10, suffix: "+", label: "Năm kinh nghiệm", icon: "🏆", color: "from-amber-500 to-orange-600" },
  { value: 5000, suffix: "+", label: "Học viên tốt nghiệp", icon: "🎓", color: "from-blue-500 to-indigo-600" },
  { value: 92, suffix: "%", label: "Tỉ lệ đậu lần đầu", icon: "✅", color: "from-emerald-500 to-teal-600" },
  { value: 20000, suffix: "m²", label: "Tổng diện tích sân", icon: "📍", color: "from-rose-500 to-pink-600" },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Sân sát hạch tại nhà",
    desc: "Học và thi ngay tại trung tâm — không cần di chuyển, tỷ lệ đậu cao nhất khu vực.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Clock,
    title: "Xe tập lái đời mới",
    desc: "Được học trên xe đời mới 2022–2023, máy lạnh đầy đủ, vận hành êm ái và hiện đại.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Calendar,
    title: "Lịch học linh hoạt",
    desc: "Học viên chủ động sắp xếp thời gian kể cả thứ 7 và Chủ nhật, phù hợp mọi công việc.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Award,
    title: "Giáo viên tận tâm",
    desc: "Đội ngũ giáo viên 10+ năm kinh nghiệm, kiên nhẫn, hỗ trợ học viên từng bước một.",
    gradient: "from-purple-400 to-violet-500",
  },
];

export default async function HomePage() {
  const [courses, latestNews] = await Promise.all([
    getCourses(),
    getLatestNews(),
  ]);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══ 1. HERO SECTION ══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/hero_bg.jpg"
            alt="Sân sát hạch Chiến Thắng"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Multi-layer overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/65 to-neutral-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
          {/* Decorative dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Floating decorative orbs */}
        <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/3 right-[25%] w-48 h-48 bg-orange-600/10 rounded-full blur-2xl animate-float-slow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 z-10 w-full">
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-8 animate-fade-in backdrop-blur-sm"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Trung tâm đào tạo lái xe Chiến Thắng
            </div>

            {/* Headline */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 animate-hero-text"
              style={{ animationDelay: "0.2s" }}
            >
              Trung tâm hiện đại{" "}
              <br className="hidden sm:block" />
              tại tỉnh Đồng Tháp{" "}
              <span className="text-[0.85em] font-bold text-neutral-200 inline-block ml-1.5">
                (Tiền Giang Cũ)
              </span>{" "}
              <span className="text-shimmer">có sân sát hạch</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed mb-10 max-w-xl animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Với tổng diện tích hơn{" "}
              <span className="text-amber-400 font-semibold">20.000m²</span>, phòng học hiện đại, hệ thống xe
              tập lái mới 100%, đội ngũ giáo viên giàu kinh nghiệm, tận tâm với từng học viên.
            </p>

            {/* Quick highlights */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-2 mb-10 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              {["Giáo viên 10+ năm", "Xe mới 2022-2023", "Hỗ trợ thi lại miễn phí", "Tỉ lệ đậu 92%"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    {item}
                  </div>
                )
              )}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href="/khoa-hoc"
                className="group inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-7 py-4 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 hover:-translate-y-0.5"
              >
                Xem lộ trình đào tạo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-bold px-7 py-4 rounded-xl text-sm transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400 animate-bounce-gentle">
          <span className="text-[10px] uppercase tracking-widest">Cuộn xuống</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </section>

      {/* ══ 2. STATS COUNTER SECTION ══ */}
      <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, index) => (
            <ScrollReveal key={stat.label} animation="scale-in" delay={index * 100}>
              <div className="hover-lift card-underline bg-white rounded-2xl shadow-lg border border-neutral-100/80 p-6 text-center relative overflow-hidden group">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="text-3xl mb-3">{stat.icon}</div>

                {/* Counter */}
                <div className={`text-3xl xl:text-4xl font-extrabold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1 tabular-nums`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>

                {/* Label */}
                <p className="text-neutral-500 text-xs font-medium leading-snug">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ 3. WHY CHOOSE US ══ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                Tại sao chọn chúng tôi
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] mb-4">
                Ưu điểm nổi bật của Chiến Thắng
              </h2>
              <p className="text-neutral-500 text-sm max-w-xl mx-auto">
                Cam kết đào tạo chuyên nghiệp, an toàn và hiệu quả nhất cho mọi học viên.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-5 rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} animation="slide-up" delay={index * 120}>
                  <div className="hover-lift card-underline group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-500 p-7 h-full flex flex-col">
                    {/* Icon bubble */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed flex-1">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 4. COURSES SECTION ══ */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in" duration={800}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                Chương trình đào tạo
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] mb-4">
                Các khóa học tại Chiến Thắng
              </h2>
              <p className="text-neutral-500 text-sm max-w-xl mx-auto">
                Đầy đủ các hạng bằng lái theo chuẩn Bộ Giao thông Vận tải, phù hợp cho mọi nhu cầu.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-5 rounded-full" />
            </div>
          </ScrollReveal>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <ScrollReveal
                  key={course.id}
                  animation="slide-up"
                  delay={index * 150}
                  className="flex flex-col"
                >
                  <div className="hover-lift bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full group">
                    {/* Course image */}
                    <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden img-zoom">
                      {course.image_url ? (
                        <Image
                          src={course.image_url}
                          alt={course.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <Users className="w-14 h-14 text-slate-300" />
                        </div>
                      )}
                      {/* Badge */}
                      {course.badge && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {course.badge}
                        </div>
                      )}
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-neutral-400 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
                        {course.description}
                      </p>

                      {/* Stats */}
                      <div className="space-y-2.5 border-t border-neutral-100 pt-4 mb-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Học phí</span>
                          <span className="font-bold text-amber-700 text-xs px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
                            Liên hệ
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Học viên đăng ký</span>
                          <span className="font-semibold text-neutral-700">
                            <AnimatedCounter
                              end={getStudentsCount(course.class_code)}
                              suffix="+"
                              duration={1800}
                            />
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/khoa-hoc/${
                          course.class_code.toLowerCase() === "b01" ? "b1" :
                          course.class_code.toLowerCase() === "b" ? "b2" :
                          course.class_code.toLowerCase() === "c1" ? "c" :
                          course.class_code.toLowerCase() === "a1" ? "a1" :
                          course.class_code.toLowerCase() === "a" ? "a" :
                          "nang-hang"
                        }`}
                        className="group/btn flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        Xem chi tiết
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-400">
              Hiện tại trung tâm đang cập nhật danh sách khóa học. Vui lòng liên hệ hotline.
            </p>
          )}
        </div>
      </section>

      {/* ══ 5. EXAM SCHEDULE SECTION ══ */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/exam_schedule_bg.jpg"
            alt="Lịch thi sát hạch Chiến Thắng"
            fill
            className="object-cover object-center"
          />
          {/* Overlay to ensure readability and premium look */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/90 via-neutral-900/80 to-[#1e3a8a]/90" />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <Calendar className="w-3.5 h-3.5" />
                Lịch thi sắp tới
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Lịch thi tốt nghiệp & sát hạch
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>

          {/* Logo emblem */}
          <ScrollReveal animation="scale-in">
            <div className="flex justify-center mb-12">
              <div className="relative animate-glow">
                <div className="px-8 py-5 rounded-2xl border border-amber-500/30 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                  <Image
                    src="/logo-win.png"
                    alt="Emblem Chiến Thắng"
                    width={180}
                    height={55}
                    className="object-contain h-14 w-auto filter brightness-150"
                  />
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-2xl border border-amber-500/20 animate-ping" />
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline months */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { m: "Tháng 07", y: "Năm 2024", active: false, done: true },
              { m: "Tháng 08", y: "Năm 2024", active: false, done: true },
              { m: "Tháng 09", y: "Năm 2024", active: true, done: false },
              { m: "Tháng 10", y: "Năm 2024", active: false, done: false },
              { m: "Tháng 11", y: "Năm 2024", active: false, done: false },
            ].map((month, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 100}>
                <div
                  className={`relative p-5 rounded-2xl text-center transition-all flex flex-col items-center hover:-translate-y-1 cursor-default
                    ${month.active
                      ? "bg-amber-500 shadow-2xl shadow-amber-500/30 border border-amber-400"
                      : month.done
                        ? "bg-white/5 border border-white/10 opacity-60"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15"
                    }`}
                >
                  {month.active && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Hiện tại
                    </div>
                  )}
                  <div className="mb-3">
                    <Image
                      src="/logo-win.png"
                      alt="Logo"
                      width={50}
                      height={50}
                      className={`object-contain h-10 w-auto ${month.active ? "brightness-0 invert" : "filter brightness-150"}`}
                    />
                  </div>
                  <div className={`text-sm font-bold ${month.active ? "text-white" : "text-white/90"}`}>
                    {month.m}
                  </div>
                  <div className={`text-[10px] mt-1 font-medium ${month.active ? "text-amber-100" : "text-white/50"}`}>
                    {month.y}
                  </div>
                  {month.done && (
                    <div className="mt-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5.5. LATEST NEWS SECTION ══ */}
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

      {/* ══ 6. FACILITIES SECTION ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  Cơ sở vật chất
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a]">
                  Hạ tầng hiện đại
                </h2>
                <p className="text-neutral-400 text-sm mt-2 max-w-sm">
                  Hệ thống sân tập và phòng học đạt tiêu chuẩn Bộ Giao thông Vận tải.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full" />
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-700 font-semibold transition-colors group"
              >
                <span>Xem tất cả hình ảnh</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Photo grid */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Left large photo */}
            <ScrollReveal animation="slide-right" className="h-full">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[380px] shadow-xl img-zoom group h-full">
                <Image
                  src="/gallery-1.jpg"
                  alt="Sân sát hạch chính thức"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Sân chính</span>
                  </div>
                  <h3 className="text-lg font-bold">Sân sát hạch chính thức</h3>
                  <p className="text-xs text-white/70 mt-1">Diện tích hơn 20,000m² đạt chuẩn</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right 3 photos */}
            <div className="grid gap-5">
              <ScrollReveal animation="slide-left" delay={100}>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/7] shadow-md img-zoom group">
                  <Image src="/gallery-3.jpg" alt="Sân tập xe máy" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="text-sm font-bold">Sân tập xe máy</h3>
                    <p className="text-[10px] text-white/60 mt-0.5">Sân tập chuyên biệt dành cho xe máy các hạng A</p>
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 gap-5">
                <ScrollReveal animation="slide-left" delay={200}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-md img-zoom group">
                    <Image src="/gallery-2.jpg" alt="Đoàn xe tải tập lái" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                      <h3 className="text-xs font-bold">Đoàn xe tải tập lái</h3>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="slide-left" delay={320}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-md img-zoom group">
                    <Image src="/gallery-4.jpg" alt="Sân tập lái ô tô" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                      <h3 className="text-xs font-bold">Sân tập lái ô tô</h3>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. CONTACT + MAP ══ */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left: contact details */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal animation="slide-right">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-5">
                    <Phone className="w-3.5 h-3.5" />
                    Liên hệ ngay
                  </div>
                  <h2 className="font-display text-3xl font-extrabold text-[#1e3a8a] mb-3">
                    Liên hệ tư vấn nhanh
                  </h2>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Kết nối trực tiếp với chúng tôi qua Zalo hoặc Hotline để nhận thông tin khóa học và hỗ trợ thủ tục đăng ký nhanh nhất.
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full" />
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-right" delay={100}>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "HOTLINE TƯ VẤN", value: "0902.868.928", href: "tel:0902868928" },
                    { icon: MessageCircle, label: "ZALO HỖ TRỢ", value: "0902.868.928", href: "https://zalo.me/0902868928" },
                    { icon: MapPin, label: "ĐỊA CHỈ", value: "168 QL1A, Ấp Phú Hòa, Xã Mỹ Thành, Đồng Tháp (Tiền Giang Cũ), Việt Nam", href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-4 items-start group">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-amber-200 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-neutral-800 font-bold text-sm hover:text-amber-700 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-neutral-700 text-sm leading-snug">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="slide-left" delay={200}>
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-100">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Gửi yêu cầu tư vấn</h3>
                  <p className="text-neutral-400 text-xs mb-6">Chúng tôi sẽ liên hệ hỗ trợ bạn trong thời gian sớm nhất.</p>
                  <HomepageContactForm />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. FINAL CTA BANNER ══ */}
      <section className="py-16 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Bắt đầu hành trình lái xe ngay hôm nay!
            </h2>
            <p className="text-amber-100 text-sm mb-8 max-w-lg mx-auto">
              Đăng ký ngay để được tư vấn miễn phí và nhận ưu đãi học phí đặc biệt từ Chiến Thắng.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/ho-so-dang-ky"
                className="group inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 font-extrabold px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Đăng ký ngay
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:0902868928"
                className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <Phone className="w-4 h-4" />
                Gọi: 0902.868.928
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
