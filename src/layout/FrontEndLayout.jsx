import React from "react";
import NavBar from "./front/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./front/Footer";

const FrontEndLayout = () => {
  return (
    <div className="frontendLayout">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default FrontEndLayout;
