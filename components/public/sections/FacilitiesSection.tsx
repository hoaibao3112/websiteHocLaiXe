import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export function FacilitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                <MapPin className="w-3.5 h-3.5" />
                Cơ sở vật chất
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e3a8a]">
                Hạ tầng hiện đại
              </h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-sm">
                Hệ thống sân tập và phòng học đạt tiêu chuẩn Bộ Giao thông Vận tải.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full" />
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-700 font-semibold transition-colors group"
            >
              <span>Xem tất cả hình ảnh</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        {/* Photo grid */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Left large photo */}
          <ScrollReveal animation="slide-right" className="h-full">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[380px] shadow-xl img-zoom group h-full">
              <Image
                src="/gallery-1.jpg"
                alt="Sân sát hạch chính thức"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Sân chính</span>
                </div>
                <h3 className="text-lg font-bold">Sân sát hạch chính thức</h3>
                <p className="text-xs text-white/70 mt-1">Diện tích hơn 20,000m² đạt chuẩn</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right 3 photos */}
          <div className="grid gap-5">
            <ScrollReveal animation="slide-left" delay={100}>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/7] shadow-md img-zoom group">
                <Image src="/gallery-3.jpg" alt="Sân tập xe máy" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="text-sm font-bold">Sân tập xe máy</h3>
                  <p className="text-[10px] text-white/60 mt-0.5">Sân tập chuyên biệt dành cho xe máy các hạng A</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-5">
              <ScrollReveal animation="slide-left" delay={200}>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-md img-zoom group">
                  <Image src="/gallery-2.jpg" alt="Đoàn xe tải tập lái" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <h3 className="text-xs font-bold">Đoàn xe tải tập lái</h3>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-left" delay={320}>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-md img-zoom group">
                  <Image src="/gallery-4.jpg" alt="Sân tập lái ô tô" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <h3 className="text-xs font-bold">Sân tập lái ô tô</h3>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
