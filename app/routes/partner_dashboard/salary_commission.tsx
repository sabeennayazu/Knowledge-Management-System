import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SalaryCommission() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  // -------------------- MOCK API DATA --------------------
const salaryStats = {
  monthlySalary: 45000,
  commissionEarned: 18750,
  totalEarnings: 63750,
  totalSales: 125,
};

const commissionBreakdown = [
  { name: "Learning Materials", value: 48.5, color: "#2EAE9B" },
  { name: "Books", value: 22.4, color: "#1F87C9" },
  { name: "Practice Sets", value: 16.5, color: "#6A5AE0" },
  { name: "Extra Modules", value: 11.7, color: "#FFA726" },
  { name: "Workshops", value: 4, color: "#FF7043" },
];

const earningsTrend = [
  { month: "Jun", salary: 45000, commission: 18000, total: 63000 },
  { month: "Jul", salary: 45000, commission: 19500, total: 64500 },
  { month: "Aug", salary: 45000, commission: 20000, total: 65000 },
  { month: "Sep", salary: 45000, commission: 17000, total: 62000 },
  { month: "Oct", salary: 45000, commission: 18500, total: 63500 },
  { month: "Nov", salary: 45000, commission: 18750, total: 63750 },
];

const salaryCommissionDetails = [
  {
    month: "November 2024",
    salary: 45000,
    commission: 18750,
    total: 63750,
    paymentDate: "Dec 1, 2024",
    status: "Paid",
  },
  {
    month: "October 2024",
    salary: 45000,
    commission: 15200,
    total: 60200,
    paymentDate: "Nov 1, 2024",
    status: "Paid",
  },
  {
    month: "September 2024",
    salary: 45000,
    commission: 22000,
    total: 67000,
    paymentDate: "Oct 1, 2024",
    status: "Paid",
  },
];

const recentSales = [
  {
    title: "Mathematics Workbook",
    qty: 5,
    price: 2500,
    date: "Nov 20, 2024",
  },
  {
    title: "Science Practice Set",
    qty: 8,
    price: 1800,
    date: "Nov 18, 2024",
  },
  {
    title: "English Grammar Module",
    qty: 3,
    price: 1200,
    date: "Nov 15, 2024",
  },
];

