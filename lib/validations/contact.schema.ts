import { z } from "zod";

export const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, "Vui lòng nhập họ tên đầy đủ")
    .max(100, "Tên không quá 100 ký tự"),
  phone: z
    .string()
    .regex(
      /^(0|\+84)[0-9]{8,9}$/,
      "Số điện thoại không hợp lệ (VD: 0901234567)"
    ),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  subject: z.string().max(200).optional(),
  message: z.string().max(2000, "Nội dung không quá 2000 ký tự").optional(),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"], {
    error: "Trạng thái không hợp lệ",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type UpdateContactStatusInput = z.infer<typeof updateContactStatusSchema>;
