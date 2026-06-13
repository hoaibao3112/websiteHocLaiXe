import type { Metadata } from "next";
import { ContactForm } from "@/components/public/ContactForm";
import { Phone, MapPin, Mail, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liên hệ & Tuyển dụng",
  description:
    "Liên hệ với trường lái xe Chiến Thắng để được tư vấn khóa học lái xe ô tô hoặc tìm hiểu cơ hội tuyển dụng.",
};

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "ĐỊA CHỈ TRỤ SỞ",
    value: "Ấp Phú Hòa, Xã Phú Nhuận, Huyện Cai Lậy, Tỉnh Tiền Giang",
    sub: null,
  },
  {
    icon: Phone,
    title: "ĐIỆN THOẠI HỖ TRỢ",
    value: "088.88.618.88",
    sub: "Phục vụ từ 7:30 – 17:30 hàng ngày",
  },
  {
    icon: Mail,
    title: "EMAIL TUYỂN DỤNG",
    value: "hr.truonglaixechienthangtg@gmail.com",
    sub: null,
  },
];

export default function LienHePage() {
  return (
    <div className="pt-20 bg-neutral-50/50">
      {/* Hero Banner with custom backdrop styling */}
      <section className="relative bg-[#1f2937] text-white overflow-hidden py-16 px-4">
        {/* Background Overlay simulating the car/driving scene */}
        <div className="absolute inset-0 opacity-15 bg-[url('/driver_student.png')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-transparent to-[#111827]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-200">Liên hệ / Tuyển dụng</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 mb-3">
            Liên Hệ & Tuyển Dụng
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Đội ngũ Chiến Thắng luôn sẵn sàng lắng nghe và hỗ trợ bạn trên con đường chinh phục tay lái.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left Column: Contact info & Careers (span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Contact info list */}
              <div className="bg-amber-50/40 rounded-xl border border-amber-100 p-8 space-y-6">
                <h2 className="text-lg font-bold text-neutral-900 border-b border-amber-100 pb-3">
                  Thông Tin Liên Hệ
                </h2>
                
                <div className="space-y-6">
                  {CONTACT_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                            {item.title}
                          </h4>
                          <p className="text-neutral-900 font-semibold text-sm mt-1 leading-relaxed">
                            {item.value}
                          </p>
                          {item.sub && (
                            <p className="text-xs text-neutral-400 mt-0.5">{item.sub}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Careers Banner Card */}
              <div className="bg-[#1e3a8a] text-white rounded-xl shadow-md p-8 relative overflow-hidden group">
                <div className="absolute right-[-15px] bottom-[-15px] text-white/5 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  <Mail className="w-32 h-32" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Cơ Hội Nghề Nghiệp
                </h3>
                <p className="text-neutral-200 text-sm leading-relaxed mb-6">
                  Chúng tôi luôn tìm kiếm những người thầy tận tâm và đội ngũ hành chính chuyên nghiệp. Hãy gia nhập môi trường sư phạm năng động tại Chiến Thắng.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-brand-200 hover:text-white font-bold text-sm"
                >
                  <span>Xem các vị trí đang tuyển</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Column: Send message card (span 7) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl border border-neutral-200/60 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  Gửi Tin Nhắn
                </h2>
                <p className="text-neutral-400 text-xs mb-6">
                  Vui lòng điền thông tin bên dưới, bộ phận tuyển sinh sẽ phản hồi bạn trong vòng 24 giờ.
                </p>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="w-full h-[450px] relative border-t border-neutral-200">
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
      </section>
    </div>
  );
}
