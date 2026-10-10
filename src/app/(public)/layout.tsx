import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col"><header className="border-b bg-card/80 px-6 py-4 sm:px-8 lg:px-12"><div className="mx-auto flex w-full max-w-7xl items-center justify-between"><span className="font-semibold tracking-tight">Emergency Dispatch</span><span className="text-sm text-muted-foreground">Public portal</span></div></header>{children}</div>;
}
