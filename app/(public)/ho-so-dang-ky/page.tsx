import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Camera,
  IdCard,
  Layers,
  Download,
  Calendar,
  Globe,
  Heart,
  ChevronRight,
  Maximize2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const metadata: Metadata = {
  title: "Hồ sơ đăng ký học lái xe - Trường Lái Xe Chiến Thắng",
  description:
    "Hướng dẫn chuẩn bị hồ sơ đăng ký học GPLX ô tô tại Trường lái xe Chiến Thắng theo đúng quy định của Bộ GTVT.",
};

export default function HoSoDangKyPage() {
  return (
    <div className="pt-20 bg-white overflow-x-hidden">
      {/* Banner Header */}
      <section className="relative bg-[#1f2937] text-white py-20 px-4 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/banner-page.jpg"
            alt="Học viên lái xe Chiến Thắng"
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
              <span className="text-amber-400">Hồ sơ đăng ký</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-4 uppercase leading-tight text-white">
              HỒ SƠ ĐĂNG KÝ HỌC LÁI XE
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Các tài liệu cần thiết và thủ tục đăng ký học lái xe ô tô đúng theo chuẩn quy định của Bộ Giao thông Vận tải.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Documents needed section */}
      <section className="py-24 bg-white relative">
        {/* Subtle decorative background circles */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="mb-16 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                Hồ sơ chuẩn bị
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
                Hồ sơ đăng ký học GPLX ô tô gồm những gì?
              </h2>
              <p className="text-neutral-500 mt-4 leading-relaxed max-w-3xl text-sm sm:text-base">
                Để quá trình chuẩn bị hồ sơ thi sát hạch diễn ra nhanh chóng, thuận lợi, quý học viên cần lưu ý chuẩn bị đầy đủ các loại giấy tờ thiết yếu sau đây.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-6 rounded-full mx-auto lg:mx-0" />
            </div>
          </ScrollReveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 01 */}
            <ScrollReveal animation="slide-up" delay={50}>
              <div className="hover-lift card-underline bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                    01. Đơn đề nghị học và thi
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">
                    Đơn đăng ký học và thi sát hạch giấy phép lái xe theo mẫu chuẩn của Bộ GTVT. Học viên sẽ được cung cấp miễn phí và hướng dẫn ghi thông tin chi tiết ngay tại trung tâm Chiến Thắng.
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-extrabold text-xs tracking-wider uppercase group/btn mt-4"
                >
                  <span>Tải mẫu đơn chuẩn</span>
                  <Download className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
                </a>
              </div>
            </ScrollReveal>

            {/* Card 02 */}
            <ScrollReveal animation="slide-up" delay={150}>
              <div className="hover-lift card-underline bg-[#1e3a8a] text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between h-full relative overflow-hidden group">
                {/* Medical Cross Watermark */}
                <div className="absolute right-[-20px] bottom-[-20px] text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                  <svg className="w-44 h-44 fill-current" viewBox="0 0 24 24">
                    <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                  </svg>
                </div>

                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md shadow-md">
                    <Heart className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    02. Giấy khám sức khỏe
                  </h3>
                  <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed mb-6">
                    Giấy khám sức khỏe lái xe còn thời hạn trong vòng 6 tháng gần nhất do bệnh viện đa khoa cấp quận/huyện trở lên cấp và đóng dấu giáp lai ảnh chân dung.
                  </p>
                </div>
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mt-4">
                  Quy chuẩn liên tịch Bộ Y tế
                </div>
              </div>
            </ScrollReveal>

            {/* Card 03 */}
            <ScrollReveal animation="slide-up" delay={250}>
              <div className="hover-lift card-underline bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                    03. Ảnh chân dung
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">
                    Ảnh thẻ kích thước 3x4 hoặc 4x6 nền xanh dương đậm, ảnh chụp rõ nét, tóc gọn gàng không che tai, mắt nhìn thẳng, không đeo kính cận/kính mát.
                  </p>
                </div>
                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider mt-4">
                  Hỗ trợ chụp miễn phí tại chỗ
                </div>
              </div>
            </ScrollReveal>

            {/* Card 04 */}
            <ScrollReveal animation="slide-up" delay={100}>
              <div className="hover-lift card-underline bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
                    <IdCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                    04. CMND/CCCD photo
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">
                    01 bản photo Căn cước công dân hoặc Chứng minh nhân dân (còn hạn sử dụng, không cần công chứng). Đối với người nước ngoài cần cung cấp bản sao Hộ chiếu còn hạn.
                  </p>
                </div>
                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider mt-4">
                  Bản sao rõ nét, rõ số
                </div>
              </div>
            </ScrollReveal>

            {/* Card 05 */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="hover-lift card-underline bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                    05. GPLX thẻ nhựa (nếu có)
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">
                    Bản sao thẻ PET các loại giấy phép lái xe khác mà học viên đang sở hữu (ví dụ GPLX máy hạng A1, A2) để hệ thống cơ sở dữ liệu quốc gia cập nhật tích hợp.
                  </p>
                </div>
                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider mt-4">
                  Đồng bộ cổng dịch vụ công
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Conditions section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-t border-neutral-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <ScrollReveal animation="slide-right">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-neutral-100 group img-zoom">
                <Image
                  src="/driver_student.jpg"
                  alt="Học viên lái xe Chiến Thắng"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>
            </ScrollReveal>

            {/* Conditions Right */}
            <div className="space-y-6">
              <ScrollReveal animation="slide-left">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
                  Tiêu chuẩn thi lấy bằng lái xe
                </h2>
                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                  Để đủ điều kiện đăng ký tham gia khóa đào tạo sát hạch lái xe, mỗi học viên cần đáp ứng tối thiểu các tiêu chí bắt buộc dưới đây:
                </p>
              </ScrollReveal>

              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: Calendar,
                    title: "Yêu cầu về độ tuổi",
                    desc: "Đủ 18 tuổi trở lên tính đến ngày thi sát hạch chính thức (Áp dụng đối với hạng B1, B2). Hạng C yêu cầu đủ 21 tuổi trở lên.",
                  },
                  {
                    icon: Globe,
                    title: "Quốc tịch và Cư trú",
                    desc: "Là công dân Việt Nam hoặc người nước ngoài có thời hạn cư trú, học tập, công tác hợp pháp tại Việt Nam từ 6 tháng trở lên.",
                  },
                  {
                    icon: Maximize2,
                    title: "Điều kiện sức khỏe tiêu chuẩn",
                    desc: "Được cơ quan y tế xác nhận đủ sức khỏe lái xe hạng tương ứng (Không bị các dị tật chi, mù màu, động kinh, các bệnh tim mạch cấp độ nặng).",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={idx} animation="slide-left" delay={idx * 100}>
                      <div className="flex gap-4 p-5 rounded-2xl border-l-4 border-amber-500 bg-white hover:bg-neutral-50 shadow-sm transition-all">
                        <div className="w-10 h-10 bg-amber-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-900 text-sm sm:text-base tracking-wide">
                            {item.title}
                          </h3>
                          <p className="text-neutral-500 text-xs sm:text-sm mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Golden CTA Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale-in">
            <div className="rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full pointer-events-none -translate-y-8 translate-x-8" />
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
                Bắt Đầu Học Lái Xe Ngay Hôm Nay
              </h2>
              <p className="text-amber-100 max-w-2xl mx-auto text-xs sm:text-sm mb-8 font-semibold">
                Trung tâm đào tạo lái xe Chiến Thắng hân hạnh đồng hành cùng bạn trên hành trình tự tin chinh phục vô lăng, lái xe an toàn trên mọi nẻo đường.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/lien-he"
                  className="bg-white hover:bg-neutral-50 text-amber-900 font-extrabold px-8 py-4 rounded-xl text-xs transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Đăng ký trực tuyến
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/lien-he"
                  className="border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-xs transition-all shadow-md hover:-translate-y-0.5"
                >
                  Tư vấn hồ sơ miễn phí
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
