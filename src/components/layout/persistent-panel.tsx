"use client";

import { PrayerTimer } from "@/components/timer/prayer-timer";
import { YouTubePlayer } from "@/components/player/youtube-player";

export function PersistentPanel() {
  return (
    <aside className="hidden lg:block w-full lg:w-[360px] space-y-8">
      <PrayerTimer />
      <YouTubePlayer />
    </aside>
  );
}
