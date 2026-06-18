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
  ArrowRight,
  Phone,
  Shield,
  Star,
  Users,
  Compass,
} from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { AboutUsImageCarousel } from "@/components/public/AboutUsImageCarousel";

export const metadata: Metadata = {
  title: "Giới thiệu về chúng tôi - Trường Lái Xe Chiến Thắng",
  description:
    "Tìm hiểu về Trung Tâm Đào Tạo và Sát Hạch Lái Xe Chiến Thắng tại Đồng Tháp. Đơn vị hàng đầu với cơ sở vật chất đạt chuẩn Bộ GTVT.",
};

export default function VeChungToiPage() {
  return (
    <div className="pt-20 bg-white overflow-x-hidden">
      {/* 1. Hero Banner Section */}
      <section className="relative bg-[#1e3a8a] text-white overflow-hidden py-16 px-4 min-h-[450px]">
        {/* Background Image with opacity overlay */}
        <div className="absolute inset-0">
          <Image
            src="/banner-ve-chung-toi.jpg"
            alt="Trường lái xe Chiến Thắng"
            fill
            className="object-cover object-center opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-neutral-950/20 to-transparent" />
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal animation="fade-in">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-6 uppercase tracking-wider font-semibold">
              <Link href="/" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-amber-400">Về chúng tôi</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-4 uppercase leading-tight max-w-4xl text-white">
              GIỚI THIỆU TRUNG TÂM CHIẾN THẮNG TG
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Hành trình hơn 4 năm đồng hành và kiến tạo thế hệ người lái xe an toàn, vững tâm lý, vững tay lái tại Đồng Tháp.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content (span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal animation="slide-right">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded" />
                  <span className="text-amber-700 font-bold uppercase tracking-wider text-xs">
                    Kế thừa và phát triển
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] mt-3 mb-5 leading-tight">
                  Kiến Tạo Vững Vàng <br />
                  Cho Mỗi Hành Trình
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Được thành lập từ nền tảng giáo dục nghề nghiệp hàng đầu,{" "}
                  <strong className="text-neutral-900 font-semibold">
                    Trung Tâm Đào Tạo Và Sát Hạch Lái Xe Chiến Thắng Tiền Giang
                  </strong>{" "}
                  tự hào là trung tâm hàng đầu đào tạo lấy xe tại Đồng Tháp. Với sứ mệnh mang lại sự an toàn và kiến thức vững chắc cho người tham gia giao thông, chúng tôi không ngừng đầu tư nâng cấp chất lượng giảng dạy và cơ sở vật chất.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mt-4">
                  Tại Chiến Thắng, việc học lái xe không chỉ là để lấy tấm bằng, mà quan trọng hơn là trang bị kỹ năng lái xe an toàn suốt đời và đạo đức của người tài xế.
                </p>
              </ScrollReveal>

              {/* Hạng badges */}
              <div className="grid grid-cols-3 gap-4 py-4">
                {[
                  { label: "Hạng B (Tự động)", icon: Car, desc: "Xe ô tô số tự động" },
                  { label: "Hạng B (Số sàn)", icon: Car, desc: "Xe ô tô số sàn" },
                  { label: "Hạng C (Tải)", icon: Truck, desc: "Xe tải trên 3.5 tấn" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={idx} animation="scale-in" delay={idx * 100}>
                      <div className="hover-lift bg-slate-50 border border-neutral-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs group h-full">
                        <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-amber-500/20">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-neutral-800 mt-3 block">{item.label}</span>
                        <span className="text-[10px] text-neutral-400 mt-1 block">{item.desc}</span>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Address Box */}
              <ScrollReveal animation="slide-up" delay={200}>
                <div className="flex items-start gap-4 bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-l-4 border-amber-500 p-5 rounded-r-2xl shadow-xs">
                  <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 mb-1 uppercase tracking-wider">
                      Vị trí đắc địa:
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      168 QL1A, Ấp Phú Hòa, Xã Mỹ Thành, Đồng Tháp (Tiền Giang Cũ), Việt Nam.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Graphics (span 5) */}
            <div className="lg:col-span-5 relative">
              {/* Image Carousel */}
              <ScrollReveal animation="slide-left" className="h-full">
                <AboutUsImageCarousel />
              </ScrollReveal>

              {/* Floating Badge Card */}
              <ScrollReveal animation="scale-in" delay={300}>
                <div className="absolute left-6 bottom-[-28px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-neutral-100 p-5 max-w-[280px] flex gap-4 animate-glow">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
                      Đạt chuẩn Bộ GTVT
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-relaxed mt-1 font-medium">
                      Hệ thống xe cảm biến hiện đại kết hợp sân sát hạch chính thức đạt tiêu chuẩn cao nhất.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-neutral-100/60 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-2">
                <Compass className="w-3.5 h-3.5 fill-amber-500" />
                Giá trị cốt lõi
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a]">
                Giá Trị Khác Biệt Tại Chiến Thắng
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Chúng tôi không chỉ giúp bạn hoàn thành kỳ thi và nhận tấm bằng lái mà còn xây dựng sự tự tin tuyệt đối sau tay lái.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Sân Sát Hạch Tại Chỗ",
                desc: "Chiến Thắng tự hào sở hữu sân sát hạch chính thức tại chỗ diện tích rộng lớn. Học viên được học thử nghiệm và thi thực tế trên cùng một sân tập, giúp loại bỏ hoàn toàn áp lực tâm lý lạ sân.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Car,
                title: "Hệ Xe Tập Đời Mới",
                desc: "Học trên dàn xe Toyota Vios mới mẻ, sạch sẽ, trang bị điều hòa mát lạnh và hệ thống phanh phụ an toàn tuyệt đối. Xe tập lái luôn được kiểm định định kỳ đảm bảo hoạt động hoàn hảo.",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "Đội Ngũ Giáo Viên Tận Tâm",
                desc: "Mỗi thầy cô tại trung tâm đều sở hữu chứng chỉ sư phạm dạy lái xe chuyên nghiệp, giàu kinh nghiệm, giảng dạy ân cần, tuyệt đối không có tiêu cực hay quát mắng học viên.",
                color: "from-emerald-500 to-teal-600",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={idx} animation="slide-up" delay={idx * 150}>
                  <div className="hover-lift card-underline bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 flex flex-col justify-between h-full group">
                    <div className="space-y-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${card.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-neutral-100 group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1e3a8a] group-hover:text-amber-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Action Banner Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale-in">
            <div className="rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
              />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full pointer-events-none -translate-y-8 translate-x-8" />

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
                Sẵn Sàng Làm Chủ Tay Lái An Toàn?
              </h2>
              <p className="text-amber-100 max-w-2xl mx-auto text-xs sm:text-sm mb-8 font-semibold">
                Đội ngũ giảng viên tâm huyết và hệ thống xe hiện đại đã sẵn sàng phục vụ bạn. Đăng ký nhận lịch khai giảng và học phí ưu đãi tốt nhất ngay hôm nay.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/lien-he"
                  className="bg-white hover:bg-neutral-50 text-amber-900 font-extrabold px-8 py-4 rounded-xl text-xs transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Đăng ký tư vấn ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/khoa-hoc"
                  className="border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-xs transition-all shadow-md hover:-translate-y-0.5"
                >
                  Xem lịch khai giảng
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
