"use client";

import { useTimerContext } from "@/providers/timer-provider";
import { formatTimerDisplay } from "@/lib/format";
import { YouTubePlayer } from "@/components/player/youtube-player";
import { Square, Flame } from "lucide-react";
import { toast } from "sonner";
import { formatDuration } from "@/lib/format";
import { playStopSound } from "@/lib/sounds";

export function ActiveSession() {
  const { isRunning, elapsedSeconds, stop } = useTimerContext();

  if (!isRunning) return null;

  const time = formatTimerDisplay(elapsedSeconds);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const circumference = 2 * Math.PI * 96;
  const minuteProgress = (elapsedSeconds % 60) / 60;
  const dashoffset = circumference * (1 - minuteProgress);

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
        toast.success(`Сессия молитвы сохранена (${formatDuration(duration)})`);
      } else {
        toast.error("Не удалось сохранить сессию");
      }
    } catch {
      toast.error("Ошибка сети");
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-surface-dim flex flex-col">
      {/* ===== MOBILE LAYOUT (< md) ===== */}
      <div className="flex flex-col min-h-full md:hidden">
        {/* Header */}
        <header className="pt-safe px-6 pt-6 pb-2 text-center">
          <p className="text-[10px] font-label uppercase tracking-[0.3em] text-primary/60">
            НГ Молитва
          </p>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
          <p className="text-[10px] font-label uppercase tracking-[0.25em] text-on-surface-variant/40 mb-2">
            Текущая сессия
          </p>
          <h1 className="font-headline text-2xl font-bold text-on-surface mb-8">
            Время в Духе
          </h1>

          {/* Timer circle */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 208 208">
              <circle
                cx="104" cy="104" r="96"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="6"
                className="text-on-surface/[0.03]"
              />
              <circle
                cx="104" cy="104" r="96"
                fill="transparent"
                stroke="url(#activeTimerGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                className="timer-ring"
              />
              <defs>
                <linearGradient id="activeTimerGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffb77d" />
                  <stop offset="100%" stopColor="#ff8c00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <div className="font-label text-4xl font-bold tracking-tight text-on-surface drop-shadow-[0_0_30px_rgba(255,140,0,0.3)]">
                {time}
              </div>
            </div>
          </div>

          <p className="text-[9px] font-label uppercase tracking-[0.2em] text-on-surface-variant/30 mb-8">
            Минуты • Секунды
          </p>

          {/* End session button */}
          <button
            onClick={handleStop}
            className="w-full max-w-xs amber-glow rounded-full py-4 text-on-primary font-bold text-sm flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,140,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            <Square className="h-4 w-4" />
            <span className="uppercase tracking-widest">Завершить сессию</span>
          </button>
        </div>

        {/* Music player at bottom */}
        <div className="px-4 pb-6 pt-4">
          <YouTubePlayer compact />
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (>= md) ===== */}
      <div className="hidden md:flex min-h-full">
        {/* Left: Timer area */}
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <p className="text-[10px] font-label uppercase tracking-[0.25em] text-primary/50 mb-3">
            Текущая сессия
          </p>
          <h1 className="font-headline text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight mb-12">
            Время в Присутствии
          </h1>

          {/* Large timer circle */}
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[60px]" />
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 208 208">
              <circle
                cx="104" cy="104" r="96"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                className="text-on-surface/[0.03]"
              />
              <circle
                cx="104" cy="104" r="96"
                fill="transparent"
                stroke="url(#activeTimerGradientDesktop)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                className="timer-ring"
              />
              <defs>
                <linearGradient id="activeTimerGradientDesktop" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffb77d" />
                  <stop offset="100%" stopColor="#ff8c00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center relative">
              <div className="font-label text-6xl lg:text-7xl font-bold tracking-tight text-on-surface drop-shadow-[0_0_40px_rgba(255,140,0,0.3)]">
                {time}
              </div>
            </div>
          </div>

          <p className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant/30 mb-10">
            Минуты : Секунды
          </p>

          {/* Controls */}
          <button
            onClick={handleStop}
            className="amber-glow rounded-full px-12 py-4 text-on-primary font-bold text-sm flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,140,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            <Square className="h-4 w-4" />
            <span className="uppercase tracking-widest">Завершить сессию</span>
          </button>

          {/* Session info */}
          <div className="mt-12 flex items-center gap-6 text-on-surface-variant/30">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary/60" />
              <span className="text-[10px] font-label uppercase tracking-wider">
                Сессия активна
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-on-surface/10" />
            <span className="text-[10px] font-label uppercase tracking-wider tabular-nums">
              {minutes > 0 ? `${minutes} мин ${seconds} сек` : `${seconds} сек`}
            </span>
          </div>
        </div>

        {/* Right: Music player sidebar */}
        <aside className="w-[380px] border-l border-on-surface/5 p-8 flex flex-col">
          <h3 className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant/40 mb-6">
            Сейчас играет
          </h3>
          <YouTubePlayer />
        </aside>
      </div>
    </div>
  );
}
