import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#0f2d1a",
        color: "white",
        padding: "60px 24px 24px",
        marginTop: "60px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                🌱
              </div>
              <div
                style={{
                  fontFamily: "'Tiro Bangla', serif",
                  fontSize: "1.2rem",
                  fontWeight: "800",
                }}
              >
                উৎকর্ষ ফাউন্ডেশন
              </div>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                fontSize: "0.9rem",
                maxWidth: "280px",
              }}
            >
              রংপুরের মানুষের জীবনমান উন্নয়নে আমরা প্রতিশ্রুতিবদ্ধ। প্রতিটি
              দান, প্রতিটি স্বেচ্ছাসেবা জীবন বদলে দেয়।
            </p>
          </div>
          {[
            {
              title: "কার্যক্রম",
              links: ["শিক্ষা", "স্বাস্থ্য", "নারী উন্নয়ন", "পরিবেশ"],
            },
            {
              title: "তথ্য",
              links: ["আমাদের সম্পর্কে", "বার্ষিক রিপোর্ট", "গবেষণা", "FAQ"],
            },
            {
              title: "সহায়তা",
              links: ["ডোনেট", "স্বেচ্ছাসেবী", "পার্টনারশিপ", "যোগাযোগ"],
            },
          ].map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: "#4ade80",
                }}
              >
                {col.title}
              </div>
              {col.links.map((l, j) => (
                <div
                  key={j}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "8px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#4ade80")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            © ২০২৫ উৎকর্ষ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {["প্রাইভেসি পলিসি", "Terms of Service"].map((l) => (
              <span
                key={l}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#4ade80")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
