import React, { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function PartnerDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("Class 1 - Attendance");

  
// ===== PROFILE DATA =====
const profileStats = {
  completion: 75,
  assignedSchools: 3,
  totalClasses: 12,
  tasksCompleted: 3,
  tasksPending: 3,
};

// ===== PAYMENT PIE DATA =====
const paymentData = [
  { name: "Completed", value: 85 },
  { name: "Pending", value: 15 },
];
const paymentColors = ["#3A7D7D", "#D97706"];

// ===== THIS WEEK CLASSES =====
const weeklyClasses = [
  { school: "Vidya Niketan", chapter: 2, weeks: 6, completed: 5 },
  { school: "Pragati", chapter: 1, weeks: 5, completed: 5 },
  { school: "Kanchanjunga", chapter: 2, weeks: 7, completed: 6 },
  { school: "Kanchanjunga", chapter: 2, weeks: 6, completed: 4 },
];

// ===== LEADERBOARD =====
const leaderboard = [
  { id: 1, name: "John Doe", score: 9 },
  { id: 2, name: "John Doe", score: 8 },
  { id: 3, name: "John Doe", score: 7 },
  { id: 4, name: "John Doe", score: 6.5 },
];

// ===== STUDENT MONITORING =====
const studentMonitoring = [
  {
    name: "Alice Johnson",
    total: 20,
    present: 20,
    absent: 5,
    assignment: "3 / 5",
    marks: 85,
  },
  {
    name: "Alice Johnson",
    total: 20,
    present: 20,
    absent: 5,
    assignment: "3 / 5",
    marks: 85,
  },
  {
    name: "Alice Johnson",
    total: 20,
    present: 20,
    absent: 5,
    assignment: "3 / 5",
    marks: 85,
  },
];


  const sidebarItems = [
    {
      label: "Dashboard",
      icon: (
             <Icon icon="iconamoon:home-duotone" width={24} height={24} />

      ),
    },
    {
      label: "Assigned Schools",
      icon: (
        <Icon icon="teenyicons:school-outline" width={24} height={24} />

      ),
    },
    {
          label: "Attendance",
          icon: (
            <Icon icon="mingcute:calendar-2-line" width={24} height={24} />
    
          ),
        },  
    {
      label: "Assignment Management",
      icon: (
       <Icon icon="hugeicons:assignments" width={30} height={30} />

      ),
    },
    {
      label: "Progress Report",
      icon: (
        <Icon icon="heroicons:chart-bar" width={24} height={24} />

      ),
    },
    {
      label: "Leaderboard",
      icon: (
        <Icon icon="mdi:trophy-outline" width={24} height={24} />

      ),
    },
    {
      label: "Salary + Commission",
      icon: (
        <Icon icon="carbon:money" width={24} height={24} />

      ),
    },
    {
      label: "Component Reports",
      icon: (
     <Icon icon="lucide:component" width={24} height={24} />

      
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>
        <nav className="flex-1 space-y-6 py-2 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const routeMap: Record<string, string> = {
              "Dashboard": "/partner_dashboard",
              "Assigned Schools": "/partner_dashboard/assigned_schools",
              "Attendance": "/partner_dashboard/attendance",
              "Assignment Management": "/partner_dashboard/assignment_management",
              "Progress Report": "/partner_dashboard/progress_report",
              "Leaderboard": "/partner_dashboard/leaderboard",
              "Salary + Commission": "/partner_dashboard/salary_commission",
              "Component Reports": "/partner_dashboard/component_reports",
            };
            return (
              <Link
                key={item.label}
                to={routeMap[item.label] || "#"}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 
                           ${index === 0 
                    ? "bg-[#3A7D7D]/80 text-white border   font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                    : "bg-transparent text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"}`}              >
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
      {/* Search Bar and Profile */}
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

  {/* ===== DASHBOARD CARDS ===== */}
  <div className="grid grid-cols-4 gap-6 mb-8">

    {/* Profile Status */}
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer">
      <h3 className="text-gray-700 font-semibold mb-2">Profile Status</h3>
      <div className="flex justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-[#3A7D7D]">
          <span className="text-2xl font-bold text-[#3A7D7D]">
            {profileStats.completion}%
          </span>
        </div>
      </div>
    </div>

    {/* Assigned Schools */}
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer">
      <h3 className="text-gray-700 font-semibold mb-2">Assigned Schools</h3>
      <p className="text-4xl font-bold text-[#3A7D7D]">{profileStats.assignedSchools}</p>
      <span className="text-sm bg-[#f0fdfa] px-3 py-1 rounded-full mt-2 inline-block text-[#0f766e]">
        {profileStats.totalClasses} Classes
      </span>
    </div>

    {/* Tasks Overview */}
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer">
      <h3 className="text-gray-700 font-semibold mb-3">Tasks Overview</h3>
      <p className="text-gray-700 font-medium">
        <span className="text-[#3A7D7D] font-bold">{profileStats.tasksCompleted}</span> Completed
      </p>
      <p className="text-gray-700 font-medium mt-2">
        <span className="text-[#D97706] font-bold">{profileStats.tasksPending}</span> Pending
      </p>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <div
          className="h-2 bg-[#3A7D7D] rounded-full"
          style={{ width: `${(profileStats.tasksCompleted / (profileStats.tasksPending + profileStats.tasksCompleted)) * 100}%` }}
        ></div>
      </div>
    </div>

    {/* Payment Pie Chart */}
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer">
      <h3 className="text-gray-700 font-semibold mb-3">Payment</h3>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            outerRadius={55}
            label
          >
            {paymentData.map((entry, index) => (
              <Cell key={index} fill={paymentColors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>

  {/* ===== THIS WEEK CLASSES + LEADERBOARD ===== */}
  <div className="grid grid-cols-2 gap-6 mb-8">

    {/* THIS WEEK CLASSES */}
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-800">This Week Classes</h2>
      <table className="w-full text-left text-gray-700">
        <thead>
          <tr className="border-b">
            <th className="py-2">School Name</th>
            <th>Chapter</th>
            <th>Weeks</th>
            <th>Weeks Completed</th>
          </tr>
        </thead>
        <tbody>
          {weeklyClasses.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              <td className="py-2">{row.school}</td>
              <td>{row.chapter}</td>
              <td>{row.weeks}</td>
              <td>{row.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* LEADERBOARD */}
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
      <h2 className="text-center text-xl font-bold mb-2 text-gray-800">Leaderboard</h2>
      <p className="text-center text-gray-600 mb-4">You are ranked <b>#4</b> this week</p>
      <table className="w-full text-left text-gray-700">
        <thead>
          <tr className="border-b">
            <th className="py-2">S.N.</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-100">
              <td className="py-2">{row.id}.</td>
              <td>{row.name}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>

  {/* ===== STUDENT MONITORING ===== */}
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Student Monitoring</h2>

    <select
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
      className="bg-[#E9F5F2] text-[#3A7D7D] px-3 py-1 rounded-lg mb-4"
    >
      <option>Class 1 - Attendance</option>
      <option>Class 1 - Marks</option>
      <option>Class 1 - Assignments</option>
    </select>

    <table className="w-full text-left text-gray-700">
      <thead>
        <tr className="border-b">
          <th className="py-2">Student Name</th>
          <th>Total Classes</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Assignment</th>
          <th>Marks</th>
        </tr>
      </thead>

      <tbody>
        {studentMonitoring.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-100">
            <td className="py-2">{row.name}</td>
            <td>{row.total}</td>
            <td>{row.present}</td>
            <td>{row.absent}</td>
            <td>{row.assignment}</td>
            <td>{row.marks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</main>

    </div>
  );
}
