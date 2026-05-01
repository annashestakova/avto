import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Cloud({ delay, x, y, size, speed, opacity }: any) {
  return (
    <motion.div
      initial={{ x: x - 100, opacity: 0 }}
      animate={{ x: [x - 60, x + 60, x - 60], y: [y, y - 15, y + 10, y], opacity: [opacity, opacity * 1.2, opacity] }}
      transition={{ duration: speed, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", width: size, height: size * 0.5, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, rgba(230,220,255,0.1) 70%, transparent 100%)", filter: `blur(${size * 0.15}px)`, pointerEvents: "none" }}
    />
  );
}

function Sparkle({ delay }: { delay: number }) {
  const x = Math.random() * 100, y = Math.random() * 100, s = 2 + Math.random() * 4;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0.6, 1, 0], scale: [0, 1.2, 0.8, 1, 0], y: [0, -30 - Math.random() * 40] }}
      transition={{ duration: 3 + Math.random() * 3, delay: delay + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: "50%", background: "white", boxShadow: `0 0 ${s * 3}px rgba(255,255,255,0.8), 0 0 ${s * 6}px rgba(200,180,255,0.4)`, pointerEvents: "none" }}
    />
  );
}

function DragonCharacter() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0, -8, 0], rotate: [0, -2, 0, 2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: "min(260px, 60vw)", height: "min(260px, 60vw)", position: "relative", zIndex: 2 }}
    >
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="#F5EBF8" /><stop offset="50%" stopColor="#EDE0F5" /><stop offset="100%" stopColor="#D8C8E8" /></radialGradient>
          <radialGradient id="bl" cx="50%" cy="50%" r="45%"><stop offset="0%" stopColor="#FFF5F9" /><stop offset="100%" stopColor="#F0E0EE" /></radialGradient>
          <radialGradient id="eg" cx="40%" cy="35%" r="50%"><stop offset="0%" stopColor="#FFD700" /><stop offset="60%" stopColor="#D4A017" /><stop offset="100%" stopColor="#8B6914" /></radialGradient>
          <radialGradient id="ck" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,180,200,0.5)" /><stop offset="100%" stopColor="rgba(255,180,200,0)" /></radialGradient>
          <filter id="ss"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(100,60,140,0.15)" /></filter>
        </defs>
        <g filter="url(#ss)">
          <ellipse cx="200" cy="260" rx="105" ry="95" fill="url(#bg)" />
          <circle cx="200" cy="165" r="90" fill="url(#bg)" />
          <ellipse cx="200" cy="275" rx="65" ry="55" fill="url(#bl)" />
        </g>
        <path d="M140 105 Q130 55 155 85 Q150 95 148 108" fill="#EDE0F5" stroke="#D8C8E8" strokeWidth="1" />
        <path d="M260 105 Q270 55 245 85 Q250 95 252 108" fill="#EDE0F5" stroke="#D8C8E8" strokeWidth="1" />
        <path d="M143 105 Q137 70 155 88" fill="#F5D5E8" opacity="0.6" />
        <path d="M257 105 Q263 70 245 88" fill="#F5D5E8" opacity="0.6" />
        <g>
          <ellipse cx="165" cy="160" rx="22" ry="24" fill="white" stroke="#D0C0D8" strokeWidth="1" />
          <ellipse cx="167" cy="158" rx="14" ry="16" fill="url(#eg)" />
          <circle cx="162" cy="152" r="5" fill="white" opacity="0.9" />
          <circle cx="172" cy="162" r="2.5" fill="white" opacity="0.5" />
          <ellipse cx="167" cy="158" rx="6" ry="7" fill="#2A1A0A" />
          <ellipse cx="235" cy="160" rx="22" ry="24" fill="white" stroke="#D0C0D8" strokeWidth="1" />
          <ellipse cx="233" cy="158" rx="14" ry="16" fill="url(#eg)" />
          <circle cx="228" cy="152" r="5" fill="white" opacity="0.9" />
          <circle cx="238" cy="162" r="2.5" fill="white" opacity="0.5" />
          <ellipse cx="233" cy="158" rx="6" ry="7" fill="#2A1A0A" />
        </g>
        <circle cx="190" cy="185" r="3" fill="#C8B0D0" />
        <circle cx="210" cy="185" r="3" fill="#C8B0D0" />
        <path d="M185 197 Q200 210 215 197" fill="none" stroke="#C0A0C8" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="140" cy="180" rx="18" ry="12" fill="url(#ck)" />
        <ellipse cx="260" cy="180" rx="18" ry="12" fill="url(#ck)" />
        <g opacity="0.3">
          <path d="M190 115 Q200 108 210 115" fill="none" stroke="#C0A8D0" strokeWidth="1.5" />
          <path d="M185 125 Q200 117 215 125" fill="none" stroke="#C0A8D0" strokeWidth="1.5" />
        </g>
        <g opacity="0.8">
          <path d="M105 230 Q75 200 85 240 Q90 260 110 255" fill="#E8D5F0" stroke="#D0BDE0" strokeWidth="1" />
          <path d="M295 230 Q325 200 315 240 Q310 260 290 255" fill="#E8D5F0" stroke="#D0BDE0" strokeWidth="1" />
        </g>
        <ellipse cx="160" cy="345" rx="30" ry="14" fill="#EDE0F5" />
        <ellipse cx="240" cy="345" rx="30" ry="14" fill="#EDE0F5" />
        <path d="M300 290 Q340 300 350 270 Q355 255 340 260" fill="none" stroke="#D8C8E8" strokeWidth="8" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 300 290;5 300 290;-3 300 290;0 300 290" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="340" cy="258" r="8" fill="#F0D5F5">
          <animateTransform attributeName="transform" type="rotate" values="0 300 290;5 300 290;-3 300 290;0 300 290" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="175" cy="120" rx="25" ry="8" fill="white" opacity="0.15" transform="rotate(-15 175 120)" />
      </svg>

      <style>{`@keyframes blink { 0%,94%,100%{opacity:0} 96%,98%{opacity:1} }`}</style>
      <div style={{ position: "absolute", top: "35%", left: "35%", width: "30%", height: "8%", display: "flex", justifyContent: "space-between", padding: "0 2%", animation: "blink 4s infinite", pointerEvents: "none" }}>
        <div style={{ width: "38%", height: "100%", background: "#EDE0F5", borderRadius: "50%", transform: "scaleY(0.3)" }} />
        <div style={{ width: "38%", height: "100%", background: "#EDE0F5", borderRadius: "50%", transform: "scaleY(0.3)" }} />
      </div>
    </motion.div>
  );
}

