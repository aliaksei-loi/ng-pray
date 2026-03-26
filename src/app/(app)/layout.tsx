import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { PersistentPanel } from "@/components/layout/persistent-panel";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { AppContent } from "@/components/layout/app-content";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <div className="relative z-10 min-h-screen">
        <SidebarNav />
        <AppContent>
          <div className="flex flex-col lg:flex-row gap-10">
            <section className="flex-1 space-y-12">{children}</section>
            <PersistentPanel />
          </div>
        </AppContent>
      </div>
      <div id="dropdown-portal" className="relative z-[9999]" />
    </SidebarProvider>
  );
}
