import React, { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

export default function AssignmentManagement() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} />,
    },
    {
      label: "Assigned Schools",
      icon: <Icon icon="teenyicons:school-outline" width={24} height={24} />,
    },
    {
      label: "Attendance",
      icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} />,
    },
    {
      label: "Assignment Management",
      icon: <Icon icon="hugeicons:assignments" width={30} height={30} />,
    },
    {
      label: "Progress Report",
      icon: <Icon icon="heroicons:chart-bar" width={24} height={24} />,
    },
    {
      label: "Leaderboard",
      icon: <Icon icon="mdi:trophy-outline" width={24} height={24} />,
    },
    {
      label: "Salary + Commission",
      icon: <Icon icon="carbon:money" width={24} height={24} />,
    },
    {
      label: "Component Reports",
      icon: <Icon icon="lucide:component" width={24} height={24} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>

        <nav className="flex-1 space-y-6 py-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const routeMap: Record<string, string> = {
              Dashboard: "/partner_dashboard",
              "Assigned Schools": "/partner_dashboard/assigned_schools",
              Attendance: "/partner_dashboard/attendance",
              "Assignment Management": "/partner_dashboard/assignment_management",
              "Progress Report": "/partner_dashboard/progress_report",
              Leaderboard: "/partner_dashboard/leaderboard",
              "Salary + Commission": "/partner_dashboard/salary_commission",
              "Component Reports": "/partner_dashboard/component_reports",
            };

            return (
              <Link
                key={item.label}
                to={routeMap[item.label] || "#"}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 
                  ${
                    item.label === "Assignment Management"
                      ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                      : "bg-transparent text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/"
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f3dada] text-[#dc2626]"
          onClick={() => localStorage.removeItem("authToken")}
        >
          <Icon icon="ri:logout-circle-line" className="text-lg" />
          Log Out
        </Link>
      </aside>

      {/* Top Search Bar */}
      <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10">
        <div className="flex justify-between items-center px-10 py-6">
          {/* Search */}
          <div className="relative w-[900px]">
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm text-gray-600 focus:outline-none"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-3 text-[#999] text-lg"
            />
          </div>

          {/* Right area */}
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Icon
                icon="ri:notification-3-fill"
                className="text-[#3A7D7D] text-3xl"
              />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 bg-[#3A7D7D] px-2 py-1 rounded-3xl"
              >
                <div className="w-9 h-9 rounded-full bg-[#3A7D7D] flex items-center justify-center">
                  <Icon icon="ix:user-profile-filled" className="text-white w-9 h-9" />
                </div>
                <Icon
                  icon="mdi:chevron-down"
                  className="text-white text-lg w-6 h-6"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-1 z-20">
                  <Link
                    to="/partner_dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — EMPTY */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

  {/* ======= PAGE TITLE ======= */}
  <h1 className="text-2xl font-semibold text-gray-700 mb-6">Assignment Management</h1>

  {/* ======= TOP CARDS ======= */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

    {/* Active Assignments */}
    <div className="p-5 bg-[#e9f3ff] border border-[#bcd8ff] rounded-xl shadow-md">
      <p className="text-sm text-gray-500">Active Assignments</p>
      <h2 className="text-3xl font-bold text-blue-600">2</h2>
    </div>

    {/* Total Submitted */}
    <div className="p-5 bg-[#e9fff0] border border-[#b6f7ce] rounded-xl shadow-md ">
      <p className="text-sm text-gray-500">Total Submitted</p>
      <h2 className="text-3xl font-bold text-green-600">158</h2>
      <p className="text-xs text-green-700 mt-1">Out of 250 students</p>
    </div>

    {/* Pending Review */}
    <div className="p-5 bg-[#fff8e6] border border-[#fde4b8] rounded-xl shadow-md">
      <p className="text-sm text-gray-500">Pending Review</p>
      <h2 className="text-3xl font-bold text-yellow-600">40</h2>
    </div>

    {/* Late Submission */}
    <div className="p-5 bg-[#ffeaea] border border-[#f5c2c2] rounded-xl shadow-md">
      <p className="text-sm text-gray-500">Late Submission</p>
      <h2 className="text-3xl font-bold text-red-600">158</h2>
    </div>

  </div>

  {/* ====== FILTER SECTION ====== */}
  <div className="flex flex-wrap text-black items-center justify-between gap-4 mb-6">
    <div className="flex items-center gap-4">
    <select className="px-3 py-2 rounded-lg bg-white border text-sm">
      <option>All Schools</option>
      <option value="">Samriddhi</option>
      <option value="">Samriddhi</option>
      <option value="">Samriddhi</option>
      <option value="">Samriddhi</option>
      <option value="">Samriddhi</option>
    </select>

    <select className="px-3 py-2 rounded-lg bg-white border text-sm">
      <option>All Grades</option>
        <option >Grade 1</option>
        <option >Grade 2</option>
        <option >Grade 3</option>
        <option >Grade 4</option>
        <option >Grade 5</option>
        <option >Grade 6</option>
        <option >Grade 7</option>
        <option >Grade 8</option>
        <option >Grade 9</option>
        <option >Grade 10</option>
    </select>
      </div>

    <button className="flex items-center gap-2 px-4 py-2 bg-[#3A7D7D] text-white rounded-full text-sm">
      <Icon icon="mdi:plus-circle" className="text-xl" />
      Create Assignment
    </button>
  </div>

  {/* ====== ASSIGNMENT CARD COMPONENT ====== */}
  {[1, 2, 3].map((item) => (
    <div key={item} className="bg-white rounded-xl p-5 shadow-sm border mb-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Basic of Electronics</h2>
          <p className="text-gray-500 text-sm">Sunrise Academy • Grade 10</p>
          <p className="text-gray-400 text-xs">2025-01-08</p>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item === 1 ? "bg-blue-100 text-blue-600" :
            item === 2 ? "bg-green-100 text-green-600" :
            "bg-red-100 text-red-600"
          }`}
        >
          {item === 1 ? "Active" : item === 2 ? "Completed" : "Closed"}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className="h-full bg-[#3A7D7D] rounded-full" style={{ width: "74%" }}></div>
      </div>

      {/* Submission Stats */}
      <p className="text-right text-xs text-gray-500 mt-1">74% Submitted</p>

      {/* STATS BOXES */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="p-4 bg-gray-100 border border-gray-300 text-center rounded-2xl">
          <p className="text-xl font-bold text-gray-700">65</p>
          <p className="text-gray-500 text-sm">Total</p>
        </div>

        <div className="p-4 bg-green-100 border border-green-300 text-center rounded-2xl">
          <p className="text-xl font-bold text-green-600">45</p>
          <p className="text-gray-500 text-sm">On Time</p>
        </div>

        <div className="p-4 bg-orange-100 text-center rounded-2xl border border-orange-200">
          <p className="text-xl font-bold text-orange-500">3</p>
          <p className="text-gray-500 text-sm">Late</p>
        </div>

        <div className="p-4 bg-blue-100 text-center rounded-2xl border border-blue-200">
          <p className="text-xl font-bold text-blue-500">17</p>
          <p className="text-gray-500 text-sm">Pending</p>
        </div>
      </div>

    </div>
  ))}



      </main>
    </div>
  );
}
