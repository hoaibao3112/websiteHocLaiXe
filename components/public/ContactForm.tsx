"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/contact.schema";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    const supabase = createClient();

    let utmMessage = "";
    try {
      const storedUtm = sessionStorage.getItem("utm_data");
      if (storedUtm) {
        const utm = JSON.parse(storedUtm);
        utmMessage = `\n\n[UTM Tracking]\nNguồn: ${utm.utm_source || "N/A"}\nKênh: ${utm.utm_medium || "N/A"}\nChiến dịch: ${utm.utm_campaign || "N/A"}\nNội dung: ${utm.utm_content || "N/A"}\nTừ khóa: ${utm.utm_term || "N/A"}`;
      }
    } catch (e) {
      console.error("Lỗi đọc UTM từ sessionStorage:", e);
    }

    const { error } = await (supabase.from("contacts") as any).insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      subject: "Liên hệ & Tuyển dụng",
      message: `${data.message || ""}${utmMessage}`.trim() || null,
    });

    if (!error) {
      // Kích hoạt sự kiện conversion tracking
      try {
        if (typeof window !== "undefined") {
          if ((window as any).fbq) {
            (window as any).fbq("track", "Lead", {
              content_name: "Liên hệ & Tuyển dụng",
              value: 0.00,
              currency: "VND"
            });
          }
          if ((window as any).gtag) {
            (window as any).gtag("event", "generate_lead", {
              event_category: "Engagement",
              event_label: "Form Liên Hệ"
            });
          }
        }
      } catch (trackErr) {
        console.error("Lỗi tracking sự kiện quảng cáo:", trackErr);
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">
          Gửi thành công!
        </h3>
        <p className="text-neutral-500 text-sm">
          Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Họ tên */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-semibold text-neutral-700 mb-2">
            Họ và tên
          </label>
          <input
            id="full_name"
            type="text"
            {...register("full_name")}
            placeholder="Nguyễn Văn A"
            className={cn(
              "w-full px-4 py-3 rounded-md border text-sm transition-all outline-none",
              errors.full_name
                ? "border-red-300 bg-red-50 focus:border-red-400"
                : "border-neutral-300 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            )}
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1.5">{errors.full_name.message}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="0901 234 567"
            className={cn(
              "w-full px-4 py-3 rounded-md border text-sm transition-all outline-none",
              errors.phone
                ? "border-red-300 bg-red-50 focus:border-red-400"
                : "border-neutral-300 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
          Địa chỉ Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="example@gmail.com"
          className={cn(
            "w-full px-4 py-3 rounded-md border text-sm transition-all outline-none",
            errors.email
              ? "border-red-300 bg-red-50 focus:border-red-400"
              : "border-neutral-300 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Nội dung */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
          Nội dung tin nhắn
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          placeholder="Bạn cần tư vấn về khóa học hay vị trí tuyển dụng nào?"
          className="w-full px-4 py-3 rounded-md border border-neutral-300 bg-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#92400e] active:bg-[#78350f] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3.5 rounded-md transition-all shadow-md hover:shadow-lg text-sm"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <ArrowRight className="w-4 h-4" />
            Gửi yêu cầu ngay
          </>
        )}
      </button>
    </form>
  );
}
