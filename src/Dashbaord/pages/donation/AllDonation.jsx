import { useState, useMemo } from "react";

/* ── Fonts & Keyframes ──────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    .font-bn  { font-family:'Hind Siliguri',sans-serif !important }
    .font-dis { font-family:'Tiro Bangla',serif !important }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(.94)}       to{opacity:1;transform:scale(1)}     }
    @keyframes modalIn   { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:none} }
    @keyframes overlayIn { from{opacity:0} to{opacity:1} }
    @keyframes toastIn   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
    @keyframes countUp   { from{opacity:0;transform:scale(.7)}        to{opacity:1;transform:scale(1)} }
    @keyframes barGrow   { from{width:0} to{width:var(--w)} }
    @keyframes shimmer   { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
    @keyframes pulse2    { 0%,100%{opacity:1} 50%{opacity:.35} }
    @keyframes slideRight{ from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }

    .au  { animation:fadeUp    .48s cubic-bezier(.22,.68,0,1.1) both }
    .si  { animation:scaleIn   .38s cubic-bezier(.22,.68,0,1.2) both }
    .mi  { animation:modalIn   .4s  cubic-bezier(.22,.68,0,1.15) both }
    .ov  { animation:overlayIn .22s ease both }
    .ti  { animation:toastIn   .38s cubic-bezier(.22,.68,0,1.2) both }
    .cu  { animation:countUp   .55s cubic-bezier(.22,.68,0,1.2) both }
    .srr { animation:slideRight .4s  cubic-bezier(.22,.68,0,1.1) both }
    .bar { animation:barGrow   .9s  cubic-bezier(.22,.68,0,1.1) both }

    .row-hover { transition:background .15s }
    .row-hover:hover { background:#f0fdf4 }
    .card-lift { transition:transform .22s,box-shadow .22s }
    .card-lift:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,0,0,.09)!important }

    input:focus,textarea:focus,select:focus {
      outline:none;border-color:#16a34a!important;
      box-shadow:0 0 0 3px rgba(22,163,74,.14)!important;
    }
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:#86efac;border-radius:4px}

    .shimmer-sk {
      background:linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%);
      background-size:600px 100%;
      animation:shimmer 1.4s infinite linear;
    }
  `}</style>
);

/* ── Constants ──────────────────────────────────────────────────── */
const METHODS   = ["bKash","Nagad","রকেট","ব্যাংক ট্রান্সফার","নগদ","চেক"];
const PROGRAMS  = ["শিক্ষা","স্বাস্থ্য","নারী উন্নয়ন","শিশু","পরিবেশ","আইনি সহায়তা","বেকারত্ব","সাধারণ ফান্ড"];
const DISTRICTS = ["রংপুর সদর","গাইবান্ধা","কুড়িগ্রাম","দিনাজপুর","নীলফামারী","লালমনিরহাট","ঠাকুরগাঁও","পঞ্চগড়","ঢাকা","চট্টগ্রাম","অন্যান্য"];
const TYPES     = ["এককালীন","মাসিক","বার্ষিক","বিশেষ"];

const METHOD_META = {
  "bKash":          { bg:"bg-pink-100",   text:"text-pink-700",   icon:"📱" },
  "Nagad":          { bg:"bg-orange-100", text:"text-orange-700", icon:"📲" },
  "রকেট":           { bg:"bg-purple-100", text:"text-purple-700", icon:"🚀" },
  "ব্যাংক ট্রান্সফার":{ bg:"bg-blue-100",  text:"text-blue-700",  icon:"🏦" },
  "নগদ":            { bg:"bg-green-100",  text:"text-green-700",  icon:"💵" },
  "চেক":            { bg:"bg-gray-100",   text:"text-gray-700",   icon:"📄" },
};

const TYPE_META = {
  "এককালীন": { bg:"bg-green-100",  text:"text-green-700"  },
  "মাসিক":    { bg:"bg-blue-100",   text:"text-blue-700"   },
  "বার্ষিক":   { bg:"bg-purple-100", text:"text-purple-700" },
  "বিশেষ":    { bg:"bg-amber-100",  text:"text-amber-700"  },
};

const STATUS_META = {
  "সম্পন্ন":    { bg:"bg-green-100",  text:"text-green-700",  dot:"bg-green-500"  },
  "প্রক্রিয়াধীন":{ bg:"bg-amber-100",  text:"text-amber-700",  dot:"bg-amber-400"  },
  "বাতিল":     { bg:"bg-red-100",    text:"text-red-700",    dot:"bg-red-400"    },
};

