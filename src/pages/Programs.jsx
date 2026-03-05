import React from "react";

const Programs = () => {
  const activePage = "programs";
  const PROGRAMS = [
    {
      icon: "📚",
      title: "শিক্ষা",
      desc: "প্রাথমিক থেকে উচ্চশিক্ষায় সহায়তা, বৃত্তি ও কোচিং",
      color: "#16a34a",
    },
    {
      icon: "🏥",
      title: "স্বাস্থ্য",
      desc: "বিনামূল্যে স্বাস্থ্যসেবা, টিকা ও পুষ্টি কার্যক্রম",
      color: "#15803d",
    },
    {
      icon: "👶",
      title: "শিশু উন্নয়ন",
      desc: "শিশু পুষ্টি, সুরক্ষা ও প্রাথমিক শিশু শিক্ষা",
      color: "#166534",
    },
    {
      icon: "👩",
      title: "নারী অধিকার",
      desc: "নারী ক্ষমতায়ন, দক্ষতা উন্নয়ন ও আইনি সহায়তা",
      color: "#14532d",
    },
    {
      icon: "♿",
      title: "প্রতিবন্ধী সেবা",
      desc: "বিশেষ চাহিদাসম্পন্ন ব্যক্তিদের পুনর্বাসন ও সহায়তা",
      color: "#16a34a",
    },
    {
      icon: "💼",
      title: "বেকারত্ব দূরীকরণ",
      desc: "কর্মসংস্থান সৃষ্টি, প্রশিক্ষণ ও উদ্যোক্তা উন্নয়ন",
      color: "#15803d",
    },
    {
      icon: "🌿",
      title: "জলবায়ু ও দুর্যোগ",
      desc: "জলবায়ু অভিযোজন ও দুর্যোগ মোকাবেলা কার্যক্রম",
      color: "#166534",
    },
    {
      icon: "⚖️",
      title: "আইনি সহায়তা",
      desc: "বিনামূল্যে আইনি পরামর্শ ও ন্যায়বিচার নিশ্চিতকরণ",
      color: "#14532d",
    },
  ];
  return (
    <div>
      {/* ========== PROGRAMS PAGE ========== */}
      {activePage === "programs" && (
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-subtitle">সকল কার্যক্রম</div>
            <h1 className="section-title">আমাদের কার্যক্রমসমূহ</h1>
            <p
              style={{
                color: "#6b7280",
                marginTop: "12px",
                maxWidth: "600px",
                margin: "12px auto 0",
              }}
            >
              মানুষের জীবনের প্রতিটি দিক উন্নত করতে আমরা কাজ করি
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "28px",
            }}
          >
            {PROGRAMS.map((p, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "36px",
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  borderLeft: `5px solid ${p.color}`,
                }}
              >
                <div style={{ fontSize: "3rem", flexShrink: 0 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "800",
                      color: "#14532d",
                      marginBottom: "10px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span style={{ color: "#16a34a", fontWeight: "600" }}>
                      ✓ কেস স্টাডি দেখুন
                    </span>
                    <span style={{ color: "#16a34a", fontWeight: "600" }}>
                      ✓ প্রভাবের ডেটা
                    </span>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        color: "#6b7280",
                        marginBottom: "6px",
                      }}
                    >
                      <span>অগ্রগতি</span>
                      <span>{60 + i * 5}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${60 + i * 5}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;
