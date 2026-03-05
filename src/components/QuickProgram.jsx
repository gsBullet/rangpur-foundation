import React, { useContext } from "react";
import { Frontendcontext } from "../context/FrontendContext";

const QuickProgram = () => {
    const { setActivePage } = useContext(Frontendcontext);
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
      <div style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-subtitle">আমাদের কার্যক্রম</div>
            <h2 className="section-title">যে পথে হাঁটি আমরা</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {PROGRAMS.map((p, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderTop: `4px solid ${p.color}`,
                }}
                onClick={() => setActivePage("programs")}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#14532d",
                    marginBottom: "8px",
                    fontSize: "1.05rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickProgram;
