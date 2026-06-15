"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentLoginSchema, type StudentLoginInput } from "@/lib/validations/auth.schema";
import { User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function StudentLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginInput>({
    resolver: zodResolver(studentLoginSchema),
  });

  const onSubmit = async (data: StudentLoginInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/student-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-50/50">
      {/* Top Header Logo */}
      <header className="py-4 border-b border-neutral-100 bg-white flex justify-center items-center shadow-xs">
        <Link href="/" className="flex items-center gap-3 group">
          <svg
            className="w-9 h-9 text-brand-600"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="login-logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path d="M50 12L15 30L50 48L85 30L50 12Z" fill="url(#login-logo-gold)" />
            <path d="M25 35.5V55C25 55 35 63 50 63C65 63 75 55 75 55V35.5L50 48.5L25 35.5Z" fill="url(#login-logo-gold)" opacity="0.9" />
            <path d="M30 68C22 72 24 85 50 85C76 85 78 72 70 68" stroke="url(#login-logo-gold)" strokeWidth="4" />
          </svg>
          <div className="font-display text-brand-700 font-bold text-lg leading-none">
            Chiến Thắng
          </div>
        </Link>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] bg-white rounded-xl border border-neutral-200/60 p-8 shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-display text-[#1e3a8a]">
              Đăng Nhập
            </h1>
            <p className="text-neutral-400 text-xs mt-1.5 font-medium">
              Hệ thống quản lý học viên trực tuyến
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Username/Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="student_code" className="block text-xs font-semibold text-neutral-700">
                Email hoặc Tên đăng nhập
              </label>
              <div className="relative">
                <input
                  id="student_code"
                  type="text"
                  placeholder="example@gmail.com"
                  {...register("student_code")}
                  className="w-full pl-10 pr-4 py-2.5 rounded border border-neutral-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                />
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
              </div>
              {errors.student_code && (
                <p className="text-[10px] text-red-500">{errors.student_code.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold text-neutral-700">
                  Mật khẩu
                </label>
                <Link href="#" className="text-xs text-amber-700 hover:text-amber-800 font-semibold">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full pl-10 pr-10 py-2.5 rounded border border-neutral-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Checkbox */}
            <div className="flex items-center gap-2 py-1">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="remember" className="text-xs text-neutral-500 select-none">
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#92400e] active:bg-[#78350f] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-md transition-all shadow-md text-sm"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập →"}
            </button>

          </form>

          {/* Yellow Hint box */}
          <div className="mt-5 p-4 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
            <span className="font-bold">Cổng thông tin học viên:</span> Vui lòng sử dụng mã học viên được cấp khi nộp hồ sơ để truy cập lịch học và kết quả thi.
          </div>

          <div className="mt-6 text-center text-xs">
            <span className="text-neutral-400">Chưa có tài khoản? </span>
            <Link href="/ho-so-dang-ky" className="text-amber-700 hover:text-amber-800 font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </div>

        </div>
      </main>

      {/* Sub-footer & Copyright footer */}
      <footer className="w-full">
        {/* Support navigation */}
        <div className="py-4 border-t border-neutral-100 flex justify-center gap-6 text-xs text-neutral-500 bg-white">
          <Link href="#" className="hover:text-amber-700 transition-colors">Hướng dẫn sử dụng</Link>
          <span className="text-neutral-200">|</span>
          <Link href="#" className="hover:text-amber-700 transition-colors">Điều khoản bảo mật</Link>
          <span className="text-neutral-200">|</span>
          <Link href="#" className="hover:text-amber-700 transition-colors">Hỗ trợ kỹ thuật</Link>
        </div>

        {/* Corporate copyright */}
        <div className="bg-[#1f2937] text-neutral-400 py-4 px-4 text-center text-xs border-t border-neutral-800">
          © 2024 Trung Tâm Đào Tạo Lái Xe Chiến Thắng. Uy Tín - Tận Tâm. | Hotline: <span className="text-white font-semibold">0902.868.928</span>
        </div>
      </footer>
    </div>
  );
}
