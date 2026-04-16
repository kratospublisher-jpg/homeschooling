"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SUBJECTS, DIFFICULTY_LEVELS, AVATARS, type Child, type DailyProgress } from "@/lib/constants";
import { generateQuestion, ENCOURAGEMENTS, WRONG_ENCOURAGEMENTS, type Question } from "@/lib/questions";
import { getAllChildren, createChild, getDailyProgress, upsertDailyProgress, updateChildXP, incrementTopicProgress } from "@/lib/db";

export default function KidsApp() {
  const [screen, setScreen] = useState<string>("splash");
  const [children, setChildren] = useState<Child[]>([]);
  const [currentChild, setCurrentChild] = useState<Child | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [xpAnimation, setXpAnimation] = useState(false);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [setupStep, setSetupStep] = useState(0);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState(7);
  const [newChildAvatar, setNewChildAvatar] = useState("🦁");
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({ total_questions: 0, total_correct: 0, xp: 0, subjects: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const kids = await getAllChildren();
      setChildren(kids);
      setScreen(kids.length > 0 ? "selectChild" : "setup");
    } catch {
      setScreen("setup");
    }
    setLoading(false);
  };

  const addChild = async () => {
    if (!newChildName.trim()) return;
    const level = newChildAge <= 6 ? 1 : newChildAge <= 7 ? 2 : newChildAge <= 8 ? 3 : newChildAge <= 9 ? 4 : 5;
    const newChild = await createChild({
      name: newChildName.trim(),
      age: newChildAge,
      avatar: newChildAvatar,
      level,
    });
    if (newChild) {
      const updated = [...children, newChild];
      setChildren(updated);
    }
    setNewChildName(""); setNewChildAge(7); setNewChildAvatar("🦁"); setSetupStep(0);
    setScreen("selectChild");
  };

  const selectChild = async (child: Child) => {
    setCurrentChild(child);
    const dp = await getDailyProgress(child.id);
    setDailyProgress(dp || { total_questions: 0, total_correct: 0, xp: 0, subjects: {} });
    setScreen("dashboard");
  };

  const startQuiz = (subject: string, topic: string) => {
    setSelectedSubject(subject); setSelectedTopic(topic);
    setQuestionsAnswered(0); setCorrectCount(0); setStreak(0);
    setSelectedAnswer(null); setIsCorrect(null);
    const t = dailyProgress.subjects?.[subject]?.topics?.[topic];
    const attempts = t?.questions || 0;
    const accuracy = attempts > 0 ? (t!.correct / attempts) : 0.5;
    setCurrentQuestion(generateQuestion(subject, topic, currentChild!.level, accuracy, attempts));
    setScreen("quiz");
  };

  const triggerConfetti = () => {
    const c = Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 0.5,
      color: ["#FF6B6B", "#4ECDC4", "#A78BFA", "#F59E0B", "#10B981", "#EC4899", "#3B82F6"][Math.floor(Math.random() * 7)],
      size: Math.random() * 8 + 4,
    }));
    setConfetti(c);
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleAnswer = async (answer: string) => {
    if (selectedAnswer !== null || !currentQuestion || !currentChild || !selectedSubject || !selectedTopic) return;
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.answer;
    setIsCorrect(correct);

    const xpGained = correct ? (10 + streak * 2) : 2;
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);

    if (correct) {
      triggerConfetti();
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 1000);
    }

    setQuestionsAnswered(questionsAnswered + 1);
    setCorrectCount(correctCount + (correct ? 1 : 0));

    const updatedDP: DailyProgress = {
      total_questions: (dailyProgress.total_questions || 0) + 1,
      total_correct: (dailyProgress.total_correct || 0) + (correct ? 1 : 0),
      xp: (dailyProgress.xp || 0) + xpGained,
      subjects: { ...dailyProgress.subjects },
    };
    if (!updatedDP.subjects[selectedSubject]) {
      updatedDP.subjects[selectedSubject] = { questions: 0, correct: 0, topics: {} };
    }
    updatedDP.subjects[selectedSubject].questions += 1;
    updatedDP.subjects[selectedSubject].correct += correct ? 1 : 0;
    if (!updatedDP.subjects[selectedSubject].topics[selectedTopic]) {
      updatedDP.subjects[selectedSubject].topics[selectedTopic] = { questions: 0, correct: 0 };
    }
    updatedDP.subjects[selectedSubject].topics[selectedTopic].questions += 1;
    updatedDP.subjects[selectedSubject].topics[selectedTopic].correct += correct ? 1 : 0;
    setDailyProgress(updatedDP);
    await upsertDailyProgress(currentChild.id, updatedDP);

    const newTotalXP = (currentChild.total_xp || 0) + xpGained;
    const newLevel = Math.max(currentChild.level, Math.min(6, Math.floor(newTotalXP / 500) + 1));
    const updatedChild = { ...currentChild, total_xp: newTotalXP, level: newLevel };
    setCurrentChild(updatedChild);
    setChildren(children.map(c => c.id === updatedChild.id ? updatedChild : c));
    await updateChildXP(currentChild.id, newTotalXP, newLevel);
    await incrementTopicProgress(currentChild.id, selectedSubject, selectedTopic, correct, newStreak);
  };

  const nextQuestion = () => {
    if (questionsAnswered >= 5) { setShowReport(true); return; }
    setSelectedAnswer(null); setIsCorrect(null);
    const t = dailyProgress.subjects?.[selectedSubject!]?.topics?.[selectedTopic!];
    const attempts = t?.questions || 0;
    const accuracy = attempts > 0 ? (t!.correct / attempts) : 0.5;
    setCurrentQuestion(generateQuestion(selectedSubject!, selectedTopic!, currentChild!.level, accuracy, attempts));
  };

  const levelInfo = currentChild ? DIFFICULTY_LEVELS[currentChild.level] || DIFFICULTY_LEVELS[1] : DIFFICULTY_LEVELS[1];

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)", color: "white" }}>
        <div style={{ fontSize: 48, animation: "pulse 1s infinite" }}>🚀</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: screen === "splash" ? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" : "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      color: "white", position: "relative", overflow: "hidden",
    }}>
      {confetti.map((c: any) => (
        <div key={c.id} style={{
          position: "fixed", left: `${c.x}%`, top: -10, width: c.size, height: c.size,
          backgroundColor: c.color, borderRadius: c.size > 8 ? "50%" : "2px",
          animation: `confettiFall 1.5s ease-out ${c.delay}s forwards`, zIndex: 9999, pointerEvents: "none",
        }} />
      ))}

      {screen === "splash" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 80, animation: "float 3s ease-in-out infinite", marginBottom: 20 }}>🎓</div>
          <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(32px, 8vw, 56px)", margin: 0, background: "linear-gradient(90deg, #fff, #ffd700, #fff)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "rainbow 3s ease infinite" }}>Homeschooling</h1>
          <p style={{ fontSize: "clamp(14px, 3vw, 20px)", opacity: 0.9, maxWidth: 400, margin: "16px 0 40px", lineHeight: 1.6 }}>The fun way to master all GCSE subjects from home! 🚀</p>
          <button onClick={() => setScreen(children.length > 0 ? "selectChild" : "setup")} className="btn-hover" style={{ padding: "18px 48px", fontSize: 20, fontWeight: 800, border: "none", borderRadius: 50, background: "white", color: "#764ba2", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}>Let&apos;s Go! 🚀</button>
          <Link href="/" style={{ marginTop: 20, color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none" }}>← Back home</Link>
        </div>
      )}

      {screen === "setup" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 20 }}>
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "clamp(24px, 5vw, 40px)", maxWidth: 500, width: "100%", border: "1px solid rgba(255,255,255,0.12)" }}>
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, textAlign: "center", marginTop: 0 }}>Add a Learner ✨</h2>
            {setupStep === 0 && (
              <div style={{ animation: "slideUp 0.4s ease" }}>
                <label style={{ fontSize: 14, opacity: 0.8, marginBottom: 8, display: "block" }}>What&apos;s their name?</label>
                <input value={newChildName} onChange={e => setNewChildName(e.target.value)} placeholder="Enter name..." style={{ width: "100%", padding: "16px 20px", fontSize: 18, borderRadius: 16, border: "2px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "white", marginBottom: 16 }} />
                <label style={{ fontSize: 14, opacity: 0.8, marginBottom: 8, display: "block" }}>How old are they?</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                  {[5, 6, 7, 8, 9, 10, 11].map(age => (
                    <button key={age} onClick={() => setNewChildAge(age)} style={{ padding: "12px 20px", borderRadius: 12, border: newChildAge === age ? "2px solid #A78BFA" : "2px solid rgba(255,255,255,0.15)", background: newChildAge === age ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.05)", color: "white", cursor: "pointer", fontSize: 16, fontWeight: 700, transition: "all 0.2s" }}>{age}</button>
                  ))}
                </div>
                <button onClick={() => newChildName.trim() && setSetupStep(1)} className="btn-hover" style={{ width: "100%", padding: 16, fontSize: 18, fontWeight: 800, border: "none", borderRadius: 16, background: newChildName.trim() ? "linear-gradient(135deg, #A78BFA, #EC4899)" : "rgba(255,255,255,0.1)", color: "white", cursor: newChildName.trim() ? "pointer" : "default", transition: "all 0.3s", opacity: newChildName.trim() ? 1 : 0.5 }}>Next →</button>
              </div>
            )}
            {setupStep === 1 && (
              <div style={{ animation: "slideUp 0.4s ease" }}>
                <p style={{ textAlign: "center", fontSize: 16, opacity: 0.8 }}>Choose an avatar for {newChildName}!</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
                  {AVATARS.map(a => (
                    <button key={a} onClick={() => setNewChildAvatar(a)} style={{ fontSize: 36, padding: 12, borderRadius: 16, border: newChildAvatar === a ? "3px solid #A78BFA" : "2px solid rgba(255,255,255,0.1)", background: newChildAvatar === a ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.2s" }}>{a}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setSetupStep(0)} style={{ flex: 1, padding: 16, fontSize: 16, fontWeight: 700, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 16, background: "transparent", color: "white", cursor: "pointer" }}>← Back</button>
                  <button onClick={addChild} className="btn-hover" style={{ flex: 2, padding: 16, fontSize: 18, fontWeight: 800, border: "none", borderRadius: 16, background: "linear-gradient(135deg, #10B981, #3B82F6)", color: "white", cursor: "pointer", transition: "all 0.3s" }}>Create Profile! ✨</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {screen === "selectChild" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 20 }}>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(24px, 6vw, 36px)", marginBottom: 32, textAlign: "center" }}>Who&apos;s Learning Today? 🌟</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400 }}>
            {children.map((child, i) => (
              <button key={child.id} onClick={() => selectChild(child)} className="btn-hover" style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderRadius: 20, border: "2px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", cursor: "pointer", color: "white", textAlign: "left", transition: "all 0.3s", animation: `slideIn 0.4s ease ${i * 0.1}s both` }}>
                <span style={{ fontSize: 44 }}>{child.avatar}</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{child.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>Age {child.age} · {DIFFICULTY_LEVELS[child.level]?.emoji} {DIFFICULTY_LEVELS[child.level]?.name} · {child.total_xp || 0} XP</div>
                </div>
              </button>
            ))}
            <button onClick={() => { setSetupStep(0); setScreen("setup"); }} className="btn-hover" style={{ padding: 16, borderRadius: 20, border: "2px dashed rgba(255,255,255,0.2)", background: "transparent", color: "white", cursor: "pointer", fontSize: 16, fontWeight: 700, transition: "all 0.3s", opacity: 0.7 }}>+ Add Another Learner</button>
          </div>
        </div>
      )}

      {screen === "dashboard" && currentChild && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 16px", paddingBottom: 100 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <button onClick={() => setScreen("selectChild")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 16px", borderRadius: 12, cursor: "pointer", fontSize: 14 }}>← Switch</button>
            <button onClick={() => setShowReport(true)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 16px", borderRadius: 12, cursor: "pointer", fontSize: 14 }}>📊 Report</button>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 24, padding: 24, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 8, animation: "float 3s ease-in-out infinite" }}>{currentChild.avatar}</div>
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, margin: "0 0 4px" }}>{currentChild.name}</h2>
            <div style={{ display: "inline-block", padding: "4px 16px", borderRadius: 20, fontSize: 14, fontWeight: 700, background: `${levelInfo.color}33`, border: `1px solid ${levelInfo.color}55` }}>
              {levelInfo.emoji} {levelInfo.name} · Level {currentChild.level}
            </div>
            <div style={{ marginTop: 16, background: "rgba(255,255,255,0.1)", borderRadius: 12, height: 12, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 12, transition: "width 1s ease", background: `linear-gradient(90deg, ${levelInfo.color}, #ffd700)`, width: `${((currentChild.total_xp || 0) % 500) / 500 * 100}%` }} />
            </div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{(currentChild.total_xp || 0) % 500} / 500 XP to next level</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16 }}>
              <div><div style={{ fontSize: 24, fontWeight: 900 }}>{dailyProgress.total_questions || 0}</div><div style={{ fontSize: 11, opacity: 0.6 }}>Today&apos;s Qs</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 900, color: "#10B981" }}>{dailyProgress.total_questions ? Math.round((dailyProgress.total_correct || 0) / dailyProgress.total_questions * 100) : 0}%</div><div style={{ fontSize: 11, opacity: 0.6 }}>Accuracy</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 900, color: "#F59E0B" }}>🔥 {dailyProgress.xp || 0}</div><div style={{ fontSize: 11, opacity: 0.6 }}>XP Today</div></div>
            </div>
          </div>

          <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, marginBottom: 16 }}>Choose a Subject 📖</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {Object.entries(SUBJECTS).map(([key, subj], i) => (
              <button key={key} onClick={() => { setSelectedSubject(key); setScreen("topics"); }} className="subject-card" style={{ background: subj.gradient, borderRadius: 20, padding: 20, border: "none", cursor: "pointer", color: "white", textAlign: "center", transition: "all 0.3s", animation: `bounceIn 0.5s ease ${i * 0.05}s both`, boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{subj.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{subj.name}</div>
                {dailyProgress.subjects?.[key] && (
                  <div style={{ fontSize: 11, marginTop: 6, opacity: 0.85, background: "rgba(0,0,0,0.15)", padding: "2px 8px", borderRadius: 8, display: "inline-block" }}>✅ {dailyProgress.subjects[key].correct}/{dailyProgress.subjects[key].questions}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "topics" && selectedSubject && (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
          <button onClick={() => { setScreen("dashboard"); setSelectedSubject(null); }} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "10px 20px", borderRadius: 14, cursor: "pointer", fontSize: 14, marginBottom: 20 }}>← Back to Subjects</button>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 48 }}>{SUBJECTS[selectedSubject].icon}</div>
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, margin: "8px 0 0" }}>{SUBJECTS[selectedSubject].name}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SUBJECTS[selectedSubject].topics.map((topic, i) => (
              <button key={topic} onClick={() => startQuiz(selectedSubject, topic)} className="btn-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer", fontSize: 16, fontWeight: 600, transition: "all 0.3s", animation: `slideIn 0.3s ease ${i * 0.04}s both` }}>
                <span>{topic}</span><span style={{ fontSize: 20 }}>▶</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "quiz" && currentQuestion && selectedSubject && (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button onClick={() => { setScreen("topics"); setShowReport(false); }} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 16px", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>✕ Quit</button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {streak > 1 && <span style={{ fontSize: 14, color: "#F59E0B", fontWeight: 800 }}>🔥{streak}</span>}
              <span style={{ fontSize: 14, opacity: 0.7 }}>Q{questionsAnswered + 1}/5</span>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 6, marginBottom: 32, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 8, transition: "width 0.5s ease", background: SUBJECTS[selectedSubject].gradient, width: `${(questionsAnswered / 5) * 100}%` }} />
          </div>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 20, background: `${SUBJECTS[selectedSubject].color}33`, border: `1px solid ${SUBJECTS[selectedSubject].color}44` }}>
              {SUBJECTS[selectedSubject].icon} {SUBJECTS[selectedSubject].name} · {selectedTopic}
            </span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(24px, 5vw, 36px)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 24, textAlign: "center", animation: "bounceIn 0.5s ease" }}>
            <h3 style={{ fontSize: "clamp(18px, 4.5vw, 24px)", fontWeight: 800, margin: 0, lineHeight: 1.4 }}>{currentQuestion.q}</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              const isRight = opt === currentQuestion.answer;
              const showResult = selectedAnswer !== null;
              let bg = "rgba(255,255,255,0.08)"; let borderColor = "rgba(255,255,255,0.12)";
              if (showResult && isRight) { bg = "rgba(16, 185, 129, 0.25)"; borderColor = "#10B981"; }
              if (showResult && isSelected && !isRight) { bg = "rgba(239, 68, 68, 0.25)"; borderColor = "#EF4444"; }
              return (
                <button key={i} onClick={() => handleAnswer(opt)} className={`option-btn ${isSelected ? "selected" : ""}`} style={{ padding: "18px 16px", borderRadius: 16, border: `2px solid ${borderColor}`, background: bg, color: "white", cursor: selectedAnswer === null ? "pointer" : "default", fontSize: "clamp(14px, 3vw, 17px)", fontWeight: 700, transition: "all 0.3s", animation: `slideUp 0.3s ease ${i * 0.08}s both`, ...(showResult && isSelected && !isRight ? { animation: "shake 0.3s ease" } : {}) }}>
                  {opt} {showResult && isRight && "✅"} {showResult && isSelected && !isRight && "❌"}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <div style={{ textAlign: "center", marginTop: 24, animation: "bounceIn 0.4s ease" }}>
              <p style={{ fontSize: 20, fontWeight: 800, margin: "0 0 4px", color: isCorrect ? "#10B981" : "#EF4444" }}>
                {isCorrect ? ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)] : WRONG_ENCOURAGEMENTS[Math.floor(Math.random() * WRONG_ENCOURAGEMENTS.length)]}
              </p>
              {!isCorrect && <p style={{ fontSize: 14, opacity: 0.7, margin: "4px 0 0" }}>The answer was: <strong>{currentQuestion.answer}</strong></p>}
              {xpAnimation && <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd700", animation: "xpFloat 1s ease forwards" }}>+{10 + streak * 2} XP</div>}
              <button onClick={nextQuestion} className="btn-hover" style={{ marginTop: 16, padding: "14px 40px", fontSize: 17, fontWeight: 800, border: "none", borderRadius: 50, background: "linear-gradient(135deg, #A78BFA, #EC4899)", color: "white", cursor: "pointer", transition: "all 0.3s" }}>
                {questionsAnswered >= 5 ? "See Results! 🏆" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}

      {showReport && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={() => { setShowReport(false); if (screen === "quiz") setScreen("topics"); }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(180deg, #1e1b4b, #312e81)", borderRadius: 28, padding: "clamp(24px, 5vw, 36px)", maxWidth: 480, width: "100%", maxHeight: "85vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.12)", animation: "bounceIn 0.5s ease" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{screen === "quiz" ? (correctCount >= 4 ? "🏆" : correctCount >= 3 ? "⭐" : "💪") : "📊"}</div>
              <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, margin: "0 0 4px" }}>{screen === "quiz" ? "Quiz Complete!" : "Daily Report"}</h2>
              {screen === "quiz" && (
                <>
                  <p style={{ fontSize: 42, fontWeight: 900, margin: "12px 0 4px", color: correctCount >= 3 ? "#10B981" : "#F59E0B" }}>{correctCount}/5</p>
                  <p style={{ opacity: 0.7, margin: 0, fontSize: 14 }}>{correctCount === 5 ? "PERFECT SCORE! You're incredible!" : correctCount >= 4 ? "Almost perfect! Amazing work!" : correctCount >= 3 ? "Great job! Keep practising!" : "Good effort! Practice makes perfect!"}</p>
                </>
              )}
            </div>
            <div style={{ marginTop: 24 }}>
              <h4 style={{ fontSize: 14, opacity: 0.6, marginBottom: 12, fontWeight: 600 }}>TODAY&apos;S ACTIVITY</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{dailyProgress.total_questions || 0}</div>
                  <div style={{ fontSize: 11, opacity: 0.6 }}>Questions</div>
                </div>
                <div style={{ background: "rgba(16,185,129,0.15)", borderRadius: 14, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#10B981" }}>{dailyProgress.total_questions ? Math.round((dailyProgress.total_correct || 0) / dailyProgress.total_questions * 100) : 0}%</div>
                  <div style={{ fontSize: 11, opacity: 0.6 }}>Accuracy</div>
                </div>
                <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 14, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#F59E0B" }}>{dailyProgress.xp || 0}</div>
                  <div style={{ fontSize: 11, opacity: 0.6 }}>XP Earned</div>
                </div>
              </div>
              {dailyProgress.subjects && Object.entries(dailyProgress.subjects).length > 0 && (
                <>
                  <h4 style={{ fontSize: 14, opacity: 0.6, marginBottom: 12, fontWeight: 600 }}>SUBJECTS COVERED</h4>
                  {Object.entries(dailyProgress.subjects).map(([subKey, subData]: any) => (
                    <div key={subKey} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, marginBottom: 8, borderLeft: `3px solid ${SUBJECTS[subKey]?.color || "#fff"}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{SUBJECTS[subKey]?.icon} {SUBJECTS[subKey]?.name}</span>
                        <span style={{ fontSize: 14, color: "#10B981", fontWeight: 800 }}>{subData.correct}/{subData.questions} correct</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <button onClick={() => { setShowReport(false); if (screen === "quiz") setScreen("topics"); }} className="btn-hover" style={{ width: "100%", padding: 16, fontSize: 17, fontWeight: 800, border: "none", borderRadius: 16, background: "linear-gradient(135deg, #A78BFA, #3B82F6)", color: "white", cursor: "pointer", transition: "all 0.3s", marginTop: 16 }}>
              {screen === "quiz" ? "Continue Learning! 🚀" : "Close Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}