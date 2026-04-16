"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SUBJECTS, DIFFICULTY_LEVELS, type Child } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { ALL_OBJECTIVES, computeObjectiveProgress, summariseSubject, type CurriculumObjective, type ObjectiveProgress } from "@/lib/curriculum";
import { getAllTopicProgress, type TopicProgressRecord } from "@/lib/db";

const PARENT_PIN = process.env.NEXT_PUBLIC_PARENT_PIN || "1234";

const formatDate = (d: string) => {
  const opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  return new Date(d).toLocaleDateString("en-GB", opts);
};

export default function ParentDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [childData, setChildData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [expandedChild, setExpandedChild] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [pastDays, setPastDays] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"daily" | "curriculum">("daily");
  const [topicProgressByChild, setTopicProgressByChild] = useState<Record<string, TopicProgressRecord[]>>({});
  const [curriculumChildId, setCurriculumChildId] = useState<string | null>(null);
  const [curriculumSubject, setCurriculumSubject] = useState<"maths" | "english">("maths");
  const [curriculumStageFilter, setCurriculumStageFilter] = useState<"all" | "KS1" | "KS2" | "KS3" | "GCSE">("all");

  useEffect(() => {
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    setPastDays(days);
  }, []);

  useEffect(() => {
    if (authed) loadAll();
  }, [authed]);

  useEffect(() => {
    if (authed && children.length > 0) loadDailyData();
  }, [selectedDate]);

  const tryPin = () => {
    if (pinInput === PARENT_PIN) {
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1000);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("children").select("*").order("created_at", { ascending: true });
      const kids = (data || []) as Child[];
      setChildren(kids);
      if (kids.length > 0 && !curriculumChildId) setCurriculumChildId(kids[0].id);
      await loadDailyDataForChildren(kids);
      await loadTopicProgressForChildren(kids);
    } catch {}
    setLoading(false);
    setLastRefresh(new Date());
  };

  const loadTopicProgressForChildren = async (kids: Child[]) => {
    const map: Record<string, TopicProgressRecord[]> = {};
    for (const child of kids) {
      map[child.id] = await getAllTopicProgress(child.id);
    }
    setTopicProgressByChild(map);
  };

  const loadDailyData = async () => loadDailyDataForChildren(children);

  const loadDailyDataForChildren = async (kids: Child[]) => {
    const data: Record<string, any> = {};
    for (const child of kids) {
      const { data: dp } = await supabase.from("daily_progress").select("*").eq("child_id", child.id).eq("date", selectedDate).maybeSingle();
      data[child.id] = { daily: dp };
    }
    setChildData(data);
  };

  const refresh = async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  };

  const getAccuracy = (correct: number, total: number) => (!total ? 0 : Math.round((correct / total) * 100));

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: "Outstanding", color: "#10B981", emoji: "🌟" };
    if (pct >= 70) return { label: "Great", color: "#3B82F6", emoji: "⭐" };
    if (pct >= 50) return { label: "Good effort", color: "#F59E0B", emoji: "👍" };
    if (pct > 0) return { label: "Needs practice", color: "#F97316", emoji: "💪" };
    return { label: "No activity", color: "#6B7280", emoji: "😴" };
  };

  const isToday = selectedDate === new Date().toISOString().split("T")[0];
  const dayLabel = isToday ? "Today" : formatDate(selectedDate);

  // PIN gate
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #0f0c29 0%, #302b63 100%)", padding: 20, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", borderRadius: 24, padding: 36, maxWidth: 380, width: "100%", border: "1px solid rgba(255,255,255,0.12)", color: "white", animation: pinError ? "shake 0.3s ease" : "none" }}>
          <div style={{ fontSize: 56, textAlign: "center", marginBottom: 12 }}>🔒</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, textAlign: "center", margin: "0 0 8px" }}>Parent Access</h2>
          <p style={{ opacity: 0.7, textAlign: "center", fontSize: 14, marginTop: 0 }}>Enter PIN to view dashboard</p>
          <input
            type="password" inputMode="numeric" value={pinInput}
            onChange={e => setPinInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && tryPin()}
            placeholder="••••" maxLength={6}
            style={{ width: "100%", padding: "16px 20px", fontSize: 24, textAlign: "center", borderRadius: 16, border: pinError ? "2px solid #EF4444" : "2px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "white", letterSpacing: 8, marginTop: 16 }}
          />
          {pinError && <p style={{ color: "#EF4444", fontSize: 13, textAlign: "center", marginBottom: 0 }}>Incorrect PIN</p>}
          <button onClick={tryPin} className="btn-hover" style={{ width: "100%", padding: 14, fontSize: 16, fontWeight: 700, border: "none", borderRadius: 14, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", cursor: "pointer", marginTop: 16 }}>
            Unlock →
          </button>
          <Link href="/" style={{ display: "block", textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>← Back home</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 40, animation: "spin 1s linear infinite" }}>📊</div>
        <p style={{ marginTop: 16, opacity: 0.6 }}>Loading dashboard...</p>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", padding: 20 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", margin: "0 0 8px", color: "#1e293b" }}>No Learners Yet</h2>
        <p style={{ color: "#64748b", maxWidth: 340, textAlign: "center", lineHeight: 1.6 }}>
          Your kids need to open the <strong>Homeschooling</strong> app and create a profile first. Their progress will appear here automatically.
        </p>
        <button onClick={refresh} style={{ marginTop: 20, padding: "14px 36px", borderRadius: 14, border: "none", background: "#4f46e5", color: "white", cursor: "pointer", fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f0f4ff 0%, #fafbff 40%, #f8fafc 100%)", fontFamily: "'Inter', sans-serif", padding: "0 0 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 32px) 16px", background: "white", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 800, color: "#1e293b", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>👨‍👩‍👧‍👦</span> Parent Dashboard
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b", fontWeight: 500 }}>Homeschooling Progress Monitor</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={refresh} className="refresh-btn" style={{ padding: "10px 20px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#475569", cursor: "pointer", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
            <span style={{ display: "inline-block", transition: "transform 0.3s", transform: refreshing ? "rotate(360deg)" : "none" }}>🔄</span>
            {refreshing ? " Refreshing..." : " Refresh"}
          </button>
          <button onClick={() => { setAuthed(false); setPinInput(""); }} style={{ padding: "10px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "white", color: "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
            🔒 Lock
          </button>
        </div>
      </div>

      {lastRefresh && <p style={{ textAlign: "right", padding: "8px clamp(16px, 4vw, 32px) 0", fontSize: 12, color: "#94a3b8", margin: 0 }}>Last updated: {lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>}

      {/* TAB SWITCHER */}
      <div style={{ display: "flex", gap: 8, padding: "8px clamp(16px, 4vw, 32px) 0", borderBottom: "1px solid #e2e8f0", background: "white" }}>
        <button
          onClick={() => setActiveTab("daily")}
          style={{
            padding: "12px 20px", border: "none", background: "transparent", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
            color: activeTab === "daily" ? "#4f46e5" : "#64748b",
            borderBottom: activeTab === "daily" ? "3px solid #4f46e5" : "3px solid transparent",
            marginBottom: -1,
          }}
        >📅 Daily Summary</button>
        <button
          onClick={() => setActiveTab("curriculum")}
          style={{
            padding: "12px 20px", border: "none", background: "transparent", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
            color: activeTab === "curriculum" ? "#4f46e5" : "#64748b",
            borderBottom: activeTab === "curriculum" ? "3px solid #4f46e5" : "3px solid transparent",
            marginBottom: -1,
          }}
        >🎯 Curriculum Progress</button>
      </div>

      {/* CURRICULUM TAB */}
      {activeTab === "curriculum" && (() => {
        const child = children.find(c => c.id === curriculumChildId) || children[0];
        if (!child) return null;
        const childTopics = topicProgressByChild[child.id] || [];

        // Map topic progress into a lookup
        const topicLookup: Record<string, TopicProgressRecord> = {};
        childTopics.forEach(t => { topicLookup[`${t.subject}::${t.topic}`] = t; });

        // Filter objectives to selected subject
        let subjectObjectives = ALL_OBJECTIVES.filter(o => o.subject === curriculumSubject);
        if (curriculumStageFilter !== "all") {
          subjectObjectives = subjectObjectives.filter(o => o.keyStage === curriculumStageFilter);
        }

        // Compute progress for each objective
        const progress: ObjectiveProgress[] = subjectObjectives.map(obj => {
          const t = topicLookup[`${obj.subject}::${obj.topic}`];
          return computeObjectiveProgress(obj, t?.attempts || 0, t?.correct || 0, child.level);
        });

        // Overall subject summary
        const allSubjectProgress: ObjectiveProgress[] = ALL_OBJECTIVES
          .filter(o => o.subject === curriculumSubject)
          .map(obj => {
            const t = topicLookup[`${obj.subject}::${obj.topic}`];
            return computeObjectiveProgress(obj, t?.attempts || 0, t?.correct || 0, child.level);
          });
        const summary = summariseSubject(curriculumSubject, allSubjectProgress);

        // Group by key stage for display
        const byStage: Record<string, ObjectiveProgress[]> = { KS1: [], KS2: [], KS3: [], GCSE: [] };
        progress.forEach(p => byStage[p.objective.keyStage].push(p));

        return (
          <div style={{ padding: "20px clamp(16px, 4vw, 32px)" }}>
            {/* Child selector */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#475569", margin: "0 0 10px", fontWeight: 600 }}>👤 Select Child</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {children.map(c => (
                  <button key={c.id} onClick={() => setCurriculumChildId(c.id)}
                    style={{
                      padding: "10px 16px", borderRadius: 12, cursor: "pointer",
                      background: curriculumChildId === c.id ? "#4f46e5" : "white",
                      color: curriculumChildId === c.id ? "white" : "#334155",
                      border: curriculumChildId === c.id ? "2px solid #4f46e5" : "2px solid #e2e8f0",
                      fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                    <span style={{ fontSize: 18 }}>{c.avatar}</span>
                    {c.name} <span style={{ opacity: 0.7, fontSize: 12 }}>(Age {c.age})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject selector */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#475569", margin: "0 0 10px", fontWeight: 600 }}>📚 Subject</h3>
              <div style={{ display: "flex", gap: 8 }}>
                {(["maths", "english"] as const).map(s => (
                  <button key={s} onClick={() => setCurriculumSubject(s)}
                    style={{
                      padding: "10px 20px", borderRadius: 12, cursor: "pointer",
                      background: curriculumSubject === s ? SUBJECTS[s].color : "white",
                      color: curriculumSubject === s ? "white" : "#334155",
                      border: curriculumSubject === s ? `2px solid ${SUBJECTS[s].color}` : "2px solid #e2e8f0",
                      fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
                    }}>
                    {SUBJECTS[s].icon} {SUBJECTS[s].name}
                  </button>
                ))}
              </div>
            </div>

            {/* GCSE readiness summary card */}
            <div style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              borderRadius: 20, padding: 24, color: "white", marginBottom: 20,
              boxShadow: "0 8px 24px rgba(79, 70, 229, 0.25)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, opacity: 0.9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{child.name}'s {SUBJECTS[curriculumSubject].name} Path</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, marginTop: 4 }}>
                    {summary.percentComplete}% of curriculum mastered
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>
                    {summary.mastered} mastered · {summary.inProgress} in progress · {summary.notStarted} not started
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: 140 }}>
                  <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>🎓 GCSE Ready</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                    {summary.gcsePercent}%
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>
                    {summary.gcseMastered} / {summary.gcseTotal} objectives
                  </div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, height: 10, overflow: "hidden", marginTop: 16 }}>
                <div style={{ height: "100%", width: `${summary.percentComplete}%`, background: "white", borderRadius: 8, transition: "width 1s ease" }} />
              </div>
            </div>

            {/* Stage filter */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#475569", margin: "0 0 10px", fontWeight: 600 }}>🎯 Filter by Stage</h3>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(["all", "KS1", "KS2", "KS3", "GCSE"] as const).map(s => (
                  <button key={s} onClick={() => setCurriculumStageFilter(s)}
                    style={{
                      padding: "8px 14px", borderRadius: 10, cursor: "pointer",
                      background: curriculumStageFilter === s ? "#1e293b" : "white",
                      color: curriculumStageFilter === s ? "white" : "#475569",
                      border: curriculumStageFilter === s ? "2px solid #1e293b" : "2px solid #e2e8f0",
                      fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700,
                    }}>
                    {s === "all" ? "All Stages" : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Objectives list grouped by stage */}
            {(["KS1", "KS2", "KS3", "GCSE"] as const).map(stage => {
              const stageObjs = byStage[stage];
              if (stageObjs.length === 0) return null;
              const stageMastered = stageObjs.filter(p => p.status === "mastered").length;
              const stageTotal = stageObjs.length;
              const stagePct = stageTotal > 0 ? Math.round((stageMastered / stageTotal) * 100) : 0;

              const stageLabels: Record<string, { title: string, desc: string, color: string }> = {
                KS1: { title: "Key Stage 1", desc: "Ages 5-7 · Years 1-2", color: "#10B981" },
                KS2: { title: "Key Stage 2", desc: "Ages 7-11 · Years 3-6", color: "#3B82F6" },
                KS3: { title: "Key Stage 3", desc: "Ages 11-14 · Years 7-9", color: "#F59E0B" },
                GCSE: { title: "GCSE", desc: "Ages 14-16 · Years 10-11", color: "#EF4444" },
              };
              const sl = stageLabels[stage];

              return (
                <div key={stage} style={{ marginBottom: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", background: "#fafbff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 4, background: sl.color }} />
                        <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 800, color: "#1e293b", margin: 0 }}>{sl.title}</h4>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2, fontWeight: 500, marginLeft: 18 }}>{sl.desc}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: sl.color }}>{stagePct}%</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{stageMastered}/{stageTotal} mastered</div>
                    </div>
                  </div>
                  <div>
                    {stageObjs.map(p => {
                      const statusInfo = {
                        mastered: { emoji: "✅", color: "#10B981", label: "Mastered", bg: "#ecfdf5" },
                        in_progress: { emoji: "🔄", color: "#F59E0B", label: "In Progress", bg: "#fffbeb" },
                        not_started: { emoji: "⏸️", color: "#94a3b8", label: "Not Started", bg: "#f8fafc" },
                      }[p.status];
                      const accPct = Math.round(p.accuracy * 100);
                      return (
                        <div key={p.objective.id} style={{ padding: "12px 18px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontSize: 14, color: "#1e293b", fontWeight: 600, marginBottom: 2 }}>{p.objective.description}</div>
                            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                              {p.objective.topic} · Year {p.objective.yearGroup} · Level {p.objective.level}
                              {p.objective.examBoard !== "National" && ` · ${p.objective.examBoard}`}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {p.attempts > 0 && (
                              <div style={{ textAlign: "right", fontSize: 11, color: "#64748b", fontWeight: 600 }}>
                                <div>{p.attempts} attempts</div>
                                <div>{accPct}% accuracy</div>
                              </div>
                            )}
                            <div style={{ padding: "6px 12px", borderRadius: 10, background: statusInfo.bg, color: statusInfo.color, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                              <span>{statusInfo.emoji}</span>{statusInfo.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ textAlign: "center", padding: "16px 20px", fontSize: 12, color: "#94a3b8" }}>
              <p style={{ margin: 0 }}>Objective mastery = 5+ attempts at required level with ≥ 80% accuracy</p>
              <p style={{ margin: "4px 0 0" }}>Based on UK National Curriculum + GCSE (AQA & Edexcel)</p>
            </div>
          </div>
        );
      })()}

      {/* DAILY TAB — original content only shows when tab is daily */}
      {activeTab === "daily" && <>
      <div style={{ padding: "16px clamp(16px, 4vw, 32px)" }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#475569", margin: "0 0 10px", fontWeight: 600 }}>📅 Select Day</h3>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {pastDays.map((day, i) => {
            const d = new Date(day);
            const isSelected = day === selectedDate;
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return (
              <button key={day} onClick={() => setSelectedDate(day)} className="day-btn" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 16px", borderRadius: 14, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s", minWidth: 64, flexShrink: 0, background: isSelected ? "#4f46e5" : "white", color: isSelected ? "white" : "#334155", border: isSelected ? "2px solid #4f46e5" : "2px solid #e2e8f0", animation: `fadeIn 0.3s ease ${i * 0.04}s both` }}>
                <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>{i === 0 ? "Today" : i === 1 ? "Yesterday" : dayNames[d.getDay()]}</span>
                <span style={{ fontSize: 18, fontWeight: 800 }}>{d.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "8px clamp(16px, 4vw, 32px) 12px" }}>
        <h3 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 18, color: "#1e293b" }}>📋 {dayLabel} — Daily Summary</h3>
      </div>

      {children.map((child, ci) => {
        const data = childData[child.id] || {};
        const daily = data.daily;
        const isExpanded = expandedChild === child.id;
        const accuracy = daily ? getAccuracy(daily.total_correct, daily.total_questions) : 0;
        const grade = daily ? getGrade(accuracy) : getGrade(0);
        const levelInfo = DIFFICULTY_LEVELS[child.level] || DIFFICULTY_LEVELS[1];
        const subjectCount = daily?.subjects ? Object.keys(daily.subjects).length : 0;

        return (
          <div key={child.id} className="child-card" style={{ margin: "0 clamp(12px, 3vw, 32px) 16px", background: "white", borderRadius: 20, border: "1px solid #e8ecf1", overflow: "hidden", transition: "all 0.3s", animation: `fadeIn 0.4s ease ${ci * 0.1}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px", cursor: "pointer", flexWrap: "wrap", gap: 12 }} onClick={() => setExpandedChild(isExpanded ? null : child.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 40 }}>{child.avatar}</span>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: "#1e293b", margin: 0 }}>{child.name}</h3>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2, fontWeight: 500 }}>Age {child.age} · {levelInfo.emoji} {levelInfo.name} · {child.total_xp || 0} XP</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 6, background: `${grade.color}18`, color: grade.color, border: `1.5px solid ${grade.color}33` }}>
                  {grade.emoji} {grade.label}
                </div>
                <span style={{ fontSize: 18, opacity: 0.4, cursor: "pointer" }}>{isExpanded ? "▲" : "▼"}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 2, padding: "0 12px 12px", overflowX: "auto" }}>
              <div style={{ flex: 1, minWidth: 60, textAlign: "center", padding: "12px 6px", background: "#f8fafc", borderRadius: 14, margin: "0 2px" }}>
                <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 900, color: "#4f46e5" }}>{daily?.total_questions || 0}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>Questions</div>
              </div>
              <div style={{ flex: 1, minWidth: 60, textAlign: "center", padding: "12px 6px", background: "#f8fafc", borderRadius: 14, margin: "0 2px" }}>
                <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 900, color: "#10B981" }}>{daily?.total_correct || 0}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>Correct</div>
              </div>
              <div style={{ flex: 1, minWidth: 60, textAlign: "center", padding: "12px 6px", background: "#f8fafc", borderRadius: 14, margin: "0 2px" }}>
                <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 900, color: accuracy >= 70 ? "#10B981" : accuracy >= 50 ? "#F59E0B" : "#EF4444" }}>{accuracy}%</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>Accuracy</div>
              </div>
              <div style={{ flex: 1, minWidth: 60, textAlign: "center", padding: "12px 6px", background: "#f8fafc", borderRadius: 14, margin: "0 2px" }}>
                <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 900, color: "#8B5CF6" }}>{subjectCount}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>Subjects</div>
              </div>
              <div style={{ flex: 1, minWidth: 60, textAlign: "center", padding: "12px 6px", background: "#f8fafc", borderRadius: 14, margin: "0 2px" }}>
                <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 900, color: "#F59E0B" }}>{daily?.xp || 0}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>XP Earned</div>
              </div>
            </div>

            {daily && daily.total_questions > 0 && (
              <div style={{ padding: "0 20px 16px" }}>
                <div style={{ background: "#f1f5f9", borderRadius: 8, height: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 8, transition: "width 1s ease", width: `${accuracy}%`, background: accuracy >= 70 ? "linear-gradient(90deg, #10B981, #34D399)" : accuracy >= 50 ? "linear-gradient(90deg, #F59E0B, #FBBF24)" : "linear-gradient(90deg, #EF4444, #F87171)" }} />
                </div>
              </div>
            )}

            {(!daily || daily.total_questions === 0) && (
              <div style={{ textAlign: "center", padding: "20px 20px 24px" }}>
                <span style={{ fontSize: 24 }}>😴</span>
                <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 14 }}>{isToday ? `${child.name} hasn't started learning yet today` : `No activity recorded on this day`}</p>
              </div>
            )}

            {isExpanded && daily?.subjects && Object.keys(daily.subjects).length > 0 && (
              <div style={{ padding: "0 20px 16px", animation: "fadeIn 0.3s ease" }}>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#334155", margin: "8px 0 12px", fontWeight: 700, borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>Subject Breakdown</h4>
                {Object.entries(daily.subjects).map(([subKey, subData]: any) => {
                  const subj = SUBJECTS[subKey];
                  if (!subj) return null;
                  const subAcc = getAccuracy(subData.correct, subData.questions);
                  return (
                    <div key={subKey} className="subject-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 14, marginBottom: 6, transition: "background 0.2s", border: "1px solid #f1f5f9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: `${subj.color}18` }}>{subj.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{subj.name}</div>
                          <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{subData.correct}/{subData.questions} correct</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 80 }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: subAcc >= 70 ? "#10B981" : subAcc >= 50 ? "#F59E0B" : "#EF4444" }}>{subAcc}%</div>
                        <div style={{ width: 80, height: 5, background: "#f1f5f9", borderRadius: 4, marginTop: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 4, transition: "width 0.5s", width: `${subAcc}%`, background: subAcc >= 70 ? "#10B981" : subAcc >= 50 ? "#F59E0B" : "#EF4444" }} />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {Object.entries(daily.subjects).map(([subKey, subData]: any) => {
                  const subj = SUBJECTS[subKey];
                  if (!subj || !subData.topics) return null;
                  return (
                    <div key={`topics-${subKey}`} style={{ marginTop: 12 }}>
                      <h5 style={{ fontSize: 13, color: "#64748b", fontWeight: 700, margin: "0 0 8px" }}>{subj.icon} {subj.name} — Topics</h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                        {Object.entries(subData.topics).map(([topicName, topicData]: any) => {
                          const topicAcc = getAccuracy(topicData.correct, topicData.questions);
                          return (
                            <div key={topicName} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #f1f5f9" }}>
                              <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>{topicName}</span>
                              <span style={{ fontSize: 13, fontWeight: 800, color: topicAcc >= 70 ? "#10B981" : topicAcc >= 50 ? "#F59E0B" : "#EF4444" }}>{topicData.correct}/{topicData.questions}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {daily?.subjects && Object.keys(daily.subjects).length > 0 && (
              <div onClick={() => setExpandedChild(isExpanded ? null : child.id)} style={{ textAlign: "center", padding: "12px 20px", fontSize: 13, color: "#818cf8", fontWeight: 600, cursor: "pointer", borderTop: "1px solid #f1f5f9" }}>
                {isExpanded ? "Hide details ▲" : "Tap to see subject breakdown ▼"}
              </div>
            )}
          </div>
        );
      })}
      </>}

      <div style={{ textAlign: "center", padding: "32px 20px 16px" }}>
        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Homeschooling — Parent Dashboard</p>
      </div>
    </div>
  );
}