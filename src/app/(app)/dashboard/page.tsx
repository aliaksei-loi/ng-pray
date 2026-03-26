"use client";

import { useRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTimerContext } from "@/providers/timer-provider";
import { SessionsByDate } from "@/components/sessions/sessions-by-date";
import { PrayerTimer } from "@/components/timer/prayer-timer";
import { YouTubePlayer } from "@/components/player/youtube-player";
import { Clock, Calendar, Zap, TrendingUp } from "lucide-react";
import { formatDuration } from "@/lib/format";
import Link from "next/link";

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface Stats {
  totalDuration: number;
  totalSessions: number;
  todayDuration: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const { isRunning } = useTimerContext();
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState<Stats>({
    totalDuration: 0,
    totalSessions: 0,
    todayDuration: 0,
  });

  const prevRunning = usePrevious(isRunning);

  useEffect(() => {
    if (prevRunning === true && isRunning === false) {
      const t = setTimeout(() => setRefreshKey((k) => k + 1), 500);
      return () => clearTimeout(t);
    }
  }, [isRunning, prevRunning]);

  const firstName = session?.user?.name?.split(" ")[0] || "";

  return (
    <>
      {/* ===== Mobile Header (md and below) ===== */}
      <header className="mb-6 md:hidden">
        <p className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant/50 mb-1">
          С возвращением
        </p>
        <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
          Добро пожаловать{firstName ? `, ${firstName}` : ""}
        </h2>
      </header>

      {/* ===== Desktop Header (md and up) ===== */}
      <header className="mb-12 hidden md:block">
        <h2 className="font-headline text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#ffb77d] to-[#ff8c00] bg-clip-text text-transparent">
          Добро пожаловать{firstName ? `, ${firstName}` : ""}
        </h2>
        <p className="text-on-surface-variant/60 mt-2 max-w-xl font-medium">
          Пусть каждый момент молитвы принесёт ясность и свет в ваш день.
        </p>
      </header>

      {/* ===== Stat Cards — Mobile: horizontal compact row ===== */}
      <div className="flex gap-2 md:hidden mb-4">
        {[
          { icon: Clock, value: stats.totalDuration > 0 ? formatDuration(stats.totalDuration) : "—", label: "Всего", color: "text-primary bg-primary/10" },
          { icon: Calendar, value: stats.totalSessions > 0 ? String(stats.totalSessions) : "—", label: "Сессий", color: "text-tertiary bg-tertiary/10" },
          { icon: Zap, value: stats.todayDuration > 0 ? formatDuration(stats.todayDuration) : "—", label: "Сегодня", color: "text-green-400 bg-green-500/10" },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="liquid-glass rounded-xl py-2.5 px-3 flex-1 text-center">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1.5 ${color}`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="font-label text-xs font-bold text-on-surface leading-tight">{value}</div>
            <div className="text-[8px] text-on-surface-variant/40 uppercase tracking-wider mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ===== Stat Cards — Desktop: 3 columns spacious ===== */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {/* Total Time */}
        <div className="liquid-glass rounded-2xl p-6 group hover:bg-white/5 transition-all duration-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant/70">
              Всего
            </span>
          </div>
          <div className="font-label text-3xl font-bold text-on-surface">
            {stats.totalDuration > 0 ? formatDuration(stats.totalDuration) : "---"}
          </div>
          <div className="text-[10px] text-primary/60 mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            За всё время
          </div>
        </div>

        {/* Sessions */}
        <div className="liquid-glass rounded-2xl p-6 group hover:bg-white/5 transition-all duration-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant/70">
              Сессий
            </span>
          </div>
          <div className="font-label text-3xl font-bold text-on-surface">
            {stats.totalSessions > 0 ? String(stats.totalSessions) : "---"}
          </div>
          <div className="text-[10px] text-tertiary/60 mt-2">Всего сессий</div>
        </div>

        {/* Today */}
        <div className="liquid-glass rounded-2xl p-6 group hover:bg-white/5 transition-all duration-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant/70">
              Сегодня
            </span>
          </div>
          <div className="font-label text-3xl font-bold text-on-surface">
            {stats.todayDuration > 0 ? formatDuration(stats.todayDuration) : "---"}
          </div>
          <div className="w-full bg-white/5 h-1.5 mt-4 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500/60 to-green-400/80 h-full rounded-full shadow-[0_0_8px_rgba(74,222,128,0.3)]"
              style={{ width: `${Math.min(100, Math.round((stats.todayDuration / 900) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* ===== Mobile: Inline Timer + Player (below lg breakpoint) ===== */}
      <div className="lg:hidden space-y-4 mb-6">
        <PrayerTimer compact />
        <YouTubePlayer compact />
      </div>

      {/* ===== Recent Sessions ===== */}
      <div className="space-y-6">
        <h3 className="font-headline text-xl md:text-2xl font-bold flex items-center gap-3">
          <span>Последние сессии</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <Link
            href="/history"
            className="text-[11px] font-label uppercase tracking-widest text-primary/70 hover:text-primary transition-colors shrink-0"
          >
            Все
          </Link>
        </h3>
        <SessionsByDate
          pageSize={10}
          refreshKey={refreshKey}
          onStatsChange={setStats}
        />
      </div>
    </>
  );
}
