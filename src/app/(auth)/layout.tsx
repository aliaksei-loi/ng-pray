export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md animate-scale-in">{children}</div>
        <div className="mt-16 flex items-center gap-6 opacity-30">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          <div className="font-label text-[9px] tracking-[0.4em] uppercase text-orange-200">
            Sacred Precision
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
        </div>
      </div>
    </div>
  );
}
