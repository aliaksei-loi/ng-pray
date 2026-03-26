"use client";

import { SessionsByDate } from "@/components/sessions/sessions-by-date";

export default function HistoryPage() {
  return (
    <>
      {/* Header Section — history.html lines 148-152 */}
      <header className="mb-8 md:mb-16 relative">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px]" />
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2 md:mb-3">
          История сессий
        </h2>
        <p className="font-body text-on-surface-variant text-sm md:text-lg">
          Ваш путь духовного сосредоточения в деталях.
        </p>
      </header>

      {/* History List — history.html lines 154-267 */}
      <SessionsByDate variant="history" />

      {/* Decorative Element — history.html lines 270-272 */}
      <div className="mt-12 md:mt-24 flex justify-center">
        <div className="w-px h-20 md:h-40 bg-gradient-to-b from-orange-500/40 via-orange-500/10 to-transparent" />
      </div>

      {/* Footer — history.html lines 274-284 */}
      <footer className="w-full py-12 mt-auto border-t border-orange-900/10 flex flex-col items-center gap-4">
        <div className="text-orange-500 font-medium font-manrope text-sm tracking-tight">
          НГ Молитва
        </div>
        <div className="font-manrope text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40 opacity-80">
          © 2025 НГ Молитва. Все права защищены.
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-2">
          <a
            className="text-on-surface-variant/40 hover:text-orange-400 transition-colors font-manrope text-[10px] uppercase tracking-widest"
            href="#"
          >
            Политика конфиденциальности
          </a>
          <a
            className="text-on-surface-variant/40 hover:text-orange-400 transition-colors font-manrope text-[10px] uppercase tracking-widest"
            href="#"
          >
            Условия использования
          </a>
          <a
            className="text-on-surface-variant/40 hover:text-orange-400 transition-colors font-manrope text-[10px] uppercase tracking-widest"
            href="#"
          >
            Поддержка
          </a>
        </div>
      </footer>
    </>
  );
}
