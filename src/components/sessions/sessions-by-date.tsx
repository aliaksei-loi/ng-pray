"use client";

import { useEffect, useState, useCallback } from "react";
import { SessionCard } from "./session-card";
import { getRelativeDate, getDateKey, formatDuration } from "@/lib/format";

interface PrayerSession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  note?: string | null;
}

interface SessionsByDateProps {
  limit?: number;
  refreshKey?: number;
  onStatsChange?: (stats: {
    totalDuration: number;
    totalSessions: number;
    todayDuration: number;
  }) => void;
}

export function SessionsByDate({
  limit,
  refreshKey,
  onStatsChange,
}: SessionsByDateProps) {
  const [sessions, setSessions] = useState<PrayerSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const url = limit
        ? `/api/prayer-sessions?limit=${limit}`
        : "/api/prayer-sessions?limit=200";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions, refreshKey]);

  // Calculate and report stats
  useEffect(() => {
    if (!onStatsChange || loading) return;

    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalSessions = sessions.length;

    const todayKey = getDateKey(new Date());
    const todayDuration = sessions
      .filter((s) => getDateKey(new Date(s.startTime)) === todayKey)
      .reduce((sum, s) => sum + s.duration, 0);

    onStatsChange({ totalDuration, totalSessions, todayDuration });
  }, [sessions, loading, onStatsChange]);

  function handleDelete(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return (
      <div className="stagger-children space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="shimmer glass h-20 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="glass rounded-2xl py-16 text-center animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/15 to-amber-500/10 text-3xl">
          🕊️
        </div>
        <p className="font-medium text-white/70">
          У вас пока нет сессий молитвы
        </p>
        <p className="mt-1 text-sm text-white/30">
          Нажмите «Начать молитву» чтобы начать
        </p>
      </div>
    );
  }

  // Group by date
  const grouped: Record<string, PrayerSession[]> = {};
  for (const session of sessions) {
    const key = getDateKey(new Date(session.startTime));
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(session);
  }

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey, dateIdx) => {
        const daySessions = grouped[dateKey];
        const totalDuration = daySessions.reduce(
          (sum, s) => sum + s.duration,
          0
        );

        return (
          <div
            key={dateKey}
            className="animate-fade-in-up"
            style={{ animationDelay: `${dateIdx * 100}ms` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-label text-[11px] font-bold text-[#ddc1ae]/40 uppercase tracking-[0.25em]">
                {getRelativeDate(new Date(dateKey + "T12:00:00"))}
              </h3>
              <span className="px-3 py-1 liquid-glass rounded-full text-[10px] font-label text-[#ffb77d]/80">
                {formatDuration(totalDuration)}
              </span>
            </div>
            <div className="liquid-glass rounded-[2rem] overflow-hidden divide-y divide-white/5">
              {daySessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
