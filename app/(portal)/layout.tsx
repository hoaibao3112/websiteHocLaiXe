"use client";

import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, GraduationCap, Calendar, Trophy, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Student } from "@/types/database.types";

import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const isLoginPage = pathname === "/dang-nhap";

  useEffect(() => {
    if (isLoginPage) return;

    async function loadStudent() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/dang-nhap");
        return;
      }

      const { data } = await supabase
        .from("students")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setStudent(data);
      }
    }
    loadStudent();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/dang-nhap");
    router.refresh();
  };

  if (isLoginPage) {
    return (
      <div className="flex flex-col min-h-screen bg-neutral-50/50">
        <Header />
        <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-neutral-100 sticky top-0 z-20 shadow-sm flex items-center px-4 sm:px-8 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-display font-bold text-neutral-900 text-lg flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-500" />
            <span>Chiến Thắng Portal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                pathname === "/dashboard"
                  ? "bg-brand-50 text-brand-600"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <User className="w-4 h-4" />
              Thông tin học viên
            </Link>
            <Link
              href="/dashboard/lich-thi"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                pathname.startsWith("/dashboard/lich-thi")
                  ? "bg-brand-50 text-brand-600"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Lịch thi & Kết quả
            </Link>
          </nav>
        </div>

        {/* User menu / Logout */}
        <div className="flex items-center gap-4">
          {student && (
            <span className="hidden sm:inline-block text-sm font-semibold text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-lg">
              {student.full_name} ({student.student_code})
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-neutral-500 hover:text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline-block ml-1.5">Đăng xuất</span>
          </Button>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* Mobile menu bar */}
        <div className="md:hidden flex gap-2 mb-6 bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm">
          <Link
            href="/dashboard"
            className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              pathname === "/dashboard"
                ? "bg-brand-500 text-white"
                : "text-neutral-500 hover:bg-neutral-50"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Thông tin
          </Link>
          <Link
            href="/dashboard/lich-thi"
            className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              pathname.startsWith("/dashboard/lich-thi")
                ? "bg-brand-500 text-white"
                : "text-neutral-500 hover:bg-neutral-50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Lịch thi & Điểm
          </Link>
        </div>

        {children}
      </main>
    </div>
  );
}