function FlyingDigit({ digit, delay }: { digit: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 60, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
      style={{ display: "inline-block", fontSize: "min(130px, 20vw)", fontWeight: 900, background: "linear-gradient(135deg, #E8D0F8, #C8A8E8, #F5A8C0, #FFD0A0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 4px 24px rgba(200,130,255,0.25))", lineHeight: 1 }}
    >
      <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, delay: delay * 0.5, repeat: Infinity, ease: "easeInOut" }} style={{ display: "inline-block" }}>
        {digit}
      </motion.span>
    </motion.span>
  );
}

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [mp, setMp] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setMp({ x: ((e.clientX - r.left) / r.width - 0.5) * 20, y: ((e.clientY - r.top) / r.height - 0.5) * 20 });
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  return (
    <div ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito','Comfortaa',-apple-system,sans-serif", overflow: "hidden", position: "relative", background: "linear-gradient(180deg, #1A1030 0%, #2A1845 30%, #1E1238 60%, #150E28 100%)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Comfortaa:wght@700&display=swap" rel="stylesheet" />

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(120,80,200,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />

      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div key={i} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 3, repeat: Infinity }}
          style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 1 + Math.random() * 2, height: 1 + Math.random() * 2, borderRadius: "50%", background: "white", pointerEvents: "none" }} />
      ))}

      <Cloud delay={0} x={-100} y={80} size={200} speed={18} opacity={0.15} />
      <Cloud delay={2} x={300} y={150} size={160} speed={22} opacity={0.1} />
      <Cloud delay={4} x={100} y={400} size={250} speed={25} opacity={0.12} />
      <Cloud delay={1} x={500} y={60} size={180} speed={20} opacity={0.08} />
      <Cloud delay={3} x={-50} y={500} size={220} speed={28} opacity={0.1} />

      {Array.from({ length: 15 }).map((_, i) => <Sparkle key={i} delay={i * 0.3} />)}

      <motion.div animate={{ x: mp.x * -0.5, y: mp.y * -0.5 }} transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ position: "absolute", top: "8%", right: "12%", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #FFF8E8, #F0E0C0 60%, #D8C8A0)", boxShadow: "0 0 60px rgba(255,240,200,0.3), 0 0 120px rgba(255,240,200,0.1)", pointerEvents: "none" }} />

      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 2, padding: 20, maxWidth: 600 }}>
            <motion.div animate={{ x: mp.x * 0.3, y: mp.y * 0.3 }} transition={{ type: "spring", stiffness: 80, damping: 25 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              <div style={{ marginBottom: -20, position: "relative", zIndex: 1 }}>
                <FlyingDigit digit="4" delay={0.3} />
                <FlyingDigit digit="0" delay={0.5} />
                <FlyingDigit digit="4" delay={0.7} />
              </div>

              <motion.div animate={{ x: mp.x * -0.2, y: mp.y * -0.2 }} transition={{ type: "spring", stiffness: 60, damping: 20 }}
                style={{ position: "relative", zIndex: 3, marginTop: -10, marginBottom: 8 }}>
                <DragonCharacter />
                <div style={{ position: "absolute", bottom: "-8%", left: "50%", transform: "translateX(-50%)", width: "140%", height: 50, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(220,200,255,0.25) 0%, transparent 70%)", filter: "blur(12px)", pointerEvents: "none" }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <h2 style={{ fontFamily: "'Comfortaa',sans-serif", fontSize: "min(26px, 5.5vw)", fontWeight: 700, color: "#E8D0F8", marginBottom: 12 }}>
                  Упс! Страница улетела
                </h2>
                <p style={{ fontSize: "min(16px, 4vw)", color: "rgba(200,180,230,0.7)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 32px" }}>
                  Наш дракончик облетел всё облако, но так и не нашёл эту страницу. Может, вернёмся на главную?
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                <motion.button onClick={() => navigate("/")} whileHover={{ scale: 1.05, boxShadow: "0 8px 40px rgba(200,130,255,0.35)" }} whileTap={{ scale: 0.95 }}
                  style={{ padding: "14px 32px", borderRadius: 50, background: "linear-gradient(135deg, #C080F0, #A060D8, #D080E8)", color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 6px 30px rgba(180,100,240,0.3)", fontFamily: "'Nunito',sans-serif" }}>
                  ✨ На главную
                </motion.button>
                <motion.button onClick={() => window.history.back()} whileHover={{ scale: 1.05, borderColor: "rgba(200,160,255,0.5)" }} whileTap={{ scale: 0.95 }}
                  style={{ padding: "14px 32px", borderRadius: 50, background: "rgba(200,160,255,0.08)", border: "1px solid rgba(200,160,255,0.2)", color: "#D0B8F0", fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "'Nunito',sans-serif" }}>
                  ← Назад
                </motion.button>
              </motion.div>
            </motion.div>

            {["🌙", "⭐", "☁️", "✨", "💫"].map((e, i) => (
              <motion.span key={e} animate={{ y: [0, -20 - i * 5, 0], x: [0, (i % 2 ? 10 : -10), 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4 + i, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", fontSize: 18 + i * 4, opacity: 0.4, top: `${10 + i * 18}%`, left: i % 2 ? `${10 + i * 5}%` : `${75 + i * 3}%`, pointerEvents: "none" }}>
                {e}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 150, background: "linear-gradient(transparent, rgba(15,10,25,0.8))", pointerEvents: "none" }} />
    </div>
  );
}
