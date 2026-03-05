import React from "react";
import PageMeta from "../components/common/PageMeta";

const SuccessStories = () => {
  const activePage = "stories";
  const STORIES = [
    {
      name: "রহিমা বেগম",
      area: "রংপুর সদর",
      story:
        "নারী উদ্যোক্তা প্রকল্পের মাধ্যমে আজ আমি একটি সফল সেলাই ব্যবসার মালিক। উৎকর্ষ ফাউন্ডেশন আমার জীবন বদলে দিয়েছে।",
      program: "নারী উন্নয়ন",
      avatar: "👩",
    },
    {
      name: "করিম হোসেন",
      area: "গঙ্গাচড়া",
      story:
        "বৃত্তি পেয়ে আমি ইঞ্জিনিয়ারিং পড়তে পারছি। এটা ছাড়া আমার স্বপ্ন পূরণ হতো না।",
      program: "শিক্ষা বৃত্তি",
      avatar: "👦",
    },
    {
      name: "সুমাইয়া খানম",
      area: "কাউনিয়া",
      story:
        "বিনামূল্যে চিকিৎসা পেয়ে আমার সন্তান সুস্থ হয়েছে। এই সংগঠনটি আমার ত্রাণকর্তা।",
      program: "স্বাস্থ্যসেবা",
      avatar: "👩‍⚕️",
    },
  ];
  return (
    <div>
        <PageMeta
        title="সাফল্যের গল্প"
        description="আমাদের সাফল্যের গল্প শুনুন"
      />
      {/* ========== SUCCESS STORIES PAGE ========== */}
      {activePage === "stories" && (
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-subtitle">অনুপ্রেরণা</div>
            <h1 className="section-title">সাফল্যের গল্প</h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            {STORIES.map((s, i) => (
              <div key={i} className="card" style={{ padding: "36px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    marginBottom: "20px",
                  }}
                >
                  {s.avatar}
                </div>
                <span
                  className="tag"
                  style={{ marginBottom: "12px", display: "inline-block" }}
                >
                  {s.program}
                </span>
                <p
                  style={{
                    color: "#374151",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    marginBottom: "20px",
                    fontSize: "0.95rem",
                  }}
                >
                  "{s.story}"
                </p>
                <div style={{ fontWeight: "700", color: "#14532d" }}>
                  {s.name}
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                  📍 {s.area}
                </div>
              </div>
            ))}
          </div>

          {/* Video testimonials section */}
          <div
            style={{
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              borderRadius: "20px",
              padding: "48px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                color: "#14532d",
                fontWeight: "800",
                marginBottom: "12px",
              }}
            >
              ভিডিও টেস্টিমোনিয়াল
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              সরাসরি শুনুন তাদের মুখ থেকে যাদের জীবন বদলেছে
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {[1, 2, 3].map((v) => (
                <div
                  key={v}
                  style={{
                    background: "#14532d",
                    borderRadius: "12px",
                    aspectRatio: "16/9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    ▶️
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