/* ── Seed donations ─────────────────────────────────────────────── */
const SEED = [
  { id:1,  name:"রহিম উদ্দিন",   phone:"01711-234567", email:"rahim@email.com",   district:"রংপুর সদর",  amount:5000,  method:"bKash",          type:"মাসিক",   program:"শিক্ষা",       status:"সম্পন্ন",     txnId:"BK-20240101-001", date:"১ জানুয়ারি, ২০২৫",  note:"প্রতি মাসে দেন",       anonymous:false },
  { id:2,  name:"সুমাইয়া বেগম", phone:"01812-345678", email:"sumaiya@email.com", district:"গাইবান্ধা",   amount:2500,  method:"Nagad",          type:"এককালীন", program:"স্বাস্থ্য",     status:"সম্পন্ন",     txnId:"NG-20240105-002", date:"৫ জানুয়ারি, ২০২৫",  note:"",                     anonymous:false },
  { id:3,  name:"করিম হোসেন",   phone:"01913-456789", email:"karim@email.com",   district:"কুড়িগ্রাম",  amount:10000, method:"ব্যাংক ট্রান্সফার",type:"মাসিক",   program:"শিশু",          status:"সম্পন্ন",     txnId:"BNK-20240110-003",date:"১০ জানুয়ারি, ২০২৫", note:"সন্তানের নামে",        anonymous:false },
  { id:4,  name:"নাজমা আক্তার", phone:"01611-567890", email:"nazma@email.com",   district:"দিনাজপুর",   amount:1000,  method:"bKash",          type:"এককালীন", program:"নারী উন্নয়ন",   status:"সম্পন্ন",     txnId:"BK-20240115-004", date:"১৫ জানুয়ারি, ২০২৫", note:"",                     anonymous:false },
  { id:5,  name:"তারিক হাসান",  phone:"01511-678901", email:"tariq@email.com",   district:"নীলফামারী",  amount:7500,  method:"রকেট",           type:"মাসিক",   program:"পরিবেশ",        status:"প্রক্রিয়াধীন", txnId:"RK-20240120-005", date:"২০ জানুয়ারি, ২০২৫", note:"",                     anonymous:false },
  { id:6,  name:"বেনামী দাতা",  phone:"",             email:"",                  district:"ঢাকা",        amount:25000, method:"ব্যাংক ট্রান্সফার",type:"বিশেষ",   program:"সাধারণ ফান্ড",  status:"সম্পন্ন",     txnId:"BNK-20240122-006",date:"২২ জানুয়ারি, ২০২৫", note:"বেনামী দান",           anonymous:true  },
  { id:7,  name:"শিরিন আক্তার", phone:"01711-789012", email:"shirin@email.com",  district:"লালমনিরহাট", amount:3000,  method:"Nagad",          type:"মাসিক",   program:"শিক্ষা",        status:"সম্পন্ন",     txnId:"NG-20240125-007", date:"২৫ জানুয়ারি, ২০২৫", note:"",                     anonymous:false },
  { id:8,  name:"রওশন আরা",     phone:"01812-890123", email:"rowshan@email.com", district:"ঠাকুরগাঁও",  amount:500,   method:"নগদ",            type:"এককালীন", program:"স্বাস্থ্য",     status:"সম্পন্ন",     txnId:"CASH-001",        date:"২৮ জানুয়ারি, ২০২৫", note:"",                     anonymous:false },
  { id:9,  name:"জাহিদুল ইসলাম",phone:"01913-901234", email:"zahid@email.com",   district:"রংপুর সদর",  amount:15000, method:"bKash",          type:"বার্ষিক",  program:"বেকারত্ব",      status:"সম্পন্ন",     txnId:"BK-20240201-009", date:"১ ফেব্রুয়ারি, ২০২৫", note:"বছরে একবার দেন",      anonymous:false },
  { id:10, name:"ফারুক আহমেদ",  phone:"01611-012345", email:"faruk@email.com",   district:"পঞ্চগড়",    amount:2000,  method:"চেক",            type:"এককালীন", program:"আইনি সহায়তা",  status:"বাতিল",       txnId:"CHK-20240205-010",date:"৫ ফেব্রুয়ারি, ২০২৫", note:"চেক ফেরত এসেছে",     anonymous:false },
];

const EMPTY_FORM = {
  name:"", phone:"", email:"", district:"রংপুর সদর",
  amount:"", method:"bKash", type:"এককালীন",
  program:"সাধারণ ফান্ড", status:"সম্পন্ন",
  txnId:"", date:"", note:"", anonymous:false,
};

