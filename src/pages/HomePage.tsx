import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AIChatBot from "../components/AIChatBot";

/* ── Design tokens ── */
const c = {
  bg: "#0A0A0B",
  surface: "#141416",
  surfaceHover: "#1A1A1E",
  border: "#2A2A2E",
  accent: "#F5A623",
  accentHover: "#FFB840",
  accentMuted: "rgba(245,166,35,0.12)",
  text: "#F0F0F2",
  muted: "#8A8A94",
  success: "#34D399",
};

/* ── Animated section ── */
function S({ children, className = "", delay = 0, style = {} }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ── Data ── */
const services = [
  { icon: "🚗", title: "Эвакуация легковых", desc: "Бережная погрузка и перевозка любых легковых автомобилей. Подача от 15 минут.", price: "от 79 BYN" },
  { icon: "🏍️", title: "Перевозка мотоциклов", desc: "Специальное оборудование для безопасной транспортировки мотоциклов и скутеров.", price: "от 59 BYN" },
  { icon: "🚛", title: "Спецтехника", desc: "Эвакуация и транспортировка спецтехники любых габаритов по РБ и РФ.", price: "от 149 BYN" },
  { icon: "🔧", title: "Техпомощь на дороге", desc: "Выезд мастера для диагностики и устранения неисправности прямо на месте.", price: "от 49 BYN" },
  { icon: "💥", title: "Эвакуация после ДТП", desc: "Оперативная эвакуация с места аварии. Работаем со страховыми компаниями.", price: "от 79 BYN" },
  { icon: "🧱", title: "Перевозка грузов", desc: "Доставка стройматериалов, оборудования и негабаритных грузов.", price: "от 99 BYN" },
];

const advantages = [
  { icon: "⚡", title: "Подача от 15 минут", desc: "Быстрая подача эвакуатора в любой район города" },
  { icon: "💳", title: "Без скрытых платежей", desc: "Фиксированная цена, которая не изменится по дороге" },
  { icon: "🛡️", title: "Бережная погрузка", desc: "Современное оборудование исключает повреждения" },
  { icon: "🕐", title: "Круглосуточно", desc: "Работаем 24/7, без выходных и праздников" },
  { icon: "👨‍🔧", title: "Опытные водители", desc: "Стаж каждого водителя от 5 лет, все застрахованы" },
  { icon: "📋", title: "Работаем по договору", desc: "Полный пакет документов для юрлиц и страховых" },
];

const reviews = [
  { name: "Павел Г.", text: "Отличная работа! Спасибо за оперативность и профессионализм. Приехали за 12 минут.", rating: 5 },
  { name: "Алексей Ч.", text: "Быстро приехали, помогли выбраться из неприятной ситуации. Рекомендую!", rating: 5 },
  { name: "Анна Х.", text: "Процесс эвакуации прошёл гладко, без каких-либо проблем. Спасибо за отличную работу.", rating: 5 },
  { name: "Игорь Д.", text: "Очень доволен сервисом. Вежливый персонал и быстрая помощь. Буду обращаться снова.", rating: 4 },
];

const faqData = [
  { q: "Как быстро приедет эвакуатор?", a: "Среднее время подачи — 15-25 минут в пределах города. За городом — 30-60 минут." },
  { q: "Какие способы оплаты вы принимаете?", a: "Наличные, банковские карты, ЕРИП, безналичный расчёт для юрлиц." },
  { q: "Можно ли заказать эвакуатор заранее?", a: "Да, вы можете забронировать эвакуатор на определённое время через AI-ассистент или по телефону." },
  { q: "Работаете ли вы за пределами города?", a: "Да, мы работаем по всей Беларуси и осуществляем перевозки в Россию." },
];

/* ── Stars ── */
function Stars({ count }: { count: number }) {
  return <span style={{ color: c.accent, fontSize: 14, letterSpacing: 2 }}>{"★".repeat(count)}{"☆".repeat(5 - count)}</span>;
}

/* ── FAQ Item ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 14, overflow: "hidden", background: c.surface }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", color: c.text, fontSize: 16, fontWeight: 600, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: 22, color: c.accent, flexShrink: 0, marginLeft: 12 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div style={{ padding: "0 20px 18px", color: c.muted, lineHeight: 1.6, fontSize: 15 }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Order Form ── */
function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", from: "", to: "", car: "", honey: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const upd = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.surface, color: c.text, fontSize: 15, fontFamily: "inherit", transition: "border-color 0.2s",
  };
  const submit = (e: any) => {
    e.preventDefault();
    if (form.honey) return;
    if (!form.name || !form.phone) { setErr("Заполните имя и телефон"); return; }
    if (!/^[\+]?[\d\s\-\(\)]{7,}$/.test(form.phone)) { setErr("Некорректный номер телефона"); return; }
    setErr("");
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "60px 20px" }}>
        <span style={{ fontSize: 56, display: "block", marginBottom: 16 }}>✅</span>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Заявка отправлена!</h3>
        <p style={{ color: c.muted, fontSize: 15 }}>Диспетчер свяжется с вами в течение 5 минут</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <input type="text" style={{ ...inputStyle, position: "absolute", left: -9999, opacity: 0 }} value={form.honey} onChange={upd("honey")} tabIndex={-1} autoComplete="off" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-grid">
        <input placeholder="Ваше имя *" value={form.name} onChange={upd("name")} style={inputStyle} />
        <input placeholder="Телефон *" value={form.phone} onChange={upd("phone")} style={inputStyle} type="tel" />
      </div>
      <input placeholder="Откуда забрать" value={form.from} onChange={upd("from")} style={inputStyle} />
      <input placeholder="Куда доставить" value={form.to} onChange={upd("to")} style={inputStyle} />
      <input placeholder="Марка и модель авто" value={form.car} onChange={upd("car")} style={inputStyle} />
      {err && <p style={{ color: "#EF4444", fontSize: 13, margin: 0 }}>{err}</p>}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ padding: "16px", borderRadius: 14, border: "none", background: `linear-gradient(135deg, ${c.accent}, #E8941E)`, color: "#000", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 32px rgba(245,166,35,0.3)" }}
      >
        Оставить заявку
      </motion.button>
    </form>
  );
}

