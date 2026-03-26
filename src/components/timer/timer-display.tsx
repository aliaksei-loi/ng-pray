"use client";

import { formatTimerDisplay } from "@/lib/format";

interface TimerDisplayProps {
  seconds: number;
  isRunning: boolean;
  compact?: boolean;
}

export function TimerDisplay({ seconds, isRunning, compact = false }: TimerDisplayProps) {
  const circumference = 2 * Math.PI * 96; // ~603.19
  const minuteProgress = (seconds % 60) / 60;
  const dashoffset = circumference * (1 - minuteProgress);

  return (
    <div
      className={`relative flex items-center justify-center group ${
        compact ? "w-16 h-16 shrink-0" : "w-52 h-52 mb-10"
      }`}
    >
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 208 208">
        <circle
          className="text-on-surface/[0.03]"
          cx="104"
          cy="104"
          fill="transparent"
          r="96"
          stroke="currentColor"
          strokeWidth="6"
        />
        {isRunning && (
          <circle
            cx="104"
            cy="104"
            fill="transparent"
            r="96"
            stroke="url(#timerGradient)"
            strokeDasharray="603"
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            strokeWidth="8"
            className="timer-ring"
          />
        )}
        <defs>
          <linearGradient id="timerGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb77d" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
        </defs>
      </svg>

      {!compact && (
        <div className="font-label text-4xl font-bold tracking-tighter text-on-surface drop-shadow-sm">
          {formatTimerDisplay(seconds)}
        </div>
      )}
    </div>
  );
}
