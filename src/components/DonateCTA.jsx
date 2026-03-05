import React, { useContext } from 'react'
import { Frontendcontext } from '../context/FrontendContext';

const DonateCTA = () => {
    const { setActivePage } = useContext(Frontendcontext);
  return (
    <div>
         <div
              style={{
                background:
                  "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)",
                padding: "80px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "300px",
                  height: "300px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  maxWidth: "800px",
                  margin: "0 auto",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <h2
                  style={{
                    fontSize: "2.6rem",
                    color: "white",
                    fontFamily: "'Tiro Bangla', serif",
                    fontWeight: "800",
                    marginBottom: "16px",
                  }}
                >
                  আপনার একটি সহায়তা পাল্টে দিতে পারে একটি জীবন
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "1.05rem",
                    marginBottom: "36px",
                  }}
                >
                  bKash বা Nagad-এ মাত্র ১০০ টাকা দিয়ে শুরু করুন। প্রতিটি দান
                  সরাসরি সুবিধাভোগীর কাছে পৌঁছায়।
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn-primary"
                    onClick={() => setActivePage("donate")}
                    style={{ fontSize: "1.1rem", padding: "16px 40px" }}
                  >
                    💚 এখনই ডোনেট করুন
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => setActivePage("stories")}
                  >
                    সাফল্যের গল্প দেখুন
                  </button>
                </div>
              </div>
            </div>
    </div>
  )
}

export default DonateCTA