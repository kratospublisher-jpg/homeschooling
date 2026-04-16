"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, fontFamily: "'Nunito', sans-serif", color: "white", textAlign: "center",
    }}>
      <div style={{ fontSize: 80, animation: "float 3s ease-in-out infinite", marginBottom: 20 }}>🎓</div>
      <h1 style={{
        fontFamily: "'Fredoka One', cursive", fontSize: "clamp(36px, 8vw, 60px)", margin: 0,
        background: "linear-gradient(90deg, #fff, #ffd700, #fff)", backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        animation: "rainbow 3s ease infinite"
      }}>
        Homeschooling
      </h1>
      <p style={{ fontSize: "clamp(16px, 3vw, 20px)", opacity: 0.9, maxWidth: 480, margin: "16px 0 40px", lineHeight: 1.6 }}>
        The fun way to master all GCSE subjects from home! 🚀
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 360 }}>
        <Link href="/kids" style={{ textDecoration: "none" }}>
          <button className="btn-hover" style={{
            width: "100%", padding: "20px 32px", fontSize: 20, fontWeight: 800, border: "none", borderRadius: 20,
            background: "white", color: "#764ba2", cursor: "pointer", fontFamily: "'Nunito', sans-serif",
            transition: "all 0.3s ease", boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
          }}>
            🧒 Kids — Learn & Play
          </button>
        </Link>

        <Link href="/parent" style={{ textDecoration: "none" }}>
          <button className="btn-hover" style={{
            width: "100%", padding: "16px 32px", fontSize: 16, fontWeight: 700, border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: 20, background: "rgba(255,255,255,0.1)", color: "white", cursor: "pointer",
            fontFamily: "'Nunito', sans-serif", transition: "all 0.3s", backdropFilter: "blur(10px)",
          }}>
            👨‍👩‍👧 Parent Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
