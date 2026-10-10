"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-destructive">System interruption</p><h1 className="text-3xl font-semibold tracking-tight">Something went wrong.</h1><p className="max-w-md text-muted-foreground">The emergency response workspace could not load this view.</p><Button onClick={reset}>Try again</Button></main>;
}
