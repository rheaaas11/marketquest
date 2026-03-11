import { useState, useContext, createContext, useEffect, useRef } from "react";

// ─── CONTEXT ────────────────────────────────────────────────────────────────
const GameContext = createContext(null);

const initialState = {
  traderName: "Trader",
  avatar: "🧑‍💻",
  level: 3,
  xp: 140,
  xpToNextLevel: 200,
  virtualCash: 10000.0,
  portfolio: [
    { ticker: "AAPL", shares: 5, avgCost: 178.5, current: 182.3 },
    { ticker: "NVDA", shares: 2, avgCost: 412.0, current: 467.8 },
    { ticker: "SPY", shares: 3, avgCost: 445.0, current: 451.2 },
  ],
  transactions: [],
  completedModules: ["intro-markets", "supply-demand"],
  completedQuests: ["first-trade", "diversify"],
  earnedBadges: ["🎯 First Trade", "📊 Analyst", "🧠 Thinker"],
  biasLog: [],
  onboardingComplete: false,
  learnerType: null,
  currentTrack: "both",
  settings: { soundOn: false, marketSpeed: "normal" },
  notifications: 3,
};

function GameProvider({ children }) {
  const [state, setState] = useState(initialState);
  const updateState = (patch) => setState((s) => ({ ...s, ...patch }));
  return (
    <GameContext.Provider value={{ state, updateState }}>
      {children}
    </GameContext.Provider>
  );
}

// ─── ICONS (SVG) ─────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="7" fill="#10B981" fillOpacity="0.15" />
    <path d="M6 18 L10 12 L14 15 L18 8 L22 11" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="19" cy="10" r="3" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="1.5"/>
    <path d="M12 20 Q14 16 16 20" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="9" cy="20" r="1.5" fill="#F59E0B"/>
    <circle cx="19" cy="20" r="1.5" fill="#F59E0B"/>
  </svg>
);

const IconHome = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconBook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
);
const IconChart = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconBriefcase = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/>
  </svg>
);
const IconTarget = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconBrain = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7v0A2.5 2.5 0 012 9.5v1A2.5 2.5 0 004.5 13v0A2.5 2.5 0 007 15.5v0A2.5 2.5 0 009.5 18H10v4h4v-4h.5A2.5 2.5 0 0017 15.5v0A2.5 2.5 0 0019.5 13v0A2.5 2.5 0 0022 10.5v-1A2.5 2.5 0 0019.5 7v0A2.5 2.5 0 0017 4.5v0A2.5 2.5 0 0014.5 2h-5z"/>
  </svg>
);
const IconUser = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconWallet = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 000 4h4v-4z"/>
  </svg>
);
const IconBell = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const IconChevron = ({ size = 16, dir = "right" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(180deg)" : dir === "down" ? "rotate(90deg)" : dir === "up" ? "rotate(270deg)" : "" }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconTrendUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconTrendDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
  </svg>
);
const IconStar = ({ size = 14, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconZap = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconShield = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconAsk = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    <circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/>
  </svg>
);

// ─── NAV CONFIG ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home",       label: "Home",           Icon: IconHome,      desc: "Your trading command center" },
  { id: "learn",      label: "Learn",          Icon: IconBook,      desc: "Theory hub & learning modules" },
  { id: "trade",      label: "Trade",          Icon: IconChart,     desc: "Live market simulation game" },
  { id: "portfolio",  label: "Portfolio",      Icon: IconBriefcase, desc: "Your holdings & performance" },
  { id: "quests",     label: "Quests",         Icon: IconTarget,    desc: "Challenges & achievements" },
  { id: "psychology", label: "Psychology Lab", Icon: IconBrain,     desc: "Understand your trading mind" },
  { id: "ask",        label: "Ask Anything",   Icon: IconAsk,       desc: "Ask why anything happened in markets" },
  { id: "profile",    label: "Profile",        Icon: IconUser,      desc: "Stats, badges & settings" },
];

// ─── LEVEL TITLES ─────────────────────────────────────────────────────────────
const LEVEL_TITLES = ["","Rookie","Observer","Analyst","Momentum Trader","Swing Trader","Value Investor","Risk Manager","Fund Manager","Market Sage","Market Master"];

// ─── MINI SPARKLINE ──────────────────────────────────────────────────────────
function Sparkline({ data, color = "#10B981", width = 80, height = 30 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={`0,${height} ${pts} ${width},${height}`} fill={color} fillOpacity="0.08" stroke="none"/>
    </svg>
  );
}

// ─── XP BAR ──────────────────────────────────────────────────────────────────
function XPBar({ xp, max, compact = false }) {
  const pct = Math.min((xp / max) * 100, 100);
  return (
    <div style={{ width: "100%" }}>
      {!compact && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#94A3B8", fontSize: 11 }}>XP</span>
          <span style={{ color: "#F59E0B", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{xp} / {max}</span>
        </div>
      )}
      <div style={{ height: compact ? 3 : 5, background: "#1E2D40", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #F59E0B, #FBBF24)", borderRadius: 99, transition: "width 0.6s ease" }}/>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ active, onNav, collapsed, onToggle }) {
  const { state } = useContext(GameContext);

  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: "100vh",
      background: "#0A0F1A",
      borderRight: "1px solid #1E2D40",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 18px" : "20px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #1E2D40", minHeight: 64 }}>
        <div style={{ flexShrink: 0 }}><Logo /></div>
        {!collapsed && (
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: "#F1F5F9", whiteSpace: "nowrap", letterSpacing: "-0.3px" }}>
            Market<span style={{ color: "#10B981" }}>Quest</span>
          </span>
        )}
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <button onClick={onToggle} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}>
            <IconChevron size={14} dir={collapsed ? "right" : "left"} />
          </button>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: isActive ? "rgba(16,185,129,0.08)" : "transparent",
                color: isActive ? "#10B981" : "#94A3B8",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                textAlign: "left",
                width: "100%",
                transition: "all 0.15s ease",
                position: "relative",
                boxShadow: isActive ? "inset 3px 0 0 #10B981" : "none",
                whiteSpace: "nowrap",
              }}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
              {isActive && !collapsed && (
                <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div style={{ padding: collapsed ? "12px 8px" : "12px 14px", borderTop: "1px solid #1E2D40" }}>
        {collapsed ? (
          <div style={{ textAlign: "center", fontSize: 22 }}>{state.avatar}</div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <div style={{ fontSize: 26, lineHeight: 1 }}>{state.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 13, color: "#F1F5F9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{state.traderName}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 4, fontFamily: "'DM Mono', monospace" }}>LVL {state.level}</span>
                </div>
              </div>
            </div>
            <XPBar xp={state.xp} max={state.xpToNextLevel} compact={false} />
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
function Header({ page }) {
  const { state } = useContext(GameContext);
  const item = NAV_ITEMS.find(n => n.id === page);

  return (
    <header style={{
      height: 64,
      borderBottom: "1px solid #1E2D40",
      display: "flex",
      alignItems: "center",
      padding: "0 28px",
      gap: 16,
      background: "rgba(8,12,20,0.92)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: "#F1F5F9", margin: 0 }}>{item?.label}</h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#475569", margin: 0 }}>{item?.desc}</p>
      </div>

      {/* Market Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 20, padding: "4px 12px" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#10B981", fontWeight: 500 }}>MARKET OPEN</span>
      </div>

      {/* Cash */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#0F1623", border: "1px solid #1E2D40", borderRadius: 8, padding: "6px 14px" }}>
        <IconWallet size={15} style={{ color: "#F59E0B" }} />
        <span style={{ color: "#F59E0B", fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 500 }}>
          ${state.virtualCash.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Notifications */}
      <button style={{ position: "relative", background: "#0F1623", border: "1px solid #1E2D40", borderRadius: 8, padding: "8px", cursor: "pointer", color: "#94A3B8", display: "flex", alignItems: "center" }}>
        <IconBell size={16} />
        {state.notifications > 0 && (
          <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#EF4444", borderRadius: "50%", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{state.notifications}</span>
        )}
      </button>
    </header>
  );
}

// ─── SHARED CARD ─────────────────────────────────────────────────────────────
function Card({ children, style = {}, glow }) {
  return (
    <div style={{
      background: "#0F1623",
      border: `1px solid ${glow ? "rgba(16,185,129,0.3)" : "#1E2D40"}`,
      borderRadius: 12,
      padding: 20,
      boxShadow: glow ? "0 0 20px rgba(16,185,129,0.06)" : "none",
      ...style,
    }}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, color = "#10B981", icon, trend }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ color: "#475569", fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>{label}</span>
        {icon && <span style={{ color, opacity: 0.7 }}>{icon}</span>}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 700, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      {sub && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          {trend === "up" && <span style={{ color: "#10B981" }}><IconTrendUp size={12} /></span>}
          {trend === "down" && <span style={{ color: "#EF4444" }}><IconTrendDown size={12} /></span>}
          <span style={{ color: "#475569", fontSize: 11, fontFamily: "'Outfit', sans-serif" }}>{sub}</span>
        </div>
      )}
    </Card>
  );
}

// ─── HOME PAGE DATA ────────────────────────────────────────────────────────────
const TICKER_STOCKS = [
  { ticker:"AAPL",  price:182.45, chg:+1.2  },
  { ticker:"TSLA",  price:243.80, chg:-2.1  },
  { ticker:"NVDA",  price:875.20, chg:+3.4  },
  { ticker:"MSFT",  price:415.30, chg:+0.8  },
  { ticker:"AMZN",  price:185.60, chg:+1.5  },
  { ticker:"META",  price:525.10, chg:+2.2  },
  { ticker:"GOOGL", price:175.40, chg:-0.5  },
  { ticker:"JPM",   price:198.70, chg:+0.3  },
  { ticker:"NFLX",  price:625.90, chg:+1.8  },
  { ticker:"JNJ",   price:152.30, chg:-0.7  },
];

const NEWS_ITEMS = [
  { headline:"Fed signals pause on rate hikes — Markets rally", sentiment:"bullish", time:"2 min ago",
    body:["The Federal Reserve indicated it may hold interest rates steady after 18 months of aggressive hikes. This is broadly positive for stocks because lower rates reduce borrowing costs for companies, boosting profitability.", "For investors, a Fed pause typically signals that inflation is cooling and the economy is stabilizing. Markets tend to react positively because it lowers the 'discount rate' used to value future earnings.", "However, caution is warranted — a pause doesn't mean cuts. If inflation re-accelerates, the Fed could resume hiking. Watch the next CPI print carefully."] },
  { headline:"NVDA announces AI chip partnership with major cloud providers", sentiment:"bullish", time:"14 min ago",
    body:["NVIDIA announced expanded supply agreements with Amazon Web Services, Google Cloud, and Microsoft Azure for its latest H100 and upcoming B200 AI chips. This cements NVDA's dominance in the AI infrastructure buildout.", "AI chip demand has been the defining investment theme of 2024. Cloud providers are racing to offer AI compute to enterprise customers, and NVDA is the primary supplier of the GPUs needed to train and run large models.", "The risk: NVDA trades at very high valuations. Any slowdown in AI spending or a competing chip from AMD, Intel, or custom silicon from the cloud giants themselves could trigger a sharp correction."] },
  { headline:"Consumer confidence index drops to 3-month low", sentiment:"bearish", time:"38 min ago",
    body:["The Conference Board's Consumer Confidence Index fell to 98.7, below the expected 102.3. This signals Americans are becoming more pessimistic about their financial situation and job prospects.", "Consumer spending drives roughly 70% of U.S. GDP. When confidence drops, people tend to spend less and save more — this can slow earnings growth for retail, hospitality, and discretionary sectors.", "From a behavioral economics perspective, this is a classic 'sentiment leading fundamentals' signal. Watch for it to either reverse quickly (if jobs data stays strong) or cascade into actual spending declines over 60–90 days."] },
  { headline:"Oil prices surge amid Middle East supply concerns", sentiment:"neutral", time:"1 hr ago",
    body:["Crude oil prices rose 3.2% after reports of potential supply disruptions in a key shipping corridor. Brent crude crossed $88/barrel for the first time in six weeks.", "Rising oil prices act as a tax on the economy — higher energy costs squeeze corporate margins (especially in transport and manufacturing) and reduce consumer purchasing power. This is inflationary.", "The market reaction is mixed: energy stocks (XOM, CVX) benefit directly, while airlines, trucking companies, and consumer staples firms face margin pressure. If oil sustains above $90, expect analysts to revise earnings estimates downward for affected sectors."] },
];

const QUICK_TIPS = [
  { type:"science",    text:"📊 A P/E ratio above 25 is generally considered expensive — but context matters. A fast-growing company might deserve a higher multiple than a slow, mature one." },
  { type:"reasoning", text:"🧠 'Loss aversion' means losing $100 hurts roughly twice as much as gaining $100 feels good. This distorts how investors trade — causing them to hold losers too long and sell winners too soon." },
  { type:"science",    text:"📊 Diversification doesn't eliminate risk — it eliminates unnecessary risk. Holding 20 uncorrelated stocks reduces volatility dramatically without sacrificing expected return." },
  { type:"reasoning", text:"🧠 The 'availability heuristic' makes investors overweight recent, vivid events. After a crash, everyone expects another crash. After a rally, everyone expects more gains." },
  { type:"science",    text:"📊 The S&P 500 has returned roughly 10% per year on average over the past century — but 'on average' hides decades of +40% and -40% years in between." },
  { type:"reasoning", text:"🧠 Bubbles follow a predictable 5-stage pattern: displacement, boom, euphoria, profit-taking, panic. The hard part isn't knowing the stages — it's knowing which stage you're in right now." },
];

// ─── MARKET MOOD GAUGE ────────────────────────────────────────────────────────
function MoodGauge({ value = 52 }) {
  const clamp = Math.min(100, Math.max(0, value));
  const angle = -180 + (clamp / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 110, cy = 100, r = 80;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);
  const label = clamp <= 20 ? "Extreme Fear" : clamp <= 40 ? "Fear" : clamp <= 60 ? "Neutral" : clamp <= 80 ? "Greed" : "Extreme Greed";
  const color = clamp <= 20 ? "#EF4444" : clamp <= 40 ? "#F97316" : clamp <= 60 ? "#F59E0B" : clamp <= 80 ? "#84CC16" : "#10B981";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <svg width="220" height="118" viewBox="0 0 220 118">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#EF4444"/>
            <stop offset="25%"  stopColor="#F97316"/>
            <stop offset="50%"  stopColor="#F59E0B"/>
            <stop offset="75%"  stopColor="#84CC16"/>
            <stop offset="100%" stopColor="#10B981"/>
          </linearGradient>
        </defs>
        <path d={`M${cx-r},${cy} A${r},${r} 0 0,1 ${cx+r},${cy}`} fill="none" stroke="#1E2D40" strokeWidth="16" strokeLinecap="round"/>
        <path d={`M${cx-r},${cy} A${r},${r} 0 0,1 ${cx+r},${cy}`} fill="none" stroke="url(#gaugeGrad)" strokeWidth="16" strokeLinecap="round" strokeOpacity="0.9"/>
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r="5" fill={color}/>
        <circle cx={cx} cy={cy} r="2.5" fill="#080C14"/>
        <text x="10"  y="114" style={{ fontFamily:"DM Mono,monospace", fontSize:"8px", fill:"#EF444488" }}>FEAR</text>
        <text x="174" y="114" style={{ fontFamily:"DM Mono,monospace", fontSize:"8px", fill:"#10B98188" }}>GREED</text>
      </svg>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:28, fontWeight:700, color, lineHeight:1 }}>{clamp}</div>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color, marginTop:2 }}>{label}</div>
    </div>
  );
}

// ─── PROGRESS RING ────────────────────────────────────────────────────────────
function ProgressRing({ pct, color, size=84, stroke=7, label, sub }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1E2D40" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}/>
      </svg>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12, color:"#F1F5F9" }}>{label}</div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:color }}>{sub}</div>
    </div>
  );
}

