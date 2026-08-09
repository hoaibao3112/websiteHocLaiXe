import { Phone, MessageCircle, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { HomepageContactForm } from "@/components/public/HomepageContactForm";

const CONTACT_INFO = [
  { icon: Phone, label: "HOTLINE TƯ VẤN", value: "0902.868.928", href: "tel:0902868928" },
  { icon: MessageCircle, label: "ZALO HỖ TRỢ", value: "0902.868.928", href: "https://zalo.me/0902868928" },
  { icon: MapPin, label: "ĐỊA CHỈ", value: "168 QL1A, Ấp Phú Hòa, Xã Mỹ Thành, Đồng Tháp (Tiền Giang Cũ), Việt Nam", href: undefined },
] as const;

export function ContactSection() {
  return (
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
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
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
  );
}
