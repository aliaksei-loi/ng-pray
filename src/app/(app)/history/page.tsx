"use client";

import { SessionsByDate } from "@/components/sessions/sessions-by-date";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/10">
            <History className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white/90">
              История молитв
            </h1>
            <p className="text-sm text-white/35">
              Все ваши сессии молитвы
            </p>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <SessionsByDate />
      </div>
    </div>
  );
}
