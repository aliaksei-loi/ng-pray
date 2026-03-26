"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUp } from "@/app/(auth)/sign-up/actions";
import Link from "next/link";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";

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
    <div className="w-full max-w-md apple-glass rounded-2xl p-8 md:p-12 transition-all duration-500">
      <div className="text-center mb-10">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-white mb-3">
          Регистрация
        </h1>
        <p className="text-on-surface-variant/60 text-sm font-body leading-relaxed">
          Начните отслеживать время молитвы
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
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
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-orange-400 transition-colors" size={18} />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              className="w-full bg-on-surface/5 border border-on-surface/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-on-surface/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-body text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
          >
            Электронная почта
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-orange-400 transition-colors" size={18} />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              className="w-full bg-on-surface/5 border border-on-surface/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-on-surface/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-body text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
            >
              Пароль
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-orange-400 transition-colors" size={18} />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-on-surface/5 border border-on-surface/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-on-surface/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-body text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="font-label text-[10px] tracking-[0.2em] uppercase text-orange-400/80 font-semibold px-1"
            >
              Подтвердите
            </label>
            <div className="relative group">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-orange-400 transition-colors" size={18} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-on-surface/5 border border-on-surface/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-on-surface/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-body text-sm"
              />
            </div>
          </div>
        </div>
        <div className="pt-6">
          <button
            type="submit"
            className="glow-button liquid-gloss w-full text-[#2f1500] font-bold py-4 rounded-xl transition-all duration-300 transform active:scale-95 shadow-xl shadow-orange-900/20 text-sm"
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </div>
      </form>
      <div className="mt-10 pt-8 border-t border-on-surface/5 text-center">
        <p className="text-on-surface/40 font-body text-xs">
          Уже есть аккаунт?{" "}
          <Link
            href="/sign-in"
            className="text-orange-400 hover:text-orange-300 hover:underline underline-offset-4 transition-all ml-1 font-semibold"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
