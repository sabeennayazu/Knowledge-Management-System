import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";

interface StudentAttendance {
  id: number;
  name: string;
  status: "present" | "absent";
  totalPresentDays: number;
  totalAbsentDays: number;
  schoolName: string;
  grade: string;
  date: string;
  hasMarked?: boolean;
}

interface SchoolGradeData {
  schoolName: string;
  totalStudents: number;
  noOfPresent: number;
  noOfAbsent: number;
  week: number;
  status: string;
}

/* -------------------------
   Dummy data generator
   ------------------------- */
const generateStudentData = (): StudentAttendance[] => {
  const schools = [
    "Starlight Academy",
    "Green Valley School",
    "Vidya Niketan",
    "Silver Oak High",
    "Christ Academy",
    "Acharya Institute",
    "Durbar High School",
    "Crescent Public School",
  ];

  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
  ];
  const dates = ["11/13/2025", "11/12/2025"];

  const firstNames = [
    "Kartik", "Kishore", "Anushray", "Kristina", "Pradesha", "Smit", "Samidha", "Samridhi", "Nikita",
    "Rahul", "Priya", "Aakash", "Sneha", "Vikram", "Isha", "Arjun", "Divya", "Rohan"
  ];

  const lastNames = [
    "Sharma", "Pandey", "Khanal", "Shrestha", "Nepal", "Jal", "Raul", "Baui", "Shark",
    "Singh", "Verma", "Patel", "Gupta", "Kumar", "Devi", "Malik", "Rao", "Desai"
  ];

  const data: StudentAttendance[] = [];
  let id = 1;

  schools.forEach((school) => {
    grades.forEach((grade) => {
      const studentCount = Math.floor(Math.random() * 5) + 8; // 8-12 students per grade per school

      for (let i = 0; i < studentCount; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        dates.forEach((date) => {
          data.push({
            id: id++,
            name: `${firstName} ${lastName}`,
            status: Math.random() > 0.3 ? "present" : "absent",
            totalPresentDays: Math.floor(Math.random() * 30) + 20,
            totalAbsentDays: Math.floor(Math.random() * 20) + 5,
            schoolName: school,
            grade: grade,
            date: date,
            hasMarked: false,
          });
        });
      }
    });
  });

  return data;
};

const allStudentData = generateStudentData();

/* -------------------------
   Component
   ------------------------- */
