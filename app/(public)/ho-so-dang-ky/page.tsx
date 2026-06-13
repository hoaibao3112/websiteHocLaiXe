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
  Maximize2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hồ sơ đăng ký học lái xe",
  description:
    "Hướng dẫn chuẩn bị hồ sơ đăng ký học GPLX ô tô tại Trường lái xe Chiến Thắng theo đúng quy định của Bộ GTVT.",
};

export default function HoSoDangKyPage() {
  return (
    <div className="pt-20 bg-neutral-50/50">
      {/* Dark Breadcrumb and Header Banner */}
      <section className="bg-[#1f2937] text-white py-14 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-200">Hồ sơ đăng ký</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            HỒ SƠ ĐĂNG KÝ
          </h1>
        </div>
      </section>

      {/* Documents needed section */}
      <section className="py-16 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 border-b-2 border-brand-500 pb-3 inline-block">
              Hồ sơ đăng ký học GPLX ô tô bao gồm những gì?
            </h2>
            <p className="text-neutral-600 mt-4 leading-relaxed max-w-4xl">
              Để quá trình chuẩn bị diễn ra thuận lợi, quý học viên cần chuẩn bị đầy đủ các
              giấy tờ thiết yếu dưới đây theo đúng quy định của Bộ Giao thông Vận tải.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 01 - Custom Gold border/top bar style */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  01. Đơn đề nghị học và thi
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  Đơn đề nghị sát hạch để cấp giấy phép lái xe theo mẫu quy định. Học viên sẽ được
                  cung cấp và hướng dẫn điền thông tin chính xác ngay tại văn phòng trung tâm.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-brand-700 hover:text-brand-800 font-bold text-sm"
              >
                <span>Tải mẫu đơn tại đây</span>
                <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Card 02 - Special Blue Card */}
            <div className="bg-[#1e3a8a] text-white rounded-xl shadow-md p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Medical Cross Watermark */}
              <div className="absolute right-[-20px] bottom-[-20px] text-white/5 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                <svg className="w-44 h-44 fill-current" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                </svg>
              </div>

              <div>
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6 text-brand-200" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  02. Giấy khám sức khỏe
                </h3>
                <p className="text-neutral-200 text-sm leading-relaxed mb-6">
                  Phải được cấp bởi cơ sở y tế có thẩm quyền (cấp quận/huyện trở lên) trong vòng 6
                  tháng gần nhất.
                </p>
              </div>
              <div className="text-brand-200 text-xs font-medium">Quy chuẩn Bộ Y tế</div>
            </div>

            {/* Card 03 */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
                  <Camera className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  03. Ảnh chân dung
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  Ảnh 3x4 hoặc 4x6 nền xanh. Học viên có thể được hỗ trợ chụp ảnh trực tiếp tại trung
                  tâm để đảm bảo đúng quy chuẩn.
                </p>
              </div>
              <div className="text-neutral-400 text-xs">Chuẩn phông nền xanh</div>
            </div>

            {/* Card 04 */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
                  <IdCard className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  04. CMND/CCCD photo
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  Bản sao chứng minh nhân dân hoặc căn cước công dân (không cần công chứng) và hộ
                  chiếu còn thời hạn (đối với người nước ngoài).
                </p>
              </div>
              <div className="text-neutral-400 text-xs">Không yêu cầu công chứng</div>
            </div>

            {/* Card 05 */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
                  <Layers className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  05. GPLX cũ (nếu có)
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  Bản sao thẻ PET giấy phép lái xe các hạng khác đang sở hữu để được cập nhật vào hồ
                  sơ quản lý chung.
                </p>
              </div>
              <div className="text-neutral-400 text-xs">Tích hợp dữ liệu quốc gia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions section */}
      <section className="py-16 bg-white border-y border-neutral-100 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
              <Image
                src="/driver_student.png"
                alt="Học viên lái xe Chiến Thắng"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Conditions Right */}
            <div>
              <h2 className="font-display text-3xl font-extrabold text-neutral-900 mb-3">
                Điều kiện thi lấy GPLX ô tô
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                Để đủ điều kiện tham gia khóa đào tạo và sát hạch lái xe, học viên cần đáp ứng các
                tiêu chuẩn cơ bản sau đây:
              </p>

              <div className="space-y-5">
                {/* Condition 1 */}
                <div className="flex gap-4 p-4 rounded-xl border-l-4 border-brand-500 bg-neutral-50 hover:bg-neutral-100/70 transition-colors">
                  <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
                      Độ tuổi quy định
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                      Đủ 18 tuổi trở lên tính đến ngày thi sát hạch (Áp dụng cho hạng B1, B2).
                    </p>
                  </div>
                </div>

                {/* Condition 2 */}
                <div className="flex gap-4 p-4 rounded-xl border-l-4 border-brand-500 bg-neutral-50 hover:bg-neutral-100/70 transition-colors">
                  <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
                      Quốc tịch & cư trú
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                      Là công dân Việt Nam hoặc người nước ngoài đang cư trú, làm việc, học tập hợp
                      pháp tại Việt Nam.
                    </p>
                  </div>
                </div>

                {/* Condition 3 */}
                <div className="flex gap-4 p-4 rounded-xl border-l-4 border-brand-500 bg-neutral-50 hover:bg-neutral-100/70 transition-colors">
                  <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
                      Sức khỏe tiêu chuẩn
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                      Đủ sức khỏe lái xe theo quy định (Không bị cận thị quá nặng, không mắc các bệnh
                      về thần kinh, tim mạch, khuyết tật chi,...).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Golden CTA Banner */}
      <section className="py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full pointer-events-none -translate-y-8 translate-x-8" />
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
              Bạn đã sẵn sàng để bắt đầu?
            </h2>
            <p className="text-brand-100 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-medium">
              Hãy để Trung Tâm Chiến Thắng đồng hành cùng bạn trên con đường chinh phục tay lái và
              sự an toàn.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ho-so-dang-ky"
                className="bg-[#1e3a8a] hover:bg-[#172554] text-white font-bold px-8 py-3.5 rounded-md text-sm transition-all shadow-md hover:-translate-y-0.5"
              >
                ĐĂNG KÝ TRỰC TUYẾN
              </Link>
              <Link
                href="/lien-he"
                className="bg-white hover:bg-neutral-50 text-amber-900 font-bold px-8 py-3.5 rounded-md text-sm transition-all shadow-md hover:-translate-y-0.5"
              >
                TƯ VẤN MIỄN PHÍ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
