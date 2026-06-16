import { z } from "zod";

export const createCourseSchema = z.object({
  name: z
    .string()
    .min(3, "Tên khóa học phải có ít nhất 3 ký tự")
    .max(255, "Tên khóa học không quá 255 ký tự"),
  class_code: z
    .string()
    .min(1, "Mã lớp/hạng bằng không được bỏ trống")
    .max(50, "Mã lớp không quá 50 ký tự"),
  description: z.string().max(1000, "Mô tả không quá 1000 ký tự").optional().nullable(),
  original_price: z
    .number()
    .min(0, "Học phí gốc không được âm")
    .optional()
    .nullable(),
  sale_price: z
    .number()
    .min(0, "Học phí thực tế không được âm"),
  image_url: z
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
  badge: z.string().max(50, "Nhãn không quá 50 ký tự").optional().nullable(),
  is_active: z.boolean().default(true),
  display_order: z
    .number()
    .int("Thứ tự hiển thị phải là số nguyên")
    .min(1, "Thứ tự hiển thị tối thiểu là 1")
    .default(1),
  features: z.array(z.string()).optional().nullable(),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
