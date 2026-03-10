import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  HeartHandshake,
  FolderKanban,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const [open, setOpen] = useState(null);
  const [hovered, setHovered] = useState(null);

  const NAV = [
    {
      label: "ওভারভিউ",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      label: "ডোনেশন",
      icon: HeartHandshake,
      children: [
        { label: "সকল ডোনেশন", path: "/dashboard/all-donations" },
        { label: "নতুন ডোনেশন", path: "/dashboard/add-donation" },
      ],
    },

    {
      label: "কার্যক্রম",
      icon: CalendarDays,
      children: [
        { label: "আমাদের কার্যক্রম", path: "/dashboard/our-activities" },
        { label: "আসন্ন ইভেন্ট", path: "/dashboard/upcoming-events" },
      ],
    },

    {
      label: "প্রকল্প",
      icon: FolderKanban,
      children: [
        { label: "সক্রিয় প্রকল্প", path: "/dashboard/our-projects" },
        { label: "আর্কাইভড প্রকল্প", path: "/dashboard/archived-projects" },
      ],
    },
    {
        label: "সাফল্যের গল্প",
        icon: HeartHandshake,
        children: [
          { label: "সকল গল্প", path: "/dashboard/success-stories" },
          { label: "নতুন গল্প", path: "/dashboard/add-success-story" },
        ],
    },
    {
      label: "ব্লগ",
      icon: CalendarDays,
      children: [
        { label: "সকল ব্লগ", path: "/dashboard/blogs" },
        { label: "নতুন ব্লগ", path: "/dashboard/add-blogs" },
      ],
    },
    {
      label: "স্বেচ্ছাসেবী",
      icon: Users,
      children: [
        { label: "সকল স্বেচ্ছাসেবী", path: "/dashboard/volunteers" },
        { label: "নতুন স্বেচ্ছাসেবী", path: "/dashboard/add-volunteer" },
      ],
    },

    {
      label: "রিপোর্ট",
      icon: BarChart3,
      path: "/dashboard/reports",
    },

    {
      label: "সেটিংস",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className="bg-white border-r shadow-sm h-screen flex flex-col transition-all duration-300 sticky top-0 z-20"
      style={{ width: collapsed ? 70 : 250 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b">
        <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-xl font-bold">
          U
        </div>

        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-green-900">উৎকর্ষ ফাউন্ডেশন</p>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => collapsed && setHovered(i)}
              onMouseLeave={() => collapsed && setHovered(null)}
            >
              {/* Main Item */}
              {item.children ? (
                collapsed ? (
                  <div className="flex justify-center py-3 hover:bg-green-50 rounded-lg cursor-pointer">
                    <Icon size={20} />
                  </div>
                ) : (
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-green-50"
                  >
                    <Icon size={18} />

                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        open === i ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                )
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  ${
                    isActive(item.path)
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-50 text-gray-600"
                  }
                  ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon size={18} />
                  {!collapsed && item.label}
                </Link>
              )}

              {/* Expanded submenu */}
              {!collapsed && open === i && item.children && (
                <div className="ml-7 mt-1 border-l pl-3 space-y-1">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className={`block text-sm px-3 py-2 rounded hover:bg-green-50
                      ${
                        isActive(sub.path)
                          ? "text-green-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Hover popup submenu */}
              {collapsed && hovered === i && item.children && (
                <div className="absolute left-16 top-0 bg-white shadow-xl border rounded-xl p-2 w-56 z-50">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block text-sm px-3 py-2 rounded hover:bg-green-50 text-gray-700"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2.5 py-3 border-t border-green-50">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bn text-xs text-gray-400 hover:bg-green-50 hover:text-green-700 transition-all cursor-pointer border-0 bg-transparent ${collapsed ? "justify-center" : ""}`}
        >
          <span
            className="text-base transition-transform duration-300"
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
              display: "block",
            }}
          >
            ◀
          </span>
          {!collapsed && <span>সংকুচিত করুন</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
