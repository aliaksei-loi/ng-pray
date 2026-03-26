"use client";

import { useSidebar } from "@/providers/sidebar-provider";
import { ActiveSession } from "@/components/session/active-session";

export function AppContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <>
      <ActiveSession />
      <main
        className={`pt-14 md:pt-8 pb-24 md:pb-8 px-4 md:px-8 max-w-[1400px] transition-all duration-300 ease-in-out ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {children}
      </main>
    </>
  );
}
