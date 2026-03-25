"use client";

import { useRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTimerContext } from "@/providers/timer-provider";
import { SessionsByDate } from "@/components/sessions/sessions-by-date";
import { Clock, TrendingUp, Calendar } from "lucide-react";
import { formatDuration } from "@/lib/format";

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
    <div className="mx-auto max-w-2xl space-y-6 sm:space-y-8">
      {/* Welcome */}
      <div className="animate-fade-in-up">
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-gradient-orange">
            Добро пожаловать{firstName ? `, ${firstName}` : ""}
          </span>{" "}
          <span className="inline-block animate-float-slow">🙏</span>
        </h1>
        <p className="text-[#ddc1ae]/60 mt-2 max-w-xl font-medium">
          Отслеживайте своё время молитвы
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          {
            icon: Clock,
            label: "Всего",
            value:
              stats.totalDuration > 0
                ? formatDuration(stats.totalDuration)
                : "—",
            iconBg: "bg-[#ffb77d]/10",
            iconColor: "text-[#ffb77d]",
            delay: "100ms",
          },
          {
            icon: TrendingUp,
            label: "Сессий",
            value: stats.totalSessions > 0 ? String(stats.totalSessions) : "—",
            iconBg: "bg-[#7db5ff]/10",
            iconColor: "text-[#7db5ff]",
            delay: "200ms",
          },
          {
            icon: Calendar,
            label: "Сегодня",
            value:
              stats.todayDuration > 0
                ? formatDuration(stats.todayDuration)
                : "—",
            iconBg: "bg-[#7dffb7]/10",
            iconColor: "text-[#7dffb7]",
            delay: "300ms",
          },
        ].map(({ icon: Icon, label, value, iconBg, iconColor, delay }) => (
          <div
            key={label}
            className="liquid-glass overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-6 transition-all duration-300 hover:scale-[1.03] animate-fade-in-up"
            style={{ animationDelay: delay }}
          >
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center`}
              >
                <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${iconColor}`} />
              </div>
              <p className="font-label text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#ddc1ae]/70 truncate">
                {label}
              </p>
            </div>
            <p className="font-label text-lg sm:text-3xl font-bold text-[#e5e2e1] tabular-nums truncate">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Sessions */}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "350ms" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-heading text-xl sm:text-2xl font-bold shrink-0">
            Последние сессии
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <SessionsByDate
          limit={20}
          refreshKey={refreshKey}
          onStatsChange={setStats}
        />
      </div>
    </div>
  );
}
