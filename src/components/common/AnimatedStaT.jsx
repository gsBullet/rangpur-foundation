import { useEffect, useState } from "react";

export default function AnimatedStat({ value, label, icon, animate }) {
  function useCountUp(end, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!start) return;
      const num = parseInt(end.replace(/[^\d]/g, ""));
      if (!num) return;
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * num));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [start]);
    return count;
  }
  const num = useCountUp(value, 1800, animate);
  const suffix = value.replace(/[\d]/g, "");
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "20px",
        padding: "32px 24px",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        transition: "transform 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-6px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{icon}</div>
      <div
        style={{
          fontSize: "2.8rem",
          fontWeight: "800",
          color: "#bbf7d0",
          fontFamily: "'Hind Siliguri', sans-serif",
          lineHeight: 1,
        }}
      >
        {num}
        {suffix}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.8)",
          marginTop: "8px",
          fontSize: "0.95rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}
