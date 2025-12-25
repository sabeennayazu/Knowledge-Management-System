import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";
import { ImTextColor } from "react-icons/im";

export default function ProgressReport() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  // ----------------------------
// Dummy API‑like Data
// ----------------------------
const summaryStats = [
{ label: "Total Schools", value: 3, icon: "lucide:school", color: "bg-blue-100", border: "border-blue-400",iconcolor: "text-blue-600" },
{ label: "Students Taught", value: 1500, icon: "mdi:account-group", color: "bg-green-100", border: "border-green-400",iconcolor: "text-green-600" },
{ label: "Weekly hours", value: 37, icon: "iconamoon:history-bold", color: "bg-amber-100", border: "border-amber-400",iconcolor: "text-amber-600" },
{ label: "Class Conducted", value: 6, icon: "mdi:google-classroom", color: "bg-purple-100", border: "border-purple-400",iconcolor: "text-purple-600" },
{ label: "Avg Performance", value: "87%", icon: "streamline-ultimate:performance-increase", color: "bg-cyan-100", border: "border-cyan-400",iconcolor: "text-cyan-600" },
];


const teacherActivity = [
{ title: "Chapter 2", subtitle: "Materials taught", icon: "mage:book-text-fill", color: "bg-blue-50",textcolor: "text-blue-600" },
{ title: "Chapter 2", subtitle: "Assignments Given", icon: "material-symbols-light:assignment-add-outline", color: "bg-green-50", textcolor: "text-green-600" },
{ title: 76, subtitle: "Assignments Checked", icon: "tdesign:task-checked", color: "bg-purple-50", textcolor: "text-purple-600" },
{ title: 234, subtitle: "Feedback Entries", icon: "entypo:chat", color: "bg-orange-50", textcolor: "text-orange-600" },
{ title: 45, subtitle: "Announcements", icon: "mingcute:announcement-fill", color: "bg-cyan-50", textcolor: "text-cyan-600" },
{ title: "4.7", subtitle: "Avg Rating", icon: "solar:star-bold", color: "bg-pink-50", textcolor: "text-pink-600" },
];


const notifications = [
{ type: "danger", text: "Low Attendance Alert — Oak Valley School Grade 8‑9", icon: "mdi:alert-circle" },
{ type: "warning", text: "Overdue Assignments — 13 assignments pending review", icon: "mdi:clock-alert" },
{ type: "info", text: "Chapter 2 behind Schedule in Grade 8 (Oak Valley School)", icon: "mdi:information" },
];


const schoolProgress = [
{
school: "GreenField High School",
status: "Active",
students: 187,
classes: 6,
avgScore: "92%",
attendance: "89%",
badge: "bg-blue-200",
},
{
school: "Sunrise Elementary",
status: "Active",
students: 187,
classes: 6,
avgScore: "92%",
attendance: "89%",
badge: "bg-blue-200",
},
{
school: "Oak Valley School",
status: "Needs Attention",
students: 187,
classes: 6,
avgScore: "72%",
attendance: "68%",
badge: "bg-orange-200",
},
];


const weeklyProgress = [
{ label: "Teaching Hours", value: 28, total: 30 },
{ label: "Assignments Reviewed", value: 18, total: 30 },
{ label: "Materials Taught", value: 2, total: 21 },
];


