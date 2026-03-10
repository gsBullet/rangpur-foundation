import { useState, useMemo } from "react";

/* ── Fonts & Keyframes ──────────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    .font-bn  { font-family:'Hind Siliguri',sans-serif !important }
    .font-dis { font-family:'Tiro Bangla',serif !important }

    @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn { from{opacity:0;transform:scale(.93)}       to{opacity:1;transform:scale(1)}     }
    @keyframes modalIn { from{opacity:0;transform:translateY(28px) scale(.96)} to{opacity:1;transform:none} }
    @keyframes overlayIn{from{opacity:0} to{opacity:1}}
    @keyframes toastIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none}}
    @keyframes spin    { to{transform:rotate(360deg)} }
    @keyframes ripple  { to{transform:scale(3.5);opacity:0} }

    .au { animation:fadeUp   .48s cubic-bezier(.22,.68,0,1.1) both }
    .si { animation:scaleIn  .38s cubic-bezier(.22,.68,0,1.2) both }
    .mi { animation:modalIn  .42s cubic-bezier(.22,.68,0,1.15) both }
    .ov { animation:overlayIn .24s ease both }
    .ti { animation:toastIn  .38s cubic-bezier(.22,.68,0,1.2) both }

    .card-lift { transition:transform .24s,box-shadow .24s }
    .card-lift:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,0,0,.09)!important }

    input:focus,textarea:focus,select:focus{
      outline:none;border-color:#16a34a!important;
      box-shadow:0 0 0 3px rgba(22,163,74,.14)!important;
    }
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:#86efac;border-radius:4px}

    .avatar-ring { box-shadow:0 0 0 3px white,0 0 0 5px var(--ring) }
  `}</style>
);

/* ── Static seed data ─────────────────────────────────────────────── */
const DEPARTMENTS  = ["সব","শিক্ষা","স্বাস্থ্য","নারী উন্নয়ন","শিশু","পরিবেশ","আইনি সহায়তা","প্রশাসন"];
const STATUSES     = ["সক্রিয়","বিরতি","প্রশিক্ষণে"];
const SKILL_OPTS   = ["শিক্ষাদান","চিকিৎসা","আইনি পরামর্শ","কম্পিউটার","সেলাই","কৃষি","ফটোগ্রাফি","সামাজিক কাজ","নেতৃত্ব","যোগাযোগ"];
const DIST         = ["রংপুর সদর","গাইবান্ধা","কুড়িগ্রাম","দিনাজপুর","নীলফামারী","লালমনিরহাট","ঠাকুরগাঁও","পঞ্চগড়"];

const AVATARS = ["👨","👩","👦","👧","🧔","👱","🧑","👴","👵"];

const STATUS_META = {
  "সক্রিয়":    { bg:"bg-green-100", text:"text-green-700",  dot:"bg-green-500",  ring:"#16a34a" },
  "বিরতি":     { bg:"bg-amber-100", text:"text-amber-700",  dot:"bg-amber-400",  ring:"#f59e0b" },
  "প্রশিক্ষণে": { bg:"bg-blue-100",  text:"text-blue-700",   dot:"bg-blue-500",   ring:"#3b82f6" },
};

const DEPT_COLOR = {
  "শিক্ষা":        "#16a34a",
  "স্বাস্থ্য":      "#0ea5e9",
  "নারী উন্নয়ন":  "#d946ef",
  "শিশু":          "#f97316",
  "পরিবেশ":        "#10b981",
  "আইনি সহায়তা":  "#8b5cf6",
  "প্রশাসন":       "#64748b",
};