// ─── NEWS MODAL ───────────────────────────────────────────────────────────────
function NewsModal({ item, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const sc = item.sentiment === "bullish" ? "#10B981" : item.sentiment === "bearish" ? "#EF4444" : "#F59E0B";
  const se = item.sentiment === "bullish" ? "🟢" : item.sentiment === "bearish" ? "🔴" : "🟡";
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.78)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(6px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0F1623", border:"1px solid #1E2D40", borderRadius:16, padding:"28px 30px", maxWidth:560, width:"100%", animation:"fadeSlideUp 0.25s ease forwards" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <span style={{ background:`${sc}15`, border:`1px solid ${sc}40`, color:sc, fontFamily:"'DM Mono',monospace", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{se} {item.sentiment.toUpperCase()}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", fontSize:22, lineHeight:1 }}>×</button>
        </div>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:"#F1F5F9", marginBottom:18, lineHeight:1.4 }}>{item.headline}</h3>
        {item.body.map((para, i) => (
          <p key={i} style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, color:"#94A3B8", lineHeight:1.8, marginBottom:12 }}>{para}</p>
        ))}
        <div style={{ marginTop:6, fontFamily:"'DM Mono',monospace", fontSize:11, color:"#475569" }}>MarketMind Wire · {item.time}</div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const { state } = useContext(GameContext);
  const [tick, setTick]         = useState(0);
  const [tipIdx, setTipIdx]     = useState(0);
  const [newsModal, setNewsModal] = useState(null);
  const [hoveredXP, setHoveredXP] = useState(false);

  useEffect(() => { const id = setInterval(() => setTick(t => t+1), 2500); return () => clearInterval(id); }, []);
  useEffect(() => { const id = setInterval(() => setTipIdx(i => (i+1) % QUICK_TIPS.length), 8000); return () => clearInterval(id); }, []);

  const totalValue = state.portfolio.reduce((s, h) => s + h.shares * h.current, 0);
  const totalCost  = state.portfolio.reduce((s, h) => s + h.shares * h.avgCost,  0);
  const totalPnL   = totalValue - totalCost;
  const netWorth   = totalValue + state.virtualCash;
  const pnlPct     = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;
  const levelTitle = LEVEL_TITLES[state.level] || "Trader";
  const xpPct      = Math.min((state.xp / state.xpToNextLevel) * 100, 100);

  const now = new Date();
  const dateStr = `${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][now.getDay()]}, ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][now.getMonth()]} ${now.getDate()}`;

  const liveStocks = TICKER_STOCKS.map(s => ({ ...s, price:+(s.price + Math.sin(tick * 0.4 + s.ticker.charCodeAt(0) * 0.3) * 0.8).toFixed(2) }));

  const scienceMods    = ["s1","s2","s3","s4","s5","s6"];
  const humanitiesMods = ["h1","h2","h3","h4","h5","h6"];
  const sciDone = state.completedModules.filter(m => scienceMods.includes(m)).length;
  const humDone = state.completedModules.filter(m => humanitiesMods.includes(m)).length;

  const tip = QUICK_TIPS[tipIdx];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>

      {/* ── S1: GREETING ───────────────────────────────────────────────── */}
      <div style={{ background:"linear-gradient(135deg,#0D1B2A 0%,#0F1623 60%,#0A1520 100%)", border:"1px solid #1E2D40", borderRadius:16, padding:"22px 26px", position:"relative", overflow:"hidden" }}>
        <svg style={{ position:"absolute", right:0, top:0, bottom:0, opacity:0.05, height:"100%", width:260 }} viewBox="0 0 260 100" preserveAspectRatio="none">
          <polyline points="0,80 40,60 80,70 120,30 160,45 200,20 260,35" fill="none" stroke="#10B981" strokeWidth="2"/>
        </svg>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#475569" }}>{dateStr}</span>
            <span style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:20, padding:"2px 10px" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", display:"inline-block", animation:"pulse 2s infinite" }}/>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#10B981" }}>Market OPEN</span>
            </span>
          </div>
          <h1 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:28, color:"#F1F5F9", marginBottom:16, letterSpacing:"-0.3px" }}>
            Good morning, {state.traderName} {state.avatar}
          </h1>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[
              { emoji:"💵", label:"Portfolio Value", val:`$${netWorth.toLocaleString("en-US",{minimumFractionDigits:2})}`,                               color:"#10B981" },
              { emoji:"📈", label:"Today's P&L",     val:`${totalPnL>=0?"+":""}$${totalPnL.toFixed(2)} (${pnlPct>=0?"+":""}${pnlPct.toFixed(2)}%)`,       color:totalPnL>=0?"#10B981":"#EF4444" },
              { emoji:"⚡", label:"XP",              val:`${state.xp} / ${state.xpToNextLevel}`,                                                           color:"#F59E0B" },
              { emoji:"🏆", label:"Level",           val:`${state.level} — ${levelTitle}`,                                                                 color:"#3B82F6" },
            ].map(p => (
              <div key={p.label} style={{ background:"rgba(15,22,35,0.85)", border:"1px solid #1E2D40", borderRadius:10, padding:"9px 14px", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:15 }}>{p.emoji}</span>
                <div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#475569", marginBottom:1 }}>{p.label}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:p.color }}>{p.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── S2: XP BAR ─────────────────────────────────────────────────── */}
      <div style={{ background:"#0F1623", border:"1px solid #1E2D40", borderRadius:12, padding:"13px 20px", position:"relative", cursor:"default" }}
        onMouseEnter={() => setHoveredXP(true)}
        onMouseLeave={() => setHoveredXP(false)}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#F59E0B", fontWeight:700, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:6, padding:"2px 9px" }}>LVL {state.level}</span>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, color:"#F1F5F9" }}>{levelTitle}</span>
          </div>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#94A3B8" }}>{state.xp} / {state.xpToNextLevel} XP</span>
        </div>
        <div style={{ height:12, background:"#080C14", borderRadius:99, border:"1px solid #1E2D40", position:"relative", overflow:"hidden" }}>
          {[25,50,75].map(x => <div key={x} style={{ position:"absolute", left:`${x}%`, top:0, bottom:0, width:1, background:"rgba(255,255,255,0.04)" }}/>)}
          <div style={{ height:"100%", width:`${xpPct}%`, background:"linear-gradient(90deg,#10B981,#34D399,#6EE7B7)", borderRadius:99, transition:"width 1s ease", boxShadow:"0 0 10px rgba(16,185,129,0.4)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent 40%,rgba(255,255,255,0.15) 60%,transparent 80%)", animation:"shimmer 2.4s infinite" }}/>
          </div>
        </div>
        {hoveredXP && (
          <div style={{ position:"absolute", top:-40, left:"50%", transform:"translateX(-50%)", background:"#162033", border:"1px solid #1E2D40", borderRadius:8, padding:"5px 14px", whiteSpace:"nowrap", zIndex:10 }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#F1F5F9" }}>Next: <strong style={{ color:"#F59E0B" }}>{LEVEL_TITLES[state.level+1]||"Max Level"}</strong></span>
          </div>
        )}
        <div style={{ marginTop:6, fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#475569" }}>
          {state.xpToNextLevel - state.xp} XP to Level {state.level+1} · {LEVEL_TITLES[state.level+1]||"Max Level"}
        </div>
      </div>

      {/* ── TICKER STRIP ───────────────────────────────────────────────── */}
      <div style={{ background:"#080C14", border:"1px solid #1E2D40", borderRadius:10, overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:40, background:"linear-gradient(90deg,#080C14,transparent)", zIndex:2, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:40, background:"linear-gradient(270deg,#080C14,transparent)", zIndex:2, pointerEvents:"none" }}/>
        <div style={{ display:"flex", padding:"9px 0", overflow:"hidden" }}>
          <div style={{ display:"flex", animation:"tickerScroll 30s linear infinite", whiteSpace:"nowrap", flexShrink:0 }}>
            {[...liveStocks,...liveStocks].map((s,i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"0 22px", borderRight:"1px solid #1E2D40" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:"#F1F5F9" }}>{s.ticker}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#94A3B8" }}>${s.price.toFixed(2)}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:s.chg>=0?"#10B981":"#EF4444" }}>{s.chg>=0?"▲":"▼"}{Math.abs(s.chg)}%</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── S3: TWO-COLUMN ─────────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 370px", gap:18, alignItems:"start" }}>

        {/* LEFT */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* B) Featured Lesson */}
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:"#F1F5F9" }}>📚 Today's Lesson</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#475569" }}>FEATURED</span>
            </div>
            <div style={{ background:"rgba(59,130,246,0.05)", border:"1px solid rgba(59,130,246,0.18)", borderRadius:12, padding:"18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <span style={{ background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.3)", borderRadius:6, padding:"2px 9px", fontFamily:"'DM Mono',monospace", fontSize:10, color:"#3B82F6", fontWeight:700 }}>💡 UNDERSTANDING</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#475569" }}>4 min read</span>
              </div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:17, color:"#F1F5F9", marginBottom:8, lineHeight:1.3 }}>
                The Herd Mentality — Why smart people make terrible decisions together
              </div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#94A3B8", lineHeight:1.7, marginBottom:14 }}>
                From the tulip mania of 1637 to GameStop in 2021, markets repeatedly show that individual rationality doesn't prevent collective irrationality. Understanding why is the key to not being the last one holding the bag.
              </div>
              <button style={{ background:"linear-gradient(135deg,#3B82F6,#2563EB)", border:"none", borderRadius:8, padding:"9px 20px", color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer", boxShadow:"0 0 14px rgba(59,130,246,0.22)" }}>
                Start Lesson →
              </button>
            </div>
          </Card>

          {/* C) Active Quest */}
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:"#F1F5F9" }}>🎯 Active Quest</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#F59E0B" }}>IN PROGRESS</span>
            </div>
            <div style={{ background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:12, padding:"16px 18px" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:"#F59E0B", marginBottom:4 }}>Sector Diversifier</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#94A3B8", marginBottom:12 }}>Buy a stock in 3 different sectors to understand how different industries move independently.</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#475569" }}>Progress</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#F59E0B", fontWeight:700 }}>1 / 3 sectors</span>
              </div>
              <div style={{ height:5, background:"#1E2D40", borderRadius:99, marginBottom:12 }}>
                <div style={{ height:"100%", width:"33%", background:"linear-gradient(90deg,#F59E0B,#FCD34D)", borderRadius:99 }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#10B981" }}>Reward: +200 XP</span>
                <button style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:8, padding:"7px 14px", color:"#F59E0B", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:12, cursor:"pointer" }}>
                  Continue →
                </button>
              </div>
            </div>
          </Card>

          {/* D) News Feed */}
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:"#F1F5F9" }}>📰 Market News</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#10B981" }}>● LIVE</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {NEWS_ITEMS.map((n, i) => {
                const sc = n.sentiment==="bullish"?"#10B981":n.sentiment==="bearish"?"#EF4444":"#F59E0B";
                const se = n.sentiment==="bullish"?"🟢":n.sentiment==="bearish"?"🔴":"🟡";
                return (
                  <div key={i} onClick={() => setNewsModal(n)}
                    style={{ padding:"11px 8px", borderBottom:i<NEWS_ITEMS.length-1?"1px solid #1E2D4045":"none", cursor:"pointer", borderRadius:6, transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#162033"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13, color:"#F1F5F9", marginBottom:5, lineHeight:1.4 }}>{n.headline}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#475569" }}>MarketMind Wire</span>
                      <span style={{ color:"#1E2D40" }}>·</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#475569" }}>{n.time}</span>
                      <span style={{ marginLeft:"auto", background:`${sc}10`, border:`1px solid ${sc}30`, color:sc, fontSize:9, fontFamily:"'DM Mono',monospace", fontWeight:700, padding:"1px 7px", borderRadius:20 }}>{se} {n.sentiment.toUpperCase()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* E) Mood Meter */}
          <Card glow style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, color:"#F1F5F9", marginBottom:4 }}>🌡️ Market Sentiment Today</div>
            <MoodGauge value={52 + Math.round(Math.sin(tick*0.2)*6)} />
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#94A3B8", lineHeight:1.7, marginTop:10, textAlign:"left", padding:"0 2px" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#3B82F6" }}>🧠 INSIGHT  </span>
              When greed is high, bubbles often form. When fear is high, bargains appear — but only if you can stay rational.
            </div>
          </Card>

          {/* F) Learning Rings */}
          <Card>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, color:"#F1F5F9", marginBottom:14 }}>Your Learning Path</div>
            <div style={{ display:"flex", justifyContent:"space-around", marginBottom:14 }}>
              <ProgressRing pct={(sciDone/6)*100} color="#10B981" size={84} stroke={7} label="📊 Data"    sub={`${sciDone}/6 done`}/>
              <ProgressRing pct={(humDone/6)*100} color="#3B82F6" size={84} stroke={7} label="🧠 Psychology" sub={`${humDone}/6 done`}/>
            </div>
            <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:8, padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#475569", marginBottom:1 }}>Next up</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13, color:"#F1F5F9" }}>Reading Candlestick Charts</div>
              </div>
              <button style={{ background:"#10B981", border:"none", borderRadius:7, padding:"7px 12px", color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer" }}>→</button>
            </div>
          </Card>

          {/* G) Leaderboard */}
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, color:"#F1F5F9" }}>🏆 Weekly Leaders</span>
              <button style={{ background:"none", border:"none", color:"#3B82F6", fontFamily:"'Outfit',sans-serif", fontSize:12, cursor:"pointer", fontWeight:600 }}>Full Board →</button>
            </div>
            {[
              { rank:"🥇", name:"QuantQueen",        avatar:"👩‍💼", val:"$12,840", gain:"+$2,840", gainColor:"#10B981", isYou:false },
              { rank:"🥈", name:"BullRunBen",         avatar:"🐂",  val:"$11,920", gain:"+$1,920", gainColor:"#10B981", isYou:false },
              { rank:"🥉", name:state.traderName,    avatar:state.avatar, val:`$${netWorth.toFixed(0)}`, gain:"+$0", gainColor:"#94A3B8", isYou:true },
            ].map((p, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 8px", borderRadius:9, background:p.isYou?"rgba(16,185,129,0.06)":"transparent", border:p.isYou?"1px solid rgba(16,185,129,0.15)":"1px solid transparent", marginBottom:6 }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{p.rank}</span>
                <span style={{ fontSize:20, flexShrink:0 }}>{p.avatar}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13, color:p.isYou?"#10B981":"#F1F5F9", display:"flex", alignItems:"center", gap:5 }}>
                    {p.name}
                    {p.isYou && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#10B981", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:4, padding:"1px 5px" }}>YOU</span>}
                  </div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#475569" }}>{p.val}</div>
                </div>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:p.gainColor, fontWeight:700 }}>{p.gain}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* ── S4: TIPS CAROUSEL ──────────────────────────────────────────── */}
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <div style={{ flex:1, display:"flex", alignItems:"flex-start", gap:10 }}>
            <span style={{ background:tip.type==="science"?"rgba(16,185,129,0.1)":"rgba(59,130,246,0.1)", border:`1px solid ${tip.type==="science"?"rgba(16,185,129,0.25)":"rgba(59,130,246,0.25)"}`, color:tip.type==="science"?"#10B981":"#3B82F6", fontFamily:"'DM Mono',monospace", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:4, whiteSpace:"nowrap", marginTop:2 }}>
              {tip.type==="science"?"📊 DATA":"💡 UNDERSTANDING"}
            </span>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#94A3B8", lineHeight:1.7, margin:0 }}>{tip.text}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
            {QUICK_TIPS.map((_, i) => (
              <div key={i} onClick={() => setTipIdx(i)} style={{ width:i===tipIdx?16:6, height:6, borderRadius:99, background:i===tipIdx?"#10B981":"#1E2D40", transition:"all 0.3s", cursor:"pointer" }}/>
            ))}
            <button onClick={() => setTipIdx(i => (i+1)%QUICK_TIPS.length)} style={{ background:"#162033", border:"1px solid #1E2D40", borderRadius:6, padding:"4px 10px", color:"#94A3B8", cursor:"pointer", fontSize:13, marginLeft:4 }}>→</button>
          </div>
        </div>
      </Card>

      {newsModal && <NewsModal item={newsModal} onClose={() => setNewsModal(null)} />}
    </div>
  );
}

