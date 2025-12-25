import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Icon } from "@iconify/react";

interface TaskRecord {
  task: string;
  tutor: string;
  assignedDate: string;
  dueDate: string;
  progress: number;
  status: {
    submitted: boolean;
    pending: boolean;
  };
}

export default function StudentDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const student = {
    name: "John Doe",
    attendance: 75,
  };

  const [taskRecords, setTaskRecords] = useState<TaskRecord[]>([
    {
      task: "Complete Quiz 5",
      tutor: "Mr. John",
      assignedDate: "Nov 2",
      dueDate: "Nov 8",
      progress: 65,
      status: { submitted: true, pending: true },
    },
    {
      task: "Complete Quiz 5",
      tutor: "Mr. John",
      assignedDate: "Nov 2",
      dueDate: "Nov 8",
      progress: 65,
      status: { submitted: true, pending: true },
    },
    {
      task: "Complete Quiz 5",
      tutor: "Mr. John",
      assignedDate: "Nov 2",
      dueDate: "Nov 8",
      progress: 65,
      status: { submitted: true, pending: true },
    },
  ]);

  const sidebarItems = [
    { label: "Dashboard", icon: <Icon icon="iconamoon:home-duotone" width={24} /> },
    { label: "Attendance", icon: <Icon icon="mingcute:calendar-2-line" width={24} /> },
    { label: "Learning Material", icon: <Icon icon="fluent:learning-app-24-regular" width={24} /> },
    { label: "Task", icon: <Icon icon="hugeicons:task-02" width={24} /> },
    {
      label: "Examination",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    { label: "Progress", icon: <Icon icon="streamline-plump:graph-bar-increase-solid" width={24} /> },
    { label: "Complain Box", icon: <Icon icon="streamline-freehand:customer-action-complaint" width={24} /> },
  ];

  const routeMap: Record<string, string> = {
    Dashboard: "/student_dashboard",
    Attendance: "/student_dashboard/attendance",
    "Learning Material": "/student_dashboard/learning_material",
    Task: "/student_dashboard/task",
    Examination: "/student_dashboard/examination",
    Progress: "/student_dashboard/progress",
    "Complain Box": "/student_dashboard/complain_box",
  };

  return (
    <div className="flex bg-[#fdfbf0]">
      {/* ============================================================
                        SIDEBAR
      ============================================================ */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-4 text-white">LOGO</div>

        <nav className="flex-1 space-y-6 overflow-y-auto py-4">
          {sidebarItems.map((item) => {
            const isActive =
              item.label === "Dashboard"
                ? location.pathname === "/student_dashboard"
                : location.pathname.startsWith(routeMap[item.label]);

            return (
              <button
                key={item.label}
                onClick={() => navigate(routeMap[item.label])}
                className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                    : "bg-transparent text-white/90 hover:bg-white cursor-pointer hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
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

      {/* ============================================================
                        NAVBAR
      ============================================================ */}
      <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10">
        <div className="flex justify-between items-center px-10 py-6">
          {/* Search Bar */}
          <div className="relative w-[900px]">
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm text-gray-600 focus:outline-none"
            />
            <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-[#999] text-lg" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-3xl" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
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

      {/* ============================================================
                        MAIN CONTENT (scrollable)
      ============================================================ */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

        {/* ALL YOUR ORIGINAL CONTENT BELOW THIS POINT */}
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          {/* Attendance */}
          <div className="bg-white rounded-xl p-6 border border-black flex flex-col items-start">
            <p className="text-sm text-black font-medium mb-3">Attendance Rate</p>

            <div className="flex justify-center items-center w-full">
              <div className="w-26 h-26">
                <CircularProgressbar
                  value={student.attendance}
                  text={`${student.attendance}%`}
                  strokeWidth={10}
                  styles={buildStyles({
                    pathColor: "#3A7D7D",
                    textColor: "#000",
                    trailColor: "#e6e6e6",
                    textSize: "16px",
                  })}
                />
              </div>
            </div>
          </div>

          {/* Task Added */}
          <div className="bg-white rounded-xl p-6 border border-black">
            <p className="text-sm text-black font-medium mb-3">Task Added</p>
            <div className="flex items-center space-x-3">
              <Icon icon="fluent:clipboard-task-add-24-filled" className="text-blue-600 text-4xl" />
              <div>
                <p className="text-3xl font-bold text-gray-800">3</p>
                <p className="text-xs text-black mt-2">Total task - 5</p>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-6 border border-black">
            <p className="text-sm text-black font-medium mb-3">Overall progress</p>
            <div className="flex items-center">
              <svg viewBox="0 0 36 36" className="w-30 h-30">
                <circle cx="18" cy="18" r="15.9" fill="#22c55e" />
                <path d="M18 18 L18 2 A16 16 0 0 1 34 18 Z" fill="#fff" />
              </svg>
              <span className="text-3xl font-bold text-gray-800 ml-4">75%</span>
            </div>
          </div>

          {/* New Materials */}
          <div className="bg-white rounded-xl p-6 border border-black flex flex-col justify-between">
            <div>
              <p className="text-2xl text-black">New materials</p>
              <p className="text-2xl text-black">added this week</p>
            </div>
            <p className="text-3xl font-bold text-gray-800 text-center">3</p>
          </div>
        </div>

        {/* Learning Materials & Exam Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* Learning Materials */}
          <div className="bg-[#fefce8] rounded-2xl p-6 border-2 border-black">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Learning Materials
            </h2>
            <div className="grid grid-cols-2 gap-4">

              {/* Video */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon="mingcute:video-fill" className="w-12 h-12 text-[#3A7D7D]" />
                  <div>
                    <div className="font-semibold text-gray-800">Video</div>
                    <div className="text-xs text-gray-500">Lessons</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3A7D7D] h-2 w-2/5 rounded-full"></div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon="streamline-freehand:notes-book-1" className="w-12 h-12 text-[#3A7D7D]" />
                  <div>
                    <div className="font-semibold text-gray-800">Notes</div>
                    <div className="text-xs text-gray-500">1 lesson</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3A7D7D] h-2 w-3/5 rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

          {/* Exam Section */}
          <div className="bg-[#fefce8] rounded-2xl p-6 border-2 border-black">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Exam Section
            </h2>
            <div className="grid grid-cols-2 gap-4">

              {/* Previous Exam */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                <div className="text-sm font-semibold mb-3 text-gray-800">Previous Exam</div>
                <div>
                  <div className="font-medium text-gray-700">Robotics</div>
                  <div className="text-xs text-gray-500">November 1</div>
                </div>
              </div>

              {/* Upcoming Exam */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                <div className="text-sm font-semibold mb-3 text-gray-800">Upcoming Exam</div>
                <div>
                  <div className="font-medium text-gray-700">IoT</div>
                  <div className="text-xs text-gray-500">November 16</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Task Section */}
        <div className="bg-[#fefce8] rounded-2xl p-6 border-2 border-black mb-10">
          <h2 className="text-lg font-bold mb-6 text-gray-800">Task</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-3 text-left font-semibold text-gray-700">Task</th>
                <th className="py-3 text-left font-semibold text-gray-700">Tutor</th>
                <th className="py-3 text-center font-semibold text-gray-700">Assigned Date</th>
                <th className="py-3 text-center font-semibold text-gray-700">Due Date</th>
                <th className="py-3 text-center font-semibold text-gray-700">Progress</th>
                <th className="py-3 text-center font-semibold text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody>
              {taskRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">{record.task}</td>
                  <td className="py-3 text-gray-600">{record.tutor}</td>
                  <td className="py-3 text-center text-gray-600">{record.assignedDate}</td>
                  <td className="py-3 text-center text-gray-600">{record.dueDate}</td>
                  <td className="py-3 text-center">
                    <div className="flex justify-center">
                      <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#3A7D7D] h-2 rounded-full"
                          style={{ width: `${record.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <span className="px-3 py-1 text-xs font-medium rounded-md bg-[#438582] text-white">
                        Submitted
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-md bg-[#43858299] text-white">
                        Pending
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  );
}
