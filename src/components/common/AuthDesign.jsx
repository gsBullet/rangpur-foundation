export const FontStyle = () => (
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


export const GreenPanel = ({ page }) => (
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

export const getStrength = (pw) => {
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

export const EyeIcon = ({ open }) => open
  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

  export const Field = ({ label, icon, children, hint }) => (
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

export const inputCls = "input-field w-full pl-10 pr-4 py-3 rounded-xl border font-bangla text-sm transition-all duration-200 bg-white";
export const inputStyle = { borderColor: "#d1fae5", color: "#14532d" };