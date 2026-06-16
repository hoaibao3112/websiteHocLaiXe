import type { Metadata } from "next";
import { ContactForm } from "@/components/public/ContactForm";
import { Phone, MapPin, MessageCircle, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const metadata: Metadata = {
  title: "Liên hệ & Tuyển dụng - Trường Lái Xe Chiến Thắng",
  description:
    "Liên hệ với trường lái xe Chiến Thắng để được tư vấn khóa học lái xe ô tô hoặc tìm hiểu cơ hội tuyển dụng.",
};

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "ĐỊA CHỈ TRỤ SỞ",
    value: "168 QL1A, Ấp Phú Hòa, Xã Mỹ Thành, Đồng Tháp (Tiền Giang Cũ), Việt Nam",
    sub: "Mặt tiền Quốc lộ 1A dễ tìm",
  },
  {
    icon: Phone,
    title: "ĐIỆN THOẠI HỖ TRỢ",
    value: "0902.868.928",
    sub: "Phục vụ từ 7:30 – 17:30 hàng ngày",
  },
  {
    icon: MessageCircle,
    title: "ZALO HỖ TRỢ",
    value: "0902.868.928",
    sub: "Nhắn tin Zalo 24/7 – phản hồi ngay",
  },
];

export default function LienHePage() {
  return (
    <div className="pt-20 bg-white overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative bg-[#1f2937] text-white py-20 px-4 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/banner-page.jpg"
            alt="Liên hệ Chiến Thắng"
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
              <span className="text-amber-400">Liên hệ / Tuyển dụng</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-4 uppercase leading-tight text-white">
              LIÊN HỆ & TUYỂN DỤNG
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Đội ngũ Chiến Thắng luôn sẵn sàng lắng nghe, tư vấn tận tâm và chào đón bạn gia nhập đại gia đình của chúng tôi.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Contact info & Careers (span 5) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Contact info list */}
              <ScrollReveal animation="slide-right">
                <div className="bg-slate-50 rounded-2xl border border-neutral-100 p-8 space-y-6">
                  <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200/60 pb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Thông Tin Liên Hệ
                  </h2>
                  
                  <div className="space-y-6">
                    {CONTACT_ITEMS.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex gap-4 items-start group">
                          <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                              {item.title}
                            </h4>
                            <p className="text-neutral-850 font-bold text-sm sm:text-base leading-relaxed">
                              {item.value}
                            </p>
                            {item.sub && (
                              <p className="text-xs text-neutral-400 mt-1 font-medium">{item.sub}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Careers Banner Card */}
              <ScrollReveal animation="slide-right" delay={150}>
                <div className="bg-[#1e3a8a] text-white rounded-2xl shadow-xl p-8 relative overflow-hidden group">
                  <div className="absolute right-[-15px] bottom-[-15px] text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                    <MessageCircle className="w-36 h-36" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Cơ Hội Nghề Nghiệp
                  </h3>
                  <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed mb-6">
                    Chúng tôi luôn tìm kiếm những người thầy tận tâm và đội ngũ cán bộ hành chính chuyên nghiệp. Hãy cùng kiến tạo môi trường dạy học thân thiện, văn minh tại Chiến Thắng.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase group/btn transition-colors"
                  >
                    <span>Xem vị trí tuyển dụng</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>

            </div>

            {/* Right Column: Send message card (span 7) */}
            <ScrollReveal animation="slide-left" className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-neutral-100 p-8 sm:p-10 shadow-2xl">
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mb-2">
                  Liên hệ qua Zalo & Hotline
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm mb-8">
                  Để hỗ trợ nhanh chóng nhất, quý học viên vui lòng nhắn tin trực tiếp qua Zalo hoặc liên hệ Hotline hỗ trợ 24/7 của chúng tôi.
                </p>
                <ContactForm />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

    </div>
  );
}
