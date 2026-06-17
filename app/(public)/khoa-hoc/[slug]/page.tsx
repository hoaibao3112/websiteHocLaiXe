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
      vehicleType: "Xe mô tô 2 bánh có dung tích xi-lanh từ 50cm³ đến dưới 175cm³",
      duration: "Lịch thi hàng tuần",
      target: "Dành cho người có nhu cầu điều khiển xe mô tô, xe gắn máy thông thường hàng ngày.",
      requirements: "Công dân Việt Nam hoặc người nước ngoài đang cư trú hợp pháp đủ 18 tuổi trở lên, đủ sức khỏe theo quy định.",
    },
    A: {
      titleText: "Bằng Lái Xe Mô Tô Phân Khối Lớn (Hạng A)",
      vehicleType: "Xe mô tô 2 bánh có dung tích xi-lanh từ 175cm³ trở lên và các loại xe hạng A1",
      duration: "Thi sau 1-2 tuần học",
      target: "Dành cho người đam mê và vận hành các loại xe mô tô phân khối lớn (PKL).",
      requirements: "Công dân Việt Nam hoặc người nước ngoài đang cư trú hợp pháp đủ 18 tuổi trở lên, đủ sức khỏe theo quy định.",
    },
    B01: {
      titleText: "Bằng Lái Số Tự Động (Hạng B1)",
      vehicleType: "Xe số tự động du lịch (4-9 chỗ), xe tải số tự động < 3.5 tấn",
      duration: "2.5 tháng",
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
      requirements: "Mọi công dân Việt Nam đủ 21 tuổi trở lên, đảm bảo tiêu chuẩn sức khỏe lái xe.",
    },
    NH: {
      titleText: "Khóa Học Nâng Hạng Bằng Lái Xe",
      vehicleType: "Nâng hạng lên các hạng bằng B2, C, D, E, FC...",
      duration: "1.5 - 2 tháng",
      target: "Dành cho lái xe chuyên nghiệp muốn nâng cao hạng bằng để điều khiển các loại xe có tải trọng hoặc sức chứa lớn hơn.",
      requirements: "Là công dân Việt Nam có giấy phép lái xe hiện tại và đủ thời gian, số km lái xe an toàn theo luật định.",
    },
  }[classCode as "B01" | "B" | "C1" | "A1" | "A" | "NH"];

  return (
    <div className="pt-20 bg-neutral-50/50 min-h-screen">
      {/* 1. Breadcrumb & Header */}
      <section className="bg-[#1f2937] text-white py-14 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/khoa-hoc" className="hover:text-white transition-colors">
              Khóa học
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-200">Hạng {course.class_code}</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Khóa học sát hạch
            </span>
            {course.badge && (
              <span className="bg-[#1e3a8a] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {course.badge}
              </span>
            )}
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {course.name}
          </h1>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left Column: Details (span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-10 animate-slide-up">
              
              {/* Introduction Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 shadow-xs space-y-4">
                <h2 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
                  <VehicleIcon className="w-5 h-5 text-amber-500" />
                  Mô tả khóa học
                </h2>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {course.description}
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {detailsExtra?.target}
                </p>
              </div>

              {/* Course Parameters Grid */}
              <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 shadow-xs">
                <h2 className="text-xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  Thông tin đào tạo chi tiết
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Item 1: Duration */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Thời gian đào tạo
                      </h4>
                      <p className="text-neutral-800 font-bold text-sm mt-0.5">
                        {detailsExtra?.duration}
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Vehicles */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0">
                      <VehicleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Phương tiện tập lái
                      </h4>
                      <p className="text-neutral-800 font-bold text-sm mt-0.5 leading-snug">
                        {detailsExtra?.vehicleType}
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Requirements */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Điều kiện học viên
                      </h4>
                      <p className="text-neutral-800 font-bold text-sm mt-0.5 leading-snug">
                        {detailsExtra?.requirements}
                      </p>
                    </div>
                  </div>

                  {/* Item 4: Location */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Địa điểm học & thi
                      </h4>
                      <p className="text-neutral-800 font-bold text-sm mt-0.5 leading-snug">
                        Trung tâm Sát hạch Chiến Thắng Mỹ Thành, Đồng Tháp (Tiền Giang Cũ)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Features / Syllabus */}
              <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold text-[#1e3a8a]">
                  Điểm vượt trội của khóa học tại Chiến Thắng
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features && course.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs text-neutral-600 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Registration Profile */}
              <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold text-[#1e3a8a]">
                  Hồ sơ chuẩn bị đăng ký học
                </h2>
                <div className="space-y-4">
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    Học viên cần chuẩn bị đầy đủ các giấy tờ sau để trung tâm hoàn tất hồ sơ đăng ký thi sát hạch lên Sở GTVT Đồng Tháp:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      01 Bản sao CCCD (Không cần công chứng)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      01 Đơn đề nghị học và thi sát hạch
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      Giấy khám sức khỏe lái xe (Còn hạn 6 tháng)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      Ảnh chụp chân dung phông nền xanh (Tại TT)
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/ho-so-dang-ky"
                      className="inline-flex items-center gap-1.5 text-xs text-brand-700 hover:text-brand-800 font-bold hover:underline"
                    >
                      Xem hướng dẫn chuẩn bị chi tiết
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing & Sidebar Form (span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Sticky Sidebar Info */}
              <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 shadow-md space-y-6 lg:sticky lg:top-28">
                
                {/* Course Image Carousel */}
                <CourseImageCarousel defaultImage={course.image_url} />

                {/* Price Display */}
                <div className="border-y border-neutral-100 py-5">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Học phí khóa học
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-black px-4 py-2 rounded-xl border border-amber-200/60 uppercase tracking-wider">
                      Liên hệ để nhận báo giá tốt nhất
                    </span>
                  </div>
                </div>

                {/* Features points check */}
                <ul className="space-y-3.5 text-xs text-neutral-600 font-semibold">
                  <li className="flex gap-2.5 items-start">
                    <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Cam kết trọn gói học phí, không phát sinh chi phí xăng xe, sân tập.
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Học thực hành 1 kèm 1 với giáo viên tận tâm.
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Đào tạo và thi sát hạch trên cùng 1 sân tại Mỹ Thành, Đồng Tháp (Tiền Giang Cũ).
                  </li>
                </ul>

                {/* Register Link */}
                <div className="space-y-3 pt-2">
                  <a
                    href="https://zalo.me/0902868928"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-md hover:shadow-lg uppercase tracking-wider"
                  >
                    Đăng ký khóa học ngay
                  </a>
                  <a
                    href="tel:0902868928"
                    className="flex items-center justify-center gap-2 text-center border border-neutral-200 text-neutral-700 font-bold py-3.5 rounded-xl text-xs hover:bg-neutral-50 transition-colors uppercase tracking-wider"
                  >
                    <Phone className="w-4 h-4 text-amber-600" />
                    Gọi điện hỗ trợ
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
