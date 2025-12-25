import React, { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

export default function AssignedSchools() {
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
  const stats = [
  {
    id: 1,
    
    value: 3,
    title: "Total Schools",
    icon: "lucide:school",
    color: "text-purple-600",
    color1: "purple",
  },
  {
    id: 2,
    title: "Total Students",
    value: 1500,
    icon: "hugeicons:students",
    color: "text-green-600",
    color1: "green",
  },
  {
    id: 3,
    title: "Weekly hours",
    value: "37 ",
    icon: "mdi:clock-time-four-outline",
    color: "text-indigo-500",
    color1: "indigo",
  },
  {
    id: 4,
    title: "Pending Tasks",
    value: 6,
    icon: "material-symbols:assignment-late-outline",
    color: "text-red-500",
    color1: "red",
  },
];

const schoolData = [
  {
    name: "Starlight Academy",
    address: "123 Education St, Downtown",
    principal: "Dr. Sarah Johnson",
    grades: "Grade 1-10",
    scheduleDays: "Mon, Wed, Fri",
    weeklyHours: "15 hrs/week",
    students: 500,
    classes: 10,
    attendance: "92%",
    avgScore: "78%",
    pending: 2,
  },
  {
    name: "Greenwood Academy",
    address: "456 Learning Ave, Westside",
    principal: "Mr. James Miller",
    grades: "Grade 1-10",
    scheduleDays: "Sun, Tue, Thu",
    weeklyHours: "16 hrs/week",
    students: 600,
    classes: 10,
    attendance: "88%",
    avgScore: "82%",
    pending: 3,
  },
  {
    name: "Lincoln Elementary",
    address: "789 School Rd, Eastside",
    principal: "Ms. Emily Davis",
    grades: "Grade 1-10",
    scheduleDays: "Mon, Tue, Wed",
    weeklyHours: "16 hrs/week",
    students: 400,
    classes: 10,
    attendance: "88%",
    avgScore: "82%",
    pending: 3,
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
                    item.label === "Assigned Schools"
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

      {/* Main Content (EMPTY as requested) */}
    <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

  {/* ===== PAGE TITLE ===== */}
  <div>
    <h1 className="text-2xl font-bold text-gray-800">My Assigned Schools</h1>
    <p className="text-sm text-gray-600 mt-1">Managing 3 schools • 1500 total students</p>
  </div>

  {/* ===== STATS CARDS ===== */}
  <div className="grid grid-cols-4 gap-6 mt-8">
    {stats.map((s) => {
      const colorMap: Record<string, { border: string; bg: string }> = {
        purple: { border: "border-purple-300", bg: "bg-purple-50" },
        green: { border: "border-green-300", bg: "bg-green-50" },
        indigo: { border: "border-indigo-300", bg: "bg-indigo-50" },
        red: { border: "border-red-300", bg: "bg-red-50" },
      };
      const colors = colorMap[s.color1] || { border: "border-gray-300", bg: "bg-gray-50" };
      
      return (
        <div
          key={s.id}
          className={`rounded-xl p-6 shadow-lg text-center items-center border ${colors.border} ${colors.bg}`}
        >
          <div className="flex items-center gap-3 text-center justify-center">
            <Icon icon={s.icon} className={`text-3xl ${s.color}`} />
            <p className={`text-gray-600 font-medium text-center ${s.color}`}>{s.title}</p>
          </div>
          <p className={`text-4xl text-center font-bold mt-3 ${s.color}`}>{s.value}</p>
        </div>
      );
    })}
  </div>

  {/* ===== SCHOOL TABLE ===== */}
  <div className="mt-10 bg-white rounded-xl border border-gray-300 overflow-hidden shadow-sm">

    {/* Table Header */}
    <div className="grid grid-cols-8 bg-[#d7eddc] px-6 py-4 font-semibold  text-gray-700 text-sm">
      <p>School Details</p>
      <p>Grades</p>
      <p>Schedule</p>
      <p>Students</p>
      <p>Classes</p>
      <p>Attendance</p>
      <p>Avg Score</p>
      <p>Pending Tasks</p>
    </div>

    {/* Table Rows */}
    {schoolData.map((school, idx) => (
      <div
        key={idx}
        className="grid grid-cols-8 px-6 py-6 border-t border-[#f0eee4] text-sm items-center "
      >
        {/* School */}
        <div>
          <p className="font-semibold text-gray-800 pl-6 ">{school.name}</p>
          <div className="flex justify-between gap-2 ">

            <Icon icon="mynaui:location" className="text-red-500 w-6 h-6" />
          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1 ">
            {school.address}
          </p>
          </div>
          <p className="text-xs text-gray-600 pl-6">{school.principal}</p>
        </div>

        {/* Grades */}
        <p className="text-gray-700 text-center">{school.grades}</p>

        {/* Schedule */}
        <div className="text-center">
          <p className="font-semibold">{school.scheduleDays}</p>
          <p className="text-xs text-gray-600">{school.weeklyHours}</p>
        </div>

        {/* Students */}
        <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full w-fit">
          <Icon icon="hugeicons:students" className="text-blue-500 w-6 h-6" />
          <span className="font-semibold text-blue-500">{school.students}</span>
        </div>

        {/* Classes */}
        <div className="flex items-center gap-1 bg-purple-100 px-3 py-1 rounded-full w-fit">
          <Icon icon="mage:book" className="text-purple-500 w-6 h-6" />
          <span className="font-semibold text-purple-500">{school.classes}</span>
        </div>

        {/* Attendance */}
        <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full w-fit">
          <Icon icon="mdi:trending-up" className="text-green-600 w-6 h-6" />
          <span className="font-semibold text-green-500">{school.attendance}</span>
        </div>

        {/* Avg Score */}
        <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full w-fit">
          <Icon icon="mdi:chart-line" className="text-orange-400" />
          <span className="font-semibold text-orange-500">{school.avgScore}</span>
        </div>

        {/* Pending Tasks */}
        <div className="flex items-center gap-1 bg-red-100 px-3 py-1 rounded-full w-fit">
          <Icon icon="material-symbols:assignment-late-outline" className="text-red-500" />
          <span className="font-semibold text-red-500">{school.pending}</span>
        </div>
      </div>
    ))}
  </div>

</main>


    </div>
  );
}
