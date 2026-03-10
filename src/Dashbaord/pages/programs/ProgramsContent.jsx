import { useState } from "react";

/* ── Google Fonts ─────────────────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    .font-bn  { font-family: 'Hind Siliguri', sans-serif !important; }
    .font-dis { font-family: 'Tiro Bangla', serif !important; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(.92)}        to{opacity:1;transform:scale(1)}     }
    @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)}}
    @keyframes barGrow   { from{width:0} to{width:var(--w)} }
    @keyframes overlayIn { from{opacity:0} to{opacity:1} }
    @keyframes modalIn   { from{opacity:0;transform:translateY(32px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }

    .anim-fadeup   { animation: fadeUp    .5s cubic-bezier(.22,.68,0,1.1) both; }
    .anim-scalein  { animation: scaleIn   .45s cubic-bezier(.22,.68,0,1.2) both; }
    .anim-slidedown{ animation: slideDown .35s ease both; }
    .anim-overlay  { animation: overlayIn .25s ease both; }
    .anim-modal    { animation: modalIn   .4s  cubic-bezier(.22,.68,0,1.15) both; }

    .prog-bar { animation: barGrow .9s cubic-bezier(.22,.68,0,1.1) both; }

    .card-hover { transition: transform .25s, box-shadow .25s; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,.1) !important; }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #16a34a !important;
      box-shadow: 0 0 0 3px rgba(22,163,74,.15) !important;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: #86efac; border-radius: 4px; }
  `}</style>
);

/* ── Static Data ──────────────────────────────────────────────────────── */
const CATEGORIES = ["সব", "শিক্ষা", "স্বাস্থ্য", "নারী উন্নয়ন", "শিশু", "পরিবেশ", "আইনি সহায়তা", "বেকারত্ব"];

const STATUS_META = {
  "চলমান":        { tw: "bg-green-100 text-green-700",  dot: "bg-green-500"  },
  "পরিকল্পনাধীন": { tw: "bg-amber-100 text-amber-700",  dot: "bg-amber-500"  },
  "সম্পন্ন":       { tw: "bg-blue-100  text-blue-700",   dot: "bg-blue-500"   },
  "বিরতি":         { tw: "bg-red-100   text-red-700",    dot: "bg-red-400"    },
};

