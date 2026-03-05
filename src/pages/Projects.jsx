import React from "react";
import PageMeta from "../components/common/PageMeta";

const Projects = () => {
  const activePage = "projects";
  const PROJECTS = [
    {
      title: "শিশু পুষ্টি প্রকল্প",
      progress: 75,
      funded: "UNICEF",
      status: "চলমান",
      year: "২০২৩-২৫",
    },
    {
      title: "মেয়েদের ডিজিটাল শিক্ষা",
      progress: 60,
      funded: "বিশ্বব্যাংক",
      status: "চলমান",
      year: "২০২৪-২৬",
    },
    {
      title: "কৃষক প্রশিক্ষণ কেন্দ্র",
      progress: 90,
      funded: "FAO",
      status: "প্রায় সম্পন্ন",
      year: "২০২২-২৪",
    },
    {
      title: "দুর্যোগ সহনশীল গৃহ",
      progress: 45,
      funded: "স্থানীয় সরকার",
      status: "চলমান",
      year: "২০২৪-২৭",
    },
  ];
  return (
    <div>
        <PageMeta
        title="প্রকল্পসমূহ"
        description="আমাদের চলমান ও সম্পন্ন প্রকল্পসমূহ"
      />
      {/* ========== PROJECTS PAGE ========== */}
      
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-subtitle">চলমান ও সম্পন্ন</div>
            <h1 className="section-title">প্রকল্পসমূহ</h1>
          </div>
          <div style={{ display: "grid", gap: "20px" }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "800",
                        color: "#14532d",
                      }}
                    >
                      {p.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <span className="tag">📅 {p.year}</span>
                      <span className="tag">💰 {p.funded}</span>
                    </div>
                  </div>
                  <span
                    style={{
                      background:
                        p.status === "প্রায় সম্পন্ন" ? "#fef9c3" : "#dcfce7",
                      color:
                        p.status === "প্রায় সম্পন্ন" ? "#854d0e" : "#166534",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#16a34a",
                      fontSize: "1.1rem",
                      minWidth: "45px",
                    }}
                  >
                    {p.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </div>
  );
};

export default Projects;
