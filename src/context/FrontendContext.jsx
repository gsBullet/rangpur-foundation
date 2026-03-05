import { createContext, useRef, useState } from "react";

export const Frontendcontext = createContext();

const FrontendProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("home");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

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