const SEED = [
  { id:1,  name:"রহিম উদ্দিন",   phone:"01711-234567", email:"rahim@email.com",   dept:"শিক্ষা",       status:"সক্রিয়",    district:"রংপুর সদর",  joined:"জানু, ২০২৩", hours:320, avatar:"👨", skills:["শিক্ষাদান","নেতৃত্ব"],       note:"দুর্দান্ত শিক্ষাদানে পটু।" },
  { id:2,  name:"সুমাইয়া বেগম", phone:"01812-345678", email:"sumaiya@email.com", dept:"স্বাস্থ্য",     status:"সক্রিয়",    district:"গাইবান্ধা",  joined:"মার্চ, ২০২২", hours:540, avatar:"👩", skills:["চিকিৎসা","সামাজিক কাজ"],   note:"মাঠ পর্যায়ে অভিজ্ঞ।" },
  { id:3,  name:"করিম হোসেন",   phone:"01913-456789", email:"karim@email.com",  dept:"পরিবেশ",        status:"সক্রিয়",    district:"কুড়িগ্রাম",  joined:"জুন, ২০২৩",  hours:210, avatar:"🧔", skills:["কৃষি","সামাজিক কাজ"],       note:"জলবায়ু প্রকল্পে নিবেদিত।" },
  { id:4,  name:"নাজমা আক্তার",  phone:"01611-567890", email:"nazma@email.com",  dept:"নারী উন্নয়ন", status:"বিরতি",     district:"দিনাজপুর",   joined:"সেপ্টে, ২০২২",hours:180, avatar:"👩", skills:["সেলাই","যোগাযোগ"],          note:"মাতৃত্বকালীন ছুটিতে।" },
  { id:5,  name:"তারিক হাসান",   phone:"01511-678901", email:"tariq@email.com",  dept:"আইনি সহায়তা", status:"প্রশিক্ষণে", district:"নীলফামারী",  joined:"নভে, ২০২৩",  hours:90,  avatar:"👱", skills:["আইনি পরামর্শ"],             note:"বার কাউন্সিল পরীক্ষার প্রস্তুতি।" },
  { id:6,  name:"শিরিন আক্তার",  phone:"01711-789012", email:"shirin@email.com", dept:"শিশু",          status:"সক্রিয়",    district:"লালমনিরহাট", joined:"ফেব্রু, ২০২২",hours:460, avatar:"👧", skills:["শিক্ষাদান","সামাজিক কাজ"],   note:"শিশু পুষ্টি প্রকল্পে কাজ করছেন।" },
  { id:7,  name:"জাহিদুল ইসলাম", phone:"01812-890123", email:"zahid@email.com",  dept:"প্রশাসন",       status:"সক্রিয়",    district:"রংপুর সদর",  joined:"জানু, ২০২১", hours:780, avatar:"🧑", skills:["কম্পিউটার","নেতৃত্ব","যোগাযোগ"], note:"ডেটাবেজ ম্যানেজমেন্টে পটু।" },
  { id:8,  name:"রওশন আরা",      phone:"01913-901234", email:"rowshan@email.com",dept:"নারী উন্নয়ন", status:"সক্রিয়",    district:"ঠাকুরগাঁও",  joined:"এপ্রি, ২০২২",hours:390, avatar:"👵", skills:["সেলাই","যোগাযোগ","নেতৃত্ব"],  note:"নারী উদ্যোক্তা প্রকল্পে সক্রিয়।" },
];

const EMPTY = {
  name:"", phone:"", email:"", dept:"শিক্ষা", status:"সক্রিয়",
  district:"রংপুর সদর", joined:"", hours:0, avatar:"👤", skills:[], note:"",
};

/* ── helpers ──────────────────────────────────────────────────────── */
const initials = (name) => name ? name.split(" ").map(w=>w[0]).join("").slice(0,2) : "?";

function Avatar({ vol, size=48 }) {
  const m = STATUS_META[vol.status] ?? STATUS_META["সক্রিয়"];
  return (
    <div className="relative flex-shrink-0" style={{ width:size, height:size }}>
      <div
        className="w-full h-full rounded-2xl flex items-center justify-center font-dis font-bold text-white select-none"
        style={{
          fontSize: size*0.35,
          background:`linear-gradient(135deg,${DEPT_COLOR[vol.dept]||"#16a34a"}cc,${DEPT_COLOR[vol.dept]||"#16a34a"})`,
          "--ring": m.ring,
        }}
      >
        {initials(vol.name)}
      </div>
      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${m.dot}`} />
    </div>
  );
}

const StatusChip = ({ s }) => {
  const m = STATUS_META[s] ?? STATUS_META["সক্রিয়"];
  return (
    <span className={`font-bn inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {s}
    </span>
  );
};

