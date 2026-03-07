import { useState } from "react";

// ─── Google Font injection ───────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    body, #root { margin: 0; padding: 0; }

    .font-bangla   { font-family: 'Hind Siliguri', sans-serif; }
    .font-display  { font-family: 'Tiro Bangla', serif; }

    /* floating leaf particles */
    @keyframes drift {
      0%   { transform: translateY(0)   rotate(0deg)   opacity(.18); }
      50%  { transform: translateY(-28px) rotate(12deg) opacity(.28); }
      100% { transform: translateY(0)   rotate(0deg)   opacity(.18); }
    }
    .leaf { animation: drift var(--d, 5s) ease-in-out infinite; animation-delay: var(--delay, 0s); }

    /* slide-in panel */
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    .slide-up { animation: slideUp .55s cubic-bezier(.22,.68,0,1.2) both; }

    /* shimmer on the green panel */
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .shimmer-text {
      background: linear-gradient(90deg,#bbf7d0 0%,#ffffff 40%,#4ade80 60%,#bbf7d0 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    /* input focus ring */
    .input-field:focus {
      outline: none;
      border-color: #16a34a;
      box-shadow: 0 0 0 3px rgba(22,163,74,.18);
    }

    /* button press */
    .btn-press:active { transform: scale(.97); }

    /* tab underline */
    .tab-active::after {
      content: '';
      display: block;
      height: 3px;
      background: #16a34a;
      border-radius: 9px;
      margin-top: 4px;
    }

    /* password strength bar fill */
    @keyframes barGrow {
      from { width: 0; }
    }
    .bar-fill { animation: barGrow .4s ease both; }

    /* checkbox custom */
    input[type=checkbox] { accent-color: #16a34a; }

    /* scroll-bar */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: #86efac; border-radius: 4px; }
  `}</style>
);

// ─── Decorative left panel ────────────────────────────────────────────────────
const GreenPanel = ({ page }) => (
  <div className="hidden lg:flex flex-col justify-between relative overflow-hidden"
    style={{ background: "linear-gradient(160deg,#14532d 0%,#166534 45%,#15803d 80%,#16a34a 100%)", minHeight: "100vh", width: "44%" }}>

    {/* grid overlay */}
    <div className="absolute inset-0"
      style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

    {/* big circle blur */}
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
      style={{ background: "rgba(74,222,128,.1)", filter: "blur(60px)" }} />
    <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full"
      style={{ background: "rgba(255,255,255,.05)", filter: "blur(50px)" }} />

    {/* floating leaves */}
    {[
      { top: "18%", left: "12%", size: 28, d: "6s", delay: "0s" },
      { top: "38%", left: "72%", size: 20, d: "8s", delay: "1.2s" },
      { top: "62%", left: "20%", size: 16, d: "5s", delay: "2.5s" },
      { top: "75%", left: "65%", size: 24, d: "7s", delay: ".8s" },
      { top: "10%", left: "55%", size: 14, d: "9s", delay: "3s" },
    ].map((l, i) => (
      <div key={i} className="leaf absolute select-none pointer-events-none"
        style={{ top: l.top, left: l.left, "--d": l.d, "--delay": l.delay, fontSize: l.size }}>
        🌿
      </div>
    ))}

 

    {/* centre content */}
    <div className="relative z-10 px-10 flex-1 flex flex-col justify-center">
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bangla text-xs"
        style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", color: "#86efac" }}>
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" style={{ boxShadow: "0 0 8px #4ade80" }} />
        {page === "login" ? "স্বাগতম ফিরে আসায়" : "নতুন যাত্রা শুরু হোক"}
      </div>

      <h2 className="shimmer-text font-display font-bold leading-snug mb-5"
        style={{ fontSize: "2.5rem" }}>
        {page === "login"
          ? "আবার আসুন,\nআমরা অপেক্ষায়\nছিলাম আপনার"
          : "একসাথে গড়ি\nআলোকিত একটি\nসুন্দর আগামী"}
      </h2>

      <p className="font-bangla text-green-200 text-sm leading-relaxed mb-8" style={{ opacity: .85 }}>
        {page === "login"
          ? "আপনার অ্যাকাউন্টে প্রবেশ করুন এবং রংপুরের মানুষের জীবন পরিবর্তনে অংশ নিন।"
          : "উৎকর্ষ ফাউন্ডেশনে যোগ দিন এবং হাজারো মানুষের জীবনে ইতিবাচক পরিবর্তন আনুন।"}
      </p>

      {/* impact chips */}
      <div className="flex flex-col gap-3">
        {[
          { emoji: "🎓", text: "৫০০০+ শিশু শিক্ষিত" },
          { emoji: "🏥", text: "১২টি বিনামূল্যে ক্লিনিক" },
          { emoji: "💚", text: "১৫ বছরের বিশ্বাস ও সেবা" },
        ].map((chip, i) => (
          <div key={i} className="flex items-center gap-3 font-bangla text-sm"
            style={{ color: "rgba(255,255,255,.82)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style={{ background: "rgba(255,255,255,.1)" }}>
              {chip.emoji}
            </div>
            {chip.text}
          </div>
        ))}
      </div>
    </div>


   
  </div>
);

// ─── Password strength helper ─────────────────────────────────────────────────
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 6)  s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { label: "খুব দুর্বল", color: "#ef4444" },
    { label: "দুর্বল",     color: "#f97316" },
    { label: "মাঝারি",    color: "#eab308" },
    { label: "ভালো",      color: "#22c55e" },
    { label: "শক্তিশালী", color: "#16a34a" },
  ];
  return { score: s, ...map[Math.min(s, 4)] };
};

// ─── Eye icon ─────────────────────────────────────────────────────────────────
const EyeIcon = ({ open }) => open
  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

// ─── Input wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, icon, children, hint }) => (
  <div>
    <label className="block font-bangla text-sm font-semibold mb-1.5" style={{ color: "#166534" }}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none select-none">{icon}</span>
      {children}
    </div>
    {hint && <p className="mt-1.5 font-bangla text-xs" style={{ color: "#6b7280" }}>{hint}</p>}
  </div>
);

const inputCls = "input-field w-full pl-10 pr-4 py-3 rounded-xl border font-bangla text-sm transition-all duration-200 bg-white";
const inputStyle = { borderColor: "#d1fae5", color: "#14532d" };

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
const Login = ({ onSwitch }) => {
  const [show, setShow]   = useState(false);
  const [form, setForm]   = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1600);
  };

  return (
    <div className="slide-up w-full max-w-md mx-auto px-2">
      {/* header */}
      <div className="mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg"
          style={{ background: "linear-gradient(135deg,#14532d,#16a34a)" }}>
          🔑
        </div>
        <h1 className="font-display font-bold text-3xl mb-1" style={{ color: "#14532d" }}>লগ ইন করুন</h1>
        <p className="font-bangla text-sm" style={{ color: "#6b7280" }}>আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
      </div>

      {success ? (
        <div className="rounded-2xl p-8 text-center slide-up"
          style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac" }}>
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#14532d" }}>সফলভাবে প্রবেশ হয়েছে!</h3>
          <p className="font-bangla text-sm" style={{ color: "#16a34a" }}>স্বাগতম, উৎকর্ষ পরিবারে!</p>
        </div>
      ) : (
        <div className="space-y-5">
          <Field label="ইমেইল অ্যাড্রেস" icon="✉️">
            <input className={inputCls} style={inputStyle} type="email" placeholder="example@email.com"
              value={form.email} onChange={handle("email")} />
          </Field>

          <Field label="পাসওয়ার্ড" icon="🔒">
            <input className={inputCls} style={{ ...inputStyle, paddingRight: "44px" }}
              type={show ? "text" : "password"} placeholder="আপনার পাসওয়ার্ড"
              value={form.password} onChange={handle("password")} />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: show ? "#16a34a" : "#9ca3af" }}>
              <EyeIcon open={show} />
            </button>
          </Field>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={handle("remember")} className="w-4 h-4 rounded" />
              <span className="font-bangla text-sm" style={{ color: "#374151" }}>মনে রাখুন</span>
            </label>
            <button className="font-bangla text-sm font-semibold transition-colors hover:underline"
              style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer" }}>
              পাসওয়ার্ড ভুলে গেছেন?
            </button>
          </div>

          <button onClick={submit} disabled={loading}
            className="btn-press w-full py-3.5 rounded-xl font-bangla font-bold text-white text-base transition-all duration-300 flex items-center justify-center gap-2"
            style={{ background: loading ? "#86efac" : "linear-gradient(135deg,#15803d,#16a34a,#22c55e)", boxShadow: "0 6px 20px rgba(22,163,74,.35)", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                যাচাই করা হচ্ছে…
              </>
            ) : "লগ ইন করুন →"}
          </button>

          {/* divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "#d1fae5" }} />
            <span className="font-bangla text-xs" style={{ color: "#9ca3af" }}>অথবা</span>
            <div className="flex-1 h-px" style={{ background: "#d1fae5" }} />
          </div>

          {/* social */}
          <div className="grid grid-cols-2 gap-3">
            {[{ icon: "🌐", label: "Google" }, { icon: "📘", label: "Facebook" }].map(s => (
              <button key={s.label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bangla text-sm font-semibold transition-all hover:shadow-md"
                style={{ border: "1.5px solid #d1fae5", color: "#15803d", background: "white", cursor: "pointer" }}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>

          <p className="text-center font-bangla text-sm" style={{ color: "#6b7280" }}>
            অ্যাকাউন্ট নেই?{" "}
            <button onClick={onSwitch}
              className="font-bold transition-colors hover:underline"
              style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer" }}>
              রেজিস্ট্রেশন করুন
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────
;
const Register = ({ onSwitch }) => {
  const [step, setStep]   = useState(1);
  const [show, setShow]   = useState(false);
  const [form, setForm]   = useState({ name: "", phone: "", email: "", password: "", role: "", agree: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const strength = getStrength(form.password);

  const next = () => setStep(2);
  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  const roles = [
    { id: "donor",     emoji: "💚", label: "ডোনার" },
    { id: "volunteer", emoji: "🤝", label: "স্বেচ্ছাসেবী" },
    { id: "partner",   emoji: "🏢", label: "পার্টনার" },
    { id: "beneficiary",emoji:"🌱", label: "সুবিধাভোগী" },
  ];

  return (
    <div className="slide-up w-full max-w-md mx-auto px-2">
      {/* header */}
      <div className="mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg"
          style={{ background: "linear-gradient(135deg,#14532d,#16a34a)" }}>
          🌿
        </div>
        <h1 className="font-display font-bold text-3xl mb-1" style={{ color: "#14532d" }}>রেজিস্ট্রেশন</h1>
        <p className="font-bangla text-sm" style={{ color: "#6b7280" }}>নতুন অ্যাকাউন্ট তৈরি করুন</p>
      </div>

      {/* step indicator */}
      {!success && (
        <div className="flex items-center gap-2 mb-7">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300`}
                  style={{
                    background: step >= s ? "linear-gradient(135deg,#15803d,#22c55e)" : "#f0fdf4",
                    color: step >= s ? "white" : "#9ca3af",
                    border: step >= s ? "none" : "1.5px solid #d1fae5"
                  }}>
                  {step > s ? "✓" : s}
                </div>
                <span className="font-bangla text-xs font-semibold" style={{ color: step >= s ? "#15803d" : "#9ca3af" }}>
                  {s === 1 ? "ব্যক্তিগত তথ্য" : "অ্যাকাউন্ট সেটআপ"}
                </span>
              </div>
              {s < 2 && <div className="flex-1 h-px mx-2" style={{ background: step > 1 ? "#86efac" : "#e5e7eb" }} />}
            </div>
          ))}
        </div>
      )}

      {success ? (
        <div className="rounded-2xl p-8 text-center slide-up"
          style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac" }}>
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#14532d" }}>অভিনন্দন!</h3>
          <p className="font-bangla text-sm mb-4" style={{ color: "#16a34a" }}>আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।</p>
          <button onClick={onSwitch}
            className="btn-press px-6 py-2.5 rounded-xl font-bangla text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", border: "none", cursor: "pointer" }}>
            লগ ইন করুন →
          </button>
        </div>
      ) : step === 1 ? (
        <div className="space-y-5">
          <Field label="পূর্ণ নাম" icon="👤">
            <input className={inputCls} style={inputStyle} type="text" placeholder="আপনার পূর্ণ নাম লিখুন"
              value={form.name} onChange={handle("name")} />
          </Field>

          <Field label="মোবাইল নম্বর" icon="📱">
            <input className={inputCls} style={inputStyle} type="tel" placeholder="01XXXXXXXXX"
              value={form.phone} onChange={handle("phone")} />
          </Field>

          <Field label="ইমেইল অ্যাড্রেস" icon="✉️" hint="সকল বিজ্ঞপ্তি এই ইমেইলে পাঠানো হবে">
            <input className={inputCls} style={inputStyle} type="email" placeholder="example@email.com"
              value={form.email} onChange={handle("email")} />
          </Field>

          <div>
            <label className="block font-bangla text-sm font-semibold mb-2" style={{ color: "#166534" }}>
              আপনার ভূমিকা নির্বাচন করুন
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {roles.map(r => (
                <button key={r.id} type="button" onClick={() => setForm(f => ({ ...f, role: r.id }))}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bangla text-sm font-semibold transition-all duration-200"
                  style={{
                    border: `1.5px solid ${form.role === r.id ? "#16a34a" : "#d1fae5"}`,
                    background: form.role === r.id ? "#f0fdf4" : "white",
                    color: form.role === r.id ? "#15803d" : "#6b7280",
                    cursor: "pointer",
                    boxShadow: form.role === r.id ? "0 0 0 3px rgba(22,163,74,.12)" : "none"
                  }}>
                  <span>{r.emoji}</span>{r.label}
                  {form.role === r.id && <span className="ml-auto text-green-500">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <button onClick={next} disabled={!form.name || !form.email || !form.role}
            className="btn-press w-full py-3.5 rounded-xl font-bangla font-bold text-white text-base transition-all duration-300"
            style={{
              background: (!form.name || !form.email || !form.role) ? "#86efac" : "linear-gradient(135deg,#15803d,#16a34a,#22c55e)",
              boxShadow: "0 6px 20px rgba(22,163,74,.3)",
              cursor: (!form.name || !form.email || !form.role) ? "not-allowed" : "pointer",
              border: "none"
            }}>
            পরবর্তী ধাপ →
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <Field label="পাসওয়ার্ড তৈরি করুন" icon="🔒">
            <input className={inputCls} style={{ ...inputStyle, paddingRight: "44px" }}
              type={show ? "text" : "password"} placeholder="শক্তিশালী পাসওয়ার্ড"
              value={form.password} onChange={handle("password")} />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: show ? "#16a34a" : "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>
              <EyeIcon open={show} />
            </button>
          </Field>

          {/* strength bar */}
          {form.password && (
            <div className="space-y-1.5 -mt-3">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#e5e7eb" }}>
                    {i <= strength.score && (
                      <div className="bar-fill h-full rounded-full" style={{ background: strength.color, width: "100%" }} />
                    )}
                  </div>
                ))}
              </div>
              <p className="font-bangla text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</p>
            </div>
          )}

          <Field label="পাসওয়ার্ড নিশ্চিত করুন" icon="🔐">
            <input className={inputCls} style={inputStyle} type="password" placeholder="পুনরায় পাসওয়ার্ড দিন" />
          </Field>

          {/* terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.agree} onChange={handle("agree")} className="w-4 h-4 mt-0.5 rounded flex-shrink-0" />
            <span className="font-bangla text-sm leading-relaxed" style={{ color: "#374151" }}>
              আমি{" "}
              <span className="font-semibold cursor-pointer hover:underline" style={{ color: "#16a34a" }}>প্রাইভেসি পলিসি</span>
              {" "}এবং{" "}
              <span className="font-semibold cursor-pointer hover:underline" style={{ color: "#16a34a" }}>Terms of Service</span>
              {" "}পড়েছি এবং সম্মত আছি
            </span>
          </label>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)}
              className="flex-1 py-3.5 rounded-xl font-bangla font-bold text-sm transition-all"
              style={{ border: "1.5px solid #d1fae5", color: "#15803d", background: "white", cursor: "pointer" }}>
              ← পূর্ববর্তী
            </button>
            <button onClick={submit} disabled={loading || !form.agree}
              className="btn-press flex-1 py-3.5 rounded-xl font-bangla font-bold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: (!form.agree || loading) ? "#86efac" : "linear-gradient(135deg,#15803d,#16a34a,#22c55e)",
                boxShadow: "0 6px 20px rgba(22,163,74,.3)",
                cursor: (!form.agree || loading) ? "not-allowed" : "pointer",
                border: "none"
              }}>
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  তৈরি হচ্ছে…
                </>
              ) : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </div>
        </div>
      )}

      {!success && (
        <p className="text-center font-bangla text-sm mt-6" style={{ color: "#6b7280" }}>
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <button onClick={onSwitch}
            className="font-bold hover:underline"
            style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer" }}>
            লগ ইন করুন
          </button>
        </p>
      )}
    </div>
  );
}
// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AuthPages() {
  const [page, setPage] = useState("login");

  return (
    <>
      <FontStyle />
      <div className="font-bangla min-h-screen flex mt-20" style={{ background: "#f0fdf4" }}>
        {/* left decorative panel */}
        <GreenPanel page={page} />

        {/* right form panel */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-12 relative overflow-hidden">

          {/* subtle bg circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(22,163,74,.07) 0%,transparent 70%)" }} />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(22,163,74,.05) 0%,transparent 70%)" }} />

          {/* tab switcher (mobile only) */}
          <div className="lg:hidden flex mb-8 p-1 rounded-xl" style={{ background: "#dcfce7" }}>
            {[{ id: "login", label: "লগ ইন" }, { id: "register", label: "রেজিস্ট্রেশন" }].map(t => (
              <button key={t.id} onClick={() => setPage(t.id)}
                className="px-6 py-2 rounded-lg font-bangla text-sm font-bold transition-all duration-200"
                style={{
                  background: page === t.id ? "white" : "transparent",
                  color: page === t.id ? "#15803d" : "#6b7280",
                  boxShadow: page === t.id ? "0 2px 8px rgba(0,0,0,.08)" : "none",
                  border: "none", cursor: "pointer"
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* form */}
          <div className="relative z-10 w-full max-w-md ">
            {page === "login"
              ? <Login    key="login"    onSwitch={() => setPage("register")} />
              : <Register key="register" onSwitch={() => setPage("login")} />
            }
          </div>
        </div>
      </div>
    </>
  );
}