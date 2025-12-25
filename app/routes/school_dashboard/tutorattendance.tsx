
// tutor.tsx
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router"; // user asked not to use react-router-dom
import { Icon } from "@iconify/react";

function Sidebar({ locationPath }: { locationPath: string }) {
  const sidebarItems = [
    { label: "Dashboard", path: "/school_dashboard", icon: "iconamoon:home-duotone" },
    { label: "Attendance", path: "/school_dashboard/attendance", icon: "mingcute:calendar-2-line" },
    { label: "Tutor", path: "/school_dashboard/tutor", icon: "fluent-emoji-high-contrast:teacher" },
  ];

  return (
    <aside className="hidden md:flex w-[220px] flex-col bg-[#3A7D7D] p-4">
      <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => (
          <Link key={item.label} to={item.path} className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:bg-white hover:text-[#3A7D7D]">
            <Icon icon={item.icon} width={22} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default function TutorPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const preselectedTutorId = query.get("tutorId") ? Number(query.get("tutorId")) : null;

  // Dummy same data set as in grades.tsx
  const tutors = [
    { id: 1, name: "Sulabh Neupane" },
    { id: 2, name: "Rina Thapa" },
    { id: 3, name: "Anil Sharma" },
  ];

  const makeStudents = (gradeLabel: string, startId: number) => {
    const names = ["Kartik Sharma", "Kishore Pandey", "Anubhav Khanal", "Kristina Shrestha", "Pratistha Shrestha"];
    return names.map((n, idx) => ({ id: `${gradeLabel}-${startId + idx}`, name: n, status: Math.random() > 0.4 ? "present" : "absent", totalPresentDays: Math.floor(Math.random() * 20) + 5, totalAbsentDays: Math.floor(Math.random() * 10) + 1 }));
  };

  const gradesData = [
    { id: "g1", grade: "Grade 1", tutorId: 1, students: makeStudents("g1", 1) },
    { id: "g2", grade: "Grade 2", tutorId: 2, students: makeStudents("g2", 6) },
    { id: "g3", grade: "Grade 3", tutorId: 1, students: makeStudents("g3", 11) },
    { id: "g4", grade: "Grade 4", tutorId: 3, students: makeStudents("g4", 16) },
    { id: "g5", grade: "Grade 5", tutorId: 2, students: makeStudents("g5", 21) },
  ];

  const [selectedDate, setSelectedDate] = useState("2025-11-11");
  const [selectedTutor, setSelectedTutor] = useState<number | null>(preselectedTutorId || null);

  // Which grades taught by selected tutor
  const taughtGrades = useMemo(() => {
    if (!selectedTutor) return [] as typeof gradesData;
    return gradesData.filter((g) => g.tutorId === selectedTutor);
  }, [selectedTutor]);

  const getTutorName = (id: number) => tutors.find((t) => t.id === id)?.name || "-";

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      <Sidebar locationPath={location.pathname} />

      <main className="flex-1 p-8 bg-[#fdfbf0]">
        <div className="flex justify-between items-center mb-8 px-4 md:px-10 gap-4">
          <div className="relative flex-1 md:w-[900px]">
            <input type="search" placeholder="Search" className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm focus:outline-none text-gray-600" />
            <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-[#999999] text-lg" />
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            <button className="relative">
              <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-2xl md:text-3xl" />
              <span className="absolute top-0 right-0 w-3 h-3  bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-[#fffdf4] rounded-xl p-5">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col">
              <label className="text-md font-medium text-black mb-1">Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-3 py-2 text-sm border rounded-xl bg-white" />
            </div>

            <div className="flex flex-col">
              <label className="text-md font-medium text-black mb-1">Tutor</label>
              <select value={selectedTutor ?? ""} onChange={(e) => setSelectedTutor(e.target.value ? Number(e.target.value) : null)} className="px-3 py-2 text-sm border rounded-xl bg-white">
                <option value="">Select Tutor</option>
                {tutors.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutor summary: shows the grades this tutor teaches */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#DDFFE7]">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">S.N.</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Today's Attendance</th>
                  <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">No.of Present Days</th>
                  <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">No.of Absent Days</th>
                </tr>
              </thead>
              <tbody>
                {taughtGrades.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No grades found for selected tutor.</td>
                  </tr>
                ) : (
                  taughtGrades.map((g, i) => {
                    const presentCount = g.students.filter((s) => s.status === "present").length;
                    const absentCount = g.students.filter((s) => s.status === "absent").length;
                    const todaysStatus = presentCount >= absentCount ? "Present" : "Absent";

                    return (
                      <tr key={g.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs md:text-sm text-gray-600">{i + 1}.</td>
                        <td className="px-4 py-3 text-xs md:text-sm text-gray-700 font-medium">{g.grade}</td>
                        <td className="px-4 py-3 text-center text-xs md:text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${todaysStatus === "Present" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>{todaysStatus}</span>
                        </td>
                        <td className="px-4 py-3 text-xs md:text-sm text-center">{presentCount}</td>
                        <td className="px-4 py-3 text-xs md:text-sm text-center">{absentCount}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}