// ─── LEARN: MODULE DATA ───────────────────────────────────────────────────────
const ALL_MODULES = {
  science: [
    {
      id:"s1", title:"What Is a Stock?", emoji:"📈", track:"science", xp:25, time:"5 min",
      cards:[
        { type:"lesson", title:"A stock is ownership",
          body:"When a company wants to raise money, it splits ownership into tiny pieces called shares. Buy a share of Apple, and you literally own a tiny fraction of Apple Inc. If Apple grows, your share grows. If Apple struggles, your share falls.",
          visual:"pie" },
        { type:"lesson", title:"How price is determined",
          body:"Stock prices aren't set by companies — they're set by the last price someone agreed to buy or sell at. If more people want to buy than sell, prices rise. More sellers than buyers? Prices fall. It's pure supply and demand.",
          visual:"scale" },
        { type:"lesson", title:"The Stock Exchange",
          body:"The NYSE and NASDAQ are digital marketplaces where millions of trades happen every second. When you 'buy a stock', you're matching with another person who wants to sell. A computer finds the match in milliseconds.",
          visual:"flow" },
        { type:"lesson", title:"Why companies go public (IPO)",
          body:"When a private company sells shares to the public for the first time, it's called an IPO (Initial Public Offering). The company gets a huge influx of cash. Investors get a chance to own part of something growing.",
          callout:"When Google went public in 2004 at $85/share, early investors who held saw it reach $3,000+." },
        { type:"quiz", question:"Why do stock prices change every second?",
          options:["Companies update their official price each second","Supply and demand — more buyers = higher price","The government sets them","It's random"],
          correct:1, explanation:"Prices are set by the market — wherever buyers and sellers agree to transact. More demand than supply pushes prices up, and vice versa." },
      ]
    },
    {
      id:"s2", title:"Reading Stock Charts", emoji:"🕯️", track:"science", xp:30, time:"6 min",
      cards:[
        { type:"lesson", title:"Line charts vs candlestick charts",
          body:"A line chart shows closing prices over time — simple, but lossy. A candlestick chart shows open, high, low, and close for every period. Traders prefer candlesticks because they reveal the full story of each day's battle between buyers and sellers.",
          visual:"candle-intro" },
        { type:"lesson", title:"How to read a candlestick",
          body:"Each candle has a body (between open and close) and wicks (the high and low). A green candle means the price closed higher than it opened — buyers won the day. A red candle means sellers won. The longer the wick, the more the price was rejected at that level.",
          visual:"candle-detail" },
        { type:"lesson", title:"Volume: the market's heartbeat",
          body:"Volume shows how many shares were traded. High volume on a price move confirms conviction — many people agreed on the new price. Low volume moves are suspect — they can reverse easily. Always check volume before trusting a breakout.",
          visual:"volume-bars" },
        { type:"lesson", title:"Support and resistance",
          body:"Support is a price level where buyers historically step in and stop a fall. Resistance is where sellers historically appear and stop a rise. These levels act like invisible floors and ceilings — until they break.",
          visual:"support-resistance" },
        { type:"quiz", question:"A green candlestick means...",
          options:["The stock was in the news","The closing price was higher than the opening price","The stock hit an all-time high","Volume was above average"],
          correct:1, explanation:"Green (bullish) candles close higher than they open — buyers dominated that session. Red (bearish) candles close lower than they open." },
      ]
    },
    {
      id:"s3", title:"The Numbers Behind Stocks", emoji:"🔢", track:"science", xp:35, time:"7 min",
      cards:[
        { type:"lesson", title:"P/E Ratio: the most-watched number",
          body:"P/E = Stock Price ÷ Earnings Per Share. It tells you how much investors pay for each $1 of profit. A P/E of 20 means you're paying $20 for every $1 the company earns. High P/E = high expectations. Low P/E = low expectations (or a bargain).",
          visual:"pe-compare" },
        { type:"lesson", title:"Earnings Per Share (EPS)",
          body:"EPS = Total Profit ÷ Shares Outstanding. If a company earns $1 billion and has 500 million shares, EPS = $2. This is the baseline of all valuation. Companies that grow EPS consistently tend to see their stock price grow with it.",
          callout:"A company can have rising revenue but falling EPS if it keeps issuing new shares (dilution). Always check EPS, not just profit." },
        { type:"lesson", title:"Market Cap: the company's price tag",
          body:"Market Cap = Share Price × Total Shares. Apple at $180/share × 15 billion shares = ~$2.7 trillion market cap. Large-cap (>$10B) = stable. Mid-cap ($2–10B) = growing. Small-cap (<$2B) = risky but high-upside.",
          visual:"cap-bars" },
        { type:"lesson", title:"Dividend Yield: getting paid to hold",
          body:"Some companies pay shareholders a portion of profits as cash dividends. Dividend Yield = Annual Dividend ÷ Stock Price. A 3% yield on a $100 stock means you earn $3/year per share just for holding it — before any price gains.",
          callout:"Warren Buffett's Berkshire Hathaway has never paid a dividend. Amazon paid none for 27 years. High-growth companies reinvest profits instead." },
        { type:"pe-calc" },
        { type:"quiz", question:"A stock has a P/E ratio of 50. This most likely means...",
          options:["The stock is definitely overpriced","Investors expect very high future growth","The company is losing money","The dividend yield is 50%"],
          correct:1, explanation:"A high P/E means the market is paying a premium, expecting strong future earnings growth. It's not automatically bad — but it means the company has a lot to live up to." },
      ]
    },
    {
      id:"s4", title:"Risk & Statistics", emoji:"📊", track:"science", xp:40, time:"8 min",
      cards:[
        { type:"lesson", title:"What is risk, really?",
          body:"In investing, risk isn't just 'you might lose money' — it's specifically about volatility: how much a stock's price fluctuates. A stock that swings ±20% a month is 'riskier' than one that moves ±2%, even if both are profitable long-term.",
          callout:"The technical definition: risk is the standard deviation of returns. That's a measure of how spread out the outcomes are." },
        { type:"lesson", title:"Standard deviation: volatility in plain English",
          body:"If Stock A returns 10% on average, but swings between -30% and +50%, it has high standard deviation. Stock B returns 8% and stays between 2% and 14%. B is less exciting but far easier to hold through a rough patch without panic-selling.",
          visual:"std-dev" },
        { type:"lesson", title:"Beta: measuring market sensitivity",
          body:"Beta measures how much a stock moves relative to the overall market. Beta of 1.0 = moves with the market. Beta of 1.5 = moves 50% more than the market (both up and down). Beta of 0.5 = moves half as much. Defensive stocks like JNJ have low beta. High-growth tech often has high beta.",
          visual:"beta-compare" },
        { type:"lesson", title:"The risk-reward tradeoff",
          body:"There's no free lunch: higher potential returns almost always require accepting higher risk. A government bond returns ~4% with near-zero risk. A startup stock might return 1,000% — or go to zero. Rational investing means finding the right balance for your timeline and temperament.",
          visual:"risk-reward-seesaw" },
        { type:"quiz", question:"A stock with a Beta of 2.0 would be expected to...",
          options:["Always double in price","Move twice as much as the overall market, up or down","Be twice as expensive as the market average","Pay double the dividend"],
          correct:1, explanation:"Beta measures sensitivity to market movements. Beta 2.0 means if the market rises 10%, this stock tends to rise ~20%. If the market falls 10%, it tends to fall ~20%." },
      ]
    },
    {
      id:"s5", title:"How Predictions Are Made", emoji:"🔭", track:"science", xp:45, time:"9 min",
      cards:[
        { type:"lesson", title:"Fundamental Analysis",
          body:"Fundamental analysts value a company based on its actual business: revenue, profits, debt, competitive moat, management quality. They ask 'What is this company worth?' and compare that to the current price to decide if it's cheap or expensive.",
          callout:"Warren Buffett is the most famous fundamental analyst. He reads annual reports for companies the same way most people read novels." },
        { type:"lesson", title:"Technical Analysis",
          body:"Technical analysts ignore the business fundamentals and focus purely on price charts and volume patterns. Their core belief: all known information is already priced in, so patterns in price and volume can signal future moves.",
          callout:"Most professional traders use a combination of both approaches. Pure technicians and pure fundamentalists are increasingly rare." },
        { type:"lesson", title:"Moving Averages",
          body:"A moving average smooths out day-to-day noise by averaging prices over a period. The 50-day MA and 200-day MA are the two most watched. When price is above its 200-day MA, the stock is in a long-term uptrend. Below it? Potential trouble.",
          visual:"moving-avg" },
        { type:"lesson", title:"Golden Cross & Death Cross",
          body:"A Golden Cross occurs when the 50-day MA crosses above the 200-day MA — historically a bullish signal. A Death Cross is the opposite: the 50-day crosses below the 200-day, often seen before major downturns. These signals lag price action but are widely watched.",
          visual:"golden-cross" },
        { type:"quiz", question:"What does a 'Death Cross' indicate?",
          options:["A company going bankrupt","The 50-day moving average crosses below the 200-day MA","A stock hitting its all-time low","High volume on a down day"],
          correct:1, explanation:"The Death Cross (50-day MA crossing below 200-day MA) is a bearish technical signal suggesting potential further downside. Many institutional funds use it as a sell trigger." },
      ]
    },
    {
      id:"s6", title:"Portfolio Theory", emoji:"📐", track:"science", xp:50, time:"9 min",
      cards:[
        { type:"lesson", title:"Diversification: the only free lunch",
          body:"Economist Harry Markowitz called diversification 'the only free lunch in investing.' By combining assets that don't move together, you reduce overall portfolio risk without sacrificing expected returns. The math is real: 20 uncorrelated stocks is dramatically safer than 1.",
          visual:"diversification-chart" },
        { type:"lesson", title:"Correlation: the hidden trap",
          body:"Owning 10 tech stocks is not diversification. If they all rise and fall together (high correlation), you've just amplified your bet. True diversification means combining assets with low or negative correlation: stocks, bonds, real estate, commodities, international equities.",
          callout:"In March 2020, tech stocks and oil stocks both crashed. 'Diversified' portfolios that were actually tech-heavy had no protection." },
        { type:"lesson", title:"Asset Allocation by life stage",
          body:"Young investors (20s–30s) can afford to take more risk — they have decades to recover from crashes. Rule of thumb: 110 minus your age = % in stocks. A 25-year-old might hold 85% stocks, 15% bonds. A 65-year-old might flip that. This shifts as you need the money sooner.",
          visual:"allocation-age" },
        { type:"lesson", title:"Index Funds: the boring winner",
          body:"Index funds own every stock in an index (like the S&P 500) proportionally. They're passively managed, so fees are tiny. Study after study shows 80-90% of actively managed funds underperform a simple index fund over 20 years. Boring beats brilliant — statistically.",
          callout:"Warren Buffett's advice to his heirs: 'Put 90% in an S&P 500 index fund and 10% in short-term bonds.' The greatest stock-picker alive recommends not picking stocks." },
        { type:"quiz", question:"What is the primary benefit of diversification?",
          options:["It guarantees profits","It eliminates all investment risk","It reduces risk without proportionally reducing expected returns","It guarantees you outperform the market"],
          correct:2, explanation:"Diversification reduces unsystematic risk (company-specific risk) without sacrificing expected returns. It can't eliminate systematic risk (market-wide crashes affect everything)." },
      ]
    },
  ],
  reasoning: [
    {
      id:"h1", title:"Why Markets Crash", emoji:"💥", track:"reasoning", xp:35, time:"7 min",
      cards:[
        { type:"lesson", title:"A crash is not random",
          body:"Market crashes look chaotic from inside them, but viewed from a distance they follow recognizable patterns. They're not random — they're the result of human psychological forces playing out at enormous scale. Greed inflates, fear deflates, and the cycle repeats.",
          callout:"Every generation experiences their first crash as a total shock — even though crashes have happened on average every 8-10 years throughout history." },
        { type:"lesson", title:"The 5 stages of a bubble",
          body:"Stage 1: Displacement — a genuine innovation creates real opportunity. Stage 2: Boom — prices rise, early investors profit, attention grows. Stage 3: Euphoria — everyone believes prices will rise forever, valuations become absurd. Stage 4: Profit Taking — smart money quietly sells. Stage 5: Panic — prices collapse, late investors lose everything.",
          visual:"bubble-stages" },
        { type:"lesson", title:"The Dot-com Bubble (1995–2001)",
          body:"The internet was real and transformative — but investors priced companies as if every startup would dominate the world. The NASDAQ rose 400% from 1995–2000. Then reality hit: most dot-com companies had no profits, some had no revenue. The index fell 78% from peak to trough. It didn't recover its 2000 high until 2015.",
          callout:"Pets.com raised $82M in its IPO, spent it on advertising including a Super Bowl ad, and went bankrupt 9 months later." },
        { type:"lesson", title:"The 2008 Financial Crisis",
          body:"Banks created mortgages for people who couldn't afford them, then packaged those mortgages into complex financial products (CDOs) that were given AAA ratings they didn't deserve. When housing prices fell, these products collapsed, taking down investment banks, wiping out retirement accounts, and triggering a global recession.",
          callout:"Lehman Brothers — 158 years old, the 4th largest investment bank in the US — filed for bankruptcy in September 2008. The government let it fail." },
        { type:"quiz", question:"Which bubble stage involves 'smart money quietly selling while everyone else is buying'?",
          options:["Displacement","Boom","Euphoria","Profit Taking"],
          correct:3, explanation:"In Stage 4 (Profit Taking), sophisticated investors who bought early begin selling to the masses who are still euphoric. This is the last chance to exit before the collapse. The masses, seeing their investments rise, interpret the selling as a buying opportunity." },
      ]
    },
    {
      id:"h2", title:"Your Brain on Money", emoji:"🧠", track:"reasoning", xp:40, time:"8 min",
      cards:[
        { type:"lesson", title:"Loss Aversion: why pain outweighs pleasure",
          body:"Psychologists Daniel Kahneman and Amos Tversky proved that losing $100 feels roughly twice as bad as gaining $100 feels good. This isn't logical — $100 is $100. But it's deeply human. In investing, this causes people to hold losing positions far too long, hoping to 'get back to even' instead of cutting losses.",
          visual:"loss-aversion-chart" },
        { type:"lesson", title:"Confirmation Bias",
          body:"Once you own a stock, you unconsciously seek out information that supports your decision and dismiss information that challenges it. If you own Tesla stock, you'll read bullish Tesla articles, find them convincing, and discount negative coverage as 'haters.' This creates a reality-distortion field around your investments.",
          callout:"The cure: actively seek out the bear case for any stock you own. If you can't articulate the strongest argument against your position, you don't understand it." },
        { type:"lesson", title:"Anchoring: the $100 trap",
          body:"If you bought a stock at $100 and it falls to $60, you fixate on $100 as the 'right' price and wait to 'get back to even.' But $100 is arbitrary — it's just the price when you happened to buy. The relevant question is: at $60, is this stock a good investment going forward? The anchor is irrelevant.",
          callout:"This is why stop-losses exist: pre-decided sell points, made without the emotional anchor of a purchase price." },
        { type:"lesson", title:"The Dunning-Kruger Effect",
          body:"Beginners often feel most confident right before their biggest losses. Why? Because early wins in a bull market feel like skill, not luck. The Dunning-Kruger Effect: people with limited knowledge overestimate their competence. The more you learn, the more you realize how much you don't know.",
          callout:"'The first $100,000 is the hardest' — Charlie Munger. The early mistakes that cost the most are made with the most confidence." },
        { type:"quiz", question:"Why do investors often hold losing stocks too long?",
          options:["Because losing stocks tend to recover","Due to loss aversion — the pain of realizing a loss feels worse than the theoretical loss","Because tax laws require it","Professional advisors recommend it"],
          correct:1, explanation:"Loss aversion means the psychological pain of 'locking in' a loss by selling feels worse than continuing to hold a paper loss. This is irrational — the economic reality is the same either way." },
      ]
    },
    {
      id:"h3", title:"Herd Mentality & FOMO", emoji:"🐑", track:"reasoning", xp:40, time:"7 min",
      cards:[
        { type:"lesson", title:"Why humans copy each other",
          body:"Under uncertainty, humans default to social proof: if many people are doing something, it must be correct. In markets, this creates self-reinforcing cycles. Rising prices attract buyers, which causes more price rises, which attracts more buyers — until the supply of new buyers runs out.",
          callout:"This isn't stupidity — in most areas of life, copying experts is rational. The problem is in markets, the crowd is often wrong at exactly the worst moment." },
        { type:"lesson", title:"The GameStop Short Squeeze (2021)",
          body:"In January 2021, Reddit's WallStreetBets community coordinated to buy heavily shorted stocks like GameStop (GME). Hedge funds had bet $GME would fall. When retail investors piled in, the price exploded from $20 to $483 in weeks. Short sellers lost billions. Then it collapsed back below $40, wiping out late retail buyers.",
          callout:"This was a genuine David vs Goliath moment — but most of the 'Davids' who bought above $100 lost significant money when the squeeze ended." },
        { type:"lesson", title:"FOMO: the most expensive emotion",
          body:"Fear Of Missing Out drives investors to buy assets after they've already risen dramatically — exactly when risk is highest. FOMO investors buy at the top, driven by stories of friends getting rich, and often sell at the bottom when the narrative reverses.",
          callout:"FOMO operates on a delay: you hear about a huge gain after it happens, then chase it just as it's ending." },
        { type:"lesson", title:"The contrarian advantage",
          body:"Contrarian investors profit by thinking independently from the crowd. When everyone is euphoric, they ask 'who's left to buy?' When everyone is panicking, they ask 'is this actually as bad as people think?' Contrarianism isn't about being contrary for its own sake — it's about maintaining objectivity when emotions run high.",
          callout:"Howard Marks (Oaktree Capital): 'The most dangerous thing in the world is the consensus.' Not because consensus is always wrong — but because consensus is always priced in." },
        { type:"quiz", question:"In the GameStop situation, what happened to most retail investors who bought at the peak?",
          options:["They made significant profits","They broke even","They lost money when the price collapsed","They were protected by SEC regulations"],
          correct:2, explanation:"Most retail investors who bought $GME during FOMO at peak prices ($300–$480) saw the stock collapse back below $40. FOMO drove them to buy at exactly the worst moment — a classic herd behavior outcome." },
      ]
    },
    {
      id:"h4", title:"The News & The Market", emoji:"📰", track:"reasoning", xp:35, time:"6 min",
      cards:[
        { type:"lesson", title:"How news moves prices",
          body:"Markets move on expectations, not reality. If analysts expect earnings of $1.00/share and the company reports $1.02 — price rises even though profit was 'just' $1.02. The reaction is to the surprise, not the absolute number. This is why 'good news' sometimes causes stocks to fall: it was already priced in.",
          callout:"'Priced in' is the most important concept in understanding market reactions. If everyone already expected good news, good news causes no move." },
        { type:"lesson", title:"Buy the rumor, sell the news",
          body:"One of markets' oldest patterns: traders buy based on anticipated good news, driving prices up before the announcement. When the actual announcement comes, they sell. The price often falls even if the news is positive — because all the buyers are now sellers, and the news is now 'old.'",
          callout:"This is why biotech stocks often crash on positive drug trial results: everyone bought anticipating approval, now they're taking profits." },
        { type:"lesson", title:"Earnings Season: quarterly reckoning",
          body:"Four times a year, public companies report their earnings. This is when expectations meet reality. Companies that 'beat' estimates tend to rise. Those that 'miss' can fall 15-30% in a single day. Earnings season is when individual stock volatility peaks — and where both the biggest opportunities and traps appear.",
          callout:"A company can report record profits and see its stock fall if those profits were below what analysts expected. The number isn't the point — the surprise is." },
        { type:"lesson", title:"Macro events: the invisible hand",
          body:"Beyond individual companies, macro forces move entire markets: Federal Reserve interest rate decisions, inflation reports (CPI), jobs data (non-farm payrolls), geopolitical events, and pandemics. When the Fed raises rates, bond yields rise and stock valuations fall — affecting every company simultaneously.",
          callout:"The most powerful force in markets is often something that has nothing to do with any individual company: interest rates determine how much future earnings are worth today." },
        { type:"quiz", question:"A company reports record quarterly profits, but its stock price falls 10% the same day. Why?",
          options:["The market must have been wrong","The profits were below what analysts expected","Markets are irrational","The CEO made a mistake"],
          correct:1, explanation:"Markets trade on expectations. If analysts expected $2.00 EPS and the company reports $1.90 (even if record profits), that's a 'miss' — and the market punishes it. The absolute number matters less than the surprise relative to expectations." },
      ]
    },
    {
      id:"h5", title:"Money, Power & Ethics", emoji:"⚖️", track:"reasoning", xp:50, time:"9 min",
      cards:[
        { type:"lesson", title:"Insider Trading: the unfair edge",
          body:"Insider trading means trading on material, non-public information — knowledge the public doesn't have. A CEO who knows tomorrow's earnings will disappoint and sells their shares today is committing insider trading. It's illegal because it destroys the level playing field that markets depend on.",
          callout:"Martha Stewart went to prison not for selling ImClone stock on inside information, but for lying to investigators about it afterward. The cover-up is often worse than the crime." },
        { type:"lesson", title:"ESG: can values guide portfolios?",
          body:"ESG investing filters investments based on Environmental, Social, and Governance criteria — avoiding companies that pollute, treat workers poorly, or have corrupt governance. Proponents argue ethical companies outperform long-term. Critics argue it restricts returns and that ESG ratings are inconsistent and often misleading.",
          callout:"Some ESG funds include oil companies because they score well on 'governance.' Some exclude Tesla because Elon Musk's management style scores poorly on 'social.' The label doesn't always match the contents." },
        { type:"lesson", title:"Wealth, inequality, and the market",
          body:"The top 10% of Americans own ~89% of all stocks. When markets rise, wealth concentrates. When markets crash, the wealthy have diversification and time to recover; those with fewer assets may be forced to sell at the bottom. Understanding this asymmetry is essential context for understanding debates about taxes, bailouts, and economic policy.",
          callout:"'The stock market is not the economy' — you'll hear this during every crisis. It's true: markets can hit all-time highs while unemployment is high and wages are stagnant." },
        { type:"lesson", title:"Your money has a vote",
          body:"Every dollar you invest is a vote for the kind of world you want. Companies that attract more investment capital can expand, hire, and grow. Those that are shunned face higher borrowing costs. Individual investors have more power than they realize — especially when acting collectively through shareholder votes and divestment campaigns.",
          callout:"In 2021, a small hedge fund (Engine No. 1) won three seats on ExxonMobil's board with just 0.02% of shares — by convincing other shareholders to vote for a more climate-focused strategy." },
        { type:"reflection",
          prompt:"After this module, do you think markets are fundamentally fair? Consider: what systems are in place to ensure fairness, and what gaps remain? Write 2–3 sentences." },
      ]
    },
    {
      id:"h6", title:"Market Psychology: The Full Picture", emoji:"🌐", track:"reasoning", xp:100, time:"12 min",
      cards:[
        { type:"lesson", title:"The Fear & Greed Index",
          body:"CNN's Fear & Greed Index measures 7 market indicators — momentum, volume, options activity, junk bond demand, and more — and distills them into a single 0–100 score. Below 25: extreme fear (historically a buying opportunity). Above 75: extreme greed (historically a warning sign).",
          callout:"Warren Buffett: 'Be fearful when others are greedy, and greedy when others are fearful.' The Fear & Greed Index operationalizes this wisdom into a daily metric." },
        { type:"lesson", title:"Sentiment Analysis",
          body:"Hedge funds now deploy NLP algorithms to read millions of news articles, earnings call transcripts, and social media posts per day, extracting 'market sentiment' signals. If sentiment toward a company turns sharply negative before earnings, their models flag it. A Reddit post spike can precede a price move by hours.",
          callout:"Alternative data is the new competitive edge. Satellite imagery of retail parking lots, shipping container GPS data, credit card transaction flows — all feed quantitative models trying to predict earnings before they're reported." },
        { type:"lesson", title:"Holding through a crash",
          body:"Most individual investors underperform the market not because they pick bad stocks — but because they sell during crashes and buy during rallies. Studies show the average investor misses the best 10 days in any decade; those 10 days account for most of the decade's total returns. The hardest thing is also the most important: doing nothing.",
          callout:"J.P. Morgan data: missing the best 10 days in each decade since 1990 turns a 9.5% annual return into a 5.5% annual return. Just 10 days out of 7,600." },
        { type:"lesson", title:"Building your own investment rules",
          body:"Emotional decisions destroy returns. Professional investors fight this by writing down rules before they're needed: 'I will not sell if my portfolio drops more than 20% in a month.' 'I will rebalance every January.' 'I will not check prices more than once a week.' Rules made in calm moments protect you from decisions made in panic.",
          callout:"Ray Dalio's Bridgewater Associates, the world's largest hedge fund, runs on a systematic 'principles'-based approach: every decision follows pre-written rules. Humans are terrible real-time decision makers under stress." },
        { type:"quiz", question:"According to data, why do most individual investors underperform the market?",
          options:["They pick the wrong stocks","They invest too little money","They sell during crashes and miss the best recovery days","They hold too long"],
          correct:2, explanation:"Studies consistently show the biggest driver of underperformance is behavioral: selling during downturns and buying during upswings. Missing just the 10 best market days per decade dramatically reduces lifetime returns." },
      ]
    },
  ]
};

// ─── LEARN: VISUAL COMPONENTS ─────────────────────────────────────────────────

function PieVisual() {
  const pieces = 12; const highlighted = 1;
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" style={{margin:"0 auto",display:"block"}}>
      {Array.from({length:pieces}).map((_,i)=>{
        const a1=(i/pieces)*2*Math.PI-Math.PI/2, a2=((i+1)/pieces)*2*Math.PI-Math.PI/2;
        const r=70, cx=80, cy=80;
        const x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1),x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2);
        const isHl=i===3;
        return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
          fill={isHl?"#10B981":"#1E2D40"} stroke="#080C14" strokeWidth="2"
          transform={isHl?`translate(${cx+8*Math.cos((a1+a2)/2)-cx},${cy+8*Math.sin((a1+a2)/2)-cy})`:""}
          fillOpacity={isHl?1:0.6}/>;
      })}
      <text x="80" y="84" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="DM Mono">YOUR</text>
      <text x="80" y="95" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="DM Mono">SHARE</text>
    </svg>
  );
}

function ScaleVisual({buyHeavy=true}) {
  return (
    <svg width="200" height="120" viewBox="0 0 200 120" style={{margin:"0 auto",display:"block"}}>
      <line x1="100" y1="20" x2="100" y2="60" stroke="#94A3B8" strokeWidth="2"/>
      <line x1="30" y1={buyHeavy?70:50} x2="170" y2={buyHeavy?50:70} stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="20" y={buyHeavy?70:50} width="50" height="30" rx="6" fill={buyHeavy?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.15)"} stroke={buyHeavy?"#10B981":"#EF4444"} strokeWidth="1.5"/>
      <text x="45" y={buyHeavy?89:69} textAnchor="middle" fill={buyHeavy?"#10B981":"#94A3B8"} fontSize="9" fontFamily="DM Mono">BUYERS</text>
      <rect x="130" y={buyHeavy?50:70} width="50" height="30" rx="6" fill={buyHeavy?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.2)"} stroke={buyHeavy?"#475569":"#EF4444"} strokeWidth="1.5"/>
      <text x="155" y={buyHeavy?69:89} textAnchor="middle" fill={buyHeavy?"#475569":"#EF4444"} fontSize="9" fontFamily="DM Mono">SELLERS</text>
      <circle cx="100" cy="20" r="5" fill="#94A3B8"/>
    </svg>
  );
}

function CandleIntroVisual() {
  const candles=[{o:40,c:70,h:80,l:30,bull:true},{o:65,c:45,h:75,l:35,bull:false},{o:48,c:78,h:85,l:42,bull:true},{o:72,c:55,h:80,l:48,bull:false},{o:58,c:82,h:90,l:52,bull:true}];
  const w=28,gap=8,startX=20;
  return (
    <svg width="220" height="110" viewBox="0 0 220 110" style={{margin:"0 auto",display:"block"}}>
      {candles.map((c,i)=>{
        const x=startX+i*(w+gap),cx=x+w/2;
        const scale=v=>110-v;
        return <g key={i}>
          <line x1={cx} y1={scale(c.h)} x2={cx} y2={scale(c.l)} stroke={c.bull?"#10B981":"#EF4444"} strokeWidth="2"/>
          <rect x={x} y={scale(Math.max(c.o,c.c))} width={w} height={Math.abs(c.c-c.o)||2} rx="2"
            fill={c.bull?"rgba(16,185,129,0.7)":"rgba(239,68,68,0.7)"} stroke={c.bull?"#10B981":"#EF4444"} strokeWidth="1"/>
        </g>;
      })}
    </svg>
  );
}

function MovingAvgVisual() {
  const pts=Array.from({length:30},(_,i)=>({ x:i, price:60+Math.sin(i*0.5)*15+i*0.5+Math.sin(i*1.2)*5 }));
  const ma50=pts.map((_,i)=>{ const sl=pts.slice(Math.max(0,i-4),i+1); return sl.reduce((s,p)=>s+p.price,0)/sl.length; });
  const toSVG=(x,y)=>({ sx:x*(180/29)+20, sy:110-y*1.0 });
  const pricePath=pts.map((p,i)=>{ const {sx,sy}=toSVG(p.x,p.price); return `${i===0?"M":"L"}${sx},${sy}`; }).join(" ");
  const maPath=ma50.map((y,i)=>{ const {sx,sy}=toSVG(i,y); return `${i===0?"M":"L"}${sx},${sy}`; }).join(" ");
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" style={{margin:"0 auto",display:"block"}}>
      <path d={pricePath} fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
      <path d={maPath} fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2"/>
      <circle cx={toSVG(29,pts[29].price).sx} cy={toSVG(29,pts[29].price).sy} r="3" fill="#475569"/>
      <text x="160" y="20" fill="#F59E0B" fontSize="8" fontFamily="DM Mono">50-day MA</text>
      <text x="160" y="32" fill="#475569" fontSize="8" fontFamily="DM Mono">Price</text>
    </svg>
  );
}

function BubbleStagesVisual() {
  const stages=["Displacement","Boom","Euphoria","Profit Taking","Panic"];
  const pts=[[0,20],[20,45],[45,85],[65,80],[80,30],[100,15]];
  const w=220,h=100;
  const toP=(x,y)=>({sx:x/100*w,sy:h-y/100*h});
  const path=pts.map((p,i)=>{ const {sx,sy}=toP(p[0],p[1]); return `${i===0?"M":"L"}${sx},${sy}`; }).join(" ");
  const colors=["#3B82F6","#10B981","#F59E0B","#F97316","#EF4444"];
  return (
    <svg width={w} height={h+30} viewBox={`0 0 ${w} ${h+30}`} style={{margin:"0 auto",display:"block"}}>
      <path d={path} fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.slice(0,-1).map((_,i)=>{
        const {sx,sy}=toP(pts[i][0],pts[i][1]);
        return <g key={i}>
          <circle cx={sx} cy={sy} r="5" fill={colors[i]}/>
          <text x={sx} y={sy-8} textAnchor="middle" fill={colors[i]} fontSize="6.5" fontFamily="Outfit">{stages[i]}</text>
        </g>;
      })}
    </svg>
  );
}

function LossAversionChart() {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" style={{margin:"0 auto",display:"block"}}>
      <line x1="10" y1="60" x2="210" y2="60" stroke="#1E2D40" strokeWidth="1"/>
      <line x1="110" y1="10" x2="110" y2="110" stroke="#1E2D40" strokeWidth="1"/>
      <path d="M110,60 Q135,58 160,30 T210,10" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M110,60 Q85,64 60,95 T10,115" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="160" y="25" fill="#10B981" fontSize="8" fontFamily="DM Mono">+$100 gain</text>
      <text x="12" y="108" fill="#EF4444" fontSize="8" fontFamily="DM Mono">-$100 loss</text>
      <text x="113" y="55" fill="#94A3B8" fontSize="8" fontFamily="DM Mono">Pain &gt; Joy</text>
    </svg>
  );
}

// ─── LEARN: P/E CALCULATOR ────────────────────────────────────────────────────
function PECalculatorCard() {
  const [price, setPrice] = useState(150);
  const [eps, setEps] = useState(5);
  const pe = eps > 0 ? (price/eps).toFixed(1) : "—";
  const peNum = parseFloat(pe);
  const peColor = peNum > 40 ? "#EF4444" : peNum > 20 ? "#F59E0B" : "#10B981";
  const peLabel = peNum > 40 ? "Very Expensive" : peNum > 20 ? "Moderate" : "Cheap";
  return (
    <div style={{background:"#162033",borderRadius:12,padding:"18px 20px"}}>
      <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,color:"#F1F5F9",marginBottom:14}}>🧮 Live P/E Calculator</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        {[["Stock Price ($)",price,setPrice,1,500],["Earnings Per Share ($)",eps,setEps,0.1,50]].map(([label,val,setter,min,max])=>(
          <div key={label}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#94A3B8",marginBottom:6}}>{label}</div>
            <input type="range" min={min} max={max} step={min} value={val}
              onChange={e=>setter(parseFloat(e.target.value))}
              style={{width:"100%",accentColor:"#10B981"}}/>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,fontWeight:700,color:"#F1F5F9",marginTop:4}}>${val}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#0F1623",borderRadius:10,padding:"14px",textAlign:"center"}}>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#475569",marginBottom:4}}>P/E Ratio = ${price} ÷ ${eps}</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:36,fontWeight:800,color:peColor,lineHeight:1}}>{pe}x</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,color:peColor,marginTop:4}}>{peLabel}</div>
      </div>
    </div>
  );
}

