"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucketName?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucketName = "news",
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Dung lượng ảnh không được vượt quá 5MB");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
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

      onChange(publicUrl);
    } catch (err) {
      console.error("Storage upload error:", err);
      setError("Không thể tải ảnh lên. Hãy đảm bảo bạn đã tạo bucket '" + bucketName + "' ở chế độ công khai.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-2">
          <span>⚠️</span> {error}
        </p>
      )}

      {value ? (
        <div className="relative aspect-video w-full max-w-md rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 group">
          <Image
            src={value}
            alt="Uploaded cover"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-90 hover:opacity-100 active:scale-95 transition-all"
            title="Xóa ảnh"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-200 hover:border-brand-500 rounded-2xl p-8 text-center bg-white cursor-pointer hover:bg-brand-50/10 transition-all duration-200 group max-w-md flex flex-col items-center justify-center min-h-[180px]"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
            disabled={loading}
          />
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
              <span className="text-sm text-neutral-500 font-medium">Đang tải ảnh lên...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors mb-4">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-700 block mb-1">
                Tải ảnh bìa lên
              </span>
              <span className="text-xs text-neutral-400">
                Chấp nhận PNG, JPG, WEBP lên đến 5MB
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
