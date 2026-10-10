"use client";

import { useActionState } from "react";
import { submitDriverApplication } from "@/app/actions/driver";

export function DriverApplicationForm() {
  const [state, action, pending] = useActionState(submitDriverApplication, undefined);
  return <form action={action} className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Full name<input required name="name" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" /></label><label className="text-sm font-medium">Email<input required type="email" name="email" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" /></label><label className="text-sm font-medium">Password<input required type="password" name="password" minLength={6} autoComplete="new-password" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" /></label><label className="text-sm font-medium">Phone<input required name="phone" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" /></label><label className="text-sm font-medium">License number<input required name="licenseNumber" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" /></label><label className="text-sm font-medium">License expiry <span className="font-normal text-muted-foreground">(optional)</span><input type="date" name="licenseExpiry" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" /></label>{state?.message && <p className="sm:col-span-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.message}</p>}<button disabled={pending} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50 sm:col-span-2" type="submit">{pending ? "Submitting…" : "Submit application"}</button></form>;
}