// ─── LEARN: REFLECTION CARD ───────────────────────────────────────────────────
function ReflectionCard({ prompt, onComplete }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div style={{background:"rgba(139,92,246,0.06)",border:"1px solid rgba(139,92,246,0.2)",borderRadius:12,padding:"20px"}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#8B5CF6",fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>✍️ REFLECTION PROMPT</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:14,color:"#F1F5F9",lineHeight:1.7,marginBottom:14}}>{prompt}</p>
      {!saved ? (
        <>
          <textarea
            value={text} onChange={e=>setText(e.target.value)}
            placeholder="Type your thoughts here..."
            rows={4}
            style={{width:"100%",background:"#0F1623",border:"1px solid #1E2D40",borderRadius:8,padding:"10px 12px",color:"#F1F5F9",fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:1.6,resize:"vertical",outline:"none",boxSizing:"border-box"}}
          />
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#475569"}}>{wordCount} words</span>
            <button onClick={()=>{if(wordCount>=5){setSaved(true);onComplete();}}} style={{background:wordCount>=5?"linear-gradient(135deg,#8B5CF6,#7C3AED)":"#1E2D40",border:"none",borderRadius:8,padding:"8px 18px",color:wordCount>=5?"#fff":"#475569",fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:13,cursor:wordCount>=5?"pointer":"not-allowed"}}>
              Save Reflection (+50 XP)
            </button>
          </div>
        </>
      ) : (
        <div style={{background:"rgba(139,92,246,0.1)",borderRadius:8,padding:"12px",textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:4}}>✅</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,color:"#8B5CF6"}}>Reflection saved!</div>
        </div>
      )}
    </div>
  );
}

// ─── LEARN: QUIZ CARD ─────────────────────────────────────────────────────────
function QuizCard({ question, options, correct, explanation, xp, onPass }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const isCorrect = selected === correct;

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    onPass(i === correct);
  };

  return (
    <div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#F59E0B",fontWeight:700,letterSpacing:"0.08em",marginBottom:12}}>⚡ KNOWLEDGE CHECK</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:16,color:"#F1F5F9",marginBottom:18,lineHeight:1.4}}>{question}</p>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {options.map((opt,i)=>{
          let bg="transparent", border="#1E2D40", color="#F1F5F9";
          if(answered){
            if(i===correct){ bg="rgba(16,185,129,0.12)"; border="#10B981"; color="#10B981"; }
            else if(i===selected && i!==correct){ bg="rgba(239,68,68,0.1)"; border="#EF4444"; color="#EF4444"; }
            else { color="#475569"; }
          }
          return (
            <button key={i} onClick={()=>handleAnswer(i)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:10,border:`1.5px solid ${border}`,background:bg,color,fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:answered&&i===correct?700:400,cursor:answered?"default":"pointer",transition:"all 0.2s",textAlign:"left"}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,flexShrink:0,width:20,textAlign:"center"}}>
                {answered ? (i===correct?"✓" : i===selected?"✗" : String.fromCharCode(65+i)) : String.fromCharCode(65+i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{marginTop:14,padding:"12px 16px",borderRadius:10,background:isCorrect?"rgba(16,185,129,0.07)":"rgba(239,68,68,0.07)",border:`1px solid ${isCorrect?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"}`}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,color:isCorrect?"#10B981":"#EF4444",marginBottom:4}}>
            {isCorrect?"🎉 Correct!":"📖 Not quite"}
          </div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#94A3B8",lineHeight:1.6}}>{explanation}</div>
          <div style={{marginTop:8,fontFamily:"'DM Mono',monospace",fontSize:11,color:"#F59E0B"}}>+{isCorrect?xp:Math.round(xp*0.4)} XP earned</div>
        </div>
      )}
    </div>
  );
}

// ─── LEARN: MODULE VIEWER ─────────────────────────────────────────────────────
function ModuleViewer({ module, onClose, onComplete }) {
  const { state, updateState } = useContext(GameContext);
  const [cardIdx, setCardIdx] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [reflectionDone, setReflectionDone] = useState(false);
  const [dir, setDir] = useState(1);
  const [animIn, setAnimIn] = useState(true);
  const [showComplete, setShowComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const cards = module.cards;
  const card = cards[cardIdx];
  const isLast = cardIdx === cards.length - 1;

  const goTo = (next, direction = 1) => {
    if (next < 0 || next >= cards.length) return;
    setDir(direction);
    setAnimIn(false);
    setTimeout(() => { setCardIdx(next); setAnimIn(true); }, 200);
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === "Enter") handleNext();
      if (e.key === "ArrowLeft") goTo(cardIdx - 1, -1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [cardIdx, quizPassed, reflectionDone, isLast]);

  const handleNext = () => {
    const c = cards[cardIdx];
    if (c.type === "quiz" && !quizPassed) return;
    if (c.type === "reflection" && !reflectionDone) return;
    if (isLast) { handleFinish(); return; }
    goTo(cardIdx + 1, 1);
  };

  const handleFinish = () => {
    const earned = module.xp;
    setXpEarned(earned);
    setShowComplete(true);
    updateState({
      xp: state.xp + earned,
      completedModules: [...new Set([...state.completedModules, module.id])],
    });
    setTimeout(() => { setShowComplete(false); onComplete(module.id); }, 2800);
  };

  const visualMap = {
    "pie": <PieVisual />,
    "scale": <ScaleVisual />,
    "candle-intro": <CandleIntroVisual />,
    "candle-detail": <CandleIntroVisual />,
    "moving-avg": <MovingAvgVisual />,
    "bubble-stages": <BubbleStagesVisual />,
    "loss-aversion-chart": <LossAversionChart />,
  };

  const trackColor = module.track === "science" ? "#10B981" : "#8B5CF6";

  if (showComplete) return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(8,12,20,0.95)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fadeSlideUp 0.3s ease"}}>
      <div style={{fontSize:72,marginBottom:16,animation:"bounceIn 0.6s ease"}}>🎓</div>
      <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:32,color:"#F1F5F9",marginBottom:8}}>Module Complete!</h2>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:"#94A3B8",marginBottom:24}}>{module.emoji} {module.title}</div>
      <div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:12,padding:"16px 32px",textAlign:"center"}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:36,fontWeight:800,color:"#F59E0B"}}>+{xpEarned} XP</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#94A3B8",marginTop:4}}>Total: {state.xp + xpEarned} XP</div>
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:100,background:"#080C14",display:"flex",flexDirection:"column",backgroundImage:"radial-gradient(circle,rgba(241,245,249,0.025) 1px,transparent 1px)",backgroundSize:"28px 28px"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",borderBottom:"1px solid #1E2D40",background:"rgba(8,12,20,0.95)"}}>
        <button onClick={onClose} style={{background:"none",border:"1px solid #1E2D40",borderRadius:8,padding:"6px 14px",color:"#94A3B8",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:13,display:"flex",alignItems:"center",gap:6}}>← Back</button>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>{module.emoji}</span>
          <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:15,color:"#F1F5F9"}}>{module.title}</span>
          <span style={{background:`${trackColor}15`,border:`1px solid ${trackColor}30`,color:trackColor,fontFamily:"'DM Mono',monospace",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:4}}>
            {module.track === "science" ? "📊 DATA" : "💡 UNDERSTANDING"}
          </span>
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#475569"}}>{cardIdx+1} / {cards.length}</span>
      </div>

      {/* Progress bar */}
      <div style={{height:3,background:"#1E2D40"}}>
        <div style={{height:"100%",width:`${((cardIdx+1)/cards.length)*100}%`,background:`linear-gradient(90deg,${trackColor},${trackColor}99)`,transition:"width 0.4s ease"}}/>
      </div>

      {/* Card content */}
      <div style={{flex:1,overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"32px 24px"}}>
        <div style={{width:"100%",maxWidth:640,opacity:animIn?1:0,transform:animIn?"translateX(0)":`translateX(${dir>0?"30px":"-30px"})`,transition:"all 0.2s ease"}}>
          {card.type === "lesson" && (
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:trackColor,fontWeight:700,letterSpacing:"0.1em",marginBottom:12}}>
                {module.track==="science"?"📊 DATA":"💡 UNDERSTANDING"} · CARD {cardIdx+1}
              </div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:26,color:"#F1F5F9",marginBottom:16,letterSpacing:"-0.3px",lineHeight:1.25}}>{card.title}</h2>
              <p style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:"#94A3B8",lineHeight:1.8,marginBottom:20}}>{card.body}</p>
              {card.visual && visualMap[card.visual] && (
                <div style={{background:"#0F1623",border:"1px solid #1E2D40",borderRadius:12,padding:"20px",marginBottom:16}}>{visualMap[card.visual]}</div>
              )}
              {card.callout && (
                <div style={{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",borderLeft:"3px solid #F59E0B",borderRadius:"0 10px 10px 0",padding:"12px 16px"}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"#F59E0B",fontWeight:700,display:"block",marginBottom:4}}>💡 REAL WORLD</span>
                  <span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#F1F5F9",lineHeight:1.6}}>{card.callout}</span>
                </div>
              )}
            </div>
          )}
          {card.type === "pe-calc" && (
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:trackColor,fontWeight:700,letterSpacing:"0.1em",marginBottom:12}}>📊 DATA · INTERACTIVE</div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:26,color:"#F1F5F9",marginBottom:16}}>Try It: P/E Calculator</h2>
              <p style={{fontFamily:"'Outfit',sans-serif",fontSize:15,color:"#94A3B8",lineHeight:1.7,marginBottom:20}}>Drag the sliders to see how the P/E ratio changes. Notice how a high-priced stock isn't necessarily expensive if its earnings are high too.</p>
              <PECalculatorCard />
            </div>
          )}
          {card.type === "quiz" && (
            <QuizCard {...card} xp={module.xp} onPass={(correct)=>{ setQuizPassed(true); updateState({xp:state.xp+(correct?module.xp:Math.round(module.xp*0.4))}); }}/>
          )}
          {card.type === "reflection" && (
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#8B5CF6",fontWeight:700,letterSpacing:"0.1em",marginBottom:12}}>💡 UNDERSTANDING · REFLECTION</div>
              <h2 style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:26,color:"#F1F5F9",marginBottom:16}}>Your Turn to Think</h2>
              <ReflectionCard prompt={card.prompt} onComplete={()=>setReflectionDone(true)}/>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{padding:"16px 24px",borderTop:"1px solid #1E2D40",background:"rgba(8,12,20,0.95)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>goTo(cardIdx-1,-1)} disabled={cardIdx===0} style={{padding:"10px 20px",borderRadius:10,border:"1px solid #1E2D40",background:"transparent",color:cardIdx===0?"#1E2D40":"#94A3B8",cursor:cardIdx===0?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:14}}>← Prev</button>
        <div style={{display:"flex",gap:5}}>
          {cards.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i,i>cardIdx?1:-1)} style={{width:i===cardIdx?20:7,height:7,borderRadius:99,background:i<cardIdx?trackColor:i===cardIdx?trackColor:"#1E2D40",transition:"all 0.3s",cursor:"pointer",opacity:i===cardIdx?1:i<cardIdx?0.7:0.4}}/>
          ))}
        </div>
        <button onClick={handleNext} disabled={(card.type==="quiz"&&!quizPassed)||(card.type==="reflection"&&!reflectionDone)} style={{padding:"10px 24px",borderRadius:10,border:"none",background:(card.type==="quiz"&&!quizPassed)||(card.type==="reflection"&&!reflectionDone)?"#1E2D40":isLast?`linear-gradient(135deg,${trackColor},${trackColor}cc)`:"#162033",color:(card.type==="quiz"&&!quizPassed)||(card.type==="reflection"&&!reflectionDone)?"#475569":"#F1F5F9",cursor:(card.type==="quiz"&&!quizPassed)||(card.type==="reflection"&&!reflectionDone)?"not-allowed":"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,boxShadow:isLast&&quizPassed?`0 0 16px ${trackColor}44`:"none"}}>
          {isLast ? (quizPassed||reflectionDone?"Finish Module 🎓":"Answer to finish") : "Next →"}
        </button>
      </div>
    </div>
  );
}

// ─── LEARN: MODULE CARD ───────────────────────────────────────────────────────
function ModuleCard({ module, isLocked, isDone, onStart }) {
  const trackColor = module.track === "science" ? "#10B981" : "#8B5CF6";
  const trackLabel = module.track === "science" ? "📊 DATA" : "💡 UNDERSTANDING";

  return (
    <div style={{background:isDone?"rgba(16,185,129,0.03)":isLocked?"rgba(15,22,35,0.5)":"#0F1623",border:`1px solid ${isDone?"rgba(16,185,129,0.25)":isLocked?"#1E2D4060":"#1E2D40"}`,borderRadius:14,padding:"20px",display:"flex",flexDirection:"column",gap:12,opacity:isLocked?0.55:1,transition:"all 0.2s",position:"relative",cursor:isLocked?"not-allowed":"default"}}
      onMouseEnter={e=>{if(!isLocked)e.currentTarget.style.borderColor=trackColor+"44";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=isDone?"rgba(16,185,129,0.25)":isLocked?"#1E2D4060":"#1E2D40";}}>
      {/* Status badge */}
      <div style={{position:"absolute",top:14,right:14}}>
        {isDone && <span style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",color:"#10B981",fontFamily:"'DM Mono',monospace",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20}}>✓ COMPLETE</span>}
        {isLocked && <span style={{color:"#475569",fontSize:16}}>🔒</span>}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:48,height:48,borderRadius:12,background:`${trackColor}12`,border:`1px solid ${trackColor}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{module.emoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:15,color:isLocked?"#475569":"#F1F5F9",marginBottom:2}}>{module.title}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{background:`${trackColor}15`,color:trackColor,fontFamily:"'DM Mono',monospace",fontSize:9,fontWeight:700,padding:"1px 7px",borderRadius:4}}>{trackLabel}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#475569"}}>⏱ {module.time}</span>
          </div>
        </div>
      </div>

      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#475569",lineHeight:1.5}}>
        {module.cards.filter(c=>c.type==="lesson").length} lesson cards · {module.cards.filter(c=>c.type==="quiz").length > 0 ? "1 quiz":"reflection"} · +{module.xp} XP
      </div>

      <button onClick={()=>!isLocked&&onStart(module)} style={{background:isLocked?"#1E2D40":isDone?`rgba(${module.track==="science"?"16,185,129":"139,92,246"},0.12)`:trackColor==="science"?"linear-gradient(135deg,#10B981,#059669)":module.track==="science"?"linear-gradient(135deg,#10B981,#059669)":"linear-gradient(135deg,#8B5CF6,#7C3AED)",border:isDone?`1px solid ${trackColor}30`:"none",borderRadius:9,padding:"10px",color:isLocked?"#475569":isDone?trackColor:"#fff",fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:13,cursor:isLocked?"not-allowed":"pointer",textAlign:"center"}}>
        {isLocked?"🔒 Complete previous module":isDone?"Review Module →":"Start Module →"}
      </button>
    </div>
  );
}

// ─── PAGE: LEARN ─────────────────────────────────────────────────────────────
function LearnPage() {
  const { state, updateState } = useContext(GameContext);
  const [activeTrack, setActiveTrack] = useState("science");
  const [openModule, setOpenModule] = useState(null);

  const modules = ALL_MODULES[activeTrack] || [];
  const completedSet = new Set(state.completedModules);

  const isLocked = (mod, idx) => idx > 0 && !completedSet.has(modules[idx-1]?.id);
  const isDone = (mod) => completedSet.has(mod.id);

  const sciDone = ALL_MODULES.science.filter(m=>completedSet.has(m.id)).length;
  const humDone = ALL_MODULES.reasoning.filter(m=>completedSet.has(m.id)).length;

  if (openModule) return (
    <ModuleViewer
      module={openModule}
      onClose={()=>setOpenModule(null)}
      onComplete={()=>setOpenModule(null)}
    />
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {/* Track tabs + stats */}
      <div style={{background:"#0F1623",border:"1px solid #1E2D40",borderRadius:12,padding:"16px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",gap:4,background:"#080C14",borderRadius:10,padding:4}}>
            {[["science","📊 Data","#10B981"],["reasoning","💡 Understanding","#8B5CF6"]].map(([id,label,color])=>(
              <button key={id} onClick={()=>setActiveTrack(id)} style={{padding:"9px 22px",borderRadius:8,border:"none",cursor:"pointer",background:activeTrack===id?"#162033":"transparent",color:activeTrack===id?color:"#475569",fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,transition:"all 0.2s"}}>
                {label}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:16}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:16,fontWeight:700,color:"#10B981"}}>{sciDone}/{ALL_MODULES.science.length}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#475569"}}>Data done</div>
            </div>
            <div style={{width:1,background:"#1E2D40"}}/>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:16,fontWeight:700,color:"#8B5CF6"}}>{humDone}/{ALL_MODULES.reasoning.length}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#475569"}}>Understanding done</div>
            </div>
          </div>
        </div>

        {/* Track description */}
        <div style={{marginTop:14,padding:"10px 14px",background:"rgba(15,22,35,0.6)",borderRadius:8,borderLeft:`3px solid ${activeTrack==="science"?"#10B981":"#8B5CF6"}`}}>
          <p style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#94A3B8",margin:0,lineHeight:1.6}}>
            {activeTrack==="science"
              ? "The Data track teaches you to read numbers, analyze charts, understand company financials, and build evidence-based investment decisions. 6 modules · Complete in order."
              : "The Understanding track explores the human psychology behind markets — why crashes happen, how biases distort decisions, and what history teaches us about collective behavior. 6 modules · Complete in order."}
          </p>
        </div>
      </div>

      {/* Module grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {modules.map((mod,idx)=>(
          <ModuleCard
            key={mod.id}
            module={mod}
            isLocked={isLocked(mod,idx)}
            isDone={isDone(mod)}
            onStart={setOpenModule}
          />
        ))}
      </div>
    </div>
  );
}

// ─── TRADE EXPLAINER MODAL ────────────────────────────────────────────────────
const TRADE_EXPLAINERS = {
  buy: {
    AAPL: {
      what: "You bought shares of Apple Inc. (AAPL). Each share represents a tiny slice of ownership in the company — its products, profits, and future.",
      why_price: "Apple's price reflects what millions of investors collectively believe the company is worth right now. You paid the current market price, which is set by the most recent trade between a buyer and seller.",
      money: (shares, price) => `You spent $${(shares*price).toFixed(2)} of your virtual cash. That money moved out of your cash balance and into ${shares} share${shares>1?"s":""} of AAPL. You don't get cash back until you sell.`,
      gain_loss: "Your position will gain value if Apple's stock price rises above what you paid. It will lose value if the price falls. You only realize a gain or loss when you sell — until then it's 'unrealized' (on paper only).",
      bias_check: "Before celebrating: are you buying AAPL because you analyzed the business, or because everyone talks about Apple? That's anchoring to brand familiarity — a common cognitive bias.",
      concepts: ["Market Price", "Unrealized P&L", "Ownership Stake", "Bid-Ask Spread"],
    },
    NVDA: {
      what: "You bought shares of NVIDIA Corp. (NVDA). NVIDIA makes GPUs — the chips that power AI, gaming, and data centers. Buying NVDA means you're betting on its continued dominance in those markets.",
      why_price: "NVDA trades at a high price because investors expect enormous future earnings from AI chip demand. A high price alone doesn't mean expensive — what matters is the P/E ratio (price vs earnings).",
      money: (shares, price) => `You spent $${(shares*price).toFixed(2)}. NVDA is a high-priced stock, which means even 1 share represents significant capital. This concentrates your risk in a single company.`,
      gain_loss: "NVDA is a high-beta stock — it moves more than the overall market in both directions. If AI spending grows, NVDA could surge. If it slows, NVDA could fall hard. High reward, high risk.",
      bias_check: "NVDA has been one of the best-performing stocks of the past 5 years. Be careful of recency bias — assuming past performance will continue. AI hype can create bubbles.",
      concepts: ["Beta", "P/E Ratio", "Sector Concentration", "Recency Bias"],
    },
    TSLA: {
      what: "You bought shares of Tesla Inc. (TSLA). Tesla is simultaneously a car company, an energy company, and an AI/robotics bet. Investors disagree sharply about what it's really worth.",
      why_price: "Tesla's price is driven heavily by sentiment and Elon Musk's public presence, not just fundamentals. It often trades at a premium far above traditional auto companies.",
      money: (shares, price) => `You spent $${(shares*price).toFixed(2)}. Tesla's high volatility means this position could swing ±10% in a week — much wider than most stocks.`,
      gain_loss: "Tesla's P&L is volatile. Good news (delivery records, new products, Elon tweets) can spike the price. Bad news (recalls, competition, macro fears) can crater it. Be prepared for turbulence.",
      bias_check: "Many retail investors feel strong emotions about Tesla — either fan devotion or deep skepticism. Both are biases. Try to evaluate it as a business, not a brand.",
      concepts: ["Volatility", "Sentiment-Driven Pricing", "Confirmation Bias", "Fundamental vs Technical"],
    },
    MSFT: {
      what: "You bought shares of Microsoft (MSFT). Microsoft owns Windows, Azure (cloud), Office, LinkedIn, and a major stake in OpenAI. It's considered a 'blue chip' — large, stable, and reliably profitable.",
      why_price: "MSFT trades at a premium because it has consistent earnings growth, massive cash reserves, and diversified revenue. Investors pay more for predictability.",
      money: (shares, price) => `You spent $${(shares*price).toFixed(2)}. Microsoft tends to be a lower-volatility holding — it won't make you rich overnight, but it's unlikely to collapse either.`,
      gain_loss: "Microsoft grows relatively steadily. Your P&L will likely follow the broader market and Microsoft's earnings growth. It also pays a dividend — real companies pay you to hold their stock.",
      bias_check: "Microsoft is widely seen as 'safe.' That familiarity can make people over-allocate to it. Safety is relative — even blue chips can fall 40% in a bear market.",
      concepts: ["Blue Chip Stock", "Dividend Yield", "Earnings Consistency", "Portfolio Concentration"],
    },
    SPY: {
      what: "You bought shares of SPY — an ETF (Exchange-Traded Fund) that tracks the S&P 500 index. You now own a tiny fraction of the 500 largest U.S. companies simultaneously.",
      why_price: "SPY's price reflects the collective value of 500 companies. It rises when the overall economy and corporate earnings grow, and falls during recessions or market-wide fear.",
      money: (shares, price) => `You spent $${(shares*price).toFixed(2)}. Unlike buying one company, this spreads your money across Apple, Microsoft, Amazon, Google, and 496 others — automatic diversification.`,
      gain_loss: "SPY returns the average of the entire S&P 500. Historically ~10%/year over long periods. It won't beat the market — it IS the market. But it also won't collapse to zero.",
      bias_check: "Index investing feels boring, which is why many people abandon it for exciting individual stocks. Studies show most traders underperform SPY over 10+ years. Boring often wins.",
      concepts: ["ETF", "Index Investing", "Diversification", "Passive vs Active Investing"],
    },
    GOOGL: {
      what: "You bought shares of Alphabet Inc. (GOOGL), Google's parent company. Alphabet earns most of its revenue from advertising, but also owns YouTube, Google Cloud, Waymo, and DeepMind.",
      why_price: "Google's price reflects its near-monopoly on search advertising, strong cloud growth, and massive cash reserves. It's considered a quality business at a reasonable valuation.",
      money: (shares, price) => `You spent $${(shares*price).toFixed(2)}. Alphabet doesn't pay a dividend — it reinvests profits into growth. Your return comes entirely from price appreciation.`,
      gain_loss: "Alphabet tends to move with the broader tech sector. Its biggest risk is regulatory action (antitrust) and competition from AI models disrupting traditional search.",
      bias_check: "Google is so embedded in daily life that investors often confuse using the product with understanding the investment. Popularity ≠ investment quality.",
      concepts: ["Advertising Revenue", "Reinvestment vs Dividends", "Regulatory Risk", "Moat"],
    },
  },
  sell: {
    AAPL: {
      what: "You sold your Apple shares. Your ownership stake in Apple is now reduced or eliminated. You've converted stock back into cash.",
      why_price: "You sold at the current market price — whatever a buyer was willing to pay at that exact moment. Stock prices fluctuate every second based on supply and demand.",
      money: (shares, price, avgCost) => {
        const pnl = (price - avgCost) * shares;
        return pnl >= 0
          ? `You received $${(shares*price).toFixed(2)} in cash. Since you bought at $${avgCost}, you made $${pnl.toFixed(2)} profit — your shares grew in value while you held them.`
          : `You received $${(shares*price).toFixed(2)} in cash. Since you bought at $${avgCost}, you realized a $${Math.abs(pnl).toFixed(2)} loss — the price fell below what you paid.`;
      },
      gain_loss: "This is a 'realized' gain or loss — it's now real, not just on paper. A profit means the market valued Apple higher when you sold than when you bought. A loss means the opposite.",
      bias_check: "Did you sell because of a rational decision, or because of fear (panic selling) or greed (taking profits too early)? Loss aversion often causes people to sell winners too soon and hold losers too long.",
      concepts: ["Realized P&L", "Capital Gains", "Loss Aversion", "Market Price"],
    },
    NVDA: {
      what: "You sold NVIDIA shares, converting your stake back to cash. This locks in whatever gain or loss occurred between your buy price and today's price.",
      why_price: "NVDA is highly volatile — its price swings more than most stocks. The price you received reflects current sentiment about AI chip demand and NVIDIA's competitive position.",
      money: (shares, price, avgCost) => {
        const pnl = (price - avgCost) * shares;
        return `You received $${(shares*price).toFixed(2)}. Your ${pnl >= 0 ? "profit" : "loss"} of $${Math.abs(pnl).toFixed(2)} is now realized — it's in your cash balance.`;
      },
      gain_loss: "High-beta stocks like NVDA can deliver large realized gains — or large realized losses. The key insight: unrealized gains feel good but aren't real money until you sell.",
      bias_check: "If you sold after a big gain, watch for 'anchoring' — if NVDA keeps rising after you sell, you may feel regret. Remember: you can't predict the future, and booking a profit is always rational.",
      concepts: ["Realized vs Unrealized Gains", "High Beta", "Profit-Taking", "Anchoring Bias"],
    },
    TSLA: { what: "You sold Tesla shares.", why_price: "Tesla's price is heavily sentiment-driven.", money: (shares, price, avgCost) => { const pnl = (price-avgCost)*shares; return `You received $${(shares*price).toFixed(2)}, realizing a ${pnl>=0?"profit":"loss"} of $${Math.abs(pnl).toFixed(2)}.`; }, gain_loss: "Tesla's volatility means your realized P&L could be dramatic in either direction.", bias_check: "Tesla evokes strong emotions in investors. Make sure this sale was driven by your investment thesis, not your feelings about the company.", concepts: ["Sentiment Risk", "Realized P&L", "Emotional Investing"] },
    MSFT: { what: "You sold Microsoft shares, a blue-chip holding.", why_price: "Microsoft's price is more stable than most tech stocks, reflecting its consistent earnings.", money: (shares, price, avgCost) => { const pnl = (price-avgCost)*shares; return `You received $${(shares*price).toFixed(2)}, realizing a ${pnl>=0?"gain":"loss"} of $${Math.abs(pnl).toFixed(2)}.`; }, gain_loss: "Microsoft tends to appreciate steadily. Selling early can mean missing continued growth — but every investor has to balance needs.", bias_check: "Did you sell Microsoft to buy something more exciting? That's a common pattern that often underperforms just holding the boring stock.", concepts: ["Blue Chip", "Opportunity Cost", "Long-term Holding"] },
    SPY: { what: "You sold your S&P 500 ETF position.", why_price: "SPY's price moves with the entire U.S. stock market — when you sold, you got today's market value of those 500 companies.", money: (shares, price, avgCost) => { const pnl = (price-avgCost)*shares; return `You received $${(shares*price).toFixed(2)}, locking in a ${pnl>=0?"gain":"loss"} of $${Math.abs(pnl).toFixed(2)}.`; }, gain_loss: "Selling index funds mid-market can be a mistake over long time horizons. Short-term pain is often followed by long-term gains for index investors.", bias_check: "Did you sell because the market dipped and you panicked? Studies show investors who sell during dips and wait to 're-enter' almost always miss the recovery.", concepts: ["Index Fund", "Market Timing Risk", "Long-term vs Short-term"] },
    GOOGL: { what: "You sold Alphabet (Google) shares.", why_price: "Google's price reflects its advertising dominance and AI investments at the moment of your sale.", money: (shares, price, avgCost) => { const pnl = (price-avgCost)*shares; return `You received $${(shares*price).toFixed(2)}, realizing a ${pnl>=0?"profit":"loss"} of $${Math.abs(pnl).toFixed(2)}.`; }, gain_loss: "Without a dividend, all your return from GOOGL comes from price change — so your sale price vs buy price is everything.", bias_check: "Alphabet's long-term growth story is intact but AI is changing search. Is your sell based on this new reality, or on short-term price movement?", concepts: ["Capital Gains", "Business Fundamentals", "AI Disruption Risk"] },
  }
};