const upcomingPayouts = {
  nextSalary: { amount: 45000, expectedDate: "December 1, 2024" },
  commissionPayout: { amount: 12400, expectedDate: "December 5, 2024" },
};
// ---------------------------------------------------------


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
                  ${
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

  {/* ===== TOP CARDS ===== */}
  <div className="grid grid-cols-4 gap-6 mb-8">
    {[
      {
        label: "Monthly Salary",
        value: `रू ${salaryStats.monthlySalary.toLocaleString()}`,
        icon: "solar:wallet-money-bold",
        trend: "+5.2%",
        bglinear: "from-blue-50 to-blue-100",
        iconBg: "bg-blue-500",
        borderColor: "border-blue-200",
        trendColor: "text-blue-600",
      },
      {
        label: "Commission Earned",
        value: `रू ${salaryStats.commissionEarned.toLocaleString()}`,
        icon: "mdi:cash-plus",
        trend: "+12.8%",
        bglinear: "from-emerald-50 to-emerald-100",
        iconBg: "bg-emerald-500",
        borderColor: "border-emerald-200",
        trendColor: "text-emerald-600",
      },
      {
        label: "Total Earnings",
        value: `रू ${salaryStats.totalEarnings.toLocaleString()}`,
        icon: "uil:analytics",
        trend: "+18.4%",
        bglinear: "from-purple-50 to-purple-100",
        iconBg: "bg-purple-500",
        borderColor: "border-purple-200",
        trendColor: "text-purple-600",
      },
      {
        label: "Total Sales",
        value: `${salaryStats.totalSales} items`,
        icon: "mdi:cart-outline",
        trend: "+15.3%",
        bglinear: "from-orange-50 to-orange-100",
        iconBg: "bg-orange-500",
        borderColor: "border-orange-200",
        trendColor: "text-orange-600",
      },
    ].map((card) => (
      <div
        key={card.label}
        className={`p-6 bg-linear-to-br ${card.bglinear} rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 ${card.borderColor} cursor-pointer group`}
      >
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.iconBg} text-white shadow-lg group-hover:shadow-xl transition-all`}
        >
          <Icon icon={card.icon} width={32} />
        </div>
        <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{card.label}</h3>
        <p className="text-3xl font-bold mt-2 text-gray-800">{card.value}</p>
        <span className={`${card.trendColor} text-sm font-bold flex items-center gap-1 mt-3`}>
          <Icon icon="mdi:trending-up" /> {card.trend}
        </span>
      </div>
    ))}
  </div>

  {/* ===== CHARTS SECTION ===== */}
  <div className="grid grid-cols-2 gap-6 mb-8">
    {/* COMMISSION BREAKDOWN - PIE CHART */}
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Icon icon="mdi:chart-pie" className="text-2xl text-blue-600" />
        Commission Breakdown
      </h2>
      <div className="flex flex-col gap-6">
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={commissionBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {commissionBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "2px solid #3A7D7D",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                formatter={(value) => [`${value}%`, "Commission"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3">
          {commissionBreakdown.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-sm font-medium text-gray-700">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* EARNINGS TREND - LINE CHART */}
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Icon icon="mdi:chart-line" className="text-2xl text-emerald-600" />
          Monthly Earnings Trend
        </h2>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "2px solid #3A7D7D",
                borderRadius: "8px",
                padding: "12px",
              }}
              formatter={(value) => `रू ${value.toLocaleString()}`}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", r: 5 }}
              activeDot={{ r: 7 }}
              name="Base Salary"
            />
            <Line
              type="monotone"
              dataKey="commission"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", r: 5 }}
              activeDot={{ r: 7 }}
              name="Commission"
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", r: 5 }}
              activeDot={{ r: 7 }}
              name="Total Earnings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold uppercase">Base Salary</p>
          <p className="text-sm font-bold text-gray-800">रू 45,000</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-600 font-semibold uppercase">Avg Commission</p>
          <p className="text-sm font-bold text-gray-800">रू 18,708</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-xs text-purple-600 font-semibold uppercase">Avg Total</p>
          <p className="text-sm font-bold text-gray-800">रू 63,708</p>
        </div>
      </div>
    </div>
  </div>

  {/* ===== SALARY & COMMISSION TABLE ===== */}
  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300 mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <Icon icon="mdi:file-table-outline" className="text-2xl text-purple-600" />
      Salary & Commission Details
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-700 font-bold bg-linear-to-r from-purple-50 to-purple-100 border-b-2 border-purple-200">
            <th className="py-4 px-4 text-left">MONTH</th>
            <th className="py-4 px-4 text-left">SALARY</th>
            <th className="py-4 px-4 text-left">COMMISSION</th>
            <th className="py-4 px-4 text-left">TOTAL</th>
            <th className="py-4 px-4 text-left">PAYMENT DATE</th>
            <th className="py-4 px-4 text-center">STATUS</th>
            <th className="py-4 px-4 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {salaryCommissionDetails.map((row, i) => (
            <tr 
              key={i} 
              className={`border-b hover:bg-gray-50 transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="py-4 px-4 font-semibold text-gray-800">{row.month}</td>
              <td className="py-4 px-4 text-gray-700">रू {row.salary.toLocaleString()}</td>
              <td className="py-4 px-4 text-gray-700">रू {row.commission.toLocaleString()}</td>
              <td className="py-4 px-4 font-bold text-gray-900">रू {row.total.toLocaleString()}</td>
              <td className="py-4 px-4 text-gray-700">{row.paymentDate}</td>
              <td className="py-4 px-4 text-center">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                  <Icon icon="mdi:check-circle" className="text-lg" />
                  {row.status}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <button className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1 mx-auto">
                  <Icon icon="mdi:download" className="text-lg" />
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
             

  {/* ===== SALES + UPCOMING PAYOUTS ===== */}
  <div className="grid grid-cols-2 gap-6">
    {/* RECENT SALES */}
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      <h2 className="font-semibold mb-4 flex text-black items-center gap-2">
        <Icon icon="mdi:receipt-text-outline" className="text-teal-600" /> Recent Sales History
      </h2>

      <div className="space-y-4">
        {recentSales.map((item) => (
          <div
            key={item.title}
            className="flex justify-between text-black items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <Icon icon="mdi:book-outline" width={30} className="text-teal-600" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">रू {item.price}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* UPCOMING PAYOUTS */}
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
        <h2 className="font-semibold mb-4 text-black flex items-center gap-2">
          <Icon icon="mdi:calendar-clock" className="text-teal-600" /> Upcoming Payouts
        </h2>

        <div className="p-4 rounded-xl bg-teal-50 mb-4">
          <p className="text-gray-500 text-sm">Next Salary Payment</p>
          <p className="text-2xl font-bold text-teal-700">रू {upcomingPayouts.nextSalary.amount}</p>
          <p className="text-sm text-gray-600">
            Expected: {upcomingPayouts.nextSalary.expectedDate}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-green-50">
          <p className="text-gray-500 text-sm">Commission Payout</p>
          <p className="text-2xl font-bold text-green-700">
            रू {upcomingPayouts.commissionPayout.amount}
          </p>
          <p className="text-sm text-gray-600">
            Expected: {upcomingPayouts.commissionPayout.expectedDate}
          </p>
        </div>
      </div>
    </div>
  </div>
</main>

    </div>
  );
}
