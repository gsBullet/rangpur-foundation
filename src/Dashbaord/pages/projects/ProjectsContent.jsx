import { useState, useMemo } from "react";

/* ── Fonts & Keyframes ──────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    .font-bn  { font-family:'Hind Siliguri',sans-serif !important }
    .font-dis { font-family:'Tiro Bangla',serif !important }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.93)}       to{opacity:1;transform:scale(1)}     }
    @keyframes modalIn  { from{opacity:0;transform:translateY(28px) scale(.96)} to{opacity:1;transform:none} }
    @keyframes overlayIn{ from{opacity:0} to{opacity:1} }
    @keyframes toastIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
    @keyframes barGrow  { from{width:0} to{width:var(--w)} }
    @keyframes countUp  { from{opacity:0;transform:scale(.75)} to{opacity:1;transform:scale(1)} }
    @keyframes shimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }

    .au { animation:fadeUp   .48s cubic-bezier(.22,.68,0,1.1) both }
    .si { animation:scaleIn  .38s cubic-bezier(.22,.68,0,1.2) both }
    .mi { animation:modalIn  .42s cubic-bezier(.22,.68,0,1.15) both }
    .ov { animation:overlayIn .24s ease both }
    .ti { animation:toastIn  .38s cubic-bezier(.22,.68,0,1.2) both }
    .cu { animation:countUp  .55s cubic-bezier(.22,.68,0,1.2) both }

    .card-lift { transition:transform .24s,box-shadow .24s }
    .card-lift:hover { transform:translateY(-5px); box-shadow:0 22px 52px rgba(0,0,0,.1)!important }

    .bar-anim { animation:barGrow .9s cubic-bezier(.22,.68,0,1.1) both }

    input:focus,textarea:focus,select:focus{
      outline:none;border-color:#16a34a!important;
      box-shadow:0 0 0 3px rgba(22,163,74,.14)!important;
    }
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:#86efac;border-radius:4px}
  `}</style>
);

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = ["সব","শিক্ষা","স্বাস্থ্য","নারী উন্নয়ন","শিশু","পরিবেশ","আইনি সহায়তা","বেকারত্ব","অবকাঠামো"];
const STATUSES   = ["চলমান","পরিকল্পনাধীন","সম্পন্ন","বিরতি"];
const FUNDERS    = ["UNICEF","বিশ্বব্যাংক","FAO","স্থানীয় সরকার","ব্যক্তিগত দান","UNDP","ইউরোপীয় ইউনিয়ন","সরকারি অনুদান"];
const DISTRICTS  = ["রংপুর সদর","গাইবান্ধা","কুড়িগ্রাম","দিনাজপুর","নীলফামারী","লালমনিরহাট","ঠাকুরগাঁও","পঞ্চগড়","সকল জেলা"];
const ICONS      = ["📚","🏥","👩","👶","⚖️","🌿","💼","♿","🎓","💊","🌾","🏗️","📡","🤝","💧","🍎","🌍","🏫","🔬","📐"];

const STATUS_META = {
  "চলমান":        { bg:"bg-green-100",  text:"text-green-700",  dot:"bg-green-500",  bar:"from-green-500 to-green-400" },
  "পরিকল্পনাধীন": { bg:"bg-amber-100",  text:"text-amber-700",  dot:"bg-amber-400",  bar:"from-amber-500 to-amber-400" },
  "সম্পন্ন":       { bg:"bg-blue-100",   text:"text-blue-700",   dot:"bg-blue-500",   bar:"from-blue-500  to-blue-400"  },
  "বিরতি":         { bg:"bg-red-100",    text:"text-red-700",    dot:"bg-red-400",    bar:"from-red-500   to-red-400"   },
};

const CAT_COLOR = {
  "শিক্ষা":"#16a34a","স্বাস্থ্য":"#0ea5e9","নারী উন্নয়ন":"#d946ef",
  "শিশু":"#f97316","পরিবেশ":"#10b981","আইনি সহায়তা":"#8b5cf6",
  "বেকারত্ব":"#eab308","অবকাঠামো":"#64748b",
};

const BG_POOL = [
  "from-green-50 to-emerald-50","from-sky-50 to-blue-50","from-fuchsia-50 to-pink-50",
  "from-orange-50 to-amber-50","from-violet-50 to-purple-50","from-teal-50 to-cyan-50",
  "from-rose-50 to-red-50","from-yellow-50 to-lime-50",
];

const SEED_PROJECTS = [
  {
    id:1, icon:"👶", title:"শিশু পুষ্টি প্রকল্প",
    category:"শিশু", status:"চলমান", funder:"UNICEF",
    district:"রংপুর সদর", budget:800000, spent:580000,
    beneficiary:420, progress:75,
    startDate:"জানু, ২০২৩", endDate:"ডিসে, ২০২৫",
    lead:"ডা. নাজমুল হক",
    desc:"৬ মাস থেকে ৫ বছর বয়সী শিশুদের পুষ্টি নিশ্চিত করতে খাদ্য সহায়তা ও মায়েদের পুষ্টিশিক্ষা।",
    milestones:["বেসলাইন জরিপ ✓","কেন্দ্র স্থাপন ✓","খাদ্য বিতরণ ✓","মূল্যায়ন ◌"],
    tags:["পুষ্টি","শিশু","স্বাস্থ্য"],
  },
  {
    id:2, icon:"📡", title:"মেয়েদের ডিজিটাল শিক্ষা",
    category:"শিক্ষা", status:"চলমান", funder:"বিশ্বব্যাংক",
    district:"গাইবান্ধা", budget:1200000, spent:710000,
    beneficiary:280, progress:60,
    startDate:"জুন, ২০২৩", endDate:"মে, ২০২৬",
    lead:"ড. ফারহানা ইসলাম",
    desc:"গ্রামীণ মেয়েদের জন্য ডিজিটাল ল্যাব স্থাপন ও আইসিটি প্রশিক্ষণ কার্যক্রম।",
    milestones:["অবকাঠামো ✓","ল্যাব স্থাপন ✓","ভর্তি কার্যক্রম ◌","সনদ প্রদান ◌"],
    tags:["ডিজিটাল","মেয়ে","শিক্ষা"],
  },
  {
    id:3, icon:"🌾", title:"কৃষক প্রশিক্ষণ কেন্দ্র",
    category:"পরিবেশ", status:"সম্পন্ন", funder:"FAO",
    district:"কুড়িগ্রাম", budget:500000, spent:498000,
    beneficiary:190, progress:100,
    startDate:"জানু, ২০২২", endDate:"ডিসে, ২০২৩",
    lead:"ইঞ্জি. রাশেদ করিম",
    desc:"আধুনিক কৃষি প্রযুক্তি ও জৈব সার ব্যবহারে কৃষকদের হাতে-কলমে প্রশিক্ষণ।",
    milestones:["প্রশিক্ষক নিয়োগ ✓","প্রশিক্ষণ সম্পন্ন ✓","মাঠ পরিদর্শন ✓","রিপোর্ট ✓"],
    tags:["কৃষি","প্রশিক্ষণ","পরিবেশ"],
  },
  {
    id:4, icon:"🏗️", title:"দুর্যোগ সহনশীল গৃহ",
    category:"অবকাঠামো", status:"চলমান", funder:"স্থানীয় সরকার",
    district:"নীলফামারী", budget:2000000, spent:880000,
    beneficiary:85, progress:45,
    startDate:"মার্চ, ২০২৪", endDate:"ফেব্রু, ২০২৭",
    lead:"ইঞ্জি. তানভীর আহমেদ",
    desc:"বন্যাপ্রবণ এলাকায় উঁচু ভিতে দুর্যোগ-সহনশীল বাড়ি নির্মাণ ও পুনর্বাসন।",
    milestones:["জরিপ ✓","ডিজাইন ✓","নির্মাণ ◌","বসবাস ◌"],
    tags:["গৃহ","দুর্যোগ","অবকাঠামো"],
  },
  {
    id:5, icon:"⚖️", title:"বিনামূল্যে আইনি সহায়তা",
    category:"আইনি সহায়তা", status:"পরিকল্পনাধীন", funder:"ব্যক্তিগত দান",
    district:"দিনাজপুর", budget:600000, spent:50000,
    beneficiary:0, progress:10,
    startDate:"জুলাই, ২০২৫", endDate:"জুন, ২০২৭",
    lead:"অ্যাডভোকেট রফিক",
    desc:"দরিদ্র ও প্রান্তিক মানুষকে বিনামূল্যে আইনি পরামর্শ ও মামলা পরিচালনা সেবা।",
    milestones:["আইনজীবী নিয়োগ ◌","অফিস স্থাপন ◌","সেবা শুরু ◌","মূল্যায়ন ◌"],
    tags:["আইন","ন্যায়বিচার","সেবা"],
  },
  {
    id:6, icon:"👩", title:"নারী উদ্যোক্তা হাব",
    category:"নারী উন্নয়ন", status:"চলমান", funder:"UNDP",
    district:"লালমনিরহাট", budget:950000, spent:620000,
    beneficiary:340, progress:68,
    startDate:"সেপ্টে, ২০২২", endDate:"আগস্ট, ২০২৫",
    lead:"রওশন আরা বেগম",
    desc:"নারীদের সেলাই, হস্তশিল্প ও ক্ষুদ্র ব্যবসায় প্রশিক্ষণ দিয়ে স্বনির্ভর উদ্যোক্তা গড়ে তোলা।",
    milestones:["হাব স্থাপন ✓","প্রশিক্ষণ ✓","বাজার সংযোগ ◌","সম্প্রসারণ ◌"],
    tags:["নারী","উদ্যোক্তা","সেলাই"],
  },
];

const EMPTY_FORM = {
  icon:"📋", title:"", category:"শিক্ষা", status:"চলমান",
  funder:"", district:"রংপুর সদর", budget:"", spent:"",
  beneficiary:"", progress:0, startDate:"", endDate:"",
  lead:"", desc:"", milestones:[], tags:[],
};

/* ── Helpers ────────────────────────────────────────────────────── */
const fmtTaka = (n) => {
  if (!n && n!==0) return "—";
  if (n>=100000)  return `৳${(n/100000).toFixed(1)} লক্ষ`;
  if (n>=1000)    return `৳${(n/1000).toFixed(0)} হাজার`;
  return `৳${n}`;
};

