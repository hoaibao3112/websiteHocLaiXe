"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-100">
        <HelpCircle className="text-brand-600 w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Không tìm thấy trang yêu cầu</h2>
      <p className="text-neutral-500 text-sm max-w-md mb-6 leading-relaxed">
        Đường liên kết bạn vừa truy cập có thể đã hết hạn, bị thay đổi hoặc không tồn tại.
      </p>
      <Link href="/">
        <Button className="px-8 shadow-md">
          Quay lại trang chủ
        </Button>
      </Link>
    </div>
  );
}
