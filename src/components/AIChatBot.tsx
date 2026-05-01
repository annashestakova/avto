import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const c = {
  accent: "#F5A623",
  border: "#2A2A2E",
  surface: "#141416",
  text: "#F0F0F2",
  muted: "#8A8A94",
  accentMuted: "rgba(245,166,35,0.12)",
  chatBg: "#111113",
  chatBot: "#1E1E22",
};

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Здравствуйте! Я AI-ассистент службы эвакуации. Чем могу помочь?\n\nМогу подсказать цены, время подачи, помочь оформить заявку или ответить на любые вопросы." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pulse, setPulse] = useState(0);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  useEffect(() => {
    const i = setInterval(() => { if (!isOpen) setPulse(p => p + 1); }, 8000);
    return () => clearInterval(i);
  }, [isOpen]);

  const respond = useCallback((msg: string) => {
    const l = msg.toLowerCase();
    if (l.match(/цен|стоим|скольк/)) return "Наши цены:\n\n🚗 Легковые — от 79 BYN\n🏍️ Мотоциклы — от 59 BYN\n🚛 Спецтехника — от 149 BYN\n🔧 Техпомощь — от 49 BYN\n💥 После ДТП — от 79 BYN\n\nТочную стоимость рассчитаю, если скажете откуда и куда.";
    if (l.match(/врем|быстр|когда|долго/)) return "⚡ Среднее время подачи — 15-25 минут в городе.\nЗа городом — 30-60 минут.\n\nРаботаем 24/7! Хотите оформить заявку?";
    if (l.match(/заказ|заявк|вызв|нужен/)) return "Для заявки мне нужно:\n\n📍 Адрес подачи\n📍 Адрес доставки\n🚗 Марка авто\n📱 Ваш телефон\n\nИли звоните: +375 29 000-00-00";
    if (l.match(/дтп|авари/)) return "🚨 При ДТП выезжаем приоритетно!\n\n1. Убедитесь в безопасности\n2. Вызовите ГАИ\n3. Звоните: +375 29 000-00-00\n\nПоможем с документами для страховой.";
    if (l.match(/оплат|карт|нал/)) return "💳 Способы оплаты:\n\n• Наличные\n• Карты (Visa/MC)\n• ЕРИП\n• Безнал для юрлиц\n\nОплата после выполнения.";
    if (l.match(/привет|здравс|добр/)) return "Здравствуйте! 👋\n\nЧем могу помочь?\n\n• Цены на услуги\n• Время подачи\n• Оформление заявки\n• Техпомощь на дороге";
    return "Я могу помочь с:\n\n• 💰 Ценами\n• ⏱ Временем подачи\n• 📝 Оформлением заявки\n• 🔧 Техпомощью\n\nЗадайте вопрос или звоните: +375 29 000-00-00";
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    setMessages(p => [...p, { role: "user", text: msg }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { role: "bot", text: respond(msg) }]);
      setIsTyping(false);
    }, 700 + Math.random() * 600);
  };

  const quickSend = (q: string) => {
    setMessages(p => [...p, { role: "user", text: q }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { role: "bot", text: respond(q) }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      <motion.button onClick={() => setIsOpen(true)}
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9998, width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${c.accent}, #E8941E)`, border: "none", cursor: "pointer", display: isOpen ? "none" : "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(245,166,35,0.4)" }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        animate={pulse > 0 ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.5 }}>
        <span style={{ fontSize: 28 }}>💬</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.3 }}
            style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, width: "min(400px, calc(100vw - 32px))", height: "min(560px, calc(100vh - 100px))", background: c.chatBg, borderRadius: 20, border: `1px solid ${c.border}`, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
            
            {/* Header */}
            <div style={{ padding: "16px 20px", background: `linear-gradient(135deg, ${c.accent}, #E8941E)`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#000", fontSize: 15 }}>AI-Ассистент</div>
                  <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }} />Онлайн
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: "rgba(0,0,0,0.15)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: 18, fontWeight: 700 }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                  <div style={{ padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? c.accent : c.chatBot, color: m.role === "user" ? "#000" : c.text, fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-line", fontWeight: m.role === "user" ? 500 : 400 }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div style={{ padding: "12px 18px", borderRadius: "16px 16px 16px 4px", background: c.chatBot, display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: c.muted, display: "inline-block" }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEnd} />
            </div>

            {/* Quick */}
            <div style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Цены", "Время подачи", "Заказать"].map(q => (
                <button key={q} onClick={() => quickSend(q)}
                  style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${c.border}`, background: "transparent", color: c.accent, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 8 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Задайте вопрос..."
                style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.surface, color: c.text, fontSize: 14, fontFamily: "inherit" }} />
              <button onClick={send} style={{ padding: "10px 16px", borderRadius: 12, border: "none", background: c.accent, color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
