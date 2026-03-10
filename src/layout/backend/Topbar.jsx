import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  const [q, setQ] = useState("");
  return (
    <header className="bg-white border-b border-green-50 px-7 py-3.5 flex items-center gap-4 sticky top-0  z-10 shadow-sm">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
          🔍
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="খুঁজুন..."
          className="font-bn w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-green-100 rounded-xl text-sm text-gray-700 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />
      </div>
      <div className="flex-1" />

      {/* Notification */}
      <button className="relative notif-dot w-10 h-10 bg-gray-50 border border-green-100 rounded-xl flex items-center justify-center text-base hover:bg-green-50 transition-colors cursor-pointer">
        🔔
      </button>
      {/* Mail */}
      <button className="w-10 h-10 bg-gray-50 border border-green-100 rounded-xl flex items-center justify-center text-base hover:bg-green-50 transition-colors cursor-pointer">
        ✉️
      </button>
      {/* Home */}
      <Link
      to={"/"}
      className="w-10 h-10 bg-gray-50 border border-green-100 rounded-xl flex items-center justify-center text-base hover:bg-green-50 transition-colors cursor-pointer">
        🏠
      </Link>

      {/* Profile */}
      <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-2xl pl-2 pr-4 py-1.5 cursor-pointer hover:border-green-300 transition-all">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
          style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}
        >
          👤
        </div>
        <div>
          <p className="font-bn text-xs font-bold text-green-900 leading-tight">
            আরিফুল ইসলাম
          </p>
          <p className="font-bn text-xs text-green-500">অ্যাডমিন</p>
        </div>
        <span className="text-gray-400 text-xs ml-1">▾</span>
      </div>
    </header>
  );
};

export default Topbar;
