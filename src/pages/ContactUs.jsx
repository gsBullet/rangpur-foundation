import React from "react";
import PageMeta from "../components/common/PageMeta";

const ContactUs = () => {
  return (
    <div>
        <PageMeta
        title="যোগাযোগ"
        description="আমাদের সাথে যোগাযোগ করুন"
      />
      {/* Contact Us  */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div className="section-subtitle">আমাদের সাথে</div>
          <h1 className="section-title">যোগাযোগ করুন</h1>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "32px",
          }}
        >
          <div>
            <div
              className="card"
              style={{ padding: "36px", marginBottom: "20px" }}
            >
              <h3
                style={{
                  fontWeight: "800",
                  color: "#14532d",
                  marginBottom: "20px",
                  fontSize: "1.2rem",
                }}
              >
                📍 অফিস ঠিকানা
              </h3>
              {[
                {
                  icon: "🏢",
                  text: "১২৩, লালবাগ রোড, রংপুর সদর, রংপুর-৫৪০০",
                },
                { icon: "📞", text: "+৮৮০-১৭XX-XXXXXX" },
                { icon: "📧", text: "info@utkarsha.org.bd" },
                { icon: "🕐", text: "শনি-বৃহস্পতি: সকাল ৯টা – বিকেল ৫টা" },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{c.icon}</span>
                  <span style={{ color: "#374151" }}>{c.text}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: "28px" }}>
              <h3
                style={{
                  fontWeight: "800",
                  color: "#14532d",
                  marginBottom: "16px",
                }}
              >
                সোশ্যাল মিডিয়া
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                {["Facebook", "YouTube", "Twitter"].map((s) => (
                  <button
                    key={s}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "#f0fdf4",
                      border: "1px solid #dcfce7",
                      borderRadius: "10px",
                      color: "#16a34a",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    fontWeight: "700",
                    color: "#14532d",
                    marginBottom: "10px",
                  }}
                >
                  নিউজলেটার সাইনআপ
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    placeholder="আপনার ইমেইল"
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "0.9rem",
                    }}
                  />
                  <button
                    className="btn-primary"
                    style={{ padding: "10px 20px", fontSize: "0.85rem" }}
                  >
                    সাইন আপ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "40px" }}>
            <h3
              style={{
                fontWeight: "800",
                color: "#14532d",
                marginBottom: "24px",
                fontSize: "1.2rem",
              }}
            >
              বার্তা পাঠান
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <input
                placeholder="আপনার নাম"
                style={{
                  padding: "14px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <input
                placeholder="ইমেইল"
                style={{
                  padding: "14px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>
            <input
              placeholder="ফোন নম্বর"
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "0.9rem",
                outline: "none",
                marginBottom: "16px",
              }}
            />
            <input
              placeholder="বিষয়"
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "0.9rem",
                outline: "none",
                marginBottom: "16px",
              }}
            />
            <textarea
              placeholder="আপনার বার্তা লিখুন..."
              rows={5}
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "0.9rem",
                outline: "none",
                resize: "vertical",
                marginBottom: "20px",
              }}
            />
            <button
              className="btn-primary"
              style={{ width: "100%", padding: "16px", fontSize: "1rem" }}
            >
              📨 বার্তা পাঠান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
