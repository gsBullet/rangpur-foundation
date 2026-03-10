import { useState, useMemo } from "react";

/* ── Fonts & Keyframes ──────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    .font-bn  { font-family:'Hind Siliguri',sans-serif !important }
    .font-dis { font-family:'Tiro Bangla',serif !important }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(.93)}       to{opacity:1;transform:scale(1)}     }
    @keyframes modalIn   { from{opacity:0;transform:translateY(26px) scale(.97)} to{opacity:1;transform:none} }
    @keyframes overlayIn { from{opacity:0} to{opacity:1} }
    @keyframes toastIn   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
    @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
    @keyframes shimmer   { 0%{background-position:-700px 0} 100%{background-position:700px 0} }
    @keyframes quoteIn   { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:none} }
    @keyframes starPop   { 0%{transform:scale(0) rotate(-20deg)} 80%{transform:scale(1.2) rotate(4deg)} 100%{transform:scale(1) rotate(0)} }

    .au  { animation:fadeUp    .5s  cubic-bezier(.22,.68,0,1.1)  both }
    .si  { animation:scaleIn   .38s cubic-bezier(.22,.68,0,1.2)  both }
    .mi  { animation:modalIn   .42s cubic-bezier(.22,.68,0,1.15) both }
    .ov  { animation:overlayIn .22s ease both }
    .ti  { animation:toastIn   .38s cubic-bezier(.22,.68,0,1.2)  both }
    .qi  { animation:quoteIn   .5s  cubic-bezier(.22,.68,0,1.1)  both }
    .sp  { animation:starPop   .4s  cubic-bezier(.22,.68,0,1.3)  both }

    .float { animation:floatUp 4s ease-in-out infinite }

    .card-lift { transition:transform .24s,box-shadow .24s }
    .card-lift:hover { transform:translateY(-6px); box-shadow:0 24px 56px rgba(0,0,0,.11)!important }

    .shimmer-line {
      background:linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%);
      background-size:700px 100%; animation:shimmer 1.5s infinite linear;
      border-radius:6px;
    }

    input:focus,textarea:focus,select:focus{
      outline:none;border-color:#16a34a!important;
      box-shadow:0 0 0 3px rgba(22,163,74,.14)!important;
    }
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:#86efac;border-radius:4px}

    .quote-mark {
      font-family:'Tiro Bangla',serif;
      font-size:6rem; line-height:1; color:#16a34a;
      opacity:.12; position:absolute; top:-8px; left:12px;
      pointer-events:none; user-select:none;
    }

    .tag-x { transition:color .15s }
    .tag-x:hover { color:#ef4444 }
  `}</style>
);

/* ── Constants ──────────────────────────────────────────────────── */
const PROGRAMS  = ["শিক্ষা","স্বাস্থ্য","নারী উন্নয়ন","শিশু","পরিবেশ","আইনি সহায়তা","বেকারত্ব","সাধারণ"];
const DISTRICTS = ["রংপুর সদর","গাইবান্ধা","কুড়িগ্রাম","দিনাজপুর","নীলফামারী","লালমনিরহাট","ঠাকুরগাঁও","পঞ্চগড়"];
const GENDERS   = ["পুরুষ","নারী","অন্যান্য"];
const STATUSES  = ["প্রকাশিত","খসড়া","পর্যালোচনাধীন"];
const IMPACTS   = ["উচ্চ","মধ্যম","সাধারণ"];

const CAT_COLOR = {
  "শিক্ষা":"#16a34a","স্বাস্থ্য":"#0ea5e9","নারী উন্নয়ন":"#d946ef",
  "শিশু":"#f97316","পরিবেশ":"#10b981","আইনি সহায়তা":"#8b5cf6",
  "বেকারত্ব":"#eab308","সাধারণ":"#64748b",
};

const STATUS_META = {
  "প্রকাশিত":      { bg:"bg-green-100",  text:"text-green-700",  dot:"bg-green-500"  },
  "খসড়া":          { bg:"bg-gray-100",   text:"text-gray-600",   dot:"bg-gray-400"   },
  "পর্যালোচনাধীন": { bg:"bg-amber-100",  text:"text-amber-700",  dot:"bg-amber-400"  },
};

const IMPACT_META = {
  "উচ্চ":   { bg:"bg-red-100",   text:"text-red-700",   icon:"🔥" },
  "মধ্যম":  { bg:"bg-amber-100", text:"text-amber-700", icon:"⭐" },
  "সাধারণ": { bg:"bg-blue-100",  text:"text-blue-700",  icon:"💫" },
};

const BG_GRADIENTS = [
  "from-green-50 via-emerald-50 to-teal-50",
  "from-sky-50 via-blue-50 to-indigo-50",
  "from-fuchsia-50 via-pink-50 to-rose-50",
  "from-amber-50 via-orange-50 to-yellow-50",
  "from-violet-50 via-purple-50 to-indigo-50",
  "from-teal-50 via-cyan-50 to-sky-50",
];

