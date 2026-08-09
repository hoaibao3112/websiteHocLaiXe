import { Shield, Clock, Calendar, Award, Star } from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

const WHY_US = [
  {
    icon: Shield,
    title: "Sân sát hạch tại nhà",
    desc: "Học và thi ngay tại trung tâm — không cần di chuyển, tỷ lệ đậu cao nhất khu vực.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Clock,
    title: "Xe tập lái đời mới",
    desc: "Được học trên xe đời mới, hiện đại, máy lạnh đầy đủ, vận hành êm ái và hiện đại.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Calendar,
    title: "Lịch học linh hoạt",
    desc: "Học viên chủ động sắp xếp thời gian kể cả thứ 7 và Chủ nhật, phù hợp mọi công việc.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Award,
    title: "Giáo viên tận tâm",
    desc: "Đội ngũ giáo viên 4+ năm kinh nghiệm, kiên nhẫn, hỗ trợ học viên từng bước một.",
    gradient: "from-purple-400 to-violet-500",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-in">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              Tại sao chọn chúng tôi
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] mb-4">
              Ưu điểm nổi bật của Chiến Thắng TG
            </h2>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto">
              Cam kết đào tạo chuyên nghiệp, an toàn và hiệu quả nhất cho mọi học viên.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-5 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} animation="slide-up" delay={index * 120}>
                <div className="hover-lift card-underline group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-500 p-7 h-full flex flex-col">
                  {/* Icon bubble */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
