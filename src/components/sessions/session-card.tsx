"use client";

import { formatDuration, formatTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PrayerSession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  note?: string | null;
}

interface SessionCardProps {
  session: PrayerSession;
  onDelete?: (id: string) => void;
}

export function SessionCard({ session, onDelete }: SessionCardProps) {
  async function handleDelete() {
    try {
      const res = await fetch(`/api/prayer-sessions/${session.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Сессия удалена");
        onDelete?.(session.id);
      } else {
        toast.error("Не удалось удалить сессию");
      }
    } catch {
      toast.error("Ошибка сети");
    }
  }

  const start = new Date(session.startTime);
  const end = new Date(session.endTime);

  return (
    <div className="p-5 flex items-center justify-between hover:bg-white/[0.04] transition-all group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#ffb77d]/10 rounded-2xl flex items-center justify-center text-[#ffb77d] text-lg transition-transform duration-300 group-hover:scale-110">
          🙏
        </div>
        <div>
          <div className="font-label font-bold text-xl text-[#ffb77d] drop-shadow-[0_0_12px_rgba(255,183,125,0.3)] tabular-nums">
            {formatDuration(session.duration)}
          </div>
          <div className="text-xs text-[#ddc1ae]/40 font-label tracking-wide">
            {formatTime(start)} — {formatTime(end)}
          </div>
          {session.note && (
            <div className="mt-0.5 text-xs text-[#ddc1ae]/25">
              {session.note}
            </div>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 rounded-xl text-white/20 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
