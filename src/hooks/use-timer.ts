"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "ng-pray-timer-start";

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Recover from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedTime = parseInt(saved, 10);
      if (!isNaN(savedTime)) {
        setStartedAt(savedTime);
        setIsRunning(true);
        setElapsedSeconds(Math.floor((Date.now() - savedTime) / 1000));
      }
    }
  }, []);

  // Tick interval
  useEffect(() => {
    if (isRunning && startedAt) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, startedAt]);

  // Handle visibility change to fix drift
  useEffect(() => {
    function handleVisibility() {
      if (
        document.visibilityState === "visible" &&
        isRunning &&
        startedAt
      ) {
        setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [isRunning, startedAt]);

  const start = useCallback(() => {
    const now = Date.now();
    setStartedAt(now);
    setElapsedSeconds(0);
    setIsRunning(true);
    localStorage.setItem(STORAGE_KEY, now.toString());
  }, []);

  const stop = useCallback(() => {
    const endTime = new Date();
    const startTime = startedAt ? new Date(startedAt) : endTime;
    const duration = elapsedSeconds;

    setIsRunning(false);
    setStartedAt(null);
    setElapsedSeconds(0);
    localStorage.removeItem(STORAGE_KEY);

    return { startTime, endTime, duration };
  }, [startedAt, elapsedSeconds]);

  return { isRunning, elapsedSeconds, startedAt, start, stop };
}
