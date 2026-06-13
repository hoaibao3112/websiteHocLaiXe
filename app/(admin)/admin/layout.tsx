"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/dang-nhap";

  if (isLoginPage) {
    return <div className="bg-neutral-50 min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content pane */}
      <div className="flex-1 pl-64 min-h-screen flex flex-col">
        <header className="h-16 border-b border-neutral-100 bg-white sticky top-0 z-10 flex items-center px-8 justify-between">
          <h2 className="text-sm font-semibold text-neutral-400">
            Hệ thống quản lý nội dung website
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">Phiên bản 1.0.0</span>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
