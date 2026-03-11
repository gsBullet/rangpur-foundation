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
    @keyframes slideRight{ from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }
    @keyframes pulse2    { 0%,100%{opacity:1} 50%{opacity:.35} }
    @keyframes shimmer   { 0%{background-position:-600px 0} 100%{background-position:600px 0} }

    .au  { animation:fadeUp    .48s cubic-bezier(.22,.68,0,1.1)  both }
    .si  { animation:scaleIn   .38s cubic-bezier(.22,.68,0,1.2)  both }
    .mi  { animation:modalIn   .42s cubic-bezier(.22,.68,0,1.15) both }
    .ov  { animation:overlayIn .22s ease both }
    .ti  { animation:toastIn   .38s cubic-bezier(.22,.68,0,1.2)  both }
    .sri { animation:slideRight .4s  cubic-bezier(.22,.68,0,1.1) both }

    .card-lift { transition:transform .22s,box-shadow .22s }
    .card-lift:hover { transform:translateY(-5px); box-shadow:0 22px 52px rgba(0,0,0,.1)!important }
    .row-hover { transition:background .14s }
    .row-hover:hover { background:#f0fdf4 }

    input:focus,textarea:focus,select:focus {
      outline:none; border-color:#16a34a!important;
      box-shadow:0 0 0 3px rgba(22,163,74,.14)!important;
    }
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:#86efac;border-radius:4px}

    .approval-pulse { animation:pulse2 1.6s ease infinite }

    /* Rich text area feel */
    .rich-ta { font-family:'Hind Siliguri',sans-serif; line-height:1.8; }
  `}</style>
);

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = ["শিক্ষা","স্বাস্থ্য","নারী উন্নয়ন","পরিবেশ","কৃষি","আইন ও অধিকার","যুব উন্নয়ন","সাধারণ","অনুপ্রেরণা"];
const STATUSES   = ["প্রকাশিত","খসড়া","পর্যালোচনাধীন","প্রত্যাখ্যাত"];
const AUTHOR_ROLES = ["অ্যাডমিন","স্বেচ্ছাসেবী","বাহ্যিক লেখক","সুবিধাভোগী"];

const CAT_COLOR = {
  "শিক্ষা":"#16a34a","স্বাস্থ্য":"#0ea5e9","নারী উন্নয়ন":"#d946ef",
  "পরিবেশ":"#10b981","কৃষি":"#84cc16","আইন ও অধিকার":"#8b5cf6",
  "যুব উন্নয়ন":"#f97316","সাধারণ":"#64748b","অনুপ্রেরণা":"#f59e0b",
};

const STATUS_META = {
  "প্রকাশিত":      { bg:"bg-green-100",  text:"text-green-700",  dot:"bg-green-500",  icon:"🌐" },
  "খসড়া":          { bg:"bg-gray-100",   text:"text-gray-600",   dot:"bg-gray-400",   icon:"📝" },
  "পর্যালোচনাধীন": { bg:"bg-amber-100",  text:"text-amber-700",  dot:"bg-amber-400",  icon:"⏳" },
  "প্রত্যাখ্যাত":   { bg:"bg-red-100",   text:"text-red-700",    dot:"bg-red-400",    icon:"❌" },
};

const BG_POOL = [
  "from-green-50 to-emerald-50","from-sky-50 to-blue-50",
  "from-fuchsia-50 to-pink-50","from-amber-50 to-orange-50",
  "from-violet-50 to-purple-50","from-teal-50 to-cyan-50",
  "from-lime-50 to-green-50","from-rose-50 to-red-50",
];

const READING_TIMES = ["২ মিনিট","৩ মিনিট","৫ মিনিট","৭ মিনিট","১০ মিনিট"];

/* ── Seed Data ──────────────────────────────────────────────────── */
const SEED_BLOGS = [
  {
    id:1, status:"প্রকাশিত", category:"শিক্ষা", featured:true,
    title:"ডিজিটাল শিক্ষায় রংপুরের পথচলা",
    excerpt:"প্রযুক্তি ও শিক্ষার সমন্বয়ে কীভাবে বদলে যাচ্ছে গ্রামীণ শিশুদের ভবিষ্যৎ — রংপুর বিভাগের ডিজিটাল শিক্ষাকেন্দ্রগুলোর সাফল্যের গল্প।",
    content:"রংপুর বিভাগের প্রত্যন্ত অঞ্চলে এক সময় কম্পিউটার দেখা মানুষের সংখ্যা ছিল হাতেগোনা। উৎকর্ষ ফাউন্ডেশনের ডিজিটাল লার্নিং সেন্টার প্রকল্পের মাধ্যমে আজ সেই চিত্র পাল্টে গেছে। ১২টি বিদ্যালয়ে স্থাপিত কম্পিউটার ল্যাবে প্রতিদিন ৩০০ এরও বেশি শিক্ষার্থী ডিজিটাল দক্ষতা অর্জন করছে।\n\nএই প্রকল্পের সবচেয়ে বড় সাফল্য হলো মেয়েদের অংশগ্রহণ। মোট শিক্ষার্থীর ৫৮% মেয়ে, যা স্থানীয় অভিভাবকদের মানসিকতার পরিবর্তনের প্রমাণ।",
    author:"ড. ফারহানা ইসলাম", authorRole:"অ্যাডমিন", authorAvatar:"👩‍🏫",
    readingTime:"৫ মিনিট", views:1240, likes:387, comments:28,
    publishDate:"১৫ জানুয়ারি, ২০২৫", tags:["ডিজিটাল","শিক্ষা","মেয়ে"],
    coverEmoji:"💻", rejectNote:"",
  },
  {
    id:2, status:"পর্যালোচনাধীন", category:"নারী উন্নয়ন", featured:false,
    title:"হস্তশিল্পে স্বনির্ভর নারী: একটি সফল উদ্যোগের গল্প",
    excerpt:"গাইবান্ধার ১৫০ নারী উদ্যোক্তার হস্তশিল্প পণ্য এখন ঢাকার বাজারে। কীভাবে সম্ভব হলো এই যাত্রা?",
    content:"গাইবান্ধার সদরঘাট এলাকার রহিমা বেগমের কথা মনে পড়লেই চোখে ভেসে ওঠে একটি রূপান্তরের গল্প। তিন বছর আগেও তিনি সংসারের ভার বহন করতে গিয়ে হাঁপিয়ে উঠতেন। উৎকর্ষ ফাউন্ডেশনের নারী উদ্যোক্তা প্রকল্পে যোগ দিয়ে আজ তিনি মাসে ১২,০০০ টাকা আয় করছেন।",
    author:"রওশন আরা বেগম", authorRole:"স্বেচ্ছাসেবী", authorAvatar:"👩",
    readingTime:"৩ মিনিট", views:0, likes:0, comments:0,
    publishDate:"২০ ফেব্রুয়ারি, ২০২৫", tags:["নারী","হস্তশিল্প","উদ্যোক্তা"],
    coverEmoji:"🧵", rejectNote:"",
  },
  {
    id:3, status:"পর্যালোচনাধীন", category:"পরিবেশ", featured:false,
    title:"জলবায়ু পরিবর্তন ও কুড়িগ্রামের কৃষক",
    excerpt:"বন্যা ও খরার বিরুদ্ধে লড়াই করে কীভাবে কৃষকরা জৈব পদ্ধতিতে উৎপাদন বাড়াচ্ছেন।",
    content:"কুড়িগ্রাম জেলার উলিপুর উপজেলার কৃষকরা প্রতি বছর বন্যার কারণে ব্যাপক ক্ষতির মুখে পড়তেন। উৎকর্ষ ফাউন্ডেশনের জলবায়ু সহনশীলতা প্রকল্পের আওতায় তারা এখন উঁচু বেডে চাষ এবং জৈব সার ব্যবহার করে উৎপাদন তিনগুণ করতে সক্ষম হয়েছেন।",
    author:"ইঞ্জি. রাশেদ করিম", authorRole:"বাহ্যিক লেখক", authorAvatar:"👨‍🌾",
    readingTime:"৭ মিনিট", views:0, likes:0, comments:0,
    publishDate:"৫ মার্চ, ২০২৫", tags:["পরিবেশ","কৃষি","বন্যা"],
    coverEmoji:"🌾", rejectNote:"",
  },
  {
    id:4, status:"প্রকাশিত", category:"স্বাস্থ্য", featured:false,
    title:"মাতৃস্বাস্থ্য সেবায় নতুন দিগন্ত",
    excerpt:"রংপুরের প্রত্যন্ত অঞ্চলে মাতৃমৃত্যু হার কমাতে উৎকর্ষের বিশেষ স্বাস্থ্য ক্যাম্পের ভূমিকা।",
    content:"বাংলাদেশে মাতৃমৃত্যু হার কমিয়ে আনা এখনও একটি বড় চ্যালেঞ্জ। রংপুর বিভাগের প্রত্যন্ত অঞ্চলে উৎকর্ষ ফাউন্ডেশন প্রতি মাসে ৩টি করে বিনামূল্যে স্বাস্থ্য ক্যাম্প পরিচালনা করছে।",
    author:"ডা. কামরুল হাসান", authorRole:"অ্যাডমিন", authorAvatar:"👨‍⚕️",
    readingTime:"৫ মিনিট", views:890, likes:215, comments:14,
    publishDate:"১২ মার্চ, ২০২৫", tags:["স্বাস্থ্য","মাতৃসেবা","ক্যাম্প"],
    coverEmoji:"🏥", rejectNote:"",
  },
  {
    id:5, status:"প্রত্যাখ্যাত", category:"সাধারণ", featured:false,
    title:"আমার গ্রামের কথা",
    excerpt:"ব্যক্তিগত স্মৃতিকথামূলক লেখা।",
    content:"আমার গ্রাম রংপুরের পাশে একটি ছোট গ্রাম...",
    author:"মো. আলী আহমেদ", authorRole:"সুবিধাভোগী", authorAvatar:"👦",
    readingTime:"২ মিনিট", views:0, likes:0, comments:0,
    publishDate:"১৮ মার্চ, ২০২৫", tags:["সাধারণ"],
    coverEmoji:"🏡", rejectNote:"এই ব্লগটি ফাউন্ডেশনের বিষয়বস্তুর সাথে সামঞ্জস্যপূর্ণ নয়। অনুগ্রহ করে ফাউন্ডেশনের কার্যক্রম সম্পর্কিত কোনো বিষয়ে লিখুন।",
  },
  {
    id:6, status:"খসড়া", category:"যুব উন্নয়ন", featured:false,
    title:"তরুণ উদ্যোক্তাদের সাফল্যের রহস্য",
    excerpt:"ফ্রিল্যান্সিং থেকে শুরু করে স্থানীয় ব্যবসা — রংপুরের তরুণরা কীভাবে স্বাবলম্বী হচ্ছে।",
    content:"খসড়া লেখা...",
    author:"ড. ফারহানা ইসলাম", authorRole:"অ্যাডমিন", authorAvatar:"👩‍🏫",
    readingTime:"৩ মিনিট", views:0, likes:0, comments:0,
    publishDate:"", tags:["যুব","উদ্যোক্তা","ফ্রিল্যান্সিং"],
    coverEmoji:"💼", rejectNote:"",
  },
];

const EMPTY_FORM = {
  status:"খসড়া", category:"শিক্ষা", featured:false,
  title:"", excerpt:"", content:"",
  author:"", authorRole:"অ্যাডমিন", authorAvatar:"👨",
  readingTime:"৫ মিনিট", views:0, likes:0, comments:0,
  publishDate:"", tags:[], coverEmoji:"📄", rejectNote:"",
};

const ALL_EMOJIS = ["📚","💻","🏥","👩","🌾","⚖️","🌿","💼","🏗️","🎓","💧","🌍","🤝","📡","💊","🏫","📝","🌟","🏡","💡"];
const ALL_AVATARS = ["👨","👩","👦","👧","🧔","👱","🧑","👩‍🏫","👨‍⚕️","👩‍⚕️","👨‍🌾","👩‍🌾","👨‍💻","👩‍💻"];

/* ── Helpers ────────────────────────────────────────────────────── */
const StatusChip = ({ s }) => {
  const m = STATUS_META[s] ?? STATUS_META["খসড়া"];
  return (
    <span className={`font-bn inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{s}
    </span>
  );
};

