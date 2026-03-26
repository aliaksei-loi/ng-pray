"use client";

import { useTimerContext } from "@/providers/timer-provider";
import { TimerDisplay } from "./timer-display";
import { toast } from "sonner";
import { formatDuration, formatTimerDisplay } from "@/lib/format";
import { Play, Square } from "lucide-react";
import { playStartSound, playStopSound } from "@/lib/sounds";

export function PrayerTimer({ compact = false }: { compact?: boolean }) {
  const { isRunning, elapsedSeconds, start, stop } = useTimerContext();

  function handleStart() {
    start();
    playStartSound();
    toast("🙏 Молитва начата", {
      description: "Таймер запущен. Молитесь с миром в сердце.",
    });
  }

  async function handleStop() {
    const { startTime, endTime, duration } = stop();
    playStopSound();

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

  if (compact) {
    // Single-row compact layout for mobile
    return (
      <div className="liquid-glass rounded-2xl px-4 py-3 relative">
        <div className="absolute inset-0 silk-gradient pointer-events-none rounded-[inherit]" />
        <div className="relative flex items-center gap-4">
          {/* Timer value */}
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-label uppercase tracking-[0.2em] text-on-surface-variant/40 mb-0.5">
              {isRunning ? "Идёт молитва" : "Время молитвы"}
            </div>
            <div className={`font-label text-2xl font-bold tabular-nums tracking-tight ${isRunning ? "text-primary" : "text-on-surface"}`}>
              {formatTimerDisplay(elapsedSeconds)}
            </div>
          </div>

          {/* Start/Stop button */}
          <button
            onClick={isRunning ? handleStop : handleStart}
            className={`shrink-0 rounded-full font-bold text-[10px] px-5 py-2.5 flex items-center gap-2 active:scale-95 transition-all duration-300 ${
              isRunning
                ? "bg-on-surface/10 text-red-400 hover:bg-red-500/15"
                : "amber-glow text-on-primary shadow-[0_10px_20px_rgba(255,140,0,0.15)] hover:scale-[1.02]"
            }`}
          >
            {isRunning ? (
              <>
                <Square className="h-3.5 w-3.5" />
                <span className="uppercase tracking-widest">Стоп</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span className="uppercase tracking-widest">Начать</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Desktop full layout
  return (
    <div className="liquid-glass rounded-[3rem] p-10 text-center relative flex flex-col items-center">
      <div className="absolute inset-0 silk-gradient pointer-events-none rounded-[inherit]" />

      <h4 className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant/50 mb-10">
        Время молитвы
      </h4>

      <TimerDisplay seconds={elapsedSeconds} isRunning={isRunning} />

      <button
        onClick={isRunning ? handleStop : handleStart}
        className="w-full py-5 amber-glow rounded-full text-on-primary font-bold text-sm shadow-[0_20px_40px_rgba(255,140,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
      >
        {isRunning ? (
          <>
            <Square className="h-5 w-5" />
            <span className="uppercase tracking-widest">Остановить</span>
          </>
        ) : (
          <>
            <Play className="h-5 w-5" />
            <span className="uppercase tracking-widest">Начать молитву</span>
          </>
        )}
      </button>
    </div>
  );
}
