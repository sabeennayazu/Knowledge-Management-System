import React from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";

type SidebarLabel =
  | "Dashboard"
  | "Attendance"
  | "Tutor"
  | "Examination"
  | "Invoice"
  | "Complain Box";


export default function Examination() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const location = useLocation();

  // --- Mock API Data ---
  const examOverviewData = {
    upcomingExam: { date: "May 15", year: "2024" },
    totalClasses: 10,
    examStatus: "Scheduled",
    resultStatus: { published: 6, total: 10 },
    nextDeadline: { date: "May 12", label: "Result submission" },
  };

  const classWiseData = [
    { class: 1, date: "Apr 20, 2024", status: "Completed", published: true, avg: 78 },
    { class: 2, date: "Apr 21, 2024", status: "Completed", published: true, avg: 82 },
    { class: 3, date: "Apr 22, 2024", status: "Completed", published: true, avg: 75 },
    { class: 4, date: "Apr 23, 2024", status: "Completed", published: true, avg: 88 },
    { class: 5, date: "Apr 24, 2024", status: "Completed", published: true, avg: 81 },
    { class: 6, date: "Apr 25, 2024", status: "Completed", published: true, avg: 80 },
    { class: 7, date: "May 02, 2024", status: "Scheduled", published: false, avg: null },
    { class: 8, date: "May 05, 2024", status: "Scheduled", published: false, avg: null },
    { class: 9, date: "May 09, 2024", status: "Scheduled", published: false, avg: null },
    { class: 10, date: "May 12, 2024", status: "Scheduled", published: false, avg: null },
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
      className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200                           ${location.pathname === routeMap[item.label]
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
      

      {/* ----------- MAIN CONTENT ----------- */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

        {/* Exam Status */}
        <div className="grid grid-cols-3 gap-5 mb-7">
          <div className="bg-white border-2 border-[#ece8d9] shadow-sm rounded-2xl p-5">
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <Icon icon="mdi:progress-clock" /> Exam Status
            </p>
            <p className="text-xl font-semibold mt-3 text-[#3A7D7D]">
              {examOverviewData.examStatus}
            </p>
          </div>

          <div className="bg-white border-2 border-[#ece8d9] shadow-sm rounded-2xl p-5">
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <Icon icon="mdi:file-check" /> Result Status
            </p>
            <p className="text-xl font-semibold mt-3 text-[#3A7D7D]">Published</p>
            <p className="text-gray-600 text-sm">
              {examOverviewData.resultStatus.published} of {examOverviewData.resultStatus.total} classes
            </p>
          </div>

          <div className="bg-white border-2 border-[#ece8d9] shadow-sm rounded-2xl p-5">
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <Icon icon="mdi:calendar-alert" /> Next Deadline
            </p>
            <p className="text-3xl font-semibold mt-3">{examOverviewData.nextDeadline.date}</p>
            <p className="text-gray-600 text-sm">{examOverviewData.nextDeadline.label}</p>
          </div>
        </div>

        {/* ------- Class-wise Overview ------- */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Class-wise Examination Overview
          </h2>

          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#6fbf73] rounded-full"></span>Completed
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#f3c361] rounded-full"></span>Scheduled
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-5 gap-5 pb-20">
          {classWiseData.map((cls) => (
            <div key={cls.class} className="bg-white border-2 border-[#ece8d9] rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Class {cls.class}</h3>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold text-white 
                    ${cls.status === "Completed" ? "bg-[#6fbf73]" : "bg-[#f3c361]"}
                  `}
                >
                  {cls.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-3">Exam Date</p>
              <p className="text-gray-800 font-medium text-sm">{cls.date}</p>

              <p className="text-gray-600 text-sm mt-3">Result Status</p>
              <p className="text-gray-800 font-medium text-sm">
                {cls.published ? "Published" : "Pending"}
              </p>

              <p className="text-gray-600 text-sm mt-3">Class Average</p>
              <p className="text-gray-800 font-medium text-sm">
                {cls.avg !== null ? `${cls.avg}%` : "-"}
              </p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
