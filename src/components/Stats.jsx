import React, { useContext } from "react";
import { Frontendcontext } from "../context/FrontendContext";
import AnimatedStat from "./common/AnimatedStaT";

const Stats = () => {
  const { statsRef,statsVisible, } = useContext(Frontendcontext);
  const STATS = [
    { value: "৫০০০+", label: "শিশু শিক্ষিত", icon: "🎓" },
    { value: "১২০০+", label: "পরিবার উপকৃত", icon: "🏠" },
    { value: "৩৮টি", label: "সক্রিয় প্রকল্প", icon: "📋" },
    { value: "১৫ বছর", label: "অভিজ্ঞতা", icon: "⭐" },
  ];
  return (
    <div>
      <div
        ref={statsRef}
        style={{
          background: "linear-gradient(135deg, #166534, #16a34a)",
          padding: "60px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {STATS.map((s, i) => (
            <AnimatedStat key={i} {...s} animate={statsVisible} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
