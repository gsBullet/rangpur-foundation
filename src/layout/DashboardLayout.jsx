// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "./backend/Sidebar";
import Topbar from "./backend/Topbar";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "../Dashbaord/pages/DashboardContext";

const DashboardLayout = () => {
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="font-bn flex min-h-screen bg-green-50/30">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
