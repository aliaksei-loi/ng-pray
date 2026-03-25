"use client";

import { useTimerContext } from "@/providers/timer-provider";
import { TimerDisplay } from "./timer-display";
import { toast } from "sonner";
import { formatDuration } from "@/lib/format";
import { Play, Square } from "lucide-react";

export function PrayerTimer() {
  const { isRunning, elapsedSeconds, start, stop } = useTimerContext();

  async function handleStop() {
    const { startTime, endTime, duration } = stop();

    if (duration < 1) return;

    try {
      const res = await fetch("/api/prayer-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
        }),
      });

      if (res.ok) {
        toast.success(
          `Сессия молитвы сохранена (${formatDuration(duration)})`
        );
      } else {
        toast.error("Не удалось сохранить сессию");
      }
    } catch {
      toast.error("Ошибка сети");
    }
  }

  return (
    <div
      className={`relative rounded-[3rem] p-8 sm:p-10 transition-all duration-500 liquid-glass`}
    >
      {/* Silk gradient overlay */}
      <div className="silk-gradient absolute inset-0 rounded-[3rem] pointer-events-none" />

      {/* Ambient glow when running */}
      {isRunning && (
        <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[3rem] bg-gradient-to-br from-orange-500/10 to-amber-500/5 blur-2xl animate-glow-pulse" />
      )}

      <h3 className="font-label text-[10px] uppercase tracking-[0.3em] text-[#ddc1ae]/50 text-center mb-6">
        Время молитвы
      </h3>

      <TimerDisplay seconds={elapsedSeconds} isRunning={isRunning} />

      <button
        onClick={isRunning ? handleStop : start}
        className="amber-glow w-full py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-8"
      >
        {isRunning ? (
          <>
            <Square className="h-4 w-4" />
            <span className="uppercase tracking-widest">Остановить</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            <span className="uppercase tracking-widest">Начать молитву</span>
          </>
        )}
      </button>
    </div>
  );
}
