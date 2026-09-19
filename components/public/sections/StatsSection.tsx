import { ScrollReveal } from "@/components/public/ScrollReveal";
import { AnimatedCounter } from "@/components/public/AnimatedCounter";

const STATS = [
  { value: 4, suffix: "", label: "Năm kinh nghiệm", icon: "🏆", color: "from-amber-500 to-orange-600" },
  { value: 30000, suffix: "+", label: "Học viên đã nhận GPLX", icon: "🎓", color: "from-blue-500 to-indigo-600" },
  { value: 92, suffix: "%", label: "Tỉ lệ đậu lần đầu", icon: "✅", color: "from-emerald-500 to-teal-600" },
  { value: 20000, suffix: "m²", label: "Tổng diện tích sân", icon: "📍", color: "from-rose-500 to-pink-600" },
];

export function StatsSection() {
  return (
    <section className="relative -mt-6 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {STATS.map((stat, index) => (
          <ScrollReveal key={stat.label} animation="scale-in" delay={index * 100}>
            <div className="hover-lift card-underline bg-white rounded-xl sm:rounded-2xl shadow-lg border border-neutral-100/80 p-3.5 sm:p-6 text-center relative overflow-hidden group">
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Icon */}
              <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-3">{stat.icon}</div>

              {/* Counter */}
              <div className={`text-2xl sm:text-3xl xl:text-4xl font-extrabold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1 tabular-nums`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
              </div>

              {/* Label */}
              <p className="text-neutral-500 text-[11px] sm:text-xs font-medium leading-snug">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
