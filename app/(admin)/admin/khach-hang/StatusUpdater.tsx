"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type ContactStatus = "new" | "contacted" | "closed";

interface StatusUpdaterProps {
  contactId: string;
  currentStatus: string;
}

const STATUS_OPTIONS: { value: ContactStatus; label: string; style: string }[] = [
  {
    value: "new",
    label: "Mới",
    style: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200",
  },
  {
    value: "contacted",
    label: "Đã liên hệ",
    style: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  },
  {
    value: "closed",
    label: "Đã đóng",
    style: "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200",
  },
];

const ACTIVE_STYLES: Record<ContactStatus, string> = {
  new: "bg-amber-500 text-white border-amber-500",
  contacted: "bg-blue-500 text-white border-blue-500",
  closed: "bg-emerald-500 text-white border-emerald-500",
};

export function StatusUpdater({ contactId, currentStatus }: StatusUpdaterProps) {
  const [status, setStatus] = useState<ContactStatus>(
    (currentStatus as ContactStatus) ?? "new"
  );
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatus: ContactStatus) => {
    if (newStatus === status || isPending) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/contacts?id=${contactId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
          setStatus(newStatus);
        } else {
          console.error("[StatusUpdater] Failed to update status");
        }
      } catch (err) {
        console.error("[StatusUpdater] Error:", err);
      }
    });
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          id={`status-${contactId}-${opt.value}`}
          type="button"
          disabled={isPending}
          onClick={() => handleChange(opt.value)}
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer select-none",
            status === opt.value
              ? ACTIVE_STYLES[opt.value]
              : opt.style,
            isPending && "opacity-50 cursor-not-allowed"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
