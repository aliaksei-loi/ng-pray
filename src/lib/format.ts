export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h} ч ${m} мин`;
  }
  if (m > 0) {
    return `${m} мин ${s} сек`;
  }
  return `${s} сек`;
}

export function formatTimerDisplay(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getRelativeDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Сегодня";
  if (isYesterday) return "Вчера";
  return formatDate(date);
}

export function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** Format seconds as HH:MM:SS clock display */
export function formatDurationClock(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

/** Returns a relative date string with the actual date, e.g. "Сегодня, 24 Мая" */
export function getRelativeDateFull(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dayMonth = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);

  // Capitalize first letter of month
  const capitalizedDayMonth =
    dayMonth.charAt(0).toUpperCase() + dayMonth.slice(1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return `Сегодня, ${capitalizedDayMonth}`;
  if (isYesterday) return `Вчера, ${capitalizedDayMonth}`;
  return capitalizedDayMonth;
}