const INITIAL_PROGRAMS = [
  {
    id: 1,
    icon: "📚",
    title: "প্রাথমিক শিক্ষা বৃত্তি",
    category: "শিক্ষা",
    status: "চলমান",
    desc: "রংপুর বিভাগের সুবিধাবঞ্চিত শিশুদের জন্য প্রাথমিক থেকে উচ্চমাধ্যমিক পর্যন্ত বৃত্তি প্রদান ও কোচিং সুবিধা।",
    budget: "১২ লক্ষ",
    beneficiary: 420,
    progress: 72,
    started: "জানুয়ারি, ২০২৩",
    lead: "ড. সাবিনা ইয়াসমিন",
    color: "#16a34a",
    bg: "from-green-50 to-emerald-50",
  },
  {
    id: 2,
    icon: "🏥",
    title: "বিনামূল্যে স্বাস্থ্যসেবা",
    category: "স্বাস্থ্য",
    status: "চলমান",
    desc: "গ্রামীণ জনগোষ্ঠীর কাছে নিয়মিত মেডিক্যাল ক্যাম্প, টিকা কার্যক্রম ও পুষ্টি পরামর্শ সেবা পৌঁছে দেওয়া।",
    budget: "১৮ লক্ষ",
    beneficiary: 1200,
    progress: 85,
    started: "মার্চ, ২০২২",
    lead: "ডা. কামরুল হাসান",
    color: "#0ea5e9",
    bg: "from-sky-50 to-blue-50",
  },
  {
    id: 3,
    icon: "👩",
    title: "নারী উদ্যোক্তা প্রকল্প",
    category: "নারী উন্নয়ন",
    status: "চলমান",
    desc: "নারীদের সেলাই, হস্তশিল্প ও ক্ষুদ্র ব্যবসায়ের প্রশিক্ষণ দিয়ে স্বনির্ভর উদ্যোক্তা হিসেবে গড়ে তোলা।",
    budget: "৮ লক্ষ",
    beneficiary: 280,
    progress: 60,
    started: "জুন, ২০২৩",
    lead: "রওশন আরা বেগম",
    color: "#d946ef",
    bg: "from-fuchsia-50 to-pink-50",
  },
  {
    id: 4,
    icon: "👶",
    title: "শিশু পুষ্টি কার্যক্রম",
    category: "শিশু",
    status: "চলমান",
    desc: "৬ মাস থেকে ৫ বছর বয়সী শিশুদের পুষ্টি নিশ্চিত করতে খাদ্য সহায়তা ও মায়েদের পুষ্টি শিক্ষা কার্যক্রম।",
    budget: "১০ লক্ষ",
    beneficiary: 650,
    progress: 90,
    started: "ফেব্রুয়ারি, ২০২২",
    lead: "ডা. নাজমুল হক",
    color: "#f97316",
    bg: "from-orange-50 to-amber-50",
  },
  {
    id: 5,
    icon: "⚖️",
    title: "বিনামূল্যে আইনি সহায়তা",
    category: "আইনি সহায়তা",
    status: "পরিকল্পনাধীন",
    desc: "দরিদ্র ও প্রান্তিক জনগোষ্ঠীকে বিনামূল্যে আইনি পরামর্শ, মামলা পরিচালনা ও ন্যায়বিচার নিশ্চিতকরণ।",
    budget: "৬ লক্ষ",
    beneficiary: 0,
    progress: 20,
    started: "পরিকল্পনাধীন",
    lead: "অ্যাডভোকেট রফিক",
    color: "#8b5cf6",
    bg: "from-violet-50 to-purple-50",
  },
  {
    id: 6,
    icon: "🌿",
    title: "জলবায়ু সহনশীলতা প্রকল্প",
    category: "পরিবেশ",
    status: "চলমান",
    desc: "জলবায়ু পরিবর্তনের প্রভাব মোকাবেলায় কৃষক প্রশিক্ষণ, বৃক্ষরোপণ ও বন্যা-প্রতিরোধী গৃহ নির্মাণ।",
    budget: "২০ লক্ষ",
    beneficiary: 380,
    progress: 55,
    started: "সেপ্টেম্বর, ২০২৩",
    lead: "ইঞ্জি. তানভীর আহমেদ",
    color: "#10b981",
    bg: "from-emerald-50 to-teal-50",
  },
  {
    id: 7,
    icon: "💼",
    title: "যুব কর্মসংস্থান প্রকল্প",
    category: "বেকারত্ব",
    status: "সম্পন্ন",
    desc: "১৮–৩৫ বছর বয়সী বেকার যুবকদের আইটি, গার্মেন্টস ও কৃষি প্রযুক্তিতে প্রশিক্ষণ দিয়ে কর্মসংস্থান।",
    budget: "১৫ লক্ষ",
    beneficiary: 520,
    progress: 100,
    started: "জানুয়ারি, ২০২১",
    lead: "মো. জাহিদুল ইসলাম",
    color: "#eab308",
    bg: "from-yellow-50 to-amber-50",
  },
  {
    id: 8,
    icon: "♿",
    title: "প্রতিবন্ধী পুনর্বাসন",
    category: "স্বাস্থ্য",
    status: "বিরতি",
    desc: "শারীরিক ও মানসিক প্রতিবন্ধী ব্যক্তিদের পুনর্বাসন, সহায়ক উপকরণ সরবরাহ ও সামাজিক একীভূতকরণ।",
    budget: "৯ লক্ষ",
    beneficiary: 145,
    progress: 40,
    started: "মে, ২০২৩",
    lead: "ডা. শিরিন আক্তার",
    color: "#ef4444",
    bg: "from-red-50 to-rose-50",
  },
];

const EMPTY_FORM = {
  icon: "📋", title: "", category: "শিক্ষা", status: "চলমান",
  desc: "", budget: "", beneficiary: "", progress: 0,
  started: "", lead: "", color: "#16a34a",
};

