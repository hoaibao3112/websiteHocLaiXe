"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Lock } from "lucide-react";

import type { UserProfile } from "@/types/database.types";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "forbidden"
      ? "Tài khoản của bạn không có quyền truy cập trang quản trị."
      : null
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError, data: authData } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setError("Tài khoản hoặc mật khẩu không chính xác.");
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Fetch role to ensure it is admin/editor/staff
        const { data: profile } = (await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single()) as { data: UserProfile | null };

        const adminRoles = ["admin", "editor", "staff"];
        if (!profile || !adminRoles.includes(profile.role)) {
          // Sign out immediately if not authorized
          await supabase.auth.signOut();
          setError("Tài khoản của bạn không có quyền truy cập trang quản trị.");
          setLoading(false);
          return;
        }

        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md border-neutral-100 shadow-xl">
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold font-display text-neutral-900">
            Quản Trị Chiến Thắng
          </CardTitle>
          <CardDescription>
            Đăng nhập tài khoản quản lý để bắt đầu làm việc
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@chienthang.edu.vn"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Mật khẩu</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11 text-base mt-2" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng nhập hệ thống"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-50"><p className="text-sm text-neutral-500 font-medium">Đang tải...</p></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
