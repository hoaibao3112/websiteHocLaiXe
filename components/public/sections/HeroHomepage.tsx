import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export function HeroHomepage() {
  return (
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
          quality={75}
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
            Trung tâm đào tạo lái xe Chiến Thắng TG
          </div>

          {/* Headline */}
          <h1
            className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.15] mb-6 animate-hero-text text-balance"
            style={{ animationDelay: "0.2s" }}
          >
            Trung tâm hiện đại{" "}
            <br className="hidden sm:block" />
            tại tỉnh Đồng Tháp{" "}
            <span className="text-[0.85em] font-bold text-neutral-200 inline-block">
              (Tiền Giang Cũ)
            </span>{" "}
            <span className="text-shimmer">có sân sát hạch</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl animate-fade-in text-balance"
            style={{ animationDelay: "0.4s" }}
          >
            Với tổng diện tích hơn{" "}
            <span className="text-amber-400 font-semibold">20.000m²</span>, phòng học hiện đại, hệ thống xe
            tập lái mới 100%, đội ngũ giáo viên giàu kinh nghiệm, tận tâm với từng học viên.
          </p>

          {/* Quick highlights */}
          <div
            className="flex flex-wrap gap-x-6 gap-y-2.5 mb-8 animate-fade-in text-xs sm:text-sm"
            style={{ animationDelay: "0.5s" }}
          >
            {["Giáo viên nhiều năm kinh nghiệm", "Xe đời mới, hiện đại", "Hỗ trợ thi lại miễn phí", "Tỉ lệ đậu 92%"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-neutral-200">
                  <CheckCircle2 className="size-4 text-amber-400 flex-shrink-0" />
                  {item}
                </div>
              )
            )}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 animate-slide-up w-full sm:w-auto"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              href="/khoa-hoc"
              className="group inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 hover:-translate-y-0.5 w-full sm:w-auto text-center"
            >
              Xem lộ trình đào tạo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/10 active:scale-98 text-white font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 w-full sm:w-auto text-center"
            >
              <Phone className="size-4" />
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
  );
}
