import type { ReactNode } from "react";
import { SiteNavbar } from "@/components/site-navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col"><SiteNavbar />{children}</div>;
}
