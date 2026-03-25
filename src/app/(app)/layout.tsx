import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/app-header";
import { PersistentPanel } from "@/components/layout/persistent-panel";

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
    <>
      <div className="relative z-10 flex min-h-screen flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="page-transition">{children}</div>
          </main>
          <PersistentPanel />
        </div>
      </div>
      {/* Portal target for dropdowns — must be outside the z-10 wrapper */}
      <div id="dropdown-portal" className="relative z-[9999]" />
    </>
  );
}
