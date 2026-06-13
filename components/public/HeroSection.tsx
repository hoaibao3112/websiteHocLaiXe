import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Phone, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-brand-900" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-brand-400 text-brand-400" />
              Trường lái xe uy tín hàng đầu khu vực
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Học Lái Xe{" "}
              <span className="text-brand-400">An Toàn</span>
              <br />& Tự Tin
            </h1>

            <p className="text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              Trường lái xe Chiến Thắng — hơn 10 năm kinh nghiệm, đội ngũ giáo
              viên tận tâm, xe mới hiện đại. Tỉ lệ đậu thi lần đầu trên{" "}
              <strong className="text-brand-400">92%</strong>.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                "Giáo viên kinh nghiệm 10+ năm",
                "Xe số mới, trang bị đầy đủ",
                "Hỗ trợ thi lại miễn phí",
                "Tỉ lệ đậu thi lần đầu 92%",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-300">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ho-so-dang-ky"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full text-base transition-all duration-200 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5"
              >
                Đăng ký học ngay
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:0888861888"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Gọi tư vấn
              </a>
            </div>
          </div>

          {/* Right: Stats cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-up">
            {[
              { value: "10+", label: "Năm kinh nghiệm", icon: "🏆" },
              { value: "5,000+", label: "Học viên tốt nghiệp", icon: "🎓" },
              { value: "92%", label: "Tỉ lệ đậu lần đầu", icon: "✅" },
              { value: "3", label: "Cơ sở đào tạo", icon: "📍" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-brand-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-500">
          <span className="text-xs">Cuộn xuống</span>
          <ChevronRight className="w-4 h-4 rotate-90 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