/* ── VolunteerCard ────────────────────────────────────────────────── */
function VolunteerCard({ vol, delay, onEdit, onDelete }) {
  const dc = DEPT_COLOR[vol.dept] || "#16a34a";
  return (
    <div className="au card-lift bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
      style={{ animationDelay:`${delay}ms` }}>

      {/* colour strip */}
      <div className="h-1.5" style={{ background: dc }} />

      {/* card header */}
      <div className="px-5 pt-5 pb-4 flex items-start gap-4">
        <Avatar vol={vol} size={52} />
        <div className="flex-1 min-w-0">
          <p className="font-dis text-green-900 font-bold text-base leading-tight truncate">{vol.name}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold"
              style={{ background: dc }}>{vol.dept}</span>
            <StatusChip s={vol.status} />
          </div>
        </div>
      </div>

      {/* info */}
      <div className="px-5 pb-4 flex flex-col gap-3 flex-1">
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon:"📞", val: vol.phone },
            { icon:"📍", val: vol.district },
            { icon:"📅", val: vol.joined },
            { icon:"⏱️", val: `${vol.hours} ঘণ্টা` },
          ].map((r,i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-sm flex-shrink-0">{r.icon}</span>
              <span className="font-bn text-xs text-gray-500 truncate">{r.val}</span>
            </div>
          ))}
        </div>

        {/* skills */}
        {vol.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {vol.skills.map(sk => (
              <span key={sk} className="font-bn text-xs px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 font-medium border border-green-100">
                {sk}
              </span>
            ))}
          </div>
        )}

        {/* note */}
        {vol.note && (
          <p className="font-bn text-xs text-gray-400 italic leading-relaxed line-clamp-2">"{vol.note}"</p>
        )}

        {/* hours bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-bn text-xs text-gray-400">স্বেচ্ছাসেবী ঘণ্টা</span>
            <span className="font-bn text-xs font-bold" style={{ color: dc }}>{vol.hours}h</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full"
              style={{ width:`${Math.min(vol.hours/10,100)}%`, background:`linear-gradient(90deg,${dc},${dc}88)`, transition:"width .7s cubic-bezier(.22,.68,0,1.1)" }} />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="px-5 py-3 border-t border-gray-50 flex gap-2">
        <button onClick={() => onEdit(vol)}
          className="font-bn flex-1 text-xs font-semibold py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">
          ✎ সম্পাদনা
        </button>
        <button onClick={() => onDelete(vol.id)}
          className="font-bn text-xs font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
          🗑
        </button>
      </div>
    </div>
  );
}

/* ── Modal shell ──────────────────────────────────────────────────── */
function Modal({ onClose, children }) {
  return (
    <div className="ov fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,.48)", backdropFilter:"blur(5px)" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="mi w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ── View Modal ───────────────────────────────────────────────────── */
function ViewModal({ vol, onClose, onEdit }) {
  const dc = DEPT_COLOR[vol.dept] || "#16a34a";
  return (
    <Modal onClose={onClose}>
      {/* hero */}
      <div className="relative px-7 pt-7 pb-5 flex items-center gap-5"
        style={{ background:`linear-gradient(135deg,${dc}18,${dc}08)`, borderBottom:"1px solid #f0fdf4" }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        <Avatar vol={vol} size={68} />
        <div>
          <p className="font-dis text-green-900 font-bold text-xl leading-tight">{vol.name}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-bn text-xs px-2.5 py-0.5 rounded-full text-white font-semibold"
              style={{ background: dc }}>{vol.dept}</span>
            <StatusChip s={vol.status} />
          </div>
        </div>
      </div>

      <div className="px-7 py-5 flex flex-col gap-4">
        {/* contact grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon:"📞", label:"ফোন",        val: vol.phone },
            { icon:"✉️",  label:"ইমেইল",      val: vol.email },
            { icon:"📍", label:"জেলা",        val: vol.district },
            { icon:"📅", label:"যোগদান",      val: vol.joined },
            { icon:"⏱️", label:"মোট ঘণ্টা",  val:`${vol.hours} ঘণ্টা` },
          ].map(r => (
            <div key={r.label} className="bg-green-50/60 rounded-xl px-4 py-3">
              <p className="font-bn text-xs text-gray-400">{r.icon} {r.label}</p>
              <p className="font-bn text-sm font-bold text-green-800 mt-0.5 break-all">{r.val}</p>
            </div>
          ))}
        </div>

        {/* skills */}
        {vol.skills.length > 0 && (
          <div>
            <p className="font-bn text-xs font-semibold text-green-800 mb-2">দক্ষতা</p>
            <div className="flex flex-wrap gap-2">
              {vol.skills.map(sk => (
                <span key={sk} className="font-bn text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">{sk}</span>
              ))}
            </div>
          </div>
        )}

        {/* note */}
        {vol.note && (
          <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
            <p className="font-bn text-xs text-amber-600 font-semibold mb-1">📝 নোট</p>
            <p className="font-bn text-sm text-gray-600 leading-relaxed">{vol.note}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
            বন্ধ করুন
          </button>
          <button onClick={() => { onClose(); onEdit(vol); }}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all"
            style={{ background:`linear-gradient(135deg,${dc}cc,${dc})`, boxShadow:`0 4px 14px ${dc}44` }}>
            ✎ সম্পাদনা করুন
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Form Modal ───────────────────────────────────────────────────── */
function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({ ...initial, skills:[...(initial.skills||[])] });
  const isEdit = !!initial.id;
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));
  const toggleSkill = (sk) =>
    set("skills", form.skills.includes(sk) ? form.skills.filter(s=>s!==sk) : [...form.skills,sk]);

  const fc = "font-bn w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white transition-all";
  const lc = "font-bn block text-xs font-semibold text-green-800 mb-1.5";
  const dc = DEPT_COLOR[form.dept] || "#16a34a";

  return (
    <Modal onClose={onClose}>
      {/* header */}
      <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          {isEdit && <Avatar vol={form} size={38} />}
          <p className="font-dis text-green-900 font-bold text-lg">
            {isEdit ? `সম্পাদনা — ${form.name}` : "নতুন স্বেচ্ছাসেবী যোগ করুন"}
          </p>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm cursor-pointer border-0">✕</button>
      </div>

      <div className="px-7 py-5 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight:"64vh" }}>

        {/* avatar picker */}
        <div>
          <label className={lc}>অ্যাভাটার</label>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map(a => (
              <button key={a} onClick={()=>set("avatar",a)}
                className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center cursor-pointer border-2 transition-all
                  ${form.avatar===a ? "border-green-500 bg-green-50 scale-110" : "border-gray-100 bg-gray-50 hover:border-green-300"}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* name + phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>পূর্ণ নাম *</label>
            <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="নাম লিখুন" className={fc} />
          </div>
          <div>
            <label className={lc}>মোবাইল নম্বর</label>
            <input value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="01XXX-XXXXXX" className={fc} />
          </div>
        </div>

        {/* email */}
        <div>
          <label className={lc}>ইমেইল</label>
          <input value={form.email} onChange={e=>set("email",e.target.value)} placeholder="example@email.com" className={fc} />
        </div>

        {/* dept + status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>বিভাগ</label>
            <select value={form.dept} onChange={e=>set("dept",e.target.value)} className={fc}>
              {DEPARTMENTS.filter(d=>d!=="সব").map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>অবস্থা</label>
            <select value={form.status} onChange={e=>set("status",e.target.value)} className={fc}>
              {STATUSES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* district + joined */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>জেলা</label>
            <select value={form.district} onChange={e=>set("district",e.target.value)} className={fc}>
              {DIST.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>যোগদানের তারিখ</label>
            <input value={form.joined} onChange={e=>set("joined",e.target.value)} placeholder="যেমন: জানু, ২০২৪" className={fc} />
          </div>
        </div>

        {/* hours */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className={lc + " mb-0"}>স্বেচ্ছাসেবী ঘণ্টা</label>
            <span className="font-bn text-xs font-bold text-green-600">{form.hours}h</span>
          </div>
          <input type="range" min={0} max={1000} step={10} value={form.hours}
            onChange={e=>set("hours",Number(e.target.value))}
            className="w-full accent-green-500 cursor-pointer" />
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1.5">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width:`${Math.min(form.hours/10,100)}%`, background:`linear-gradient(90deg,${dc},${dc}88)` }} />
          </div>
        </div>

        {/* skills */}
        <div>
          <label className={lc}>দক্ষতা</label>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTS.map(sk => (
              <button key={sk} onClick={()=>toggleSkill(sk)}
                className={`font-bn text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer border transition-all
                  ${form.skills.includes(sk)
                    ? "text-white border-transparent"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700"}`}
                style={form.skills.includes(sk) ? { background:`linear-gradient(135deg,${dc}cc,${dc})` } : {}}>
                {sk}
              </button>
            ))}
          </div>
        </div>

        {/* note */}
        <div>
          <label className={lc}>নোট</label>
          <textarea value={form.note} onChange={e=>set("note",e.target.value)}
            rows={2} placeholder="অতিরিক্ত তথ্য…" className={`${fc} resize-none`} />
        </div>
      </div>

      {/* footer */}
      <div className="px-7 py-4 border-t border-gray-50 flex gap-3">
        <button onClick={onClose}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
          বাতিল
        </button>
        <button disabled={!form.name.trim()} onClick={()=>form.name.trim()&&onSave(form)}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background:`linear-gradient(135deg,#15803d,#22c55e)`, boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
          {isEdit ? "আপডেট করুন ✓" : "যোগ করুন ✓"}
        </button>
      </div>
    </Modal>
  );
}

/* ── Stats strip ──────────────────────────────────────────────────── */
function StatsStrip({ vols }) {
  const active   = vols.filter(v=>v.status==="সক্রিয়").length;
  const training = vols.filter(v=>v.status==="প্রশিক্ষণে").length;
  const totalH   = vols.reduce((a,v)=>a+(v.hours||0),0);
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon:"🤝", label:"মোট স্বেচ্ছাসেবী",   val: vols.length,           color:"#16a34a", bg:"bg-green-50"  },
        { icon:"🟢", label:"সক্রিয়",              val: active,                color:"#22c55e", bg:"bg-emerald-50"},
        { icon:"📚", label:"প্রশিক্ষণে",           val: training,              color:"#3b82f6", bg:"bg-blue-50"   },
        { icon:"⏱️", label:"মোট স্বেচ্ছাসেবী ঘণ্টা",val:`${totalH.toLocaleString()}h`, color:"#f59e0b", bg:"bg-amber-50" },
      ].map((s,i)=>(
        <div key={i} className={`au ${s.bg} rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm`}
          style={{ animationDelay:`${i*55}ms` }}>
          <span className="text-2xl">{s.icon}</span>
          <div>
            <p className="font-dis font-bold text-2xl leading-none" style={{ color:s.color }}>{s.val}</p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Department breakdown bar ─────────────────────────────────────── */
function DeptBreakdown({ vols }) {
  const counts = {};
  vols.forEach(v => { counts[v.dept] = (counts[v.dept]||0)+1; });
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const max = Math.max(...Object.values(counts), 1);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-6" style={{ animationDelay:"280ms" }}>
      <p className="font-dis text-green-900 font-bold text-base mb-4">বিভাগভিত্তিক বিতরণ</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([dept, count]) => (
          <div key={dept} className="flex items-center gap-3">
            <span className="font-bn text-xs text-gray-500 w-28 flex-shrink-0 text-right">{dept}</span>
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width:`${(count/max)*100}%`, background:`linear-gradient(90deg,${DEPT_COLOR[dept]||"#16a34a"},${DEPT_COLOR[dept]||"#16a34a"}88)` }} />
            </div>
            <span className="font-bn text-xs font-bold text-green-800 w-6 text-center">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Toast ────────────────────────────────────────────────────────── */
function Toast({ msg, color }) {
  return (
    <div className="ti fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bn text-sm font-semibold"
      style={{ background: color }}>
      ✓ {msg}
    </div>
  );
}

/* ── Delete confirm ───────────────────────────────────────────────── */
function DeleteModal({ vol, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">🗑️</div>
        <p className="font-dis text-green-900 font-bold text-xl">নিশ্চিত করুন</p>
        <p className="font-bn text-gray-500 text-sm leading-relaxed">
          আপনি কি <span className="font-bold text-green-800">{vol.name}</span>-কে তালিকা থেকে মুছে ফেলতে চান?
          <br />এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
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

/* ── Main ─────────────────────────────────────────────────────────── */
export default function Volunteers() {
  const [vols,      setVols]      = useState(SEED);
  const [search,    setSearch]    = useState("");
  const [deptFlt,   setDeptFlt]   = useState("সব");
  const [statusFlt, setStatusFlt] = useState("সব");
  const [sortBy,    setSortBy]    = useState("default");
  const [viewMode,  setViewMode]  = useState("grid");   // grid | list
  const [modal,     setModal]     = useState(null);
  // { type: "add" | "edit" | "view" | "delete", vol? }
  const [toast,     setToast]     = useState(null);

  const fire = (msg, color="#16a34a") => {
    setToast({ msg, color });
    setTimeout(()=>setToast(null), 3000);
  };

  const handleSave = (form) => {
    if (form.id) {
      setVols(v => v.map(x => x.id===form.id ? form : x));
      fire(`${form.name}-এর তথ্য আপডেট হয়েছে ✓`);
    } else {
      setVols(v => [{ ...form, id:Date.now() }, ...v]);
      fire(`${form.name} স্বেচ্ছাসেবী হিসেবে যোগ হয়েছেন 🎉`);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    const name = vols.find(v=>v.id===id)?.name;
    setVols(v => v.filter(x=>x.id!==id));
    fire(`${name} তালিকা থেকে মুছে ফেলা হয়েছে`, "#ef4444");
    setModal(null);
  };

  const filtered = useMemo(()=>
    vols
      .filter(v => deptFlt==="সব" || v.dept===deptFlt)
      .filter(v => statusFlt==="সব" || v.status===statusFlt)
      .filter(v => !search || v.name.includes(search) || v.phone.includes(search) || v.district.includes(search) || v.skills.some(s=>s.includes(search)))
      .sort((a,b) => sortBy==="hours" ? b.hours-a.hours : sortBy==="name" ? a.name.localeCompare(b.name,"bn") : 0),
    [vols, deptFlt, statusFlt, search, sortBy]
  );

  return (
    <>
      <Fonts />
      <div className="font-bn min-h-screen bg-green-50/30 p-6 flex flex-col gap-6">

        {/* ── Page header ── */}
        <div className="au flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-bn text-green-500 text-xs uppercase tracking-widest mb-1">উৎকর্ষ ফাউন্ডেশন</p>
            <h1 className="font-dis text-green-900 text-3xl font-bold leading-tight">স্বেচ্ছাসেবী ব্যবস্থাপনা</h1>
            <p className="font-bn text-gray-400 text-sm mt-1">সকল স্বেচ্ছাসেবীর তালিকা পরিচালনা করুন</p>
          </div>
          <button onClick={()=>setModal({type:"add"})}
            className="font-bn flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background:"linear-gradient(135deg,#14532d,#22c55e)", boxShadow:"0 6px 20px rgba(22,163,74,.35)" }}>
            <span className="text-lg">＋</span> নতুন স্বেচ্ছাসেবী
          </button>
        </div>

        {/* ── Stats ── */}
        <StatsStrip vols={vols} />

        {/* ── Main grid: filter + breakdown ── */}
        <div className="grid grid-cols-4 gap-5 items-start">

          {/* ── Filters (left 3/4) ── */}
          <div className="col-span-3 flex flex-col gap-5">

            {/* filter bar */}
            <div className="au bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center" style={{ animationDelay:"220ms" }}>
              {/* search */}
              <div className="relative flex-1 min-w-48">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="নাম, জেলা, দক্ষতা…"
                  className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 transition-all" />
              </div>
              {/* status */}
              <select value={statusFlt} onChange={e=>setStatusFlt(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব অবস্থা</option>
                {STATUSES.map(s=><option key={s}>{s}</option>)}
              </select>
              {/* sort */}
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="default">ডিফল্ট</option>
                <option value="hours">ঘণ্টা অনুযায়ী</option>
                <option value="name">নাম অনুযায়ী</option>
              </select>
              {/* view mode */}
              <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
                {[["grid","⊞"],["list","☰"]].map(([m,ic])=>(
                  <button key={m} onClick={()=>setViewMode(m)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer border-0 transition-all
                      ${viewMode===m ? "bg-white shadow text-green-700" : "bg-transparent text-gray-400 hover:text-gray-600"}`}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* dept chips */}
            <div className="au flex flex-wrap gap-2" style={{ animationDelay:"260ms" }}>
              {DEPARTMENTS.map(d=>(
                <button key={d} onClick={()=>setDeptFlt(d)}
                  className={`font-bn text-xs font-semibold px-4 py-2 rounded-full cursor-pointer border transition-all
                    ${deptFlt===d ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700 shadow-sm"}`}
                  style={deptFlt===d ? { background:`linear-gradient(135deg,${DEPT_COLOR[d]||"#15803d"},${DEPT_COLOR[d]||"#22c55e"})`, boxShadow:`0 2px 8px ${DEPT_COLOR[d]||"#16a34a"}44` } : {}}>
                  {d}
                </button>
              ))}
            </div>

            {/* result count */}
            {(search||deptFlt!=="সব"||statusFlt!=="সব") && (
              <p className="font-bn text-xs text-gray-400 -mt-2">{filtered.length} জন স্বেচ্ছাসেবী পাওয়া গেছে</p>
            )}

            {/* ── Grid view ── */}
            {viewMode==="grid" && (
              filtered.length > 0 ? (
                <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))" }}>
                  {filtered.map((v,i) => (
                    <div key={v.id} onClick={()=>setModal({type:"view",vol:v})} className="cursor-pointer">
                      <VolunteerCard vol={v} delay={i*45}
                        onEdit={vol=>{ setModal({type:"edit",vol}); }}
                        onDelete={id=>setModal({type:"delete",vol:vols.find(x=>x.id===id)})} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="si bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center py-20 gap-4">
                  <span className="text-5xl opacity-25">🔍</span>
                  <p className="font-dis text-green-800 text-xl font-bold">কোনো স্বেচ্ছাসেবী পাওয়া যায়নি</p>
                  <button onClick={()=>{setSearch("");setDeptFlt("সব");setStatusFlt("সব");}}
                    className="font-bn text-sm font-semibold text-green-600 border border-green-200 px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors cursor-pointer bg-transparent">
                    ফিল্টার মুছুন
                  </button>
                </div>
              )
            )}

            {/* ── List view ── */}
            {viewMode==="list" && (
              <div className="au bg-white rounded-2xl shadow-sm overflow-hidden" style={{ animationDelay:"300ms" }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["স্বেচ্ছাসেবী","বিভাগ","জেলা","অবস্থা","ঘণ্টা",""].map(h=>(
                        <th key={h} className="font-bn text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5 first:pl-5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v,i)=>{
                      const dc2 = DEPT_COLOR[v.dept]||"#16a34a";
                      return (
                        <tr key={v.id} className="border-t border-gray-50 hover:bg-green-50/40 transition-colors cursor-pointer"
                          onClick={()=>setModal({type:"view",vol:v})}>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <Avatar vol={v} size={36} />
                              <div>
                                <p className="font-bn text-sm font-semibold text-green-900">{v.name}</p>
                                <p className="font-bn text-xs text-gray-400">{v.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-bn text-xs px-2.5 py-1 rounded-full text-white font-semibold"
                              style={{ background: dc2 }}>{v.dept}</span>
                          </td>
                          <td className="px-5 py-3.5 font-bn text-sm text-gray-500">{v.district}</td>
                          <td className="px-5 py-3.5"><StatusChip s={v.status} /></td>
                          <td className="px-5 py-3.5 font-bn text-sm font-bold text-green-700">{v.hours}h</td>
                          <td className="px-5 py-3.5">
                            <div className="flex gap-1.5" onClick={e=>e.stopPropagation()}>
                              <button onClick={()=>setModal({type:"edit",vol:v})}
                                className="font-bn text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">✎</button>
                              <button onClick={()=>setModal({type:"delete",vol:v})}
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
                    <p className="font-bn text-gray-400 text-sm">কোনো ফলাফল নেই</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Sidebar: breakdown ── */}
          <div className="col-span-1 flex flex-col gap-4 sticky top-4">
            <DeptBreakdown vols={vols} />

            {/* top contributors */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"340ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">শীর্ষ অবদানকারী</p>
              <div className="flex flex-col gap-2.5">
                {[...vols].sort((a,b)=>b.hours-a.hours).slice(0,4).map((v,i) => (
                  <div key={v.id} className="flex items-center gap-2.5">
                    <span className="font-bn text-xs font-bold text-gray-400 w-4">{i+1}</span>
                    <Avatar vol={v} size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bn text-xs font-semibold text-green-900 truncate">{v.name}</p>
                      <p className="font-bn text-xs text-gray-400">{v.hours}h</p>
                    </div>
                    {i===0 && <span className="text-base">🥇</span>}
                    {i===1 && <span className="text-base">🥈</span>}
                    {i===2 && <span className="text-base">🥉</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type==="view"   && <ViewModal   vol={modal.vol} onClose={()=>setModal(null)} onEdit={v=>setModal({type:"edit",vol:v})} />}
      {(modal?.type==="add"||modal?.type==="edit") && (
        <FormModal initial={modal.type==="edit" ? modal.vol : EMPTY} onClose={()=>setModal(null)} onSave={handleSave} />
      )}
      {modal?.type==="delete" && <DeleteModal vol={modal.vol} onClose={()=>setModal(null)} onConfirm={()=>handleDelete(modal.vol.id)} />}

      {/* ── Toast ── */}
      {toast && <Toast msg={toast.msg} color={toast.color} />}
    </>
  );
}