/* ── Helpers ────────────────────────────────────────────────────── */
const fmtTaka = (n) => {
  const num = Number(n) || 0;
  if (num >= 100000) return `৳${(num/100000).toFixed(1)} লক্ষ`;
  if (num >= 1000)   return `৳${(num/1000).toFixed(1)}K`;
  return `৳${num.toLocaleString()}`;
};

const genTxnId = (method) => {
  const prefix = { bKash:"BK", Nagad:"NG", রকেট:"RK", "ব্যাংক ট্রান্সফার":"BNK", নগদ:"CASH", চেক:"CHK" };
  const p = prefix[method] || "TXN";
  return `${p}-${Date.now().toString().slice(-8)}`;
};

/* ── Chips ──────────────────────────────────────────────────────── */
const MethodChip = ({ m }) => {
  const meta = METHOD_META[m] || METHOD_META["নগদ"];
  return (
    <span className={`font-bn inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.text}`}>
      <span>{meta.icon}</span>{m}
    </span>
  );
};

const TypeChip = ({ t }) => {
  const meta = TYPE_META[t] || TYPE_META["এককালীন"];
  return (
    <span className={`font-bn text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.text}`}>{t}</span>
  );
};

const StatusChip = ({ s }) => {
  const meta = STATUS_META[s] || STATUS_META["সম্পন্ন"];
  return (
    <span className={`font-bn inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {s}
    </span>
  );
};

/* ── Stats Strip ────────────────────────────────────────────────── */
function StatsStrip({ donations }) {
  const total      = donations.reduce((a, d) => a + (Number(d.amount)||0), 0);
  const completed  = donations.filter(d => d.status === "সম্পন্ন").length;
  const monthly    = donations.filter(d => d.type === "মাসিক").length;
  const today      = donations.filter(d => d.status === "সম্পন্ন").reduce((a,d)=>a+(Number(d.amount)||0),0);

  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon:"💰", label:"মোট ডোনেশন",      val: fmtTaka(total),  color:"#16a34a", bg:"bg-green-50",  sub:`${donations.length} টি লেনদেন` },
        { icon:"✅", label:"সম্পন্ন লেনদেন",  val: completed,        color:"#22c55e", bg:"bg-emerald-50", sub:"সফলভাবে গৃহীত" },
        { icon:"🔄", label:"মাসিক ডোনার",     val: monthly,          color:"#3b82f6", bg:"bg-blue-50",   sub:"নিয়মিত অবদানকারী" },
        { icon:"📊", label:"গড় ডোনেশন",       val: fmtTaka(donations.length ? Math.round(total/donations.length) : 0), color:"#f59e0b", bg:"bg-amber-50", sub:"প্রতি লেনদেনে" },
      ].map((s, i) => (
        <div key={i}
          className={`au ${s.bg} rounded-2xl px-5 py-4 flex items-start gap-4 shadow-sm card-lift`}
          style={{ animationDelay:`${i*55}ms` }}>
          <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
            {s.icon}
          </div>
          <div>
            <p className="font-dis font-bold text-2xl leading-none cu" style={{ color:s.color }}>{s.val}</p>
            <p className="font-bn text-xs font-semibold text-gray-600 mt-1">{s.label}</p>
            <p className="font-bn text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Donation Row ───────────────────────────────────────────────── */
function DonationRow({ d, index, onView, onEdit, onDelete }) {
  return (
    <tr
      className="row-hover border-t border-gray-50 cursor-pointer"
      style={{ animationDelay:`${index*30}ms` }}
      onClick={() => onView(d)}
    >
      {/* serial */}
      <td className="px-4 py-3.5">
        <span className="font-bn text-xs text-gray-400 font-semibold">#{index + 1}</span>
      </td>

      {/* donor */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: d.anonymous
              ? "linear-gradient(135deg,#64748b,#94a3b8)"
              : `linear-gradient(135deg,#15803d,#22c55e)`
            }}>
            {d.anonymous ? "?" : d.name.charAt(0)}
          </div>
          <div>
            <p className="font-bn text-sm font-semibold text-green-900 leading-tight">
              {d.anonymous ? "বেনামী" : d.name}
            </p>
            <p className="font-bn text-xs text-gray-400 mt-0.5">{d.phone || d.email || "—"}</p>
          </div>
        </div>
      </td>

      {/* amount */}
      <td className="px-4 py-3.5">
        <p className="font-dis font-bold text-green-700 text-base leading-tight">{fmtTaka(d.amount)}</p>
        <p className="font-bn text-xs text-gray-400">{d.txnId}</p>
      </td>

      {/* method */}
      <td className="px-4 py-3.5"><MethodChip m={d.method} /></td>

      {/* type */}
      <td className="px-4 py-3.5"><TypeChip t={d.type} /></td>

      {/* program */}
      <td className="px-4 py-3.5">
        <span className="font-bn text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
          {d.program}
        </span>
      </td>

      {/* status */}
      <td className="px-4 py-3.5"><StatusChip s={d.status} /></td>

      {/* date */}
      <td className="px-4 py-3.5">
        <p className="font-bn text-xs text-gray-500 whitespace-nowrap">{d.date}</p>
        <p className="font-bn text-xs text-gray-400">{d.district}</p>
      </td>

      {/* actions */}
      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
        <div className="flex gap-1.5">
          <button onClick={() => onEdit(d)}
            className="font-bn text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer bg-transparent">
            ✎
          </button>
          <button onClick={() => onDelete(d)}
            className="font-bn text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent">
            🗑
          </button>
        </div>
      </td>
    </tr>
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
function ViewModal({ d, onClose, onEdit }) {
  return (
    <Modal onClose={onClose}>
      {/* hero */}
      <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 px-7 pt-7 pb-5 border-b border-green-100">
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 cursor-pointer border border-gray-100 text-sm">✕</button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg"
            style={{ background: d.anonymous ? "linear-gradient(135deg,#64748b,#94a3b8)" : "linear-gradient(135deg,#15803d,#22c55e)" }}>
            {d.anonymous ? "?" : d.name.charAt(0)}
          </div>
          <div>
            <p className="font-dis text-green-900 font-bold text-xl leading-tight">{d.anonymous ? "বেনামী দাতা" : d.name}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <MethodChip m={d.method} />
              <TypeChip t={d.type} />
              <StatusChip s={d.status} />
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="font-dis text-green-700 font-bold text-3xl">{fmtTaka(d.amount)}</p>
            <p className="font-bn text-xs text-gray-400 mt-1">{d.txnId}</p>
          </div>
        </div>
      </div>

      <div className="px-7 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon:"📍", label:"জেলা",          val: d.district  },
            { icon:"📅", label:"তারিখ",          val: d.date      },
            { icon:"📋", label:"প্রকল্প",         val: d.program   },
            { icon:"📞", label:"ফোন",             val: d.phone||"—"},
            { icon:"✉️",  label:"ইমেইল",           val: d.email||"—"},
            { icon:"🔖", label:"ট্রানজেকশন আইডি", val: d.txnId    },
          ].map(s => (
            <div key={s.label} className="bg-green-50/60 rounded-xl px-4 py-3">
              <p className="font-bn text-xs text-gray-400">{s.icon} {s.label}</p>
              <p className="font-bn text-sm font-bold text-green-800 mt-0.5 break-all leading-snug">{s.val}</p>
            </div>
          ))}
        </div>

        {d.note && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
            <p className="font-bn text-xs text-amber-600 font-semibold mb-1">📝 নোট</p>
            <p className="font-bn text-sm text-gray-600 leading-relaxed">{d.note}</p>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
            বন্ধ করুন
          </button>
          <button onClick={() => { onClose(); onEdit(d); }}
            className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all"
            style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
            ✎ সম্পাদনা করুন
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Form Modal ─────────────────────────────────────────────────── */
function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({ ...initial });
  const isEdit = !!initial.id;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const fc = "font-bn w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white transition-all";
  const lc = "font-bn block text-xs font-semibold text-green-800 mb-1.5";

  const handleSubmit = () => {
    if (!form.name.trim() && !form.anonymous) return;
    if (!form.amount) return;
    const finalForm = {
      ...form,
      name: form.anonymous ? "বেনামী দাতা" : form.name,
      txnId: form.txnId || genTxnId(form.method),
    };
    onSave(finalForm);
  };

  const canSubmit = (form.name.trim() || form.anonymous) && form.amount > 0;

  return (
    <Modal onClose={onClose} wide>
      {/* header */}
      <div
        className="px-7 pt-6 pb-5 border-b border-gray-50"
        style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-dis text-green-900 font-bold text-xl">
              {isEdit ? "ডোনেশন সম্পাদনা" : "নতুন ডোনেশন যোগ করুন"}
            </p>
            <p className="font-bn text-xs text-gray-500 mt-0.5">
              {isEdit ? "তথ্য আপডেট করুন" : "নতুন দানের তথ্য পূরণ করুন"}
            </p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 text-sm cursor-pointer border border-gray-100">✕</button>
        </div>
      </div>

      <div className="px-7 py-5 overflow-y-auto flex flex-col gap-5" style={{ maxHeight:"65vh" }}>

        {/* anonymous toggle */}
        <div className={`flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 cursor-pointer transition-all ${form.anonymous ? "border-green-400 bg-green-50" : "border-gray-100 bg-gray-50"}`}
          onClick={() => set("anonymous", !form.anonymous)}>
          <div>
            <p className="font-bn text-sm font-bold text-green-900">বেনামী দান</p>
            <p className="font-bn text-xs text-gray-500">দাতার পরিচয় গোপন থাকবে</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${form.anonymous ? "bg-green-500" : "bg-gray-300"}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all duration-300 ${form.anonymous ? "left-6" : "left-0.5"}`} />
          </div>
        </div>

        {/* donor info */}
        {!form.anonymous && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={lc}>দাতার নাম *</label>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="পূর্ণ নাম লিখুন" className={fc} />
            </div>
            <div>
              <label className={lc}>মোবাইল নম্বর</label>
              <input value={form.phone} onChange={e => set("phone", e.target.value)}
                placeholder="01XXX-XXXXXX" className={fc} />
            </div>
            <div>
              <label className={lc}>ইমেইল</label>
              <input value={form.email} onChange={e => set("email", e.target.value)}
                placeholder="example@email.com" className={fc} />
            </div>
          </div>
        )}

        {/* amount + method */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc}>পরিমাণ (টাকা) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bn text-sm font-bold text-green-600">৳</span>
              <input type="number" value={form.amount} onChange={e => set("amount", Number(e.target.value))}
                placeholder="0" className={`${fc} pl-8`} />
            </div>
            {/* quick amounts */}
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {[500, 1000, 2500, 5000, 10000].map(a => (
                <button key={a} onClick={() => set("amount", a)}
                  className={`font-bn text-xs px-2.5 py-1 rounded-lg cursor-pointer border transition-all
                    ${form.amount === a ? "bg-green-600 text-white border-green-600" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-700"}`}>
                  ৳{a >= 1000 ? `${a/1000}K` : a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={lc}>পেমেন্ট পদ্ধতি</label>
            <select value={form.method} onChange={e => set("method", e.target.value)} className={fc}>
              {METHODS.map(m => <option key={m}>{m}</option>)}
            </select>
            {/* method visual */}
            <div className="mt-2"><MethodChip m={form.method} /></div>
          </div>
        </div>

        {/* type + program */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc}>ডোনেশনের ধরন</label>
            <div className="grid grid-cols-2 gap-2">
              {TYPES.map(t => (
                <button key={t} onClick={() => set("type", t)}
                  className={`font-bn text-xs font-semibold py-2.5 px-3 rounded-xl border-2 cursor-pointer transition-all
                    ${form.type === t
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-100 bg-gray-50 text-gray-500 hover:border-green-300"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={lc}>কোন প্রকল্পে</label>
            <select value={form.program} onChange={e => set("program", e.target.value)} className={fc}>
              {PROGRAMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* district + status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc}>জেলা</label>
            <select value={form.district} onChange={e => set("district", e.target.value)} className={fc}>
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>অবস্থা</label>
            <select value={form.status} onChange={e => set("status", e.target.value)} className={fc}>
              {Object.keys(STATUS_META).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* txnId + date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc}>ট্রানজেকশন আইডি</label>
            <div className="flex gap-2">
              <input value={form.txnId} onChange={e => set("txnId", e.target.value)}
                placeholder="স্বয়ংক্রিয় তৈরি হবে" className={`${fc} flex-1`} />
              <button onClick={() => set("txnId", genTxnId(form.method))}
                className="font-bn px-3 py-2 rounded-xl text-xs font-semibold border border-green-200 text-green-600 hover:bg-green-50 cursor-pointer bg-transparent flex-shrink-0 transition-colors">
                তৈরি
              </button>
            </div>
          </div>
          <div>
            <label className={lc}>তারিখ</label>
            <input value={form.date} onChange={e => set("date", e.target.value)}
              placeholder="যেমন: ১ জানুয়ারি, ২০২৫" className={fc} />
          </div>
        </div>

        {/* note */}
        <div>
          <label className={lc}>নোট</label>
          <textarea value={form.note} onChange={e => set("note", e.target.value)}
            rows={2} placeholder="অতিরিক্ত তথ্য…" className={`${fc} resize-none`} />
        </div>

        {/* preview */}
        {form.amount > 0 && (
          <div className="srr bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl px-5 py-4 border border-green-100 flex items-center justify-between">
            <div>
              <p className="font-bn text-xs text-gray-400">ডোনেশন সারসংক্ষেপ</p>
              <p className="font-dis text-green-900 font-bold text-xl mt-0.5">{fmtTaka(form.amount)}</p>
              <div className="flex gap-2 mt-1.5">
                <MethodChip m={form.method} />
                <TypeChip t={form.type} />
              </div>
            </div>
            <div className="text-right">
              <p className="font-bn text-xs text-gray-400">{form.program}</p>
              <p className="font-bn text-sm font-semibold text-green-700 mt-0.5">{form.anonymous ? "বেনামী" : form.name || "—"}</p>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="px-7 py-4 border-t border-gray-50 flex gap-3">
        <button onClick={onClose}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent">
          বাতিল
        </button>
        <button disabled={!canSubmit} onClick={handleSubmit}
          className="font-bn flex-1 py-3 rounded-2xl text-sm font-bold text-white border-0 cursor-pointer hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 4px 14px rgba(22,163,74,.35)" }}>
          <span>💚</span> {isEdit ? "আপডেট করুন" : "ডোনেশন যোগ করুন"}
        </button>
      </div>
    </Modal>
  );
}

/* ── Delete Modal ───────────────────────────────────────────────── */
function DeleteModal({ d, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">🗑️</div>
        <p className="font-dis text-green-900 font-bold text-xl">মুছে ফেলবেন?</p>
        <p className="font-bn text-gray-500 text-sm leading-relaxed">
          <span className="font-bold text-green-800">{d.anonymous ? "বেনামী" : d.name}</span>-এর{" "}
          <span className="font-bold text-green-700">{fmtTaka(d.amount)}</span> ডোনেশন রেকর্ড মুছে যাবে।
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

/* ── Method Breakdown ───────────────────────────────────────────── */
function MethodBreakdown({ donations }) {
  const counts = {};
  donations.forEach(d => { counts[d.method] = (counts[d.method]||0) + 1; });
  const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  const max = Math.max(...Object.values(counts), 1);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"300ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">পেমেন্ট পদ্ধতি</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([m, cnt]) => {
          const meta = METHOD_META[m] || METHOD_META["নগদ"];
          return (
            <div key={m} className="flex items-center gap-2.5">
              <span className={`text-sm flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${meta.bg}`}>{meta.icon}</span>
              <span className="font-bn text-xs text-gray-500 w-24 flex-shrink-0 truncate">{m}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bar"
                  style={{ "--w":`${(cnt/max)*100}%`, width:`${(cnt/max)*100}%`, background:"linear-gradient(90deg,#16a34a,#4ade80)" }} />
              </div>
              <span className="font-bn text-xs font-bold text-green-700 w-4">{cnt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Program breakdown ──────────────────────────────────────────── */
function ProgramBreakdown({ donations }) {
  const sums = {};
  donations.forEach(d => { sums[d.program] = (sums[d.program]||0) + (Number(d.amount)||0); });
  const sorted = Object.entries(sums).sort((a,b) => b[1]-a[1]).slice(0,5);
  const max = Math.max(...Object.values(sums), 1);
  return (
    <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"360ms" }}>
      <p className="font-dis text-green-900 font-bold text-sm mb-4">প্রকল্পভিত্তিক ডোনেশন</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([prog, sum]) => (
          <div key={prog}>
            <div className="flex justify-between mb-1">
              <span className="font-bn text-xs text-gray-500 truncate">{prog}</span>
              <span className="font-bn text-xs font-bold text-green-700">{fmtTaka(sum)}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bar"
                style={{ "--w":`${(sum/max)*100}%`, width:`${(sum/max)*100}%`, background:"linear-gradient(90deg,#16a34a,#4ade80)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Toast ──────────────────────────────────────────────────────── */
function Toast({ msg, color }) {
  return (
    <div className="ti fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bn text-sm font-semibold"
      style={{ background: color }}>
      ✓ {msg}
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────── */
export default function AllDonation() {
  const [donations,  setDonations]  = useState(SEED);
  const [search,     setSearch]     = useState("");
  const [methodFlt,  setMethodFlt]  = useState("সব");
  const [typeFlt,    setTypeFlt]    = useState("সব");
  const [statusFlt,  setStatusFlt]  = useState("সব");
  const [programFlt, setProgramFlt] = useState("সব");
  const [sortBy,     setSortBy]     = useState("newest");
  const [modal,      setModal]      = useState(null);
  const [toast,      setToast]      = useState(null);
  const [page,       setPage]       = useState(1);
  const PER_PAGE = 8;

  const fire = (msg, color="#16a34a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (form) => {
    if (form.id) {
      setDonations(ds => ds.map(d => d.id === form.id ? form : d));
      fire(`"${form.name}" এর ডোনেশন আপডেট হয়েছে ✓`);
    } else {
      setDonations(ds => [{ ...form, id: Date.now() }, ...ds]);
      fire(`৳${Number(form.amount).toLocaleString()} ডোনেশন যোগ হয়েছে 🎉`);
    }
    setModal(null);
    setPage(1);
  };

  const handleDelete = (id) => {
    setDonations(ds => ds.filter(d => d.id !== id));
    fire("ডোনেশন রেকর্ড মুছে ফেলা হয়েছে", "#ef4444");
    setModal(null);
  };

  const filtered = useMemo(() =>
    donations
      .filter(d => methodFlt  === "সব" || d.method  === methodFlt)
      .filter(d => typeFlt    === "সব" || d.type    === typeFlt)
      .filter(d => statusFlt  === "সব" || d.status  === statusFlt)
      .filter(d => programFlt === "সব" || d.program === programFlt)
      .filter(d => !search || d.name.includes(search) || d.txnId.includes(search) || d.phone.includes(search) || d.district.includes(search))
      .sort((a, b) => {
        if (sortBy === "amount_desc") return Number(b.amount) - Number(a.amount);
        if (sortBy === "amount_asc")  return Number(a.amount) - Number(b.amount);
        return b.id - a.id; // newest first default
      }),
    [donations, methodFlt, typeFlt, statusFlt, programFlt, search, sortBy]
  );

  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const paginated   = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  return (
    <>
      <Fonts />
      <div className="font-bn min-h-screen bg-green-50/30 p-6 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="au flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-bn text-green-500 text-xs uppercase tracking-widest mb-1">উৎকর্ষ ফাউন্ডেশন</p>
            <h1 className="font-dis text-green-900 text-3xl font-bold leading-tight">ডোনেশন ব্যবস্থাপনা</h1>
            <p className="font-bn text-gray-400 text-sm mt-1">সকল দানের তথ্য পরিচালনা ও পর্যবেক্ষণ</p>
          </div>
          <div className="flex gap-3">
            <button className="font-bn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-green-200 text-green-700 hover:bg-green-50 transition-all cursor-pointer bg-white">
              📤 এক্সপোর্ট
            </button>
            <button onClick={() => setModal({ type:"add" })}
              className="font-bn flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm cursor-pointer border-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background:"linear-gradient(135deg,#14532d,#22c55e)", boxShadow:"0 6px 20px rgba(22,163,74,.35)" }}>
              <span className="text-lg">＋</span> নতুন ডোনেশন
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <StatsStrip donations={donations} />

        {/* ── Main layout ── */}
        <div className="grid grid-cols-4 gap-5 items-start">

          {/* ── Table section (3/4) ── */}
          <div className="col-span-3 flex flex-col gap-4">

            {/* filter bar */}
            <div className="au bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center" style={{ animationDelay:"200ms" }}>
              {/* search */}
              <div className="relative flex-1 min-w-52">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
                <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="নাম, TXN আইডি, জেলা…"
                  className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 transition-all" />
              </div>

              <select value={methodFlt} onChange={e => { setMethodFlt(e.target.value); setPage(1); }}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব পদ্ধতি</option>
                {METHODS.map(m => <option key={m}>{m}</option>)}
              </select>

              <select value={typeFlt} onChange={e => { setTypeFlt(e.target.value); setPage(1); }}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব ধরন</option>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>

              <select value={statusFlt} onChange={e => { setStatusFlt(e.target.value); setPage(1); }}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="সব">সব অবস্থা</option>
                {Object.keys(STATUS_META).map(s => <option key={s}>{s}</option>)}
              </select>

              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="font-bn px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer">
                <option value="newest">সর্বশেষ</option>
                <option value="amount_desc">বেশি পরিমাণ</option>
                <option value="amount_asc">কম পরিমাণ</option>
              </select>
            </div>

            {/* program chips */}
            <div className="au flex flex-wrap gap-2" style={{ animationDelay:"240ms" }}>
              {["সব", ...PROGRAMS].map(p => (
                <button key={p} onClick={() => { setProgramFlt(p); setPage(1); }}
                  className={`font-bn text-xs font-semibold px-4 py-2 rounded-full cursor-pointer border transition-all
                    ${programFlt === p
                      ? "text-white border-transparent"
                      : "bg-white border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700 shadow-sm"}`}
                  style={programFlt === p ? { background:"linear-gradient(135deg,#15803d,#22c55e)", boxShadow:"0 2px 8px rgba(22,163,74,.3)" } : {}}>
                  {p}
                </button>
              ))}
            </div>

            {/* result count */}
            <div className="flex items-center justify-between -mt-1">
              <p className="font-bn text-xs text-gray-400">{filtered.length} টি ডোনেশন পাওয়া গেছে</p>
              {(search || methodFlt !== "সব" || typeFlt !== "সব" || statusFlt !== "সব" || programFlt !== "সব") && (
                <button onClick={() => { setSearch(""); setMethodFlt("সব"); setTypeFlt("সব"); setStatusFlt("সব"); setProgramFlt("সব"); }}
                  className="font-bn text-xs text-green-600 font-semibold hover:underline cursor-pointer bg-transparent border-0">
                  ফিল্টার মুছুন ✕
                </button>
              )}
            </div>

            {/* table */}
            <div className="au bg-white rounded-2xl shadow-sm overflow-hidden" style={{ animationDelay:"280ms" }}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["#","দাতা","পরিমাণ","পদ্ধতি","ধরন","প্রকল্প","অবস্থা","তারিখ",""].map(h => (
                        <th key={h} className="font-bn text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3.5 first:pl-4 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length > 0 ? (
                      paginated.map((d, i) => (
                        <DonationRow key={d.id} d={d} index={(page-1)*PER_PAGE + i}
                          onView={d => setModal({ type:"view", donation:d })}
                          onEdit={d => setModal({ type:"edit", donation:d })}
                          onDelete={d => setModal({ type:"delete", donation:d })} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-5xl opacity-20">💸</span>
                            <p className="font-dis text-green-800 text-lg font-bold">কোনো ডোনেশন পাওয়া যায়নি</p>
                            <p className="font-bn text-gray-400 text-sm">ফিল্টার পরিবর্তন করুন বা নতুন ডোনেশন যোগ করুন</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              {totalPages > 1 && (
                <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-between">
                  <p className="font-bn text-xs text-gray-400">
                    {(page-1)*PER_PAGE + 1}–{Math.min(page*PER_PAGE, filtered.length)} / {filtered.length} টি
                  </p>
                  <div className="flex gap-1.5">
                    <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                      className="font-bn text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent transition-colors">
                      ← আগে
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
                      <button key={p} onClick={() => setPage(p)}
                        className={`font-bn text-xs w-8 h-8 rounded-lg border cursor-pointer transition-all
                          ${page === p
                            ? "text-white border-transparent"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50 bg-transparent"}`}
                        style={page === p ? { background:"linear-gradient(135deg,#15803d,#22c55e)" } : {}}>
                        {p}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
                      className="font-bn text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent transition-colors">
                      পরে →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar (1/4) ── */}
          <div className="col-span-1 flex flex-col gap-4 sticky top-4">
            <MethodBreakdown  donations={donations} />
            <ProgramBreakdown donations={donations} />

            {/* top donors */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"420ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">শীর্ষ দাতা</p>
              <div className="flex flex-col gap-3">
                {[...donations]
                  .filter(d => !d.anonymous)
                  .sort((a,b) => Number(b.amount)-Number(a.amount))
                  .slice(0, 4)
                  .map((d, i) => (
                    <div key={d.id} className="flex items-center gap-2.5">
                      <span className="font-bn text-xs font-bold text-gray-400 w-4">{i+1}</span>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background:"linear-gradient(135deg,#15803d,#22c55e)" }}>
                        {d.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bn text-xs font-semibold text-green-900 truncate">{d.name}</p>
                        <p className="font-bn text-xs text-gray-400">{d.district}</p>
                      </div>
                      <p className="font-bn text-xs font-bold text-green-600 flex-shrink-0">{fmtTaka(d.amount)}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* status summary */}
            <div className="au bg-white rounded-2xl shadow-sm p-5" style={{ animationDelay:"480ms" }}>
              <p className="font-dis text-green-900 font-bold text-sm mb-3">অবস্থার সারসংক্ষেপ</p>
              {Object.entries(STATUS_META).map(([s, meta]) => {
                const cnt = donations.filter(d => d.status === s).length;
                return (
                  <div key={s} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${meta.dot}`} />
                    <span className="font-bn text-xs text-gray-500 flex-1">{s}</span>
                    <span className={`font-bn text-xs font-bold px-2.5 py-0.5 rounded-full ${meta.bg} ${meta.text}`}>{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === "view"   && <ViewModal   d={modal.donation} onClose={() => setModal(null)} onEdit={d => setModal({ type:"edit", donation:d })} />}
      {modal?.type === "add"    && <FormModal   initial={EMPTY_FORM} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "edit"   && <FormModal   initial={modal.donation} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "delete" && <DeleteModal d={modal.donation} onClose={() => setModal(null)} onConfirm={() => handleDelete(modal.donation.id)} />}

      {toast && <Toast msg={toast.msg} color={toast.color} />}
    </>
  );
}