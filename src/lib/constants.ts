export type Subject = {
  icon: string;
  color: string;
  gradient: string;
  name: string;
  topics: string[];
};

export const SUBJECTS: Record<string, Subject> = {
  maths: {
    icon: "🔢",
    color: "#FF6B6B",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    name: "Maths",
    topics: ["Addition", "Subtraction", "Multiplication", "Division", "Fractions", "Decimals", "Algebra Basics", "Geometry", "Percentages", "Ratios"],
  },
  english: {
    icon: "📚",
    color: "#4ECDC4",
    gradient: "linear-gradient(135deg, #4ECDC4, #6EE7DF)",
    name: "English",
    topics: ["Reading", "Spelling", "Grammar", "Punctuation", "Vocabulary", "Creative Writing", "Comprehension", "Poetry", "Shakespeare Intro", "Essay Skills"],
  },
  science: {
    icon: "🔬",
    color: "#A78BFA",
    gradient: "linear-gradient(135deg, #A78BFA, #C4B5FD)",
    name: "Science",
    topics: ["Living Things", "Materials", "Forces", "Light & Sound", "Electricity", "Earth & Space", "Human Body", "Plants", "Chemical Reactions", "Energy"],
  },
  history: {
    icon: "🏰",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)",
    name: "History",
    topics: ["Ancient Egypt", "Romans", "Vikings", "Tudors", "Victorians", "World War I", "World War II", "Medieval Britain", "Ancient Greece", "Industrial Revolution"],
  },
  geography: {
    icon: "🌍",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #34D399)",
    name: "Geography",
    topics: ["Continents", "Rivers", "Mountains", "Weather", "Maps", "Volcanoes", "Ecosystems", "Population", "Resources", "Climate Change"],
  },
  computing: {
    icon: "💻",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
    name: "Computing",
    topics: ["Algorithms", "Coding Basics", "Internet Safety", "Data", "Networks", "Binary", "Web Design", "Spreadsheets", "Databases", "Programming"],
  },
  languages: {
    icon: "🗣️",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #F472B6)",
    name: "Languages",
    topics: ["French Greetings", "French Numbers", "French Animals", "French Family", "Spanish Greetings", "Spanish Numbers", "Spanish Colours", "Sentence Building", "Vocabulary Games", "Conversation"],
  },
  art: {
    icon: "🎨",
    color: "#F97316",
    gradient: "linear-gradient(135deg, #F97316, #FB923C)",
    name: "Art & Design",
    topics: ["Colours", "Shapes", "Famous Artists", "Drawing", "Patterns", "Sculpture", "Photography", "Printmaking", "Textiles", "Art History"],
  },
};

export const DIFFICULTY_LEVELS: Record<number, { name: string; emoji: string; minAge: number; color: string }> = {
  1: { name: "Explorer", emoji: "🌱", minAge: 5, color: "#10B981" },
  2: { name: "Adventurer", emoji: "⚡", minAge: 6, color: "#3B82F6" },
  3: { name: "Champion", emoji: "🔥", minAge: 7, color: "#F59E0B" },
  4: { name: "Master", emoji: "👑", minAge: 8, color: "#A78BFA" },
  5: { name: "Legend", emoji: "🏆", minAge: 9, color: "#EC4899" },
  6: { name: "GCSE Ready", emoji: "🎓", minAge: 10, color: "#FF6B6B" },
};

export const AVATARS = ["🦁", "🦊", "🐼", "🦄", "🐉", "🦋", "🐬", "🦜", "🐸", "🦉", "🐯", "🐨"];

export type Child = {
  id: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  total_xp: number;
};

export type DailyProgress = {
  total_questions: number;
  total_correct: number;
  xp: number;
  subjects: Record<string, {
    questions: number;
    correct: number;
    topics: Record<string, { questions: number; correct: number }>;
  }>;
};
