import Link from "next/link";
import { CheckCircle, Tag, ArrowRight } from "lucide-react";
import type { Course } from "@/types/database.types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // Custom colors for different classes
  const getClassStyles = (code: string) => {
    const cleanCode = code.toUpperCase();
    if (cleanCode === "A1") {
      return {
        badge: "from-teal-500 to-emerald-600 shadow-teal-500/20",
        header: "from-teal-50/50 to-emerald-50/50 border-teal-100/80",
        text: "text-teal-700",
      };
    }
    if (cleanCode === "A") {
      return {
        badge: "from-cyan-500 to-blue-600 shadow-cyan-500/20",
        header: "from-cyan-50/50 to-blue-50/50 border-cyan-100/80",
        text: "text-cyan-700",
      };
    }
    if (cleanCode.includes("B1")) {
      return {
        badge: "from-blue-500 to-indigo-600 shadow-blue-500/20",
        header: "from-blue-50/50 to-indigo-50/50 border-blue-100/80",
        text: "text-blue-700",
      };
    }
    if (cleanCode === "B" || cleanCode.includes("B2")) {
      return {
        badge: "from-amber-500 to-orange-600 shadow-amber-500/20",
        header: "from-amber-50/40 to-orange-50/30 border-amber-100/80",
        text: "text-amber-700",
      };
    }
    if (cleanCode === "C1" || cleanCode === "C") {
      return {
        badge: "from-rose-500 to-pink-600 shadow-rose-500/20",
        header: "from-rose-50/50 to-pink-50/50 border-rose-100/80",
        text: "text-rose-705",
      };
    }
    return {
      badge: "from-purple-500 to-indigo-600 shadow-purple-500/20",
      header: "from-purple-50/50 to-indigo-50/50 border-purple-100/80",
      text: "text-purple-700",
    };
  };

  const style = getClassStyles(course.class_code);

  const getSlug = (code: string) => {
    const cleanCode = code.toLowerCase();
    if (cleanCode === "b01") return "b1";
    if (cleanCode === "b") return "b2";
    if (cleanCode === "c1") return "c";
    if (cleanCode === "a1") return "a1";
    if (cleanCode === "a") return "a";
    return "nang-hang";
  };

  return (
    <div className="hover-lift card-underline bg-white rounded-3xl border border-neutral-100 overflow-hidden group flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500">
      {/* Badge */}
      {course.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-rose-500/20">
            {course.badge}
          </span>
        </div>
      )}

      {/* Card header */}
      <div className={`bg-gradient-to-br ${style.header} p-7 border-b`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${style.badge} text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md`}>
            <Tag className="w-3.5 h-3.5" />
            {course.class_code.toUpperCase() === "NH"
              ? "Nâng Hạng"
              : course.class_code.toUpperCase() === "B01"
                ? "Hạng B"
                : `Hạng ${course.class_code}`}
          </span>
        </div>
        <h3 className="text-xl font-black text-neutral-900 mt-4 group-hover:text-amber-700 transition-colors leading-snug">
          {course.name}
        </h3>
      </div>

      {/* Pricing */}
      <div className="px-7 py-4 border-b border-neutral-100/60 bg-neutral-50/30 flex items-center justify-between">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Học phí:</span>
        <span className={`text-xs font-black ${style.text} px-3.5 py-1.5 bg-white rounded-full border border-neutral-150 shadow-sm uppercase tracking-wider`}>
          Liên hệ báo giá
        </span>
      </div>

      {/* Features */}
      <div className="px-7 py-6 flex-1 flex flex-col justify-between">
        {course.features && course.features.length > 0 && (
          <ul className="space-y-3 mb-6">
            {course.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <Link
          href={`/khoa-hoc/${getSlug(course.class_code)}`}
          className="group/btn flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-neutral-950/10 hover:shadow-neutral-900/20 hover:-translate-y-0.5 mt-auto"
        >
          <span>CHI TIẾT KHÓA HỌC</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
