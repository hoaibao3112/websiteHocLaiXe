"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface PublishToggleProps {
  id: string;
  isPublished: boolean;
  onSuccess?: () => void;
}

export function PublishToggle({
  id,
  isPublished: initialStatus,
  onSuccess,
}: PublishToggleProps) {
  const [isPublished, setIsPublished] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      const supabase = createClient();
      const nextStatus = !isPublished;
      const { error } = await (supabase.from("news") as any)
        .update({
          is_published: nextStatus,
          published_at: nextStatus ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;

      setIsPublished(nextStatus);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
      alert("Không thể cập nhật trạng thái hiển thị.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="inline-flex items-center gap-1 active:scale-95 transition-transform"
      title="Click để thay đổi trạng thái"
    >
      {loading ? (
        <Badge variant="secondary" className="flex items-center gap-1 py-1">
          <Loader2 className="w-3 h-3 animate-spin text-neutral-500" />
          <span>Đang lưu</span>
        </Badge>
      ) : isPublished ? (
        <Badge variant="success" className="cursor-pointer hover:bg-emerald-600 py-1 select-none">
          Công khai
        </Badge>
      ) : (
        <Badge variant="secondary" className="cursor-pointer hover:bg-neutral-200 py-1 select-none text-neutral-600">
          Bản nháp
        </Badge>
      )}
    </button>
  );
}
