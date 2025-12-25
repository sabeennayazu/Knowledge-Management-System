import React, { useState } from "react";

import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProfileManagement() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const location = useLocation();
  // FAKE API PROFILE DATA
const profileData = {
  tid: "TID-12345",
  fullName: "Anjali Sharma",
  email: "anjali.sharma@email.com",
  phone: "+977 98*******",
  dob: "January 15, 1995",
  address: "123 Tutor Lane, Knowledge City, Kathmandu, Nepal",
  avatar: "/path/avatar.png",
  verified: true,
};

// TABS
const tabs = [
  { key: "personal", label: "Personal Info", icon: "mdi:user" },
  { key: "education", label: "Educational Details", icon: "mdi:school" },
  { key: "finance", label: "Financial Overview", icon: "mdi:finance" },
  { key: "assessments", label: "Assessments", icon: "mdi:clipboard-text" },
];

// EDUCATIONAL DATA
const educationData = {
  highestDegree: "Master of Education",
  university: "Tribhuvan University",
  graduationYear: 2020,
  major: "Curriculum & Instruction",
};



// ASSESSMENTS DATA
const assessments = [
  { title: "Teaching Aptitude Test", score: 92, date: "Aug 2024" },
  { title: "Subject Knowledge Test", score: 88, date: "July 2024" },
];

// FINANCIAL CHART DATA
const financialData = [
  { month: "Jan", earnings: 500 },
  { month: "Feb", earnings: 750 },
  { month: "Mar", earnings: 650 },
  { month: "Apr", earnings: 900 },
  { month: "May", earnings: 1200 },
  { month: "Jun", earnings: 1500 },
];


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
          const location = useLocation();

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
                    item.label === "Profile"
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
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-20 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

  {/* PAGE TITLE */}
  <h1 className="text-3xl font-bold text-[#2f514f]">Profile</h1>
  <p className="text-gray-600 mb-6">Manage your personal, educational, and financial information</p>

  {/* PROFILE HEADER CARD */}
  <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center border border-[#e0e0d9] mb-8">
    <div>
      <p className="text-sm text-gray-400">{profileData.tid}</p>
      <h2 className="text-2xl font-bold text-[#365958]">{profileData.fullName}</h2>
      <p className="text-gray-600">{profileData.email} </p>
      <p className="text-gray-600"> {profileData.phone}</p>

      <div className="flex gap-3 mt-4">
        {profileData.verified && (
          <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
            <Icon icon="mdi:check-circle" /> Verified
          </span>
        )}

        
      </div>
    </div>

    <div className="w-28 h-28 rounded-full bg-[#f8d5c3] flex items-center justify-center shadow">
      <Icon icon="mdi:account" className="text-6xl text-[#365958]" />
    </div>
  </div>

  {/* TABS */}
  <div className="flex gap-20 border-b  border-gray-300 mb-8">
    {tabs.map((t) => (
      <button
        key={t.key}
        onClick={() => setActiveTab(t.key)}
        className={`pb-3 flex items-center gap-2 text-sm font-medium transition-all
        ${activeTab === t.key 
          ? "text-[#3A7D7D] border-b-2 border-[#3A7D7D]" 
          : "text-gray-500 hover:text-[#3A7D7D]"
        }`}
      >
        <Icon icon={t.icon} /> {t.label}
      </button>
    ))}
  </div>

  {/* TAB CONTENT */}
  {activeTab === "personal" && (
    <div className="bg-white shadow-md p-6 rounded-xl mb-8">
      <h3 className="text-xl font-semibold text-[#365958] mb-4">Personal Information</h3>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-500">Full Name</p>
          <p className="font-semibold">{profileData.fullName}</p>
        </div>

        <div>
          <p className="text-gray-500">Email Address</p>
          <p className="font-semibold">{profileData.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone Number</p>
          <p className="font-semibold">{profileData.phone}</p>
        </div>

        <div>
          <p className="text-gray-500">Date of Birth</p>
          <p className="font-semibold">{profileData.dob}</p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500">Address</p>
          <p className="font-semibold">{profileData.address}</p>
        </div>
      </div>

      <button className="mt-6 px-5 py-2 border rounded-full text-[#3A7D7D] border-[#3A7D7D] hover:bg-[#3A7D7D] hover:text-white transition">
        Edit Personal Info
      </button>
    </div>
  )}

  {activeTab === "education" && (
    <div className="bg-white shadow-md p-6 rounded-xl mb-8">
      <h3 className="text-xl font-semibold text-[#365958] mb-4">Educational Details</h3>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-500">Highest Degree</p>
          <p className="font-semibold">{educationData.highestDegree}</p>
        </div>

        <div>
          <p className="text-gray-500">Major</p>
          <p className="font-semibold">{educationData.major}</p>
        </div>

        <div>
          <p className="text-gray-500">University</p>
          <p className="font-semibold">{educationData.university}</p>
        </div>

        <div>
          <p className="text-gray-500">Graduation Year</p>
          <p className="font-semibold">{educationData.graduationYear}</p>
        </div>
      </div>
    </div>
  )}

  {activeTab === "finance" && (
    <div className="bg-white shadow-md p-6 rounded-xl mb-8">
      <h3 className="text-xl font-semibold text-[#365958] mb-4">Financial Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={financialData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" stroke="#3A7D7D" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}

 

  {activeTab === "assessments" && (
    <div className="bg-white shadow-md p-6 rounded-xl mb-8">
      <h3 className="text-xl font-semibold text-[#365958] mb-4">Assessments</h3>

      {assessments.map((a, i) => (
        <div key={i} className="border-b pb-4 mb-4">
          <p className="font-semibold">{a.title}</p>
          <p className="text-gray-500 text-sm">Score: {a.score}/100</p>
          <p className="text-gray-400 text-xs">({a.date})</p>
        </div>
      ))}
    </div>
  )}

</main>

    </div>
  );
}
