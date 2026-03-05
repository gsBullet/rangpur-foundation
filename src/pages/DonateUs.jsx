import React, { useState } from "react";
import PageMeta from "../components/common/PageMeta";

const DonateUs = () => {
  const activePage = "donate";
  const [donationType, setDonationType] = useState("onetime");
  const [donationAmount, setDonationAmount] = useState(500);
  return (
    <div>
        <PageMeta
        title="ডোনেশন | সহায়তা করুন"
        description="আপনার দানে আলোকিত হোক জীবন - bKash ও Nagad-এর মাধ্যমে নিরাপদে দান করুন"
      />
      {/* ========== DONATE PAGE ========== */}
      {activePage === "donate" && (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-subtitle">সহায়তা করুন</div>
            <h1 className="section-title">আপনার দানে আলোকিত হোক জীবন</h1>
            <p style={{ color: "#6b7280", marginTop: "12px" }}>
              bKash ও Nagad-এর মাধ্যমে নিরাপদে দান করুন
            </p>
          </div>

          <div className="card" style={{ padding: "48px" }}>
            {/* Donation type */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontWeight: "700",
                  color: "#14532d",
                  marginBottom: "16px",
                }}
              >
                দানের ধরন নির্বাচন করুন
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { id: "onetime", label: "এককালীন" },
                  { id: "monthly", label: "মাসিক" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDonationType(t.id)}
                    style={{
                      flex: 1,
                      padding: "14px",
                      borderRadius: "12px",
                      border: "2px solid",
                      borderColor:
                        donationType === t.id ? "#16a34a" : "#e5e7eb",
                      background: donationType === t.id ? "#f0fdf4" : "white",
                      color: donationType === t.id ? "#16a34a" : "#374151",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount selection */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontWeight: "700",
                  color: "#14532d",
                  marginBottom: "16px",
                }}
              >
                পরিমাণ নির্বাচন করুন (টাকা)
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                {[100, 250, 500, 1000, 2500, 5000, 10000].map((a) => (
                  <button
                    key={a}
                    onClick={() => setDonationAmount(a)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "2px solid",
                      borderColor: donationAmount === a ? "#16a34a" : "#e5e7eb",
                      background:
                        donationAmount === a
                          ? "linear-gradient(135deg, #16a34a, #22c55e)"
                          : "white",
                      color: donationAmount === a ? "white" : "#374151",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                  >
                    ৳{a.toLocaleString()}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="নিজে লিখুন"
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "2px solid #e5e7eb",
                    textAlign: "center",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
            </div>

            {/* Payment methods */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontWeight: "700",
                  color: "#14532d",
                  marginBottom: "16px",
                }}
              >
                পেমেন্ট মাধ্যম
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "900",
                      color: "#e91e8c",
                      fontSize: "0.9rem",
                    }}
                  >
                    bK
                  </div>
                  <div>
                    <div style={{ color: "white", fontWeight: "700" }}>
                      bKash
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.8rem",
                      }}
                    >
                      01XXXXXXXXX
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ff6600, #e65c00)",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "900",
                      color: "#ff6600",
                      fontSize: "0.9rem",
                    }}
                  >
                    Ng
                  </div>
                  <div>
                    <div style={{ color: "white", fontWeight: "700" }}>
                      Nagad
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.8rem",
                      }}
                    >
                      01XXXXXXXXX
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f0fdf4",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#374151" }}>মোট দানের পরিমাণ:</span>
              <span
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "800",
                  color: "#16a34a",
                }}
              >
                ৳{donationAmount.toLocaleString()}
              </span>
            </div>

            <button
              className="btn-primary"
              style={{
                width: "100%",
                padding: "18px",
                fontSize: "1.1rem",
                borderRadius: "12px",
              }}
            >
              💚 ৳{donationAmount.toLocaleString()} দান করুন
            </button>
            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: "0.82rem",
                marginTop: "12px",
              }}
            >
              ✓ ট্যাক্স রিসিপ্ট পাওয়া যাবে ✓ নিরাপদ পেমেন্ট ✓ ১০০% স্বচ্ছতা
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateUs;