/* ════════════════════════════════════════════════════ */
/* ── MAIN PAGE                                      ── */
/* ════════════════════════════════════════════════════ */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const nav = [
    { label: "Услуги", id: "services" },
    { label: "Преимущества", id: "advantages" },
    { label: "Отзывы", id: "reviews" },
    { label: "Заявка", id: "order" },
    { label: "FAQ", id: "faq" },
    { label: "Контакты", id: "contacts" },
  ];

  return (
    <div style={{ fontFamily: "'Onest','Manrope',-apple-system,sans-serif", background: c.bg, color: c.text, minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 50%{transform:translate(-1%,3%)} 90%{transform:translate(-3%,1%)} }
        .noise::before { content:''; position:fixed; inset:-50%; width:200%; height:200%; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); animation:grain 8s steps(10) infinite; pointer-events:none; z-index:0; }
        @media(max-width:768px) {
          .hero-title{font-size:36px!important}
          .section-title{font-size:28px!important}
          .grid-3{grid-template-columns:1fr!important}
          .grid-2{grid-template-columns:1fr!important}
          .form-grid{grid-template-columns:1fr!important}
          .nav-links{display:none!important}
          .mobile-btn{display:flex!important}
          .hero-stats{gap:24px!important}
          .cta-wrap{flex-direction:column;align-items:stretch!important}
        }
      `}</style>

      <div className="noise" />

      {/* ── Header ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 24px", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,11,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span style={{ fontSize: 26 }}>🚛</span>
          <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: -0.5 }}>TowTruck<span style={{ color: c.accent }}>24</span></span>
        </div>

        <nav className="nav-links" style={{ display: "flex", gap: 24 }}>
          {nav.map(l => (
            <a key={l.id} onClick={() => scrollTo(l.id)} style={{ color: c.muted, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = c.text)} onMouseLeave={e => (e.currentTarget.style.color = c.muted)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href="tel:+375290000000" style={{ color: c.accent, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
            <span>📞</span><span className="nav-links" style={{ display: "inline" }}>+375 29 000-00-00</span>
          </a>
          <button className="mobile-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: c.text, fontSize: 24, cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 999, background: "rgba(10,10,11,0.96)", backdropFilter: "blur(20px)", padding: 24, display: "flex", flexDirection: "column", gap: 14, borderBottom: `1px solid ${c.border}` }}>
            {nav.map(l => (
              <a key={l.id} onClick={() => scrollTo(l.id)} style={{ color: c.text, fontSize: 18, fontWeight: 500, cursor: "pointer", padding: "8px 0" }}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: 800, padding: "0 20px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 50, background: c.accentMuted, border: "1px solid rgba(245,166,35,0.2)", marginBottom: 28, fontSize: 14, color: c.accent, fontWeight: 500 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.success, display: "inline-block", animation: "pulse 2s infinite" }} />
            Работаем круглосуточно
          </motion.div>

          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, letterSpacing: -2, marginBottom: 20 }}>
            Эвакуатор в{" "}
            <span style={{ background: "linear-gradient(135deg, #F5A623, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Минске</span>
            <br />за 15 минут
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{ fontSize: 18, color: c.muted, lineHeight: 1.6, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
            Быстрая подача, бережная погрузка, честные цены. Эвакуация любого транспорта 24/7 по Минску и Беларуси.
          </motion.p>

          <motion.div className="cta-wrap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a href="tel:+375290000000" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", borderRadius: 14, background: `linear-gradient(135deg, ${c.accent}, #E8941E)`, color: "#000", fontWeight: 700, fontSize: 16, boxShadow: "0 8px 32px rgba(245,166,35,0.3)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              📞 Вызвать эвакуатор
            </motion.a>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => scrollTo("order")}
              style={{ padding: "16px 36px", borderRadius: 14, background: "transparent", border: `1px solid ${c.border}`, color: c.text, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit" }}>
              Оставить заявку ↓
            </motion.button>
          </motion.div>

          <motion.div className="hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 60, flexWrap: "wrap" }}>
            {[
              { n: "15", u: "мин", l: "Среднее время подачи" },
              { n: "24/7", u: "", l: "Без выходных" },
              { n: "5000", u: "+", l: "Выполненных заказов" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: c.accent }}>{s.n}<span style={{ fontSize: 20 }}>{s.u}</span></div>
                <div style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <S><div id="services" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: c.accent, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Услуги</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>Что мы делаем</h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {services.map((s, i) => (
            <S key={i} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6, borderColor: c.accent }}
                style={{ padding: 28, borderRadius: 18, background: c.surface, border: `1px solid ${c.border}`, transition: "border-color 0.3s", height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: c.muted, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                <div style={{ marginTop: 16, padding: "8px 16px", borderRadius: 10, background: c.accentMuted, color: c.accent, fontWeight: 700, fontSize: 15, width: "fit-content" }}>{s.price}</div>
              </motion.div>
            </S>
          ))}
        </div>
      </div></S>

      {/* ── Advantages ── */}
      <S><div id="advantages" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: c.accent, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Почему мы</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>Преимущества</h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {advantages.map((a, i) => (
            <S key={i} delay={i * 0.06}>
              <div style={{ padding: 24, borderRadius: 16, background: c.surface, border: `1px solid ${c.border}`, display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span style={{ fontSize: 28, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, background: c.accentMuted, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: c.muted, lineHeight: 1.5 }}>{a.desc}</p>
                </div>
              </div>
            </S>
          ))}
        </div>
      </div></S>

      {/* ── Order Form ── */}
      <S><div id="order" style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ color: c.accent, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Быстрая заявка</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>Заказать эвакуатор</h2>
          <p style={{ color: c.muted, marginTop: 8, fontSize: 15 }}>Заполните форму — перезвоним за 5 минут</p>
        </div>
        <div style={{ padding: 32, borderRadius: 20, background: c.surface, border: `1px solid ${c.border}` }}>
          <OrderForm />
        </div>
      </div></S>

      {/* ── CTA ── */}
      <S><div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ padding: "56px 40px", borderRadius: 24, background: "linear-gradient(135deg, rgba(245,166,35,0.15), rgba(245,166,35,0.05))", border: "1px solid rgba(245,166,35,0.2)", textAlign: "center", overflow: "hidden" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Нужен эвакуатор <span style={{ color: c.accent }}>прямо сейчас?</span></h2>
          <p style={{ color: c.muted, marginBottom: 28, fontSize: 16 }}>Звоните — подадим эвакуатор за 15 минут</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a href="tel:+375290000000" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", borderRadius: 14, background: `linear-gradient(135deg, ${c.accent}, #E8941E)`, color: "#000", fontWeight: 700, fontSize: 16, boxShadow: "0 8px 32px rgba(245,166,35,0.3)" }}>
              📞 +375 29 000-00-00
            </motion.a>
            <motion.a href="https://wa.me/375290000000" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", borderRadius: 14, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 16 }}>
              💬 WhatsApp
            </motion.a>
          </div>
        </div>
      </div></S>

      {/* ── Reviews ── */}
      <S><div id="reviews" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: c.accent, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Отзывы</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>Что говорят клиенты</h2>
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {reviews.map((r, i) => (
            <S key={i} delay={i * 0.1}>
              <div style={{ padding: 28, borderRadius: 18, background: c.surface, border: `1px solid ${c.border}` }}>
                <Stars count={r.rating} />
                <p style={{ fontSize: 15, lineHeight: 1.6, margin: "14px 0", color: c.muted }}>"{r.text}"</p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
              </div>
            </S>
          ))}
        </div>
      </div></S>

      {/* ── FAQ ── */}
      <S><div id="faq" style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: c.accent, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>FAQ</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>Частые вопросы</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqData.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div></S>

      {/* ── Contacts ── */}
      <S><div id="contacts" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: c.accent, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Контакты</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>Свяжитесь с нами</h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            { icon: "📞", title: "Телефон", lines: ["+375 29 000-00-00", "+375 29 000-00-00"], sub: "Круглосуточно" },
            { icon: "📍", title: "Адрес", lines: ["г. Минск", "ул. Примерная, 1"], sub: "Офис и стоянка" },
            { icon: "📧", title: "Email & соцсети", lines: ["info@towtruck24.by", "Telegram / WhatsApp"], sub: "Ответим за 30 минут" },
          ].map((ct, i) => (
            <div key={i} style={{ padding: 28, borderRadius: 18, background: c.surface, border: `1px solid ${c.border}`, textAlign: "center" }}>
              <span style={{ fontSize: 36, display: "block", marginBottom: 12 }}>{ct.icon}</span>
              <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 18 }}>{ct.title}</h3>
              {ct.lines.map((l, j) => <div key={j} style={{ color: c.text, fontSize: 15, marginBottom: 4 }}>{l}</div>)}
              <div style={{ color: c.muted, fontSize: 13, marginTop: 8 }}>{ct.sub}</div>
            </div>
          ))}
        </div>
      </div></S>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "40px 24px", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🚛</span>
            <span style={{ fontWeight: 800, fontSize: 18 }}>TowTruck<span style={{ color: c.accent }}>24</span></span>
          </div>
          <div style={{ color: c.muted, fontSize: 13 }}>© 2024 TowTruck24. Все права защищены.</div>
          <div style={{ color: c.muted, fontSize: 13 }}>УНП KA5795000</div>
        </div>
      </footer>

      <AIChatBot />
    </div>
  );
}
