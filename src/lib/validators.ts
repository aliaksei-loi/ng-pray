import { z } from "zod/v4";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.email("Неверный формат электронной почты"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Неверный формат электронной почты"),
  password: z.string().min(1, "Введите пароль"),
});

export const createPrayerSessionSchema = z.object({
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  duration: z.number().int().positive(),
  note: z.string().optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CreatePrayerSessionInput = z.infer<
  typeof createPrayerSessionSchema
>;
