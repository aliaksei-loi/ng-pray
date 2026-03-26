"use client";

import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { extractYouTubeId } from "@/lib/youtube";
import { Music, Play, Square, Link as LinkIcon } from "lucide-react";

const STORAGE_KEY = "ng-pray-youtube-url";

export function YouTubePlayer({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUrl(saved);
      const id = extractYouTubeId(saved);
      if (id) setVideoId(id);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = extractYouTubeId(inputValue);
    if (id) {
      setVideoId(id);
      setUrl(inputValue);
      localStorage.setItem(STORAGE_KEY, inputValue);
    }
  }

  function handleClear() {
    setVideoId(null);
    setUrl("");
    setInputValue("");
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className={`liquid-glass ${compact ? "rounded-xl p-3" : "rounded-[2.5rem] p-8"}`}>
      <div className={`flex items-center justify-between ${compact ? "mb-2" : "mb-6"}`}>
        <h4 className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant/50">
          Атмосфера
        </h4>
        <Music className="text-primary animate-pulse h-5 w-5" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={`relative group ${compact ? "mb-2" : "mb-4"}`}>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <LinkIcon className="text-on-surface-variant/30 h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Ссылка YouTube..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-3 text-[11px] font-body focus:ring-1 focus:ring-primary/40 focus:bg-white/[0.08] transition-all placeholder:text-on-surface-variant/20 outline-none ${
              compact ? "py-2" : "py-4"
            }`}
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-white/5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/20 hover:text-primary transition-all border border-white/5 ${
            compact ? "py-2" : "py-4"
          }`}
        >
          <Play className="h-5 w-5" />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Воспроизвести
          </span>
        </button>
      </form>

      {videoId && (
        <div className={`${compact ? "mt-3 space-y-3" : "mt-6 space-y-4"}`}>
          <div className="aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              className="h-full w-full"
              iframeClassName="w-full h-full"
            />
          </div>

          <div className="p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <Music className="h-4 w-4 text-primary animate-pulse" />
              <p className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold">
                Сейчас играет
              </p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 text-[11px] text-white/30 uppercase tracking-widest hover:text-red-400 transition-colors"
            >
              <Square className="h-3 w-3" />
              Стоп
            </button>
          </div>
        </div>
      )}

      {!videoId && url && (
        <p className="mt-3 text-[11px] text-red-400/70">
          Неверная ссылка YouTube
        </p>
      )}
    </div>
  );
}
