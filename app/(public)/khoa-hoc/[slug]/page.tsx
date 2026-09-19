import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import {
  Phone,
  Calendar,
  Clock,
  Car,
  Truck,
  Shield,
  Check,
  FileText,
  ArrowRight,
  ChevronRight,
  MapPin,
  Tag,
  DollarSign,
  UserCheck,
  Bike,
  TrendingUp,
} from "lucide-react";
import type { Course } from "@/types/database.types";
import { CourseImageCarousel } from "@/components/public/CourseImageCarousel";

// Static mapping from slug to class_code
const SLUG_TO_CLASS = {
  b1: "B01",
  b2: "B",
  c: "C1",
  a1: "A1",
  a: "A",
  "nang-hang": "NH",
} as const;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getCourse = cache(async (classCode: string): Promise<Course | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("class_code", classCode)
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .limit(1);

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching course detail:", error);
    return null;
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const classCode = SLUG_TO_CLASS[slug.toLowerCase() as keyof typeof SLUG_TO_CLASS];
  if (!classCode) return { title: "Không tìm thấy khóa học" };

  const course = await getCourse(classCode);
  if (!course) return { title: "Không tìm thấy khóa học" };

  return {
    title: `${course.name} — Trường Lái Xe Chiến Thắng`,
    description: course.description ?? `Chi tiết khóa học lái xe ${course.name} tại Đồng Tháp.`,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const classCode = SLUG_TO_CLASS[slug.toLowerCase() as keyof typeof SLUG_TO_CLASS];

  if (!classCode) {
    notFound();
  }

  const course = await getCourse(classCode);

  if (!course) {
    notFound();
  }

  // Get icons based on class_code
  const VehicleIcon = classCode === "C1" ? Truck : (classCode === "A1" || classCode === "A") ? Bike : classCode === "NH" ? TrendingUp : Car;

  // Additional structured data based on the class code
  const detailsExtra = {
    A1: {
      titleText: "Bằng Lái Xe Máy (Hạng A1)",
      vehicleType: "Xe mô tô 2 bánh có dung tích xi-lanh từ 50cm³ đến dưới 125cm³",
      duration: "Lịch thi hàng tuần",
      target: "Dành cho người có nhu cầu điều khiển xe mô tô, xe gắn máy thông thường hàng ngày.",
      requirements: "Công dân Việt Nam hoặc người nước ngoài đang cư trú hợp pháp đủ 18 tuổi trở lên, đủ sức khỏe theo quy định.",
    },
    A: {
      titleText: "Bằng Lái Xe Mô Tô Phân Khối Lớn (Hạng A)",
      vehicleType: "Xe mô tô 2 bánh có dung tích xi-lanh từ 125cm³ trở lên và các loại xe hạng A1",
      duration: "Thi sau 1-2 tuần học",
      target: "Dành cho người đam mê và vận hành các loại xe mô tô phân khối lớn (PKL).",
      requirements: "Công dân Việt Nam hoặc người nước ngoài đang cư trú hợp pháp đủ 18 tuổi trở lên, đủ sức khỏe theo quy định.",
    },
    B01: {
      titleText: "Bằng Lái Số Tự Động (Hạng B1)",
      vehicleType: "Xe số tự động du lịch (4-9 chỗ), xe tải số tự động < 3.5 tấn",
      duration: "3,5 tháng",
      target: "Phù hợp cho cá nhân, hộ gia đình đi lại thông thường, không hành nghề kinh doanh vận tải.",
      requirements: "Mọi công dân Việt Nam đủ 18 tuổi trở lên, đảm bảo tiêu chuẩn sức khỏe lái xe.",
    },
    B: {
      titleText: "Bằng Lái Số Sàn & Tự Động (Hạng B2)",
      vehicleType: "Xe số sàn, số tự động du lịch (4-9 chỗ), xe tải < 3.5 tấn",
      duration: "4 tháng",
      target: "Dành cho cá nhân muốn tự do lái cả xe số sàn và số tự động, kết hợp chạy xe dịch vụ, taxi, kinh doanh vận tải.",
      requirements: "Mọi công dân Việt Nam đủ 18 tuổi trở lên, đảm bảo tiêu chuẩn sức khỏe lái xe.",
    },
    C1: {
      titleText: "Bằng Lái Xe Tải Nặng (Hạng C)",
      vehicleType: "Xe ô tô tải, xe chuyên dùng có tải trọng thiết kế ≥ 3.5 tấn, xe du lịch đến 9 chỗ",
      duration: "4.5 tháng",
      target: "Dành cho tài xế chuyên nghiệp chạy xe tải nặng, xe đầu kéo, xe vận tải lớn hoặc kinh doanh kho bãi lớn.",
      requirements: "Mọi công dân Việt Nam đủ 18 tuổi trở lên, đảm bảo tiêu chuẩn sức khỏe lái xe.",
    },
    NH: {
      titleText: "Khóa Học Nâng Hạng Bằng Lái Xe",
      vehicleType: "Nâng hạng lên các hạng bằng C, D1, D2,",
      duration: "1.5 - 2 tháng",
      target: "Dành cho lái xe chuyên nghiệp muốn nâng cao hạng bằng để điều khiển các loại xe có tải trọng hoặc sức chứa lớn hơn.",
      requirements: "Là công dân Việt Nam có giấy phép lái xe hiện tại và đủ thời gian, số km lái xe an toàn theo luật định.",
    },
  }[classCode as "B01" | "B" | "C1" | "A1" | "A" | "NH"];

  return (
    <div className="pt-16 sm:pt-20 bg-neutral-50/50 min-h-screen pb-12 sm:pb-16 overflow-x-hidden">
      {/* 1. Breadcrumb & Header */}
      <section className="bg-[#1f2937] text-white py-8 sm:py-12 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-neutral-400 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            <Link href="/khoa-hoc" className="hover:text-white transition-colors">
              Khóa học
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-amber-400 font-semibold">
              {course.class_code.toUpperCase() === "NH"
                ? "Nâng Hạng"
                : course.class_code.toUpperCase() === "B01"
                  ? "Hạng B (Số tự động)"
                  : `Hạng ${course.class_code}`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-neutral-950 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              Khóa học sát hạch
            </span>
            {course.badge && (
              <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {course.badge}
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {course.name}
          </h1>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-start">

            {/* Right Column (Sidebar) -> Displayed FIRST on mobile (order-1), sticky on desktop (order-2) */}
            <div className="lg:col-span-5 w-full min-w-0 flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">

              {/* Sticky Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-3.5 sm:p-6 shadow-sm space-y-4 sm:space-y-5 lg:sticky lg:top-24 w-full min-w-0">

                {/* Course Image Carousel */}
                <CourseImageCarousel defaultImage={course.image_url} />

                {/* Price Display */}
                <div className="border-t border-neutral-100 pt-3 sm:pt-4">
                  <div className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Học phí khóa học
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl border border-amber-200/80 uppercase tracking-wide">
                      Liên hệ để nhận báo giá tốt nhất
                    </span>
                  </div>
                </div>

                {/* Features points check */}
                <ul className="space-y-2 sm:space-y-2.5 text-xs text-neutral-600 font-semibold border-t border-neutral-100 pt-3 sm:pt-4">
                  <li className="flex gap-2 items-start">
                    <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Cam kết trọn gói học phí, không phát sinh chi phí xăng xe, sân tập.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Học thực hành 1 kèm 1 với giáo viên tận tâm, xe đời mới 100%.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Đào tạo tại Đồng Tháp (Tiền Giang Cũ), thi sát hạch tại Cần Thơ.</span>
                  </li>
                </ul>

                {/* Direct Contact Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="https://zalo.me/0902868928"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-center bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-sm active:scale-98 uppercase tracking-wider"
                  >
                    <span>Đăng ký qua Zalo</span>
                  </a>
                  <a
                    href="tel:0902868928"
                    className="flex items-center justify-center gap-2 text-center border border-amber-600/30 bg-amber-50/60 hover:bg-amber-100 active:bg-amber-200 text-amber-900 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all uppercase tracking-wider active:scale-98"
                  >
                    <Phone className="w-4 h-4 text-amber-700" />
                    <span>0902.868.928</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Left Column: Details (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-7 w-full min-w-0 flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">

              {/* Course Parameters 2x2 Grid */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-xs">
                <h2 className="text-base sm:text-lg font-bold text-[#1e3a8a] mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  Thông tin đào tạo cốt lõi
                </h2>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {/* Item 1: Duration */}
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 flex flex-col justify-between min-w-0">
                    <div className="flex items-center gap-1.5 text-amber-700 mb-1">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Thời gian học
                      </span>
                    </div>
                    <p className="text-neutral-900 font-bold text-xs sm:text-sm mt-0.5">
                      {detailsExtra?.duration}
                    </p>
                  </div>

                  {/* Item 2: Vehicles */}
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 flex flex-col justify-between min-w-0">
                    <div className="flex items-center gap-1.5 text-amber-700 mb-1">
                      <VehicleIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Phương tiện tập
                      </span>
                    </div>
                    <p className="text-neutral-900 font-bold text-xs sm:text-sm mt-0.5 leading-snug">
                      {detailsExtra?.vehicleType}
                    </p>
                  </div>

                  {/* Item 3: Requirements */}
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 flex flex-col justify-between min-w-0">
                    <div className="flex items-center gap-1.5 text-amber-700 mb-1">
                      <UserCheck className="w-4 h-4 flex-shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Điều kiện học
                      </span>
                    </div>
                    <p className="text-neutral-900 font-bold text-xs sm:text-sm mt-0.5 leading-snug">
                      {detailsExtra?.requirements}
                    </p>
                  </div>

                  {/* Item 4: Location */}
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 flex flex-col justify-between min-w-0">
                    <div className="flex items-center gap-1.5 text-amber-700 mb-1">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Địa điểm học & thi
                      </span>
                    </div>
                    <p className="text-neutral-900 font-bold text-xs sm:text-sm mt-0.5 leading-snug">
                      Mỹ Thành, Đồng Tháp & Cần Thơ
                    </p>
                  </div>
                </div>
              </div>

              {/* Introduction Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-xs space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-[#1e3a8a] flex items-center gap-2">
                  <VehicleIcon className="w-4 h-4 text-amber-500" />
                  Mô tả khóa học
                </h2>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {course.description}
                </p>
                {detailsExtra?.target && (
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed border-t border-neutral-100 pt-2.5">
                    {detailsExtra.target}
                  </p>
                )}
              </div>

              {/* Course Features / Syllabus */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-[#1e3a8a]">
                  Điểm vượt trội của khóa học tại Chiến Thắng
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {course.features && course.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start p-2.5 sm:p-3 bg-neutral-50/80 rounded-xl border border-neutral-100">
                      <div className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs text-neutral-700 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Registration Profile */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-[#1e3a8a]">
                  Hồ sơ chuẩn bị đăng ký học
                </h2>
                <div className="space-y-3">
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    Học viên cần chuẩn bị các giấy tờ sau để trung tâm hoàn tất hồ sơ đăng ký thi sát hạch lên Sở GTVT Đồng Tháp:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs text-neutral-700 font-medium">
                    <li className="flex items-center gap-2 p-2 bg-neutral-50/80 rounded-lg border border-neutral-100">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                      02 Bản sao CCCD (Không cần công chứng)
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-neutral-50/80 rounded-lg border border-neutral-100">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                      03 Đơn đề nghị học và thi sát hạch
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-neutral-50/80 rounded-lg border border-neutral-100">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                      Giấy khám sức khỏe lái xe (Còn hạn 6 tháng)
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-neutral-50/80 rounded-lg border border-neutral-100">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                      Ảnh chụp chân dung (Chụp miễn phí tại TT)
                    </li>
                  </ul>
                  <div className="pt-1">
                    <Link
                      href="/ho-so-dang-ky"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 font-bold hover:underline"
                    >
                      Xem hướng dẫn thủ tục chi tiết
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Other Courses Switcher */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-xs">
                <h3 className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">
                  Các khóa học lái xe khác tại Chiến Thắng
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Link
                    href="/khoa-hoc/b1"
                    className={`text-center py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      slug.toLowerCase() === "b1"
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-neutral-50 hover:bg-amber-50 text-neutral-700 hover:text-amber-800 border-neutral-200"
                    }`}
                  >
                    Hạng B (Số Tự Động)
                  </Link>
                  <Link
                    href="/khoa-hoc/b2"
                    className={`text-center py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      slug.toLowerCase() === "b2"
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-neutral-50 hover:bg-amber-50 text-neutral-700 hover:text-amber-800 border-neutral-200"
                    }`}
                  >
                    Hạng B (Số Sàn)
                  </Link>
                  <Link
                    href="/khoa-hoc/c"
                    className={`text-center py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      slug.toLowerCase() === "c"
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-neutral-50 hover:bg-amber-50 text-neutral-700 hover:text-amber-800 border-neutral-200"
                    }`}
                  >
                    Hạng C (Xe Tải)
                  </Link>
                  <Link
                    href="/khoa-hoc/a1"
                    className={`text-center py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      slug.toLowerCase() === "a1"
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-neutral-50 hover:bg-amber-50 text-neutral-700 hover:text-amber-800 border-neutral-200"
                    }`}
                  >
                    Hạng A1 (Xe Máy)
                  </Link>
                  <Link
                    href="/khoa-hoc/a"
                    className={`text-center py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      slug.toLowerCase() === "a"
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-neutral-50 hover:bg-amber-50 text-neutral-700 hover:text-amber-800 border-neutral-200"
                    }`}
                  >
                    Hạng A (Mô Tô PKL)
                  </Link>
                  <Link
                    href="/khoa-hoc/nang-hang"
                    className={`text-center py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      slug.toLowerCase() === "nang-hang"
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-neutral-50 hover:bg-amber-50 text-neutral-700 hover:text-amber-800 border-neutral-200"
                    }`}
                  >
                    Nâng Hạng Bằng
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
