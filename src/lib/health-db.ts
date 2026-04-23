"use server";

import { createClient } from "@/lib/supabase/server";

// Health data
export async function getHealthData(userId: string, limit = 100) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("health_data")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

export async function insertHealthData(userId: string, record: Record<string, unknown>): Promise<any> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("health_data")
    .insert({ ...record, user_id: userId } as any)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Reminders
export async function getReminders(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function insertReminder(userId: string, record: Record<string, unknown>): Promise<any> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reminders")
    .insert({ ...record, user_id: userId } as any)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Doctors
export async function getDoctors() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("doctors").select("*");
  if (error) throw error;
  return data || [];
}

// Documents
export async function getDocuments(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function insertDocument(userId: string, record: Record<string, unknown>): Promise<any> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .insert({ ...record, user_id: userId } as any)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Access logs
export async function insertAccessLog(record: Record<string, unknown>) {
  const supabase = await createClient();
  await supabase.from("access_logs").insert(record as any);
}
