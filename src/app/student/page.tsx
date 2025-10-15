"use client";

import { CalendarDays, ClipboardList, Clock } from "lucide-react";
import 'chart.js/auto';
import Link from "next/link";
import Notification from "./components/notification/page";

// Custom Circular Progress Component
const links = [
 
  { name: "Tasks", href: "/student/tasks"  },
  { name: "Exams", href: "/student/exams",  },
  { name: "Projects", href: "/student/projects" },
];
const CircularProgress = ({ value, color, unit }: { value: number; color: string; unit: string }) => {
  const radius = 40;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute inset-0" height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-800" style={{ transform: "translateX(-0.1cm)" }}>
        {value}{unit}
      </span>
    </div>
  );
};

// Simple Pie Chart Component
const SimplePieChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = 100;
  const centerY = 100;
  const radius = 80;

  let currentAngle = 0;
  const segments = data.map(item => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;
    const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    currentAngle += angle;

    return { pathData, color: item.color, name: item.name, value: item.value };
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {segments.map((segment, index) => (
          <path key={index} d={segment.pathData} fill={segment.color} stroke="white" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
};

export default function DashboardPage() {
  // Attendance numbers
  const workingDays = 100;
  const presentDays = 92;
  const absentDays = workingDays - presentDays;
  const attendancePercent = Math.round((presentDays / workingDays) * 100);

  // Stats row
  const stats = [
    { label: "Attendance", value: attendancePercent, color: "#22c55e", unit: "%" },
    { label: "Pending Assignments", value: 5, icon: <ClipboardList className="text-yellow-500 w-8 h-8" /> },
    { label: "Upcoming Exam", value: "Sep 15, 2025", icon: <CalendarDays className="text-blue-500 w-8 h-8" /> },
    { label: "Project Due", value: "Sep 20, 2025", icon: <Clock className="text-red-500 w-8 h-8" /> },
  ];

  // Attendance pie data
  const attendancePieData = [
    { name: "Present", value: presentDays, color: "#22c55e" },
    { name: "Absent", value: absentDays, color: "#ef4444" },
  ];

  // Next class info
  const nextClass = {
    day: "Wednesday",
    date: "Aug 28, 2025",
    subject: "IOT and Robotics",
    time: "10:00 AM - 11:00 AM",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
   
        <Notification/>
     

      <div className="space-y-8 p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, index) => {
        const link = links.find((l) => l.name === stat.label); // match by label
        return (
          <Link
            key={stat.label}
            href={link?.href ?? "#"} // fallback if no link found
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer p-6 flex flex-col items-center h-44 justify-center border border-white/20"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              {stat.label}
            </h3>
            {"color" in stat ? (
              <CircularProgress
                value={Number(stat.value)}
                color={stat.color ?? "#000"}
                unit={stat.unit ?? ""}
              />
            ) : (
              <div className="flex flex-col items-center space-y-2">
                {stat.icon}
                <span className="text-lg font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>
            )}
          </Link>
        );
      })}
        </div>

        {/* Attendance Overview */}
        <Link href="/student/attendance">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl p-8 border border-white/20">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Attendance Overview</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 relative">
              <div className="w-full h-full flex items-center justify-center relative bottom-4">
                <SimplePieChart data={attendancePieData} />
              </div>
              <div className="flex justify-center gap-4 mt-4 relative bottom-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Absent</span>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 text-gray-700 w-full">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center shadow-sm">
                <div className="text-sm font-medium text-gray-600">Working Days</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">{workingDays}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center shadow-sm">
                <div className="text-sm font-medium text-gray-600">Present Days</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">{presentDays}</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 text-center shadow-sm">
                <div className="text-sm font-medium text-gray-600">Absent Days</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">{absentDays}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 text-center shadow-sm">
                <div className="text-sm font-medium text-gray-600">Attendance</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">{attendancePercent}%</div>
              </div>
            </div>
          </div>
        </div>
        </Link>
        {/* Next Class */}
        <div className="bg-white/80 my-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-8 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Next Class</h3>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="text-gray-600 font-medium">{nextClass.day}, {nextClass.date}</div>
              <div className="text-2xl font-bold text-gray-800 mt-1">{nextClass.subject}</div>
              <div className="text-gray-500 mt-1">{nextClass.time}</div>
            </div>
            <CalendarDays className="w-12 h-12 text-blue-500 hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
