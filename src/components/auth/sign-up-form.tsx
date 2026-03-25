"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUp } from "@/app/(auth)/sign-up/actions";
import Link from "next/link";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const result = await signUp(data);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResult?.error) {
      router.push("/sign-in");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="apple-glass rounded-2xl p-8 md:p-12">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Регистрация
        </h1>
        <p className="mt-3 text-[#ddc1ae]/60 text-sm leading-relaxed">
          Создайте аккаунт для отслеживания молитв
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="animate-scale-in rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
          >
            Имя
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ваше имя"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
          >
            Электронная почта
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
          >
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Минимум 6 символов"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
          >
            Подтвердите пароль
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm"
          />
        </div>
        <button
          type="submit"
          className="amber-glow w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95"
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-xs">
            Уже есть аккаунт?{" "}
            <Link
              href="/sign-in"
              className="text-orange-400 hover:text-orange-300 hover:underline underline-offset-4 font-semibold"
            >
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
