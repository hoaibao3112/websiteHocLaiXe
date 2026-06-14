import Link from "next/link";
import { CheckCircle, Tag, ArrowRight } from "lucide-react";
import { formatCurrency, calcDiscount } from "@/lib/utils";
import type { Course } from "@/types/database.types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const discount = course.original_price
    ? calcDiscount(course.original_price, course.sale_price)
    : 0;

  // Custom colors for different classes
  const getClassStyles = (code: string) => {
    const cleanCode = code.toUpperCase();
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
    return {
      badge: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
      header: "from-emerald-50/40 to-teal-50/30 border-emerald-100/80",
      text: "text-emerald-700",
    };
  };

  const style = getClassStyles(course.class_code);

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
            Hạng {course.class_code}
          </span>
          {discount > 0 && (
            <span className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Giảm {discount}%
            </span>
          )}
        </div>
        <h3 className="text-xl font-black text-neutral-900 mt-4 group-hover:text-amber-700 transition-colors leading-snug">
          {course.name}
        </h3>
      </div>

      {/* Pricing */}
      <div className="px-7 py-5 border-b border-neutral-100/60 bg-neutral-50/30">
        <div className="flex items-baseline gap-3">
          <span className={`text-2xl font-black ${style.text}`}>
            {formatCurrency(course.sale_price)}
          </span>
          {course.original_price && course.original_price > course.sale_price && (
            <span className="text-sm text-neutral-400 line-through font-medium">
              {formatCurrency(course.original_price)}
            </span>
          )}
        </div>
        {course.original_price && course.original_price > course.sale_price && (
          <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Tiết kiệm {formatCurrency(course.original_price - course.sale_price)}
          </p>
        )}
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
          href={`/khoa-hoc/${course.class_code.toLowerCase() === "b01" ? "b1" : course.class_code.toLowerCase() === "b" ? "b2" : "c"}`}
          className="group/btn flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-neutral-950/10 hover:shadow-neutral-900/20 hover:-translate-y-0.5 mt-auto"
        >
          <span>CHI TIẾT KHÓA HỌC</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
