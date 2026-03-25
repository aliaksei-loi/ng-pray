import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-5xl space-y-10 animate-fade-in-up">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="liquid-glass rounded-full px-5 py-2 inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ffcb8d]/90" />
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-[#ffcb8d]/90">
                Молитва &middot; Музыка &middot; Общение
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-[0.9]">
            Каждая секунда —{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-orange">связь с Богом</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto text-[#ddc1ae]/80 text-lg sm:text-xl max-w-3xl leading-relaxed font-light">
            Отслеживайте время молитвы, слушайте христианскую музыку и растите в
            вере вместе с вашей группой. Простой и красивый инструмент для
            духовной дисциплины.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/sign-up"
              className="amber-glow rounded-2xl px-10 py-5 font-bold text-base transition-all duration-300"
            >
              Начать бесплатно
            </Link>
            <Link
              href="/sign-in"
              className="liquid-glass rounded-2xl px-10 py-5 font-semibold text-base text-white/90 hover:bg-white/5 transition-all duration-300"
            >
              Войти
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          QUOTE / DIVIDER SECTION
          ════════════════════════════════════════ */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center space-y-10">
          {/* Top divider */}
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#ffb77d]/30" />
            <span className="text-[#ffcb8d]/60 text-sm font-label tracking-widest uppercase">
              Вдохновение
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ffb77d]/30" />
          </div>

          {/* Quote */}
          <blockquote className="font-heading text-3xl sm:text-5xl font-bold italic text-[#ddc1ae]/90 leading-tight tracking-tight">
            &laquo;Непрестанно молитесь&raquo;
          </blockquote>
          <p className="text-[#a48c7a] text-sm sm:text-base font-label tracking-wider uppercase">
            1 Фессалоникийцам 5:17
          </p>

          {/* Bottom divider */}
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#ffb77d]/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#ffb77d]/40" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#ffb77d]/20" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURES — Bento Grid
          ════════════════════════════════════════ */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl space-y-16">
          {/* Section header */}
          <div className="text-center space-y-4">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight">
              Всё для <span className="text-gradient-orange">вашей молитвы</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#ddc1ae]/60 text-lg font-light">
              Инструменты, которые помогут сделать молитву ежедневной привычкой
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Large card — Timer */}
            <div className="md:col-span-8 liquid-glass rounded-[2rem] p-10 sm:p-12 space-y-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ffb77d]/10 text-3xl">
                ⏱
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                Таймер молитвы
              </h3>
              <p className="text-[#ddc1ae]/70 text-base sm:text-lg leading-relaxed max-w-xl">
                Запускайте таймер и отслеживайте каждую минуту, проведённую в
                молитве. Смотрите статистику за день, неделю и месяц. Ваш
                прогресс сохраняется автоматически.
              </p>
            </div>

            {/* Small card — Music */}
            <div className="md:col-span-4 amber-glow rounded-[2rem] p-10 sm:p-12 space-y-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black/10 text-3xl">
                🎵
              </div>
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                Музыка
              </h3>
              <p className="text-[#2f1500]/80 text-base leading-relaxed">
                Христианская музыка для молитвы и поклонения прямо в приложении.
              </p>
            </div>

            {/* Medium card — Groups */}
            <div className="md:col-span-5 liquid-glass rounded-[2rem] p-10 sm:p-12 space-y-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#85cfff]/10 text-3xl">
                👥
              </div>
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                Группы
              </h3>
              <p className="text-[#ddc1ae]/70 text-base leading-relaxed">
                Молитесь вместе с друзьями. Создавайте группы, делитесь
                прогрессом и поддерживайте друг друга.
              </p>
            </div>

            {/* Medium card — Sessions */}
            <div className="md:col-span-7 liquid-glass rounded-[2rem] p-10 sm:p-12 space-y-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ffb77d]/10 text-3xl">
                📊
              </div>
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                История сессий
              </h3>
              <p className="text-[#ddc1ae]/70 text-base sm:text-lg leading-relaxed max-w-lg">
                Просматривайте все ваши молитвенные сессии. Каждая запись
                сохраняет длительность, дату и заметки. Наблюдайте за своим
                ростом в молитвенной жизни.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <footer className="relative px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffb77d]/15 to-transparent mb-12" />

          <div className="flex flex-col items-center gap-8 text-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">🙏</span>
              <span className="font-heading text-xl font-bold tracking-tight">
                <span className="text-gradient-orange">НГ</span> Молитва
              </span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-8">
              <Link
                href="/sign-in"
                className="text-sm text-[#a48c7a] hover:text-[#ddc1ae] transition-colors"
              >
                Войти
              </Link>
              <Link
                href="/sign-up"
                className="text-sm text-[#a48c7a] hover:text-[#ddc1ae] transition-colors"
              >
                Регистрация
              </Link>
            </nav>

            {/* Copyright */}
            <p className="text-xs text-[#a48c7a]/60">
              &copy; {new Date().getFullYear()} НГ Молитва. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
