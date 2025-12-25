import React, { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router";


// Grades list for dropdown (FIX ADDED)
const grades = [
  "Grade 1","Grade 2","Grade 3","Grade 4","Grade 5",
  "Grade 6","Grade 7","Grade 8","Grade 9","Grade 10"
];

// Grades 1–5 With Random Attendance
const generateGradesData = () => {
  return Array.from({ length: 10 }, (_, i) => {
    const grade = i + 1;
    const totalStudents = Math.floor(Math.random() * 100) + 140;
    const present = Math.floor(totalStudents * (Math.random() * 0.3 + 0.85));
const absent = Math.max(0, totalStudents - present);
    return {
      grade,
      total: totalStudents,
      present,
      absent,
      week: grade,
      lecture: ["First Module Introduction", "Components of IoT", "Worked on small Project", "Presentation of Project", "Grading of the Project","ok","ok","ok","ok","ok"][i],
    };
  });
};

// 10 Students Per Grade
const generateStudentsData = () => {
  const firstNames = ["Karthik", "Kishore", "Anushray", "Kristina", "Pradesha", "Smit", "Samidha", "Samridhi", "Nikita", "Rahul"];
  const lastNames = ["Sharma", "Pandey", "Khanal", "Shrestha", "Nepal", "Jal", "Raul", "Baui", "Shark", "Singh"];

  return Array.from({ length: 10 }, (_, i) => {
    const firstName = firstNames[i];
    const lastName = lastNames[i];
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      today: Math.random() > 0.3 ? "Present" : "Absent",
      presentDays: Math.floor(Math.random() * 10) + 5,
      absentDays: Math.floor(Math.random() * 5) + 1,
    };
  });
};

const gradesData = generateGradesData();
const studentsData = generateStudentsData();

