// Daily schedule blocks — age-adjusted intensive plan
// Each block is a task the child should complete that day

export type BlockType = "app_quiz" | "app_warmup" | "offline_task" | "reading" | "break";

export interface ScheduleBlock {
  id: string; // stable id e.g. "morning-warmup"
  time: string; // e.g. "9:00–9:15"
  title: string;
  description: string;
  emoji: string;
  type: BlockType;
  // If this is an app quiz, link to subject so kid can tap to launch
  linkedSubject?: string;
  linkedTopics?: string[]; // suggested topics for this block
  durationMins: number;
  color: string; // for visual theming
}

export interface AgeSchedule {
  ageMin: number;
  ageMax: number;
  blocks: ScheduleBlock[];
}

// === OLDER KIDS (ages 7+) — intensive schedule ===
const OLDER_BLOCKS: ScheduleBlock[] = [
  {
    id: "morning-warmup",
    time: "9:00–9:15",
    title: "Morning Warm-up",
    description: "Mental maths + spelling dictation (10 words)",
    emoji: "🌅",
    type: "offline_task",
    durationMins: 15,
    color: "#FCD34D",
  },
  {
    id: "morning-maths",
    time: "9:15–10:00",
    title: "Maths Main Block",
    description: "Practice problems + app quiz",
    emoji: "📐",
    type: "app_quiz",
    linkedSubject: "maths",
    durationMins: 45,
    color: "#FF6B6B",
  },
  {
    id: "snack-break-1",
    time: "10:00–10:15",
    title: "Snack Break",
    description: "Get up, move around, grab a snack!",
    emoji: "🍎",
    type: "break",
    durationMins: 15,
    color: "#94A3B8",
  },
  {
    id: "morning-english",
    time: "10:15–11:00",
    title: "English Main Block",
    description: "Reading + writing + app quiz",
    emoji: "📖",
    type: "app_quiz",
    linkedSubject: "english",
    durationMins: 45,
    color: "#4ECDC4",
  },
  {
    id: "movement-break",
    time: "11:00–11:15",
    title: "Movement Break",
    description: "Jumping jacks, dancing, run around",
    emoji: "🏃",
    type: "break",
    durationMins: 15,
    color: "#94A3B8",
  },
  {
    id: "morning-science",
    time: "11:15–12:00",
    title: "Science",
    description: "Topic reading + experiment + app quiz",
    emoji: "🔬",
    type: "app_quiz",
    linkedSubject: "science",
    durationMins: 45,
    color: "#A78BFA",
  },
  {
    id: "lunch",
    time: "12:00–1:00",
    title: "Lunch",
    description: "Eat, rest, play a bit",
    emoji: "🍽️",
    type: "break",
    durationMins: 60,
    color: "#94A3B8",
  },
  {
    id: "afternoon-humanities",
    time: "1:00–1:45",
    title: "Humanities",
    description: "Mon/Wed: History · Tue/Thu: Geography · Fri: Review",
    emoji: "🌍",
    type: "app_quiz",
    linkedSubject: "history", // default, user picks what fits the day
    durationMins: 45,
    color: "#F59E0B",
  },
  {
    id: "afternoon-creative",
    time: "2:00–2:45",
    title: "Creative / Practical",
    description: "Mon: Art · Tue: Music · Wed: Coding · Thu: Design · Fri: Cooking",
    emoji: "🎨",
    type: "app_quiz",
    linkedSubject: "art",
    durationMins: 45,
    color: "#EC4899",
  },
  {
    id: "afternoon-languages",
    time: "3:00–3:30",
    title: "Languages",
    description: "French or Spanish practice in the app",
    emoji: "🌐",
    type: "app_quiz",
    linkedSubject: "languages",
    durationMins: 30,
    color: "#8B5CF6",
  },
  {
    id: "evening-app",
    time: "4:30–5:00",
    title: "App Review",
    description: "Mixed subject review · focus on weak areas",
    emoji: "📱",
    type: "app_quiz",
    durationMins: 30,
    color: "#3B82F6",
  },
  {
    id: "evening-reading",
    time: "5:00–5:30",
    title: "Shared Reading",
    description: "Read a chapter together with parent",
    emoji: "📚",
    type: "reading",
    durationMins: 30,
    color: "#10B981",
  },
];