export default function PartnerAttendance() {
  // UI states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("11/13/2025");
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>("Grade 1");
  const [openMenuFor, setOpenMenuFor] = useState<number | null>(null);

  // When a school is selected we first show the Grade Table (option A).
  // showGradeSelection = true means show the Grade list (Grade 1-10).
  const [showGradeSelection, setShowGradeSelection] = useState(false);

  // Attendance records state (preserve logic)
  const [attendanceRecords, setAttendanceRecords] = useState(
    allStudentData.map((student) => ({ ...student }))
  );

  const location = useLocation();

  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
  ];

  /* -------------------------
     Attendance click handler
     (preserve original behavior)
     ------------------------- */
  const handleAttendanceClick = (id: number, type: "present" | "absent") => {
    setAttendanceRecords((prev: any[]) =>
      prev.map((student: any) => {
        if (student.id !== id) return student;

        // First time marking attendance
        if (!student.hasMarked) {
          if (type === "present") {
            return {
              ...student,
              status: "present",
              hasMarked: true,
              totalPresentDays: student.totalPresentDays + 1,
            };
          } else {
            return {
              ...student,
              status: "absent",
              hasMarked: true,
              totalAbsentDays: student.totalAbsentDays + 1,
            };
          }
        }

        // Already marked, switching status
        if (student.status === type) return student; // Same button clicked

        // Switch from present to absent
        if (student.status === "present" && type === "absent") {
          return {
            ...student,
            status: "absent",
            totalPresentDays: Math.max(0, student.totalPresentDays - 1),
            totalAbsentDays: student.totalAbsentDays + 1,
          };
        }

        // Switch from absent to present
        if (student.status === "absent" && type === "present") {
          return {
            ...student,
            status: "present",
            totalAbsentDays: Math.max(0, student.totalAbsentDays - 1),
            totalPresentDays: student.totalPresentDays + 1,
          };
        }

        return student;
      })
    );
  };

  /* -------------------------
     School names (unique)
     ------------------------- */
  const schoolNames = useMemo(() => {
    return Array.from(new Set(attendanceRecords.map((s: any) => s.schoolName)));
  }, [attendanceRecords]);

  /* -------------------------
     Schools Table Data
     (top-level table)
     ------------------------- */
  const getSchoolsTableData = useMemo(() => {
    return schoolNames.map((school: string) => {
      const schoolStudents = attendanceRecords.filter(
        (s: any) => s.schoolName === school && s.grade === "Grade 1" && s.date === selectedDate
      );
      const presentCount = schoolStudents.filter((s: any) => s.status === "present").length;
      const absentCount = schoolStudents.filter((s: any) => s.status === "absent").length;

      return {
        schoolName: school,
        totalStudents: attendanceRecords.filter((s: any) => s.schoolName === school && s.date === selectedDate).length,
        noOfPresent: attendanceRecords.filter((s: any) => s.schoolName === school && s.date === selectedDate && s.status === "present").length,
        noOfAbsent: attendanceRecords.filter((s: any) => s.schoolName === school && s.date === selectedDate && s.status === "absent").length,
        week: Math.floor(Math.random() * 5) + 1,
        status: [
          "First Module Introduction",
          "Components of IoT",
          "Worked on small Project",
          "Presentation of Project",
          "Grading of the Project",
        ][Math.floor(Math.random() * 5)],
      } as SchoolGradeData;
    });
  }, [schoolNames, attendanceRecords, selectedDate]);

  /* -------------------------
     Grade table data for the selected school
     (shown right after a school click)
     ------------------------- */
  const gradeSummaryForSelectedSchool = useMemo(() => {
    if (!selectedSchool) return [];

    return grades.map((grade) => {
      const gradeStudents = attendanceRecords.filter(
        (s: any) => s.schoolName === selectedSchool && s.grade === grade && s.date === selectedDate
      );

      const presentCount = gradeStudents.filter((s: any) => s.status === "present").length;
      const absentCount = gradeStudents.filter((s: any) => s.status === "absent").length;

      return {
        grade,
        totalStudents: gradeStudents.length,
        presentCount,
        absentCount,
        week: Math.floor(Math.random() * 5) + 1,
        status: [
          "First Module Introduction",
          "Components of IoT",
          "Worked on small Project",
          "Presentation of Project",
          "Grading of the Project",
        ][Math.floor(Math.random() * 5)],
      };
    });
  }, [selectedSchool, attendanceRecords, selectedDate]);

  /* -------------------------
     Filtered students for the selected school+grade+date
     (students table)
     ------------------------- */
  const filteredStudents = useMemo(() => {
    return attendanceRecords.filter(
      (s: any) =>
        (!selectedSchool || s.schoolName === selectedSchool) &&
        (!selectedGrade || s.grade === selectedGrade) &&
        s.date === selectedDate
    );
  }, [attendanceRecords, selectedSchool, selectedGrade, selectedDate]);

  /* -------------------------
     Sidebar items (kept as-is)
     ------------------------- */
  const sidebarItems = [
    { label: "Dashboard", path: "/partner_dashboard", icon: "iconamoon:home-duotone" },
    { label: "Assigned Schools", path: "/partner_dashboard/assigned_schools", icon: "teenyicons:school-outline" },
    { label: "Attendance", path: "/partner_dashboard/attendance", icon: "mingcute:calendar-2-line" },
    { label: "Assignment Management", path: "/partner_dashboard/assignment_management", icon: "hugeicons:assignments" },
    { label: "Progress Report", path: "/partner_dashboard/progress_report", icon: "heroicons:chart-bar" },
    { label: "Leaderboard", path: "/partner_dashboard/leaderboard", icon: "mdi:trophy-outline" },
    { label: "Salary + Commission", path: "/partner_dashboard/salary_commission", icon: "carbon:money" },
    { label: "Component Reports", path: "/partner_dashboard/component_reports", icon: "mdi:file-chart-outline" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar - Desktop */}
      <aside className="w-60 fixed left-0 top-0 bottom-0 bg-[#438582] p-4 flex flex-col shadow-xl z-20">
        <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>
        <nav className="flex-1 space-y-6 py-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${active
                  ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                  : "bg-transparent text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"
                }`}
              >
                <Icon icon={item.icon} width={22} />
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

      {/* Navbar + Main */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">
        

        {/* Filters (Date always visible) */}
        <div className="mb-8 bg-[#fffdf4] rounded-xl p-5">
          <div className="flex flex-wrap items-center gap-6">
            {/* Date Filter */}
            <div className="flex flex-col">
              <label className="text-md font-medium text-black mb-1">Date</label>
              <div className="relative inline-block">
                <input
                  type="date"
                  value={selectedDate.split("/").reverse().join("-")}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-");
                    setSelectedDate(`${month}/${day}/${year}`);
                  }}
                  className="px-3 py-2 text-sm border border-black bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-black text-black"
                  style={{ width: "auto", minWidth: "130px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------
            Top-level Schools Table
           ------------------------- */}
        {!selectedSchool && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#DDFFE7]">
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">S.N.</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">School Name</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Total Student</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">No of Present</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">No of Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {getSchoolsTableData.map((school: SchoolGradeData, index: number) => (
                    <tr
                      key={school.schoolName}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedSchool(school.schoolName);
                        setShowGradeSelection(true); // show grades first (Option A)
                        setSelectedGrade(null); // wait for user to pick a grade
                      }}
                    >
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-700 font-medium">{school.schoolName}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{school.totalStudents}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{school.noOfPresent}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{school.noOfAbsent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------------
            Grade Table (shown right after a school is clicked)
           ------------------------- */}
        {selectedSchool && showGradeSelection && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedSchool} 
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    // Back to school list
                    setSelectedSchool(null);
                    setShowGradeSelection(false);
                    setSelectedGrade("Grade 1");
                  }}
                  className="text-sm text-[#3A7D7D] hover:text-[#2A6D6D] cursor-pointer font-medium flex items-center gap-1"
                >
                  <Icon icon="mdi:arrow-left" width={18} />
                  Back
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#DDFFE7]">
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">S.N.</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Class</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Total Student</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">No. of Present</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">No. of Absent</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Week</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Ongoing Lecture</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeSummaryForSelectedSchool.map((g, idx) => (
                    <tr
                      key={g.grade}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedGrade(g.grade);
                        setShowGradeSelection(false); // hide grade list and show students table
                      }}
                    >
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600">{idx + 1}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-700 font-medium">{g.grade}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{g.totalStudents}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{g.presentCount}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{g.absentCount}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{g.week}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-700">{g.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------------
            Students Table (shown when a grade is selected)
           ------------------------- */}
        {selectedSchool && !showGradeSelection && selectedGrade && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedSchool} - {selectedGrade} Attendance
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    // go back to grade selection
                    setShowGradeSelection(true);
                    setSelectedGrade(null);
                  }}
                  className="text-sm text-[#3A7D7D] hover:text-[#2A6D6D] cursor-pointer font-medium flex items-center gap-1"
                >
                  <Icon icon="mdi:arrow-left" width={18} />
                  Back to Grades
                </button>

                <button
                  onClick={() => {
                    // back to school list
                    setSelectedSchool(null);
                    setShowGradeSelection(false);
                    setSelectedGrade("Grade 1");
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer font-medium flex items-center gap-1"
                >
                  <Icon icon="mdi:home" width={18} />
                  Schools
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">S.N.</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Total Present Days</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">Total Absent Days</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-700 font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-center">
                        {/* If not marked yet → show two buttons */}
                        {!student.hasMarked ? (
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleAttendanceClick(student.id, "present")}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-semibold"
                            >
                              <Icon icon="mdi:check" className="text-sm" />
                              Present
                            </button>

                            <button
                              onClick={() => handleAttendanceClick(student.id, "absent")}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-semibold"
                            >
                              <Icon icon="mdi:close" className="text-sm" />
                              Absent
                            </button>
                          </div>
                        ) : (
                          /* Marked → show selected button + menu */
                          <div className="relative flex items-center justify-center gap-2">
                            {/* Selected Button */}
                            <button
                              className={`flex items-center gap-1 px-3 py-1.5 text-white rounded-full text-xs font-semibold ${student.status === "present" ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                              <Icon
                                icon={student.status === "present" ? "mdi:check" : "mdi:close"}
                                className="text-sm"
                              />
                              {student.status === "present" ? "Present" : "Absent"}
                            </button>

                            {/* Three Dot Menu Toggle */}
                            <button
                              onClick={() =>
                                setOpenMenuFor(openMenuFor === student.id ? null : student.id)
                              }
                              className="p-1 rounded-full hover:bg-gray-200"
                            >
                              <Icon icon="mdi:dots-vertical" className="text-gray-600 text-xl" />
                            </button>

                            {/* Dropdown Menu */}
                            {openMenuFor === student.id && (
                              <div className="absolute right-0 mt-10 bg-white border shadow-md rounded-lg py-1 w-28 z-20">
                                {student.status !== "present" && (
                                  <button
                                    onClick={() => {
                                      handleAttendanceClick(student.id, "present");
                                      setOpenMenuFor(null);
                                    }}
                                    className="w-full text-black text-left px-3 py-2 hover:bg-gray-200 text-sm"
                                  >
                                    Present
                                  </button>
                                )}

                                {student.status !== "absent" && (
                                  <button
                                    onClick={() => {
                                      handleAttendanceClick(student.id, "absent");
                                      setOpenMenuFor(null);
                                    }}
                                    className="w-full text-black text-left px-3 py-2 hover:bg-gray-100 text-sm"
                                  >
                                    Absent
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{student.totalPresentDays}</td>
                      <td className="px-4 py-3 text-xs md:text-sm text-gray-600 text-center">{student.totalAbsentDays}</td>
                    </tr>
                  ))}

                  {/* if no students */}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                        No students found for {selectedGrade} on {selectedDate}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
