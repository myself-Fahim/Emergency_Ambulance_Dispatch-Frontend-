"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-12"><h1 className="text-2xl font-semibold">Dashboard unavailable</h1><p className="text-muted-foreground">Please retry this dashboard view.</p><Button className="w-fit" onClick={reset}>Retry</Button></div>;
}
