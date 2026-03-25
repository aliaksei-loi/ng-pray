"use client";

import { PrayerTimer } from "@/components/timer/prayer-timer";
import { YouTubePlayer } from "@/components/player/youtube-player";

export function PersistentPanel() {
  return (
    <aside className="relative z-0 hidden w-80 shrink-0 overflow-y-auto border-l border-white/5 p-4 md:block">
      <div className="space-y-4">
        <PrayerTimer />
        <YouTubePlayer />
      </div>
    </aside>
  );
}
