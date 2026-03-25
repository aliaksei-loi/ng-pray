"use client";

import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { extractYouTubeId } from "@/lib/youtube";
import { Music, Play, Square, Link } from "lucide-react";

const STORAGE_KEY = "ng-pray-youtube-url";

export function YouTubePlayer() {
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
    <div className="liquid-glass rounded-[2.5rem] p-6 sm:p-8 transition-all duration-300">
      <label className="mb-4 flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-[#ddc1ae]/50">
        <Music className="h-3.5 w-3.5 text-[#ffb77d] animate-pulse" />
        Музыка
      </label>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ddc1ae]/30 pointer-events-none" />
          <input
            type="url"
            placeholder="Вставьте ссылку YouTube..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[11px] text-white/90 focus:ring-1 focus:ring-[#ffb77d]/40 focus:bg-white/[0.08] placeholder:text-[#ddc1ae]/20 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-white/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#ffb77d]/20 hover:text-[#ffb77d] transition-all border border-white/5 text-white/60"
        >
          <Play className="h-4 w-4" />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Воспроизвести
          </span>
        </button>
      </form>

      {videoId && (
        <div className="mt-4 space-y-3 animate-scale-in">
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

          {/* Now playing card */}
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-[1.5rem] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="h-4 w-4 text-[#ffb77d] animate-pulse" />
              <span className="text-[11px] text-[#ddc1ae]/50 uppercase tracking-widest">
                Сейчас играет
              </span>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 text-[11px] text-white/30 uppercase tracking-widest hover:text-red-400 transition-colors"
            >
              <Square className="h-3 w-3" />
              Остановить
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
