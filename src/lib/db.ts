import { supabase } from "./supabase";
import type { Child, DailyProgress } from "./constants";

const todayDate = () => new Date().toISOString().split("T")[0];

// Children
export async function getAllChildren(): Promise<Child[]> {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) { console.error(error); return []; }
  return (data || []) as Child[];
}

export async function createChild(child: Omit<Child, "id" | "total_xp" | "level"> & { level?: number }): Promise<Child | null> {
  const { data, error } = await supabase
    .from("children")
    .insert({
      name: child.name,
      age: child.age,
      avatar: child.avatar,
      level: child.level || 1,
      total_xp: 0,
    })
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data as Child;
}

export async function updateChildXP(childId: string, newTotalXP: number, newLevel: number) {
  const { error } = await supabase
    .from("children")
    .update({ total_xp: newTotalXP, level: newLevel, updated_at: new Date().toISOString() })
    .eq("id", childId);
  if (error) console.error(error);
}

// Daily progress
export async function getDailyProgress(childId: string, date?: string): Promise<DailyProgress | null> {
  const d = date || todayDate();
  const { data, error } = await supabase
    .from("daily_progress")
    .select("*")
    .eq("child_id", childId)
    .eq("date", d)
    .maybeSingle();
  if (error) { console.error(error); return null; }
  if (!data) return null;
  return {
    total_questions: data.total_questions,
    total_correct: data.total_correct,
    xp: data.xp,
    subjects: data.subjects || {},
  };
}

export async function upsertDailyProgress(childId: string, dp: DailyProgress) {
  const { error } = await supabase
    .from("daily_progress")
    .upsert({
      child_id: childId,
      date: todayDate(),
      total_questions: dp.total_questions,
      total_correct: dp.total_correct,
      xp: dp.xp,
      subjects: dp.subjects,
      updated_at: new Date().toISOString(),
    }, { onConflict: "child_id,date" });
  if (error) console.error(error);
}

// Topic progress (cumulative)
export async function incrementTopicProgress(
  childId: string, subject: string, topic: string, correct: boolean, streak: number
) {
  const { data: existing } = await supabase
    .from("topic_progress")
    .select("*")
    .eq("child_id", childId)
    .eq("subject", subject)
    .eq("topic", topic)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("topic_progress")
      .update({
        attempts: existing.attempts + 1,
        correct: existing.correct + (correct ? 1 : 0),
        best_streak: Math.max(existing.best_streak, streak),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("topic_progress").insert({
      child_id: childId,
      subject,
      topic,
      attempts: 1,
      correct: correct ? 1 : 0,
      best_streak: streak,
    });
  }
}

// Fetch all topic_progress records for a child - used by curriculum tracker
export interface TopicProgressRecord {
  subject: string;
  topic: string;
  attempts: number;
  correct: number;
  best_streak: number;
}

export async function getAllTopicProgress(childId: string): Promise<TopicProgressRecord[]> {
  const { data, error } = await supabase
    .from("topic_progress")
    .select("subject, topic, attempts, correct, best_streak")
    .eq("child_id", childId);
  if (error) { console.error(error); return []; }
  return (data || []) as TopicProgressRecord[];
}