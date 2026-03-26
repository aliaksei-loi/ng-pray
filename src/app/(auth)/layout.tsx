"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, Menu } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";
  const isSignIn = pathname === "/sign-in";

  return (
    <>
      {/* Background orbs */}
      <div className="bg-orb top-[-200px] left-[-200px] bg-orange-600/30" />
      <div className="bg-orb bottom-[-200px] right-[-200px] bg-orange-900/40" />
      <div className="bg-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500/10" />

      {/* TopNavBar Component */}
      <header className="fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 py-4 w-full bg-[#131313]/50 backdrop-blur-3xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-manrope"
          >
            НГ Молитва
          </Link>
          <div className="hidden md:flex gap-8 items-center font-manrope tracking-tight font-semibold">
            <Link
              href="/"
              className="text-gray-400 hover:text-orange-300 transition-colors duration-300 text-sm"
            >
              Главная
            </Link>
            <Link
              href="/sign-up"
              className={
                isSignUp
                  ? "text-orange-400 border-orange-500 border-b-2 pb-1 text-sm"
                  : "text-gray-400 hover:text-orange-300 transition-colors duration-300 text-sm"
              }
            >
              Регистрация
            </Link>
            <Link
              href="/sign-in"
              className={
                isSignIn
                  ? "text-orange-400 border-orange-500 border-b-2 pb-1 text-sm"
                  : "text-gray-400 hover:text-orange-300 transition-colors duration-300 text-sm"
              }
            >
              Вход
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-400 cursor-pointer hover:text-orange-300 transition-colors" size={20} />
            <Settings className="text-gray-400 cursor-pointer hover:text-orange-300 transition-colors" size={20} />
            <button className="md:hidden text-orange-500">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Main content area */}
      <main className="w-full max-w-7xl px-6 py-24 flex flex-col items-center justify-center relative z-10 mx-auto min-h-screen">
        {children}
        <div className="mt-16 flex items-center gap-6 opacity-30">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          <div className="text-[9px] font-label tracking-[0.4em] uppercase text-orange-200">
            Духовная точность
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-12 mt-auto bg-[#131313]">
        <div className="flex flex-col items-center gap-4 w-full border-t border-orange-900/10 pt-8 max-w-7xl mx-auto px-6">
          <div className="text-orange-500 font-medium font-manrope text-xs uppercase tracking-widest">
            НГ Молитва
          </div>
          <div className="text-gray-600 font-manrope text-xs uppercase tracking-widest text-center">
            &copy; 2025 НГ Молитва. Все права защищены.
          </div>
          <div className="flex gap-8">
            <a
              className="text-gray-600 hover:text-orange-400 transition-colors font-manrope text-xs uppercase tracking-widest opacity-80 hover:opacity-100"
              href="#"
            >
              Политика конфиденциальности
            </a>
            <a
              className="text-gray-600 hover:text-orange-400 transition-colors font-manrope text-xs uppercase tracking-widest opacity-80 hover:opacity-100"
              href="#"
            >
              Условия использования
            </a>
            <a
              className="text-gray-600 hover:text-orange-400 transition-colors font-manrope text-xs uppercase tracking-widest opacity-80 hover:opacity-100"
              href="#"
            >
              Поддержка
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
