import { z } from "zod";

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(255, "Tiêu đề không quá 255 ký tự"),
  slug: z
    .string()
    .min(3, "Slug phải có ít nhất 3 ký tự")
    .max(255)
    .regex(/^[a-z0-9-]+$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  excerpt: z.string().max(500, "Tóm tắt không quá 500 ký tự").optional(),
  content: z.string().min(10, "Nội dung bài viết quá ngắn"),
  cover_image: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true;
        return (
          val.startsWith("/") ||
          val.startsWith("http://") ||
          val.startsWith("https://") ||
          val.startsWith("data:image/")
        );
      },
      {
        message: "URL ảnh không hợp lệ",
      }
    ),
  images: z.array(z.string()).optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  is_published: z.boolean().default(false),
  meta_title: z.string().max(60, "Meta title không quá 60 ký tự").optional().nullable(),
  meta_description: z
    .string()
    .max(160, "Meta description không quá 160 ký tự")
    .optional()
    .nullable(),
});

export const updateNewsSchema = createNewsSchema.partial();

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