export default function GradesAttendance() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("11/11/2025");
  const [selectedClass, setSelectedClass] = useState("Grade 1");
  const location = useLocation();
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Sidebar Items
  const sidebarItems = [
    { label: "Dashboard", icon: <Icon icon="iconamoon:home-duotone" width={24} /> },
    { label: "Attendance", icon: <Icon icon="mingcute:calendar-2-line" width={24} /> },
    { label: "Tutor", icon: <Icon icon="fluent-emoji-high-contrast:teacher" width={24} /> },
    { label: "Examination", icon: <Icon icon="mdi:file-document-edit-outline" width={24} /> },
    { label: "Invoice", icon: <Icon icon="streamline-ultimate:cash-payment-bills-bold" width={24} /> },
    { label: "Complain Box", icon: <Icon icon="streamline-freehand:customer-action-complaint" width={24} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">

       {/* Sidebar - Desktop */}
            <aside className="hidden md:flex w-[220px] flex-col bg-[#3A7D7D] fixed top-0 left-0 h-screen p-4">
              <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>
              <nav className="flex-1 space-y-4">
                {sidebarItems.map((item, index) => {
                  const routeMap: Record<string, string> = {
                    "Dashboard": "/school_dashboard",
                    "Attendance": "/school_dashboard/attendance",
                    "Tutor": "/school_dashboard/tutor",
                    "Examination": "/school_dashboard/examination",
                    "Invoice": "/school_dashboard/invoice",
                    "Complain Box": "/school_dashboard/complain_box",
                  };
                  return (
                    <Link
                      key={item.label}
                      to={routeMap[item.label] || "#"}
className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200                                 ${location.pathname === routeMap[item.label]
                          ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                          : "bg-transparent text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"}`}
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
                onClick={() => {
                  localStorage.removeItem('authToken');
                }}
              >
                <Icon icon="ri:logout-circle-line" className="text-lg" />
                Log Out
              </Link>
            </aside>
      
            {/* Sidebar - Mobile */}
            {isMobileSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
                onClick={() => setIsMobileSidebarOpen(false)}
              ></div>
            )}
       {/* NAVBAR */}
             <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10">
               <div className="flex justify-between items-center px-10 py-6">
                 <div className="relative w-[900px]">
                   <input
                     type="search"
                     placeholder="Search"
                     className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm text-gray-600"
                   />
                   <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-[#999999] text-lg" />
                 </div>
       
                 <div className="flex items-center space-x-6">
                   <button className="relative">
                     <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-3xl" />
                     <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
                   </button>
       
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

      {/* MAIN CONTENT */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

        


        {/* ----------- GRADE LIST PAGE (LEFT IMAGE) ----------- */}
        {!selectedGrade && (
          <div>

            {/* SMALL FILTER BAR */}
<div className="flex flex-col md:flex-row justify-between items-end w-full gap-6 mb-8">

  {/* DATE */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-black mb-2">Date</label>
    <input
      type="date"
      value={selectedDate.split("/").reverse().join("-")}
      onChange={(e) => {
        const [year, month, day] = e.target.value.split("-");
        setSelectedDate(`${month}/${day}/${year}`);
      }}
      className="border border-gray-300 rounded-lg bg-white text-black px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3A7D7D]"
    />
  </div>

  {/* TUTOR */}
  <div className="flex items-center pr-10">
    <Icon icon="iconamoon:profile-light" className="text-gray-500" width={24} />
    <p className="text-black pl-2">Mr. Ram Bahadur</p>
  </div>

</div>



            <div className="bg-white rounded-xl border border-gray-300 pb-4">

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-black text-sm">
                  <thead>
                    <tr className="bg-[#DDFFE7] rounded-xl">
                      <th className="px-4 py-3 font-semibold">S.N.</th>
                      <th className="px-4 py-3 font-semibold">Class</th>
                      <th className="px-4 py-3 font-semibold text-center">Total Student</th>
                      <th className="px-4 py-3 font-semibold text-center">No of Present</th>
                      <th className="px-4 py-3 font-semibold text-center">No of Absent</th>
                      <th className="px-4 py-3 font-semibold text-center">Week</th>
                      <th className="px-4 py-3 font-semibold">Ongoing Lecture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradesData.map((g, index) => (
                      <tr
                        key={g.grade}
                        className="border-b border-gray-200  hover:bg-gray-50 cursor-pointer transition"
                        onClick={() => setSelectedGrade(g.grade)}
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium">Grade {g.grade}</td>
                        <td className="px-4 py-3 text-center">{g.total}</td>
                        <td className="px-4 py-3 text-center">{g.present}</td>
                        <td className="px-4 py-3 text-center">{g.absent}</td>
                        <td className="px-4 py-3 text-center">{g.week}</td>
                        <td className="px-4 py-3">{g.lecture}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ----------- SPECIFIC GRADE PAGE (RIGHT IMAGE) ----------- */}
        {selectedGrade && (
          <div>

            {/* TOP FILTER ROW */}
            <div className="flex justify-between">

              <div className="flex gap-4">

                {/* DATE INPUT */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-black mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate.split("/").reverse().join("-")}
                    onChange={(e) => {
                      const [year, month, day] = e.target.value.split("-");
                      setSelectedDate(`${month}/${day}/${year}`);
                    }}
                    className="border border-gray-300 rounded-lg bg-white text-black px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3A7D7D]"
                  />
                </div>

                {/* CLASS SELECT — FIXED */}
                <div className="relative inline-block">
                  <label className="text-sm font-medium text-black mb-2 block">Class</label>

                  <select
                    value={selectedGrade}
                    onChange={(e) =>
                      setSelectedGrade(Number(e.target.value)) // FIXED
                    }
                    className="appearance-none px-3 py-2 pr-8 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-black text-black"
                    style={{ width: "auto", minWidth: "130px" }}
                  >
                    {grades.map((grade) => (
                      <option
                        key={grade}
                        value={grade.replace("Grade ", "")} // FIXED
                      >
                        {grade}
                      </option>
                    ))}
                  </select>

                  {/* Custom dropdown icon */}
                  <Icon
                    icon="nrk:arrow-dropdown"
                    className="absolute right-2 top-10 text-black text-lg pointer-events-none"
                  />
                </div>

              </div>

              {/* STATUS FILTER */}
              <div className="pr-8">
                <label className="text-sm text-center font-medium text-black mb-2 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg bg-white text-black px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3A7D7D]"
                >
                  <option>All Status</option>
                  <option>Present</option>
                  <option>Absent</option>
                </select>
              </div>
            </div>


            {/* CARD */}
            <div className="bg-white  rounded-xl mt-8 py-4 border border-gray-300">

             {/* HEADER */}
<div className="flex flex-col md:flex-row justify-between items-center px-4 gap-4 pb-4">

  {/* LEFT SECTION */}
  <div className="flex items-center gap-6">
    
    <h2 className="text-lg font-bold text-black">
      Grade - {selectedGrade}
    </h2>

    {/* Tutor */}
    <div className="flex items-center gap-2">
      <Icon icon="iconamoon:profile-light" className="text-gray-500" width={24} />
      <p className="text-black">Mr. Ram Bahadur</p>
    </div>
  </div>

  {/* BACK BUTTON */}
  <button
    className="flex items-center gap-1 text-[#3A7D7D] font-medium text-sm hover:text-[#2A6D6D]"
    onClick={() => setSelectedGrade(null)}
  >
    <Icon icon="mdi:arrow-left" width={18} />
    Back
  </button>
</div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-black text-sm">
                  <thead>
                    <tr className="bg-[#DDFFE7]">
                      <th className="px-4 py-3 font-semibold">S.N.</th>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold text-center">Today's Attendance</th>
                      <th className="px-4 py-3 font-semibold text-center">No. of Present Days</th>
                      <th className="px-4 py-3 font-semibold text-center">No. of Absent Days</th>
                    </tr>
                  </thead>

                  <tbody>
                    {studentsData
                      .filter((s) => {
                        if (statusFilter === "All Status") return true;
                        return s.today === statusFilter;
                      })
                      .map((s, index) => (
                        <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 font-medium">{s.name}</td>

                          {/* STATUS BADGE */}
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold 
                              ${s.today === "Present" ? "bg-green-500" : "bg-red-500"}`}
                            >
                              {s.today}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-center">{s.presentDays}</td>
                          <td className="px-4 py-3 text-center">{s.absentDays}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
