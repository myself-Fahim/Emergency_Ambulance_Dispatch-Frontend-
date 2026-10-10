"use client";

import { useActionState } from "react";
import { approveDriverApplication, rejectDriverApplication, removeDriver } from "@/app/actions/driver";

export function DriverApplicationActions({ id }: { id: string }) {
  const [approveState, approveAction, approvePending] = useActionState(approveDriverApplication, undefined);
  const [rejectState, rejectAction, rejectPending] = useActionState(rejectDriverApplication, undefined);
  return <div className="space-y-2"><div className="flex gap-2"><form action={approveAction}><input type="hidden" name="id" value={id} /><button disabled={approvePending || rejectPending} className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50" type="submit">{approvePending ? "Approving…" : "Approve"}</button></form><form action={rejectAction}><input type="hidden" name="id" value={id} /><button disabled={approvePending || rejectPending} className="rounded-md bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive disabled:opacity-50" type="submit">{rejectPending ? "Rejecting…" : "Reject"}</button></form></div>{(approveState?.message || rejectState?.message || approveState?.success || rejectState?.success) && <p className={`text-xs ${approveState?.message || rejectState?.message ? "text-destructive" : "text-green-700"}`}>{approveState?.message ?? rejectState?.message ?? approveState?.success ?? rejectState?.success}</p>}</div>;
}

export function DriverDeleteAction({ id }: { id: string }) {
  const [state, action, pending] = useActionState(removeDriver, undefined);
  return <div className="space-y-2"><form action={action}><input type="hidden" name="id" value={id} /><button disabled={pending} className="rounded-md bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive disabled:opacity-50" type="submit">{pending ? "Deleting…" : "Delete"}</button></form>{(state?.message || state?.success) && <p className={`text-xs ${state.message ? "text-destructive" : "text-green-700"}`}>{state.message ?? state.success}</p>}</div>;
}
