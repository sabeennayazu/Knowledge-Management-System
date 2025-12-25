import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Outlet, useLocation, useNavigate } from "react-router";

// =======================
// MOCK API (Task Data)
// =======================
const taskData = {
  title: "Chapter 1: Basic of Electronics",
  subtitle:
    "Analyze the concept of Resistor, Capacitor, Inductors, Diodes,Transistors",
  dueDate: "November 25, 2025",
  dueTime: "11:59 PM",
  timeRemaining: "2 Days, 48 hours",
  points: "100 points, 20% of grade",

  taskDescription:
    "Write a notes on concept of Resistor, Capacitor, Inductors, Diodes nad transistors include examples and also solve some problems related to it and write down each steps with figure write down the notes",

  learningObjectives: [
    "Demonstrate understanding of Shakespeare’s literary techniques",
    "Analyze connections between classical and modern literature",
    "Apply research and citation skills",
    "Develop critical thinking and analytical writing abilities",
  ],

  requirements: [
    {
      title: "Length: 1500–2000 words",
      desc: "Notes outside this range will lose points",
    },
    {
      title: "Format: A4 size paper and handwritten",
      desc: "Include proper headers and image page",
    },
    {
      title: "File Type: PDF or DOCX",
      desc: "Name your file: YourName_USN.pdf",
    },
  ],

  resources: [
    {
      title: "Recommended Reading List",
      desc: "Read about Resistor, Capacitor, Inductors, Diodes,Transistors",
      icon: "noto:books",
    },
    {
      title: "Lecture: Videos on that topic",
      desc: "Video lecture on these topic (20 min)",
      icon: "noto:movie-camera",
    },
    {
      title: "Note Template",
      desc: "Download a formatted template for your notes",
      icon: "streamline-ultimate-color:notes-book",
    },
  ],

  progress: {
    completion: 20,
    checklist: [
      { text: "Read the materials", checked: true },
      { text: "Research about the topic", checked: false },
      { text: "Write down the notes", checked: false },
      { text: "Work on the numericals", checked: false },
    ],
  },

  upcomingTasks: [
    {
      title: "Numerical on topic Capacitors",
      due: "Due Dec 2",
    },
    {
      title: "Numerical on topic Resistors",
      due: "Due Dec 2",
    },
  ],
};

// =======================
// Sidebar Items
// =======================

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} />,
  },
  {
    label: "Attendance",
    icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} />,
  },
  {
    label: "Learning Material",
    icon: <Icon icon="fluent:learning-app-24-regular" width={24} height={24} />,
  },
  {
    label: "Task",
    icon: <Icon icon="hugeicons:task-02" width={24} height={24} />,
  },
  {
    label: "Examination",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    label: "Progress",
    icon: (
      <Icon
        icon="streamline-plump:graph-bar-increase-solid"
        width={24}
        height={24}
      />
    ),
  },
  {
    label: "Complain Box",
    icon: (
      <Icon
        icon="streamline-freehand:customer-action-complaint"
        width={24}
        height={24}
      />
    ),
  },
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

// ======================================================
//                    MAIN PAGE
// ======================================================

