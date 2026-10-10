import type { ReactNode } from "react";
import { SiteNavbar } from "@/components/site-navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-muted/30"><SiteNavbar /><main className="flex flex-1 items-center justify-center px-6 py-12">{children}</main></div>;
}
