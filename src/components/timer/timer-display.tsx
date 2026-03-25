"use client";

import { formatTimerDisplay } from "@/lib/format";

interface TimerDisplayProps {
  seconds: number;
  isRunning: boolean;
}

export function TimerDisplay({ seconds, isRunning }: TimerDisplayProps) {
  const circumference = 2 * Math.PI * 54;
  const minuteProgress = (seconds % 60) / 60;
  const dashoffset = circumference * (1 - minuteProgress);

  return (
    <div className="flex flex-col items-center">
      {/* Circular progress ring */}
      <div className="relative flex items-center justify-center">
        {/* Subtle blur glow behind SVG circle */}
        <div className="absolute inset-0 bg-[#ffb77d]/5 rounded-full blur-3xl" />

        <svg
          width="150"
          height="150"
          viewBox="0 0 120 120"
          className="absolute -rotate-90"
        >
          <defs>
            <linearGradient
              id="timerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffb77d" />
              <stop offset="100%" stopColor="#ff8c00" />
            </linearGradient>
          </defs>
          {/* Background ring (track) */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="6"
          />
          {/* Progress ring */}
          {isRunning && (
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              className="timer-ring"
            />
          )}
        </svg>

        <div className="font-label text-4xl font-bold tracking-tighter text-[#e5e2e1] tabular-nums transition-all duration-500">
          {formatTimerDisplay(seconds)}
        </div>
      </div>

      {isRunning && (
        <div className="mt-3 flex items-center gap-2 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          <span className="text-sm font-medium text-orange-400/80">
            Молитва идёт...
          </span>
        </div>
      )}
    </div>
  );
}
