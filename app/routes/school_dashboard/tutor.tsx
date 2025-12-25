import React from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router";



export default function Tutor() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const location = useLocation();



// --- Mock API Data ---
const tutorData = {
name: "Mr. Subash Neupane",
tutorId: "TU-20697",
totalClasses: 10,
totalStudents: 300,
};


const summaryStats = [
{ label: "Classes Conducted", value: 7, color: "#d7e3f3" },
{ label: "Hours Taught", value: 19, color: "#e6f0ff", link: true },
{ label: "Class Missed", value: 3, color: "#f3dcdc" },
{ label: "Assignment Given", value: 7, color: "#f4e5e8" },
{ label: "Checked/ Pending", value: "100/200", color: "#f5f5cf" },
{ label: "Attendance Rate", value: "94.2%", color: "#e6f7df" },
{ label: "Avg Performance", value: "82.5%", color: "#e2e9ee" },
];


const alerts = {
needsAttention: "Low Attendance & behind schedule",
overdueAssignments: 13,
totals: { total: 3, checked: 100, pending: 200 },
};


const classMonitorData = [
{ grade: 1, students: 26, attendance: "92%", score: 85, chapters: 1, status: "On Track", color: "#6fbf73" },
{ grade: 2, students: 28, attendance: "92.8%", score: 82, chapters: 1, status: "On Track", color: "#6fbf73" },
{ grade: 3, students: 32, attendance: "96.5%", score: 85, chapters: 2, status: "On Track", color: "#6fbf73" },
{ grade: 4, students: 54, attendance: "92%", score: 85, chapters: 2, status: "Behind Schedule", color: "#f3c361" },
{ grade: 5, students: 49, attendance: "68%", score: 85, chapters: 3, status: "Needs Attention", color: "#e57373" },
{ grade: 6, students: 55, attendance: "85%", score: 85, chapters: 3, status: "On Track", color: "#6fbf73" },
{ grade: 7, students: 55, attendance: "92%", score: 85, chapters: 4, status: "On Track", color: "#6fbf73" },
{ grade: 8, students: 55, attendance: "92%", score: 85, chapters: 4, status: "On Track", color: "#6fbf73" },
{ grade: 9, students: 55, attendance: "92%", score: 85, chapters: 4, status: "On Track", color: "#6fbf73" },
];


   const sidebarItems = [
      { label: "Dashboard", icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} /> },
      { label: "Attendance", icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} /> },
      { label: "Tutor", icon: <Icon icon="fluent-emoji-high-contrast:teacher" width={24} height={24} /> },
      { label: "Examination", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
      { label: "Invoice", icon: <Icon icon="streamline-ultimate:cash-payment-bills-bold" width={24} height={24} /> },
      { label: "Complain Box", icon: <Icon icon="streamline-freehand:customer-action-complaint" width={24} height={24} /> },
    ];
  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar - Desktop */}
           <aside className="hidden md:flex w-[220px] flex-col bg-[#3A7D7D] fixed top-0 left-0 h-screen p-4">
             <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>
             <nav className="flex-1 space-y-4">
               {sidebarItems.map((item, index) => {
                 const routeMap: Record<string, string> = {
                   "Dashboard": "/school_dashboard",
                   "Attendance": "/school_dashboard/attendance",
                   "Tutor": "/school_dashboard/tutor",
                   "Examination": "/school_dashboard/examination",
                   "Invoice": "/school_dashboard/invoice",
                   "Complain Box": "/school_dashboard/complain_box",
                 };
                 return (
                   <Link
                     key={item.label}
                     to={routeMap[item.label] || "#"}
className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200                                ${location.pathname === routeMap[item.label]
                         ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                         : "bg-transparent text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"}`}
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
               onClick={() => {
                 localStorage.removeItem('authToken');
               }}
             >
               <Icon icon="ri:logout-circle-line" className="text-lg" />
               Log Out
             </Link>
           </aside>
     
           {/* Sidebar - Mobile */}
           {isMobileSidebarOpen && (
             <div 
               className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
               onClick={() => setIsMobileSidebarOpen(false)}
             ></div>
           )}
            {/* NAVBAR */}
                        <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10">
                          <div className="flex justify-between items-center px-10 py-6">
                            <div className="relative w-[900px]">
                              <input
                                type="search"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm text-gray-600"
                              />
                              <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-[#999999] text-lg" />
                            </div>
                  
                            <div className="flex items-center space-x-6">
                              <button className="relative">
                                <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-3xl" />
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
                              </button>
                  
                              <div className="relative">
                                <button
                                  className="flex items-center space-x-1 bg-[#3A7D7D] px-2 py-1 rounded-3xl"
                                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                  <div className="w-9 h-9 rounded-full bg-[#3A7D7D] flex items-center justify-center">
                                    <Icon icon="ix:user-profile-filled" className="text-white w-9 h-9" />
                                  </div>
                                  <Icon icon="mdi:chevron-down" className="text-white text-lg w-6 h-6" />
                                </button>
                  
                                {isDropdownOpen && (
                                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-1 z-20">
                                    <Link
                                      to="/"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onClick={() => {
                                        localStorage.removeItem("authToken");
                                        setIsDropdownOpen(false);
                                      }}
                                    >
                                      Sign out
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

      {/* Main Content */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">
     {/* Header Section */}
<div className="p-6 bg-white rounded-2xl shadow-sm border border-[#ece8d9] mb-8 flex items-center gap-6">
<div className="w-28 h-28 rounded-full bg-gray-200"></div>
<div>
<h1 className="text-2xl font-bold text-gray-800">{tutorData.name}</h1>
<div className="flex gap-8 mt-3 text-gray-600">
<p><span className="font-semibold">Tutor ID</span> {tutorData.tutorId}</p>
<p><span className="font-semibold">Total Classes</span> {tutorData.totalClasses} Classes</p>
<p><span className="font-semibold">Total Students</span> {tutorData.totalStudents} Students</p>
</div>
</div>
</div>




{/* Summary Stats Section */}
<div className="grid grid-cols-3 gap-6 mb-10">
{/* Left Summary Cards */}
<div className="col-span-2 grid grid-cols-3 gap-5 bg-white border border-[#ece8d9] p-6 rounded-2xl shadow-sm">
{summaryStats.map((item, idx) => (
<div
key={idx}
className="rounded-xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md"
style={{ backgroundColor: item.color }}
>
<p className="text-gray-700 text-sm mb-1">{item.label}</p>
<p className="text-3xl font-semibold text-gray-800">{item.value}</p>
</div>
))}
</div>


{/* Alerts */}
<div className="bg-white border border-[#ece8d9] p-6 rounded-2xl shadow-sm">
<h3 className="font-semibold text-gray-800 mb-4">Alert & Notifications</h3>


<div className="bg-[#fde4e4] p-4 rounded-xl mb-4 hover:shadow-md transition">
<p className="font-semibold text-red-600">Needs Attention</p>
<p className="text-gray-700 text-sm">{alerts.needsAttention}</p>
</div>


<div className="bg-[#fff4d6] p-4 rounded-xl mb-4 hover:shadow-md transition">
<p className="font-semibold text-yellow-700">Overdue Assignments</p>
<p className="text-gray-700 text-sm">{alerts.overdueAssignments} assignments pending review</p>
</div>


<div className="bg-[#e8f0ff] p-4 rounded-xl hover:shadow-md transition">
<p className="font-semibold text-blue-700">Total Assignments</p>
<p className="text-gray-700 text-sm">{alerts.totals.total}</p>
<p className="text-gray-700 text-sm">Checked: {alerts.totals.checked} | Pending: {alerts.totals.pending}</p>
</div>
</div>
</div>


{/* Class Monitoring */}
<h2 className="text-xl font-semibold text-gray-800 mb-4">Class- Wise Monitoring</h2>


<div className="grid grid-cols-3 gap-6 pb-20">
{classMonitorData.map((cls, idx) => (
<div
key={idx}
className="bg-white border border-[#ece8d9] p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
>
<div className="flex justify-between items-center">
<h3 className="text-lg font-semibold text-gray-800">Grade {cls.grade}</h3>
<span
className="px-3 py-1 rounded-full text-xs font-semibold text-white"
style={{ backgroundColor: cls.color }}
>
{cls.status}
</span>
</div>


<p className="text-gray-700 mt-3">{cls.students} Students</p>


<div className="mt-3 text-sm text-gray-700">
<p>Attendance: <span className="text-green-700 font-semibold">{cls.attendance}</span></p>
<p>Avg Score: {cls.score}</p>
<p>Chapters: {cls.chapters}</p>
</div>


<div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
<div
className="h-full rounded-full"
style={{ width: cls.attendance, backgroundColor: cls.color }}
></div>
</div>
</div>
))}
</div>
 </main>
    </div>
  );
}
