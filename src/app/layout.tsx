import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/session-provider";
import { TimerProvider } from "@/providers/timer-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "НГ Молитва — Отслеживание молитвы",
  description: "Отслеживайте время молитвы и слушайте христианскую музыку",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        {/* Animated liquid glass orbs */}
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <div className="orb orb-3" aria-hidden="true" />
        <div className="orb orb-4" aria-hidden="true" />

        <SessionProvider>
          <TimerProvider>
            {children}
            <Toaster position="bottom-center" />
          </TimerProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
