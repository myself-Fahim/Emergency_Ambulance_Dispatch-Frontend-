import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthResult, AuthUser } from "./types";

const backendUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");

function endpoint(path: string) {
  return `${backendUrl}/api/v1/auth/${path}`;
}

async function readResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function messageFrom(payload: unknown, fallback: string) {
  if (typeof payload === "string") return payload;
  if (payload && typeof payload === "object") {
    const value = payload as Record<string, unknown>;
    const nested = value.message ?? value.error ?? (value.data as Record<string, unknown> | undefined)?.message;
    if (Array.isArray(nested)) return nested.join(", ");
    if (typeof nested === "string") return nested;
  }
  return fallback;
}

function findString(payload: unknown, keys: string[]): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const value = payload as Record<string, unknown>;
  for (const key of keys) {
    if (typeof value[key] === "string" && value[key]) return value[key];
  }
  for (const child of Object.values(value)) {
    const result = findString(child, keys);
    if (result) return result;
  }
  return undefined;
}

function normalizeAuthResult(payload: unknown): AuthResult {
  const accessToken = findString(payload, ["accessToken", "access_token", "token"]);
  if (!accessToken) throw new Error("The authentication service did not return an access token.");
  return {
    accessToken,
    refreshToken: findString(payload, ["refreshToken", "refresh_token"]),
    user: findUser(payload),
  };
}

function findUser(payload: unknown): AuthUser | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const value = payload as Record<string, unknown>;
  for (const key of ["user", "profile", "account"]) {
    if (value[key] && typeof value[key] === "object") return value[key] as AuthUser;
  }
  for (const child of Object.values(value)) {
    const nested = findUser(child);
    if (nested) return nested;
  }
  return undefined;
}

function roleFromToken(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8")) as Record<string, unknown>;
    const role = payload.role ?? payload.roles;
    return Array.isArray(role) ? String(role[0] ?? "").toUpperCase() : typeof role === "string" ? role.toUpperCase() : undefined;
  } catch {
    return undefined;
  }
}

export async function callAuthApi(path: string, body: Record<string, unknown>) {
  if (!backendUrl) throw new Error("BACKEND_URL is not configured.");
  const response = await fetch(endpoint(path), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const payload = await readResponse(response);
  if (!response.ok) throw new Error(messageFrom(payload, "Authentication request failed."));
  return normalizeAuthResult(payload);
}

export async function createSession(result: AuthResult) {
  const store = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  store.set("access_token", result.accessToken, { ...options, maxAge: 60 * 15 });
  if (result.refreshToken) store.set("refresh_token", result.refreshToken, { ...options, maxAge: 60 * 60 * 24 * 30 });
  const role = result.user?.role?.toUpperCase() ?? roleFromToken(result.accessToken);
  if (role) store.set("session_role", role, { ...options, maxAge: 60 * 15 });
}

export async function clearSession() {
  const store = await cookies();
  store.delete("access_token");
  store.delete("refresh_token");
  store.delete("session_role");
}

export async function getAccessToken() {
  return (await cookies()).get("access_token")?.value;
}

export async function refreshSession() {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
  if (!refreshToken) return false;
  try {
    const result = await callAuthApi("refresh-token", { refreshToken });
    await createSession(result);
    return true;
  } catch {
    await clearSession();
    return false;
  }
}

export async function requireSession() {
  if (!(await getAccessToken())) redirect("/login");
}

export async function getSessionRole() {
  return (await cookies()).get("session_role")?.value?.toUpperCase();
}
