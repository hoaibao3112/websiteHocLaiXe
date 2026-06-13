import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});

export const studentLoginSchema = z.object({
  student_code: z
    .string()
    .min(3, "Mã học viên phải từ 3 ký tự trở lên")
    .max(20, "Mã học viên không quá 20 ký tự")
    .toUpperCase(),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type StudentLoginInput = z.infer<typeof studentLoginSchema>;
