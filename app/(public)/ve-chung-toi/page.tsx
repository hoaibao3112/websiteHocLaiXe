import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Award,
  Calendar,
  Car,
  Truck,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Giới thiệu về chúng tôi",
  description:
    "Tìm hiểu về Trung Tâm Đào Tạo và Sát Hạch Lái Xe Chiến Thắng tại Tiền Giang. Đơn vị hàng đầu với cơ sở vật chất đạt chuẩn Bộ GTVT.",
};

export default function VeChungToiPage() {
  return (
    <div className="pt-20 bg-neutral-50/50">
      {/* 1. Hero Section */}
      <section className="relative bg-[#1e3a8a] text-white overflow-hidden py-16 px-4">
        {/* Background Image with opacity overlay */}
        <div className="absolute inset-0 opacity-15 bg-[url('/driver_student.png')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-transparent to-[#111827]" />

        <div className="max-w-7xl mx-auto relative z-10 animate-fade-in">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-200">Về chúng tôi</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1 mb-2 uppercase leading-snug max-w-4xl">
            GIỚI THIỆU TRUNG TÂM ĐÀO TẠO VÀ SÁT HẠCH LÁI XE CHIẾN THẮNG - TIỀN GIANG
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-amber-500 rounded" />
                <span className="text-amber-700 font-bold uppercase tracking-wider text-xs">
                  Kế thừa và phát triển
                </span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-[#1e3a8a] leading-tight">
                Tổng quan về Trung tâm
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Được thành lập từ năm 2022, <strong className="text-neutral-900 font-semibold">Trung Tâm Đào Tạo Và Sát Hạch Lái Xe Chiến Thắng</strong> tự hào là đơn vị giáo dục nghề nghiệp hàng đầu tại tỉnh Tiền Giang. Với sứ mệnh mang lại sự an toàn và kiến thức vững chắc cho người tham gia giao thông, chúng tôi không ngừng đầu tư vào chất lượng giảng dạy và cơ sở vật chất.
              </p>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Chúng tôi chuyên đào tạo và tổ chức sát hạch cho các hạng giấy phép lái xe phổ biến:
              </p>

              {/* Hạng badges */}
              <div className="flex flex-wrap gap-4 py-2">
                {[
                  { label: "Hạng B1", icon: Car },
                  { label: "Hạng B2", icon: Car },
                  { label: "Hạng C", icon: Truck },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-neutral-200/80 rounded-xl px-5 py-3.5 flex items-center gap-3 shadow-xs min-w-[140px]"
                    >
                      <div className="w-8 h-8 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-neutral-800">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Address Box */}
              <div className="flex items-start gap-4 bg-amber-50/40 border-l-4 border-amber-500 p-5 rounded-r-xl">
                <div className="w-8 h-8 bg-amber-100/60 text-amber-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 mb-1">Địa chỉ trụ sở chính:</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Quốc lộ 1A, TT. Phú Nhuận, Thị xã Cai Lậy, tỉnh Tiền Giang.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Graphics (span 5) */}
            <div className="lg:col-span-5 relative">
              {/* Main yard photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg group">
                <Image
                  src="/facility_yard.png"
                  alt="Sân sát hạch chính thức"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Floating Badge Card */}
              <div className="absolute left-4 bottom-[-24px] bg-white rounded-2xl shadow-xl border border-neutral-100 p-5 max-w-[260px] flex gap-3.5">
                <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                    Top đơn vị đào tạo
                  </h4>
                  <p className="text-[10px] text-neutral-500 leading-relaxed mt-1">
                    Cam kết tỉ lệ đậu cao nhất khu vực với quy trình chuyên nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50/30 border-t border-neutral-100 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-display text-3xl font-extrabold text-[#1e3a8a]">
              Tại sao chọn Chiến Thắng?
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Chúng tôi mang đến những giá trị khác biệt, giúp học viên không chỉ lấy được bằng lái mà còn tự tin làm chủ tay lái trên mọi cung đường.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-xs border border-neutral-200/60 p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a8a]">Sân sát hạch tại chỗ</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Là trung tâm DUY NHẤT tại Tiền Giang có sân thi sát hạch tại chỗ. Học viên được học và thi trên cùng một địa điểm, giúp tâm lý thoải mái và đạt kết quả cao.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-xs border border-neutral-200/60 p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a8a]">Xe tập lái hiện đại</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Hệ thống xe đời mới, trang bị đầy đủ công nghệ hỗ trợ và cảm biến. Chúng tôi bảo trì xe định kỳ để đảm bảo sự an toàn và trải nghiệm tốt nhất cho học viên.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-xs border border-neutral-200/60 p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a8a]">Lịch học linh hoạt</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Khai giảng lớp mới mỗi tháng. Học viên có thể chủ động sắp xếp thời gian học vào các ngày trong tuần hoặc cuối tuần phù hợp với công việc cá nhân.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full pointer-events-none -translate-y-8 translate-x-8" />
            
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mb-4">
              Sẵn sàng để bắt đầu hành trình lái xe an toàn?
            </h2>
            <p className="text-brand-100 max-w-2xl mx-auto text-xs sm:text-sm mb-8 font-medium">
              Đội ngũ giảng viên tận tâm và trang thiết bị hiện đại đang chờ đón bạn. Hãy đăng ký ngay để nhận ưu đãi học phí tốt nhất tháng này.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/lien-he"
                className="bg-white hover:bg-neutral-50 text-amber-900 font-bold px-8 py-3.5 rounded-md text-xs transition-all shadow-md hover:-translate-y-0.5"
              >
                Đăng ký tư vấn miễn phí
              </Link>
              <Link
                href="/khoa-hoc"
                className="border border-white hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-md text-xs transition-all shadow-md hover:-translate-y-0.5"
              >
                Xem lịch khai giảng
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
