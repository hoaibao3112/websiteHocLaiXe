import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1e293b] text-neutral-300 border-t border-neutral-800">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand & Logo */}
          <div className="lg:col-span-1">
            <Image
              src="/logo1.jpg"
              alt="Logo Chiến Thắng"
              width={80}
              height={80}
              className="object-contain mb-5 h-20 w-20"
            />
            <p className="text-xs leading-relaxed text-neutral-400 mb-6">
              Trung tâm đào tạo lái xe Chiến Thắng - Kiến tạo vững vàng cho mỗi hành trình. Uy tín, chất lượng và tỉ lệ đậu cao vượt trội tại Đồng Tháp.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/chienthangtiengiang2023/photos"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-neutral-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.85z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Courses list */}
          <div>
            <h3 className="font-bold text-white tracking-wider uppercase text-sm mb-5">Khóa học</h3>
            <ul className="space-y-3.5">
              {[
                { label: "Lái xe hạng A1 / A", href: "/khoa-hoc" },
                { label: "Lái xe hạng B (Tự động)", href: "/khoa-hoc/b1" },
                { label: "Lái xe hạng B (Số sàn)", href: "/khoa-hoc/b2" },
                { label: "Lái xe hạng C1 / Nâng hạng", href: "/khoa-hoc" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Head Office Info */}
          <div>
            <h3 className="font-bold text-white tracking-wider uppercase text-sm mb-5">Trụ sở chính</h3>
            <ul className="space-y-4 text-xs">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400 leading-relaxed">
                  168 QL1A, Ấp Phú Hòa, Xã Mỹ Thành, Đồng Tháp (Tiền Giang Cũ), Việt Nam
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-neutral-400">
                  <a
                    href="tel:0902868928"
                    className="hover:text-amber-500 transition-colors font-semibold"
                  >
                    0902.868.928
                  </a>
                </span>
              </li>

            </ul>
            <div className="mt-4">
              <a
                href="https://zalo.me/0902868928"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0068ff] hover:bg-[#0057d4] text-white font-bold px-3 py-2.5 rounded-lg text-[10px] tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-[#0068ff]/20"
              >
                <span>Nhắn Zalo ngay</span>
              </a>
            </div>
          </div>

          {/* Column 4: Google Map */}
          <div>
            <h3 className="font-bold text-white tracking-wider uppercase text-sm mb-5">Bản đồ vị trí</h3>
            <div className="rounded-xl overflow-hidden border border-neutral-700/60 h-36 w-full shadow-md relative group">
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
              <a
                href="https://maps.google.com/?q=168+QL1A,+Ấp+Phú+Hòa,+Xã+Mỹ+Thành,+Đồng+Tháp+(Tiền+Giang+Cũ),+Việt+Nam"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors cursor-pointer"
                title="Mở rộng Google Maps"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800 bg-[#111827] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} Trường Trung Tâm Đào Tạo Lái Xe Chiến Thắng. Uy Tín - Tận Tâm - Chuyên Nghiệp.
          </p>
          <div className="flex gap-5 text-[11px] text-neutral-500">
            <Link href="#" className="hover:text-neutral-300 transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="#" className="hover:text-neutral-300 transition-colors">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
