"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MultipleImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  bucketName?: string;
}

export function MultipleImageUpload({
  value = [],
  onChange,
  bucketName = "news",
}: MultipleImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const newUrls: string[] = [...value];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Limit to 5MB
        if (file.size > 5 * 1024 * 1024) {
          setError(`File '${file.name}' vượt quá dung lượng 5MB và đã bị bỏ qua.`);
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload file to Supabase storage
        const { data, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        newUrls.push(publicUrl);
      }

      onChange(newUrls);
    } catch (err: any) {
      console.error("Storage upload error:", err);
      setError("Không thể tải ảnh lên. Lỗi: " + (err.message || err));
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedUrls = value.filter((_, idx) => idx !== indexToRemove);
    onChange(updatedUrls);
  };

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-2">
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Grid of uploaded images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {value.map((url, index) => (
          <div 
            key={`${url}-${index}`} 
            className="relative aspect-video rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 group shadow-sm"
          >
            <Image
              src={url}
              alt={`Uploaded gallery item ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 200px"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md opacity-90 hover:opacity-100 active:scale-95 transition-all"
              title="Xóa ảnh"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* Upload Button Box */}
        <div
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-neutral-200 hover:border-brand-500 rounded-xl aspect-video flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-brand-50/5 transition-all duration-200 ${
            loading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            multiple
            className="hidden"
            disabled={loading}
          />
          {loading ? (
            <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
          ) : (
            <div className="flex flex-col items-center text-center p-2">
              <Plus className="w-5 h-5 text-neutral-400 group-hover:text-brand-500 mb-1" />
              <span className="text-xs font-semibold text-neutral-600 block">Thêm ảnh album</span>
              <span className="text-[10px] text-neutral-450 mt-0.5">Cho phép chọn nhiều file</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
