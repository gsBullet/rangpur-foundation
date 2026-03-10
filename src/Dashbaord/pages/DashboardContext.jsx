import { useState, useEffect } from "react";

/* ─── Google Fonts ──────────────────────────────────────────────────────── */
export const GlobalStyles = () => (
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
export const monthlyData = [
  { month: "জুলাই",  amount: 185000, donors: 142 },
  { month: "আগস্ট",  amount: 220000, donors: 178 },
  { month: "সেপ্টে", amount: 195000, donors: 155 },
  { month: "অক্টো",  amount: 310000, donors: 241 },
  { month: "নভে",    amount: 275000, donors: 213 },
  { month: "ডিসে",   amount: 390000, donors: 298 },
  { month: "জানু",   amount: 345000, donors: 267 },
  { month: "ফেব্রু", amount: 428000, donors: 320 },
];

export const pieData = [
  { name: "শিক্ষা",    value: 32, color: "#16a34a" },
  { name: "স্বাস্থ্য", value: 24, color: "#22c55e" },
  { name: "নারী",      value: 18, color: "#4ade80"  },
  { name: "শিশু",      value: 14, color: "#86efac"  },
  { name: "অন্যান্য",  value: 12, color: "#bbf7d0"  },
];

export const barData = [
  { q: "Q1", শিক্ষা: 420, স্বাস্থ্য: 310, নারী: 250 },
  { q: "Q2", শিক্ষা: 560, স্বাস্থ্য: 390, নারী: 320 },
  { q: "Q3", শিক্ষা: 490, স্বাস্থ্য: 445, নারী: 380 },
  { q: "Q4", শিক্ষা: 680, স্বাস্থ্য: 510, নারী: 440 },
];

export const donors = [
  { name: "রহিম উদ্দিন",  area: "রংপুর সদর", amount: 5000,  type: "মাসিক",   time: "২ ঘণ্টা আগে", av: "👨" },
  { name: "সুমাইয়া খানম", area: "গাইবান্ধা",  amount: 2500,  type: "এককালীন", time: "৪ ঘণ্টা আগে", av: "👩" },
  { name: "করিম হোসেন",   area: "কুড়িগ্রাম",  amount: 10000, type: "মাসিক",   time: "গতকাল",       av: "👨" },
  { name: "নাজমা বেগম",   area: "দিনাজপুর",   amount: 1000,  type: "এককালীন", time: "গতকাল",       av: "👩" },
  { name: "তারিক হাসান",  area: "নীলফামারী",  amount: 7500,  type: "মাসিক",   time: "২ দিন আগে",   av: "👦" },
];

export const projects = [
  { name: "শিশু পুষ্টি প্রকল্প",     pct: 75, status: "চলমান",        budget: "৮ লক্ষ",  ben: 420 },
  { name: "মেয়েদের ডিজিটাল শিক্ষা", pct: 60, status: "চলমান",        budget: "১২ লক্ষ", ben: 280 },
  { name: "কৃষক প্রশিক্ষণ কেন্দ্র",  pct: 92, status: "প্রায় সম্পন্ন", budget: "৫ লক্ষ",  ben: 190 },
  { name: "দুর্যোগ সহনশীল গৃহ",      pct: 45, status: "চলমান",        budget: "২০ লক্ষ", ben: 85  },
];

export const activities = [
  { icon: "💚", text: "করিম হোসেন ১০,০০০ টাকা ডোনেট করেছেন",       time: "২ ঘণ্টা আগে",  bg: "bg-green-100"  },
  { icon: "👤", text: "৩ জন নতুন স্বেচ্ছাসেবী যোগ দিয়েছেন",         time: "৫ ঘণ্টা আগে",  bg: "bg-blue-100"   },
  { icon: "📋", text: "শিশু পুষ্টি প্রকল্পের রিপোর্ট আপলোড হয়েছে",  time: "গতকাল",        bg: "bg-amber-100"  },
  { icon: "🎓", text: "৪৫ জন শিক্ষার্থী বৃত্তি পেয়েছেন",              time: "২ দিন আগে",    bg: "bg-purple-100" },
  { icon: "🏥", text: "গঙ্গাচড়ায় ফ্রি মেডিক্যাল ক্যাম্প সম্পন্ন",   time: "৩ দিন আগে",    bg: "bg-pink-100"   },
];



/* ─── Helpers ───────────────────────────────────────────────────────────── */
export function useCountUp(raw, duration = 1500, go = false) {
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

export const GreenTooltip = ({ active, payload, label }) => {
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

export const GreenBtn = ({ children, onClick, small }) => (
  <button
    onClick={onClick}
    className={`font-bn font-bold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border-0 cursor-pointer ${small ? "text-xs px-4 py-2" : "text-sm px-5 py-2.5"}`}
    style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", boxShadow: "0 4px 14px rgba(22,163,74,.35)" }}
  >
    {children}
  </button>
);

/* ─── StatCard ──────────────────────────────────────────────────────────── */
export function StatCard({ icon, label, value, sub, topColor, delay = 0 }) {
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





/* ─── Welcome Banner ────────────────────────────────────────────────────── */
export function WelcomeBanner() {
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


/* ─── Placeholder ───────────────────────────────────────────────────────── */
export function Placeholder({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4 p-10">
      <span className="text-6xl">{icon}</span>
      <p className="font-dis text-green-900 text-2xl font-bold">{title}</p>
      <p className="font-bn text-gray-400 text-sm">এই সেকশনটি শীঘ্রই আসছে…</p>
    </div>
  );
}
