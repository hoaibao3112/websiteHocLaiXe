"use client";

import { Phone, CheckCircle } from "lucide-react";
import { RegistrationForm } from "@/components/public/RegistrationForm";

// Custom Zalo SVG Icon
const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.004 12c0 5.013 4.417 9.077 9.865 9.077a10.66 10.66 0 0 0 2.217-.23c.31-.064.62-.032.905.096l3.41 1.53c.478.214.996-.183.905-.688l-.667-3.708a1.272 1.272 0 0 1 .184-.875C20.375 15.69 21.05 13.9 21.05 12c0-5.013-4.417-9.077-9.865-9.077S2.004 6.987 2.004 12z" />
    <text x="12" y="15.5" fontWeight="900" fontSize="10.5" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif">Zalo</text>
  </svg>
);

export function ContactForm() {
  const handleTrackClick = (channel: string) => {
    try {
      if (typeof window !== "undefined") {
        if ((window as any).fbq) {
          (window as any).fbq("track", "Contact", {
            content_category: "Contact Page Form Block",
            content_name: channel,
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag("event", "contact", {
            event_category: "Engagement",
            event_label: `Contact Page Form Block ${channel}`,
            method: channel,
          });
        }
      }
    } catch (err) {
      console.error("Lỗi tracking liên hệ:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Informational list */}
      <div className="bg-slate-50/50 rounded-2xl p-6 border border-neutral-100 flex flex-col gap-4">
        <div className="flex gap-3 items-start">
          <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-sm text-neutral-600 font-medium leading-relaxed">
            Hỗ trợ tư vấn chuẩn bị hồ sơ thi giấy phép lái xe miễn phí.
          </span>
        </div>
        <div className="flex gap-3 items-start">
          <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-sm text-neutral-600 font-medium leading-relaxed">
            Nhận báo giá trọn gói học phí các hạng A1, A, B số tự động, B số sàn, C1, nâng B lên C, B lên C1, B lên D2.
          </span>
        </div>
        <div className="flex gap-3 items-start">
          <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-sm text-neutral-600 font-medium leading-relaxed">
            Kết nối trực tiếp 24/7, phản hồi ngay lập tức trong vài giây.
          </span>
        </div>
      </div>

      {/* Zalo + Hotline Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://zalo.me/0902868928"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleTrackClick("Zalo")}
          className="flex items-center justify-center gap-3 bg-[#0068ff] hover:bg-[#0057d4] text-white font-extrabold px-6 py-4 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-[#0068ff]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
        >
          <ZaloIcon className="w-8 h-8 flex-shrink-0" />
          <span>NHẮN ZALO LIÊN HỆ</span>
        </a>

        <a
          href="tel:0902868928"
          onClick={() => handleTrackClick("Hotline")}
          className="flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-6 py-4 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-amber-600/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
        >
          <Phone className="w-5 h-5 flex-shrink-0 animate-bounce" />
          <span>GỌI HOTLINE HỖ TRỢ</span>
        </a>
      </div>

      {/* Divider */}
      <div className="relative flex items-center gap-4 my-1">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2 shrink-0">
          hoặc để lại thông tin
        </span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      {/* Registration Form */}
      <div className="bg-slate-50/60 rounded-2xl border border-neutral-100 p-6">
        <div className="mb-5">
          <h3 className="text-base font-extrabold text-neutral-900">
            Đăng ký tư vấn miễn phí
          </h3>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Điền thông tin bên dưới — đội ngũ sẽ liên hệ lại trong vòng 24 giờ.
          </p>
        </div>
        <RegistrationForm
          defaultSubject="Tư vấn khóa học lái xe"
          variant="amber"
        />
      </div>
    </div>
  );
}
