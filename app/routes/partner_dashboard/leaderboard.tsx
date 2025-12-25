import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



/* --------------------------
   Dummy Data (API Simulation)
   -------------------------- */

type Tutor = {
  rank: number;
  name: string;
  avatar: string;
  schools: string[];
  points: number;
  trend: string;
  badges: string[];
  color?: string;
};

const UPLOADED_IMAGE = "/images/ok.jpeg";
const image = "/image/me.jpg"; 

export const leaderboardSummary = {
  topTutor: {
    name: "Sarah Chen",
    points: 2450,
    avatar: UPLOADED_IMAGE,
  },
  avgPerformance: {
    value: 1847,
    change: "+12% this month",
  },
  activeTutors: {
    count: 24,
    schools: 18,
  },
  trendingTutor: {
    name: "Mike Torres",
    pointsGained: "+340 pts this month",
  },
};

// Logged-in user data
export const loggedInUser = {
  rank: 6,
  name: "You",
  avatar: image,
  schools: ["City Central"],
  points: 1680,
  trend: "+12%",
  badges: ["star"],
  color: "#3A7D7D",
};

export const tutorsData: Tutor[] = [
  {
    rank: 1,
    name: "Sarah Chen",
    
    avatar: UPLOADED_IMAGE,
    schools: ["Lincoln High", "Roosevelt"],
    points: 2450,
    trend: "+15%",
    badges: ["gold", "star", "medal"],
    color: "#8b5cf6",
  },
  {
    rank: 2,
    name: "Mike Torres",
    
    avatar: "/avatars/mike.png",
    schools: ["Washington Prep"],
    points: 2180,
    trend: "+22%",
    badges: ["silver", "rocket"],
    color: "#f97316",
  },
  {
    rank: 3,
    name: "Emma Rodriguez",
    
    avatar: "/avatars/emma.png",
    schools: ["Jefferson", "Lincoln"],
    points: 1950,
    trend: "+8%",
    badges: ["green-check"],
    color: "#10b981",
  },
  {
    rank: 4,
    name: "Milan Rai",
    
    avatar: "/avatars/milan.png",
    schools: ["Galaxy Public"],
    points: 1865,
    trend: "+3%",
    badges: ["bronze"],
    color: "#06b6d4",
  },
  {
    rank: 5,
    name: "Binita Shrestha",
    
    avatar: "/avatars/binita.png",
    schools: ["DAV"],
    points: 1740,
    trend: "-1%",
    badges: ["consistent"],
    color: "#f59e0b",
  },
  loggedInUser,
];

// Monthly / Yearly chart data
export const performanceTrends = {
  monthly: [
    { month: "Jan", top: 1800, avg: 1650, you: 1200 },
    { month: "Feb", top: 2100, avg: 1700, you: 1300 },
    { month: "Mar", top: 2300, avg: 1800, you: 1400 },
    { month: "Apr", top: 2500, avg: 1900, you: 1500 },
    { month: "May", top: 2600, avg: 2000, you: 1600 },
    { month: "Jun", top: 2700, avg: 2100, you: 1680 },
  ],
  yearly: [
    { year: "2020", top: 1400, avg: 1200, you: 900 },
    { year: "2021", top: 1800, avg: 1500, you: 1100 },
    { year: "2022", top: 2200, avg: 1700, you: 1300 },
    { year: "2023", top: 2500, avg: 2000, you: 1500 },
    { year: "2024", top: 2800, avg: 2200, you: 1680 },
  ],
};

/* --------------------------
   Leaderboard Component
   -------------------------- */

