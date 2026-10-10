"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { driverDelete, driverPatch, driverPost } from "@/lib/api/server";

export type DriverActionState = { message?: string; success?: string };

const value = (formData: FormData, name: string) => {
  const entry = formData.get(name);
  return typeof entry === "string" ? entry.trim() : "";
};

export async function submitDriverApplication(_state: unknown, formData: FormData) {
  const name = value(formData, "name");
  const email = value(formData, "email");
  const phone = value(formData, "phone");
  const password = value(formData, "password");
  const licenseNumber = value(formData, "licenseNumber");
  const licenseExpiry = value(formData, "licenseExpiry");
  if (!name || !email || !password || !phone || !licenseNumber) return { message: "Name, email, password, phone, and license number are required." };
  try {
    await driverPost("driver/application", { name, email, password, phone, licenseNumber, ...(licenseExpiry ? { licenseExpiry } : {}) });
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to submit your application." };
  }
  redirect("/driver-application?submitted=1");
}

export async function approveDriverApplication(_state: DriverActionState | undefined, formData: FormData): Promise<DriverActionState> {
  const id = value(formData, "id");
  if (!id) return { message: "The application ID is missing." };
  try {
    await driverPatch(`driver/application/approved/${encodeURIComponent(id)}`);
    revalidatePath("/dashboard/adminDashboard");
    return { success: "Application approved." };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to approve this application." };
  }
}

export async function rejectDriverApplication(_state: DriverActionState | undefined, formData: FormData): Promise<DriverActionState> {
  const id = value(formData, "id");
  if (!id) return { message: "The application ID is missing." };
  try {
    await driverPatch(`driver/application/reject/${encodeURIComponent(id)}`);
    revalidatePath("/dashboard/adminDashboard");
    return { success: "Application rejected." };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to reject this application." };
  }
}

export async function removeDriver(_state: DriverActionState | undefined, formData: FormData): Promise<DriverActionState> {
  const id = value(formData, "id");
  if (!id) return { message: "The driver ID is missing." };
  try {
    await driverDelete(`driver/${encodeURIComponent(id)}`);
    revalidatePath("/dashboard/adminDashboard");
    return { success: "Driver deleted." };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unable to delete this driver." };
  }
}
