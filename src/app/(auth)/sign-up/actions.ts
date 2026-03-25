"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validators";

export async function signUp(formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const parsed = signUpSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Пользователь с таким email уже существует" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return { success: true };
}
