"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { SessionCard } from "./session-card";
import {
  getRelativeDate,
  getRelativeDateFull,
  getDateKey,
  formatDuration,
  formatDurationClock,
} from "@/lib/format";
import { Loader2 } from "lucide-react";

interface PrayerSession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  note?: string | null;
}

interface SessionsByDateProps {
  /** Items per page (default 20) */
  pageSize?: number;
  /** Bump to trigger a refetch from page 1 */
  refreshKey?: number;
  variant?: "dashboard" | "history";
  onStatsChange?: (stats: {
    totalDuration: number;
    totalSessions: number;
    todayDuration: number;
  }) => void;
}

export function SessionsByDate({
  pageSize = 20,
  refreshKey,
  variant = "dashboard",
  onStatsChange,
}: SessionsByDateProps) {
  const [sessions, setSessions] = useState<PrayerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Fetch first page + stats
  const fetchInitial = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prayer-sessions?limit=${pageSize}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions);
        setNextCursor(data.nextCursor);
        setHasMore(data.hasMore);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // Fetch stats separately for dashboard
  useEffect(() => {
    if (!onStatsChange) return;
    fetch("/api/prayer-sessions?stats=true")
      .then((r) => r.json())
      .then((data) => {
        onStatsChange({
          totalDuration: data.totalDuration,
          totalSessions: data.totalSessions,
          todayDuration: data.todayDuration,
        });
      })
      .catch(() => {});
  }, [onStatsChange, refreshKey]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial, refreshKey]);

  // Load next page
  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/prayer-sessions?limit=${pageSize}&cursor=${nextCursor}`
      );
      if (res.ok) {
        const data = await res.json();
        setSessions((prev) => [...prev, ...data.sessions]);
        setNextCursor(data.nextCursor);
        setHasMore(data.hasMore);
      }
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore, pageSize]);

  // Infinite scroll observer (history variant only)
  useEffect(() => {
    if (variant !== "history" || !hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [variant, hasMore, loadingMore, loadMore]);

  function handleDelete(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`liquid-glass rounded-2xl animate-pulse ${variant === "history" ? "h-24" : "h-20"}`}
          />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="liquid-glass rounded-2xl py-16 text-center">
        <p className="font-medium text-on-surface-variant/70">
          У вас пока нет сессий молитвы
        </p>
        <p className="mt-1 text-sm text-on-surface-variant/30">
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

  const todayKey = getDateKey(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayKey = getDateKey(yesterdayDate);

  const loadMoreButton = hasMore && (
    <div ref={sentinelRef} className="flex justify-center py-6">
      {loadingMore ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary/50" />
      ) : (
        <button
          onClick={loadMore}
          className="px-6 py-2.5 rounded-full liquid-glass text-xs font-label uppercase tracking-widest text-on-surface-variant/60 hover:text-primary hover:bg-on-surface/5 transition-all"
        >
          Загрузить ещё
        </button>
      )}
    </div>
  );

  if (variant === "history") {
    return (
      <div className="space-y-14">
        {sortedDates.map((dateKey) => {
          const daySessions = grouped[dateKey];
          const totalDuration = daySessions.reduce(
            (sum, s) => sum + s.duration,
            0
          );
          const isToday = dateKey === todayKey;
          const isYesterday = dateKey === yesterdayKey;
          const isOlder = !isToday && !isYesterday;

          const titleColor = isToday
            ? "text-orange-400"
            : isYesterday
              ? "text-on-surface-variant"
              : "text-on-surface-variant/60";

          return (
            <section key={dateKey}>
              <div className="flex items-end justify-between mb-8 px-4 py-3 rounded-2xl liquid-glass-header">
                <h3 className={`font-headline text-lg md:text-2xl font-bold ${titleColor}`}>
                  {getRelativeDateFull(new Date(dateKey + "T12:00:00"))}
                </h3>
                <div className="bg-on-surface/5 backdrop-blur-3xl ghost-border px-3 md:px-5 py-1.5 md:py-2 rounded-full flex items-center gap-2 md:gap-3">
                  <span className="text-[9px] md:text-[10px] uppercase font-label tracking-widest text-on-surface-variant/60">
                    Итого:
                  </span>
                  <span className="font-label text-xs md:text-sm font-bold text-orange-300">
                    {formatDurationClock(totalDuration)}
                  </span>
                </div>
              </div>

              <div
                className={`space-y-3 md:space-y-5${
                  isOlder
                    ? " opacity-70 hover:opacity-100 transition-opacity duration-500"
                    : ""
                }`}
              >
                {daySessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onDelete={handleDelete}
                    variant="history"
                    isToday={isToday}
                  />
                ))}
              </div>
            </section>
          );
        })}
        {loadMoreButton}
      </div>
    );
  }

  // Dashboard variant
  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey) => {
        const daySessions = grouped[dateKey];
        const totalDuration = daySessions.reduce(
          (sum, s) => sum + s.duration,
          0
        );
        const isToday = dateKey === todayKey;

        return (
          <div key={dateKey} className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-[0.25em]">
                {getRelativeDate(new Date(dateKey + "T12:00:00"))}
              </span>
              <span
                className={`px-3 py-1 liquid-glass rounded-full text-[10px] font-label ${
                  isToday ? "text-primary/80" : "text-on-surface-variant/30"
                }`}
              >
                {formatDuration(totalDuration)}
              </span>
            </div>
            <div
              className={`liquid-glass rounded-[2rem] overflow-hidden divide-y divide-on-surface/5${
                !isToday
                  ? " opacity-60 hover:opacity-100 transition-opacity"
                  : ""
              }`}
            >
              {daySessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onDelete={handleDelete}
                  variant="dashboard"
                  isToday={isToday}
                />
              ))}
            </div>
          </div>
        );
      })}
      {loadMoreButton}
    </div>
  );
}