/* ── StatusChip ─────────────────────────────────────────────────── */
const StatusChip = ({ s }) => {
  const m = STATUS_META[s] ?? STATUS_META["চলমান"];
  return (
    <span className={`font-bn inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {s}
    </span>
  );
};

/* ── CircularProgress ───────────────────────────────────────────── */
function CircleRing({ pct, color, size=56 }) {
  const r = (size-8)/2, c = 2*Math.PI*r;
  const dash = c - (pct/100)*c;
  return (
    <div className="relative flex-shrink-0" style={{ width:size, height:size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={c} strokeDashoffset={dash} strokeLinecap="round"
          style={{ transition:"stroke-dashoffset 1s cubic-bezier(.22,.68,0,1)" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bn text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
    </div>
  );
}

/* ── ProjectCard ────────────────────────────────────────────────── */
function ProjectCard({ proj, delay, onView, onEdit, onDelete }) {
  const cc = CAT_COLOR[proj.category] || "#16a34a";
  const sm = STATUS_META[proj.status]  || STATUS_META["চলমান"];
  const bg = BG_POOL[proj.id % BG_POOL.length];
  const spentPct = proj.budget > 0 ? Math.min((proj.spent/proj.budget)*100, 100) : 0;

  return (
    <div className={`au card-lift bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col`}
      style={{ animationDelay:`${delay}ms` }}>

      {/* accent strip */}
      <div className="h-1.5" style={{ background: cc }} />

      {/* header */}
      <div className={`bg-gradient-to-br ${bg} px-5 pt-5 pb-4`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
              {proj.icon}
            </div>
            <div>
              <p className="font-dis text-green-900 font-bold text-base leading-snug">{proj.title}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold"
                  style={{ background: cc }}>{proj.category}</span>
                <StatusChip s={proj.status} />
              </div>
            </div>
          </div>
          <CircleRing pct={proj.progress} color={cc} />
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4 flex flex-col gap-3 flex-1">
        <p className="font-bn text-sm text-gray-500 leading-relaxed line-clamp-2">{proj.desc}</p>

        {/* tags */}
        {proj.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {proj.tags.map(t=>(
              <span key={t} className="font-bn text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>
            ))}
          </div>
        )}

        {/* info grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon:"💰", label:"মোট বাজেট",     val: fmtTaka(proj.budget)    },
            { icon:"👥", label:"সুবিধাভোগী",    val: `${proj.beneficiary} জন` },
            { icon:"🏦", label:"ফান্ডিং",         val: proj.funder            },
            { icon:"📍", label:"জেলা",            val: proj.district          },
            { icon:"📅", label:"শুরু",            val: proj.startDate         },
            { icon:"🏁", label:"সমাপ্তি",          val: proj.endDate           },
          ].map(s=>(
            <div key={s.label} className="bg-gray-50 rounded-xl px-3 py-2">
              <p className="font-bn text-xs text-gray-400">{s.icon} {s.label}</p>
              <p className="font-bn text-xs font-bold text-green-800 mt-0.5 truncate">{s.val}</p>
            </div>
          ))}
        </div>

        {/* budget used bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-bn text-xs text-gray-400">বাজেট ব্যবহার</span>
            <span className="font-bn text-xs font-semibold" style={{ color:cc }}>{spentPct.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bar-anim"
              style={{ "--w":`${spentPct}%`, width:`${spentPct}%`,
                background:`linear-gradient(90deg,${cc},${cc}88)` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-bn text-xs text-gray-400">ব্যয়: {fmtTaka(proj.spent)}</span>
            <span className="font-bn text-xs text-gray-400">অবশিষ্ট: {fmtTaka(proj.budget - proj.spent)}</span>
          </div>
        </div>

        {/* lead */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
            style={{ background:`${cc}22`, color:cc }}>👤</div>
          <span className="font-bn text-xs text-gray-500">{proj.lead}</span>
        </div>
      </div>

      {/* footer */}
      <div className="px-5 py-3 border-t border-gray-50 flex gap-2">
        <button onClick={()=>onView(proj)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
          বিস্তারিত
        </button>
        <button onClick={()=>onEdit(proj)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">
          ✎ সম্পাদনা
        </button>
        <button onClick={()=>onDelete(proj)}
          className="font-bn text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
          🗑
        </button>
      </div>
    </div>
  );
}

/* ── Modal shell ────────────────────────────────────────────────── */
function Modal({ onClose, children }) {
  return (
    <div className="ov fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,.48)", backdropFilter:"blur(5px)" }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="mi w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ── View Modal ─────────────────────────────────────────────────── */
function ViewModal({ proj, onClose, onEdit }) {
  const cc = CAT_COLOR[proj.category] || "#16a34a";
  const bg = BG_POOL[proj.id % BG_POOL.length];
  const spentPct = proj.budget > 0 ? Math.min((proj.spent/proj.budget)*100,100) : 0;

  return (
    <Modal onClose={onClose}>
      {/* hero */}
      <div className={`relative bg-gradient-to-br ${bg} px-7 pt-7 pb-5`}
        style={{ borderBottom:"1px solid #f0fdf4" }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl flex-shrink-0">
            {proj.icon}
          </div>
          <div className="flex-1">
            <p className="font-dis text-green-900 font-bold text-xl leading-tight">{proj.title}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold"
                style={{ background:cc }}>{proj.category}</span>
              <StatusChip s={proj.status} />
              <span className="font-bn text-xs px-2.5 py-0.5 rounded-full bg-white/70 text-gray-600">{proj.funder}</span>
            </div>
          </div>
          <CircleRing pct={proj.progress} color={cc} size={64} />
        </div>
      </div>

      <div className="px-7 py-5 overflow-y-auto flex flex-col gap-5" style={{ maxHeight:"62vh" }}>
        <p className="font-bn text-sm text-gray-600 leading-relaxed">{proj.desc}</p>

        {/* info grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon:"💰", label:"মোট বাজেট",    val: fmtTaka(proj.budget)    },
            { icon:"💸", label:"ব্যয়িত",        val: fmtTaka(proj.spent)     },
            { icon:"💹", label:"অবশিষ্ট",        val: fmtTaka(proj.budget - proj.spent) },
            { icon:"👥", label:"সুবিধাভোগী",   val: `${proj.beneficiary} জন` },
            { icon:"📅", label:"শুরু",          val: proj.startDate          },
            { icon:"🏁", label:"সমাপ্তি",        val: proj.endDate            },
            { icon:"📍", label:"জেলা",          val: proj.district           },
            { icon:"👤", label:"প্রকল্প প্রধান", val: proj.lead              },
            { icon:"🏦", label:"ফান্ডিং",        val: proj.funder            },
          ].map(s=>(
            <div key={s.label} className="bg-green-50/60 rounded-xl px-3 py-2.5">
              <p className="font-bn text-xs text-gray-400">{s.icon} {s.label}</p>
              <p className="font-bn text-sm font-bold text-green-800 mt-0.5 break-words leading-snug">{s.val}</p>
            </div>
          ))}
        </div>

        {/* budget bar */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="font-bn text-xs text-gray-400">বাজেট ব্যবহার ({spentPct.toFixed(0)}%)</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bar-anim"
              style={{ "--w":`${spentPct}%`, width:`${spentPct}%`, background:`linear-gradient(90deg,${cc},${cc}77)` }} />
          </div>
        </div>

        {/* milestones */}
        {proj.milestones?.length > 0 && (
          <div>
            <p className="font-bn text-xs font-semibold text-green-800 mb-2.5">মাইলস্টোন</p>
            <div className="flex flex-col gap-2">
              {proj.milestones.map((m,i)=>{
                const done = m.includes("✓");
                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${done?"bg-green-50":"bg-gray-50"}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${done?"text-white":"border-2 border-gray-300"}`}
                      style={done?{background:cc}:{}}>
                      {done?"✓":""}
                    </div>
                    <span className={`font-bn text-sm ${done?"text-green-700 font-semibold":"text-gray-500"}`}>
                      {m.replace(" ✓","").replace(" ◌","")}
                    </span>
                    <span className="ml-auto font-bn text-xs">{done?"✅":"⏳"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* tags */}
        {proj.tags?.length > 0 && (
          <div>
            <p className="font-bn text-xs font-semibold text-green-800 mb-2">ট্যাগ</p>
            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map(t=>(
                <span key={t} className="font-bn text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
            বন্ধ করুন
          </button>
          <button onClick={()=>{onClose();onEdit(proj);}}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all"
            style={{ background:`linear-gradient(135deg,${cc}cc,${cc})`, boxShadow:`0 4px 14px ${cc}44` }}>
            ✎ সম্পাদনা করুন
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Form Modal ─────────────────────────────────────────────────── */
function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({
    ...initial,
    milestones: [...(initial.milestones||[])],
    tags: [...(initial.tags||[])],
  });
  const [msInput,  setMsInput]  = useState("");
  const [tagInput, setTagInput] = useState("");
  const isEdit = !!initial.id;
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const cc = CAT_COLOR[form.category]||"#16a34a";

  const addMs  = ()=>{ const t=msInput.trim(); if(t){ set("milestones",[...form.milestones, t+" ◌"]); setMsInput(""); } };
  const rmMs   = (i)=> set("milestones", form.milestones.filter((_,j)=>j!==i));
  const toggleMs=(i)=> set("milestones", form.milestones.map((m,j)=>j!==i?m: m.includes("✓")?m.replace(" ✓"," ◌"):m.replace(" ◌"," ✓")));
  const addTag = ()=>{ const t=tagInput.trim(); if(t&&!form.tags.includes(t)){set("tags",[...form.tags,t]);} setTagInput(""); };
  const rmTag  = (t)=> set("tags", form.tags.filter(x=>x!==t));

  const fc = "font-bn w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white transition-all";
  const lc = "font-bn block text-xs font-semibold text-green-800 mb-1.5";

  return (
    <Modal onClose={onClose}>
      {/* header */}
      <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background:`${cc}22` }}>{form.icon}</div>
          <p className="font-dis text-green-900 font-bold text-lg">
            {isEdit ? "প্রকল্প সম্পাদনা" : "নতুন প্রকল্প যোগ করুন"}
          </p>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm cursor-pointer border-0">✕</button>
      </div>

      {/* body */}
      <div className="px-7 py-5 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight:"66vh" }}>

        {/* icon picker */}
        <div>
          <label className={lc}>আইকন</label>
          <div className="flex flex-wrap gap-2">
            {ICONS.map(ic=>(
              <button key={ic} onClick={()=>set("icon",ic)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center cursor-pointer border-2 transition-all
                  ${form.icon===ic?"border-green-500 bg-green-50 scale-110":"border-gray-100 bg-gray-50 hover:border-green-300"}`}>
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* title */}
        <div>
          <label className={lc}>প্রকল্পের নাম *</label>
          <input value={form.title} onChange={e=>set("title",e.target.value)}
            placeholder="প্রকল্পের নাম লিখুন" className={fc} />
        </div>

        {/* category + status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>বিভাগ</label>
            <select value={form.category} onChange={e=>set("category",e.target.value)} className={fc}>
              {CATEGORIES.filter(c=>c!=="সব").map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>অবস্থা</label>
            <select value={form.status} onChange={e=>set("status",e.target.value)} className={fc}>
              {STATUSES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* funder + district */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>ফান্ডিং উৎস</label>
            <select value={form.funder} onChange={e=>set("funder",e.target.value)} className={fc}>
              <option value="">নির্বাচন করুন</option>
              {FUNDERS.map(f=><option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>জেলা</label>
            <select value={form.district} onChange={e=>set("district",e.target.value)} className={fc}>
              {DISTRICTS.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* budget + spent */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>মোট বাজেট (টাকা)</label>
            <input type="number" value={form.budget} onChange={e=>set("budget",Number(e.target.value))}
              placeholder="যেমন: 500000" className={fc} />
          </div>
          <div>
            <label className={lc}>ব্যয়িত (টাকা)</label>
            <input type="number" value={form.spent} onChange={e=>set("spent",Number(e.target.value))}
              placeholder="যেমন: 250000" className={fc} />
          </div>
        </div>

        {/* beneficiary + lead */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>সুবিধাভোগী সংখ্যা</label>
            <input type="number" value={form.beneficiary} onChange={e=>set("beneficiary",Number(e.target.value))}
              placeholder="যেমন: 300" className={fc} />
          </div>
          <div>
            <label className={lc}>প্রকল্প প্রধান</label>
            <input value={form.lead} onChange={e=>set("lead",e.target.value)} placeholder="নাম লিখুন" className={fc} />
          </div>
        </div>

        {/* dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>শুরুর তারিখ</label>
            <input value={form.startDate} onChange={e=>set("startDate",e.target.value)} placeholder="যেমন: জানু, ২০২৪" className={fc} />
          </div>
          <div>
            <label className={lc}>সমাপ্তির তারিখ</label>
            <input value={form.endDate} onChange={e=>set("endDate",e.target.value)} placeholder="যেমন: ডিসে, ২০২৫" className={fc} />
          </div>
        </div>

        {/* progress */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className={lc + " mb-0"}>অগ্রগতি</label>
            <span className="font-bn text-xs font-bold" style={{ color:cc }}>{form.progress}%</span>
          </div>
          <input type="range" min={0} max={100} value={form.progress}
            onChange={e=>set("progress",Number(e.target.value))}
            className="w-full accent-green-500 cursor-pointer" />
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1.5">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width:`${form.progress}%`, background:`linear-gradient(90deg,${cc},${cc}88)` }} />
          </div>
        </div>

        {/* description */}
        <div>
          <label className={lc}>বিবরণ</label>
          <textarea value={form.desc} onChange={e=>set("desc",e.target.value)}
            rows={3} placeholder="প্রকল্পের বিস্তারিত বিবরণ…" className={`${fc} resize-none`} />
        </div>

        {/* milestones */}
        <div>
          <label className={lc}>মাইলস্টোন</label>
          <div className="flex gap-2 mb-2">
            <input value={msInput} onChange={e=>setMsInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addMs()}
              placeholder="মাইলস্টোন লিখুন ও Enter চাপুন" className={`${fc} flex-1`} />
            <button onClick={addMs}
              className="font-bn px-4 py-2 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer flex-shrink-0"
              style={{ background:`linear-gradient(135deg,${cc}cc,${cc})` }}>যোগ</button>
          </div>
          {form.milestones.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {form.milestones.map((m,i)=>{
                const done = m.includes("✓");
                const label = m.replace(" ✓","").replace(" ◌","");
                return (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${done?"bg-green-50":"bg-gray-50"}`}>
                    <button onClick={()=>toggleMs(i)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer border-0 flex-shrink-0 transition-all ${done?"text-white":"border-2 border-gray-300 bg-transparent"}`}
                      style={done?{background:cc}:{}}>
                      {done?"✓":""}
                    </button>
                    <span className={`font-bn text-xs flex-1 ${done?"text-green-700":"text-gray-500"}`}>{label}</span>
                    <button onClick={()=>rmMs(i)}
                      className="font-bn text-xs text-red-400 hover:text-red-600 border-0 bg-transparent cursor-pointer">✕</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* tags */}
        <div>
          <label className={lc}>ট্যাগ</label>
          <div className="flex gap-2 mb-2">
            <input value={tagInput} onChange={e=>setTagInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addTag()}
              placeholder="ট্যাগ লিখুন ও Enter চাপুন" className={`${fc} flex-1`} />
            <button onClick={addTag}
              className="font-bn px-4 py-2 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer flex-shrink-0"
              style={{ background:`linear-gradient(135deg,${cc}cc,${cc})` }}>যোগ</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {form.tags.map(t=>(
              <span key={t} className="font-bn inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                {t}
                <button onClick={()=>rmTag(t)} className="ml-0.5 text-green-500 hover:text-red-500 border-0 bg-transparent cursor-pointer text-xs">✕</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="px-7 py-4 border-t border-gray-50 flex gap-3">
        <button onClick={onClose}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
          বাতিল
        </button>
        <button disabled={!form.title.trim()} onClick={()=>form.title.trim()&&onSave(form)}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
          {isEdit ? "আপডেট করুন ✓" : "যোগ করুন ✓"}
        </button>
      </div>
    </Modal>
  );
}

/* ── Delete Confirm ─────────────────────────────────────────────── */
function DeleteModal({ proj, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">🗑️</div>
        <p className="font-dis text-green-900 font-bold text-xl">নিশ্চিত করুন</p>
        <p className="font-bn text-gray-500 text-sm leading-relaxed">
          <span className="font-bold text-green-800">"{proj.title}"</span> প্রকল্পটি মুছে ফেলবেন?
          <br/>এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
        </p>
        <div className="flex gap-3 w-full">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
            বাতিল
          </button>
          <button onClick={onConfirm}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer"
            style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)", boxShadow:"0 4px 14px rgba(239,68,68,.35)" }}>
            হ্যাঁ, মুছুন
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Stats strip ────────────────────────────────────────────────── */
function StatsStrip({ projects }) {
  const active   = projects.filter(p=>p.status==="চলমান").length;
  const done     = projects.filter(p=>p.status==="সম্পন্ন").length;
  const totalBen = projects.reduce((a,p)=>a+(Number(p.beneficiary)||0),0);
  const totalBudget = projects.reduce((a,p)=>a+(Number(p.budget)||0),0);
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon:"📋", label:"মোট প্রকল্প",     val: projects.length,                    color:"#16a34a", bg:"bg-green-50"  },
        { icon:"🟢", label:"চলমান",            val: active,                             color:"#22c55e", bg:"bg-emerald-50"},
        { icon:"✅", label:"সম্পন্ন",           val: done,                               color:"#3b82f6", bg:"bg-blue-50"  },
        { icon:"💰", label:"মোট বাজেট",        val: fmtTaka(totalBudget),               color:"#f59e0b", bg:"bg-amber-50" },
      ].map((s,i)=>(
        <div key={i} className={`au ${s.bg} rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm`}
          style={{ animationDelay:`${i*55}ms` }}>
          <span className="text-2xl">{s.icon}</span>
          <div>
            <p className="font-dis font-bold text-2xl leading-none cu" style={{ color:s.color }}>{s.val}</p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Funding breakdown sidebar ──────────────────────────────────── */
function FundingBreakdown({ projects }) {
  const counts = {};
  projects.forEach(p=>{ if(p.funder) counts[p.funder]=(counts[p.funder]||0)+1; });
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const max = Math.max(...Object.values(counts), 1);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"300ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">ফান্ডিং উৎস</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([funder,count])=>(
          <div key={funder} className="flex items-center gap-2.5">
            <span className="font-bn text-xs text-gray-500 w-24 flex-shrink-0 truncate text-right">{funder}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 bar-anim"
                style={{ "--w":`${(count/max)*100}%`, width:`${(count/max)*100}%`, background:"linear-gradient(90deg,#16a34a,#4ade80)" }} />
            </div>
            <span className="font-bn text-xs font-bold text-green-700 w-4">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── StatusBreakdown ────────────────────────────────────────────── */
function StatusBreakdown({ projects }) {
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"360ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">অবস্থা অনুযায়ী</p>
      <div className="flex flex-col gap-2.5">
        {STATUSES.map(s=>{
          const cnt = projects.filter(p=>p.status===s).length;
          const m = STATUS_META[s];
          return (
            <div key={s} className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.dot}`} />
              <span className="font-bn text-xs text-gray-500 flex-1">{s}</span>
              <span className={`font-bn text-xs font-bold px-2.5 py-0.5 rounded-full ${m.bg} ${m.text}`}>{cnt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Toast ──────────────────────────────────────────────────────── */
function Toast({ msg, color }) {
  return (
    <div className="ti fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bn text-sm font-semibold"
      style={{ background:color }}>
      ✓ {msg}
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────── */
export default function ProjectsContent() {
  const [projects,  setProjects]  = useState(SEED_PROJECTS);
  const [search,    setSearch]    = useState("");
  const [catFlt,    setCatFlt]    = useState("সব");
  const [statusFlt, setStatusFlt] = useState("সব");
  const [sortBy,    setSortBy]    = useState("default");
  const [viewMode,  setViewMode]  = useState("grid");
  const [modal,     setModal]     = useState(null);
  const [toast,     setToast]     = useState(null);

  const fire = (msg, color="#16a34a") => {
    setToast({ msg, color });
    setTimeout(()=>setToast(null), 3000);
  };

  const handleSave = (form) => {
    if (form.id) {
      setProjects(ps=>ps.map(p=>p.id===form.id?form:p));
      fire(`"${form.title}" আপডেট হয়েছে ✓`);
    } else {
      setProjects(ps=>[{ ...form, id:Date.now() }, ...ps]);
      fire(`"${form.title}" প্রকল্প যোগ হয়েছে 🎉`);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    const name = projects.find(p=>p.id===id)?.title;
    setProjects(ps=>ps.filter(p=>p.id!==id));
    fire(`"${name}" মুছে ফেলা হয়েছে`, "#ef4444");
    setModal(null);
  };

  const filtered = useMemo(()=>
    projects
      .filter(p => catFlt==="সব" || p.category===catFlt)
      .filter(p => statusFlt==="সব" || p.status===statusFlt)
      .filter(p => !search || p.title.includes(search)||p.lead.includes(search)||p.funder.includes(search)||p.district.includes(search))
      .sort((a,b)=>{
        if(sortBy==="progress")    return b.progress-a.progress;
        if(sortBy==="budget")      return b.budget-a.budget;
        if(sortBy==="beneficiary") return b.beneficiary-a.beneficiary;
        return 0;
      }),
    [projects, catFlt, statusFlt, search, sortBy]
  );

  return (
    <>
      <Fonts />
      <div className="font-bn min-h-screen bg-green-50/30 p-6 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="au flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-bn text-green-500 text-xs uppercase tracking-widest mb-1">উৎকর্ষ ফাউন্ডেশন</p>
            <h1 className="font-dis text-green-900 text-3xl font-bold leading-tight">প্রকল্প ব্যবস্থাপনা</h1>
            <p className="font-bn text-gray-400 text-sm mt-1">সকল প্রকল্পের অগ্রগতি পর্যবেক্ষণ ও পরিচালনা</p>
          </div>
          <button onClick={()=>setModal({type:"add"})}
            className="font-bn flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background:"linear-gradient(135deg,#14532d,#22c55e)", boxShadow:"0 6px 20px rgba(22,163,74,.35)" }}>
            <span className="text-lg">＋</span> নতুন প্রকল্প
          </button>
        </div>

        {/* ── Stats ── */}
        <StatsStrip projects={projects} />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-4 gap-5 items-start">

          {/* left 3 cols */}
          <div className="col-span-3 flex flex-col gap-5">

            {/* filter bar */}
            <div className="au bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center" style={{ animationDelay:"220ms" }}>
              <div className="relative flex-1 min-w-48">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="নাম, জেলা, ফান্ডার…"
                  className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 transition-all" />
              </div>
              <select value={statusFlt} onChange={e=>setStatusFlt(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব অবস্থা</option>
                {STATUSES.map(s=><option key={s}>{s}</option>)}
              </select>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="default">ডিফল্ট</option>
                <option value="progress">অগ্রগতি</option>
                <option value="budget">বাজেট</option>
                <option value="beneficiary">সুবিধাভোগী</option>
              </select>
              <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
                {[["grid","⊞"],["list","☰"]].map(([m,ic])=>(
                  <button key={m} onClick={()=>setViewMode(m)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer border-0 transition-all
                      ${viewMode===m?"bg-white shadow text-green-700":"bg-transparent text-gray-400 hover:text-gray-600"}`}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* category chips */}
            <div className="au flex flex-wrap gap-2" style={{ animationDelay:"260ms" }}>
              {CATEGORIES.map(c=>(
                <button key={c} onClick={()=>setCatFlt(c)}
                  className={`font-bn text-xs font-semibold px-4 py-2 rounded-full cursor-pointer border transition-all
                    ${catFlt===c?"text-white border-transparent":"bg-white border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700 shadow-sm"}`}
                  style={catFlt===c ? { background:`linear-gradient(135deg,${CAT_COLOR[c]||"#15803d"}cc,${CAT_COLOR[c]||"#22c55e"})`, boxShadow:`0 2px 8px ${CAT_COLOR[c]||"#16a34a"}44` } : {}}>
                  {c}
                </button>
              ))}
            </div>

            {/* count */}
            {(search||catFlt!=="সব"||statusFlt!=="সব") && (
              <p className="font-bn text-xs text-gray-400 -mt-2">{filtered.length} টি প্রকল্প পাওয়া গেছে</p>
            )}

            {/* ── GRID VIEW ── */}
            {viewMode==="grid" && (
              filtered.length > 0 ? (
                <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))" }}>
                  {filtered.map((p,i)=>(
                    <ProjectCard key={p.id} proj={p} delay={i*50}
                      onView={pr=>setModal({type:"view",proj:pr})}
                      onEdit={pr=>setModal({type:"edit",proj:pr})}
                      onDelete={pr=>setModal({type:"delete",proj:pr})} />
                  ))}
                </div>
              ) : (
                <div className="si bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center py-20 gap-4">
                  <span className="text-5xl opacity-25">🔍</span>
                  <p className="font-dis text-green-800 text-xl font-bold">কোনো প্রকল্প পাওয়া যায়নি</p>
                  <button onClick={()=>{setSearch("");setCatFlt("সব");setStatusFlt("সব");}}
                    className="font-bn text-sm font-semibold text-green-600 border border-green-200 px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
                    ফিল্টার মুছুন
                  </button>
                </div>
              )
            )}

            {/* ── LIST VIEW ── */}
            {viewMode==="list" && (
              <div className="au bg-white rounded-2xl shadow-sm overflow-hidden" style={{ animationDelay:"300ms" }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["প্রকল্প","বিভাগ","অবস্থা","অগ্রগতি","বাজেট","সুবিধাভোগী",""].map(h=>(
                        <th key={h} className="font-bn text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p,i)=>{
                      const cc2 = CAT_COLOR[p.category]||"#16a34a";
                      return (
                        <tr key={p.id}
                          className="border-t border-gray-50 hover:bg-green-50/40 transition-colors cursor-pointer"
                          onClick={()=>setModal({type:"view",proj:p})}>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-gray-50 flex-shrink-0">{p.icon}</div>
                              <div>
                                <p className="font-bn text-sm font-semibold text-green-900 leading-tight">{p.title}</p>
                                <p className="font-bn text-xs text-gray-400 mt-0.5">{p.district} · {p.lead}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-bn text-xs px-2.5 py-1 rounded-full text-white font-semibold"
                              style={{ background:cc2 }}>{p.category}</span>
                          </td>
                          <td className="px-4 py-3.5"><StatusChip s={p.status} /></td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2 min-w-24">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full"
                                  style={{ width:`${p.progress}%`, background:`linear-gradient(90deg,${cc2},${cc2}88)` }} />
                              </div>
                              <span className="font-bn text-xs font-bold" style={{ color:cc2 }}>{p.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 font-bn text-sm font-bold text-green-700">{fmtTaka(p.budget)}</td>
                          <td className="px-4 py-3.5 font-bn text-sm text-gray-500">{p.beneficiary} জন</td>
                          <td className="px-4 py-3.5">
                            <div className="flex gap-1.5" onClick={e=>e.stopPropagation()}>
                              <button onClick={()=>setModal({type:"edit",proj:p})}
                                className="font-bn text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">✎</button>
                              <button onClick={()=>setModal({type:"delete",proj:p})}
                                className="font-bn text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">🗑</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length===0 && (
                  <div className="flex flex-col items-center py-14 gap-3">
                    <span className="text-4xl opacity-20">🔍</span>
                    <p className="font-bn text-gray-400 text-sm">কোনো প্রকল্প পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="col-span-1 flex flex-col gap-4 sticky top-4">
            <FundingBreakdown  projects={projects} />
            <StatusBreakdown   projects={projects} />

            {/* top progress */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"420ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">সর্বোচ্চ অগ্রগতি</p>
              <div className="flex flex-col gap-3">
                {[...projects].sort((a,b)=>b.progress-a.progress).slice(0,4).map(p=>{
                  const cc3 = CAT_COLOR[p.category]||"#16a34a";
                  return (
                    <div key={p.id} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base bg-gray-50 flex-shrink-0">{p.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bn text-xs font-semibold text-green-900 truncate">{p.title}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width:`${p.progress}%`, background:cc3 }} />
                          </div>
                          <span className="font-bn text-xs font-bold flex-shrink-0" style={{ color:cc3 }}>{p.progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type==="view"   && <ViewModal   proj={modal.proj} onClose={()=>setModal(null)} onEdit={p=>setModal({type:"edit",proj:p})} />}
      {(modal?.type==="add"||modal?.type==="edit") && (
        <FormModal initial={modal.type==="edit"?modal.proj:EMPTY_FORM} onClose={()=>setModal(null)} onSave={handleSave} />
      )}
      {modal?.type==="delete" && <DeleteModal proj={modal.proj} onClose={()=>setModal(null)} onConfirm={()=>handleDelete(modal.proj.id)} />}

      {toast && <Toast msg={toast.msg} color={toast.color} />}
    </>
  );
}