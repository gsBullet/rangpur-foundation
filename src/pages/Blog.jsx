import React from "react";
import PageMeta from "../components/common/PageMeta";

const Blog = () => {
  const BLOGS = [
    {
      title: "রংপুরে দারিদ্র্য বিমোচনে নতুন মাইলফলক",
      date: "১৫ ফেব্রুয়ারি, ২০২৫",
      category: "সাফল্য",
      img: "📰",
    },
    {
      title: "জলবায়ু পরিবর্তন মোকাবেলায় কৃষক প্রশিক্ষণ শুরু",
      date: "৮ মার্চ, ২০২৫",
      category: "ইভেন্ট",
      img: "🌱",
    },
    {
      title: "আন্তর্জাতিক নারী দিবসে বিশেষ আয়োজন",
      date: "৮ মার্চ, ২০২৫",
      category: "খবর",
      img: "👩",
    },
  ];
  return (
    <div>
        <PageMeta
        title="ব্লগ"
        description="আমাদের ব্লগ পড়ুন"
      />
      {/* ========== BLOG PAGE ========== */}

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div className="section-subtitle">সর্বশেষ আপডেট</div>
            <h1 className="section-title">ব্লগ ও খবর</h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="🔍 খুঁজুন..."
              style={{
                padding: "12px 20px",
                borderRadius: "50px",
                border: "2px solid #e5e7eb",
                fontSize: "0.9rem",
                outline: "none",
                width: "220px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {BLOGS.map((b, i) => (
            <div
              key={i}
              className="card"
              style={{ overflow: "hidden", cursor: "pointer" }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #14532d, #16a34a)",
                  padding: "40px",
                  textAlign: "center",
                  fontSize: "3rem",
                }}
              >
                {b.img}
              </div>
              <div style={{ padding: "24px" }}>
                <span
                  className="tag"
                  style={{ marginBottom: "10px", display: "inline-block" }}
                >
                  {b.category}
                </span>
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#14532d",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    marginBottom: "12px",
                  }}
                >
                  {b.title}
                </h3>
                <div style={{ color: "#6b7280", fontSize: "0.82rem" }}>
                  📅 {b.date}
                </div>
                <div
                  style={{
                    marginTop: "16px",
                    color: "#16a34a",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  আরও পড়ুন →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
