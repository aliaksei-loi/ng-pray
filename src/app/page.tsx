import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Bell,
  Settings,
  History,
  Sunrise,
  TrendingUp,
  Quote,
  Clock,
  BellRing,
} from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="selection:bg-primary/30">
      {/* ════════════════════════════════════════
          FIXED TOP NAV (lines 133-152)
          ════════════════════════════════════════ */}
      <header className="fixed top-0 w-full z-50 bg-surface/50 backdrop-blur-3xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-surface-variant/40">
        <nav className="flex justify-between items-center px-8 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-headline">
              НГ Молитва
            </span>
            <span className="text-orange-500 text-xl">🙏</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-body text-sm font-semibold tracking-tight">
            <Link
              href="/"
              className="text-orange-400 border-b-2 border-orange-500 pb-1 transition-colors duration-300"
            >
              Главная
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-orange-300 transition-colors duration-300"
            >
              Молитвы
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-orange-300 transition-colors duration-300"
            >
              Сообщество
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <Bell className="w-6 h-6 hover:text-orange-300 cursor-pointer transition-colors" />
              <Settings className="w-6 h-6 hover:text-orange-300 cursor-pointer transition-colors" />
            </div>
            <Link
              href="/sign-up"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
            >
              Регистрация
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative min-h-screen overflow-hidden">
        {/* ════════════════════════════════════════
            Abstract Silk Orbs (lines 155-156)
            ════════════════════════════════════════ */}
        <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-primary/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[180px] pointer-events-none" />

        {/* ════════════════════════════════════════
            HERO SECTION (lines 158-211)
            ════════════════════════════════════════ */}
        <section className="relative pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass premium-shadow mb-10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary/90">
              Отслеживание молитвы
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-10">
            Каждая секунда — <br />
            <span className="bg-gradient-to-b from-primary via-secondary to-primary-container bg-clip-text text-transparent">
              связь с Богом
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-on-surface-variant/80 text-lg md:text-2xl max-w-3xl mb-14 leading-relaxed font-light">
            Отслеживайте время молитвы с точностью и красотой. Гармонизируйте
            ритм души с вечными часами.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link
              href="/sign-up"
              className="w-full sm:w-auto silk-gradient-primary text-on-primary font-bold px-12 py-5 rounded-2xl shadow-[0_25px_60px_-15px_rgba(255,140,0,0.4)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 gloss-reflection"
            >
              <span>Начать</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/sign-in"
              className="w-full sm:w-auto liquid-glass text-on-surface font-semibold px-12 py-5 rounded-2xl hover:bg-on-surface/5 transition-all active:scale-95 premium-shadow"
            >
              Войти
            </Link>
          </div>

          {/* Visual Feature: The Central Instrument */}
          <div className="mt-32 w-full max-w-6xl relative">
            <div className="aspect-[21/9] liquid-glass-dark rounded-[3rem] overflow-hidden premium-shadow relative z-10 p-1">
              <div className="absolute inset-0 silk-gradient-amber opacity-30" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="sacred geometry and prayer interface"
                className="w-full h-full object-cover mix-blend-overlay opacity-30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRofQOzWmQ4RRcIJnQuaPsmGFBwy9U9jUzADBovM3RafFl_a7IynqaSIshyqaAL-Bnyg7122Fqgqzo382oc7_8cOV59bxViX_LqvEduezs2MhjrYv7nFuJDUo8-Vp-7vnipyXP5MWw3obDEE27OtlgS13qmBWDy2RYZ2cLaqN3ZYK9DNzkF1JHibt_ioY8BBJfl8vd2n3hlnmFkha8gvriEzidJZzseOgFRiFL1hrnZX86GipceZnWzGMpDaLQ0spSYJVji_FZuXH6"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                <div className="text-center">
                  <span className="font-label text-7xl md:text-9xl font-medium tracking-tighter text-primary drop-shadow-[0_0_30px_rgba(255,183,125,0.4)]">
                    04:32:15
                  </span>
                  <p className="font-label text-secondary uppercase tracking-[0.5em] text-xs md:text-sm mt-6 opacity-70">
                    До утренней молитвы
                  </p>
                </div>
                {/* Enhanced Bento Grid Overlay */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-20">
                  <div className="p-8 liquid-glass rounded-3xl text-left gloss-reflection group">
                    <History className="w-6 h-6 text-primary mb-4 block scale-110" />
                    <h3 className="font-headline text-xl mb-2 font-bold">
                      Постоянство
                    </h3>
                    <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                      Ваш духовный путь во времени.
                    </p>
                  </div>
                  <div className="p-8 liquid-glass rounded-3xl text-left gloss-reflection">
                    <Sunrise className="w-6 h-6 text-primary mb-4 block scale-110" />
                    <h3 className="font-headline text-xl mb-2 font-bold">
                      Утренние напоминания
                    </h3>
                    <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                      Не пропустите время молитвы.
                    </p>
                  </div>
                  <div className="p-8 liquid-glass rounded-3xl text-left gloss-reflection">
                    <TrendingUp className="w-6 h-6 text-primary mb-4 block scale-110" />
                    <h3 className="font-headline text-xl mb-2 font-bold">
                      Ритуал
                    </h3>
                    <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                      Глубокая аналитика молитвенных привычек.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </section>

        {/* ════════════════════════════════════════
            AESTHETIC QUOTE SECTION (lines 214-226)
            ════════════════════════════════════════ */}
        <section className="py-40 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Quote className="w-12 h-12 text-primary-fixed-dim mx-auto mb-10 opacity-50" />
            <blockquote className="font-headline text-4xl md:text-6xl font-bold italic text-on-surface-variant/90 leading-tight tracking-tight">
              &ldquo;Точность во времени — первый шаг к духовной ясности. Пусть
              каждая секунда будет измерена смыслом.&rdquo;
            </blockquote>
            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent" />
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-outline/60">
                Древняя мудрость, современные технологии
              </span>
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            BENTO GRID FEATURES (lines 228-267)
            ════════════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Large card - Chronos & Kairos */}
            <div className="md:col-span-8 liquid-glass-dark rounded-[3.5rem] p-12 flex flex-col justify-end min-h-[500px] relative overflow-hidden group premium-shadow">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="meditation background"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaMkY4JkZ-AFZl0TQmpTllqffVh-SzFtpooINtLVBWRm1RMp9NLVDAMqXluH8Eqon6TkX6p2dj90q8Kjv_cHlz_TAPhVu9Jqjd5FIgmQhozhKc0wH2zY7aL6EZrCMTsvM_oELEZ3DJZET-GqzyAmJMf5S6DDtOBmY0UdpQnFySfCfTn_vseGzH0T7QLaT_08o9yRIRId0Tyue6VQjPqhOoB1izqUQ90ZiVDauyNErd7OjvhkYUietq-9n3zcEGIMx_989jeMMAGuJu"
                />
              </div>
              <div className="relative z-10">
                <h2 className="font-headline text-5xl font-bold mb-6 tracking-tight">
                  Хронос и Кайрос
                </h2>
                <p className="font-body text-on-surface-variant/80 max-w-md text-lg leading-relaxed">
                  Идеальный баланс между точностью хронологии и качеством
                  духовных моментов.
                </p>
              </div>
            </div>

            {/* Gradient card - Sync */}
            <div className="md:col-span-4 silk-gradient-primary rounded-[3.5rem] p-12 flex flex-col justify-between text-on-primary-container relative overflow-hidden gloss-reflection premium-shadow">
              <Clock className="w-20 h-20 opacity-10 absolute -top-4 -right-4 rotate-12" />
              <h3 className="font-headline text-4xl font-bold leading-[1.1] tracking-tight">
                Синхронизация в реальном времени.
              </h3>
              <div className="mt-auto">
                <div className="font-label text-6xl font-bold mb-1">100%</div>
                <p className="text-sm font-medium opacity-70 tracking-wide uppercase">
                  Надёжность
                </p>
              </div>
            </div>

            {/* Gentle Awakener card */}
            <div className="md:col-span-5 liquid-glass rounded-[3rem] p-10 flex flex-col items-start gap-6 premium-shadow gloss-reflection">
              <div className="w-16 h-16 rounded-2xl bg-on-surface/5 backdrop-blur-md flex items-center justify-center text-primary shadow-inner">
                <BellRing className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold mb-3 tracking-tight">
                  Мягкие напоминания
                </h3>
                <p className="text-on-surface-variant/70 leading-relaxed">
                  Утончённые уведомления, уважающие ваше состояние покоя и
                  медитации.
                </p>
              </div>
            </div>

            {/* Liquid Light UI card */}
            <div className="md:col-span-7 liquid-glass-dark rounded-[3rem] p-10 flex items-center justify-between overflow-hidden relative premium-shadow gloss-reflection">
              <div className="absolute inset-0 silk-gradient-amber opacity-10" />
              <div className="relative z-10 max-w-sm">
                <h3 className="font-headline text-2xl font-bold mb-3 tracking-tight">
                  Интерфейс света
                </h3>
                <p className="text-on-surface-variant/70 leading-relaxed">
                  Интерфейс, адаптирующийся ко времени суток.
                </p>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                <div className="w-32 h-32 rounded-full bg-secondary/30 blur-3xl -ml-12" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════
          FOOTER (lines 271-292)
          ════════════════════════════════════════ */}
      <footer className="w-full py-12 mt-auto border-t border-orange-900/10 bg-surface">
        <div className="flex flex-col items-center gap-6 w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center md:items-start w-full md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-headline text-xl font-medium text-orange-500">
                  НГ Молитва
                </span>
                <span className="text-orange-500">🙏</span>
              </div>
              <p className="font-headline text-xs uppercase tracking-widest text-on-surface-variant/40">
                Духовная точность
              </p>
            </div>
            <div className="flex gap-12 mb-8 md:mb-0">
              <a
                className="font-headline text-xs uppercase tracking-widest text-on-surface-variant/40 hover:text-orange-400 transition-colors"
                href="#"
              >
                Политика конфиденциальности
              </a>
              <a
                className="font-headline text-xs uppercase tracking-widest text-on-surface-variant/40 hover:text-orange-400 transition-colors"
                href="#"
              >
                Условия использования
              </a>
              <a
                className="font-headline text-xs uppercase tracking-widest text-on-surface-variant/40 hover:text-orange-400 transition-colors"
                href="#"
              >
                Поддержка
              </a>
            </div>
          </div>
          <div className="w-full h-px bg-surface-container" />
          <div className="text-on-surface-variant/40 font-headline text-[10px] uppercase tracking-widest opacity-80 hover:opacity-100 transition-all">
            &copy; 2025 НГ Молитва. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
