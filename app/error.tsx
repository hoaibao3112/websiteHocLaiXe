"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Client Crash caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="text-red-500 w-8 h-8 animate-bounce" />
      </div>
      <h2 className="text-xl font-bold mb-2">Đã xảy ra sự cố không mong muốn</h2>
      <p className="text-neutral-500 text-sm max-w-md mb-6 leading-relaxed">
        Hệ thống đang gặp gián đoạn tạm thời. Chúng tôi đã ghi nhận sự cố này và đang tiến hành khắc phục ngay lập tức.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="px-6">
          Thử tải lại trang
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")} className="px-6">
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
