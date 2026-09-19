import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export function CTABanner() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 relative overflow-hidden">
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
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4">
            Bắt đầu hành trình lái xe ngay hôm nay!
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm mb-6 sm:mb-8 max-w-lg mx-auto">
            Đăng ký ngay để được tư vấn miễn phí và nhận ưu đãi học phí đặc biệt từ Chiến Thắng.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <Link
              href="/ho-so-dang-ky"
              className="group inline-flex items-center justify-center gap-2 bg-white text-amber-700 hover:bg-amber-50 font-extrabold px-8 py-3.5 sm:py-4 rounded-xl text-sm transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              Đăng ký ngay
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:0902868928"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold px-8 py-3.5 sm:py-4 rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 w-full sm:w-auto text-center"
            >
              <Phone className="w-4 h-4" />
              Gọi: 0902.868.928
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
