"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Newspaper, LogOut, ShieldAlert } from "lucide-react";
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
      label: "Quản lý bài viết",
      href: "/admin/tin-tuc",
      icon: Newspaper,
    },
  ];

  return (
    <aside className="w-64 bg-neutral-900 text-neutral-300 flex flex-col h-screen fixed left-0 top-0 border-r border-neutral-800 z-30">
      {/* Brand */}
      <div className="h-16 px-6 border-b border-neutral-800 flex items-center justify-between">
        <span className="font-display font-bold text-white text-lg tracking-wide flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
          CMS Chiến Thắng
        </span>
      </div>

      {/* Profile info */}
      {profile && (
        <div className="p-6 border-b border-neutral-850 bg-neutral-950/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-base">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate leading-tight">
              {profile.full_name}
            </h4>
            <span className="text-[11px] font-medium text-brand-500 capitalize bg-brand-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
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
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/10"
                  : "hover:bg-neutral-800 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5 text-neutral-500 group-hover:text-red-400" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
