"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  BarChart,
  Calendar,
  Hash,
  GraduationCap,
  UserCheck,
  Timer,
} from "lucide-react";

// Fixed total planned classes (constant)
const TOTAL_DAYS = 45;

// Example dataset - once per week class
const studentsData = [
  {
    date: "2024-09-02",
    id: "STU-2023-011",
    class: "10A",
    status: "Present",
    checkIn: "02:30",
    checkOut: "04:00",
    hours: 1.5,
  },
  {
    date: "2024-09-09",
    id: "STU-2023-011",
    class: "10A",
    status: "Absent",
    checkIn: null,
    checkOut: null,
    hours: 0,
  },
  {
    date: "2024-09-16",
    id: "STU-2023-011",
    class: "10A",
    status: "Present",
    checkIn: "02:00",
    checkOut: "04:30",
    hours: 2.5,
  },
  {
    date: "2024-10-01",
    id: "STU-2023-011",
    class: "10A",
    status: "Present",
    checkIn: "03:00",
    checkOut: "05:00",
    hours: 2,
  },
];

export default function StudentAttendancePage() {
  const [date, setDate] = useState("2024-09-02");
  const [filter, setFilter] = useState("All");

  // Filter for table only (NOT for cards)
  let filteredData = studentsData;

  if (filter === "Monthly") {
    const month = date.slice(0, 7); // "YYYY-MM"
    filteredData = studentsData.filter((s) => s.date.startsWith(month));
  } else if (filter === "Yearly") {
    const year = date.slice(0, 4); // "YYYY"
    filteredData = studentsData.filter((s) => s.date.startsWith(year));
  } else {
    filteredData = studentsData.filter((s) => s.date === date);
  }

  // --- Summary Cards (always use full dataset) ---
  const classesSoFar = studentsData.length;
  const present = studentsData.filter((s) => s.status === "Present").length;
  const absent = studentsData.filter((s) => s.status === "Absent").length;
  const avgHours =
    studentsData.reduce((sum, s) => sum + s.hours, 0) /
    (studentsData.length || 1);
  const rate = studentsData.length
    ? ((present / studentsData.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center transition-shadow hover:shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Sabeen Nayazu</h1>
          <p className="text-gray-500">Student Attendance Dashboard</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mt-6">
        <Card
          title="Total Days"
          value={`${classesSoFar}/${TOTAL_DAYS}`}
          icon={<span>📅</span>}
        />
        <Card
          title="Present"
          value={present}
          icon={<CheckCircle className="text-green-500" />}
        />
        <Card
          title="Absent"
          value={absent}
          icon={<XCircle className="text-red-500" />}
        />
        <Card
          title="Avg Hours"
          value={`${avgHours.toFixed(1)}h`}
          icon={<Clock className="text-orange-500" />}
        />
        <Card
          title="Rate"
          value={`${rate}%`}
          icon={<BarChart className="text-purple-600" />}
        />
      </div>

   {/* Filters */}
<div className="flex justify-center mt-6">
  <div className="bg-white px-6 py-5 rounded-xl shadow-md w-full max-w-2xl">
    <div className="grid grid-cols-2 gap-4">
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setFilter("All"); // 👈 force dropdown to switch to "By Date"
        }}
        className="w-full border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="All">By Date</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div>
  </div>
</div>



      {/* Students Table */}
      <div className="mt-6 mb-6 pb-1 bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
        <div className="p-4 font-semibold text-blue-600">Student Info</div>
        <hr />

        {filteredData.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    <Hash className="h-4 w-4 text-blue-500" /> ID
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-green-500" /> Date
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4 text-indigo-500" /> Class
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    <UserCheck className="h-4 w-4 text-teal-500" /> Status
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-orange-500" /> Time
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4 text-pink-500" /> Hours
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((s) => (
                <tr
                  key={s.date}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{s.id}</td>
                  <td className="p-3">{s.date}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">
                    {s.status === "Present" ? (
                      <span className="text-green-600 font-medium">
                        Present
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Absent</span>
                    )}
                  </td>
                  <td className="p-3">
                    {s.checkIn ? `${s.checkIn} - ${s.checkOut}` : "--"}
                  </td>
                  <td className="p-3">{s.hours ? `${s.hours}h` : "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">No class</div>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center transition-shadow hover:shadow-lg">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}
