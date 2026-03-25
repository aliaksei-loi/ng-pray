"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { PrayerTimer } from "@/components/timer/prayer-timer";
import { YouTubePlayer } from "@/components/player/youtube-player";

const navItems = [
  { href: "/dashboard", label: "Главная" },
  { href: "/history", label: "История" },
];

export function AppHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="sticky top-0 z-50 animate-fade-in bg-[#131313]/50 backdrop-blur-3xl border-b border-[#353534]/40">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              🙏
            </span>
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tighter text-gradient-orange">
              НГ Молитва
            </span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-orange-400 border-b-2 border-orange-500 pb-1"
                    : "text-gray-400 hover:text-orange-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-white/50 hover:text-white hover:bg-white/5 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="w-80 overflow-y-auto border-l border-[#353534]/40 bg-[#0e0e0e]/95 backdrop-blur-2xl"
            >
              <div className="mt-6 space-y-4">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-orange-400 border-l-2 border-orange-500 pl-2.5"
                          : "text-gray-400 hover:text-orange-300"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <PrayerTimer />
                <YouTubePlayer />
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-9 w-9 rounded-full p-0 transition-all duration-300 hover:scale-105"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-[#ffb77d]/20 transition-all hover:ring-[#ffb77d]/40">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-xs font-bold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuItem disabled className="text-xs text-white/50">
                {session?.user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/8" />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                className="gap-2 text-white/70 focus:bg-white/8 focus:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
