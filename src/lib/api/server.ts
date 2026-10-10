import { getAccessToken, refreshSession } from "@/lib/auth/server";

const backendUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}

async function readPayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try { return JSON.parse(text); } catch { return text; }
}

function messageFrom(payload: unknown) {
  if (typeof payload === "string") return payload;
  if (payload && typeof payload === "object") {
    const value = payload as Record<string, unknown>;
    const message = value.message ?? value.error ?? (value.data as Record<string, unknown> | undefined)?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
  }
  return "The request could not be completed.";
}

export async function driverApi(path: string, init: RequestInit = {}, retry = true): Promise<unknown> {
  const token = await getAccessToken();
  if (!backendUrl) throw new ApiError("BACKEND_URL is not configured.", 500);
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${backendUrl}/api/v1/${path.replace(/^\//, "")}`, { ...init, headers, cache: "no-store" });
  const payload = await readPayload(response);
  if (response.status === 401 && retry && await refreshSession()) return driverApi(path, init, false);
  if (!response.ok) throw new ApiError(messageFrom(payload), response.status);
  return payload;
}

export const driverGet = (path: string) => driverApi(path);
export const driverPost = (path: string, body: Record<string, unknown>) => driverApi(path, { method: "POST", body: JSON.stringify(body) });
export const driverPatch = (path: string, body: Record<string, unknown> = {}) => driverApi(path, { method: "PATCH", body: JSON.stringify(body) });
export const driverDelete = (path: string) => driverApi(path, { method: "DELETE" });