// === YOUNGER KIDS (ages 5-6) — lighter schedule ===
const YOUNGER_BLOCKS: ScheduleBlock[] = [
  {
    id: "morning-warmup",
    time: "9:00–9:15",
    title: "Morning Warm-up",
    description: "Counting games + letter review",
    emoji: "🌅",
    type: "offline_task",
    durationMins: 15,
    color: "#FCD34D",
  },
  {
    id: "morning-maths",
    time: "9:15–9:45",
    title: "Maths Time",
    description: "Numbers, counting, blocks — then app quiz",
    emoji: "📐",
    type: "app_quiz",
    linkedSubject: "maths",
    linkedTopics: ["Addition", "Subtraction"],
    durationMins: 30,
    color: "#FF6B6B",
  },
  {
    id: "snack-break-1",
    time: "9:45–10:00",
    title: "Snack Break",
    description: "Healthy snack and a little rest",
    emoji: "🍎",
    type: "break",
    durationMins: 15,
    color: "#94A3B8",
  },
  {
    id: "morning-english",
    time: "10:00–10:30",
    title: "English Time",
    description: "Phonics + reading simple books + app",
    emoji: "📖",
    type: "app_quiz",
    linkedSubject: "english",
    linkedTopics: ["Reading", "Spelling"],
    durationMins: 30,
    color: "#4ECDC4",
  },
  {
    id: "movement-break",
    time: "10:30–10:45",
    title: "Movement Break",
    description: "Dance, jump, run outside!",
    emoji: "🏃",
    type: "break",
    durationMins: 15,
    color: "#94A3B8",
  },
  {
    id: "morning-exploration",
    time: "10:45–11:30",
    title: "Exploration",
    description: "Nature walk or simple science (sink/float, magnets)",
    emoji: "🔬",
    type: "offline_task",
    durationMins: 45,
    color: "#A78BFA",
  },
  {
    id: "lunch",
    time: "12:00–1:00",
    title: "Lunch",
    description: "Eat and rest",
    emoji: "🍽️",
    type: "break",
    durationMins: 60,
    color: "#94A3B8",
  },
  {
    id: "afternoon-stories",
    time: "1:00–1:30",
    title: "Stories & Places",
    description: "Picture books from history, simple maps",
    emoji: "🌍",
    type: "reading",
    durationMins: 30,
    color: "#F59E0B",
  },
  {
    id: "afternoon-creative",
    time: "2:00–2:45",
    title: "Creative Play",
    description: "Drawing, crafts, Lego, music",
    emoji: "🎨",
    type: "offline_task",
    durationMins: 45,
    color: "#EC4899",
  },
  {
    id: "afternoon-languages",
    time: "3:00–3:20",
    title: "Languages",
    description: "French or Spanish songs + 2-3 new words",
    emoji: "🌐",
    type: "app_quiz",
    linkedSubject: "languages",
    durationMins: 20,
    color: "#8B5CF6",
  },
  {
    id: "evening-app",
    time: "4:30–4:45",
    title: "App Review",
    description: "Pick your favourite subject!",
    emoji: "📱",
    type: "app_quiz",
    durationMins: 15,
    color: "#3B82F6",
  },
  {
    id: "evening-reading",
    time: "5:00–5:30",
    title: "Story Time",
    description: "Picture books with parent",
    emoji: "📚",
    type: "reading",
    durationMins: 30,
    color: "#10B981",
  },
];

export const AGE_SCHEDULES: AgeSchedule[] = [
  { ageMin: 5, ageMax: 6, blocks: YOUNGER_BLOCKS },
  { ageMin: 7, ageMax: 99, blocks: OLDER_BLOCKS },
];

export function getScheduleForAge(age: number): ScheduleBlock[] {
  const schedule = AGE_SCHEDULES.find(s => age >= s.ageMin && age <= s.ageMax);
  return schedule?.blocks || OLDER_BLOCKS;
}

// Day-specific override for humanities/creative subjects (weekly pattern)
export function getDayThemedBlocks(blocks: ScheduleBlock[], dayOfWeek: number): ScheduleBlock[] {
  // dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  return blocks.map(b => {
    if (b.id === "afternoon-humanities") {
      const subject = dayOfWeek === 1 || dayOfWeek === 3 ? "history" :
                      dayOfWeek === 2 || dayOfWeek === 4 ? "geography" :
                      "history";
      return { ...b, linkedSubject: subject };
    }
    if (b.id === "afternoon-creative") {
      const subject = dayOfWeek === 3 ? "computing" : "art";
      return { ...b, linkedSubject: subject };
    }
    return b;
  });
}

export const WEEKLY_THEMES: Record<number, { label: string, emoji: string }> = {
  0: { label: "Rest Day", emoji: "🛌" },
  1: { label: "Fresh Start", emoji: "💪" },
  2: { label: "Deep Dive", emoji: "🔬" },
  3: { label: "World Day", emoji: "🌐" },
  4: { label: "Creative Day", emoji: "🎨" },
  5: { label: "Challenge Day", emoji: "🧪" },
  6: { label: "Light & Free", emoji: "📚" },
};