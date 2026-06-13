import Link from "next/link";
import { CheckCircle, Tag } from "lucide-react";
import { formatCurrency, calcDiscount } from "@/lib/utils";
import type { Course } from "@/types/database.types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const discount = course.original_price
    ? calcDiscount(course.original_price, course.sale_price)
    : 0;

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-100 overflow-hidden group flex flex-col">
      {/* Badge */}
      {course.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {course.badge}
          </span>
        </div>
      )}

      {/* Card header */}
      <div className="bg-gradient-to-br from-brand-50 to-brand-100 p-6 border-b border-brand-100">
        <div className="flex items-start justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            Hạng {course.class_code}
          </span>
          {discount > 0 && (
            <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mt-3 group-hover:text-brand-700 transition-colors">
          {course.name}
        </h3>
      </div>

      {/* Pricing */}
      <div className="px-6 py-4 border-b border-neutral-100">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-brand-600">
            {formatCurrency(course.sale_price)}
          </span>
          {course.original_price && course.original_price > course.sale_price && (
            <span className="text-sm text-neutral-400 line-through">
              {formatCurrency(course.original_price)}
            </span>
          )}
        </div>
        {course.original_price && course.original_price > course.sale_price && (
          <p className="text-xs text-green-600 font-medium mt-1">
            Tiết kiệm {formatCurrency(course.original_price - course.sale_price)}
          </p>
        )}
      </div>

      {/* Features */}
      {course.features && course.features.length > 0 && (
        <div className="px-6 py-4 flex-1">
          <ul className="space-y-2">
            {course.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="px-6 pb-6 pt-3">
        <Link
          href={`/khoa-hoc/${course.class_code.toLowerCase() === "b01" ? "b1" : course.class_code.toLowerCase() === "b" ? "b2" : "c"}`}
          className="block text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Xem chi tiết khóa học
        </Link>
      </div>
    </div>
  );
}