const ICON_OPTIONS = ["📚","🏥","👩","👶","⚖️","🌿","💼","♿","🎓","💊","🌾","🏗️","📡","🤝","💧","🍎"];

/* ── Reusable chip ────────────────────────────────────────────────────── */
const StatusChip = ({ status }) => {
  const m = STATUS_META[status] ?? STATUS_META["চলমান"];
  return (
    <span className={`font-bn inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${m.tw}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {status}
    </span>
  );
};

/* ── Program Card ─────────────────────────────────────────────────────── */
function ProgramCard({ prog, onView, onEdit, onDelete, delay = 0 }) {
  return (
    <div
      className={`anim-fadeup card-hover bg-white rounded-2xl shadow-sm overflow-hidden cursor-default flex flex-col`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* top accent strip */}
      <div className={`h-1.5 w-full`} style={{ background: prog.color }} />

      {/* header */}
      <div className={`bg-gradient-to-br ${prog.bg} px-5 pt-5 pb-4`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-white">
              {prog.icon}
            </div>
            <div>
              <p className="font-dis text-green-900 font-bold text-base leading-snug">{prog.title}</p>
              <span className="font-bn text-xs text-gray-500">{prog.category}</span>
            </div>
          </div>
          <StatusChip status={prog.status} />
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4 flex flex-col gap-3 flex-1">
        <p className="font-bn text-sm text-gray-500 leading-relaxed line-clamp-2">{prog.desc}</p>

        {/* progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-bn text-xs text-gray-400">অগ্রগতি</span>
            <span className="font-bn text-xs font-bold" style={{ color: prog.color }}>{prog.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full prog-bar"
              style={{ "--w": `${prog.progress}%`, width: `${prog.progress}%`, background: `linear-gradient(90deg,${prog.color},${prog.color}99)` }}
            />
          </div>
        </div>

        {/* stats row */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[
            { label: "বাজেট",       value: prog.budget },
            { label: "সুবিধাভোগী", value: prog.beneficiary.toLocaleString() + " জন" },
            { label: "শুরু",         value: prog.started },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <p className="font-bn text-xs text-gray-400">{s.label}</p>
              <p className="font-bn text-xs font-bold text-green-800 mt-0.5 leading-tight">{s.value}</p>
            </div>
          ))}
        </div>

        {/* lead */}
        <div className="flex items-center gap-2 pt-0.5">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs">👤</div>
          <span className="font-bn text-xs text-gray-500">{prog.lead}</span>
        </div>
      </div>

      {/* footer actions */}
      <div className="px-5 py-3 border-t border-gray-50 flex gap-2">
        <button onClick={() => onView(prog)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
          বিস্তারিত
        </button>
        <button onClick={() => onEdit(prog)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">
          সম্পাদনা
        </button>
        <button onClick={() => onDelete(prog.id)}
          className="font-bn text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
          🗑️
        </button>
      </div>
    </div>
  );
}

/* ── Modal wrapper ────────────────────────────────────────────────────── */
function Modal({ onClose, children }) {
  return (
    <div className="anim-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.45)", backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="anim-modal w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ── View Detail Modal ────────────────────────────────────────────────── */
function ViewModal({ prog, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className={`bg-gradient-to-br ${prog.bg} p-7 relative`}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 text-sm cursor-pointer border-0">✕</button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl">{prog.icon}</div>
          <div>
            <p className="font-dis text-green-900 font-bold text-xl leading-snug">{prog.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bn text-xs text-gray-500 bg-white/70 px-2.5 py-0.5 rounded-full">{prog.category}</span>
              <StatusChip status={prog.status} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-7 flex flex-col gap-5">
        <p className="font-bn text-sm text-gray-600 leading-relaxed">{prog.desc}</p>
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bn text-xs text-gray-400">অগ্রগতি</span>
            <span className="font-bn text-xs font-bold" style={{ color: prog.color }}>{prog.progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full prog-bar"
              style={{ "--w":`${prog.progress}%`, width:`${prog.progress}%`, background:`linear-gradient(90deg,${prog.color},${prog.color}88)` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label:"💰 মোট বাজেট",     value: prog.budget },
            { label:"👥 সুবিধাভোগী",    value: prog.beneficiary + " জন" },
            { label:"📅 শুরুর তারিখ",   value: prog.started },
            { label:"👤 দায়িত্বপ্রাপ্ত", value: prog.lead },
          ].map(s => (
            <div key={s.label} className="bg-green-50 rounded-2xl px-4 py-3">
              <p className="font-bn text-xs text-gray-400">{s.label}</p>
              <p className="font-bn text-sm font-bold text-green-800 mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose}
          className="font-bn w-full py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0"
          style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
          বন্ধ করুন
        </button>
      </div>
    </Modal>
  );
}

/* ── Add / Edit Modal ─────────────────────────────────────────────────── */
function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const isEdit = !!initial.id;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const fieldCls = "font-bn w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 transition-all";
  const labelCls = "font-bn block text-xs font-semibold text-green-800 mb-1.5";

  return (
    <Modal onClose={onClose}>
      {/* header */}
      <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-50">
        <p className="font-dis text-green-900 font-bold text-lg">
          {isEdit ? "কার্যক্রম সম্পাদনা" : "নতুন কার্যক্রম যোগ করুন"}
        </p>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm cursor-pointer border-0">✕</button>
      </div>

      {/* scrollable form body */}
      <div className="px-7 py-5 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "65vh" }}>

        {/* icon picker */}
        <div>
          <label className={labelCls}>আইকন নির্বাচন করুন</label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map(ic => (
              <button key={ic} onClick={() => set("icon", ic)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center cursor-pointer border-2 transition-all
                  ${form.icon === ic ? "border-green-500 bg-green-50 scale-110" : "border-gray-100 bg-gray-50 hover:border-green-300"}`}>
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* title */}
        <div>
          <label className={labelCls}>কার্যক্রমের নাম *</label>
          <input value={form.title} onChange={e => set("title", e.target.value)}
            placeholder="যেমন: শিশু পুষ্টি প্রকল্প" className={fieldCls} />
        </div>

        {/* category + status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>বিভাগ</label>
            <select value={form.category} onChange={e => set("category", e.target.value)} className={fieldCls}>
              {CATEGORIES.filter(c => c !== "সব").map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>অবস্থা</label>
            <select value={form.status} onChange={e => set("status", e.target.value)} className={fieldCls}>
              {Object.keys(STATUS_META).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* description */}
        <div>
          <label className={labelCls}>বিবরণ</label>
          <textarea value={form.desc} onChange={e => set("desc", e.target.value)}
            rows={3} placeholder="কার্যক্রমের বিস্তারিত বিবরণ লিখুন…"
            className={`${fieldCls} resize-none`} />
        </div>

        {/* budget + beneficiary */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>বাজেট</label>
            <input value={form.budget} onChange={e => set("budget", e.target.value)}
              placeholder="যেমন: ১০ লক্ষ" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>সুবিধাভোগী (সংখ্যা)</label>
            <input type="number" value={form.beneficiary} onChange={e => set("beneficiary", Number(e.target.value))}
              placeholder="যেমন: 300" className={fieldCls} />
          </div>
        </div>

        {/* progress */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className={labelCls + " mb-0"}>অগ্রগতি</label>
            <span className="font-bn text-xs font-bold text-green-600">{form.progress}%</span>
          </div>
          <input type="range" min={0} max={100} value={form.progress}
            onChange={e => set("progress", Number(e.target.value))}
            className="w-full accent-green-500 cursor-pointer" />
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1.5">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${form.progress}%`, background: `linear-gradient(90deg,${form.color},${form.color}88)` }} />
          </div>
        </div>

        {/* lead + started */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>দায়িত্বপ্রাপ্ত ব্যক্তি</label>
            <input value={form.lead} onChange={e => set("lead", e.target.value)}
              placeholder="নাম লিখুন" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>শুরুর তারিখ</label>
            <input value={form.started} onChange={e => set("started", e.target.value)}
              placeholder="যেমন: জানুয়ারি, ২০২৪" className={fieldCls} />
          </div>
        </div>

        {/* color */}
        <div>
          <label className={labelCls}>থিম রঙ</label>
          <div className="flex items-center gap-3">
            <input type="color" value={form.color} onChange={e => set("color", e.target.value)}
              className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5" />
            <span className="font-bn text-xs text-gray-400">কার্ডের অ্যাকসেন্ট রঙ নির্বাচন করুন</span>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="px-7 py-4 border-t border-gray-50 flex gap-3">
        <button onClick={onClose}
          className="font-bn flex-1 py-3 rounded-2xl font-semibold text-sm border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
          বাতিল করুন
        </button>
        <button
          disabled={!form.title.trim()}
          onClick={() => { if (form.title.trim()) onSave(form); }}
          className="font-bn flex-1 py-3 rounded-2xl font-bold text-sm text-white cursor-pointer border-0 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", boxShadow: "0 4px 14px rgba(22,163,74,.35)" }}>
          {isEdit ? "আপডেট করুন ✓" : "যোগ করুন ✓"}
        </button>
      </div>
    </Modal>
  );
}

