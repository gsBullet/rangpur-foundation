import React, { useContext, useState } from "react";
import { Frontendcontext } from "../context/FrontendContext";

function Hero() {
    const { setActivePage } = useContext(Frontendcontext);
    const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    {
      bg: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)",
      title: "শিক্ষায় আলো, জীবনে পরিবর্তন",
      sub: "রংপুরের প্রতিটি শিশুর মুখে হাসি ফোটানোই আমাদের লক্ষ্য",
    },
    {
      bg: "linear-gradient(135deg, #065f46 0%, #047857 40%, #059669 100%)",
      title: "স্বাস্থ্যই সম্পদ, সুস্থই জাতি",
      sub: "বিনামূল্যে স্বাস্থ্যসেবায় লক্ষাধিক পরিবার উপকৃত",
    },
    {
      bg: "linear-gradient(135deg, #1e3a2f 0%, #16a34a 60%, #22c55e 100%)",
      title: "নারীর ক্ষমতায়ন, দেশের উন্নয়ন",
      sub: "প্রতিটি নারীকে আত্মনির্ভরশীল করতে প্রতিশ্রুতিবদ্ধ",
    },
  ];

  return (
    <div>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          background: heroSlides[heroSlide].bg,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          transition: "background 1s ease",
        }}
      >
        {/* Decorative circles */}
        <div
          className="hero-particle"
          style={{
            width: "400px",
            height: "400px",
            background: "rgba(255,255,255,0.05)",
            top: "-100px",
            right: "-100px",
            animationDelay: "0s",
          }}
        />
        <div
          className="hero-particle"
          style={{
            width: "250px",
            height: "250px",
            background: "rgba(255,255,255,0.08)",
            bottom: "50px",
            left: "-50px",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="hero-particle"
          style={{
            width: "150px",
            height: "150px",
            background: "rgba(74,222,128,0.15)",
            top: "30%",
            right: "20%",
            animationDelay: "0.8s",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "120px 24px 80px",
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div className="animate-in">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50px",
                padding: "8px 20px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#4ade80",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "pulse-green 2s infinite",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.85rem",
                }}
              >
                রংপুরের মানুষের পাশে ১৫ বছর ধরে
              </span>
            </div>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "800",
                color: "white",
                lineHeight: 1.2,
                marginBottom: "20px",
                fontFamily: "'Tiro Bangla', serif",
              }}
            >
              {heroSlides[heroSlide].title}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "36px",
              }}
            >
              {heroSlides[heroSlide].sub}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                style={{ fontSize: "1rem", padding: "14px 32px" }}
                onClick={() => setActivePage("donate")}
              >
                💚 এখনই সহায়তা করুন
              </button>
              <button
                className="btn-outline"
                onClick={() => setActivePage("about")}
              >
                আমাদের জানুন →
              </button>
            </div>
          </div>

          {/* Hero right panel */}
          <div
            className="float-anim"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {[
              {
                icon: "🎓",
                title: "শিক্ষা কার্যক্রম",
                desc: "৫০০০+ শিশু উপকৃত",
              },
              {
                icon: "🏥",
                title: "স্বাস্থ্যসেবা",
                desc: "১২টি বিনামূল্যে ক্লিনিক",
              },
              {
                icon: "💼",
                title: "কর্মসংস্থান",
                desc: "৮০০+ নতুন কর্মসংস্থান",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                <div>
                  <div
                    style={{
                      color: "white",
                      fontWeight: "700",
                      fontSize: "1rem",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ color: "#86efac", fontSize: "0.85rem" }}>
                    {item.desc}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    color: "#4ade80",
                    fontSize: "1.2rem",
                  }}
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                width: i === heroSlide ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  i === heroSlide ? "#4ade80" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
