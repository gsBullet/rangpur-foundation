import { createContext, useEffect, useRef, useState } from "react";

export const Frontendcontext = createContext();

const FrontendProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("home");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const value = {
    activePage,
    setActivePage,
    statsRef,
    statsVisible,
    setStatsVisible,
  };

  

  

  return (
    <Frontendcontext.Provider value={value}>
      {children}
    </Frontendcontext.Provider>
  );
};

export default FrontendProvider;
