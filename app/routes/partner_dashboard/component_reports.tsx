import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";
import { ChevronDown } from "lucide-react";

// -----------------------------
// Mock API Data
// -----------------------------
type Priority = "High" | "Medium" | "Low";
type Status = "Approved" | "Rejected" | "Delivered" | "Pending";

interface RequestItem {
  id: string;
  component: string;
  description: string;
  category: string;
  quantity: number;
  priority: Priority;
  status: Status;
  requiredBy: string;
}

const mockRequests: RequestItem[] = [
  {
    id: "Req 001",
    component: "Arduino Uno R3",
    description: "IoT project for grade 10 students",
    category: "Electronics",
    quantity: 15,
    priority: "High",
    status: "Approved",
    requiredBy: "2025-08-20",
  },
  {
    id: "Req 002",
    component: "Raspberry Pi 4",
    description: "Robotics club activities",
    category: "Computers",
    quantity: 8,
    priority: "Medium",
    status: "Rejected",
    requiredBy: "2025-08-20",
  },
  {
    id: "Req 003",
    component: "Ultrasonic Sensors",
    description: "Distance measurement lab",
    category: "Sensors",
    quantity: 20,
    priority: "High",
    status: "Delivered",
    requiredBy: "2025-08-20",
  },
  {
    id: "Req 004",
    component: "STEAM Book",
    description: "Learning Materials required for students",
    category: "Learning Material",
    quantity: 50,
    priority: "Low",
    status: "Pending",
    requiredBy: "2025-08-20",
  },
];

const statusList = ["All Status", "Approved", "Rejected", "Delivered", "Pending"];
const categoryList = [
  "All Categories",
  "Electronics",
  "Computers",
  "Sensors",
  "Learning Material",
];

// -----------------------------

export default function ComponentReports() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const location = useLocation();

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

  // -----------------------------
  // Filtering
  // -----------------------------
  const filteredRequests = mockRequests.filter((item) => {
    const matchesStatus =
      statusFilter === "All Status" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All Categories" || item.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const total = mockRequests.length;
  const pending = mockRequests.filter((r) => r.status === "Pending").length;
  const approved = mockRequests.filter((r) => r.status === "Approved").length;
  const delivered = mockRequests.filter((r) => r.status === "Delivered").length;

  const badge = {
    High: "bg-red-200 text-red-700",
    Medium: "bg-yellow-200 text-yellow-700",
    Low: "bg-green-200 text-green-700",
  };

  const statusColor = {
    Approved: "text-green-600",
    Rejected: "text-red-600",
    Delivered: "text-blue-600",
    Pending: "text-orange-500",
  };

  // -----------------------------

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>

        <nav className="flex-1 space-y-6 py-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 
                  ${isActive
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

      {/* Top Bar */}
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

          {/* Right side */}
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
                <Icon icon="mdi:chevron-down" className="text-white text-lg w-6 h-6" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-1 z-20">
                  <Link
                    to="/partner_dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

        {/* --------------------------- */}
        {/* MAIN COMPONENT REQUEST UI  */}
        {/* --------------------------- */}

        <h1 className="text-3xl font-bold text-[#333] mb-1">Components Requests System</h1>
        <p className="text-gray-600 mb-6">
          Request and track teaching materials & equipment
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-green-100 py-2  border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="flex flex-col items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <Icon
                  icon="mdi:clipboard-text-outline"
                  className="text-green-600 w-7 h-7"
                />
              </div>
              <p className="text-lg font-semibold text-gray-700">Total Requests</p>
            </div>

            <p className="text-4xl text-center font-bold text-green-600 mt-4">
              {total}
            </p>
          </div>


          <div className="flex flex-col py-2 items-center justify-center bg-orange-100  border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">

            <div className="flex flex-col items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
                <Icon
                  icon="material-symbols:pending-actions"
                  className="text-orange-500 w-7 h-7"
                />
              </div>

              <p className="text-lg font-semibold text-gray-700">Pending</p>
            </div>

            <p className="text-4xl font-bold text-orange-500 mt-4">
              {pending}
            </p>
          </div>


          <div className="bg-green-100 py-2 border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">

            {/* Icon Circle + Label */}
            <div className="flex flex-col items-center gap-3 justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <Icon
                  icon="hugeicons:tick-03"
                  className="text-green-600 w-7 h-7"
                />
              </div>

              <p className="text-lg font-semibold text-gray-700">Approved</p>
            </div>

            {/* Count */}
            <p className="text-4xl font-bold text-center text-green-700 mt-4">
              {approved}
            </p>
          </div>

          <div className="bg-blue-100 py-2 border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">

            {/* Icon Circle + Label */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <Icon
                  icon="mdi:package-delivered"
                  className="text-blue-600 w-7 h-7"
                />
              </div>

              <p className="text-md font-semibold text-gray-700">Delivered</p>
            </div>

            {/* Count */}
            <p className="text-5xl text-center font-bold text-blue-600 mt-4">
              {delivered}
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md border text-gray-700"
            >
              {statusFilter}
              <ChevronDown size={20} />
            </button>

            {showStatusDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg border z-20">
                {["All Status", "Pending", "Delivered", "Rejected", "Approved"].map(
                  (item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setStatusFilter(item);
                        setShowStatusDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md border text-gray-700"
            >
              {categoryFilter}
              <ChevronDown size={20} />
            </button>

            {showCategoryDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg border z-20">
                {[
                  "All Categories",
                  "Electronics",
                  "Book",
                  "Learning Materials",
                  "Computer",
                ].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setCategoryFilter(item);
                      setShowCategoryDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-100 text-black">
                <th className="p-3">Request</th>
                <th className="p-3">Component</th>
                <th className="p-3">Category</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Required By</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((item) => (
                <tr key={item.id} className="border-b text-black hover:bg-gray-50">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">
                    <p className="font-semibold">{item.component}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.quantity}</td>

                  {/* Priority */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${badge[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3 font-semibold">
                    <span className={statusColor[item.status]}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">{item.requiredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
