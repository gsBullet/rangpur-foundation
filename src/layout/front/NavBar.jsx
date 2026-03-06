import React, { useContext, useEffect, useState } from "react";
import { Frontendcontext } from "../../context/FrontendContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { activePage, setActivePage, statsRef, setStatsVisible } =
    useContext(Frontendcontext);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("bn");
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

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
  }, [activePage, setStatsVisible, statsRef]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

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

  const handleLinkClick = (id) => {
    setActivePage(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-green-950 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
          {/* Links Container */}
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.id}
                to={l.id}
                onClick={() => handleLinkClick(l.id)}
                className={`block py-3 px-4 text-lg font-medium border-b border-white/10 transition-colors ${
                  activePage === l.id
                    ? "text-green-400 bg-white/5"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="border-b border-white/10">
              <button
                onClick={() => setActionsOpen(!actionsOpen)}
                className="w-full text-left py-3 px-4 text-lg font-medium text-white flex justify-between items-center"
              >
                Actions
                <span>{actionsOpen ? "▲" : "▼"}</span>
              </button>

              {actionsOpen && (
                <div className="flex flex-col bg-green-900/40">
                  <Link
                    to="/dashboard"
                    onClick={() => handleLinkClick("/dashboard")}
                    className="py-3 px-6 text-white/80 hover:text-white border-b border-white/10"
                  >
                    ড্যাশবোর্ড
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => handleLinkClick("/register")}
                    className="py-3 px-6 text-white/80 hover:text-white border-b border-white/10"
                  >
                    রেজিস্টার
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => handleLinkClick("/login")}
                    className="py-3 px-6 text-white/80 hover:text-white"
                  >
                    লগইন
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
            <button
              onClick={() => setLang((l) => (l === "bn" ? "en" : "bn"))}
              className="w-full py-3 rounded-lg border border-white/20 text-white text-center hover:bg-white/10 transition"
            >
              {lang === "bn" ? "Switch to English" : "বাংলা করুন"}
            </button>
            <button
              onClick={() => handleLinkClick("/donate")}
              className="w-full py-3 rounded-full bg-green-600 text-white font-bold text-center hover:bg-green-500 transition shadow-lg shadow-green-900/50"
            >
              ডোনেট করুন
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-green-900/95 backdrop-blur-xl shadow-2xl"
            : "bg-green-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleLinkClick("/")}
            >
              <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-800/40 text-xl">
                🌱
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-sm md:text-lg leading-tight font-[Tiro_Bangla]">
                  উৎকর্ষ ফাউন্ডেশন
                </span>
                <span className="hidden sm:block text-white/60 text-[0.6rem] tracking-wider uppercase">
                  Utkarsha Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.id}
                  to={l.id}
                  onClick={() => handleLinkClick(l.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white ${
                    activePage === l.id
                      ? "text-white bg-green-500"
                      : "hover:text-white hover:bg-white/20 "
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <ul className="relative inline-block group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-white  hover:bg-green-500 ">
                  ACTIONS
                </button>

                <div className="absolute left-0 top-full w-40 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    onClick={() => handleLinkClick("/dashboard")}
                    className="block px-3 py-2 text-white hover:bg-gray-700"
                  >
                    ড্যাশবোর্ড
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => handleLinkClick("/register")}
                    className="block px-3 py-2 text-white hover:bg-gray-700"
                  >
                    রেজিস্টার
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => handleLinkClick("/login")}
                    className="block px-3 py-2 text-white hover:bg-gray-700"
                  >
                    লগইন
                  </Link>
                </div>
              </ul>
              <button
                onClick={() => setLang((l) => (l === "bn" ? "en" : "bn"))}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-green-400 border border-white/30 bg-white/10 hover:bg-white/20 transition"
              >
                {lang === "bn" ? "EN" : "বাংলা"}
              </button>
              <Link
                to={"/donate"}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-green-600 hover:bg-green-500 transition shadow-md"
              >
                ডোনেট করুন
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-transform duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-transform duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
