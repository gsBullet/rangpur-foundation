import React from "react";
import PageMeta from "../components/common/PageMeta";

const About = () => {
  const activePage = "about";
  const TEAM = [
    { name: "ড. মো. আরিফুল ইসলাম", role: "নির্বাহী পরিচালক", avatar: "👨‍💼" },
    { name: "জাহানারা বেগম", role: "প্রোগ্রাম ডিরেক্টর", avatar: "👩‍💼" },
    { name: "মো. সাইফুল হক", role: "অর্থ পরিচালক", avatar: "👨‍💼" },
    { name: "রওশন আরা", role: "গবেষণা প্রধান", avatar: "👩‍🔬" },
  ];
  return (
    <div>
        <PageMeta
        title="আমাদের সম্পর্কে জানুন"
        description="আমাদের সম্পর্কে জানুন"
      />
      {/* ========== ABOUT PAGE ========== */}
      {activePage === "about" && (
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "100px 24px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #14532d, #16a34a)",
              borderRadius: "24px",
              padding: "60px",
              color: "white",
              marginBottom: "40px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "-40px",
                top: "-40px",
                width: "250px",
                height: "250px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "50%",
              }}
            />
            <div className="section-subtitle" style={{ color: "#86efac" }}>
              আমাদের পরিচয়
            </div>
            <h1
              style={{
                fontSize: "3rem",
                fontFamily: "'Tiro Bangla', serif",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              উৎকর্ষ ফাউন্ডেশন
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                maxWidth: "700px",
                opacity: 0.9,
              }}
            >
              ২০১০ সালে প্রতিষ্ঠিত উৎকর্ষ ফাউন্ডেশন রংপুর বিভাগের সুবিধাবঞ্চিত
              মানুষের জীবনমান উন্নয়নে নিরলসভাবে কাজ করে আসছে। শিক্ষা,
              স্বাস্থ্য, নারী উন্নয়ন ও দারিদ্র্য বিমোচনে আমরা একটি সামগ্রিক
              পদ্ধতিতে কাজ করি।
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <div className="card" style={{ padding: "36px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🎯</div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#14532d",
                  marginBottom: "12px",
                }}
              >
                আমাদের মিশন
              </h3>
              <p style={{ color: "#374151", lineHeight: 1.8 }}>
                রংপুর বিভাগের প্রতিটি মানুষের মৌলিক অধিকার নিশ্চিত করতে টেকসই
                উন্নয়ন কার্যক্রম পরিচালনা করা এবং একটি ন্যায়সঙ্গত সমাজ গড়ে
                তোলা।
              </p>
            </div>
            <div className="card" style={{ padding: "36px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌟</div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#14532d",
                  marginBottom: "12px",
                }}
              >
                আমাদের ভিশন
              </h3>
              <p style={{ color: "#374151", lineHeight: 1.8 }}>
                ২০৩০ সালের মধ্যে রংপুর বিভাগকে একটি শিক্ষিত, সুস্থ ও
                অর্থনৈতিকভাবে স্বনির্ভর অঞ্চলে পরিণত করা।
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <h2 className="section-title" style={{ marginBottom: "24px" }}>
              আমাদের টিম
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {TEAM.map((m, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: "28px", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      margin: "0 auto 16px",
                    }}
                  >
                    {m.avatar}
                  </div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#14532d",
                      fontSize: "1rem",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      color: "#16a34a",
                      fontSize: "0.85rem",
                      marginTop: "4px",
                    }}
                  >
                    {m.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map area */}
          <div className="card" style={{ padding: "36px" }}>
            <h2 className="section-title" style={{ marginBottom: "20px" }}>
              কার্যক্ষেত্র — রংপুর বিভাগ
            </h2>
            <div
              style={{
                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                borderRadius: "16px",
                padding: "40px",
                textAlign: "center",
                border: "2px dashed #86efac",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🗺️</div>
              <p
                style={{
                  color: "#16a34a",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                }}
              >
                রংপুর, গাইবান্ধা, কুড়িগ্রাম, লালমনিরহাট, নীলফামারী, দিনাজপুর,
                ঠাকুরগাঁও, পঞ্চগড়
              </p>
              <p style={{ color: "#6b7280", marginTop: "8px" }}>
                ৮টি জেলায় সক্রিয় কার্যক্রম পরিচালিত
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
