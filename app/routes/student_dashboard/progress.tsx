import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Icon } from "@iconify/react";


interface SidebarItem {
  label: string;
  icon: React.ReactElement;
}

interface MarksPoint {
  date: string; // ISO or simple label
  yourMarks: number;
  classAverage: number;
}

interface SyllabusItem {
  id: string;
  title: string;
  coveredPercent: number; // 0-100
}

interface StatCard {
  id: string;
  title: string;
  value: string;
  sub?: string;
}

interface RecentActivity {
  label: string;
  description: string;
  timeAgo: string;
 
}

interface Performer {
  id: string;
  name: string;
  score: number;
  avatarColor?: string;
}

export default function Progress() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();


  // ==========================
  // Sidebar (unchanged content kept)
  // ==========================
  const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", icon: <Icon icon="iconamoon:home-duotone" width={24} /> },
    { label: "Attendance", icon: <Icon icon="mingcute:calendar-2-line" width={24} /> },
    { label: "Learning Material", icon: <Icon icon="fluent:learning-app-24-regular" width={24} /> },
    { label: "Task", icon: <Icon icon="hugeicons:task-02" width={24} /> },
    {
      label: "Examination",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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

  // ==========================
  // Mock API data (consts)
  // ==========================
  const MOCK_MARKS: MarksPoint[] = [
    { date: "Jan", yourMarks: 72, classAverage: 68 },
    { date: "Feb", yourMarks: 78, classAverage: 70 },
    { date: "Mar", yourMarks: 85, classAverage: 74 },
    { date: "Apr", yourMarks: 80, classAverage: 76 },
    { date: "May", yourMarks: 88, classAverage: 79 },
    { date: "Jun", yourMarks: 91, classAverage: 81 },
    { date: "Jul", yourMarks: 86, classAverage: 82 },
    { date: "Aug", yourMarks: 92, classAverage: 84 },
    { date: "Sep", yourMarks: 94, classAverage: 86 },
  ];

  const MOCK_SYLLABUS: SyllabusItem[] = [
    { id: "s1", title: "Chapter - 1", coveredPercent: 100 },
    { id: "s2", title: "Chapter - 2", coveredPercent: 100 },
    { id: "s3", title: "Chapter - 3", coveredPercent: 80 },
    { id: "s4", title: "Chapter - 4", coveredPercent: 0 },
  ];

  const MOCK_STATS: StatCard[] = [
    { id: "st1", title: "Overall Progress", value: "83%", sub: "Based on syllabus & tests" },
    { id: "st2", title: "Class Rank", value: "7 / 32", sub: "Improved from 10" },
    { id: "st3", title: "Attendance", value: "92%", sub: "This term" },
  ];

  const MOCK_RECENT: RecentActivity[] = [
    { label: "Quiz 3", description: "Scored 18 out of 20", timeAgo: "2 hours ago" },
    { label: "Assignment 5", description: "Submitted - On time", timeAgo: "1 day ago"  },
    { label: "Midterm", description: "Scored 84 out of 100", timeAgo: "2 weeks ago"  },
  ];

  const MOCK_PERFORMERS: Performer[] = [
    { id: "p1", name: "Asha K.", score: 95, avatarColor: "bg-green-400" },
    { id: "p2", name: "Ramesh S.", score: 91, avatarColor: "bg-blue-400" },
    { id: "p3", name: "Mina D.", score: 89, avatarColor: "bg-yellow-400" },
    { id: "p4", name: "You", score: 80, avatarColor: "bg-red-400" },
  ];

  // ==========================
  // Local state for UI interactions
  // ==========================
  const [selectedRange, setSelectedRange] = useState<"6mo" | "1y" | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("All Subjects");
  const [marksData, setMarksData] = useState<MarksPoint[]>(MOCK_MARKS);
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>(MOCK_SYLLABUS);
  const [stats] = useState<StatCard[]>(MOCK_STATS);
  const [recentActivities] = useState<RecentActivity[]>(MOCK_RECENT);
  const [topPerformers] = useState<Performer[]>(MOCK_PERFORMERS);

  // Example effect: filter data when range changes (mock behavior)
  useEffect(() => {
    if (selectedRange === "6mo") {
      setMarksData(MOCK_MARKS.slice(-6));
    } else if (selectedRange === "1y") {
      setMarksData(MOCK_MARKS.slice(-9)); // in mock it's similar
    } else {
      setMarksData(MOCK_MARKS);
    }
  }, [selectedRange]);

  const maxMark = useMemo(() => {
    const maxY = Math.max(...marksData.map((m) => Math.max(m.yourMarks, m.classAverage)), 100);
    // round up to nearest 10
    return Math.ceil(maxY / 10) * 10;
  }, [marksData]);

  // Utility to convert data points to SVG path coordinates
  const buildLinePath = (points: number[], width: number, height: number, padding = 20): string => {
    if (points.length === 0) return "";
    const step = (width - padding * 2) / (points.length - 1 || 1);
    const scaleY = (value: number) => {
      // invert y for SVG coordinate system
      const v = (value / maxMark) * (height - padding * 2);
      return height - padding - v;
    };
    let d = "";
    points.forEach((p, i) => {
      const x = padding + i * step;
      const y = scaleY(p);
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });
    return d;
  };

  // ==========================
  // Render
  // ==========================
  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-4 text-white">LOGO</div>
        <nav className="flex-1 space-y-6 overflow-y-auto py-4">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === routeMap[item.label];
            return (
              <Link
                key={item.label}
                to={routeMap[item.label] || "#"}
                className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200 
         ${isActive
                   ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                   : "text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-lg hover:-translate-y-0.5 hover:font-medium"}
       `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
         <button
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f3dada] text-[#dc2626]"
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/");
          }}
        >
          <Icon icon="ri:logout-circle-line" className="text-lg" />
          Log Out
        </button>
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
            <button className="relative" aria-label="notifications">
              <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-3xl" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 bg-[#3A7D7D] px-2 py-1 rounded-3xl"
                onClick={() => setIsDropdownOpen((s) => !s)}
                aria-haspopup
                aria-expanded={isDropdownOpen}
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

      {/* ============================
           MAIN CONTENT - ONLY MODIFY INSIDE <main>
         ============================ */}
     <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">
  {/* ---------- Header ---------- */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Progress</h1>
    <p className="text-gray-600 mt-2">Track your learning progress and achievements</p>
  </div>

  {/* ---------- Main Dashboard Card Container ---------- */}
  <div className="grid grid-cols-12 gap-6">
    {/* Left Column */}
    <div className="col-span-8 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, idx) => {
          const colors = [
            { bg: 'bg-linear-to-br from-blue-50 to-blue-100', border: 'border-blue-300', text: 'text-blue-700', iconBg: 'bg-blue-500' },
            { bg: 'bg-linear-to-br from-purple-50 to-purple-100', border: 'border-purple-300', text: 'text-purple-700', iconBg: 'bg-purple-500' },
            { bg: 'bg-linear-to-br from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-700', iconBg: 'bg-green-500' }
          ];
          const color = colors[idx % 3];
          
          return (
            <div
              key={s.id}
              className={`${color.bg} rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 ${color.iconBg} rounded-full flex items-center justify-center mb-3 shadow-md`}>
                <Icon icon={idx === 0 ? "mdi:chart-line" : idx === 1 ? "mdi:trophy" : "mdi:calendar-check"} className="text-white text-2xl" />
              </div>
              <p className="text-sm text-gray-600 text-center font-medium">{s.title}</p>
              <h2 className={`text-3xl font-bold ${color.text} text-center mt-2`}>
                {s.value}
              </h2>
              {s.sub && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {s.sub}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Marks Progress & Controls */}
      <div className="bg-linear-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <Icon icon="mdi:chart-line-variant" className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Marks Progress Over Time</h3>
                <p className="text-sm text-gray-500 mt-0.5">Your marks vs class average</p>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
                <span className="text-sm text-blue-700 font-medium">Your Marks</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-400 shadow-sm" />
                <span className="text-sm text-gray-600 font-medium">Class Average</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">Scale: 0 - {maxMark}</div>
          </div>

          <div className="w-full h-56 bg-white rounded-xl p-4 border-2 border-blue-100 shadow-inner">
            <svg width="100%" height="100%" viewBox="0 0 800 260" preserveAspectRatio="none" role="img" aria-label="marks line chart">
              {/* grid lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const y = 260 - (i * (260 - 40)) / 4 - 20;
                return <line key={i} x1="0" x2="800" y1={y} y2={y} stroke="#e3f2fd" strokeWidth={1.5} />;
              })}

              {/* class average dashed line path */}
              <path
                d={buildLinePath(marksData.map((m) => m.classAverage), 800, 260)}
                fill="none"
                stroke="#9e9e9e"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* your marks path */}
              <path
                d={buildLinePath(marksData.map((m) => m.yourMarks), 800, 260)}
                fill="none"
                stroke="#2196f3"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* points */}
              {marksData.map((pt, i) => {
                const points = marksData.map((m) => m.yourMarks);
                const step = (800 - 40) / (points.length - 1 || 1);
                const x = 20 + i * step;
                const yYour = 260 - 20 - (pt.yourMarks / maxMark) * (260 - 40);
                const yAvg = 260 - 20 - (pt.classAverage / maxMark) * (260 - 40);
                return (
                  <g key={pt.date}>
                    <circle cx={x} cy={yYour} r={5.5} fill="#2196f3" stroke="#fff" strokeWidth={2} />
                    <circle cx={x} cy={yAvg} r={4} fill="#fff" stroke="#9e9e9e" strokeWidth={2} />
                  </g>
                );
              })}

              {/* x labels */}
              {marksData.map((m, i) => {
                const points = marksData.map(() => 1);
                const step = (800 - 40) / (points.length - 1 || 1);
                const x = 20 + i * step;
                return (
                  <text key={m.date} x={x} y={250} fontSize={13} fontWeight="500" textAnchor="middle" fill="#616161">
                    {m.date}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Syllabus Coverage */}
      <div className="bg-linear-to-br from-white to-teal-50 rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shadow-md">
              <Icon icon="mdi:book-open-page-variant" className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Syllabus Coverage</h3>
          </div>
          <p className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-4">
          {syllabus.map((s) => {
            const isComplete = s.coveredPercent === 100;
            const isInProgress = s.coveredPercent > 0 && s.coveredPercent < 100;
            const bgColor = isComplete ? 'bg-green-50' : isInProgress ? 'bg-blue-50' : 'bg-gray-50';
            const borderColor = isComplete ? 'border-green-200' : isInProgress ? 'border-blue-200' : 'border-gray-200';
            const progressColor = isComplete ? 'bg-gradient-to-r from-green-500 to-green-400' : isInProgress ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gray-300';
            
            return (
              <div key={s.id} className={`w-full p-4 rounded-xl ${bgColor} border ${borderColor} shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {isComplete && <Icon icon="mdi:check-circle" className="text-green-500 text-lg" />}
                    {isInProgress && <Icon icon="mdi:clock-outline" className="text-blue-600 text-lg" />}
                    {!isComplete && !isInProgress && <Icon icon="mdi:circle-outline" className="text-gray-400 text-lg" />}
                    <p className="text-sm font-semibold text-gray-700">{s.title}</p>
                  </div>
                  <p className={`text-sm font-bold ${isComplete ? 'text-green-500' : isInProgress ? 'text-blue-500' : 'text-gray-500'}`}>
                    {s.coveredPercent}%
                  </p>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner border border-gray-200">
                  <div 
                    style={{ width: `${s.coveredPercent}%` }} 
                    className={`h-full rounded-full ${progressColor} shadow-sm transition-all duration-500`} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="col-span-4 space-y-6">
      {/* Recent Activity */}
      <div className="bg-linear-to-br from-white to-orange-50 rounded-2xl p-5 shadow-xl border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
            <Icon icon="mdi:clock-fast" className="text-white text-xl" />
          </div>
          <h4 className="text-md font-bold text-gray-800">Recent Activity</h4>
        </div>
        <ul className="space-y-3">
          {recentActivities.map((r, idx) => {
            const colors = [
              { bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
              { bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
              { bg: 'bg-purple-50', border: 'border-purple-200', dot: 'bg-purple-500' }
            ];
            const color = colors[idx % 3];
            
            return (
              <li key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${color.bg} border ${color.border} shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className={`w-2 h-2 ${color.dot} rounded-full mt-2 shadow-sm`} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-800">{r.label}</p>
                    <p className="text-xs text-gray-500 font-medium">{r.timeAgo}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{r.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Top Performers */}
      <div className="bg-linear-to-br from-white to-yellow-50 rounded-2xl p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-md">
            <Icon icon="mdi:trophy" className="text-white text-xl" />
          </div>
          <h4 className="text-md font-bold text-gray-800">Top Performers</h4>
        </div>
        <ul className="space-y-3">
          {topPerformers.map((p, idx) => {
            const medals = ['🥇', '🥈', '🥉','7th'];
            return (
              <li key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-white to-yellow-50 border border-yellow-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-black">{medals[idx]}</div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${p.avatarColor ?? "bg-gray-400"}`}>
                    {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-500">Score: {p.score}%</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                  {p.score}%
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick Status / Summary */}
      <div className="bg-linear-to-br from-white to-indigo-50 rounded-2xl p-5 shadow-xl border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-md">
            <Icon icon="mdi:lightbulb-on" className="text-white text-xl" />
          </div>
          <h4 className="text-md font-bold text-gray-800">Quick Summary</h4>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">You're doing great — keep up the steady improvement. Focus on Physics for the next 2 weeks to boost your average.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-linear-to-br from-green-50 to-green-100 p-3 rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-1 mb-1">
              <Icon icon="mdi:calendar-clock" className="text-green-600 text-sm" />
              <p className="text-xs text-green-700 font-semibold">Next Test</p>
            </div>
            <p className="text-sm font-bold text-gray-800">Unit Test - Physics</p>
            <p className="text-xs text-gray-600 mt-1 font-medium">Sep 5, 2025</p>
          </div>
          <div className="bg-linear-to-br from-red-50 to-red-100 p-3 rounded-xl border-2 border-red-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-1 mb-1">
              <Icon icon="mdi:alert-circle" className="text-red-600 text-sm" />
              <p className="text-xs text-red-700 font-semibold">Pending Assignments</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">1</p>
            <p className="text-xs text-gray-600 mt-1 font-medium">Due in 3 days</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
    </div>
  );
}
