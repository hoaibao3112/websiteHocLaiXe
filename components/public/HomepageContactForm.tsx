"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

// Strict Zod schema for phone number verification
const homepageContactSchema = z.object({
  phone: z
    .string()
    .regex(
      /^(0|\+84)[0-9]{8,9}$/,
      "Số điện thoại không hợp lệ (VD: 0901234567)"
    ),
});

type HomepageContactInput = z.infer<typeof homepageContactSchema>;

interface ContactsInsertBuilder {
  insert: (data: {
    full_name: string;
    phone: string;
    email?: string | null;
    subject?: string | null;
    message?: string | null;
    status?: string;
  }) => Promise<{ error: { message: string } | null }>;
}

export function HomepageContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HomepageContactInput>({
    resolver: zodResolver(homepageContactSchema),
  });

  async function onSubmit(data: HomepageContactInput) {
    try {
      setErrorMessage(null);
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

      const { error } = await (
        supabase.from("contacts") as unknown as ContactsInsertBuilder
      ).insert({
        full_name: "Yêu cầu gọi lại",
        phone: data.phone,
        subject: "Yêu cầu gọi lại từ Trang chủ",
        message: `Yêu cầu tư vấn tự động gửi từ Trang chủ. Số điện thoại cần liên hệ: ${data.phone}${utmMessage}`,
        status: "pending",
      });

      if (error) {
        throw new Error(error.message);
      }

      // Kích hoạt sự kiện conversion tracking
      try {
        if (typeof window !== "undefined") {
          if ((window as any).fbq) {
            (window as any).fbq("track", "Lead", {
              content_name: "Yêu cầu gọi lại",
              value: 0.00,
              currency: "VND"
            });
          }
          if ((window as any).gtag) {
            (window as any).gtag("event", "generate_lead", {
              event_category: "Engagement",
              event_label: "Form Trang Chủ"
            });
          }
        }
      } catch (trackErr) {
        console.error("Lỗi tracking sự kiện quảng cáo:", trackErr);
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định."
      );
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 flex items-center gap-3 text-amber-800">
        <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <div className="text-xs font-semibold">
          Gửi yêu cầu thành công! Chúng tôi sẽ gọi lại cho bạn sớm nhất.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="relative flex flex-col sm:flex-row gap-2">
        <div className="flex-grow">
          <input
            type="tel"
            id="homepage-phone"
            {...register("phone")}
            placeholder="Số điện thoại của bạn"
            className={cn(
              "w-full px-4 py-3.5 rounded-lg border text-sm transition-all outline-none bg-white",
              errors.phone
                ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                : "border-neutral-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            )}
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold px-6 py-3.5 rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all flex-shrink-0 disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-xs"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              <span>Gửi yêu cầu ngay</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      
      {errors.phone && (
        <p className="text-red-500 text-[11px] font-medium pl-1">
          {errors.phone.message}
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-[11px] font-medium pl-1">
          Lỗi: {errorMessage}
        </p>
      )}
    </form>
  );
}
