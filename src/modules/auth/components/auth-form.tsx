"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { login, register, googleLogin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

declare global {
  interface Window { google?: { accounts: { id: { initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void; renderButton: (element: HTMLElement, options: Record<string, string>) => void } } } }
}

export function AuthForm({ googleClientId, initialMode = "login" }: { googleClientId?: string; initialMode?: "login" | "register" }) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const action = mode === "login" ? login : register;
  const [state, formAction, pending] = useActionState(action, undefined);
  const [googlePending, startGoogle] = useTransition();
  const googleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!googleClientId || !googleRef.current) return;
    const setup = () => {
      if (!window.google || !googleRef.current) return;
      window.google.accounts.id.initialize({ client_id: googleClientId, callback: ({ credential }) => startGoogle(() => { void googleLogin(credential); }) });
      googleRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleRef.current, { theme: "outline", size: "large", width: "360" });
    };
    if (window.google) setup();
    else { const script = document.createElement("script"); script.src = "https://accounts.google.com/gsi/client"; script.async = true; script.onload = setup; document.head.appendChild(script); }
  }, [googleClientId]);

  return <div className="space-y-5">
    <div className="grid grid-cols-2 rounded-lg bg-muted p-1 text-sm"><button type="button" className={`rounded-md px-3 py-2 ${mode === "login" ? "bg-background shadow-sm" : "text-muted-foreground"}`} onClick={() => setMode("login")}>Sign in</button><button type="button" className={`rounded-md px-3 py-2 ${mode === "register" ? "bg-background shadow-sm" : "text-muted-foreground"}`} onClick={() => setMode("register")}>Create account</button></div>
    <form action={formAction} className="space-y-4">
      {mode === "register" && <label className="block text-sm font-medium">Full name<input name="name" required className="mt-1 w-full rounded-lg border bg-background px-3 py-2" autoComplete="name" /></label>}
      {mode === "register" && <label className="block text-sm font-medium">Phone <span className="font-normal text-muted-foreground">(optional)</span><input name="phone" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" autoComplete="tel" /></label>}
      <label className="block text-sm font-medium">Email<input name="email" type="email" required className="mt-1 w-full rounded-lg border bg-background px-3 py-2" autoComplete="email" /></label>
      <label className="block text-sm font-medium">Password<input name="password" type="password" required minLength={6} className="mt-1 w-full rounded-lg border bg-background px-3 py-2" autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
      {state?.message && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.message}</p>}
      <Button type="submit" className="w-full" disabled={pending}>{pending ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</Button>
    </form>
    {googleClientId && <><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div><div ref={googleRef} className={googlePending ? "pointer-events-none opacity-50" : "flex justify-center"} /></>}
  </div>;
}
