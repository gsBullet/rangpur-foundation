import React, { useContext } from "react";
import { Frontendcontext } from "../context/FrontendContext";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import QuickProgram from "../components/QuickProgram";
import DonateCTA from "../components/DonateCTA";
import SuccessStoriesPreview from "../components/SuccessStoriesPreview";

const Home = () => {
  const { activePage, setActivePage } = useContext(Frontendcontext);
  return (
    <div>
      {/* PAGES */}
      <div style={{ paddingTop: activePage === "home" ? 0 : "80px" }}>
        {/* ========== HOME PAGE ========== */}

        <div>
          {/* HERO */}
          <Hero />

          {/* STATS */}
          <Stats />

          {/* QUICK PROGRAMS */}
          <QuickProgram />

          {/* DONATE CTA */}
          <DonateCTA />

          {/* SUCCESS STORIES PREVIEW */}
          <SuccessStoriesPreview />
        </div>
      </div>
    </div>
  );
};

export default Home;