/* ── Blog Card ──────────────────────────────────────────────────── */
function BlogCard({ blog, delay, onView, onEdit, onApprove, onReject, onDelete, onToggleFeatured }) {
  const cc = CAT_COLOR[blog.category] || "#16a34a";
  const bg = BG_POOL[blog.id % BG_POOL.length];
  const sm = STATUS_META[blog.status];
  const isPending = blog.status === "পর্যালোচনাধীন";

  return (
    <div className={`au card-lift bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col ${isPending ? "ring-2 ring-amber-300 ring-offset-1" : ""}`}
      style={{ animationDelay:`${delay}ms` }}>
      {/* top bar */}
      <div className="h-1.5" style={{ background:`linear-gradient(90deg,${cc},${cc}55)` }} />

      {/* header */}
      <div className={`bg-gradient-to-br ${bg} px-5 pt-5 pb-4 relative`}>
        {blog.featured && (
          <div className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold font-bn px-2.5 py-1 rounded-full shadow-sm">⭐ ফিচার্ড</div>
        )}
        {isPending && (
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <span className="approval-pulse w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
            <span className="font-bn text-xs font-bold text-amber-600">অনুমোদন প্রয়োজন</span>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl flex-shrink-0">{blog.coverEmoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold" style={{ background:cc }}>{blog.category}</span>
              <StatusChip s={blog.status} />
            </div>
            <p className="font-dis text-green-900 font-bold text-sm leading-snug line-clamp-2">{blog.title}</p>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4 flex flex-col gap-3 flex-1">
        <p className="font-bn text-xs text-gray-500 leading-relaxed line-clamp-2">{blog.excerpt}</p>

        {/* reject note */}
        {blog.status === "প্রত্যাখ্যাত" && blog.rejectNote && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
            <p className="font-bn text-xs text-red-500 font-semibold mb-0.5">❌ প্রত্যাখ্যানের কারণ</p>
            <p className="font-bn text-xs text-red-700 line-clamp-2">{blog.rejectNote}</p>
          </div>
        )}

        {/* author */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-base flex-shrink-0">{blog.authorAvatar}</div>
          <div>
            <p className="font-bn text-xs font-semibold text-green-800 leading-tight">{blog.author}</p>
            <p className="font-bn text-xs text-gray-400">{blog.authorRole}</p>
          </div>
          <span className="ml-auto font-bn text-xs text-gray-400">⏱ {blog.readingTime}</span>
        </div>

        {/* tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.map(t => (
              <span key={t} className="font-bn text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>
            ))}
          </div>
        )}

        {/* stats */}
        <div className="flex items-center gap-3 pt-0.5">
          <span className="font-bn text-xs text-gray-400">👁 {blog.views.toLocaleString()}</span>
          <span className="font-bn text-xs text-gray-400">❤️ {blog.likes}</span>
          <span className="font-bn text-xs text-gray-400">💬 {blog.comments}</span>
          {blog.publishDate && <span className="font-bn text-xs text-gray-400 ml-auto">{blog.publishDate}</span>}
        </div>
      </div>

      {/* footer */}
      <div className="px-4 py-3 border-t border-gray-50">
        {isPending ? (
          /* Approval actions */
          <div className="flex gap-2">
            <button onClick={() => onView(blog)}
              className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
              পূর্বদর্শন
            </button>
            <button onClick={() => onApprove(blog.id)}
              className="font-bn flex-1 text-xs font-bold py-2 rounded-xl text-white border-0 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 3px 10px rgba(22,163,74,.35)" }}>
              ✓ অনুমোদন
            </button>
            <button onClick={() => onReject(blog)}
              className="font-bn flex-1 text-xs font-bold py-2 rounded-xl border-0 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)", color:"white" }}>
              ✕ প্রত্যাখ্যান
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => onView(blog)}
              className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
              পড়ুন
            </button>
            <button onClick={() => onEdit(blog)}
              className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">
              ✎ সম্পাদনা
            </button>
            <button onClick={() => onToggleFeatured(blog.id)}
              className={`font-bn text-xs px-3 py-2 rounded-xl border cursor-pointer bg-transparent transition-colors
                ${blog.featured ? "border-amber-300 text-amber-500 hover:bg-amber-50" : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}>
              ⭐
            </button>
            <button onClick={() => onDelete(blog)}
              className="font-bn text-xs px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
              🗑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Modal Shell ────────────────────────────────────────────────── */
function Modal({ onClose, wide, full, children }) {
  return (
    <div className="ov fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,.52)", backdropFilter:"blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`mi bg-white rounded-3xl shadow-2xl overflow-hidden w-full ${full ? "max-w-3xl" : wide ? "max-w-2xl" : "max-w-lg"}`}>
        {children}
      </div>
    </div>
  );
}

/* ── View Modal ─────────────────────────────────────────────────── */
function ViewModal({ blog, onClose, onEdit, onApprove, onReject }) {
  const cc = CAT_COLOR[blog.category] || "#16a34a";
  const bg = BG_POOL[blog.id % BG_POOL.length];
  const isPending = blog.status === "পর্যালোচনাধীন";

  return (
    <Modal onClose={onClose} full>
      {/* hero */}
      <div className={`relative bg-gradient-to-br ${bg} px-8 pt-7 pb-6`} style={{ borderBottom:"1px solid #f0fdf4" }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl flex-shrink-0">{blog.coverEmoji}</div>
          <div className="flex-1 pr-10">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold" style={{ background:cc }}>{blog.category}</span>
              <StatusChip s={blog.status} />
              {blog.featured && <span className="font-bn text-xs bg-amber-400 text-white px-2.5 py-0.5 rounded-full font-bold">⭐ ফিচার্ড</span>}
            </div>
            <p className="font-dis text-green-900 font-bold text-2xl leading-tight">{blog.title}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{blog.authorAvatar}</span>
                <div>
                  <p className="font-bn text-xs font-bold text-green-800">{blog.author}</p>
                  <p className="font-bn text-xs text-gray-400">{blog.authorRole}</p>
                </div>
              </div>
              <span className="font-bn text-xs text-gray-400">⏱ {blog.readingTime}</span>
              {blog.publishDate && <span className="font-bn text-xs text-gray-400">{blog.publishDate}</span>}
            </div>
          </div>
        </div>
        {isPending && (
          <div className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
            <span className="approval-pulse w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
            <p className="font-bn text-xs text-amber-700 font-semibold">এই ব্লগটি অনুমোদনের অপেক্ষায় আছে</p>
          </div>
        )}
      </div>

      <div className="px-8 py-6 overflow-y-auto flex flex-col gap-5" style={{ maxHeight:"55vh" }}>
        {/* excerpt */}
        <div className="bg-green-50 rounded-xl px-5 py-4 border-l-4 border-green-400">
          <p className="font-bn text-sm text-green-800 italic leading-relaxed">{blog.excerpt}</p>
        </div>

        {/* content */}
        <div>
          <p className="font-dis text-green-900 font-bold text-base mb-3">ব্লগের বিষয়বস্তু</p>
          <div className="font-bn text-sm text-gray-600 leading-relaxed whitespace-pre-line">{blog.content}</div>
        </div>

        {/* reject note */}
        {blog.status === "প্রত্যাখ্যাত" && blog.rejectNote && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
            <p className="font-bn text-xs text-red-500 font-bold mb-2">❌ প্রত্যাখ্যানের কারণ (লেখককে পাঠানো হয়েছে)</p>
            <p className="font-bn text-sm text-red-700 leading-relaxed">{blog.rejectNote}</p>
          </div>
        )}

        {/* stats */}
        <div className="flex items-center gap-6 py-3 border-t border-gray-50">
          <span className="font-bn text-sm text-gray-500">👁 {blog.views.toLocaleString()} ভিউ</span>
          <span className="font-bn text-sm text-gray-500">❤️ {blog.likes} পছন্দ</span>
          <span className="font-bn text-sm text-gray-500">💬 {blog.comments} মন্তব্য</span>
        </div>

        {/* tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(t => (
              <span key={t} className="font-bn text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold">{t}</span>
            ))}
          </div>
        )}

        {/* footer actions */}
        {isPending ? (
          <div className="flex gap-3 pt-1">
            <button onClick={onClose}
              className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
              বন্ধ করুন
            </button>
            <button onClick={() => { onApprove(blog.id); onClose(); }}
              className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all"
              style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
              ✓ অনুমোদন করুন
            </button>
            <button onClick={() => { onClose(); onReject(blog); }}
              className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all"
              style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)" }}>
              ✕ প্রত্যাখ্যান করুন
            </button>
          </div>
        ) : (
          <div className="flex gap-3 pt-1">
            <button onClick={onClose}
              className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
              বন্ধ করুন
            </button>
            <button onClick={() => { onClose(); onEdit(blog); }}
              className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all"
              style={{ background:`linear-gradient(135deg,${cc}cc,${cc})`, boxShadow:`0 4px 14px ${cc}44` }}>
              ✎ সম্পাদনা করুন
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ── Reject Modal ───────────────────────────────────────────────── */
function RejectModal({ blog, onClose, onConfirm }) {
  const [note, setNote] = useState(blog.rejectNote || "");
  return (
    <Modal onClose={onClose} wide>
      <div className="px-7 pt-6 pb-4 border-b border-gray-50 bg-gradient-to-r from-red-50 to-rose-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-dis text-red-800 font-bold text-xl">ব্লগ প্রত্যাখ্যান করুন</p>
            <p className="font-bn text-xs text-red-500 mt-0.5 truncate">"{blog.title}"</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        </div>
      </div>
      <div className="px-7 py-5 flex flex-col gap-4">
        {/* author info */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
          <span className="text-2xl">{blog.authorAvatar}</span>
          <div>
            <p className="font-bn text-sm font-bold text-green-900">{blog.author}</p>
            <p className="font-bn text-xs text-gray-400">{blog.authorRole} · {blog.publishDate}</p>
          </div>
        </div>

        {/* reason */}
        <div>
          <label className="font-bn block text-xs font-semibold text-red-700 mb-1.5">
            প্রত্যাখ্যানের কারণ * <span className="text-gray-400 font-normal">(লেখককে জানানো হবে)</span>
          </label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={4}
            placeholder="কেন এই ব্লগটি প্রত্যাখ্যান করা হচ্ছে তা বিস্তারিত লিখুন। লেখক যেন সংশোধন করতে পারেন সেভাবে মন্তব্য করুন…"
            className="font-bn w-full px-4 py-3 rounded-xl border border-red-200 text-sm text-gray-700 bg-white resize-none transition-all" />
          <p className="font-bn text-xs text-gray-400 mt-1">{note.length} অক্ষর</p>
        </div>

        {/* quick reasons */}
        <div>
          <p className="font-bn text-xs text-gray-400 mb-2">দ্রুত কারণ নির্বাচন:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "বিষয়বস্তু ফাউন্ডেশনের সাথে সামঞ্জস্যপূর্ণ নয়",
              "তথ্যগত ভুল রয়েছে",
              "ভাষা ও বানান সংশোধন প্রয়োজন",
              "অনুপযুক্ত বিষয়বস্তু",
              "অপর্যাপ্ত তথ্য",
            ].map(r => (
              <button key={r} onClick={() => setNote(prev => prev ? prev + " " + r : r)}
                className="font-bn text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
                + {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer bg-transparent">
            বাতিল
          </button>
          <button disabled={!note.trim()} onClick={() => note.trim() && onConfirm(note)}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)", boxShadow:"0 4px 14px rgba(239,68,68,.35)" }}>
            ✕ প্রত্যাখ্যান নিশ্চিত করুন
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Form Modal ─────────────────────────────────────────────────── */
function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({ ...initial, tags:[...(initial.tags||[])] });
  const [tagInput, setTagInput] = useState("");
  const [tab, setTab] = useState("basic"); // basic | content | settings
  const isEdit = !!initial.id;
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) set("tags",[...form.tags,t]); setTagInput(""); };
  const rmTag  = t => set("tags", form.tags.filter(x => x !== t));
  const cc = CAT_COLOR[form.category] || "#16a34a";
  const fc = "font-bn w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white transition-all";
  const lc = "font-bn block text-xs font-semibold text-green-800 mb-1.5";
  const canSave = form.title.trim() && form.excerpt.trim() && form.author.trim();

  return (
    <Modal onClose={onClose} full>
      {/* header */}
      <div className="px-7 pt-6 pb-0 border-b border-gray-100"
        style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)" }}>
        <div className="flex items-center justify-between pb-4">
          <div>
            <p className="font-dis text-green-900 font-bold text-xl">{isEdit ? "ব্লগ সম্পাদনা" : "নতুন ব্লগ পোস্ট"}</p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">{isEdit ? "বিষয়বস্তু আপডেট করুন" : "নতুন ব্লগ তৈরি করুন"}</p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        </div>
        {/* tabs */}
        <div className="flex gap-1 -mb-px">
          {[["basic","📋 মূল তথ্য"],["content","✍️ বিষয়বস্তু"],["settings","⚙️ সেটিংস"]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`font-bn text-xs font-semibold px-5 py-2.5 rounded-t-xl cursor-pointer border-0 transition-all
                ${tab === id
                  ? "bg-white text-green-700 shadow-sm border-t border-l border-r border-gray-100"
                  : "bg-transparent text-gray-500 hover:text-green-600"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-7 py-5 overflow-y-auto" style={{ maxHeight:"60vh" }}>

        {/* ── Tab: Basic ── */}
        {tab === "basic" && (
          <div className="flex flex-col gap-4">
            {/* cover emoji */}
            <div>
              <label className={lc}>কভার ইমোজি</label>
              <div className="flex flex-wrap gap-2">
                {ALL_EMOJIS.map(e => (
                  <button key={e} onClick={() => set("coverEmoji", e)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center cursor-pointer border-2 transition-all
                      ${form.coverEmoji === e ? "border-green-500 bg-green-50 scale-110" : "border-gray-100 bg-gray-50 hover:border-green-300"}`}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* title */}
            <div>
              <label className={lc}>শিরোনাম *</label>
              <input value={form.title} onChange={e => set("title", e.target.value)}
                placeholder="আকর্ষণীয় ব্লগ শিরোনাম লিখুন" className={fc} />
            </div>

            {/* excerpt */}
            <div>
              <label className={lc}>সংক্ষিপ্ত বিবরণ *</label>
              <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
                rows={2} placeholder="পাঠকদের আগ্রহী করার জন্য সংক্ষিপ্ত বিবরণ…" className={`${fc} resize-none`} />
            </div>

            {/* category + reading time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lc}>বিভাগ</label>
                <select value={form.category} onChange={e => set("category", e.target.value)} className={fc}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={lc}>পড়ার সময়</label>
                <select value={form.readingTime} onChange={e => set("readingTime", e.target.value)} className={fc}>
                  {READING_TIMES.map(r => <option key={r}>{r}</option>)}
                </select>
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
                    <button onClick={() => rmTag(t)} className="font-bn text-green-500 hover:text-red-500 border-0 bg-transparent cursor-pointer text-xs">✕</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Content ── */}
        {tab === "content" && (
          <div className="flex flex-col gap-4">
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <p className="font-bn text-xs text-amber-700 font-semibold">📝 বিষয়বস্তু লেখার নির্দেশিকা</p>
              <p className="font-bn text-xs text-amber-600 mt-0.5">স্পষ্ট, সহজ ভাষায় লিখুন। প্যারাগ্রাফে ভাগ করুন। তথ্যসূত্র উল্লেখ করুন।</p>
            </div>
            <div>
              <label className={lc}>ব্লগের পূর্ণ বিষয়বস্তু</label>
              <textarea value={form.content} onChange={e => set("content", e.target.value)}
                rows={14} placeholder="ব্লগের বিস্তারিত বিষয়বস্তু লিখুন…&#10;&#10;প্রতিটি প্যারাগ্রাফের মাঝে একটি ফাঁকা লাইন দিন।"
                className={`${fc} resize-none rich-ta`} />
              <p className="font-bn text-xs text-gray-400 mt-1">{form.content.length} অক্ষর · আনুমানিক {Math.ceil(form.content.split(" ").length / 200)} মিনিট পড়ার সময়</p>
            </div>
          </div>
        )}

        {/* ── Tab: Settings ── */}
        {tab === "settings" && (
          <div className="flex flex-col gap-4">
            {/* author info */}
            <div>
              <label className={lc + " mb-3"}>লেখকের তথ্য</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {ALL_AVATARS.map(a => (
                  <button key={a} onClick={() => set("authorAvatar", a)}
                    className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center cursor-pointer border-2 transition-all
                      ${form.authorAvatar === a ? "border-green-500 bg-green-50 scale-110" : "border-gray-100 bg-gray-50 hover:border-green-300"}`}>
                    {a}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lc}>লেখকের নাম *</label>
                  <input value={form.author} onChange={e => set("author", e.target.value)} placeholder="নাম" className={fc} />
                </div>
                <div>
                  <label className={lc}>ভূমিকা</label>
                  <select value={form.authorRole} onChange={e => set("authorRole", e.target.value)} className={fc}>
                    {AUTHOR_ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* status + date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lc}>অবস্থা</label>
                <select value={form.status} onChange={e => set("status", e.target.value)} className={fc}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={lc}>প্রকাশের তারিখ</label>
                <input value={form.publishDate} onChange={e => set("publishDate", e.target.value)}
                  placeholder="যেমন: ১ জানুয়ারি, ২০২৫" className={fc} />
              </div>
            </div>

            {/* featured toggle */}
            <div className={`flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 cursor-pointer transition-all
              ${form.featured ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-gray-50"}`}
              onClick={() => set("featured", !form.featured)}>
              <div>
                <p className="font-bn text-sm font-bold text-green-900">ফিচার্ড পোস্ট</p>
                <p className="font-bn text-xs text-gray-500">হোমপেজে হাইলাইট করা হবে</p>
              </div>
              <div className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${form.featured ? "bg-amber-400" : "bg-gray-300"}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all duration-300 ${form.featured ? "left-6" : "left-0.5"}`} />
              </div>
            </div>

            {/* preview */}
            {form.title && (
              <div className="sri bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-3xl flex-shrink-0">{form.coverEmoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-dis text-green-900 font-bold text-sm leading-tight truncate">{form.title}</p>
                  <p className="font-bn text-xs text-gray-500 mt-0.5">{form.author || "—"} · {form.readingTime}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <span className="font-bn text-xs px-2 py-0.5 rounded-full text-white font-semibold" style={{ background:cc }}>{form.category}</span>
                    <StatusChip s={form.status} />
                    {form.featured && <span className="font-bn text-xs bg-amber-400 text-white px-2 py-0.5 rounded-full font-bold">⭐</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* footer */}
      <div className="px-7 py-4 border-t border-gray-50 flex gap-3">
        <button onClick={onClose}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer bg-transparent">
          বাতিল
        </button>
        <button disabled={!canSave} onClick={() => canSave && onSave(form)}
          className="font-bn flex-2 px-8 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
          📝 {isEdit ? "আপডেট করুন" : "পোস্ট সংরক্ষণ করুন"}
        </button>
      </div>
    </Modal>
  );
}

/* ── Delete Modal ───────────────────────────────────────────────── */
function DeleteModal({ blog, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">🗑️</div>
        <p className="font-dis text-green-900 font-bold text-xl">ব্লগটি মুছবেন?</p>
        <p className="font-bn text-gray-500 text-sm leading-relaxed">
          <span className="font-bold text-green-800">"{blog.title}"</span> স্থায়ীভাবে মুছে যাবে।
          <br />এই কাজ পূর্বাবস্থায় ফেরানো যাবে না।
        </p>
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer bg-transparent">বাতিল</button>
          <button onClick={onConfirm} className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer"
            style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)", boxShadow:"0 4px 14px rgba(239,68,68,.35)" }}>হ্যাঁ, মুছুন</button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Stats Strip ────────────────────────────────────────────────── */
function StatsStrip({ blogs }) {
  const published = blogs.filter(b => b.status === "প্রকাশিত").length;
  const pending   = blogs.filter(b => b.status === "পর্যালোচনাধীন").length;
  const totalV    = blogs.reduce((a,b) => a + (b.views||0), 0);
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon:"📝", label:"মোট ব্লগ",         val:blogs.length,         color:"#16a34a", bg:"bg-green-50"  },
        { icon:"🌐", label:"প্রকাশিত",           val:published,             color:"#22c55e", bg:"bg-emerald-50"},
        { icon:"⏳", label:"অনুমোদনের অপেক্ষায়", val:pending,               color:"#f59e0b", bg:"bg-amber-50",  pulse:pending > 0 },
        { icon:"👁", label:"মোট ভিউ",            val:totalV.toLocaleString(),color:"#0ea5e9", bg:"bg-sky-50"   },
      ].map((s,i) => (
        <div key={i} className={`au ${s.bg} rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm card-lift ${s.pulse ? "ring-2 ring-amber-300" : ""}`}
          style={{ animationDelay:`${i*55}ms` }}>
          <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl shadow-sm flex-shrink-0 relative">
            {s.icon}
            {s.pulse && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 approval-pulse" />}
          </div>
          <div>
            <p className="font-dis font-bold text-2xl leading-none" style={{ color:s.color }}>{s.val}</p>
            <p className="font-bn text-xs font-semibold text-gray-600 mt-1">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Category Breakdown ─────────────────────────────────────────── */
function CatBreakdown({ blogs }) {
  const counts = {};
  blogs.forEach(b => { counts[b.category] = (counts[b.category]||0)+1; });
  const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  const max = Math.max(...Object.values(counts), 1);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"300ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">বিভাগভিত্তিক ব্লগ</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([cat, cnt]) => {
          const cc = CAT_COLOR[cat] || "#16a34a";
          return (
            <div key={cat} className="flex items-center gap-2.5">
              <span className="font-bn text-xs text-gray-500 w-24 flex-shrink-0 truncate text-right">{cat}</span>
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

/* ── Toast ──────────────────────────────────────────────────────── */
const Toast = ({ msg, color }) => (
  <div className="ti fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bn text-sm font-semibold"
    style={{ background:color }}>
    ✓ {msg}
  </div>
);

/* ── MAIN ───────────────────────────────────────────────────────── */
export default function AllBlogs() {
  const [blogs,     setBlogs]     = useState(SEED_BLOGS);
  const [search,    setSearch]    = useState("");
  const [catFlt,    setCatFlt]    = useState("সব");
  const [statusFlt, setStatusFlt] = useState("সব");
  const [sortBy,    setSortBy]    = useState("newest");
  const [viewMode,  setViewMode]  = useState("grid");
  const [modal,     setModal]     = useState(null);
  const [toast,     setToast]     = useState(null);

  const fire = (msg, color="#16a34a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3200);
  };

  const handleSave = (form) => {
    if (form.id) {
      setBlogs(bs => bs.map(b => b.id === form.id ? form : b));
      fire(`"${form.title}" আপডেট হয়েছে ✓`);
    } else {
      setBlogs(bs => [{ ...form, id:Date.now(), views:0, likes:0, comments:0 }, ...bs]);
      fire(`"${form.title}" সংরক্ষিত হয়েছে 🎉`);
    }
    setModal(null);
  };

  const handleApprove = (id) => {
    const title = blogs.find(b => b.id === id)?.title;
    setBlogs(bs => bs.map(b => b.id === id ? { ...b, status:"প্রকাশিত" } : b));
    fire(`"${title}" অনুমোদন ও প্রকাশিত হয়েছে ✓`);
  };

  const handleRejectConfirm = (blog, note) => {
    setBlogs(bs => bs.map(b => b.id === blog.id ? { ...b, status:"প্রত্যাখ্যাত", rejectNote:note } : b));
    fire(`"${blog.title}" প্রত্যাখ্যাত হয়েছে`, "#ef4444");
    setModal(null);
  };

  const handleDelete = (id) => {
    const title = blogs.find(b => b.id === id)?.title;
    setBlogs(bs => bs.filter(b => b.id !== id));
    fire(`ব্লগটি মুছে ফেলা হয়েছে`, "#ef4444");
    setModal(null);
  };

  const handleToggleFeatured = (id) => {
    const blog = blogs.find(b => b.id === id);
    setBlogs(bs => bs.map(b => b.id === id ? { ...b, featured:!b.featured } : b));
    fire(blog?.featured ? "ফিচার্ড থেকে সরানো হয়েছে" : "ফিচার্ড করা হয়েছে ⭐", "#f59e0b");
  };

  const pendingCount = blogs.filter(b => b.status === "পর্যালোচনাধীন").length;

  const filtered = useMemo(() =>
    blogs
      .filter(b => catFlt    === "সব" || b.category === catFlt)
      .filter(b => statusFlt === "সব" || b.status   === statusFlt)
      .filter(b => !search || b.title.includes(search) || b.author.includes(search) || b.excerpt.includes(search) || b.tags?.some(t => t.includes(search)))
      .sort((a,b) => {
        if (sortBy === "views") return b.views - a.views;
        if (sortBy === "likes") return b.likes - a.likes;
        return b.id - a.id;
      }),
    [blogs, catFlt, statusFlt, search, sortBy]
  );

  return (
    <>
      <Fonts />
      <div className="font-bn min-h-screen bg-green-50/30 p-6 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="au flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-bn text-green-500 text-xs uppercase tracking-widest mb-1">উৎকর্ষ ফাউন্ডেশন</p>
            <h1 className="font-dis text-green-900 text-3xl font-bold leading-tight">ব্লগ ব্যবস্থাপনা</h1>
            <p className="font-bn text-gray-400 text-sm mt-1">সকল ব্লগ পোস্ট পরিচালনা ও অনুমোদন</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {pendingCount > 0 && (
              <button onClick={() => setStatusFlt("পর্যালোচনাধীন")}
                className="font-bn flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-amber-700 text-sm cursor-pointer border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 transition-all">
                <span className="approval-pulse w-2 h-2 rounded-full bg-amber-500" />
                {pendingCount} টি অনুমোদনের অপেক্ষায়
              </button>
            )}
            <button onClick={() => setModal({ type:"add" })}
              className="font-bn flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background:"linear-gradient(135deg,#14532d,#22c55e)", boxShadow:"0 6px 20px rgba(22,163,74,.35)" }}>
              <span className="text-lg">＋</span> নতুন ব্লগ
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <StatsStrip blogs={blogs} />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-4 gap-5 items-start">

          {/* 3/4 section */}
          <div className="col-span-3 flex flex-col gap-5">

            {/* filter bar */}
            <div className="au bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center" style={{ animationDelay:"200ms" }}>
              <div className="relative flex-1 min-w-52">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="শিরোনাম, লেখক, ট্যাগ…"
                  className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 transition-all" />
              </div>
              <select value={statusFlt} onChange={e => setStatusFlt(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব অবস্থা</option>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="newest">সর্বশেষ</option>
                <option value="views">সর্বাধিক পঠিত</option>
                <option value="likes">সর্বাধিক পছন্দ</option>
              </select>
              <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
                {[["grid","⊞"],["list","☰"]].map(([m,ic])=>(
                  <button key={m} onClick={() => setViewMode(m)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer border-0 transition-all
                      ${viewMode===m ? "bg-white shadow text-green-700" : "bg-transparent text-gray-400 hover:text-gray-600"}`}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* category chips */}
            <div className="au flex flex-wrap gap-2" style={{ animationDelay:"240ms" }}>
              {["সব", ...CATEGORIES].map(c => (
                <button key={c} onClick={() => setCatFlt(c)}
                  className={`font-bn text-xs font-semibold px-4 py-2 rounded-full cursor-pointer border transition-all
                    ${catFlt === c ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700 shadow-sm"}`}
                  style={catFlt === c ? { background:`linear-gradient(135deg,${CAT_COLOR[c]||"#15803d"}cc,${CAT_COLOR[c]||"#22c55e"})`, boxShadow:`0 2px 8px ${CAT_COLOR[c]||"#16a34a"}44` } : {}}>
                  {c}
                </button>
              ))}
            </div>

            {/* result */}
            <div className="flex items-center justify-between -mt-1">
              <p className="font-bn text-xs text-gray-400">{filtered.length} টি ব্লগ পাওয়া গেছে</p>
              {(search || catFlt !== "সব" || statusFlt !== "সব") && (
                <button onClick={() => { setSearch(""); setCatFlt("সব"); setStatusFlt("সব"); }}
                  className="font-bn text-xs text-green-600 font-semibold hover:underline cursor-pointer bg-transparent border-0">ফিল্টার মুছুন ✕</button>
              )}
            </div>

            {/* ── GRID ── */}
            {viewMode === "grid" && (
              filtered.length > 0 ? (
                <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))" }}>
                  {filtered.map((b,i) => (
                    <BlogCard key={b.id} blog={b} delay={i*45}
                      onView={blog => setModal({ type:"view", blog })}
                      onEdit={blog => setModal({ type:"edit", blog })}
                      onApprove={handleApprove}
                      onReject={blog => setModal({ type:"reject", blog })}
                      onDelete={blog => setModal({ type:"delete", blog })}
                      onToggleFeatured={handleToggleFeatured} />
                  ))}
                </div>
              ) : (
                <div className="si bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center py-20 gap-4">
                  <span className="text-5xl opacity-25">📝</span>
                  <p className="font-dis text-green-800 text-xl font-bold">কোনো ব্লগ পাওয়া যায়নি</p>
                  <button onClick={() => setModal({ type:"add" })}
                    className="font-bn text-sm font-bold text-white px-5 py-2.5 rounded-xl border-0 cursor-pointer"
                    style={{ background:"linear-gradient(135deg,#15803d,#22c55e)" }}>+ নতুন ব্লগ</button>
                </div>
              )
            )}

            {/* ── LIST ── */}
            {viewMode === "list" && (
              <div className="au bg-white rounded-2xl shadow-sm overflow-hidden" style={{ animationDelay:"280ms" }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["ব্লগ","বিভাগ","লেখক","অবস্থা","ভিউ","তারিখ",""].map(h => (
                        <th key={h} className="font-bn text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b,i) => {
                      const cc = CAT_COLOR[b.category]||"#16a34a";
                      const isPending = b.status === "পর্যালোচনাধীন";
                      return (
                        <tr key={b.id} className={`row-hover border-t border-gray-50 cursor-pointer ${isPending ? "bg-amber-50/40" : ""}`}
                          onClick={() => setModal({ type:"view", blog:b })}>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">{b.coverEmoji}</div>
                              <div>
                                <p className="font-bn text-sm font-semibold text-green-900 leading-tight max-w-52 truncate">{b.title}</p>
                                <p className="font-bn text-xs text-gray-400 mt-0.5">⏱ {b.readingTime}</p>
                              </div>
                              {b.featured && <span className="text-sm flex-shrink-0">⭐</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-bn text-xs px-2.5 py-1 rounded-full text-white font-semibold" style={{ background:cc }}>{b.category}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-base">{b.authorAvatar}</span>
                              <span className="font-bn text-xs text-gray-600 truncate max-w-24">{b.author}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5"><StatusChip s={b.status} /></td>
                          <td className="px-4 py-3.5 font-bn text-sm text-gray-500">{b.views.toLocaleString()}</td>
                          <td className="px-4 py-3.5 font-bn text-xs text-gray-400 whitespace-nowrap">{b.publishDate || "—"}</td>
                          <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                            {isPending ? (
                              <div className="flex gap-1.5">
                                <button onClick={() => handleApprove(b.id)}
                                  className="font-bn text-xs px-3 py-1.5 rounded-lg text-white border-0 cursor-pointer"
                                  style={{ background:"linear-gradient(135deg,#15803d,#22c55e)" }}>✓</button>
                                <button onClick={() => setModal({ type:"reject", blog:b })}
                                  className="font-bn text-xs px-3 py-1.5 rounded-lg text-white border-0 cursor-pointer"
                                  style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)" }}>✕</button>
                              </div>
                            ) : (
                              <div className="flex gap-1.5">
                                <button onClick={() => setModal({ type:"edit", blog:b })}
                                  className="font-bn text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer bg-transparent">✎</button>
                                <button onClick={() => setModal({ type:"delete", blog:b })}
                                  className="font-bn text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 cursor-pointer bg-transparent">🗑</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-14 text-center">
                    <p className="font-bn text-gray-400 text-sm">কোনো ব্লগ পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* sidebar */}
          <div className="col-span-1 flex flex-col gap-4 sticky top-4">
            {/* pending approval highlight */}
            {pendingCount > 0 && (
              <div className="au bg-amber-50 border-2 border-amber-300 rounded-2xl p-4" style={{ animationDelay:"260ms" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="approval-pulse w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                  <p className="font-dis text-amber-800 font-bold text-sm">অনুমোদন প্রয়োজন</p>
                </div>
                <p className="font-bn text-xs text-amber-600 mb-3">{pendingCount} টি ব্লগ অপেক্ষায় আছে</p>
                <button onClick={() => setStatusFlt("পর্যালোচনাধীন")}
                  className="font-bn w-full py-2 rounded-xl text-xs font-bold text-white border-0 cursor-pointer"
                  style={{ background:"linear-gradient(135deg,#d97706,#f59e0b)" }}>
                  এখনই দেখুন →
                </button>
              </div>
            )}

            <CatBreakdown blogs={blogs} />

            {/* status summary */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"360ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">অবস্থার সারসংক্ষেপ</p>
              {STATUSES.map(s => {
                const m   = STATUS_META[s];
                const cnt = blogs.filter(b => b.status === s).length;
                return (
                  <div key={s} className="flex items-center gap-2.5 mb-2.5 last:mb-0 cursor-pointer group" onClick={() => setStatusFlt(s)}>
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.dot}`} />
                    <span className="font-bn text-xs text-gray-500 flex-1 group-hover:text-green-700 transition-colors">{m.icon} {s}</span>
                    <span className={`font-bn text-xs font-bold px-2.5 py-0.5 rounded-full ${m.bg} ${m.text}`}>{cnt}</span>
                  </div>
                );
              })}
            </div>

            {/* top blogs */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"420ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">সর্বাধিক পঠিত</p>
              {[...blogs].filter(b => b.status === "প্রকাশিত").sort((a,b) => b.views-a.views).slice(0,4).map((b,i) => (
                <div key={b.id} className="flex items-center gap-2.5 mb-3 last:mb-0">
                  <span className="font-bn text-xs font-bold text-gray-400 w-4 flex-shrink-0">{i+1}</span>
                  <span className="text-xl flex-shrink-0">{b.coverEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bn text-xs font-semibold text-green-900 truncate leading-tight">{b.title}</p>
                    <p className="font-bn text-xs text-gray-400 mt-0.5">👁 {b.views.toLocaleString()}</p>
                  </div>
                  {i===0&&<span className="text-base flex-shrink-0">🥇</span>}
                  {i===1&&<span className="text-base flex-shrink-0">🥈</span>}
                  {i===2&&<span className="text-base flex-shrink-0">🥉</span>}
                </div>
              ))}
            </div>

            {/* author breakdown */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"480ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">লেখকের ভূমিকা</p>
              {AUTHOR_ROLES.map(role => {
                const cnt = blogs.filter(b => b.authorRole === role).length;
                if (!cnt) return null;
                return (
                  <div key={role} className="flex items-center gap-2 mb-2 last:mb-0">
                    <span className="font-bn text-xs text-gray-500 flex-1">{role}</span>
                    <span className="font-bn text-xs font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === "view"   && <ViewModal   blog={modal.blog} onClose={() => setModal(null)} onEdit={b => setModal({ type:"edit", blog:b })} onApprove={handleApprove} onReject={b => setModal({ type:"reject", blog:b })} />}
      {modal?.type === "add"    && <FormModal   initial={EMPTY_FORM} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "edit"   && <FormModal   initial={modal.blog} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "reject" && <RejectModal blog={modal.blog} onClose={() => setModal(null)} onConfirm={note => handleRejectConfirm(modal.blog, note)} />}
      {modal?.type === "delete" && <DeleteModal blog={modal.blog} onClose={() => setModal(null)} onConfirm={() => handleDelete(modal.blog.id)} />}

      {toast && <Toast msg={toast.msg} color={toast.color} />}
    </>
  );
}