const AVATARS_F = ["👩","👧","🧕","👩‍🎓","👩‍⚕️","👩‍🌾"];
const AVATARS_M = ["👨","👦","🧔","👨‍🎓","👨‍⚕️","👨‍🌾"];

/* ── Seed stories ───────────────────────────────────────────────── */
const SEED = [
  {
    id:1, status:"প্রকাশিত", impact:"উচ্চ", featured:true,
    name:"রহিমা বেগম", age:32, gender:"নারী", district:"রংপুর সদর", program:"নারী উন্নয়ন",
    avatar:"👩‍🌾", date:"১৫ জানুয়ারি, ২০২৫",
    title:"সেলাই শিখে স্বপ্নের উদ্যোক্তা",
    quote:"আগে ভাবতাম জীবনটা শুধু সংসার করেই কাটবে। এখন আমার নিজের ছোট ব্যবসা আছে।",
    story:"রংপুরের তারাগঞ্জ উপজেলার রহিমা বেগম এক সময় সংসারের টানাপোড়েনে কষ্ট করতেন। উৎকর্ষ ফাউন্ডেশনের নারী উদ্যোক্তা প্রকল্পে যোগ দিয়ে সেলাই ও হস্তশিল্প প্রশিক্ষণ পান। আজ তিনি মাসে ৮,০০০–১২,০০০ টাকা আয় করেন এবং ৩ জনকে কাজে রেখেছেন।",
    beforeAfter:{ before:"মাসিক আয় শূন্য", after:"মাসিক আয় ১২,০০০ টাকা" },
    tags:["উদ্যোক্তা","সেলাই","নারী ক্ষমতায়ন"],
    views:842, likes:234,
  },
  {
    id:2, status:"প্রকাশিত", impact:"উচ্চ", featured:true,
    name:"মো. জাকির হোসেন", age:17, gender:"পুরুষ", district:"গাইবান্ধা", program:"শিক্ষা",
    avatar:"👦", date:"২০ ফেব্রুয়ারি, ২০২৫",
    title:"বৃত্তি পেয়ে মেডিক্যালের স্বপ্ন বাস্তব",
    quote:"টাকার অভাবে পড়া ছেড়ে দিতে হবে মনে করেছিলাম। বৃত্তি পেয়ে এখন SSC-তে A+ পেয়েছি।",
    story:"গাইবান্ধার সুন্দরগঞ্জ উপজেলার দিনমজুরের ছেলে জাকির। উৎকর্ষের শিক্ষা বৃত্তি ও কোচিং সুবিধায় SSC-তে A+ পেয়ে এলাকায় আলোচনার কেন্দ্রবিন্দু হয়েছে। এখন সে মেডিকেলে ভর্তির স্বপ্ন দেখছে।",
    beforeAfter:{ before:"পড়া ছেড়ে দেওয়ার পথে", after:"SSC-তে A+ অর্জন" },
    tags:["শিক্ষা","বৃত্তি","মেধাবী"],
    views:1204, likes:389,
  },
  {
    id:3, status:"প্রকাশিত", impact:"মধ্যম", featured:false,
    name:"করিমুল হক", age:45, gender:"পুরুষ", district:"কুড়িগ্রাম", program:"পরিবেশ",
    avatar:"👨‍🌾", date:"৫ মার্চ, ২০২৫",
    title:"জৈব চাষে বদলে গেল জীবন",
    quote:"রাসায়নিক সার ছেড়ে জৈব পদ্ধতিতে চাষ শুরু করে আমার লাভ তিনগুণ হয়েছে।",
    story:"কুড়িগ্রামের উলিপুর উপজেলার কৃষক করিমুল। উৎকর্ষের কৃষি প্রশিক্ষণ কার্যক্রমে অংশ নিয়ে জৈব চাষ শিখেছেন। এখন তিনি জেলার সেরা জৈব কৃষক হিসেবে পরিচিত এবং অন্য কৃষকদেরও প্রশিক্ষণ দিচ্ছেন।",
    beforeAfter:{ before:"বিঘা প্রতি ৩,০০০ টাকা লাভ", after:"বিঘা প্রতি ৯,০০০ টাকা লাভ" },
    tags:["কৃষি","জৈব","পরিবেশ"],
    views:567, likes:145,
  },
  {
    id:4, status:"পর্যালোচনাধীন", impact:"মধ্যম", featured:false,
    name:"সুমাইয়া আক্তার", age:28, gender:"নারী", district:"নীলফামারী", program:"স্বাস্থ্য",
    avatar:"👩‍⚕️", date:"১২ মার্চ, ২০২৫",
    title:"বিনামূল্যে চিকিৎসায় সুস্থ মা ও শিশু",
    quote:"ডাক্তার দেখানোর টাকা ছিল না। ফাউন্ডেশনের ক্যাম্পে এসে বিনামূল্যে চিকিৎসা পেলাম।",
    story:"নীলফামারীর জলঢাকা উপজেলার সুমাইয়া গর্ভকালীন জটিলতায় ভুগছিলেন। উৎকর্ষের বিনামূল্যে স্বাস্থ্যসেবায় সময়মতো চিকিৎসা পেয়ে সুস্থ সন্তান জন্ম দেন।",
    beforeAfter:{ before:"গর্ভকালীন জটিলতায় ঝুঁকি", after:"সুস্থ মা ও শিশু" },
    tags:["স্বাস্থ্য","মাতৃসেবা","শিশু"],
    views:320, likes:98,
  },
  {
    id:5, status:"খসড়া", impact:"সাধারণ", featured:false,
    name:"আবু সালেহ", age:38, gender:"পুরুষ", district:"দিনাজপুর", program:"বেকারত্ব",
    avatar:"👨", date:"২ এপ্রিল, ২০২৫",
    title:"আইটি প্রশিক্ষণে ফ্রিল্যান্সার",
    quote:"চাকরি না পেয়ে হতাশ ছিলাম। ফ্রিল্যান্সিং শিখে এখন ঘরে বসেই ডলার আয় করি।",
    story:"দিনাজপুরের বিরল উপজেলার আবু সালেহ বহু বছর বেকার ছিলেন। উৎকর্ষের যুব কর্মসংস্থান প্রকল্পে আইটি ও ফ্রিল্যান্সিং প্রশিক্ষণ নিয়ে এখন মাসে ২৫,০০০+ টাকা আয় করছেন।",
    beforeAfter:{ before:"৩ বছর বেকার", after:"মাসে ২৫,০০০+ টাকা আয়" },
    tags:["ফ্রিল্যান্সিং","আইটি","কর্মসংস্থান"],
    views:0, likes:0,
  },
];

