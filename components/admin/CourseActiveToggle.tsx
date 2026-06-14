"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface CourseActiveToggleProps {
  id: string;
  isActive: boolean;
  onSuccess?: () => void;
}

export function CourseActiveToggle({
  id,
  isActive: initialStatus,
  onSuccess,
}: CourseActiveToggleProps) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      const supabase = createClient();
      const nextStatus = !isActive;
      const { error } = await (supabase.from("courses") as any)
        .update({
          is_active: nextStatus,
        })
        .eq("id", id);

      if (error) throw error;

      setIsActive(nextStatus);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to toggle course active status:", err);
      alert("Không thể cập nhật trạng thái hoạt động.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="inline-flex items-center gap-1 active:scale-95 transition-transform"
      title="Click để thay đổi trạng thái hoạt động"
    >
      {loading ? (
        <Badge variant="secondary" className="flex items-center gap-1 py-1">
          <Loader2 className="w-3 h-3 animate-spin text-neutral-500" />
          <span>Đang lưu</span>
        </Badge>
      ) : isActive ? (
        <Badge variant="success" className="cursor-pointer hover:bg-emerald-600 py-1 select-none">
          Hoạt động
        </Badge>
      ) : (
        <Badge variant="secondary" className="cursor-pointer hover:bg-neutral-200 py-1 select-none text-neutral-600">
          Ẩn
        </Badge>
      )}
    </button>
  );
}
