import { z } from "zod";

export const signUpSchema = z.object({
    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(3, "Tên người dùng phải có ít nhất 3 ký tự!")
        .max(20, "Tên người dùng không được vượt quá 20 ký tự!")
        .regex(/^[a-z0-9_]+$/, "Tên người dùng chỉ được chứa chữ thường, số và dấu gạch dưới!"),

    email: z.string().trim().toLowerCase().email("Email không hợp lệ!").max(255, "Email không được quá dài!"),

    password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự!")
        .max(100, "Mật khẩu không được quá dài!")
        .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa!")
        .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường!")
        .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số!")
        .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!"),

    firstName: z.string().trim().min(1, "Họ không được để trống!").max(50, "Họ không được quá dài!"),

    lastName: z.string().trim().min(1, "Tên không được để trống!").max(50, "Tên không được quá dài!"),
});
