"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTimerContext } from "@/providers/timer-provider";
import { useSidebar } from "@/providers/sidebar-provider";
import { toast } from "sonner";
import { playStartSound, playStopSound } from "@/lib/sounds";
import {
  LayoutDashboard,
  History,
  Sparkles,
  HelpCircle,
  LogOut,
  Square,
  User,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Панель", icon: LayoutDashboard },
  { href: "/history", label: "История", icon: History },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={
        isActive
          ? `flex items-center ${collapsed ? "justify-center" : "gap-4"} bg-gradient-to-r from-orange-500/20 to-transparent text-orange-400 border-l-4 border-orange-500 ${collapsed ? "px-0 py-3 mx-2" : "px-6 py-3 translate-x-1"} duration-300`
          : `flex items-center ${collapsed ? "justify-center" : "gap-4"} text-gray-500 hover:text-gray-300 hover:bg-[#353534]/30 ${collapsed ? "px-0 py-3 mx-2" : "px-6 py-3"} transition-all duration-300`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && (
        <span className={`font-manrope text-sm${isActive ? " font-semibold" : ""}`}>
          {label}
        </span>
      )}
    </Link>
  );
}

function StartPrayerButton({ collapsed }: { collapsed?: boolean }) {
  const { isRunning, start, stop } = useTimerContext();

  function handleClick() {
    if (isRunning) {
      stop();
      playStopSound();
    } else {
      start();
      playStartSound();
      toast("🙏 Молитва начата", {
        description: "Таймер запущен. Молитесь с миром в сердце.",
      });
    }
  }

  if (collapsed) {
    return (
      <button
        onClick={handleClick}
        title={isRunning ? "Остановить" : "Начать молитву"}
        className="w-10 h-10 mx-auto amber-glow rounded-xl text-on-primary font-bold flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isRunning ? <Square className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 amber-glow rounded-xl text-on-primary font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
    >
      {isRunning ? (
        <>
          <Square className="h-4 w-4" />
          <span>Остановить</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          <span>Начать молитву</span>
        </>
      )}
    </button>
  );
}

/** Desktop sidebar (hidden on mobile) */
function DesktopSidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={`hidden md:flex h-screen fixed left-0 top-0 z-40 bg-[#0E0E0E]/80 backdrop-blur-2xl flex-col py-6 shadow-[30px_0_60px_rgba(255,140,0,0.04)] transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand */}
      <div className={`${collapsed ? "px-3" : "px-6"} mb-10 flex items-center justify-between`}>
        {!collapsed && (
          <div>
            <h1 className="font-manrope text-xl font-bold text-orange-500 uppercase tracking-wider">
              НГ Молитва
            </h1>
            <p className="text-[10px] text-gray-500 font-label mt-1 uppercase tracking-widest">
              Духовная точность
            </p>
          </div>
        )}
        <button
          onClick={toggle}
          className={`flex items-center justify-center h-8 w-8 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 ${
            collapsed ? "mx-auto" : ""
          }`}
          title={collapsed ? "Развернуть" : "Свернуть"}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href + item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className={`${collapsed ? "px-3" : "px-6"} mt-auto space-y-4`}>
        <StartPrayerButton collapsed={collapsed} />

        <div className="pt-6 border-t border-white/5 space-y-1">
          {collapsed ? (
            <>
              <Link
                href="#"
                title="Помощь"
                className="flex items-center justify-center text-gray-500 hover:text-gray-300 py-2 transition-all"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                title="Выйти"
                className="flex items-center justify-center text-gray-500 hover:text-gray-300 py-2 transition-all w-full"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="#"
                className="flex items-center gap-4 text-gray-500 hover:text-gray-300 px-2 py-2 transition-all"
              >
                <HelpCircle className="h-5 w-5" />
                <span className="font-manrope text-xs">Помощь</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                className="flex items-center gap-4 text-gray-500 hover:text-gray-300 px-2 py-2 transition-all w-full"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-manrope text-xs">Выйти</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

/** Mobile top bar + bottom tab bar (visible on < md) */
function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileOpen]);

  const tabs = [
    { href: "/dashboard", label: "Панель", icon: LayoutDashboard },
    { href: "/history", label: "История", icon: History },
  ] as const;

  return (
    <>
      {/* Fixed top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-14 px-4 bg-[#0E0E0E]/90 backdrop-blur-2xl border-b border-white/5">
        <h1 className="font-manrope text-lg font-bold text-orange-500 uppercase tracking-wider">
          НГ Молитва
        </h1>
      </div>

      {/* Fixed bottom tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E0E0E]/90 backdrop-blur-2xl border-t border-white/5 pb-6">
        <nav className="flex items-center justify-around pt-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors duration-200 ${
                  isActive ? "text-orange-400" : "text-gray-600"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-[10px] font-manrope uppercase tracking-wider">
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* Profile tab with dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors duration-200 ${
                profileOpen ? "text-orange-400" : "text-gray-600"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="text-[10px] font-manrope uppercase tracking-wider">
                Профиль
              </span>
            </button>

            {/* Profile dropdown (opens upward) */}
            {profileOpen && (
              <div className="absolute bottom-full right-0 mb-3 w-56 rounded-xl bg-[#1A1A1A]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* User email */}
                {session?.user?.email && (
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-[11px] text-gray-400 font-manrope truncate">
                      {session.user.email}
                    </p>
                  </div>
                )}

                <div className="py-1">
                  <Link
                    href="#"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="font-manrope text-xs">Помощь</span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/sign-in" })}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-manrope text-xs">Выйти</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export function SidebarNav() {
  return (
    <>
      <DesktopSidebar />
      <MobileNav />
    </>
  );
}