export default function StudentTaskPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   return (
    <div className="flex bg-[#fdfbf0]">

      {/* ===================== FIXED SIDEBAR ===================== */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-4 text-white">
          LOGO
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto py-4">
          {sidebarItems.map((item) => {
          const isActive =
  item.label === "Dashboard"
    ? location.pathname === "/"
    : location.pathname.startsWith(routeMap[item.label]);


            return (
              <button
                key={item.label}
                onClick={() => navigate(routeMap[item.label])}
                className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm ${
                  isActive
                    ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                    : "bg-transparent text-white/90 hover:bg-white cursor-pointer hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f3dada] text-[#dc2626]"
          onClick={() => localStorage.removeItem("authToken")}
        >
          <Icon icon="ri:logout-circle-line" className="text-lg" />
          Log Out
        </button>
      </aside>

      {/* ===================== MAIN WRAPPER ===================== */}
     <main className="pt-[120px] fixed  top-0 left-60 px-10 pb-10 overflow-y-auto h-screen bg-[#fdfbf0]">

        {/* ===================== FIXED NAVBAR ===================== */}
        <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10 ">
          <div className="flex justify-between items-center px-10 py-6">

            {/* Search Bar */}
            <div className="relative w-[900px]">
              <input
                type="search"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm focus:outline-none text-gray-600"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-3 text-[#999999] text-lg"
              />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <button className="relative">
                <Icon
                  icon="ri:notification-3-fill"
                  className="text-[#3A7D7D] text-3xl"
                />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
              </button>

              <div className="relative">
                <button
                  className="flex items-center space-x-1 bg-[#3A7D7D] px-2 py-1 rounded-3xl"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-9 h-9 rounded-full bg-[#3A7D7D] flex items-center justify-center">
                    <Icon
                      icon="ix:user-profile-filled"
                      className="text-white w-9 h-9"
                    />
                  </div>
                  <Icon
                    icon="mdi:chevron-down"
                    className="text-white text-lg w-6 h-6"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-1 z-20">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        localStorage.removeItem("authToken");
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        


        {/* ===================== TASK SECTION ===================== */}
        <div className="px-10 space-y-6">

          {/* Header Card */}
      <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-bold px-2 text-[#333]">{taskData.title}</h2>
            <p className="text-sm px-2 text-gray-600 mt-2">{taskData.subtitle}</p>

            <div className="flex items-center gap-8 mt-5 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:calendar" className="text-[#3A7D7D] w-8 h-8" />
                <div>
              <h2 className="text-black font-semibold">Due Date</h2>
                
                <div className="text-gray-500 font-semibold">
                  {taskData.dueDate}-{taskData.dueTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Icon icon="bxs:time" className="text-orange-400 w-8 h-8" />
                <div>
                  <h2 className="text-black font-semibold">
                    Time Remaining
                  </h2>
              <div className="text-gray-500 font-semibold"  >

                {taskData.timeRemaining}
              </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Icon icon="mdi:star" className="text-yellow-200 w-8 h-8" />
                <div>
                  <h2 className="text-black font-semibold">
                    Points
                  </h2>
              <div className="text-gray-500 font-semibold"  >

                {taskData.points}
              </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* LEFT COLUMN */}
            <div className="col-span-2 space-y-6">
              
              {/* Task Description */}
      <div className="bg-linear-to-br from-white to-red-50 rounded-2xl p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                  <Icon icon="material-symbols:task" className="text-yellow-500 w-8 h-8" />
                  Task Description
                </h3>
                <p className="text-gray-700 px-2 py-4 leading-6">{taskData.taskDescription}</p>

                <h4 className="mt-6 px-2 font-semibold text-gray-800">
                  Learning Objectives
                </h4>
                <ul className="list-disc ml-6 mt-2 px-2 text-gray-700 space-y-1">
                  {taskData.learningObjectives.map((obj) => (
                    <li key={obj}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
      <div className="bg-linear-to-br from-white to-green-50 rounded-2xl p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-lg text-black   mb-4 flex items-center gap-2">
                  <Icon icon="pajamas:requirements" className="text-green-500 w-8 h-8" />
                  Requirements
                </h3>

                <ul className="space-y-4 px-2">
                  {taskData.requirements.map((req, index) => (
                    <li key={index} className="flex gap-3 px-2 py-2 rounded-2xl border border-green-200 bg-green-100">
                      <Icon
                        icon="mdi:tick-circle-outline"
                        className="text-green-600 text-xl mt-1"
                      />
                      <div className="">
                        <p className="font-semibold text-gray-800">{req.title}</p>
                        <p className="text-sm text-gray-600">{req.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
      <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-black text-lg  mb-4">
                  <Icon icon="noto:blue-book" className="text-blue-500 w-8 h-8 inline-block mr-2" />
                  Resource and Materials</h3>

                <div className="space-y-4">
                  {taskData.resources.map((resource, i) => (
                    <div
                      key={i}
                      className="flex   gap-3 px-2 py-2 bg-blue-100 rounded-2xl border border-blue-300"
                    >
                      <Icon
                        icon={resource.icon}
                        className="text-blue-600 text-xl mt-1"
                      />
                      <div>

                      <p className="font-semibold text-gray-800">{resource.title}</p>
                      <p className="text-sm text-gray-600">{resource.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Work */}
      <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center">

                  <Icon
                    icon="fluent:send-copy-24-regular"
                    className="text-[#3A7D7D] w-10 h-10"
                    />
                <h3 className="font-semibold text-2xl px-4  text-black flex items-center gap-2">
                  Submit Your Work
                </h3>
                    </div>

                <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                  <Icon
                    icon="fluent:send-copy-24-regular"
                    className="w-9 h-9 text-gray-500 mx-auto mb-3"
                  />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF or DOCX (Max 10MB)</p>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button className="px-6 py-2 rounded-lg text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    Cancel
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-[#3A7D7D] text-white cursor-pointer hover:bg-[#326666] transition-colors duration-200">
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              
              {/* Progress Tracker */}
      <div className="bg-linear-to-br from-white to-yellow-50 rounded-2xl p-5 shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-black text-center  text-lg">Progress Tracker</h3>

                <p className="text-sm text-gray-600 mt-3">Completion</p>

                <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                  <div
                    style={{ width: `${taskData.progress.completion}%` }}
                    className="bg-[#438582] h-2 rounded-lg"
                  />
                </div>

                <p className="text-right text-xs text-gray-600 mt-1">
                  {taskData.progress.completion}%
                </p>

                <ul className="mt-4 space-y-3">
                  {taskData.progress.checklist.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        className="accent-[#3A7D7D]"
                        readOnly
                      />
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status */}
      <div className="bg-linear-to-br from-white to-purple-50 rounded-2xl p-5 shadow-xl border border-purple-500 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-black text-center text-lg mb-4">Status</h3>

                <select className="w-full border border-gray-500 text-black p-2 rounded-lg">
                  <option>In Progress</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>

              {/* Upcoming Tasks */}
      <div className="bg-linear-to-br from-white to-yellow-50 rounded-2xl p-5 shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-black text-center text-lg mb-4">Upcoming Tasks</h3>

                <div className="space-y-4">
                  {taskData.upcomingTasks.map((task, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-4 rounded-lg  text-gray-700"
                    >
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-sm">{task.due}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <Outlet />
      </main>
    </div>
    
  );
}
