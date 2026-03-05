import React, { useContext, useEffect, useRef, useState } from "react";
import { Frontendcontext } from "../../context/FrontendContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { activePage, setActivePage, statsRef, setStatsVisible } =
    useContext(Frontendcontext);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("bn");

  const [menuOpen, setMenuOpen] = useState(false);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrolled ? "rgba(20,83,45,0.97)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
    transition: "all 0.4s ease",
    padding: "0 24px",
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [activePage]);

  const NAV_LINKS = [
    { id: "/", label: "হোম" },
    { id: "/about", label: "আমাদের সম্পর্কে" },
    { id: "/programs", label: "কার্যক্রম" },
    { id: "/projects", label: "প্রকল্পসমূহ" },
    { id: "/success-stories", label: "সাফল্যের গল্প" },
    { id: "/donate", label: "ডোনেশন" },
    { id: "/blogs", label: "ব্লগ" },
    { id: "/contact", label: "যোগাযোগ" },
  ];

  return (
    <div>
      <nav style={navStyle}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={() => setActivePage("home")}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                boxShadow: "0 4px 12px rgba(22,163,74,0.4)",
              }}
            >
              🌱
            </div>
            <div>
              <div
                style={{
                  color: "white",
                  fontWeight: "800",
                  fontSize: "1.1rem",
                  lineHeight: 1.1,
                  fontFamily: "'Tiro Bangla', serif",
                }}
              >
                উৎকর্ষ ফাউন্ডেশন
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.65rem",
                  letterSpacing: "1px",
                }}
              >
                UTKARSHA FOUNDATION
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", gap: "4px", alignItems: "center" }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.id}
                to={l.id}
                className={`nav-link ${activePage === l.id  ? "active" : ""}`}
                onClick={() => {
                  setActivePage(l.id);
                  setMenuOpen(false);
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => setLang((l) => (l === "bn" ? "en" : "bn"))}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#4ade80",
                padding: "6px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontFamily: "'Hind Siliguri', sans-serif",
              }}
            >
              {lang === "bn" ? "EN" : "বাংলা"}
            </button>
            <button
              className="btn-primary"
              style={{ padding: "8px 20px", fontSize: "0.85rem" }}
              onClick={() => setActivePage("donate")}
            >
              ডোনেট করুন
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