/* ── Stats bar ────────────────────────────────────────────────────────── */
function StatsRow({ programs }) {
  const total   = programs.length;
  const active  = programs.filter(p => p.status === "চলমান").length;
  const done    = programs.filter(p => p.status === "সম্পন্ন").length;
  const benef   = programs.reduce((a, p) => a + (Number(p.beneficiary) || 0), 0);
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon:"📋", label:"মোট কার্যক্রম",  value: total,                color:"#16a34a", bg:"bg-green-50" },
        { icon:"🟢", label:"চলমান",           value: active,               color:"#22c55e", bg:"bg-emerald-50" },
        { icon:"✅", label:"সম্পন্ন",          value: done,                 color:"#3b82f6", bg:"bg-blue-50" },
        { icon:"👥", label:"মোট সুবিধাভোগী", value: benef.toLocaleString(), color:"#f97316", bg:"bg-orange-50" },
      ].map((s, i) => (
        <div key={i} className={`anim-fadeup ${s.bg} rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm`}
          style={{ animationDelay: `${i * 60}ms` }}>
          <div className="text-2xl">{s.icon}</div>
          <div>
            <p className="font-dis font-bold text-2xl leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────────── */
export default function ProgramsContent() {
  const [programs,  setPrograms]  = useState(INITIAL_PROGRAMS);
  const [category,  setCategory]  = useState("সব");
  const [search,    setSearch]    = useState("");
  const [statusFlt, setStatusFlt] = useState("সব");
  const [sortBy,    setSortBy]    = useState("default");
  const [modal,     setModal]     = useState(null); // null | { type:"view"|"add"|"edit", prog? }
  const [toast,     setToast]     = useState(null);

  const showToast = (msg, color = "#16a34a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  /* filtering & sorting */
  const visible = programs
    .filter(p => category === "সব" || p.category === category)
    .filter(p => statusFlt === "সব" || p.status === statusFlt)
    .filter(p => !search || p.title.includes(search) || p.desc.includes(search) || p.lead.includes(search))
    .sort((a, b) => {
      if (sortBy === "progress")    return b.progress - a.progress;
      if (sortBy === "beneficiary") return b.beneficiary - a.beneficiary;
      return 0;
    });

  /* CRUD */
  const handleSave = (form) => {
    if (form.id) {
      setPrograms(ps => ps.map(p => p.id === form.id ? { ...form, bg: p.bg } : p));
      showToast("কার্যক্রম আপডেট হয়েছে ✓");
    } else {
      const bgs = ["from-green-50 to-emerald-50","from-sky-50 to-blue-50","from-fuchsia-50 to-pink-50","from-orange-50 to-amber-50","from-violet-50 to-purple-50","from-teal-50 to-cyan-50"];
      setPrograms(ps => [...ps, { ...form, id: Date.now(), bg: bgs[ps.length % bgs.length] }]);
      showToast("নতুন কার্যক্রম যোগ হয়েছে 🎉");
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setPrograms(ps => ps.filter(p => p.id !== id));
    showToast("কার্যক্রম মুছে ফেলা হয়েছে", "#ef4444");
  };

  return (
    <>
      <Fonts />

      <div className="font-bn min-h-screen bg-green-50/30 p-6 flex flex-col gap-6">

        {/* ── Page header ── */}
        <div className="anim-fadeup flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="font-bn text-green-500 text-xs uppercase tracking-widest mb-1">উৎকর্ষ ফাউন্ডেশন</p>
            <h1 className="font-dis text-green-900 text-3xl font-bold leading-tight">কার্যক্রম ব্যবস্থাপনা</h1>
            <p className="font-bn text-gray-400 text-sm mt-1">সকল কার্যক্রম পরিচালনা ও পর্যবেক্ষণ করুন</p>
          </div>
          <button
            onClick={() => setModal({ type: "add" })}
            className="font-bn flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg,#14532d,#22c55e)", boxShadow: "0 6px 20px rgba(22,163,74,.35)" }}>
            <span className="text-lg">＋</span> নতুন কার্যক্রম
          </button>
        </div>

        {/* ── Stats ── */}
        <StatsRow programs={programs} />

        {/* ── Filters ── */}
        <div className="anim-fadeup bg-white rounded-2xl shadow-sm p-4 flex flex-wrap gap-3 items-center"
          style={{ animationDelay: "200ms" }}>

          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="কার্যক্রম খুঁজুন..."
              className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 transition-all" />
          </div>

          {/* Status filter */}
          <select value={statusFlt} onChange={e => setStatusFlt(e.target.value)}
            className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
            <option value="সব">সব অবস্থা</option>
            {Object.keys(STATUS_META).map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
            <option value="default">ডিফল্ট</option>
            <option value="progress">অগ্রগতি অনুযায়ী</option>
            <option value="beneficiary">সুবিধাভোগী অনুযায়ী</option>
          </select>

          {/* Category chips */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`font-bn text-xs font-semibold px-3.5 py-1.5 rounded-full cursor-pointer border transition-all
                  ${category === c
                    ? "text-white border-transparent"
                    : "bg-gray-50 border-gray-100 text-gray-500 hover:border-green-300 hover:text-green-700"
                  }`}
                style={category === c ? { background: "linear-gradient(135deg,#15803d,#22c55e)", boxShadow: "0 2px 8px rgba(22,163,74,.3)" } : {}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ── Result count ── */}
        {(search || category !== "সব" || statusFlt !== "সব") && (
          <p className="font-bn text-xs text-gray-400 -mt-2 anim-slidedown">
            {visible.length} টি কার্যক্রম পাওয়া গেছে
          </p>
        )}

        {/* ── Grid ── */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))" }}>
            {visible.map((p, i) => (
              <ProgramCard
                key={p.id}
                prog={p}
                delay={i * 55}
                onView={prog => setModal({ type: "view", prog })}
                onEdit={prog => setModal({ type: "edit", prog })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="anim-scalein bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-6xl opacity-30">🔍</span>
            <p className="font-dis text-green-800 text-xl font-bold">কোনো কার্যক্রম পাওয়া যায়নি</p>
            <p className="font-bn text-gray-400 text-sm">অনুসন্ধান বা ফিল্টার পরিবর্তন করুন</p>
            <button onClick={() => { setSearch(""); setCategory("সব"); setStatusFlt("সব"); }}
              className="font-bn text-sm font-semibold text-green-600 border border-green-200 px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
              ফিল্টার মুছুন
            </button>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {modal?.type === "view" && (
        <ViewModal prog={modal.prog} onClose={() => setModal(null)} />
      )}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <FormModal
          initial={modal.type === "edit" ? modal.prog : EMPTY_FORM}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div
          className="anim-slidedown fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bn text-sm font-semibold"
          style={{ background: toast.color }}>
          <span>✓</span>
          {toast.msg}
        </div>
      )}
    </>
  );
}