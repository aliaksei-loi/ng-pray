"use client";

import { formatDuration, formatDurationClock, formatTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Trash2, HandHeart } from "lucide-react";
import { toast } from "sonner";

interface PrayerSession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  note?: string | null;
}

interface SessionCardProps {
  session: PrayerSession;
  onDelete?: (id: string) => void;
  variant?: "dashboard" | "history";
  isToday?: boolean;
}

export function SessionCard({
  session,
  onDelete,
  variant = "dashboard",
  isToday = true,
}: SessionCardProps) {
  async function handleDelete() {
    try {
      const res = await fetch(`/api/prayer-sessions/${session.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Сессия удалена");
        onDelete?.(session.id);
      } else {
        toast.error("Не удалось удалить сессию");
      }
    } catch {
      toast.error("Ошибка сети");
    }
  }

  const start = new Date(session.startTime);
  const end = new Date(session.endTime);

  if (variant === "history") {
    // History variant — exact Stitch history.html lines 166-179, 209-222, 236-249
    return (
      <div className="liquid-glass sunlight-shadow rounded-2xl p-4 md:p-7 flex items-center justify-between group hover:bg-white/5 transition-all duration-500">
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <div
            className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shrink-0 ${
              isToday
                ? "bg-orange-500/10 text-orange-400 border-orange-500/20 group-hover:bg-orange-500/20"
                : "bg-white/5 text-gray-500 border-white/5 group-hover:text-orange-400 group-hover:bg-orange-500/10 group-hover:border-orange-500/20"
            }`}
          >
            <HandHeart className="h-5 w-5 md:h-7 md:w-7" />
          </div>
          <div className="min-w-0">
            <h4 className="font-body font-bold text-sm md:text-lg text-on-surface group-hover:text-orange-300 transition-colors truncate">
              {session.note || "Молитва"}
            </h4>
            <p className="font-label text-[10px] md:text-xs text-gray-500 tracking-wide mt-0.5 md:mt-1">
              {formatTime(start)} — {formatTime(end)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="text-right">
            <div
              className={`font-label text-base md:text-2xl font-bold tracking-tight transition-colors ${
                isToday
                  ? "text-orange-400"
                  : "text-on-surface group-hover:text-orange-400"
              }`}
            >
              {formatDurationClock(session.duration)}
            </div>
            <div className="hidden md:block text-[10px] uppercase tracking-[0.1em] text-gray-600 font-bold mt-1">
              Длительность
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 rounded-xl text-white/20 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Dashboard variant — exact Stitch dashboard.html lines 201-213
  return (
    <div className="p-5 flex items-center justify-between hover:bg-white/[0.04] transition-all group cursor-pointer">
      <div className="flex items-center gap-5">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ${
            isToday
              ? "bg-primary/10 text-primary"
              : "bg-white/5 text-on-surface-variant/60"
          }`}
        >
          <HandHeart className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-on-surface group-hover:text-primary transition-colors">
            {session.note || "Молитва"}
          </p>
          <p className="text-xs text-on-surface-variant/40 font-label tracking-wide">
            {formatTime(start)} — {formatTime(end)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span
            className={`font-label font-bold text-xl ${
              isToday
                ? "text-primary drop-shadow-[0_0_12px_rgba(255,183,125,0.3)]"
                : "text-on-surface-variant/60"
            }`}
          >
            {formatDuration(session.duration)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-8 w-8 rounded-xl text-white/20 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
