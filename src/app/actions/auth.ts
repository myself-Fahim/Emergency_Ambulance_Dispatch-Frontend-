"use server";

import { redirect } from "next/navigation";
import { clearSession, createSession, callAuthApi } from "@/lib/auth/server";
import type { AuthActionState } from "@/lib/auth/types";

const text = (value: FormDataEntryValue | null) => typeof value === "string" ? value.trim() : "";

export async function login(_state: AuthActionState | undefined, formData: FormData): Promise<AuthActionState> {
  const email = text(formData.get("email"));
  const password = text(formData.get("password"));
  if (!email || !password) return { message: "Email and password are required." };
  try {
    await createSession(await callAuthApi("login", { email, password }));
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to sign in." };
  }
  redirect("/dashboard");
}

export async function register(_state: AuthActionState | undefined, formData: FormData): Promise<AuthActionState> {
  const name = text(formData.get("name"));
  const email = text(formData.get("email"));
  const password = text(formData.get("password"));
  const phone = text(formData.get("phone"));
  if (!name || !email || !password) return { message: "Name, email, and password are required." };
  try {
    await createSession(await callAuthApi("register", { name, email, password, ...(phone ? { phone } : {}) }));
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to create your account." };
  }
  redirect("/dashboard");
}

export async function googleLogin(credential: string): Promise<AuthActionState> {
  if (!credential) return { message: "Google did not return a credential." };
  try {
    await createSession(await callAuthApi("google", { credential, idToken: credential, token: credential }));
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to sign in with Google." };
  }
  redirect("/dashboard");
}

export async function logout() {
  await clearSession();
  redirect("/login");
}