function TradeExplainerModal({ trade, onClose, onAsk }) {
  const { type, ticker, shares, price, avgCost, totalCost, cashAfter, pnl } = trade;
  const ex = TRADE_EXPLAINERS[type]?.[ticker] || TRADE_EXPLAINERS.buy.AAPL;
  const isBuy = type === "buy";
  const accentColor = isBuy ? "#10B981" : pnl >= 0 ? "#10B981" : "#EF4444";

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const moneyText = typeof ex.money === "function"
    ? ex.money(shares, price, avgCost)
    : ex.money;

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.82)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", backdropFilter:"blur(6px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0F1623", border:`1px solid ${accentColor}30`, borderRadius:18, width:"100%", maxWidth:620, maxHeight:"88vh", overflowY:"auto", animation:"fadeSlideUp 0.28s ease" }}>

        {/* Header */}
        <div style={{ padding:"20px 24px 0", borderBottom:"1px solid #1E2D40", paddingBottom:16, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
              <span style={{ fontSize:28 }}>{isBuy?"🟢":"🔴"}</span>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:20, color:"#F1F5F9", lineHeight:1 }}>
                  {isBuy ? "You bought" : "You sold"} {shares} share{shares>1?"s":""} of {ticker}
                </div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#475569", marginTop:2 }}>
                  @ ${price.toFixed(2)}/share · ${totalCost.toFixed(2)} total
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", fontSize:24, lineHeight:1, padding:4 }}>×</button>
        </div>

        {/* Numbers bar */}
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${isBuy?3:4},1fr)`, gap:0, borderBottom:"1px solid #1E2D40" }}>
          {[
            { label: isBuy?"Spent":"Received",   val:`$${totalCost.toFixed(2)}`,   color:"#F1F5F9" },
            { label:"Cash balance",              val:`$${cashAfter.toFixed(2)}`,   color:"#3B82F6" },
            ...(!isBuy ? [{ label: pnl>=0?"Profit":"Loss", val:`${pnl>=0?"+":"-"}$${Math.abs(pnl).toFixed(2)}`, color: pnl>=0?"#10B981":"#EF4444" }] : []),
            { label:"+XP earned",                val:"+10 XP",                      color:"#F59E0B" },
          ].map(n=>(
            <div key={n.label} style={{ padding:"14px 18px", borderRight:"1px solid #1E2D40" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#475569", marginBottom:3 }}>{n.label}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:17, fontWeight:700, color:n.color }}>{n.val}</div>
            </div>
          ))}
        </div>

        {/* Explainer sections */}
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { emoji:"📦", title:"What just happened?",       body: ex.what },
            { emoji:"💲", title:"Why this price?",           body: ex.why_price },
            { emoji:"💰", title:"Where did your money go?",  body: moneyText },
            { emoji:"📈", title:"When do you gain or lose?", body: ex.gain_loss },
          ].map(s=>(
            <div key={s.title} style={{ background:"#080C14", border:"1px solid #1E2D40", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:"#F1F5F9", marginBottom:6 }}>{s.emoji} {s.title}</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#94A3B8", lineHeight:1.7 }}>{s.body}</div>
            </div>
          ))}

          {/* Bias check */}
          <div style={{ background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.2)", borderLeft:"3px solid #F59E0B", borderRadius:"0 10px 10px 0", padding:"12px 16px" }}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12, color:"#F59E0B", marginBottom:4 }}>🧠 Bias Check</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#94A3B8", lineHeight:1.6 }}>{ex.bias_check}</div>
          </div>

          {/* Concepts */}
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#475569", fontWeight:700, marginBottom:8, letterSpacing:"0.08em" }}>CONCEPTS IN THIS TRADE</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {ex.concepts.map(c=>(
                <span key={c} style={{ background:`${accentColor}10`, border:`1px solid ${accentColor}25`, color:accentColor, fontFamily:"'DM Mono',monospace", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{c}</span>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display:"flex", gap:10, marginTop:4 }}>
            <button onClick={()=>{ onAsk(`Why did my ${type} of ${shares} share${shares>1?"s":""} of ${ticker} at $${price.toFixed(2)} ${isBuy?"cost me":"earn me"} $${totalCost.toFixed(2)}?`); onClose(); }}
              style={{ flex:1, padding:"11px", borderRadius:10, border:"1px solid #3B82F6", background:"rgba(59,130,246,0.08)", color:"#3B82F6", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer" }}>
              💬 Ask a follow-up question
            </button>
            <button onClick={onClose}
              style={{ flex:1, padding:"11px", borderRadius:10, border:"none", background:accentColor, color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer" }}>
              Got it ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: TRADE ──────────────────────────────────────────────────────────────
function TradePage({ onAsk }) {
  const { state, updateState } = useContext(GameContext);
  const [selected, setSelected]     = useState("AAPL");
  const [shares, setShares]         = useState(1);
  const [orderType, setOrderType]   = useState("buy");
  const [tick, setTick]             = useState(0);
  const [lastTrade, setLastTrade]   = useState(null); // shows explainer modal

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const stocks = {
    AAPL:  { name:"Apple Inc.",      base:182.30, vol:0.12, sector:"Technology",     pe:"28x",  div:"0.5%",  beta:"1.2" },
    NVDA:  { name:"NVIDIA Corp.",    base:467.80, vol:0.45, sector:"Semiconductors", pe:"62x",  div:"0.0%",  beta:"2.0" },
    TSLA:  { name:"Tesla Inc.",      base:251.40, vol:0.33, sector:"Auto/EV",        pe:"72x",  div:"0.0%",  beta:"2.3" },
    MSFT:  { name:"Microsoft",       base:390.10, vol:0.18, sector:"Technology",     pe:"34x",  div:"0.8%",  beta:"0.9" },
    SPY:   { name:"S&P 500 ETF",     base:451.20, vol:0.08, sector:"Index Fund",     pe:"22x",  div:"1.3%",  beta:"1.0" },
    GOOGL: { name:"Alphabet Inc.",   base:165.50, vol:0.22, sector:"Technology",     pe:"25x",  div:"0.0%",  beta:"1.1" },
  };

  const getPrice = ticker => {
    const s = stocks[ticker];
    return +(s.base + Math.sin(tick * 0.7 + ticker.charCodeAt(0)) * s.vol * 3).toFixed(2);
  };

  const currentPrice = getPrice(selected);
  const cost = currentPrice * shares;
  const holding = state.portfolio.find(h => h.ticker === selected);
  const canBuy = state.virtualCash >= cost;
  const canSell = holding && holding.shares >= shares;
  const canExecute = orderType === "buy" ? canBuy : canSell;

  const executeOrder = () => {
    if (!canExecute) return;
    const price = currentPrice;
    const totalCost = cost;

    if (orderType === "buy") {
      const existing = state.portfolio.find(h => h.ticker === selected);
      let newPortfolio;
      if (existing) {
        const totalShares = existing.shares + shares;
        const newAvg = +((existing.shares * existing.avgCost + shares * price) / totalShares).toFixed(2);
        newPortfolio = state.portfolio.map(h =>
          h.ticker === selected ? { ...h, shares: totalShares, avgCost: newAvg, current: price } : h
        );
      } else {
        newPortfolio = [...state.portfolio, { ticker: selected, shares, avgCost: price, current: price }];
      }
      const newCash = +(state.virtualCash - totalCost).toFixed(2);
      updateState({ virtualCash: newCash, portfolio: newPortfolio, xp: state.xp + 10,
        transactions: [...state.transactions, { type:"buy", ticker:selected, shares, price, date: new Date().toISOString() }] });
      setLastTrade({ type:"buy", ticker:selected, shares, price, avgCost: price, totalCost, cashAfter: newCash, pnl: 0 });

    } else {
      const avgCost = holding.avgCost;
      const pnl = +((price - avgCost) * shares).toFixed(2);
      const newShares = holding.shares - shares;
      let newPortfolio = newShares > 0
        ? state.portfolio.map(h => h.ticker === selected ? { ...h, shares: newShares } : h)
        : state.portfolio.filter(h => h.ticker !== selected);
      const newCash = +(state.virtualCash + totalCost).toFixed(2);
      updateState({ virtualCash: newCash, portfolio: newPortfolio, xp: state.xp + 10,
        transactions: [...state.transactions, { type:"sell", ticker:selected, shares, price, pnl, date: new Date().toISOString() }] });
      setLastTrade({ type:"sell", ticker:selected, shares, price, avgCost, totalCost, cashAfter: newCash, pnl });
    }
    setShares(1);
  };

  const stock = stocks[selected];

  return (
    <>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
        {/* LEFT: Chart + info */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Stock selector */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {Object.entries(stocks).map(([ticker, { sector }]) => (
              <button key={ticker} onClick={()=>setSelected(ticker)} style={{
                padding:"7px 16px", borderRadius:8,
                border:`1px solid ${selected===ticker?"#3B82F6":"#1E2D40"}`,
                background:selected===ticker?"rgba(59,130,246,0.1)":"#0F1623",
                color:selected===ticker?"#3B82F6":"#94A3B8",
                fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:13, cursor:"pointer"
              }}>{ticker}</button>
            ))}
          </div>

          {/* Chart */}
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
              <div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:30, fontWeight:700, color:"#F1F5F9" }}>${currentPrice}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#94A3B8", marginTop:2 }}>{stock.name} · {stock.sector}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:15, color:"#10B981" }}>+1.24%</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#475569" }}>+${(currentPrice*0.0124).toFixed(2)} today</div>
              </div>
            </div>
            <div style={{ height:180, position:"relative", marginBottom:14 }}>
              <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {(()=>{
                  const pts = Array.from({length:60},(_,i)=>({
                    x:(i/59)*600,
                    y:Math.max(10,Math.min(170, 90+Math.sin(i*0.3+tick*0.1)*30+Math.sin(i*0.1)*20-i*0.3))
                  }));
                  const path = pts.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
                  return (<>
                    <path d={path+` L600,180 L0,180 Z`} fill="url(#chartGrad)"/>
                    <path d={path} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx={pts[59].x} cy={pts[59].y} r="4" fill="#10B981"/>
                    <circle cx={pts[59].x} cy={pts[59].y} r="8" fill="#10B981" fillOpacity="0.2"/>
                  </>);
                })()}
              </svg>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["1D","1W","1M","3M","1Y","ALL"].map(t=>(
                <button key={t} style={{ padding:"4px 12px", borderRadius:6, border:"1px solid "+(t==="1M"?"#3B82F6":"#1E2D40"), background:t==="1M"?"rgba(59,130,246,0.1)":"transparent", color:t==="1M"?"#3B82F6":"#475569", fontFamily:"'DM Mono',monospace", fontSize:11, cursor:"pointer" }}>{t}</button>
              ))}
            </div>
          </Card>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 }}>
            {[["Open","$179.82"],["High","$183.45"],["Low","$179.10"],["Volume","48.2M"],["P/E",stock.pe],["Beta",stock.beta]].map(([l,v])=>(
              <div key={l} style={{ background:"#0F1623", border:"1px solid #1E2D40", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#475569", marginBottom:3 }}>{l}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#F1F5F9" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Current holding info */}
          {holding && (
            <div style={{ background:"rgba(59,130,246,0.05)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:"#F1F5F9", marginBottom:10 }}>Your {selected} Position</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                {[
                  ["Shares", holding.shares],
                  ["Avg Cost", `$${holding.avgCost}`],
                  ["Current", `$${holding.current}`],
                  ["P&L", `${holding.current>holding.avgCost?"+":"-"}$${Math.abs((holding.current-holding.avgCost)*holding.shares).toFixed(2)}`],
                ].map(([l,v])=>(
                  <div key={l}>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#475569", marginBottom:2 }}>{l}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color: l==="P&L"?(holding.current>=holding.avgCost?"#10B981":"#EF4444"):"#F1F5F9" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:10, fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#3B82F6", cursor:"pointer" }}
                onClick={()=>setLastTrade({type:"info", ticker:selected, shares:holding.shares, price:holding.current, avgCost:holding.avgCost, totalCost:holding.current*holding.shares, cashAfter:state.virtualCash, pnl:(holding.current-holding.avgCost)*holding.shares})}>
                ❓ What does this mean? →
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Order panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card glow>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:"#F1F5F9", marginBottom:16 }}>Place Order</div>

            {/* Buy/Sell toggle */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, background:"#080C14", borderRadius:8, padding:4, marginBottom:16 }}>
              {["buy","sell"].map(type=>(
                <button key={type} onClick={()=>setOrderType(type)} style={{
                  padding:"9px", borderRadius:6, border:"none", cursor:"pointer",
                  background:orderType===type?(type==="buy"?"#10B981":"#EF4444"):"transparent",
                  color:orderType===type?"#fff":"#475569",
                  fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, textTransform:"capitalize"
                }}>{type}</button>
              ))}
            </div>

            {/* Shares */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#94A3B8", marginBottom:6 }}>Shares</div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setShares(Math.max(1,shares-1))} style={{ background:"#162033", border:"1px solid #1E2D40", borderRadius:6, padding:"8px 14px", color:"#F1F5F9", cursor:"pointer", fontSize:16, fontWeight:700 }}>−</button>
                <div style={{ flex:1, background:"#162033", border:"1px solid #1E2D40", borderRadius:6, padding:"10px", fontFamily:"'DM Mono',monospace", fontSize:16, fontWeight:700, color:"#F1F5F9", textAlign:"center" }}>{shares}</div>
                <button onClick={()=>setShares(shares+1)} style={{ background:"#162033", border:"1px solid #1E2D40", borderRadius:6, padding:"8px 14px", color:"#F1F5F9", cursor:"pointer", fontSize:16, fontWeight:700 }}>+</button>
              </div>
            </div>

            {/* Summary */}
            <div style={{ background:"#080C14", borderRadius:8, padding:"12px", marginBottom:16 }}>
              {[
                ["Price / share", `$${currentPrice}`],
                ["Shares", shares],
                [orderType==="buy"?"Total cost":"You receive", `$${cost.toFixed(2)}`],
                [orderType==="buy"?"Cash after":"New balance", `$${(orderType==="buy"?state.virtualCash-cost:state.virtualCash+cost).toFixed(2)}`],
                ...( orderType==="sell" && holding ? [["Realized P&L", `${currentPrice>=holding.avgCost?"+":"-"}$${Math.abs((currentPrice-holding.avgCost)*shares).toFixed(2)}`]] : []),
              ].map(([label,val])=>(
                <div key={label} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#475569" }}>{label}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#F1F5F9" }}>{val}</span>
                </div>
              ))}
            </div>

            <button onClick={executeOrder} style={{
              width:"100%", padding:"13px", borderRadius:9, border:"none",
              cursor:canExecute?"pointer":"not-allowed",
              background:canExecute?(orderType==="buy"?"linear-gradient(135deg,#10B981,#059669)":"linear-gradient(135deg,#EF4444,#DC2626)"):"#1E2D40",
              color:canExecute?"#fff":"#475569",
              fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, transition:"all 0.2s",
              boxShadow:canExecute?`0 0 18px ${orderType==="buy"?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`:"none"
            }}>
              {orderType==="buy"?"🟢 Buy":"🔴 Sell"} {shares} {selected}
            </button>
            {!canExecute && (
              <div style={{ textAlign:"center", marginTop:8, fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#EF4444" }}>
                {orderType==="buy"?"Insufficient cash":"You don't hold enough shares to sell"}
              </div>
            )}

            {/* What happens next hint */}
            <div style={{ marginTop:12, padding:"10px 12px", background:"rgba(59,130,246,0.05)", border:"1px solid rgba(59,130,246,0.15)", borderRadius:8 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#3B82F6" }}>
                💡 After you trade, we'll explain exactly what happened and why.
              </div>
            </div>
          </Card>

          {/* Bias check card */}
          <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:10, padding:"13px 15px" }}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12, color:"#F59E0B", marginBottom:5 }}>🧠 Before You Trade</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:"#94A3B8", lineHeight:1.6 }}>
              {selected} {orderType==="buy"?"is in your watchlist. Are you buying because of analysis or because of FOMO?":"— selling can lock in losses permanently. Is this a rational exit or fear?"}
            </div>
          </div>

          {/* Quick ask */}
          <button onClick={()=>onAsk(`What should I know before ${orderType==="buy"?"buying":"selling"} ${selected}?`)}
            style={{ background:"transparent", border:"1px solid #1E2D40", borderRadius:10, padding:"11px 14px", color:"#475569", fontFamily:"'Outfit',sans-serif", fontSize:13, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:16 }}>💬</span>
            <span>Ask: "What should I know about {selected}?"</span>
          </button>
        </div>
      </div>

      {/* Post-trade explainer modal */}
      {lastTrade && (
        <TradeExplainerModal
          trade={lastTrade}
          onClose={()=>setLastTrade(null)}
          onAsk={onAsk}
        />
      )}
    </>
  );
}

// ─── PAGE: PORTFOLIO ──────────────────────────────────────────────────────────
function PortfolioPage() {
  const { state } = useContext(GameContext);
  const total = state.portfolio.reduce((s, h) => s + h.shares * h.current, 0);
  const totalCost = state.portfolio.reduce((s, h) => s + h.shares * h.avgCost, 0);

  const allocation = state.portfolio.map(h => ({
    ...h,
    value: h.shares * h.current,
    pct: ((h.shares * h.current) / total * 100).toFixed(1),
    pnl: (h.current - h.avgCost) * h.shares,
    pnlPct: ((h.current - h.avgCost) / h.avgCost * 100).toFixed(2),
  }));

  const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        <StatCard label="Total Portfolio" value={`$${(total + state.virtualCash).toLocaleString()}`} sub="Including cash" trend="up" color="#10B981"/>
        <StatCard label="Invested" value={`$${total.toFixed(0)}`} sub={`${allocation.length} positions`} color="#3B82F6"/>
        <StatCard label="Total Return" value={`+$${(total - totalCost).toFixed(2)}`} sub={`+${((total - totalCost) / totalCost * 100).toFixed(1)}%`} trend="up" color="#10B981"/>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20 }}>
        {/* Holdings Table */}
        <Card>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", margin: "0 0 16px" }}>Holdings</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px 80px", gap: 0 }}>
            {["ASSET", "SHARES", "AVG COST", "CURRENT", "P&L"].map(h => (
              <div key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#475569", padding: "6px 8px", borderBottom: "1px solid #1E2D40", fontWeight: 700 }}>{h}</div>
            ))}
            {allocation.map((h, i) => (
              <>
                <div key={h.ticker + "a"} style={{ padding: "12px 8px", borderBottom: "1px solid #1E2D4020" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[i % colors.length], flexShrink: 0 }}/>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#F1F5F9" }}>{h.ticker}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#475569" }}>Pct: {h.pct}%</div>
                    </div>
                  </div>
                </div>
                <div key={h.ticker + "b"} style={{ padding: "12px 8px", borderBottom: "1px solid #1E2D4020", fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#F1F5F9", display: "flex", alignItems: "center" }}>{h.shares}</div>
                <div key={h.ticker + "c"} style={{ padding: "12px 8px", borderBottom: "1px solid #1E2D4020", fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#94A3B8", display: "flex", alignItems: "center" }}>${h.avgCost}</div>
                <div key={h.ticker + "d"} style={{ padding: "12px 8px", borderBottom: "1px solid #1E2D4020", fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#F1F5F9", display: "flex", alignItems: "center" }}>${h.current}</div>
                <div key={h.ticker + "e"} style={{ padding: "12px 8px", borderBottom: "1px solid #1E2D4020", fontFamily: "'DM Mono', monospace", fontSize: 12, color: h.pnl >= 0 ? "#10B981" : "#EF4444", display: "flex", alignItems: "center" }}>
                  {h.pnl >= 0 ? "+" : ""}${h.pnl.toFixed(2)}
                </div>
              </>
            ))}
          </div>
        </Card>

        {/* Allocation Pie (CSS-based) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14, color: "#F1F5F9", margin: "0 0 16px" }}>Allocation</h3>
            {/* Simple bar chart allocation */}
            {allocation.map((h, i) => (
              <div key={h.ticker} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#F1F5F9", fontWeight: 700 }}>{h.ticker}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>{h.pct}%</span>
                </div>
                <div style={{ height: 6, background: "#1E2D40", borderRadius: 99 }}>
                  <div style={{ height: "100%", width: `${h.pct}%`, background: colors[i % colors.length], borderRadius: 99, transition: "width 0.6s ease" }}/>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14, color: "#F1F5F9", margin: "0 0 12px" }}>Risk Score</h3>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 40, fontWeight: 700, color: "#F59E0B" }}>6.4</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#94A3B8" }}>Moderate Risk</div>
              <div style={{ height: 6, background: "#1E2D40", borderRadius: 99, marginTop: 12 }}>
                <div style={{ height: "100%", width: "64%", background: "linear-gradient(90deg,#10B981,#F59E0B,#EF4444)", borderRadius: 99 }}/>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#10B981" }}>LOW</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#EF4444" }}>HIGH</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: QUESTS ─────────────────────────────────────────────────────────────
function QuestsPage() {
  const { state } = useContext(GameContext);

  const quests = [
    { id: "first-trade",   title: "First Blood",            desc: "Execute your first buy order",                       xp: 50,  reward: "🎯",  done: true,  category: "Beginner" },
    { id: "diversify",     title: "Don't Put All Eggs...",  desc: "Hold 3 different stocks simultaneously",             xp: 75,  reward: "🥚",  done: true,  category: "Beginner" },
    { id: "5-stocks",      title: "Diversification Master", desc: "Hold 5 different stocks simultaneously",             xp: 100, reward: "🌟",  done: false, category: "Intermediate", progress: 60 },
    { id: "green-week",    title: "Green Week",             desc: "End 5 consecutive trading days in profit",           xp: 150, reward: "📈",  done: false, category: "Intermediate", progress: 40 },
    { id: "hodl-30",       title: "Diamond Hands",          desc: "Hold a position for 30 simulated days",              xp: 100, reward: "💎",  done: false, category: "Patience" },
    { id: "learn-5",       title: "Student of the Market",  desc: "Complete 5 learning modules",                        xp: 100, reward: "📚",  done: false, category: "Learning", progress: 40 },
    { id: "bias-check",    title: "Know Thyself",           desc: "Identify 3 cognitive biases in your trading log",    xp: 125, reward: "🧠",  done: false, category: "Psychology" },
    { id: "loss-recover",  title: "Resilience",             desc: "Recover from a -10% drawdown to breakeven",         xp: 200, reward: "🔥",  done: false, category: "Advanced" },
    { id: "etf-master",    title: "Index Whisperer",        desc: "Outperform the S&P 500 ETF over 30 days",           xp: 250, reward: "🏆",  done: false, category: "Advanced" },
  ];

  const categories = [...new Set(quests.map(q => q.category))];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        <StatCard label="Completed" value={`${quests.filter(q => q.done).length}/${quests.length}`} sub="Quests finished" trend="up" color="#10B981"/>
        <StatCard label="XP Earned" value={quests.filter(q => q.done).reduce((s, q) => s + q.xp, 0) + " XP"} sub="From quests" color="#F59E0B"/>
        <StatCard label="Badges" value={state.earnedBadges.length} sub="Trophies collected" color="#3B82F6"/>
      </div>

      {/* Quest Lists by Category */}
      {categories.map(cat => (
        <div key={cat}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "0.1em", marginBottom: 12 }}>{cat.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {quests.filter(q => q.category === cat).map(q => (
              <div key={q.id} style={{ background: q.done ? "rgba(16,185,129,0.04)" : "#0F1623", border: `1px solid ${q.done ? "rgba(16,185,129,0.2)" : "#1E2D40"}`, borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{q.reward}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14, color: q.done ? "#10B981" : "#F1F5F9" }}>{q.title}</span>
                    {q.done && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#10B981", background: "rgba(16,185,129,0.1)", padding: "1px 6px", borderRadius: 4 }}>COMPLETE</span>}
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#94A3B8", marginBottom: q.progress !== undefined && !q.done ? 8 : 0 }}>{q.desc}</div>
                  {q.progress !== undefined && !q.done && (
                    <div>
                      <div style={{ height: 4, background: "#1E2D40", borderRadius: 99 }}>
                        <div style={{ height: "100%", width: `${q.progress}%`, background: "linear-gradient(90deg,#F59E0B,#FCD34D)", borderRadius: 99 }}/>
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#F59E0B", marginTop: 3, display: "block" }}>{q.progress}%</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "#F59E0B" }}>+{q.xp}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#475569" }}>XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PAGE: PSYCHOLOGY LAB ─────────────────────────────────────────────────────
function PsychologyPage() {
  const [activeTab, setActiveTab] = useState("biases");

  const biases = [
    { name: "Loss Aversion", emoji: "🧊", color: "#3B82F6", severity: 85, desc: "You feel losses ~2× more intensely than equivalent gains. Classic human wiring.", example: "Holding a losing stock too long hoping it'll recover." },
    { name: "FOMO",           emoji: "😰", color: "#EF4444", severity: 70, desc: "Fear of Missing Out drives impulsive buying near market peaks.", example: "Buying NVDA after a 40% run because everyone's talking about it." },
    { name: "Anchoring",      emoji: "⚓", color: "#F59E0B", severity: 60, desc: "You fixate on a reference price even when it's no longer relevant.", example: "'I'll sell when it gets back to $200' (arbitrary anchor)." },
    { name: "Confirmation",   emoji: "🪞", color: "#8B5CF6", severity: 55, desc: "You seek information that confirms what you already believe.", example: "Only reading bullish analyses of your existing holdings." },
    { name: "Recency Bias",   emoji: "🗓️", color: "#10B981", severity: 45, desc: "You overweight recent events and assume they'll continue.", example: "Thinking 'the market only goes up' after a bull run." },
    { name: "Overconfidence", emoji: "💪", color: "#F59E0B", severity: 50, desc: "Believing your skills exceed luck in short-term trading.", example: "3 wins in a row? Must be talent (not randomness)." },
  ];

  const fearGreedData = [20, 35, 28, 55, 70, 82, 90, 78, 60, 45, 35, 42, 58, 72, 65];
  const currentFG = fearGreedData[fearGreedData.length - 1];
  const fgColor = currentFG > 75 ? "#EF4444" : currentFG > 55 ? "#F59E0B" : currentFG > 40 ? "#10B981" : "#3B82F6";
  const fgLabel = currentFG > 75 ? "Extreme Greed" : currentFG > 55 ? "Greed" : currentFG > 40 ? "Neutral" : "Fear";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#080C14", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {[["biases","🧬 Cognitive Biases"], ["feargreed","📊 Fear & Greed"], ["bubbles","💥 Bubbles & Crashes"]].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", background: activeTab === id ? "#162033" : "transparent", color: activeTab === id ? "#F1F5F9" : "#475569", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 13 }}>{label}</button>
        ))}
      </div>

      {activeTab === "biases" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {biases.map(b => (
              <Card key={b.name} style={{ borderLeft: `3px solid ${b.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{b.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14, color: "#F1F5F9" }}>{b.name}</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#475569" }}>Severity in your trades</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700, color: b.color }}>{b.severity}%</div>
                </div>
                <div style={{ height: 4, background: "#1E2D40", borderRadius: 99, marginBottom: 12 }}>
                  <div style={{ height: "100%", width: `${b.severity}%`, background: b.color, borderRadius: 99 }}/>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#94A3B8", marginBottom: 8 }}>{b.desc}</div>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "8px 10px", fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#475569", fontStyle: "italic" }}>
                  💡 {b.example}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "feargreed" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
          <Card>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", margin: "0 0 16px" }}>Fear & Greed Index — Historical</h3>
            <div style={{ height: 200, position: "relative" }}>
              <svg width="100%" height="200" viewBox="0 0 560 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#10B981" stopOpacity="0.1"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
                {/* Zones */}
                <rect x="0" y="0" width="560" height="50" fill="#EF4444" fillOpacity="0.04"/>
                <text x="8" y="16" style={{ fontFamily: "DM Mono", fontSize: "9px", fill: "#EF444466" }}>EXTREME GREED</text>
                <rect x="0" y="100" width="560" height="50" fill="#F59E0B" fillOpacity="0.04"/>
                <text x="8" y="116" style={{ fontFamily: "DM Mono", fontSize: "9px", fill: "#F59E0B66" }}>NEUTRAL</text>
                <rect x="0" y="150" width="560" height="50" fill="#3B82F6" fillOpacity="0.04"/>
                <text x="8" y="166" style={{ fontFamily: "DM Mono", fontSize: "9px", fill: "#3B82F666" }}>EXTREME FEAR</text>
                {(() => {
                  const pts = fearGreedData.map((v, i) => {
                    const x = (i / (fearGreedData.length - 1)) * 540 + 10;
                    const y = 200 - (v / 100) * 190;
                    return `${x},${y}`;
                  }).join(" ");
                  return (
                    <>
                      <polyline points={pts} fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      {fearGreedData.map((v, i) => {
                        const x = (i / (fearGreedData.length - 1)) * 540 + 10;
                        const y = 200 - (v / 100) * 190;
                        return <circle key={i} cx={x} cy={y} r={i === fearGreedData.length - 1 ? 5 : 3} fill="#F59E0B" fillOpacity={i === fearGreedData.length - 1 ? 1 : 0.5}/>;
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card glow>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#94A3B8", marginBottom: 8 }}>Current Index</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 52, fontWeight: 700, color: fgColor, lineHeight: 1 }}>{currentFG}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: fgColor, marginTop: 4 }}>{fgLabel}</div>
              <div style={{ height: 8, background: "linear-gradient(90deg,#3B82F6,#10B981,#F59E0B,#EF4444)", borderRadius: 99, marginTop: 12, position: "relative" }}>
                <div style={{ position: "absolute", top: -2, left: `${currentFG}%`, transform: "translateX(-50%)", width: 12, height: 12, background: "#F1F5F9", borderRadius: "50%", border: `2px solid ${fgColor}`, boxShadow: `0 0 8px ${fgColor}` }}/>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3B82F6" }}>FEAR</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#EF4444" }}>GREED</span>
              </div>
            </Card>
            <Card>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 13, color: "#F1F5F9", marginBottom: 8 }}>What it means</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#94A3B8", lineHeight: 1.7 }}>
                High greed often signals a market top. Investors are overconfident and prices may be overextended. Consider this before chasing momentum.
              </div>
              <div style={{ marginTop: 10, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#F59E0B" }}>Warren Buffett: "Be fearful when others are greedy."</div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "bubbles" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {[
            { name: "Dot-Com Bubble", years: "1997–2000", peak: "NASDAQ +400%", crash: "-78% in 30 months", lesson: "Hype without earnings. P/E ratios of 200x+. Everyone was a genius until they weren't.", color: "#EF4444" },
            { name: "Housing Crisis", years: "2004–2008", peak: "Home prices +70%", crash: "Global recession", lesson: "Debt, derivatives, and delusion. Mortgages given to anyone breathing. Systemic risk ignored.", color: "#F59E0B" },
            { name: "Crypto 2021",    years: "2020–2022", peak: "BTC $69k, DOGE memes", crash: "-65% to -99%", lesson: "Retail FOMO + social media + zero rates = speculative frenzy. History rhymes.", color: "#3B82F6" },
            { name: "Tulip Mania",    years: "1636–1637", peak: "Tulip = house price", crash: "Near-zero overnight", lesson: "The OG bubble. Collectibles + scarcity + social proof = first recorded bubble in 1637 Netherlands.", color: "#10B981" },
          ].map(b => (
            <Card key={b.name} style={{ borderTop: `2px solid ${b.color}` }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: b.color, marginBottom: 6, letterSpacing: "0.05em" }}>{b.years}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: "#F1F5F9", marginBottom: 12 }}>{b.name}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ background: "rgba(16,185,129,0.06)", borderRadius: 6, padding: "8px" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#475569" }}>Peak</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#10B981", marginTop: 2 }}>{b.peak}</div>
                </div>
                <div style={{ background: "rgba(239,68,68,0.06)", borderRadius: 6, padding: "8px" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#475569" }}>Crash</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#EF4444", marginTop: 2 }}>{b.crash}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#94A3B8", lineHeight: 1.6, fontStyle: "italic" }}>"{b.lesson}"</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PAGE: PROFILE ────────────────────────────────────────────────────────────
function ProfilePage() {
  const { state } = useContext(GameContext);
  const badges = [
    { emoji: "🎯", name: "First Trade",      desc: "Executed first order" },
    { emoji: "📊", name: "Analyst",          desc: "Completed 2 science modules" },
    { emoji: "🧠", name: "Thinker",          desc: "Identified first bias" },
    { emoji: "🔒", name: "Locked",           desc: "???", locked: true },
    { emoji: "🔒", name: "Locked",           desc: "???", locked: true },
    { emoji: "🔒", name: "Locked",           desc: "???", locked: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Profile Card */}
      <Card style={{ background: "linear-gradient(135deg, #0F1F2E, #0F1623)" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{state.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: "#F1F5F9" }}>{state.traderName}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#94A3B8", marginBottom: 10 }}>Stock Market Explorer · {state.currentTrack === "both" ? "Data + Understanding" : state.currentTrack} Track</div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>LEVEL {state.level}</span>
              <span style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6", fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>{state.xp} XP TOTAL</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#475569", marginBottom: 4 }}>Level Progress</div>
            <div style={{ width: 160 }}>
              <XPBar xp={state.xp} max={state.xpToNextLevel} />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <StatCard label="Modules Done" value={state.completedModules.length} sub="Of 10 total" color="#10B981"/>
        <StatCard label="Quests Done" value={state.completedQuests.length} sub="Of 9 total" color="#F59E0B"/>
        <StatCard label="Badges" value={state.earnedBadges.length} sub="Achievements" color="#3B82F6"/>
        <StatCard label="Trades Made" value="7" sub="Simulated" color="#8B5CF6"/>
      </div>

      {/* Badges */}
      <Card>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", margin: "0 0 16px" }}>🏆 Badge Collection</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {badges.map((b, i) => (
            <div key={i} style={{ background: b.locked ? "rgba(71,85,105,0.1)" : "rgba(245,158,11,0.06)", border: `1px solid ${b.locked ? "#1E2D40" : "rgba(245,158,11,0.2)"}`, borderRadius: 10, padding: "16px 14px", textAlign: "center", opacity: b.locked ? 0.4 : 1 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{b.emoji}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 12, color: b.locked ? "#475569" : "#F1F5F9", marginBottom: 4 }}>{b.name}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#475569" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Settings */}
      <Card>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", margin: "0 0 16px" }}>⚙️ Settings</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { label: "Sound Effects", val: state.settings.soundOn ? "ON" : "OFF", color: state.settings.soundOn ? "#10B981" : "#475569" },
            { label: "Market Speed", val: state.settings.marketSpeed.toUpperCase(), color: "#3B82F6" },
            { label: "Learning Track", val: "BOTH", color: "#F59E0B" },
            { label: "Notifications", val: "ENABLED", color: "#10B981" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#162033", borderRadius: 8 }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#94A3B8" }}>{s.label}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: s.color }}>{s.val}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── PLACEHOLDER PAGES ────────────────────────────────────────────────────────
function PlaceholderPage({ id }) {
  const item = NAV_ITEMS.find(n => n.id === id);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>
          {{ home: "🏠", learn: "📚", trade: "📈", portfolio: "💼", quests: "🎯", psychology: "🧠", profile: "👤" }[id]}
        </div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 32, color: "#F1F5F9", margin: "0 0 8px" }}>{item?.label}</h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "#94A3B8" }}>{item?.desc}</p>
      </div>
    </div>
  );
}

// ─── PAGE: ASK ANYTHING ──────────────────────────────────────────────────────

const PREWRITTEN_QA = [
  {
    q: "Why did my stock go up after bad news?",
    tags: ["bad news", "stock up", "bad news good", "good news bad"],
    a: `This is one of the most confusing things about markets, and it trips up even experienced investors. The key insight is that stock prices don't react to reality — they react to the *difference* between reality and expectations.

If analysts expected a company to lose $500M and it only lost $200M, that's actually good news relative to expectations, even though losing $200M sounds terrible in isolation. The market had already "priced in" the worse outcome, so when reality came in better, investors bought.

Think of it this way: the stock market is a prediction machine running 24/7. By the time bad news is public, thousands of professional investors have already spent weeks modeling it, adjusting their positions, and pricing it in. The public announcement is often the *resolution* of uncertainty rather than the start of it. Uncertainty itself is often scarier than bad news that's finally confirmed.

📌 The phrase traders use is "buy the rumor, sell the news" — which works in reverse too: prices can fall on good news if the good news wasn't quite as good as hoped.

🤔 Follow-up to think about: If this is true, then what actually makes a stock price move? Is it the news itself, or is it always about expectations vs reality?`
  },
  {
    q: "What actually happens when I buy a share?",
    tags: ["buy a share", "what happens", "buy stock", "purchase share", "buying"],
    a: `When you click "buy," several things happen in milliseconds that most people never think about.

Your order goes to a stock exchange (NYSE or NASDAQ). There, a matching system finds another person or institution who wants to *sell* that exact stock. The price you pay is whatever the lowest available seller is asking — this is called the "ask price." Once matched, legal ownership of the share transfers to you, recorded in a digital ledger. The whole process takes under a second.

You're now a part-owner of that company. Not metaphorically — literally. If Apple has 15 billion shares outstanding and you own 10, you own 10/15,000,000,000th of Apple Inc., including a claim on its profits, assets, and a vote at shareholder meetings. It's a tiny fraction, but it's real ownership.

Your cash leaves your account and goes to the seller. You get the shares. The company itself receives no money from this transaction — they only got paid when they first issued the shares (in their IPO). Every trade after that is just existing shareholders trading among themselves.

📌 This is why stock price moves don't directly help or hurt the company day-to-day. Apple doesn't get richer when AAPL goes up $5. Its existing shareholders do.

🤔 Follow-up: If the company doesn't benefit from daily price moves, why do executives care so much about their stock price?`
  },
  {
    q: "Why do interest rates affect stock prices?",
    tags: ["interest rates", "fed", "rates", "federal reserve", "rate hike", "rate cut"],
    a: `Interest rates are probably the single most powerful force in financial markets, and the mechanism is actually elegant once you see it.

There are two main channels. First, the *discount rate* effect. The value of a stock is theoretically the sum of all future profits, discounted back to today's dollars. Higher interest rates mean you discount those future profits more heavily — so a company's future earnings are worth less in today's money. This mathematically reduces what investors are willing to pay for stocks right now, especially high-growth companies whose profits are far in the future.

Second, *competition from bonds*. When interest rates rise, government bonds (which are extremely safe) start offering better returns — maybe 5% risk-free. Suddenly stocks, which are risky, need to offer the promise of higher returns to compete for investors' money. The way stocks become more attractive is if their prices fall (making future gains relatively larger). So money flows from stocks into bonds, pushing stock prices down.

Third, *borrowing costs*. Companies borrow money to grow. Higher rates mean higher interest payments, squeezing profit margins. Consumers borrow less for cars, homes, and credit cards — slowing the economy that companies depend on.

📌 This is why markets watch every Fed meeting obsessively. A 0.25% rate change sounds tiny but ripples through every asset price on earth simultaneously.

🤔 Follow-up: If rate cuts are good for stocks, why don't governments just keep rates at zero forever?`
  },
  {
    q: "What's the difference between a loss and an unrealized loss?",
    tags: ["unrealized", "realized", "paper loss", "loss", "unrealized gain", "on paper"],
    a: `This distinction matters more than most beginners realize — both psychologically and practically.

An **unrealized loss** (also called a "paper loss") is when your stock has fallen below what you paid, but you still own it. You haven't actually lost anything yet in a concrete sense — if the price recovers, your loss disappears. The number exists only on paper, in your account balance.

A **realized loss** is when you actually sell. At that moment, the loss becomes permanent and real. The cash that comes back into your account is less than what you originally spent. There's no recovery from a realized loss — that money is gone.

Here's what makes this psychologically tricky: the *economic reality* is the same either way. If you bought at $100 and it's now $60, you are $40 worse off whether you sell or not — you could have had $100 but now have only $60 (as stock). Many investors refuse to sell and realize losses because it "makes it real," but that's loss aversion bias. The market doesn't care whether you've clicked sell. Your position is worth $60 regardless.

📌 There's one practical difference: realized losses can be used to offset capital gains for tax purposes (called "tax-loss harvesting"). Unrealized losses have no tax effect.

🤔 Follow-up: If unrealized and realized losses are economically the same, why do you think investors psychologically treat them so differently?`
  },
  {
    q: "Why do stocks crash even when the company is fine?",
    tags: ["crash", "company fine", "stock fell", "drop", "market crash", "good company bad stock"],
    a: `This is one of the clearest proofs that stock prices and business fundamentals are two different things — connected, but not the same.

Stocks crash for reasons that have nothing to do with any individual company. When the Federal Reserve raises interest rates aggressively, every stock falls because of the discount rate mechanism — not because companies got worse. During COVID in March 2020, airline stocks, restaurant stocks, *and* Netflix all crashed together. Netflix's business was actually booming. But panic selling doesn't discriminate.

Individual stocks also fall when the company is fine but the *sector* is out of favor. In 2022, profitable tech companies with real earnings fell 50-70% not because they stopped making money, but because investors rotated out of growth stocks as rates rose. The business was fine. The valuation investors were willing to assign it changed.

Then there's the emotional amplification effect. When markets fall, margin calls force leveraged investors to sell anything they can — including their good positions — to cover losses elsewhere. This mechanical selling has nothing to do with any company's fundamentals.

📌 This is actually the core argument for long-term investing: if the business is genuinely sound, price drops caused by external factors are temporary dislocations, not permanent destruction of value.

🤔 Follow-up: If a great company's stock falls 40% for macro reasons and nothing about the business changed, is that a catastrophe or an opportunity?`
  },
  {
    q: "What is a short seller and why do they exist?",
    tags: ["short", "short sell", "short selling", "shorting", "short seller"],
    a: `Short sellers are investors who profit when a stock falls — and they serve a genuinely important (if controversial) function in markets.

Here's the mechanics: a short seller *borrows* shares of a stock from someone who owns them (usually a broker), sells those shares immediately, then hopes the price falls. If it does, they buy the shares back at the lower price, return them to the lender, and pocket the difference. If they borrow and sell at $100, and buy back at $60, they made $40. If the stock rises to $140, they have to buy back at a $40 loss.

Short sellers are powerful because they're financially incentivized to find things that are *overvalued*. They do the uncomfortable work of questioning hype. Famous short sellers like Jim Chanos exposed Enron's accounting fraud years before it collapsed. Short sellers were the ones warning about subprime mortgage risk in 2006-2007. Without them, bubbles can inflate even further because no one is taking the other side.

They're controversial because in extreme cases, aggressive shorting can create self-fulfilling prophecies — if enough people bet a company will fail, fear spreads and it becomes harder for the company to raise capital, contributing to its decline.

📌 The GameStop squeeze in 2021 was essentially a war between Reddit retail investors and short sellers — retail buyers collectively squeezed the shorts by driving the price up, forcing short sellers to buy at huge losses to cover.

🤔 Follow-up: If short sellers help markets find truth, why do so many people (and company executives) hate them?`
  },
  {
    q: "How does inflation hurt stock prices?",
    tags: ["inflation", "CPI", "prices rising", "inflation stock", "inflation market"],
    a: `Inflation is complicated for markets because it hurts in multiple ways simultaneously, and some of those ways take time to show up.

The most direct channel is through interest rates. When inflation rises, central banks raise interest rates to cool the economy. Higher rates hurt stocks through the mechanisms we've discussed — higher discount rates, competition from bonds, squeezed corporate borrowing. So inflation itself doesn't hurt stocks directly; the *cure* for inflation (rate hikes) does.

The second channel is profit margins. When raw materials, wages, and energy cost more, companies' costs rise. If they can pass those costs to customers (through higher prices), margins survive. If they can't — because customers push back or competition is too fierce — profits get squeezed. This varies enormously by sector: commodity companies often benefit from inflation; retailers and manufacturers often suffer.

The third channel is consumer spending. High inflation erodes purchasing power — your $100 buys less each month. If consumers cut back on spending, companies serving consumers earn less. This hits discretionary sectors (restaurants, retail, travel) harder than essentials.

📌 Historically, moderate inflation (~2%) is actually fine for stocks. It's *unexpected* spikes in inflation that cause damage, because they force rapid rate hikes that markets haven't priced in.

🤔 Follow-up: Are there any investments that *benefit* from inflation? (Hint: think about what holds its value when paper currency loses purchasing power.)`
  },
  {
    q: "What does 'the market is forward-looking' mean?",
    tags: ["forward looking", "forward-looking", "priced in", "future", "market looks ahead"],
    a: `This phrase captures something fundamental about how markets work that most news coverage completely misses.

The stock market doesn't price what a company is worth *today* — it prices what investors collectively believe it will be worth in the future, discounted back to present value. Every stock price you see is essentially the aggregate prediction of thousands of analysts, funds, and individual investors about future earnings, growth rates, competitive position, and economic conditions.

This is why a company can report record profits and see its stock *fall* on the same day. If the market had already priced in those record profits (or expected them to be even higher), the actual announcement is disappointing relative to expectations. The "good news" was already baked into the price months ago.

It also means markets move *before* news, not after. A recession might not officially begin until months after the stock market has already fallen 30% pricing in the coming slowdown. Conversely, markets often bottom during recessions, well before the economy recovers, because investors are pricing in the recovery they see 12-18 months out.

📌 This is why trying to trade on news you read on your phone is almost always futile. By the time it's news to you, professional investors with faster systems and more information have already acted.

🤔 Follow-up: If markets are so efficient at pricing in future expectations, does that mean it's impossible to beat the market? What would you need to know that others don't?`
  },
  {
    q: "Why do I feel worse about losing $100 than I feel good about gaining $100?",
    tags: ["loss aversion", "losing hurts", "feel bad", "psychology", "losing money feels worse", "emotions investing"],
    a: `You're describing loss aversion, one of the most replicated findings in all of behavioral economics — and the fact that you've noticed it in yourself is genuinely valuable self-knowledge.

Psychologists Daniel Kahneman and Amos Tversky ran experiments in the 1970s and 1980s showing that losses feel roughly twice as painful as equivalent gains feel good. Losing $100 registers with about twice the emotional intensity of winning $100. This isn't just cultural or personal — it appears to be deeply wired, possibly because in evolutionary history, losing critical resources (food, shelter) was far more threatening than missing out on equivalent gains.

In investing, this bias manifests in very specific destructive patterns. People hold losing stocks far longer than they should, waiting to "get back to even" — because selling would make the loss psychologically real. They sell winning stocks too soon to "lock in gains" before they disappear. The net effect: they consistently cut winners and let losers run — exactly the opposite of the rational strategy.

The awareness doesn't automatically fix it. Even professional investors know about loss aversion and still feel it. The practical defense is rules made in advance: "I will sell any position that falls more than 15% from my buy price." When you make the rule cold-bloodedly before you have a loss, you remove the emotional decision from the moment of pain.

📌 This is why stop-losses exist as a tool — not because the computer doesn't feel emotions, but because *you* set the rule before you had skin in the game.

🤔 Follow-up: Can you think of a situation in your own life outside investing where loss aversion has affected your decisions?`
  },
  {
    q: "What is a bull market vs a bear market?",
    tags: ["bull market", "bear market", "bull", "bear", "market up", "market down"],
    a: `These terms get thrown around constantly in financial media, so it's worth knowing exactly what they mean — and what they don't.

A **bull market** is formally defined as a 20% or greater rise from a recent low, sustained over at least two months. The term comes from the way a bull attacks — horns thrusting *upward*. Bull markets are characterized by rising prices, investor optimism, strong economic growth, and increasing corporate earnings. The longest bull market in U.S. history ran from 2009 to 2020 — about 11 years.

A **bear market** is the opposite: a 20% or greater fall from a recent high. Bears swipe *downward* with their claws. Bear markets are characterized by falling prices, pessimism, rising unemployment, and economic contraction. They're psychologically brutal because the losses feel worse than the equivalent gains felt good (loss aversion) and because media coverage becomes increasingly dire.

What most people don't realize: bear markets are actually shorter on average than bull markets, and the recoveries are often sharp. The S&P 500 has experienced 26 bear markets since 1928 — and recovered from all 26 of them to reach new highs.

📌 "Correction" is a milder term — a 10% drop from a peak. Corrections are common and healthy; they happen roughly every year. Bear markets are rarer and more serious.

🤔 Follow-up: If bear markets always eventually recover, why do so many investors panic-sell during them instead of holding or buying more?`
  },
  {
    q: "Why do stocks fall when the Fed raises rates?",
    tags: ["fed raises rates", "rate hike", "federal reserve", "interest rate hike", "fed meeting"],
    a: `The Federal Reserve is the most powerful single actor in financial markets, and understanding why rate hikes hurt stocks is fundamental to making sense of market news.

When the Fed raises its benchmark rate (the "federal funds rate"), it makes borrowing more expensive across the entire economy. Banks charge more for loans. Mortgages become pricier. Corporate debt costs more to issue. This slows economic activity — which is exactly the point when inflation is high.

For stocks, this works through three channels simultaneously. First, the **valuation compression** channel: stock values are calculated by taking future earnings and discounting them back to present value. A higher discount rate (tied to interest rates) mechanically reduces what those future earnings are worth today, so the "fair value" of the stock falls even if nothing changed about the business.

Second, the **competition** channel: when risk-free government bonds yield 5%, investors demand higher potential returns from risky stocks to justify owning them. The way stocks become relatively more attractive is by falling in price, so their future upside looks larger.

Third, the **earnings** channel: higher rates squeeze corporate profits directly. Companies pay more interest on their debt. Consumer spending slows. Economic growth cools. If earnings are expected to be lower, stocks reflecting those earnings should be worth less.

📌 Growth stocks (high P/E, profits far in the future) get hit hardest because their value depends most on future earnings — which are discounted most heavily by higher rates.

🤔 Follow-up: If rate hikes hurt stocks, why does the Fed ever raise them? What would happen if interest rates stayed at zero forever?`
  },
  {
    q: "Why did NVDA rise so much in 2023?",
    tags: ["nvda", "nvidia", "nvidia 2023", "why nvda", "ai stocks", "ai chips"],
    a: `NVDA's rise in 2023 is one of the most dramatic single-year moves by a large company in stock market history — up over 230% — and it's a fascinating case study in how expectations can reprice a company almost overnight.

The catalyst was the explosion of generative AI, triggered by ChatGPT's launch in late 2022. Training large AI models requires massive parallel computation, and NVIDIA's GPUs turned out to be uniquely suited for this — not by accident, but because GPU architecture (thousands of simple cores running in parallel) maps perfectly onto the math of neural networks. NVIDIA had been building this ecosystem (called CUDA) for years, which created a massive competitive moat.

Suddenly, every major tech company — Google, Microsoft, Amazon, Meta — needed enormous quantities of NVIDIA's H100 chips. Demand exploded while supply was constrained. NVIDIA's quarterly earnings reports became extraordinary events: in May 2023, they guided for $11 billion in revenue for the following quarter when analysts expected $7 billion. That 57% beat in a single guidance update triggered an immediate 25% single-day surge.

The market was essentially repricing NVIDIA from "great gaming/data center chip company" to "the critical infrastructure provider for the AI revolution" — a fundamentally different and much larger addressable market.

📌 The risk: at a peak P/E of 60-70x, the stock prices in many years of perfect execution. Any stumble in AI adoption, competition from AMD, Google's own chips, or a slowdown in AI spending could hit NVDA hard.

🤔 Follow-up: NVDA's rise was real and fundamental, but was it a bubble? How would you distinguish between a genuine valuation re-rating and irrational hype?`
  },
];

const SUGGESTED_QUESTIONS = PREWRITTEN_QA.map(qa => qa.q);

function findPrewrittenAnswer(question) {
  const q = question.toLowerCase();
  // Direct match first
  for (const qa of PREWRITTEN_QA) {
    if (qa.q.toLowerCase() === q) return qa;
  }
  // Tag match
  for (const qa of PREWRITTEN_QA) {
    if (qa.tags.some(tag => q.includes(tag))) return qa;
  }
  // Keyword overlap score
  const words = q.split(/\s+/).filter(w => w.length > 3);
  let best = null, bestScore = 0;
  for (const qa of PREWRITTEN_QA) {
    const haystack = (qa.q + " " + qa.tags.join(" ")).toLowerCase();
    const score = words.filter(w => haystack.includes(w)).length;
    if (score > bestScore) { bestScore = score; best = qa; }
  }
  return bestScore >= 2 ? best : null;
}

function AskPage({ initialQuestion = "" }) {
  const { state } = useContext(GameContext);
  const [input, setInput]       = useState(initialQuestion);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  useEffect(() => {
    if (initialQuestion) sendQuestion(initialQuestion);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendQuestion = async (q) => {
    const question = (q || input).trim();
    if (!question || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: question }]);

    // Check pre-written library first
    const prewritten = findPrewrittenAnswer(question);
    if (prewritten) {
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: prewritten.a, prewritten: true }]);
        setLoading(false);
      }, 680);
      return;
    }

    // Fall back to live API
    setLoading(true);
    const holds = state.portfolio.length > 0
      ? state.portfolio.map(h => h.shares + " shares of " + h.ticker + " (avg $" + h.avgCost + ", now $" + h.current + ")").join(", ")
      : "none";
    const trades = state.transactions && state.transactions.length > 0
      ? state.transactions.slice(-3).map(t => (t.type === "buy" ? "Bought " : "Sold ") + t.shares + " " + t.ticker + " at $" + (t.price ? t.price.toFixed(2) : "?")).join("; ")
      : "No recent trades";
    const systemPrompt = [
      "You are MarketMind, an expert financial educator inside a stock market learning simulator for high school and college students. Explain investing and market concepts in clear, plain English.",
      "",
      "STUDENT CONTEXT:",
      "- Name: " + state.traderName + ", Level " + state.level + " trader",
      "- Cash: $" + (state.virtualCash ? state.virtualCash.toFixed(2) : "0"),
      "- Holdings: " + holds,
      "- Recent trades: " + trades,
      "- Modules completed: " + (state.completedModules ? state.completedModules.length : 0),
      "",
      "RULES:",
      "- Explain WHY, not just what. Get to the mechanism.",
      "- Use real-world analogies. Make abstract things tangible.",
      "- Connect to the student's portfolio when relevant.",
      "- 3-5 short paragraphs max.",
      "- End with one follow-up question to deepen understanding.",
      "- Never condescending. Assume intelligent but new to finance.",
    ].join("\n");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: messages.map(m => ({ role: m.role, content: m.content })).concat([{ role: "user", content: question }]),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const answer = data.content ? data.content.map(b => b.text || "").join("") : "No response.";
      setMessages(prev => [...prev, { role: "assistant", content: answer, prewritten: false }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Live AI is not available right now (API key needed). Try the suggested questions above — those work instantly with pre-written answers!",
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendQuestion(); }
  };

  const isEmpty = messages.length === 0;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)" }}>

      {/* Header */}
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:4 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>💬</div>
          <div>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:22, color:"#F1F5F9", margin:0 }}>Ask Anything</h2>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#475569", margin:0 }}>Ask why anything happened in markets — or what any concept means</p>
          </div>
          <span style={{ marginLeft:"auto", background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:20, padding:"3px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, color:"#10B981", fontWeight:700, whiteSpace:"nowrap" }}>
            12 instant answers · Live AI on Vercel
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", paddingBottom:8 }}>
        {isEmpty && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:16 }}>
            <div style={{ fontSize:44, marginBottom:14 }}>🤔</div>
            <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:"#F1F5F9", marginBottom:6 }}>What do you want to understand?</h3>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#475569", marginBottom:6, textAlign:"center", maxWidth:480, lineHeight:1.6 }}>
              Click any question below for an instant answer. Or type your own — if it matches a known topic, you'll get an instant response. Anything else goes to live AI.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:22 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#10B981", display:"inline-block" }}/>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#10B981" }}>INSTANT</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#475569", marginLeft:8 }}>= works everywhere, no API needed</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", maxWidth:680 }}>
              {SUGGESTED_QUESTIONS.map(q => (
                <button key={q} onClick={()=>sendQuestion(q)} style={{
                  background:"#0F1623", border:"1px solid #1E2D40", borderRadius:10,
                  padding:"11px 14px 11px 12px", color:"#94A3B8",
                  fontFamily:"'Outfit',sans-serif", fontSize:12, cursor:"pointer",
                  textAlign:"left", lineHeight:1.4, transition:"all 0.15s",
                  display:"flex", alignItems:"flex-start", gap:8
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(16,185,129,0.3)"; e.currentTarget.style.color="#F1F5F9"; e.currentTarget.style.background="#162033"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="#1E2D40"; e.currentTarget.style.color="#94A3B8"; e.currentTarget.style.background="#0F1623"; }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", flexShrink:0, marginTop:5 }}/>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display:"flex", flexDirection:msg.role==="user"?"row-reverse":"row", gap:12, marginBottom:18, alignItems:"flex-start" }}>
            {/* Avatar */}
            <div style={{ width:34, height:34, borderRadius:8, flexShrink:0,
              background:msg.role==="user"?"rgba(16,185,129,0.12)":"rgba(59,130,246,0.12)",
              border:`1px solid ${msg.role==="user"?"rgba(16,185,129,0.25)":"rgba(59,130,246,0.25)"}`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
              {msg.role==="user" ? (state.avatar||"🧑‍💻") : "🤖"}
            </div>

            {/* Bubble */}
            <div style={{ maxWidth:"74%", display:"flex", flexDirection:"column", gap:6, alignItems:msg.role==="user"?"flex-end":"flex-start" }}>
              {/* Source badge for assistant messages */}
              {msg.role==="assistant" && !msg.isError && (
                <span style={{
                  background: msg.prewritten?"rgba(16,185,129,0.08)":"rgba(59,130,246,0.08)",
                  border:`1px solid ${msg.prewritten?"rgba(16,185,129,0.2)":"rgba(59,130,246,0.2)"}`,
                  color: msg.prewritten?"#10B981":"#3B82F6",
                  fontFamily:"'DM Mono',monospace", fontSize:9, fontWeight:700,
                  padding:"2px 8px", borderRadius:20, display:"inline-block"
                }}>
                  {msg.prewritten ? "⚡ INSTANT ANSWER" : "🤖 LIVE AI"}
                </span>
              )}
              <div style={{
                background:msg.role==="user"?"rgba(16,185,129,0.07)":"#0F1623",
                border:`1px solid ${msg.role==="user"?"rgba(16,185,129,0.18)":"#1E2D40"}`,
                borderRadius:msg.role==="user"?"12px 2px 12px 12px":"2px 12px 12px 12px",
                padding:"14px 18px"
              }}>
                {msg.content.split("\n\n").map((para,j)=>(
                  <p key={j} style={{ fontFamily:"'Outfit',sans-serif", fontSize:14,
                    color:msg.isError?"#F97316":msg.role==="user"?"#D1FAE5":"#D1D5DB",
                    lineHeight:1.8, margin:j>0?"12px 0 0":0 }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:"flex", gap:12, marginBottom:18, alignItems:"flex-start" }}>
            <div style={{ width:34, height:34, borderRadius:8, background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🤖</div>
            <div style={{ background:"#0F1623", border:"1px solid #1E2D40", borderRadius:"2px 12px 12px 12px", padding:"16px 20px", display:"flex", alignItems:"center", gap:8 }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:"#3B82F6", animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`, opacity:0.7 }}/>
              ))}
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#475569", marginLeft:4 }}>MarketMind is thinking...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* Input bar */}
      <div style={{ borderTop:"1px solid #1E2D40", paddingTop:14, background:"#080C14" }}>
        {!isEmpty && (
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
            {["Can you give an example?","Why does this matter?","How does this affect my portfolio?","What should I watch out for?"].map(q=>(
              <button key={q} onClick={()=>sendQuestion(q)} style={{ background:"#0F1623", border:"1px solid #1E2D40", borderRadius:20, padding:"4px 12px", color:"#475569", fontFamily:"'Outfit',sans-serif", fontSize:11, cursor:"pointer" }}>{q}</button>
            ))}
          </div>
        )}
        <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={handleKey} rows={2}
            placeholder="Ask anything — try the suggested questions for instant answers, or type your own..."
            style={{ flex:1, background:"#0F1623", border:"1px solid #1E2D40", borderRadius:12,
              padding:"12px 16px", color:"#F1F5F9", fontFamily:"'Outfit',sans-serif",
              fontSize:14, lineHeight:1.5, resize:"none", outline:"none", boxSizing:"border-box" }}
            onFocus={e=>e.target.style.borderColor="rgba(59,130,246,0.4)"}
            onBlur={e=>e.target.style.borderColor="#1E2D40"}
          />
          <button onClick={()=>sendQuestion()} disabled={!input.trim()||loading} style={{
            padding:"12px 20px", borderRadius:10, border:"none", flexShrink:0,
            background:input.trim()&&!loading?"linear-gradient(135deg,#3B82F6,#2563EB)":"#1E2D40",
            color:input.trim()&&!loading?"#fff":"#475569",
            fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14,
            cursor:input.trim()&&!loading?"pointer":"not-allowed",
            boxShadow:input.trim()&&!loading?"0 0 16px rgba(59,130,246,0.3)":"none", transition:"all 0.2s"
          }}>Send →</button>
        </div>
        <div style={{ marginTop:6, fontFamily:"'Outfit',sans-serif", fontSize:11, color:"#1E2D4080" }}>Enter to send · Shift+Enter for new line · Suggested questions = instant, no API needed</div>
      </div>
    </div>
  );
}


// ─── PAGE ROUTER ─────────────────────────────────────────────────────────────
function PageContent({ page, onAsk, askQuestion }) {
  switch (page) {
    case "home":       return <HomePage />;
    case "learn":      return <LearnPage />;
    case "trade":      return <TradePage onAsk={onAsk} />;
    case "portfolio":  return <PortfolioPage />;
    case "quests":     return <QuestsPage />;
    case "psychology": return <PsychologyPage />;
    case "ask":        return <AskPage initialQuestion={askQuestion} />;
    case "profile":    return <ProfilePage />;
    default:           return <PlaceholderPage id={page} />;
  }
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

// Animated number ticker for the cash display
function OnboardingDots({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 8,
          height: 8,
          borderRadius: 99,
          background: i === current ? "#10B981" : "#1E2D40",
          transition: "all 0.3s ease",
          boxShadow: i === current ? "0 0 8px rgba(16,185,129,0.5)" : "none",
        }} />
      ))}
    </div>
  );
}

function OnboardingShell({ children, step, totalSteps, onBack, canGoBack }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "#080C14",
      backgroundImage: "radial-gradient(circle, rgba(241,245,249,0.04) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px 20px",
      overflowY: "auto",
    }}>
      {/* Top bar */}
      <div style={{ position: "absolute", top: 24, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: "#F1F5F9" }}>Market<span style={{ color: "#10B981" }}>Quest</span></span>
        </div>
        {canGoBack && (
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1E2D40", borderRadius: 8, padding: "6px 14px", color: "#94A3B8", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ width: "100%", maxWidth: 640, animation: "fadeSlideUp 0.4s ease forwards" }}>
        {children}
      </div>

      {/* Dots */}
      <OnboardingDots total={totalSteps} current={step} />
    </div>
  );
}

// ── Screen 1: Welcome Splash ──────────────────────────────────────────────────
function OnboardScreen1({ onNext }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Enter") onNext(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext]);

  return (
    <OnboardingShell step={0} totalSteps={5} canGoBack={false}>
      <div style={{ textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(24px)", transition: "all 0.6s cubic-bezier(.34,1.56,.64,1)" }}>
        {/* Logo big */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(16,185,129,0.12)" }}>
            <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
              <path d="M6 18 L10 12 L14 15 L18 8 L22 11" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="19" cy="10" r="3" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="1.5"/>
              <path d="M12 20 Q14 16 16 20" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <circle cx="9" cy="20" r="1.5" fill="#F59E0B"/>
              <circle cx="19" cy="20" r="1.5" fill="#F59E0B"/>
            </svg>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 38, color: "#F1F5F9", lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.5px" }}>
          Welcome to<br /><span style={{ color: "#10B981" }}>MarketQuest</span>
        </h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "#94A3B8", lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          The only place where learning about stocks means understanding both <strong style={{ color: "#F1F5F9" }}>data</strong> AND <strong style={{ color: "#F1F5F9" }}>human nature</strong>.
        </p>

        {/* Two pills */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 50, padding: "12px 22px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🔬</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#10B981", fontWeight: 600 }}>Data: Charts · Statistics · Prediction Models</span>
          </div>
          <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 50, padding: "12px 22px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🧠</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#3B82F6", fontWeight: 600 }}>Understanding: Psychology · Bubbles · Behavioral Bias</span>
          </div>
        </div>

        {/* CTA */}
        <button onClick={onNext} style={{
          background: "linear-gradient(135deg, #10B981, #059669)",
          border: "none", borderRadius: 14, padding: "16px 40px",
          color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18,
          cursor: "pointer", boxShadow: "0 0 30px rgba(16,185,129,0.35)",
          transition: "all 0.2s", letterSpacing: "-0.2px",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Start Your Journey →
        </button>
        <div style={{ marginTop: 14, fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#475569" }}>
          You start with $10,000 virtual cash. Zero real money. Zero risk.
        </div>
      </div>
    </OnboardingShell>
  );
}

// ── Screen 2: Personality Quiz ────────────────────────────────────────────────
const QUIZ = [
  {
    q: "When you hear 'the stock market', you think…",
    answers: [
      { emoji: "📊", text: "Numbers, charts, patterns", type: "science" },
      { emoji: "🐑", text: "People panicking and making bad decisions", type: "reasoning" },
      { emoji: "🌍", text: "Both — it's complicated", type: "both" },
    ],
  },
  {
    q: "Your friend says Bitcoin is going to 10x. You…",
    answers: [
      { emoji: "🔢", text: "Ask for the data and analysis", type: "science" },
      { emoji: "🤔", text: "Wonder why they believe that so strongly", type: "reasoning" },
      { emoji: "😅", text: "Probably feel a bit of FOMO", type: "both" },
    ],
  },
  {
    q: "What do you most want to understand?",
    answers: [
      { emoji: "📈", text: "How to read stock charts and predict price moves", type: "science" },
      { emoji: "🧠", text: "Why markets crash and why humans are irrational", type: "reasoning" },
      { emoji: "💡", text: "Everything — I want the full picture", type: "both" },
    ],
  },
];

const RESULT_MAP = {
  science:    { emoji: "🔬", title: "The Data Analyst", desc: "You think in patterns. We'll feed that curiosity." },
  humanities: { emoji: "🧠", title: "The Pattern Reader", desc: "You understand people. Markets are made of people." },
  both:       { emoji: "⚖️", title: "The Market Philosopher", desc: "You see the whole system. That's rare." },
};

function OnboardScreen2({ onNext, onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [scores, setScores] = useState({ science: 0, humanities: 0, both: 0 });
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [animIn, setAnimIn] = useState(true);

  const pick = (type) => {
    if (selected !== null) return;
    setSelected(type);
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    setTimeout(() => {
      setAnimIn(false);
      setTimeout(() => {
        if (qIdx < QUIZ.length - 1) {
          setQIdx(qIdx + 1);
          setSelected(null);
          setAnimIn(true);
        } else {
          setShowResult(true);
          // auto-advance after 2s
          const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
          setTimeout(() => onNext(winner), 2200);
        }
      }, 280);
    }, 600);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "1") pick(QUIZ[qIdx]?.answers[0]?.type);
      if (e.key === "2") pick(QUIZ[qIdx]?.answers[1]?.type);
      if (e.key === "3") pick(QUIZ[qIdx]?.answers[2]?.type);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [qIdx, selected]);

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const result = RESULT_MAP[winner];

  return (
    <OnboardingShell step={1} totalSteps={5} onBack={onBack} canGoBack>
      {showResult ? (
        <div style={{ textAlign: "center", animation: "fadeSlideUp 0.4s ease forwards" }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>{result.emoji}</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 30, color: "#F1F5F9", marginBottom: 10 }}>{result.title}</h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "#94A3B8" }}>{result.desc}</p>
          <div style={{ marginTop: 24, height: 3, background: "#1E2D40", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#10B981", borderRadius: 99, animation: "progressFill 2s linear forwards" }} />
          </div>
        </div>
      ) : (
        <div style={{ opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(-16px)", transition: "all 0.28s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#10B981", letterSpacing: "0.1em", marginBottom: 10 }}>
              QUESTION {qIdx + 1} OF {QUIZ.length}
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 24, color: "#F1F5F9", lineHeight: 1.3 }}>
              What kind of thinker are you?
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#475569", marginTop: 6 }}>No wrong answers.</p>
          </div>

          <div style={{ background: "#0F1623", border: "1px solid #1E2D40", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 18, color: "#F1F5F9", textAlign: "center", marginBottom: 24 }}>
              {QUIZ[qIdx].q}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUIZ[qIdx].answers.map((a, i) => (
                <button key={i} onClick={() => pick(a.type)} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 18px", borderRadius: 10,
                  border: `1.5px solid ${selected === a.type ? "#10B981" : selected !== null && selected !== a.type ? "#1E2D40" : "#1E2D40"}`,
                  background: selected === a.type ? "rgba(16,185,129,0.12)" : "transparent",
                  color: selected !== null && selected !== a.type ? "#475569" : "#F1F5F9",
                  cursor: selected !== null ? "default" : "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                  opacity: selected !== null && selected !== a.type ? 0.45 : 1,
                }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = "#10B98155"; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = "#1E2D40"; }}
                >
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{a.emoji}</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: selected === a.type ? 600 : 400 }}>{a.text}</span>
                  {selected === a.type && <span style={{ marginLeft: "auto", color: "#10B981", fontSize: 18 }}>✓</span>}
                  {!selected && <span style={{ marginLeft: "auto", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569" }}>{i + 1}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: "#1E2D40", borderRadius: 99 }}>
            <div style={{ height: "100%", width: `${((qIdx) / QUIZ.length) * 100}%`, background: "#10B981", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
        </div>
      )}
    </OnboardingShell>
  );
}

// ── Screen 3: Identity ────────────────────────────────────────────────────────
const AVATARS = ["🧑‍💻", "🧑‍🎓", "👩‍💼", "🦁", "🐂", "🦅", "🎯", "💡"];

function OnboardScreen3({ onNext, onBack }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const canContinue = name.trim().length > 0 && avatar !== null;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Enter" && canContinue) onNext(name.trim(), avatar); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [name, avatar, canContinue, onNext]);

  return (
    <OnboardingShell step={2} totalSteps={5} onBack={onBack} canGoBack>
      <div style={{ textAlign: "center", animation: "fadeSlideUp 0.4s ease forwards" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#10B981", letterSpacing: "0.1em", marginBottom: 12 }}>STEP 3 OF 5</div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 30, color: "#F1F5F9", marginBottom: 8 }}>Choose your identity</h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#94A3B8", marginBottom: 32 }}>This is how you'll appear on the leaderboard.</p>

        {/* Name input */}
        <div style={{ background: "#0F1623", border: "1px solid #1E2D40", borderRadius: 12, padding: "6px 18px", display: "flex", alignItems: "center", gap: 10, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
          <span style={{ fontSize: 18 }}>{avatar || "👤"}</span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your trader name"
            maxLength={20}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "#F1F5F9",
              padding: "12px 0",
            }}
          />
          {name.length > 0 && <span style={{ color: "#475569", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{name.length}/20</span>}
        </div>

        {/* Avatar grid */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#475569", marginBottom: 14 }}>Pick your avatar</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {AVATARS.map((a, i) => (
              <button key={i} onClick={() => setAvatar(a)} style={{
                width: 64, height: 64, borderRadius: "50%", fontSize: 30,
                background: avatar === a ? "rgba(16,185,129,0.12)" : "#0F1623",
                border: `2px solid ${avatar === a ? "#10B981" : "#1E2D40"}`,
                cursor: "pointer",
                transform: avatar === a ? "scale(1.12)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
                boxShadow: avatar === a ? "0 0 16px rgba(16,185,129,0.3)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => canContinue && onNext(name.trim(), avatar)}
          style={{
            padding: "14px 36px", borderRadius: 12, border: "none",
            background: canContinue ? "linear-gradient(135deg,#10B981,#059669)" : "#1E2D40",
            color: canContinue ? "#fff" : "#475569",
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16,
            cursor: canContinue ? "pointer" : "not-allowed",
            transition: "all 0.25s",
            boxShadow: canContinue ? "0 0 24px rgba(16,185,129,0.25)" : "none",
          }}
        >
          Continue →
        </button>
        {!canContinue && (
          <div style={{ marginTop: 10, fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#475569" }}>
            {!name.trim() ? "Enter a trader name" : "Pick an avatar"}
          </div>
        )}
      </div>
    </OnboardingShell>
  );
}

// ── Screen 4: How It Works ────────────────────────────────────────────────────
const EXPLAINER_CARDS = [
  { emoji: "💰", title: "You start with $10,000 virtual cash", body: "Buy and sell real company stocks. Prices simulate real market movement. No real money involved." },
  { emoji: "📚", title: "Learn before you trade", body: "The Learn section has 12 theory modules covering everything from 'what is a stock' to 'what causes market crashes'. Each module takes 3–5 minutes." },
  { emoji: "🎯", title: "Complete quests to earn XP", body: "Quests give you specific trading challenges that teach real investing concepts. Complete them to level up." },
  { emoji: "🧠", title: "Your biases will be revealed", body: "The Psychology Lab tracks YOUR trading behavior and shows you which cognitive biases affect your decisions. Everyone has them." },
  { emoji: "🏆", title: "There's no losing — only learning", body: "Every trade, good or bad, teaches something. The reflection journal after each trade is where the real learning happens." },
];

function OnboardScreen4({ onNext, onBack }) {
  const [card, setCard] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [anim, setAnim] = useState(true);

  const go = (delta) => {
    const next = card + delta;
    if (next < 0 || next >= EXPLAINER_CARDS.length) return;
    setDir(delta);
    setAnim(false);
    setTimeout(() => { setCard(next); setAnim(true); }, 220);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        if (card < EXPLAINER_CARDS.length - 1) go(1);
        else onNext();
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Backspace") onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [card, onNext, onBack]);

  const c = EXPLAINER_CARDS[card];

  return (
    <OnboardingShell step={3} totalSteps={5} onBack={onBack} canGoBack>
      <div style={{ textAlign: "center", animation: "fadeSlideUp 0.4s ease forwards" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#10B981", letterSpacing: "0.1em", marginBottom: 12 }}>HOW IT WORKS</div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: "#F1F5F9", marginBottom: 32 }}>Your quick guide to MarketQuest</h2>

        {/* Card */}
        <div style={{
          background: "#0F1623", border: "1px solid #1E2D40", borderRadius: 20,
          padding: "48px 40px", marginBottom: 32,
          minHeight: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: anim ? 1 : 0,
          transform: anim ? "translateX(0)" : `translateX(${dir > 0 ? "30px" : "-30px"})`,
          transition: "all 0.22s ease",
          position: "relative",
        }}>
          {/* Card number */}
          <div style={{ position: "absolute", top: 16, right: 18, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569" }}>{card + 1} / {EXPLAINER_CARDS.length}</div>
          <div style={{ fontSize: 64, marginBottom: 20 }}>{c.emoji}</div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: "#F1F5F9", marginBottom: 14, lineHeight: 1.3 }}>{c.title}</h3>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#94A3B8", lineHeight: 1.7, maxWidth: 400 }}>{c.body}</p>
        </div>

        {/* Progress dots (mini) */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 28 }}>
          {EXPLAINER_CARDS.map((_, i) => (
            <div key={i} onClick={() => { setDir(i > card ? 1 : -1); setAnim(false); setTimeout(() => { setCard(i); setAnim(true); }, 220); }} style={{ width: i === card ? 20 : 6, height: 6, borderRadius: 99, background: i === card ? "#10B981" : "#1E2D40", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>

        {/* Nav buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => go(-1)} disabled={card === 0} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #1E2D40", background: "transparent", color: card === 0 ? "#1E2D40" : "#94A3B8", cursor: card === 0 ? "default" : "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
            ← Prev
          </button>
          {card < EXPLAINER_CARDS.length - 1 ? (
            <button onClick={() => go(1)} style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: "#162033", color: "#F1F5F9", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600 }}>
              Next →
            </button>
          ) : (
            <button onClick={onNext} style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#10B981,#059669)", color: "#fff", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, boxShadow: "0 0 20px rgba(16,185,129,0.25)" }}>
              I'm Ready →
            </button>
          )}
        </div>
      </div>
    </OnboardingShell>
  );
}

// ── Screen 5: Ready ───────────────────────────────────────────────────────────
function OnboardScreen5({ traderName, avatar, learnerType, onFinish }) {
  const result = RESULT_MAP[learnerType] || RESULT_MAP["both"];
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Enter") onFinish(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFinish]);

  return (
    <OnboardingShell step={4} totalSteps={5} canGoBack={false}>
      <div style={{ textAlign: "center", animation: "fadeSlideUp 0.45s ease forwards" }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 34, color: "#F1F5F9", marginBottom: 8, letterSpacing: "-0.4px" }}>
          You're ready, <span style={{ color: "#10B981" }}>{traderName}</span>! 🚀
        </h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#94A3B8", marginBottom: 32 }}>Here's your trader profile. Time to make some (virtual) money.</p>

        {/* Summary card */}
        <div style={{ background: "#0F1623", border: "1px solid #1E2D40", borderRadius: 18, padding: "28px 32px", marginBottom: 32, textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 20, borderBottom: "1px solid #1E2D40", marginBottom: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>{avatar}</div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: "#F1F5F9" }}>{traderName}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#10B981", marginTop: 3 }}>Level 1 · Newcomer</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Learner Type", val: result.title, sub: result.emoji, color: "#F59E0B" },
              { label: "Starting Cash", val: "$10,000.00", sub: "💵", color: "#10B981" },
              { label: "Quests Available", val: "9 Quests", sub: "🎯", color: "#3B82F6" },
              { label: "Modules to Learn", val: "10 Modules", sub: "📚", color: "#8B5CF6" },
            ].map(item => (
              <div key={item.label} style={{ background: "#162033", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#475569", marginBottom: 4 }}>{item.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16 }}>{item.sub}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: item.color }}>{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enter button */}
        <button
          onClick={onFinish}
          style={{
            padding: "16px 48px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg,#10B981,#059669)",
            color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18,
            cursor: "pointer", letterSpacing: "-0.2px",
            boxShadow: pulse ? "0 0 40px rgba(16,185,129,0.45), 0 0 80px rgba(16,185,129,0.15)" : "0 0 20px rgba(16,185,129,0.2)",
            transition: "box-shadow 0.8s ease, transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Enter the Market →
        </button>
        <div style={{ marginTop: 12, fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#475569" }}>Press Enter to begin</div>
      </div>
    </OnboardingShell>
  );
}

// ── Onboarding Orchestrator ───────────────────────────────────────────────────
function OnboardingFlow() {
  const { updateState } = useContext(GameContext);
  const [screen, setScreen] = useState(0);
  const [learnerType, setLearnerType] = useState("both");
  const [traderName, setTraderName] = useState("");
  const [avatar, setAvatar] = useState("🧑‍💻");

  const goTo = (n) => setScreen(n);

  const finishOnboarding = () => {
    updateState({
      traderName,
      avatar,
      learnerType,
      onboardingComplete: true,
      currentTrack: learnerType === "both" ? "both" : learnerType === "science" ? "science" : "reasoning",
    });
  };

  return (
    <>
      {screen === 0 && <OnboardScreen1 onNext={() => goTo(1)} />}
      {screen === 1 && (
        <OnboardScreen2
          onNext={(type) => { setLearnerType(type); goTo(2); }}
          onBack={() => goTo(0)}
        />
      )}
      {screen === 2 && (
        <OnboardScreen3
          onNext={(name, av) => { setTraderName(name); setAvatar(av); goTo(3); }}
          onBack={() => goTo(1)}
        />
      )}
      {screen === 3 && (
        <OnboardScreen4
          onNext={() => goTo(4)}
          onBack={() => goTo(2)}
        />
      )}
      {screen === 4 && (
        <OnboardScreen5
          traderName={traderName}
          avatar={avatar}
          learnerType={learnerType}
          onFinish={finishOnboarding}
        />
      )}
    </>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 64 : 220;

  return (
    <GameProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; background: #080C14; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0A0F1A; }
        ::-webkit-scrollbar-thumb { background: #1E2D40; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #2D4460; }
        input::placeholder { color: #475569; }
        input { caret-color: #10B981; }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #10B981; }
          50% { opacity: 0.6; box-shadow: 0 0 12px #10B981; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
      <AppInner activePage={activePage} setActivePage={setActivePage} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} sidebarWidth={sidebarWidth} />
    </GameProvider>
  );
}

function AppInner({ activePage, setActivePage, sidebarCollapsed, setSidebarCollapsed, sidebarWidth }) {
  const { state } = useContext(GameContext);
  const [askQuestion, setAskQuestion] = useState("");

  const handleAsk = (q) => {
    setAskQuestion(q);
    setActivePage("ask");
  };

  if (!state.onboardingComplete) {
    return (
      <div style={{ background: "#080C14", minHeight: "100vh", backgroundImage: "radial-gradient(circle, rgba(241,245,249,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
        <OnboardingFlow />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080C14",
      backgroundImage: "radial-gradient(circle, rgba(241,245,249,0.03) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      display: "flex",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <Sidebar active={activePage} onNav={setActivePage} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <div style={{ marginLeft: sidebarWidth, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", transition: "margin-left 0.25s cubic-bezier(.4,0,.2,1)" }}>
        <Header page={activePage} />
        <main style={{ flex: 1, padding: "28px 28px", overflowY: "auto" }}>
          <PageContent page={activePage} onAsk={handleAsk} askQuestion={askQuestion} />
        </main>
      </div>
    </div>
  );
}
