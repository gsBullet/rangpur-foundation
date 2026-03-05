import React from "react";

const SuccessStoriesPreview = () => {
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
      <div style={{ padding: "80px 24px", background: "#f0fdf4" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-subtitle">অনুপ্রেরণার গল্প</div>
            <h2 className="section-title">যারা পাল্টে গেছেন</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {STORIES.map((s, i) => (
              <div key={i} className="card" style={{ padding: "32px" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
                  {s.avatar}
                </div>
                <p
                  style={{
                    color: "#374151",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    marginBottom: "20px",
                  }}
                >
                  "{s.story}"
                </p>
                <div
                  style={{
                    borderTop: "1px solid #dcfce7",
                    paddingTop: "16px",
                  }}
                >
                  <div style={{ fontWeight: "700", color: "#14532d" }}>
                    {s.name}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                    {s.area} • <span className="tag">{s.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPreview;