const Leaderboard: React.FC = () => {
  // UI State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<"monthly" | "yearly">("monthly");
  const [sortBy, setSortBy] = useState<"rank" | "points" | "growth">("rank");
  const [selectedSchool, setSelectedSchool] = useState<string>("All Schools");

  const location = useLocation();

  // sidebar items (kept small for brevity)
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

  // computed / filtered data
  const chartData = performanceTrends[timeRange];

  const uniqueSchools = Array.from(
    new Set(tutorsData.flatMap((t) => t.schools))
  ).sort();

  // sorting handler (stable-ish)
  const sortedTutors = [...tutorsData].sort((a, b) => {
    if (sortBy === "rank") return a.rank - b.rank;
    if (sortBy === "points") return b.points - a.points;
    // growth: parse + / - from trend string -> highest positive growth first
    if (sortBy === "growth") {
      const parse = (t: string) => parseFloat(t.replace("%", "").replace("+", ""));
      return parse(b.trend) - parse(a.trend);
    }
    return 0;
  }).filter((t) =>
    selectedSchool === "All Schools" ? true : t.schools.includes(selectedSchool)
  );

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
                                ${index === sidebarItems.findIndex(i => i.label === "Leaderboard") && location.pathname === "/partner_dashboard/leaderboard"
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
        <div className="space-y-10">

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6">
            {/* Top Tutor Card - Gold/Purple theme */}
            <div className="bg-orange-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-orange-600 text-sm font-semibold uppercase tracking-wider">Top Tutor</p>
                <Icon icon="mdi:crown" className="text-2xl text-yellow-500" />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <img src={leaderboardSummary.topTutor.avatar} alt="top tutor" className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-orange-300" />
                <div>
                  <p className="text-xl font-bold text-orange-500">{leaderboardSummary.topTutor.name}</p>
                  <p className="text-orange-600 font-bold mt-1 text-lg">{leaderboardSummary.topTutor.points} pts</p>
                </div>
              </div>
            </div>

            {/* Avg Performance Card - Blue theme */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Avg Performance</p>
                <Icon icon="mdi:chart-line" className="text-2xl text-blue-500" />
              </div>
              <p className="text-4xl font-bold text-gray-800 mt-2">{leaderboardSummary.avgPerformance.value}</p>
              <p className="text-blue-600 font-bold mt-3 flex items-center gap-1 text-sm">
                <Icon icon="mdi:trending-up" className="text-lg" /> {leaderboardSummary.avgPerformance.change}
              </p>
            </div>

            {/* Active Tutors Card - Green theme */}
            <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-green-600 text-sm font-semibold uppercase tracking-wider">Active Tutors</p>
                <Icon icon="mdi:account-multiple" className="text-2xl text-green-500" />
              </div>
              <p className="text-4xl font-bold text-gray-800 mt-2">{leaderboardSummary.activeTutors.count}</p>
              <p className="text-green-600 font-semibold mt-3 text-sm">Across {leaderboardSummary.activeTutors.schools} schools</p>
            </div>

            {/* Trending Tutor Card - Orange theme */}
            <div className="bg-linear-to-br from-red-50 to-red-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-red-600 text-sm font-semibold uppercase tracking-wider">Trending Tutor</p>
                <Icon icon="mdi:fire" className="text-2xl text-red-500" />
              </div>
              <p className="text-xl font-bold text-red-500 mt-2">{leaderboardSummary.trendingTutor.name}</p>
              <p className="text-orange-600 font-bold mt-3 flex items-center gap-1 text-sm">
                <Icon icon="mdi:rocket-launch" className="text-lg" /> {leaderboardSummary.trendingTutor.pointsGained}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 flex justify-between rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon icon="mdi:filter" className="text-black w-8 h-8" />
              Leaderboard Filters
            </h2>

            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 rounded-lg bg-white text-gray-700 font-medium border border-gray-400 hover:border-gray-800 focus:outline-none focus:ring focus:ring-gray-400 transition-all cursor-pointer"
              >
                <option value="rank">Sort by Rank</option>
                <option value="points">Sort by Points</option>
                <option value="growth">Sort by Growth</option>
              </select>

              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-white text-gray-700 font-medium border border-gray-400 hover:border-gray-400 focus:outline-none focus:ring focus:ring-gray-400 transition-all cursor-pointer"
              >
                <option>All Schools</option>
                {uniqueSchools.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              {/* Monthly / Yearly Toggle */}
              <div className="flex bg-gray-200 p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setTimeRange("monthly")}
                  className={`px-4 py-2 rounded-md transition-all font-semibold ${timeRange === "monthly" ? "bg-green-500  text-white shadow-md" : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setTimeRange("yearly")}
                  className={`px-4 py-2 rounded-lg transition ${timeRange === "yearly" ? "bg-green-500 text-white" : "text-gray-600"
                    }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>

          {/* Rankings + Chart */}
          <div className="grid grid-cols-3 gap-8">
            {/* Tutor Rankings Table */}
            <div className="col-span-2 bg-orange-50 p-6 rounded-2xl shadow-md border-2 border-yellow-500 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Icon icon="mdi:podium" className="text-orange-00" />
                  Tutor Rankings
                </h2>
                <div className="text-sm font-semibold text-orange-500 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">Showing {sortedTutors.length} tutors</div>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                <table className="w-full border ">
                  <thead>
                    <tr className="text-left text-gray-700 text-sm font-bold bg-linear-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
                      <th className="py-3 px-2">Rank</th>
                      <th className="py-3 px-2">Tutor</th>
                      <th className="py-3 px-2">Schools</th>
                      <th className="py-3 px-2">Points</th>
                      <th className="py-3 px-2">Trend</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedTutors.map((tutor, idx) => (
                      <tr key={tutor.rank} className={`border-b hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="py-4 px-2">
                          {tutor.rank <= 3 ? (
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${tutor.rank === 1 ? 'bg-linear-to-r from-yellow-400 to-yellow-500 shadow-lg' : tutor.rank === 2 ? 'bg-linear-to-r from-gray-400 to-gray-500' : 'bg-linear-to-r from-orange-400 to-orange-500'}`}>
                              {tutor.rank}
                            </span>
                          ) : (
                            <span className="font-bold text-gray-700">{tutor.rank}</span>
                          )}
                        </td>

                        <td className="flex items-center gap-3 py-4 px-2">
                          <img
                            src={tutor.avatar}
                            alt={tutor.name}
                            className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-purple-200 hover:border-purple-400 transition-colors"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/40x40.png?text=TU";
                            }}
                          />
                          <div>
                            <p className="font-bold text-gray-800">{tutor.name}</p>
                          </div>
                        </td>

                        <td className="px-2">
                          <div className="flex flex-wrap gap-2">
                            {tutor.schools.map((s, i) => (
                              <span
                                key={i}
                                className="bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full font-semibold border border-blue-200 hover:border-blue-400 transition-colors"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="font-bold text-gray-800 px-2 text-lg">{tutor.points}</td>

                        <td className="font-bold px-2">
                          <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                            <Icon icon="mdi:trending-up" /> {tutor.trend}
                          </span>
                        </td>

                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Trends Chart */}
            <div className="flex flex-col gap-4">
              {/* Your Position Card */}
              <div className="bg-linear-to-br from-[#3A7D7D] to-[#2A5D5D] p-6 rounded-2xl shadow-lg text-white border-2 border-[#3A7D7D]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon icon="mdi:trophy-outline" className="text-2xl" />
                    Your Position
                  </h3>
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Rank #{loggedInUser.rank}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <img src={loggedInUser.avatar} alt="Your profile" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg" />
                  <div className="flex-1">
                    <p className="text-sm opacity-90">You are ranked</p>
                    <p className="text-3xl font-bold">{loggedInUser.points} pts</p>
                    <p className="text-sm mt-2 flex items-center gap-1">
                      <Icon icon="mdi:trending-up" className="text-green-400" />
                      <span className="text-green-400 font-semibold">{loggedInUser.trend}</span>
                      <span className="opacity-75">this month</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#3A7D7D]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Performance Trends</h2>
                  <div className="text-sm text-gray-500 font-semibold">{timeRange === "monthly" ? "Last 6 months" : "Yearly"}</div>
                </div>

                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={timeRange === "monthly" ? "month" : "year"} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="top" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 3 }} name="Top Performer" />
                      <Line type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={3} dot={{ r: 3 }} name="Average" />
                      <Line type="monotone" dataKey="you" stroke="#3A7D7D" strokeWidth={3} dot={{ r: 3 }} name="You" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 flex items-center justify-between gap-6 flex-wrap">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                      <span className="text-sm text-gray-600 font-semibold">Top Performer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                      <span className="text-sm text-gray-600 font-semibold">Average</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#3A7D7D]" />
                      <span className="text-sm text-gray-600 font-semibold">Your Performance</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 font-semibold">Auto-updated monthly</div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