const achievements = [
{ icon: "mdi:trophy", title: "Top Performer", text: "Best attendance rate this month", color: "bg-yellow-100" },
{ icon: "mdi:account-group", title: "1500 Students milestone", text: "Congratulations", color: "bg-green-100" },
];

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} />,
      path: "/partner_dashboard",
    },
    {
      label: "Assigned Schools",
      icon: <Icon icon="teenyicons:school-outline" width={24} height={24} />,
      path: "/partner_dashboard/assigned_schools",
    },
    {
      label: "Attendance",
      icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} />,
      path: "/partner_dashboard/attendance",
    },
    {
      label: "Assignment Management",
      icon: <Icon icon="hugeicons:assignments" width={30} height={30} />,
      path: "/partner_dashboard/assignment_management",
    },
    {
      label: "Progress Report",
      icon: <Icon icon="heroicons:chart-bar" width={24} height={24} />,
      path: "/partner_dashboard/progress_report",
    },
    {
      label: "Leaderboard",
      icon: <Icon icon="mdi:trophy-outline" width={24} height={24} />,
      path: "/partner_dashboard/leaderboard",
    },
    {
      label: "Salary + Commission",
      icon: <Icon icon="carbon:money" width={24} height={24} />,
      path: "/partner_dashboard/salary_commission",
    },
    {
      label: "Component Reports",
      icon: <Icon icon="lucide:component" width={24} height={24} />,
      path: "/partner_dashboard/component_reports",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#3A7D7D] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>

        <nav className="flex-1 space-y-6 py-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
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

      {/* Main Content */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

  {/* Page Title */}
  <h1 className="text-3xl font-semibold mb-6 text-[#333]">My Progress</h1>

  {/* Summary Cards */}
 <div className="grid grid-cols-5 gap-4 mb-8">
  {summaryStats.map((item) => (
    <div
      key={item.label}
      className={`flex flex-col rounded-xl px-4 py-6 items-center justify-center gap-8 shadow-lg border ${item.color} border-gray-300 hover:shadow-2xl transition-shadow duration-200` }
    >
      <div className="flex gap-4 items-center text-center">
        <Icon 
          icon={item.icon}
          className={`text-2xl  ${item.iconcolor} `}
        />
        <p className={`text-md  ${item.iconcolor}`}>{item.label}</p>
      </div>

      <p className={`text-2xl font-bold text-gray-800 ${item.iconcolor}`}>{item.value}</p>
    </div>
  ))}
</div>

  {/* Teacher Activity + Notifications */}
  <div className="grid grid-cols-3 gap-6 mb-8">
    {/* Teacher Activity */}
    <div className="col-span-2 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl text-black font-semibold mb-4">Teacher Activity Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        {teacherActivity.map((item) => (
          <div
            key={item.subtitle}
            className={`p-4 flex flex-col text-center items-center rounded-xl shadow-sm border ${item.color}`}
          >
            <Icon 
              icon={item.icon} 
              className={`text-3xl mb-2 text-center ${item.textcolor}`}
            />            
            <p className={`font-semibold text-lg ${item.textcolor}`}>{item.title}</p>
            <p className={`text-sm text-gray-600 ${item.textcolor}`}>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Notifications */}
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl text-black font-semibold mb-4">Alert & Notifications</h2>
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.text}
            className={`p-3 rounded-lg flex items-start gap-3 bg-[#FAFAFA] border-l-4 ${
              n.type === "danger"
                ? "border-red-500"
                : n.type === "warning"
                ? "border-yellow-400"
                : "border-blue-400"
            }`}
          >
            <Icon icon={n.icon} className="text-xl mt-1" />
            <p className="text-sm text-gray-700">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* School-wise Progress */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-[#3A7D7D] mb-3">
      School-wise Progress
    </h2>

    <div className="grid grid-cols-3 gap-6">
      {schoolProgress.map((sch) => (
        <div
          key={sch.school}
          className="bg-white p-5 rounded-xl shadow border"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-black text-lg">{sch.school}</h3>
            <span
              className={`px-3 py-1 text-xs rounded-full ${sch.badge}`}
            >
              {sch.status}
            </span>
          </div>

          <p className="text-sm text-black">Students: {sch.students}</p>
          <p className="text-sm text-black">Classes: {sch.classes}</p>

          <p className="text-sm mt-1 font-semibold text-green-600">
            Avg Score: {sch.avgScore}
          </p>
          <p className="text-sm font-semibold text-blue-600">
            Attendance: {sch.attendance}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Weekly Progress & Achievements */}
  <div className="grid grid-cols-3 gap-6">
    {/* Weekly Progress */}
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-black mb-4">This Week's Progress</h2>

      <div className="space-y-4">
        {weeklyProgress.map((w) => (
          <div key={w.label}>
            <div className="flex justify-between text-sm text-black font-medium mb-1">
              <span>{w.label}</span>
              <span>
                {w.value}/{w.total}
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3A7D7D]"
                style={{ width: `${(w.value / w.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Achievements */}
    <div className="col-span-2 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl text-black font-semibold mb-4">Recent Achievements</h2>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((a) => (
          <div
            key={a.title}
            className={`p-4 rounded-xl border shadow-sm flex gap-3 items-start ${a.color}`}
          >
            <Icon icon={a.icon} className="text-3xl" />
            <div>
              <p className="font-semibold text-gray-800">{a.title}</p>
              <p className="text-xs text-gray-600">{a.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

</main>

    </div>
  );
}
