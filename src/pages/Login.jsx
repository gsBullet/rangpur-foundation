import React, { useState } from "react";
import {
  Field,
  FontStyle,
  inputCls,
  inputStyle,
} from "../components/common/AuthDesign";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handle = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1600);
  };

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
            style={{
              background: "rgba(255,255,255,.05)",
              filter: "blur(50px)",
            }}
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
              স্বাগতম ফিরে আসায়
            </div>

            <h2
              className="shimmer-text font-display font-bold leading-snug mb-5"
              style={{ fontSize: "2.5rem" }}
            >
              {"আবার আসুন,\nআমরা অপেক্ষায়\nছিলাম আপনার"}
            </h2>

            <p
              className="font-bangla text-green-200 text-sm leading-relaxed mb-8"
              style={{ opacity: 0.85 }}
            >
              {
                "আপনার অ্যাকাউন্টে প্রবেশ করুন এবং রংপুরের মানুষের জীবন পরিবর্তনে অংশ নিন।"
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
          <div className="mb-8 flex items-center flex-col text-center gap-1">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg"
              style={{ background: "linear-gradient(135deg,#14532d,#16a34a)" }}
            >
              🔑
            </div>
            <h1
              className="font-display font-bold text-3xl mb-1"
              style={{ color: "#14532d" }}
            >
              লগ ইন করুন
            </h1>
            <p className="font-bangla text-sm" style={{ color: "#6b7280" }}>
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </p>
          </div>

          {success ? (
            <div
              className="rounded-2xl p-8 text-center slide-up"
              style={{
                background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
                border: "1.5px solid #86efac",
              }}
            >
              <div className="text-5xl mb-4">✅</div>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ color: "#14532d" }}
              >
                সফলভাবে প্রবেশ হয়েছে!
              </h3>
              <p className="font-bangla text-sm" style={{ color: "#16a34a" }}>
                স্বাগতম, উৎকর্ষ পরিবারে!
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <Field label="ইমেইল অ্যাড্রেস" icon="✉️">
                <input
                  className={inputCls}
                  style={inputStyle}
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handle("email")}
                />
              </Field>

              <Field label="পাসওয়ার্ড" icon="🔒">
                <input
                  className={inputCls}
                  style={{ ...inputStyle, paddingRight: "44px" }}
                  type={show ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড"
                  value={form.password}
                  onChange={handle("password")}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: show ? "#16a34a" : "#9ca3af" }}
                >
                  <EyeIcon open={show} />
                </button>
              </Field>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={handle("remember")}
                    className="w-4 h-4 rounded"
                  />
                  <span
                    className="font-bangla text-sm"
                    style={{ color: "#374151" }}
                  >
                    মনে রাখুন
                  </span>
                </label>
                <button
                  className="font-bangla text-sm font-semibold transition-colors hover:underline"
                  style={{
                    color: "#16a34a",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>

              <button
                onClick={submit}
                disabled={loading}
                className="btn-press w-full py-3.5 rounded-xl font-bangla font-bold text-white text-base transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: loading
                    ? "#86efac"
                    : "linear-gradient(135deg,#15803d,#16a34a,#22c55e)",
                  boxShadow: "0 6px 20px rgba(22,163,74,.35)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
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
                    যাচাই করা হচ্ছে…
                  </>
                ) : (
                  "লগ ইন করুন →"
                )}
              </button>

              {/* divider */}
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 h-px"
                  style={{ background: "#d1fae5" }}
                />
                <span
                  className="font-bangla text-xs"
                  style={{ color: "#9ca3af" }}
                >
                  অথবা
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "#d1fae5" }}
                />
              </div>

              {/* social */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🌐", label: "Google" },
                  { icon: "📘", label: "Facebook" },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bangla text-sm font-semibold transition-all hover:shadow-md"
                    style={{
                      border: "1.5px solid #d1fae5",
                      color: "#15803d",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>

              <p
                className="text-center font-bangla text-sm"
                style={{ color: "#6b7280" }}
              >
                অ্যাকাউন্ট নেই?{" "}
                <Link
                  to="/register"
                  className="font-bold transition-colors hover:underline"
                  style={{
                    color: "#16a34a",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  রেজিস্ট্রেশন করুন
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