const EMPTY_FORM = {
  status:"খসড়া", impact:"মধ্যম", featured:false,
  name:"", age:"", gender:"নারী", district:"রংপুর সদর", program:"শিক্ষা",
  avatar:"👩", date:"",
  title:"", quote:"", story:"",
  beforeAfter:{ before:"", after:"" },
  tags:[], views:0, likes:0,
};

const ALL_AVATARS = [...AVATARS_F, ...AVATARS_M];

/* ── Chips ──────────────────────────────────────────────────────── */
const StatusChip = ({ s }) => {
  const m = STATUS_META[s] ?? STATUS_META["খসড়া"];
  return (
    <span className={`font-bn inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{s}
    </span>
  );
};

const ImpactChip = ({ i }) => {
  const m = IMPACT_META[i] ?? IMPACT_META["সাধারণ"];
  return (
    <span className={`font-bn inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      {m.icon} {i}
    </span>
  );
};

/* ── Star rating (read-only) ────────────────────────────────────── */
const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-sm sp" style={{ animationDelay:`${i*60}ms`, color: i < n ? "#f59e0b" : "#e5e7eb" }}>★</span>
    ))}
  </div>
);

/* ── Story Card ─────────────────────────────────────────────────── */
function StoryCard({ story, delay, onView, onEdit, onDelete, onToggleFeatured }) {
  const cc  = CAT_COLOR[story.program] || "#16a34a";
  const bg  = BG_GRADIENTS[story.id % BG_GRADIENTS.length];

  return (
    <div className="au card-lift bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
      style={{ animationDelay:`${delay}ms` }}>

      {/* accent bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg,${cc},${cc}66)` }} />

      {/* header gradient */}
      <div className={`relative bg-gradient-to-br ${bg} px-5 pt-5 pb-4`}>
        {/* featured badge */}
        {story.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-white text-xs font-bold px-2.5 py-1 rounded-full font-bn shadow-sm">
            ⭐ ফিচার্ড
          </div>
        )}

        <div className="flex items-start gap-3">
          {/* avatar */}
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl flex-shrink-0">
            {story.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-dis text-green-900 font-bold text-base leading-tight truncate">{story.name}</p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">{story.age} বছর · {story.district}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold"
                style={{ background: cc }}>{story.program}</span>
              <StatusChip s={story.status} />
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4 flex flex-col gap-3 flex-1">
        {/* title */}
        <p className="font-dis text-green-900 font-bold text-base leading-snug">{story.title}</p>

        {/* quote */}
        <div className="relative bg-green-50/60 rounded-xl px-4 py-3 border-l-2 border-green-300">
          <p className="font-bn text-sm text-gray-600 italic leading-relaxed line-clamp-2">"{story.quote}"</p>
        </div>

        {/* before/after */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-50 rounded-xl px-3 py-2">
            <p className="font-bn text-xs text-red-400 font-semibold mb-1">📉 আগে</p>
            <p className="font-bn text-xs text-red-700 font-bold leading-tight">{story.beforeAfter.before}</p>
          </div>
          <div className="bg-green-50 rounded-xl px-3 py-2">
            <p className="font-bn text-xs text-green-500 font-semibold mb-1">📈 পরে</p>
            <p className="font-bn text-xs text-green-700 font-bold leading-tight">{story.beforeAfter.after}</p>
          </div>
        </div>

        {/* tags */}
        {story.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {story.tags.map(t => (
              <span key={t} className="font-bn text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>
            ))}
          </div>
        )}

        {/* meta row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <span className="font-bn text-xs text-gray-400">👁 {story.views.toLocaleString()}</span>
            <span className="font-bn text-xs text-gray-400">❤️ {story.likes.toLocaleString()}</span>
          </div>
          <ImpactChip i={story.impact} />
        </div>

        <p className="font-bn text-xs text-gray-400">{story.date}</p>
      </div>

      {/* footer */}
      <div className="px-5 py-3 border-t border-gray-50 flex gap-2">
        <button onClick={() => onView(story)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
          পূর্ণ গল্প
        </button>
        <button onClick={() => onEdit(story)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">
          ✎ সম্পাদনা
        </button>
        <button onClick={() => onToggleFeatured(story.id)}
          title={story.featured ? "ফিচার্ড সরান" : "ফিচার্ড করুন"}
          className={`font-bn text-xs font-semibold px-3 py-2 rounded-xl border transition-colors cursor-pointer bg-transparent
            ${story.featured ? "border-amber-300 text-amber-600 hover:bg-amber-50" : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}>
          ⭐
        </button>
        <button onClick={() => onDelete(story)}
          className="font-bn text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
          🗑
        </button>
      </div>
    </div>
  );
}

/* ── Modal Shell ────────────────────────────────────────────────── */
function Modal({ onClose, wide, children }) {
  return (
    <div className="ov fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,.5)", backdropFilter:"blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`mi bg-white rounded-3xl shadow-2xl overflow-hidden w-full ${wide ? "max-w-2xl" : "max-w-lg"}`}>
        {children}
      </div>
    </div>
  );
}

/* ── View Modal ─────────────────────────────────────────────────── */
function ViewModal({ story, onClose, onEdit }) {
  const cc = CAT_COLOR[story.program] || "#16a34a";
  const bg = BG_GRADIENTS[story.id % BG_GRADIENTS.length];

  return (
    <Modal onClose={onClose} wide>
      {/* hero */}
      <div className={`relative bg-gradient-to-br ${bg} px-8 pt-7 pb-6`} style={{ borderBottom:"1px solid #f0fdf4" }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>

        <div className="flex items-start gap-5">
          <div className="float w-18 h-18 text-5xl flex items-center justify-center flex-shrink-0 w-20 h-20">
            {story.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold"
                style={{ background:cc }}>{story.program}</span>
              <StatusChip s={story.status} />
              <ImpactChip i={story.impact} />
              {story.featured && (
                <span className="font-bn text-xs bg-amber-400 text-white px-2.5 py-0.5 rounded-full font-bold">⭐ ফিচার্ড</span>
              )}
            </div>
            <p className="font-dis text-green-900 font-bold text-2xl leading-tight">{story.title}</p>
            <p className="font-bn text-sm text-gray-500 mt-1">{story.name} · {story.age} বছর · {story.district} · {story.date}</p>
            <div className="flex gap-4 mt-2">
              <span className="font-bn text-xs text-gray-400">👁 {story.views.toLocaleString()} ভিউ</span>
              <span className="font-bn text-xs text-gray-400">❤️ {story.likes.toLocaleString()} পছন্দ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 overflow-y-auto flex flex-col gap-5" style={{ maxHeight:"60vh" }}>
        {/* quote */}
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl px-6 py-5 border border-green-100 overflow-hidden">
          <div className="quote-mark">"</div>
          <p className="font-dis text-green-800 text-lg leading-relaxed italic qi relative z-10">
            {story.quote}
          </p>
          <div className="flex justify-between items-center mt-3 relative z-10">
            <p className="font-bn text-sm font-bold text-green-700">— {story.name}</p>
            <Stars n={5} />
          </div>
        </div>

        {/* full story */}
        <div>
          <p className="font-dis text-green-900 font-bold text-base mb-2">সাফল্যের গল্প</p>
          <p className="font-bn text-sm text-gray-600 leading-relaxed">{story.story}</p>
        </div>

        {/* before/after */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 rounded-2xl px-4 py-4 border border-red-100">
            <p className="font-bn text-xs text-red-400 font-bold uppercase tracking-wider mb-2">📉 পরিবর্তনের আগে</p>
            <p className="font-bn text-sm text-red-700 font-bold">{story.beforeAfter.before}</p>
          </div>
          <div className="bg-green-50 rounded-2xl px-4 py-4 border border-green-100">
            <p className="font-bn text-xs text-green-500 font-bold uppercase tracking-wider mb-2">📈 পরিবর্তনের পরে</p>
            <p className="font-bn text-sm text-green-700 font-bold">{story.beforeAfter.after}</p>
          </div>
        </div>

        {/* tags */}
        {story.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map(t => (
              <span key={t} className="font-bn text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold">{t}</span>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
            বন্ধ করুন
          </button>
          <button onClick={() => { onClose(); onEdit(story); }}
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
    beforeAfter: { ...initial.beforeAfter },
    tags: [...(initial.tags || [])],
  });
  const [tagInput, setTagInput] = useState("");
  const isEdit = !!initial.id;
  const set  = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setBa = (k, v) => setForm(f => ({ ...f, beforeAfter: { ...f.beforeAfter, [k]: v } }));
  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]); setTagInput(""); };
  const rmTag  = t => set("tags", form.tags.filter(x => x !== t));

  const cc = CAT_COLOR[form.program] || "#16a34a";
  const fc = "font-bn w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white transition-all";
  const lc = "font-bn block text-xs font-semibold text-green-800 mb-1.5";

  return (
    <Modal onClose={onClose} wide>
      {/* header */}
      <div className="px-7 pt-6 pb-5 border-b border-gray-50"
        style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-dis text-green-900 font-bold text-xl">
              {isEdit ? "গল্প সম্পাদনা" : "নতুন সাফল্যের গল্প"}
            </p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">
              {isEdit ? "গল্পের তথ্য আপডেট করুন" : "নতুন অনুপ্রেরণার গল্প যোগ করুন"}
            </p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        </div>
      </div>

      <div className="px-7 py-5 overflow-y-auto flex flex-col gap-5" style={{ maxHeight:"66vh" }}>

        {/* status + impact + featured row */}
        <div className="flex gap-3 flex-wrap">
          {/* status */}
          <div className="flex-1 min-w-32">
            <label className={lc}>অবস্থা</label>
            <select value={form.status} onChange={e => set("status", e.target.value)} className={fc}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {/* impact */}
          <div className="flex-1 min-w-32">
            <label className={lc}>প্রভাবমাত্রা</label>
            <select value={form.impact} onChange={e => set("impact", e.target.value)} className={fc}>
              {IMPACTS.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          {/* featured toggle */}
          <div className="flex flex-col justify-end">
            <label className={lc}>ফিচার্ড</label>
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all
              ${form.featured ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-gray-50"}`}
              onClick={() => set("featured", !form.featured)}>
              <div className={`w-10 h-5 rounded-full transition-all duration-300 relative flex-shrink-0 ${form.featured ? "bg-amber-400" : "bg-gray-300"}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-all duration-300 ${form.featured ? "left-5" : "left-0.5"}`} />
              </div>
              <span className="font-bn text-xs font-semibold text-gray-600 whitespace-nowrap">⭐ ফিচার</span>
            </div>
          </div>
        </div>

        {/* avatar picker */}
        <div>
          <label className={lc}>অ্যাভাটার</label>
          <div className="flex flex-wrap gap-2">
            {ALL_AVATARS.map(a => (
              <button key={a} onClick={() => set("avatar", a)}
                className={`w-11 h-11 rounded-xl text-2xl flex items-center justify-center cursor-pointer border-2 transition-all
                  ${form.avatar === a ? "border-green-500 bg-green-50 scale-110" : "border-gray-100 bg-gray-50 hover:border-green-300"}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* name + age + gender */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className={lc}>নাম *</label>
            <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="পূর্ণ নাম" className={fc} />
          </div>
          <div>
            <label className={lc}>বয়স</label>
            <input type="number" value={form.age} onChange={e => set("age", e.target.value)} placeholder="বছর" className={fc} />
          </div>
          <div>
            <label className={lc}>লিঙ্গ</label>
            <select value={form.gender} onChange={e => set("gender", e.target.value)} className={fc}>
              {GENDERS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* district + program + date */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={lc}>জেলা</label>
            <select value={form.district} onChange={e => set("district", e.target.value)} className={fc}>
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>প্রকল্প বিভাগ</label>
            <select value={form.program} onChange={e => set("program", e.target.value)} className={fc}>
              {PROGRAMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>তারিখ</label>
            <input value={form.date} onChange={e => set("date", e.target.value)} placeholder="তারিখ" className={fc} />
          </div>
        </div>

        {/* story title */}
        <div>
          <label className={lc}>শিরোনাম *</label>
          <input value={form.title} onChange={e => set("title", e.target.value)}
            placeholder="গল্পের আকর্ষণীয় শিরোনাম" className={fc} />
        </div>

        {/* quote */}
        <div>
          <label className={lc}>উদ্ধৃতি (Quote) *</label>
          <div className="relative">
            <div className="absolute top-2 left-3 text-2xl text-green-300 font-serif pointer-events-none select-none leading-none">"</div>
            <textarea value={form.quote} onChange={e => set("quote", e.target.value)}
              rows={2} placeholder="সুবিধাভোগীর নিজের কথায় একটি বাক্য…"
              className={`${fc} pl-8 resize-none`} />
          </div>
        </div>

        {/* full story */}
        <div>
          <label className={lc}>পূর্ণ গল্প</label>
          <textarea value={form.story} onChange={e => set("story", e.target.value)}
            rows={4} placeholder="সুবিধাভোগীর জীবনের পরিবর্তনের বিস্তারিত গল্প…"
            className={`${fc} resize-none`} />
        </div>

        {/* before / after */}
        <div>
          <label className={lc}>পরিবর্তনের আগে ও পরে</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">📉</span>
              <input value={form.beforeAfter.before} onChange={e => setBa("before", e.target.value)}
                placeholder="আগের অবস্থা" className={`${fc} pl-8`} />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">📈</span>
              <input value={form.beforeAfter.after} onChange={e => setBa("after", e.target.value)}
                placeholder="পরের অবস্থা" className={`${fc} pl-8`} />
            </div>
          </div>
        </div>

        {/* tags */}
        <div>
          <label className={lc}>ট্যাগ</label>
          <div className="flex gap-2 mb-2">
            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTag()}
              placeholder="ট্যাগ লিখুন ও Enter চাপুন" className={`${fc} flex-1`} />
            <button onClick={addTag}
              className="font-bn px-4 py-2 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer flex-shrink-0"
              style={{ background:`linear-gradient(135deg,${cc}cc,${cc})` }}>যোগ</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {form.tags.map(t => (
              <span key={t} className="font-bn inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                {t}
                <button onClick={() => rmTag(t)} className="tag-x font-bn border-0 bg-transparent cursor-pointer text-xs text-green-500">✕</button>
              </span>
            ))}
          </div>
        </div>

        {/* live preview strip */}
        {form.title && (
          <div className="si bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="text-3xl flex-shrink-0">{form.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="font-dis text-green-900 font-bold text-sm leading-tight truncate">{form.title}</p>
              <p className="font-bn text-xs text-gray-500 mt-0.5">{form.name || "—"} · {form.district}</p>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                <span className="font-bn text-xs px-2 py-0.5 rounded-full text-white font-semibold text-xs"
                  style={{ background:cc }}>{form.program}</span>
                <StatusChip s={form.status} />
                <ImpactChip i={form.impact} />
              </div>
            </div>
            {form.featured && <span className="text-lg flex-shrink-0">⭐</span>}
          </div>
        )}
      </div>

      {/* footer */}
      <div className="px-7 py-4 border-t border-gray-50 flex gap-3">
        <button onClick={onClose}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
          বাতিল
        </button>
        <button disabled={!form.name.trim() || !form.title.trim()} onClick={() => form.name.trim() && form.title.trim() && onSave(form)}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
          💚 {isEdit ? "আপডেট করুন" : "গল্প প্রকাশ করুন"}
        </button>
      </div>
    </Modal>
  );
}

/* ── Delete Modal ───────────────────────────────────────────────── */
function DeleteModal({ story, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">🗑️</div>
        <p className="font-dis text-green-900 font-bold text-xl">গল্পটি মুছবেন?</p>
        <p className="font-bn text-gray-500 text-sm leading-relaxed">
          <span className="font-bold text-green-800">"{story.title}"</span> গল্পটি স্থায়ীভাবে মুছে যাবে।
          <br />এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
        </p>
        <div className="flex gap-3 w-full">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer bg-transparent">
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

/* ── Stats Strip ────────────────────────────────────────────────── */
function StatsStrip({ stories }) {
  const pub      = stories.filter(s => s.status === "প্রকাশিত").length;
  const featured = stories.filter(s => s.featured).length;
  const totalV   = stories.reduce((a, s) => a + (s.views || 0), 0);
  const totalL   = stories.reduce((a, s) => a + (s.likes || 0), 0);
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon:"📖", label:"মোট গল্প",      val: stories.length, color:"#16a34a", bg:"bg-green-50"  },
        { icon:"🌐", label:"প্রকাশিত",       val: pub,            color:"#22c55e", bg:"bg-emerald-50"},
        { icon:"⭐", label:"ফিচার্ড গল্প",  val: featured,       color:"#f59e0b", bg:"bg-amber-50" },
        { icon:"👁", label:"মোট ভিউ",        val: totalV.toLocaleString(), color:"#0ea5e9", bg:"bg-sky-50" },
      ].map((s, i) => (
        <div key={i} className={`au ${s.bg} rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm card-lift`}
          style={{ animationDelay:`${i*55}ms` }}>
          <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">{s.icon}</div>
          <div>
            <p className="font-dis font-bold text-2xl leading-none" style={{ color:s.color }}>{s.val}</p>
            <p className="font-bn text-xs font-semibold text-gray-600 mt-1">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Impact breakdown sidebar ───────────────────────────────────── */
function ImpactBreakdown({ stories }) {
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"300ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">প্রভাবমাত্রা</p>
      {IMPACTS.map(imp => {
        const cnt = stories.filter(s => s.impact === imp).length;
        const m   = IMPACT_META[imp];
        return (
          <div key={imp} className="flex items-center gap-2.5 mb-3 last:mb-0">
            <span className="text-base">{m.icon}</span>
            <span className="font-bn text-xs text-gray-500 flex-1">{imp}</span>
            <span className={`font-bn text-xs font-bold px-2.5 py-0.5 rounded-full ${m.bg} ${m.text}`}>{cnt}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Program breakdown ──────────────────────────────────────────── */
function ProgramBreakdown({ stories }) {
  const counts = {};
  stories.forEach(s => { counts[s.program] = (counts[s.program]||0)+1; });
  const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  const max    = Math.max(...Object.values(counts), 1);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"360ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">প্রকল্পভিত্তিক গল্প</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([prog, cnt]) => {
          const cc = CAT_COLOR[prog] || "#16a34a";
          return (
            <div key={prog} className="flex items-center gap-2.5">
              <span className="font-bn text-xs text-gray-500 w-24 flex-shrink-0 truncate text-right">{prog}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width:`${(cnt/max)*100}%`, background:`linear-gradient(90deg,${cc},${cc}88)` }} />
              </div>
              <span className="font-bn text-xs font-bold w-4 text-right" style={{ color:cc }}>{cnt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Top stories ────────────────────────────────────────────────── */
function TopStories({ stories }) {
  const top = [...stories].sort((a,b) => b.views - a.views).slice(0, 4);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"420ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-3">সর্বাধিক পঠিত</p>
      <div className="flex flex-col gap-3">
        {top.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2.5">
            <span className="font-bn text-xs font-bold text-gray-400 w-4 flex-shrink-0">{i+1}</span>
            <div className="text-xl flex-shrink-0">{s.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bn text-xs font-semibold text-green-900 truncate leading-tight">{s.title}</p>
              <p className="font-bn text-xs text-gray-400 mt-0.5">👁 {s.views.toLocaleString()} · ❤️ {s.likes}</p>
            </div>
            {i === 0 && <span className="text-base flex-shrink-0">🥇</span>}
            {i === 1 && <span className="text-base flex-shrink-0">🥈</span>}
            {i === 2 && <span className="text-base flex-shrink-0">🥉</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Toast ──────────────────────────────────────────────────────── */
const Toast = ({ msg, color }) => (
  <div className="ti fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bn text-sm font-semibold"
    style={{ background:color }}>
    ✓ {msg}
  </div>
);

/* ── MAIN ───────────────────────────────────────────────────────── */
export default function SuccessStorites() {
  const [stories,   setStories]   = useState(SEED);
  const [search,    setSearch]    = useState("");
  const [progFlt,   setProgFlt]   = useState("সব");
  const [statusFlt, setStatusFlt] = useState("সব");
  const [impactFlt, setImpactFlt] = useState("সব");
  const [sortBy,    setSortBy]    = useState("newest");
  const [modal,     setModal]     = useState(null);
  const [toast,     setToast]     = useState(null);

  const fire = (msg, color="#16a34a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (form) => {
    if (form.id) {
      setStories(ss => ss.map(s => s.id === form.id ? form : s));
      fire(`"${form.title}" আপডেট হয়েছে ✓`);
    } else {
      setStories(ss => [{ ...form, id:Date.now(), views:0, likes:0 }, ...ss]);
      fire(`"${form.title}" প্রকাশিত হয়েছে 🎉`);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    const title = stories.find(s => s.id === id)?.title;
    setStories(ss => ss.filter(s => s.id !== id));
    fire(`গল্পটি মুছে ফেলা হয়েছে`, "#ef4444");
    setModal(null);
  };

  const handleToggleFeatured = (id) => {
    setStories(ss => ss.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
    const story = stories.find(s => s.id === id);
    fire(story?.featured ? "ফিচার্ড থেকে সরানো হয়েছে" : "ফিচার্ড করা হয়েছে ⭐", "#f59e0b");
  };

  const filtered = useMemo(() =>
    stories
      .filter(s => progFlt   === "সব" || s.program === progFlt)
      .filter(s => statusFlt === "সব" || s.status  === statusFlt)
      .filter(s => impactFlt === "সব" || s.impact  === impactFlt)
      .filter(s => !search || s.title.includes(search) || s.name.includes(search) || s.district.includes(search) || s.quote.includes(search))
      .sort((a, b) => {
        if (sortBy === "views")  return b.views  - a.views;
        if (sortBy === "likes")  return b.likes  - a.likes;
        return b.id - a.id;
      }),
    [stories, progFlt, statusFlt, impactFlt, search, sortBy]
  );

  return (
    <>
      <Fonts />
      <div className="font-bn min-h-screen bg-green-50/30 p-6 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="au flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-bn text-green-500 text-xs uppercase tracking-widest mb-1">উৎকর্ষ ফাউন্ডেশন</p>
            <h1 className="font-dis text-green-900 text-3xl font-bold leading-tight">সাফল্যের গল্প</h1>
            <p className="font-bn text-gray-400 text-sm mt-1">অনুপ্রেরণামূলক গল্প পরিচালনা ও প্রকাশনা</p>
          </div>
          <button onClick={() => setModal({ type:"add" })}
            className="font-bn flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background:"linear-gradient(135deg,#14532d,#22c55e)", boxShadow:"0 6px 20px rgba(22,163,74,.35)" }}>
            <span className="text-lg">＋</span> নতুন গল্প যোগ করুন
          </button>
        </div>

        {/* ── Stats ── */}
        <StatsStrip stories={stories} />

        {/* ── Main layout ── */}
        <div className="grid grid-cols-4 gap-5 items-start">

          {/* 3/4 main */}
          <div className="col-span-3 flex flex-col gap-5">

            {/* filter bar */}
            <div className="au bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center" style={{ animationDelay:"200ms" }}>
              <div className="relative flex-1 min-w-52">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="নাম, শিরোনাম, জেলা, উদ্ধৃতি…"
                  className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 transition-all" />
              </div>
              <select value={statusFlt} onChange={e => setStatusFlt(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব অবস্থা</option>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={impactFlt} onChange={e => setImpactFlt(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব প্রভাব</option>
                {IMPACTS.map(i => <option key={i}>{i}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="newest">সর্বশেষ</option>
                <option value="views">সর্বাধিক পঠিত</option>
                <option value="likes">সর্বাধিক পছন্দ</option>
              </select>
            </div>

            {/* program chips */}
            <div className="au flex flex-wrap gap-2" style={{ animationDelay:"240ms" }}>
              {["সব", ...PROGRAMS].map(p => (
                <button key={p} onClick={() => setProgFlt(p)}
                  className={`font-bn text-xs font-semibold px-4 py-2 rounded-full cursor-pointer border transition-all
                    ${progFlt === p
                      ? "text-white border-transparent"
                      : "bg-white border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700 shadow-sm"}`}
                  style={progFlt === p ? {
                    background:`linear-gradient(135deg,${CAT_COLOR[p]||"#15803d"}cc,${CAT_COLOR[p]||"#22c55e"})`,
                    boxShadow:`0 2px 8px ${CAT_COLOR[p]||"#16a34a"}44`
                  } : {}}>
                  {p}
                </button>
              ))}
            </div>

            {/* result + clear */}
            <div className="flex items-center justify-between -mt-1">
              <p className="font-bn text-xs text-gray-400">{filtered.length} টি গল্প পাওয়া গেছে</p>
              {(search || progFlt !== "সব" || statusFlt !== "সব" || impactFlt !== "সব") && (
                <button onClick={() => { setSearch(""); setProgFlt("সব"); setStatusFlt("সব"); setImpactFlt("সব"); }}
                  className="font-bn text-xs text-green-600 font-semibold hover:underline cursor-pointer bg-transparent border-0">
                  ফিল্টার মুছুন ✕
                </button>
              )}
            </div>

            {/* cards grid */}
            {filtered.length > 0 ? (
              <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))" }}>
                {filtered.map((s, i) => (
                  <StoryCard key={s.id} story={s} delay={i*50}
                    onView={st => setModal({ type:"view", story:st })}
                    onEdit={st => setModal({ type:"edit", story:st })}
                    onDelete={st => setModal({ type:"delete", story:st })}
                    onToggleFeatured={handleToggleFeatured} />
                ))}
              </div>
            ) : (
              <div className="si bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center py-20 gap-4">
                <span className="text-6xl opacity-25">📖</span>
                <p className="font-dis text-green-800 text-xl font-bold">কোনো গল্প পাওয়া যায়নি</p>
                <p className="font-bn text-gray-400 text-sm">ফিল্টার পরিবর্তন করুন বা নতুন গল্প যোগ করুন</p>
                <button onClick={() => setModal({ type:"add" })}
                  className="font-bn text-sm font-bold text-white px-5 py-2.5 rounded-xl border-0 cursor-pointer"
                  style={{ background:"linear-gradient(135deg,#15803d,#22c55e)" }}>
                  + নতুন গল্প যোগ করুন
                </button>
              </div>
            )}
          </div>

          {/* sidebar 1/4 */}
          <div className="col-span-1 flex flex-col gap-4 sticky top-4">
            <ImpactBreakdown  stories={stories} />
            <ProgramBreakdown stories={stories} />
            <TopStories       stories={stories} />

            {/* status summary */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"480ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">অবস্থার সারসংক্ষেপ</p>
              {STATUSES.map(s => {
                const m   = STATUS_META[s];
                const cnt = stories.filter(st => st.status === s).length;
                return (
                  <div key={s} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.dot}`} />
                    <span className="font-bn text-xs text-gray-500 flex-1">{s}</span>
                    <span className={`font-bn text-xs font-bold px-2.5 py-0.5 rounded-full ${m.bg} ${m.text}`}>{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === "view"   && <ViewModal   story={modal.story} onClose={() => setModal(null)} onEdit={s => setModal({ type:"edit", story:s })} />}
      {modal?.type === "add"    && <FormModal   initial={EMPTY_FORM} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "edit"   && <FormModal   initial={modal.story} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "delete" && <DeleteModal story={modal.story} onClose={() => setModal(null)} onConfirm={() => handleDelete(modal.story.id)} />}

      {toast && <Toast msg={toast.msg} color={toast.color} />}
    </>
  );
}