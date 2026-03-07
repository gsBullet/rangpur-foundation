import React, { useState } from "react";
import {
  Field,
  FontStyle,
  getStrength,
  inputCls,
  inputStyle,
} from "../components/common/AuthDesign";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handle = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  const strength = getStrength(form.password);

  const next = () => setStep(2);
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  const roles = [
    { id: "donor", emoji: "💚", label: "ডোনার" },
    { id: "volunteer", emoji: "🤝", label: "স্বেচ্ছাসেবী" },
    { id: "partner", emoji: "🏢", label: "পার্টনার" },
    { id: "beneficiary", emoji: "🌱", label: "সুবিধাভোগী" },
  ];

  return (
    <>
     <FontStyle /> 
    <div
      className="font-bangla  flex  items-center justify-center min-h-screen"
      style={{ background: "#f0fdf4" }}
    >
      <div
        className="hidden lg:flex flex-col justify-between relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#14532d 0%,#166534 45%,#15803d 80%,#16a34a 100%)",
          minHeight: "100vh",
          width: "44%",
        }}
      >
        {/* grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* big circle blur */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: "rgba(74,222,128,.1)", filter: "blur(60px)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full"
          style={{ background: "rgba(255,255,255,.05)", filter: "blur(50px)" }}
        />

        {/* floating leaves */}
        {[
          { top: "18%", left: "12%", size: 28, d: "6s", delay: "0s" },
          { top: "38%", left: "72%", size: 20, d: "8s", delay: "1.2s" },
          { top: "62%", left: "20%", size: 16, d: "5s", delay: "2.5s" },
          { top: "75%", left: "65%", size: 24, d: "7s", delay: ".8s" },
          { top: "10%", left: "55%", size: 14, d: "9s", delay: "3s" },
        ].map((l, i) => (
          <div
            key={i}
            className="leaf absolute select-none pointer-events-none"
            style={{
              top: l.top,
              left: l.left,
              "--d": l.d,
              "--delay": l.delay,
              fontSize: l.size,
            }}
          >
            🌿
          </div>
        ))}

        {/* centre content */}
        <div className="relative z-10 px-10 flex-1 flex flex-col justify-center">
          <div
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bangla text-xs"
            style={{
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.18)",
              color: "#86efac",
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400 inline-block"
              style={{ boxShadow: "0 0 8px #4ade80" }}
            />
            {"নতুন যাত্রা শুরু হোক"}
          </div>

          <h2
            className="shimmer-text font-display font-bold leading-snug mb-5"
              style={{ fontSize: "2.5rem" }}
          >
            { "একসাথে গড়ি\nআলোকিত একটি\nসুন্দর আগামী" }
          </h2>

          <p
            className="font-bangla text-green-200 text-sm leading-relaxed mb-8"
            style={{ opacity: 0.85 }}
          >
            {
              "উৎকর্ষ ফাউন্ডেশনে যোগ দিন এবং হাজারো মানুষের জীবনে ইতিবাচক পরিবর্তন আনুন।"
            }
          </p>

          {/* impact chips */}
          <div className="flex flex-col gap-3">
            {[
              { emoji: "🎓", text: "৫০০০+ শিশু শিক্ষিত" },
              { emoji: "🏥", text: "১২টি বিনামূল্যে ক্লিনিক" },
              { emoji: "💚", text: "১৫ বছরের বিশ্বাস ও সেবা" },
            ].map((chip, i) => (
              <div
                key={i}
                className="flex items-center gap-3 font-bangla text-sm"
                style={{ color: "rgba(255,255,255,.82)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: "rgba(255,255,255,.1)" }}
                >
                  {chip.emoji}
                </div>
                {chip.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="slide-up w-full max-w-md mx-auto px-2">
        {/* header */}
        <div className="mb-6 flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg"
            style={{ background: "linear-gradient(135deg,#14532d,#16a34a)" }}
          >
            🌿
          </div>
          <h1
            className="font-display font-bold text-3xl mb-1"
            style={{ color: "#14532d" }}
          >
            রেজিস্ট্রেশন
          </h1>
          <p className="font-bangla text-sm" style={{ color: "#6b7280" }}>
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* step indicator */}
        {!success && (
          <div className="flex items-center gap-2 mb-7">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300`}
                    style={{
                      background:
                        step >= s
                          ? "linear-gradient(135deg,#15803d,#22c55e)"
                          : "#f0fdf4",
                      color: step >= s ? "white" : "#9ca3af",
                      border: step >= s ? "none" : "1.5px solid #d1fae5",
                    }}
                  >
                    {step > s ? "✓" : s}
                  </div>
                  <span
                    className="font-bangla text-xs font-semibold"
                    style={{ color: step >= s ? "#15803d" : "#9ca3af" }}
                  >
                    {s === 1 ? "ব্যক্তিগত তথ্য" : "অ্যাকাউন্ট সেটআপ"}
                  </span>
                </div>
                {s < 2 && (
                  <div
                    className="flex-1 h-px mx-2"
                    style={{ background: step > 1 ? "#86efac" : "#e5e7eb" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {success ? (
          <div
            className="rounded-2xl p-8 text-center slide-up"
            style={{
              background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
              border: "1.5px solid #86efac",
            }}
          >
            <div className="text-5xl mb-4">🎉</div>
            <h3
              className="font-display font-bold text-xl mb-2"
              style={{ color: "#14532d" }}
            >
              অভিনন্দন!
            </h3>
            <p
              className="font-bangla text-sm mb-4"
              style={{ color: "#16a34a" }}
            >
              আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।
            </p>
            <Link
              to={"/login"}
              className="btn-press px-6 py-2.5 rounded-xl font-bangla text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#15803d,#22c55e)",
                border: "none",
                cursor: "pointer",
              }}
            >
              লগ ইন করুন →
            </Link>
          </div>
        ) : step === 1 ? (
          <div className="space-y-5">
            <Field label="পূর্ণ নাম" icon="👤">
              <input
                className={inputCls}
                style={inputStyle}
                type="text"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                value={form.name}
                onChange={handle("name")}
              />
            </Field>

            <Field label="মোবাইল নম্বর" icon="📱">
              <input
                className={inputCls}
                style={inputStyle}
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={handle("phone")}
              />
            </Field>

            <Field
              label="ইমেইল অ্যাড্রেস"
              icon="✉️"
              hint="সকল বিজ্ঞপ্তি এই ইমেইলে পাঠানো হবে"
            >
              <input
                className={inputCls}
                style={inputStyle}
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handle("email")}
              />
            </Field>

            <div>
              <label
                className="block font-bangla text-sm font-semibold mb-2"
                style={{ color: "#166534" }}
              >
                আপনার ভূমিকা নির্বাচন করুন
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: r.id }))}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bangla text-sm font-semibold transition-all duration-200"
                    style={{
                      border: `1.5px solid ${form.role === r.id ? "#16a34a" : "#d1fae5"}`,
                      background: form.role === r.id ? "#f0fdf4" : "white",
                      color: form.role === r.id ? "#15803d" : "#6b7280",
                      cursor: "pointer",
                      boxShadow:
                        form.role === r.id
                          ? "0 0 0 3px rgba(22,163,74,.12)"
                          : "none",
                    }}
                  >
                    <span>{r.emoji}</span>
                    {r.label}
                    {form.role === r.id && (
                      <span className="ml-auto text-green-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={next}
              disabled={!form.name || !form.email || !form.role}
              className="btn-press w-full py-3.5 rounded-xl font-bangla font-bold text-white text-base transition-all duration-300"
              style={{
                background:
                  !form.name || !form.email || !form.role
                    ? "#86efac"
                    : "linear-gradient(135deg,#15803d,#16a34a,#22c55e)",
                boxShadow: "0 6px 20px rgba(22,163,74,.3)",
                cursor:
                  !form.name || !form.email || !form.role
                    ? "not-allowed"
                    : "pointer",
                border: "none",
              }}
            >
              পরবর্তী ধাপ →
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <Field label="পাসওয়ার্ড তৈরি করুন" icon="🔒">
              <input
                className={inputCls}
                style={{ ...inputStyle, paddingRight: "44px" }}
                type={show ? "text" : "password"}
                placeholder="শক্তিশালী পাসওয়ার্ড"
                value={form.password}
                onChange={handle("password")}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
                style={{
                  color: show ? "#16a34a" : "#9ca3af",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <EyeIcon open={show} />
              </button>
            </Field>

            {/* strength bar */}
            {form.password && (
              <div className="space-y-1.5 -mt-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ background: "#e5e7eb" }}
                    >
                      {i <= strength.score && (
                        <div
                          className="bar-fill h-full rounded-full"
                          style={{ background: strength.color, width: "100%" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p
                  className="font-bangla text-xs font-semibold"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </p>
              </div>
            )}

            <Field label="পাসওয়ার্ড নিশ্চিত করুন" icon="🔐">
              <input
                className={inputCls}
                style={inputStyle}
                type="password"
                placeholder="পুনরায় পাসওয়ার্ড দিন"
              />
            </Field>

            {/* terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={handle("agree")}
                className="w-4 h-4 mt-0.5 rounded flex-shrink-0"
              />
              <span
                className="font-bangla text-sm leading-relaxed"
                style={{ color: "#374151" }}
              >
                আমি{" "}
                <span
                  className="font-semibold cursor-pointer hover:underline"
                  style={{ color: "#16a34a" }}
                >
                  প্রাইভেসি পলিসি
                </span>{" "}
                এবং{" "}
                <span
                  className="font-semibold cursor-pointer hover:underline"
                  style={{ color: "#16a34a" }}
                >
                  Terms of Service
                </span>{" "}
                পড়েছি এবং সম্মত আছি
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-xl font-bangla font-bold text-sm transition-all"
                style={{
                  border: "1.5px solid #d1fae5",
                  color: "#15803d",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                ← পূর্ববর্তী
              </button>
              <button
                onClick={submit}
                disabled={loading || !form.agree}
                className="btn-press flex-1 py-3.5 rounded-xl font-bangla font-bold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background:
                    !form.agree || loading
                      ? "#86efac"
                      : "linear-gradient(135deg,#15803d,#16a34a,#22c55e)",
                  boxShadow: "0 6px 20px rgba(22,163,74,.3)",
                  cursor: !form.agree || loading ? "not-allowed" : "pointer",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    তৈরি হচ্ছে…
                  </>
                ) : (
                  "অ্যাকাউন্ট তৈরি করুন"
                )}
              </button>
            </div>
          </div>
        )}

        {!success && (
          <p
            className="text-center font-bangla text-sm mt-6"
            style={{ color: "#6b7280" }}
          >
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              to={"/login"}
              className="font-bold hover:underline"
              style={{
                color: "#16a34a",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              লগ ইন করুন
            </Link>
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default Register;
