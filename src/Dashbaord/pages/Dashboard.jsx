import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ─── Google Fonts ──────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { margin: 0; padding: 0; }
    .font-bn  { font-family: 'Hind Siliguri', sans-serif !important; }
    .font-dis { font-family: 'Tiro Bangla', serif !important; }
    ::-webkit-scrollbar       { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #f0fdf4; }
    ::-webkit-scrollbar-thumb { background: #86efac; border-radius: 4px; }
    @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes countUp  { from{opacity:0;transform:scale(.75)}        to{opacity:1;transform:scale(1)}     }
    @keyframes barSlide { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes dotPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    .anim-fadeup  { animation: fadeUp  .55s cubic-bezier(.22,.68,0,1.1) both; }
    .anim-countup { animation: countUp .6s  cubic-bezier(.22,.68,0,1.2) both; }
    .anim-barslide{ animation: barSlide .9s  cubic-bezier(.22,.68,0,1.1) both; transform-origin: left; }
    .notif-dot::after {
      content:''; position:absolute; top:3px; right:3px;
      width:8px; height:8px; background:#ef4444; border-radius:50%;
      border:2px solid white; animation: dotPulse 1.8s ease infinite;
    }
    .shimmer-text {
      background: linear-gradient(90deg,#bbf7d0 0%,#fff 40%,#4ade80 60%,#bbf7d0 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; animation: shimmer 4s linear infinite;
    }
    .activity-line::before {
      content:''; position:absolute; left:15px; top:32px; bottom:-6px;
      width:2px; background: linear-gradient(to bottom,#86efac,transparent);
    }
  `}</style>
);

/* ─── Mock Data ─────────────────────────────────────────────────────────── */
const monthlyData = [
  { month: "জুলাই",  amount: 185000, donors: 142 },
  { month: "আগস্ট",  amount: 220000, donors: 178 },
  { month: "সেপ্টে", amount: 195000, donors: 155 },
  { month: "অক্টো",  amount: 310000, donors: 241 },
  { month: "নভে",    amount: 275000, donors: 213 },
  { month: "ডিসে",   amount: 390000, donors: 298 },
  { month: "জানু",   amount: 345000, donors: 267 },
  { month: "ফেব্রু", amount: 428000, donors: 320 },
];

const pieData = [
  { name: "শিক্ষা",    value: 32, color: "#16a34a" },
  { name: "স্বাস্থ্য", value: 24, color: "#22c55e" },
  { name: "নারী",      value: 18, color: "#4ade80"  },
  { name: "শিশু",      value: 14, color: "#86efac"  },
  { name: "অন্যান্য",  value: 12, color: "#bbf7d0"  },
];

const barData = [
  { q: "Q1", শিক্ষা: 420, স্বাস্থ্য: 310, নারী: 250 },
  { q: "Q2", শিক্ষা: 560, স্বাস্থ্য: 390, নারী: 320 },
  { q: "Q3", শিক্ষা: 490, স্বাস্থ্য: 445, নারী: 380 },
  { q: "Q4", শিক্ষা: 680, স্বাস্থ্য: 510, নারী: 440 },
];

const donors = [
  { name: "রহিম উদ্দিন",  area: "রংপুর সদর", amount: 5000,  type: "মাসিক",   time: "২ ঘণ্টা আগে", av: "👨" },
  { name: "সুমাইয়া খানম", area: "গাইবান্ধা",  amount: 2500,  type: "এককালীন", time: "৪ ঘণ্টা আগে", av: "👩" },
  { name: "করিম হোসেন",   area: "কুড়িগ্রাম",  amount: 10000, type: "মাসিক",   time: "গতকাল",       av: "👨" },
  { name: "নাজমা বেগম",   area: "দিনাজপুর",   amount: 1000,  type: "এককালীন", time: "গতকাল",       av: "👩" },
  { name: "তারিক হাসান",  area: "নীলফামারী",  amount: 7500,  type: "মাসিক",   time: "২ দিন আগে",   av: "👦" },
];

const projects = [
  { name: "শিশু পুষ্টি প্রকল্প",     pct: 75, status: "চলমান",        budget: "৮ লক্ষ",  ben: 420 },
  { name: "মেয়েদের ডিজিটাল শিক্ষা", pct: 60, status: "চলমান",        budget: "১২ লক্ষ", ben: 280 },
  { name: "কৃষক প্রশিক্ষণ কেন্দ্র",  pct: 92, status: "প্রায় সম্পন্ন", budget: "৫ লক্ষ",  ben: 190 },
  { name: "দুর্যোগ সহনশীল গৃহ",      pct: 45, status: "চলমান",        budget: "২০ লক্ষ", ben: 85  },
];

const activities = [
  { icon: "💚", text: "করিম হোসেন ১০,০০০ টাকা ডোনেট করেছেন",       time: "২ ঘণ্টা আগে",  bg: "bg-green-100"  },
  { icon: "👤", text: "৩ জন নতুন স্বেচ্ছাসেবী যোগ দিয়েছেন",         time: "৫ ঘণ্টা আগে",  bg: "bg-blue-100"   },
  { icon: "📋", text: "শিশু পুষ্টি প্রকল্পের রিপোর্ট আপলোড হয়েছে",  time: "গতকাল",        bg: "bg-amber-100"  },
  { icon: "🎓", text: "৪৫ জন শিক্ষার্থী বৃত্তি পেয়েছেন",              time: "২ দিন আগে",    bg: "bg-purple-100" },
  { icon: "🏥", text: "গঙ্গাচড়ায় ফ্রি মেডিক্যাল ক্যাম্প সম্পন্ন",   time: "৩ দিন আগে",    bg: "bg-pink-100"   },
];

const NAV = [
  { id: "overview",   icon: "📊", label: "ওভারভিউ"           },
  { id: "donations",  icon: "💚", label: "ডোনেশন"             },
  { id: "programs",   icon: "📋", label: "কার্যক্রম"           },
  { id: "projects",   icon: "🗂️", label: "প্রকল্প"            },
  { id: "volunteers", icon: "🤝", label: "স্বেচ্ছাসেবী"        },
  { id: "reports",    icon: "📈", label: "রিপোর্ট"             },
  { id: "settings",   icon: "⚙️", label: "সেটিংস"             },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function useCountUp(raw, duration = 1500, go = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    const n = parseInt(String(raw).replace(/\D/g, ""));
    if (!n) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * n));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [go]);
  return val;
}

const GreenTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="font-bn bg-green-900 text-white rounded-xl px-4 py-2.5 text-xs shadow-xl border-0">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: "#86efac" }}>
          {p.name}: {p.value > 999 ? `৳${(p.value / 1000).toFixed(0)}K` : p.value}
        </p>
      ))}
    </div>
  );
};

const GreenBtn = ({ children, onClick, small }) => (
  <button
    onClick={onClick}
    className={`font-bn font-bold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border-0 cursor-pointer ${small ? "text-xs px-4 py-2" : "text-sm px-5 py-2.5"}`}
    style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", boxShadow: "0 4px 14px rgba(22,163,74,.35)" }}
  >
    {children}
  </button>
);

/* ─── StatCard ──────────────────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, topColor, delay = 0 }) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), delay + 150); return () => clearTimeout(t); }, []);
  const num    = useCountUp(value, 1400, go);
  const suffix = String(value).replace(/[\d,]/g, "");

  return (
    <div
      className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default"
      style={{ animationDelay: `${delay}ms`, borderTop: `4px solid ${topColor}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: `${topColor}18` }}>
          {icon}
        </div>
        <span className="font-bn text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">↑ ১২%</span>
      </div>
      {go ? (
        <div className="anim-countup">
          <p className="font-dis text-3xl font-bold text-green-900 leading-none">{num.toLocaleString()}{suffix}</p>
          <p className="font-bn text-xs text-gray-400 mt-2">{label}</p>
          <p className="font-bn text-xs font-semibold mt-1" style={{ color: topColor }}>{sub}</p>
        </div>
      ) : (
        <div className="h-16 bg-gray-100 animate-pulse rounded-xl" />
      )}
    </div>
  );
}

/* ─── Sidebar ───────────────────────────────────────────────────────────── */
function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside
      className="bg-white shadow-lg flex flex-col sticky top-0 h-screen z-20 transition-all duration-300 flex-shrink-0"
      style={{ width: collapsed ? 72 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-green-50">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-md"
          style={{ background: "linear-gradient(135deg,#14532d,#22c55e)" }}
        >🌱</div>
        {!collapsed && (
          <div>
            <p className="font-dis text-green-900 font-bold text-sm leading-tight">উৎকর্ষ ফাউন্ডেশন</p>
            <p className="font-bn text-green-400 text-xs tracking-widest">FOUNDATION</p>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="font-bn text-gray-400 text-xs uppercase tracking-widest px-2 pb-2">মেনু</p>
        )}
        {NAV.map(n => {
          const isActive = active === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              title={collapsed ? n.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bn text-sm font-medium transition-all duration-200 cursor-pointer border-0
                ${isActive ? "text-white" : "text-gray-600 hover:bg-green-50 hover:text-green-800"}
                ${collapsed ? "justify-center" : ""}
              `}
              style={isActive ? { background: "linear-gradient(135deg,#15803d,#16a34a)", boxShadow: "0 4px 14px rgba(22,163,74,.35)" } : { background: "transparent" }}
            >
              <span className="text-lg flex-shrink-0">{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2.5 py-3 border-t border-green-50">
        <button
          onClick={() => setCollapsed(c => !c)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bn text-xs text-gray-400 hover:bg-green-50 hover:text-green-700 transition-all cursor-pointer border-0 bg-transparent ${collapsed ? "justify-center" : ""}`}
        >
          <span className="text-base transition-transform duration-300"
            style={{ transform: collapsed ? "rotate(180deg)" : "none", display: "block" }}>◀</span>
          {!collapsed && <span>সংকুচিত করুন</span>}
        </button>
      </div>
    </aside>
  );
}

/* ─── Topbar ────────────────────────────────────────────────────────────── */
function Topbar() {
  const [q, setQ] = useState("");
  return (
    <header className="bg-white border-b border-green-50 px-7 py-3.5 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="খুঁজুন..."
          className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-green-100 rounded-xl text-sm text-gray-700 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />
      </div>
      <div className="flex-1" />

      {/* Notification */}
      <button className="relative notif-dot w-10 h-10 bg-gray-50 border border-green-100 rounded-xl flex items-center justify-center text-base hover:bg-green-50 transition-colors cursor-pointer">
        🔔
      </button>
      {/* Mail */}
      <button className="w-10 h-10 bg-gray-50 border border-green-100 rounded-xl flex items-center justify-center text-base hover:bg-green-50 transition-colors cursor-pointer">
        ✉️
      </button>

      {/* Profile */}
      <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-2xl pl-2 pr-4 py-1.5 cursor-pointer hover:border-green-300 transition-all">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
          style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}>👤</div>
        <div>
          <p className="font-bn text-xs font-bold text-green-900 leading-tight">আরিফুল ইসলাম</p>
          <p className="font-bn text-xs text-green-500">অ্যাডমিন</p>
        </div>
        <span className="text-gray-400 text-xs ml-1">▾</span>
      </div>
    </header>
  );
}

/* ─── Welcome Banner ────────────────────────────────────────────────────── */
function WelcomeBanner() {
  return (
    <div
      className="anim-fadeup relative overflow-hidden rounded-2xl p-7"
      style={{ background: "linear-gradient(135deg,#14532d 0%,#166534 50%,#16a34a 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white opacity-5 pointer-events-none" />
      <div className="absolute right-20 -bottom-8 w-36 h-36 rounded-full bg-green-300 opacity-10 pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

      <div className="relative z-10">
        <p className="font-bn text-green-300 text-xs tracking-widest uppercase mb-1">শুভ সকাল ☀️</p>
        <h2 className="font-dis text-white text-2xl font-bold mb-1">স্বাগতম, আরিফুল ইসলাম!</h2>
        <p className="font-bn text-green-200 text-sm opacity-80">৭ মার্চ, ২০২৬ · রংপুর অফিস সক্রিয়</p>
        <div className="flex flex-wrap gap-3 mt-5">
          {[
            { l: "আজকের ডোনেশন",  v: "৳৪২,৫০০" },
            { l: "নতুন ভলান্টিয়ার", v: "৩ জন"    },
            { l: "সক্রিয় প্রকল্প",  v: "১৩টি"    },
          ].map((b, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
              <p className="font-bn text-white/70 text-xs">{b.l}</p>
              <p className="font-dis text-white text-xl font-bold">{b.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Overview Page ─────────────────────────────────────────────────────── */
function OverviewPage() {
  return (
    <div className="p-7 flex flex-col gap-6">

      <WelcomeBanner />

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard icon="💰" label="মোট ডোনেশন (এ বছর)" value="3840000" sub="গত মাসের চেয়ে ১২% বেশি"  topColor="#16a34a" delay={0}   />
        <StatCard icon="🎓" label="শিক্ষিত শিশু"         value="5280"    sub="চলতি বছরে ৬৮০ নতুন"    topColor="#3b82f6" delay={80}  />
        <StatCard icon="🤝" label="সক্রিয় স্বেচ্ছাসেবী"  value="347"     sub="১২টি জেলায় সক্রিয়"      topColor="#f59e0b" delay={160} />
        <StatCard icon="🏥" label="স্বাস্থ্য সুবিধাভোগী"  value="12900"   sub="৩৮টি ক্যাম্প সম্পন্ন"    topColor="#ec4899" delay={240} />
      </div>

      {/* Area + Pie */}
      <div className="grid grid-cols-3 gap-5">
        {/* Area – 2/3 width */}
        <div className="col-span-2 anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "320ms" }}>
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="font-dis text-green-900 font-bold text-lg leading-tight">মাসিক ডোনেশন প্রবাহ</p>
              <p className="font-bn text-gray-400 text-xs mt-0.5">টাকার পরিমাণ (হাজারে)</p>
            </div>
            <span className="font-bn text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">২০২৪–২৫</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.2}  />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fontFamily:"'Hind Siliguri'", fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily:"'Hind Siliguri'", fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`} />
              <Tooltip content={<GreenTooltip />} />
              <Area type="monotone" dataKey="amount" name="ডোনেশন" stroke="#16a34a" strokeWidth={2.5} fill="url(#ag)" dot={{ fill:"#16a34a", r:3 }} activeDot={{ r:5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie – 1/3 */}
        <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "400ms" }}>
          <p className="font-dis text-green-900 font-bold text-base leading-tight">কার্যক্রম বিভাজন</p>
          <p className="font-bn text-gray-400 text-xs mb-4 mt-0.5">বরাদ্দের শতকরা হার</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip
                formatter={(v, n) => [`${v}%`, n]}
                contentStyle={{ fontFamily:"'Hind Siliguri'", fontSize:11, borderRadius:8, border:"none", background:"#14532d", color:"white" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3">
            {pieData.map((p, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.color }} />
                <p className="font-bn text-xs text-gray-500 flex-1">{p.name}</p>
                <p className="font-bn text-xs font-bold text-green-800">{p.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donors table + Activity feed */}
      <div className="grid grid-cols-3 gap-5">
        {/* Table 2/3 */}
        <div className="col-span-2 anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "480ms" }}>
          <div className="flex justify-between items-center mb-5">
            <p className="font-dis text-green-900 font-bold text-base">সাম্প্রতিক ডোনার</p>
            <GreenBtn small>সব দেখুন</GreenBtn>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {["ডোনার","এলাকা","পরিমাণ","ধরন","সময়"].map(h => (
                  <th key={h} className="font-bn text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2 first:pl-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donors.map((d, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-green-50/50 transition-colors">
                  <td className="py-3 pl-0 pr-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-base flex-shrink-0">{d.av}</div>
                      <p className="font-bn text-sm font-semibold text-green-900 whitespace-nowrap">{d.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-bn text-xs text-gray-500 whitespace-nowrap">{d.area}</td>
                  <td className="py-3 px-2 font-bn text-sm font-bold text-green-600 whitespace-nowrap">৳{d.amount.toLocaleString()}</td>
                  <td className="py-3 px-2">
                    <span className={`font-bn text-xs font-semibold px-2.5 py-1 rounded-full ${d.type === "মাসিক" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                      {d.type}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-bn text-xs text-gray-400 whitespace-nowrap">{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity 1/3 */}
        <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "560ms" }}>
          <p className="font-dis text-green-900 font-bold text-base mb-5">সাম্প্রতিক কার্যক্রম</p>
          <div className="flex flex-col">
            {activities.map((a, i) => (
              <div key={i} className="activity-line relative flex gap-3 pb-5 last:pb-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 z-10 ${a.bg}`}>
                  {a.icon}
                </div>
                <div>
                  <p className="font-bn text-xs text-gray-600 leading-relaxed">{a.text}</p>
                  <p className="font-bn text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "640ms" }}>
        <div className="flex justify-between items-center mb-5">
          <p className="font-dis text-green-900 font-bold text-base">চলমান প্রকল্প</p>
          <GreenBtn small>সব প্রকল্প</GreenBtn>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-gray-50 hover:bg-green-50 border border-transparent hover:border-green-200 rounded-2xl p-4 transition-all duration-200 cursor-default"
            >
              <p className="font-bn text-sm font-bold text-green-900 mb-3 leading-snug">{p.name}</p>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bn text-xs text-gray-400">অগ্রগতি</span>
                <span className="font-bn text-xs font-bold text-green-600">{p.pct}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full anim-barslide"
                  style={{
                    width: `${p.pct}%`,
                    background: p.pct > 80
                      ? "linear-gradient(90deg,#15803d,#22c55e)"
                      : "linear-gradient(90deg,#16a34a,#4ade80)"
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className={`font-bn text-xs font-semibold px-2.5 py-0.5 rounded-full ${p.status === "প্রায় সম্পন্ন" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                  {p.status}
                </span>
                <span className="font-bn text-xs text-gray-400">👤 {p.ben}</span>
              </div>
              <p className="font-bn text-xs text-gray-400 mt-2">বাজেট: {p.budget}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "720ms" }}>
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="font-dis text-green-900 font-bold text-base">ত্রৈমাসিক কার্যক্রম তুলনা</p>
            <p className="font-bn text-gray-400 text-xs mt-0.5">সুবিধাভোগীর সংখ্যা (জন)</p>
          </div>
          <div className="flex items-center gap-4">
            {[["#16a34a","শিক্ষা"],["#4ade80","স্বাস্থ্য"],["#bbf7d0","নারী"]].map(([c,l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: c }} />
                <span className="font-bn text-xs text-gray-500">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={18} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
            <XAxis dataKey="q" tick={{ fontFamily:"'Hind Siliguri'", fontSize:12, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontFamily:"'Hind Siliguri'", fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<GreenTooltip />} />
            <Bar dataKey="শিক্ষা"    fill="#16a34a" radius={[5,5,0,0]} />
            <Bar dataKey="স্বাস্থ্য" fill="#4ade80" radius={[5,5,0,0]} />
            <Bar dataKey="নারী"      fill="#bbf7d0" radius={[5,5,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

/* ─── Placeholder ───────────────────────────────────────────────────────── */
function Placeholder({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4 p-10">
      <span className="text-6xl">{icon}</span>
      <p className="font-dis text-green-900 text-2xl font-bold">{title}</p>
      <p className="font-bn text-gray-400 text-sm">এই সেকশনটি শীঘ্রই আসছে…</p>
    </div>
  );
}

/* ─── Root ──────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [active,    setActive]    = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="font-bn flex min-h-screen bg-green-50/30">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            {active === "overview"   && <OverviewPage />}
            {active === "donations"  && <Placeholder title="ডোনেশন ম্যানেজমেন্ট"    icon="💚" />}
            {active === "programs"   && <Placeholder title="কার্যক্রম পরিচালনা"       icon="📋" />}
            {active === "projects"   && <Placeholder title="প্রকল্প ব্যবস্থাপনা"      icon="🗂️" />}
            {active === "volunteers" && <Placeholder title="স্বেচ্ছাসেবী ব্যবস্থাপনা" icon="🤝" />}
            {active === "reports"    && <Placeholder title="রিপোর্ট ও বিশ্লেষণ"       icon="📈" />}
            {active === "settings"   && <Placeholder title="সেটিংস"                   icon="⚙️" />}
          </main>
        </div>
      </div>
    </>
  );
}    