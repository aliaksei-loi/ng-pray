"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Неверный email или пароль");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="apple-glass rounded-2xl p-8 md:p-12">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Вход
        </h1>
        <p className="mt-3 text-[#ddc1ae]/60 text-sm leading-relaxed">
          Войдите в свой аккаунт
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
            placeholder="Ваш пароль"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm"
          />
        </div>
        <button
          type="submit"
          className="amber-glow w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95"
          disabled={loading}
        >
          {loading ? "Вход..." : "Войти"}
        </button>
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-xs">
            Нет аккаунта?{" "}
            <Link
              href="/sign-up"
              className="text-orange-400 hover:text-orange-300 hover:underline underline-offset-4 font-semibold"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
