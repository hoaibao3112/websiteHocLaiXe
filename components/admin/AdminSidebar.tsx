"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Newspaper, LogOut, ShieldAlert, GraduationCap, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { UserProfile } from "@/types/database.types";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile(data);
        }
      }
    }
    loadProfile();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/dang-nhap");
    router.refresh();
  };

  const navItems = [
    {
      label: "Tổng quan",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Quản lý khóa học",
      href: "/admin/khoa-hoc",
      icon: GraduationCap,
    },
    {
      label: "Khách hàng đăng ký",
      href: "/admin/khach-hang",
      icon: Users,
    },
    {
      label: "Quản lý bài viết",
      href: "/admin/tin-tuc",
      icon: Newspaper,
    },
  ];

  return (
    <aside className="w-64 bg-white text-neutral-600 flex flex-col h-screen fixed left-0 top-0 border-r border-neutral-200/80 z-30">
      {/* Brand */}
      <div className="h-16 px-6 border-b border-neutral-100 flex items-center justify-between bg-white">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo-win.png"
            alt="Logo Chiến Thắng"
            width={130}
            height={40}
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Profile info */}
      {profile && (
        <div className="p-6 border-b border-neutral-100 bg-emerald-50/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-neutral-800 truncate leading-tight">
              {profile.full_name}
            </h4>
            <span className="text-[11px] font-medium text-emerald-700 capitalize bg-emerald-100/60 px-2 py-0.5 rounded-full mt-1 inline-block">
              {profile.role}
            </span>
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-xl border-l-4 transition-all duration-200 group",
                isActive
                  ? "bg-emerald-50 text-emerald-800 border-emerald-500 font-semibold"
                  : "border-transparent text-neutral-600 hover:bg-amber-50/40 hover:text-amber-800 hover:border-amber-400"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  isActive
                    ? "text-emerald-600"
                    : "text-neutral-400 group-hover:text-amber-600"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-neutral-100 bg-white">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer group"
        >
          <LogOut className="w-5 h-5 text-neutral-400 group-hover:text-red-500 transition-colors" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
