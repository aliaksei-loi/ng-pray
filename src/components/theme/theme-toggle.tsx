"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const themes = ["light", "dark", "system"] as const;
const labels: Record<string, string> = {
  light: "Светлая",
  dark: "Тёмная",
  system: "Системная",
};
const icons: Record<string, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeToggle({ collapsed = false }: { collapsed?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`flex items-center ${collapsed ? "justify-center" : "gap-4"} px-2 py-2 h-9`} />;
  }

  function cycleTheme() {
    const idx = themes.indexOf((theme ?? "system") as typeof themes[number]);
    setTheme(themes[(idx + 1) % themes.length]);
  }

  const Icon = icons[theme ?? "system"];
  const label = labels[theme ?? "system"];

  return (
    <button
      onClick={cycleTheme}
      title={`Тема: ${label}`}
      className={`flex items-center ${collapsed ? "justify-center" : "gap-4"} text-gray-500 hover:text-gray-300 transition-all duration-200 w-full ${collapsed ? "py-2" : "px-2 py-2"}`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="font-manrope text-xs">{label}</span>}
    </button>
  );
}

export function ThemeToggleCompact() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  function cycleTheme() {
    const idx = themes.indexOf((theme ?? "system") as typeof themes[number]);
    setTheme(themes[(idx + 1) % themes.length]);
  }

  const Icon = icons[theme ?? "system"];
  const label = labels[theme ?? "system"];

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors w-full"
    >
      <Icon className="h-4 w-4" />
      <span className="font-manrope text-xs">Тема: {label}</span>
    </button>
  );
}
