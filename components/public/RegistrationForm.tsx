"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations/contact.schema";
import { User, Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface RegistrationFormProps {
  /** Tên khóa học để pre-fill subject (tùy chọn) */
  defaultSubject?: string;
  /** Màu accent button (mặc định amber) */
  variant?: "amber" | "emerald" | "blue";
}

const variantStyles = {
  amber: {
    btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
    focus: "focus:ring-amber-500 focus:border-amber-500",
    label: "text-amber-700",
    border: "border-amber-200 bg-amber-50/30",
  },
  emerald: {
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    focus: "focus:ring-emerald-500 focus:border-emerald-500",
    label: "text-emerald-700",
    border: "border-emerald-200 bg-emerald-50/30",
  },
  blue: {
    btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
    focus: "focus:ring-blue-500 focus:border-blue-500",
    label: "text-blue-700",
    border: "border-blue-200 bg-blue-50/30",
  },
};

export function RegistrationForm({
  defaultSubject = "",
  variant = "amber",
}: RegistrationFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const styles = variantStyles[variant];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: defaultSubject,
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitState("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Lỗi không xác định");
      }

      setSubmitState("success");
      reset();
      // Auto reset về idle sau 6 giây
      setTimeout(() => setSubmitState("idle"), 6000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Đã xảy ra lỗi. Vui lòng thử lại.");
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neutral-900">Gửi thành công!</h3>
          <p className="text-sm text-neutral-500 mt-1">
            Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại sớm nhất.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Họ và Tên */}
      <div>
        <label htmlFor="reg-full_name" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-neutral-400" />
            Họ và tên <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          id="reg-full_name"
          type="text"
          placeholder="Nguyễn Văn An"
          autoComplete="name"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:ring-2 ${styles.focus} ${
            errors.full_name ? "border-red-400 focus:ring-red-300" : "border-neutral-200"
          }`}
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.full_name.message}
          </p>
        )}
      </div>

      {/* Số điện thoại */}
      <div>
        <label htmlFor="reg-phone" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            Số điện thoại <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          id="reg-phone"
          type="tel"
          placeholder="0901 234 567"
          autoComplete="tel"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:ring-2 ${styles.focus} ${
            errors.phone ? "border-red-400 focus:ring-red-300" : "border-neutral-200"
          }`}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Gmail */}
      <div>
        <label htmlFor="reg-email" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            Địa chỉ Gmail{" "}
            <span className="text-neutral-400 font-normal text-xs">(không bắt buộc)</span>
          </span>
        </label>
        <input
          id="reg-email"
          type="email"
          placeholder="example@gmail.com"
          autoComplete="email"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:ring-2 ${styles.focus} ${
            errors.email ? "border-red-400 focus:ring-red-300" : "border-neutral-200"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Nội dung tin nhắn */}
      <div>
        <label htmlFor="reg-message" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
            Nội dung tin nhắn{" "}
            <span className="text-neutral-400 font-normal text-xs">(không bắt buộc)</span>
          </span>
        </label>
        <textarea
          id="reg-message"
          rows={4}
          placeholder="Bạn muốn hỏi gì? Ví dụ: lịch học, học phí, thời gian thi bằng..."
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:ring-2 resize-none ${styles.focus} ${
            errors.message ? "border-red-400 focus:ring-red-300" : "border-neutral-200"
          }`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Server Error */}
      {submitState === "error" && serverError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <button
        id="reg-submit-btn"
        type="submit"
        disabled={submitState === "loading"}
        className={`w-full flex items-center justify-center gap-2.5 ${styles.btn} text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none`}
      >
        {submitState === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Gửi đăng ký tư vấn
          </>
        )}
      </button>

      <p className="text-center text-xs text-neutral-400">
        Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi sẽ liên hệ trong 24 giờ.
      </p>
    </form>
  );
}
