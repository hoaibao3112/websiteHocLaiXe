import Image from "next/image";
import Link from "next/link";
import { Users, TrendingUp, ArrowRight } from "lucide-react";
import type { Course } from "@/types/database.types";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { AnimatedCounter } from "@/components/public/AnimatedCounter";

function getStudentsCount(classCode: string) {
  if (classCode === "B01") return 1560;
  if (classCode === "B") return 1720;
  if (classCode === "C1") return 1180;
  if (classCode === "A1") return 21198;
  if (classCode === "A") return 9568;
  return 956;
}

function getCourseSlug(classCode: string): string {
  const map: Record<string, string> = {
    b01: "b1",
    b: "b2",
    c1: "c",
    a1: "a1",
    a: "a",
  };
  return map[classCode.toLowerCase()] ?? "nang-hang";
}

interface CoursesSectionProps {
  courses: Course[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-in" duration={800}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Chương trình đào tạo
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] mb-4">
              Các khóa học tại Chiến Thắng
            </h2>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto">
              Đầy đủ các hạng bằng lái theo chuẩn Bộ Giao thông Vận tải, phù hợp cho mọi nhu cầu.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-5 rounded-full" />
          </div>
        </ScrollReveal>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <ScrollReveal
                key={course.id}
                animation="slide-up"
                delay={index * 150}
                className="flex flex-col"
              >
                <div className="hover-lift bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full group">
                  {/* Course image */}
                  <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden img-zoom">
                    {course.image_url ? (
                      <Image
                        src={course.image_url}
                        alt={course.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Users className="w-14 h-14 text-slate-300" />
                      </div>
                    )}
                    {/* Badge */}
                    {course.badge && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {course.badge}
                      </div>
                    )}
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-2.5 border-t border-neutral-100 pt-4 mb-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Học phí</span>
                        <span className="font-bold text-amber-700 text-xs px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
                          Liên hệ
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Học viên đăng ký</span>
                        <span className="font-semibold text-neutral-700">
                          <AnimatedCounter
                            end={getStudentsCount(course.class_code)}
                            suffix="+"
                            duration={1800}
                          />
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/khoa-hoc/${getCourseSlug(course.class_code)}`}
                      className="group/btn flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Xem chi tiết
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-400">
            Hiện tại trung tâm đang cập nhật danh sách khóa học. Vui lòng liên hệ hotline.
          </p>
        )}
      </div>
    </section>
  );
}
