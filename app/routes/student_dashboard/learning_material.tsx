import React,{useState, useMemo} from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate} from "react-router";

interface UnitItem {
  id: number;
  title: string;
  duration: string;
  status: "completed" | "not_started";
  pdfUrl: string;
  videoUrl: string;
}

interface ChapterItem {
  id: number;
  chapterNumber: number;
  title: string;
  unlocked: boolean;
  newlyUnlocked: boolean;
  progress: number;
  unitsCount: number;
  units: UnitItem[];
  unlockedAt: string; // used for recently unlocked sorting
}

export default function LearningMaterial() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "recent">("asc");
  const [statusFilter, setStatusFilter] = useState<"all" | "unlocked" | "locked">("all");
  
 // ---------------------------
// 📘 Dummy Learning Materials Data
// ---------------------------

const ChapterItemData: ChapterItem[] = [
  {
    id: 1,
    chapterNumber: 1,
    title: "Introduction to Computer Basics",
    unlocked: true,
    newlyUnlocked: false,
    progress: 80,
    unitsCount: 3,
    unlockedAt: "2025-01-10T09:00:00Z",
    units: [
      {
        id: 1,
        title: "What is a Computer?",
        duration: "8 min",
        status: "completed",
        pdfUrl: "/pdf/unit1.pdf",
        videoUrl: "/videos/unit1.mp4",
      },
      {
        id: 2,
        title: "Types of Computers",
        duration: "12 min",
        status: "completed",
        pdfUrl: "/pdf/unit2.pdf",
        videoUrl: "/videos/unit2.mp4",
      },
      {
        id: 3,
        title: "Basic Components Overview",
        duration: "10 min",
        status: "not_started",
        pdfUrl: "/pdf/unit3.pdf",
        videoUrl: "/videos/unit3.mp4",
      },
    ],
  },

  {
    id: 2,
    chapterNumber: 2,
    title: "Operating System Fundamentals",
    unlocked: true,
    newlyUnlocked: true, // recently unlocked
    progress: 20,
    unitsCount: 4,
    unlockedAt: "2025-01-22T15:30:00Z",
    units: [
      {
        id: 1,
        title: "What is an Operating System?",
        duration: "6 min",
        status: "completed",
        pdfUrl: "/pdf/unit1.pdf",
        videoUrl: "/videos/unit1.mp4",
      },
      {
        id: 2,
        title: "User Interface Basics",
        duration: "14 min",
        status: "not_started",
        pdfUrl: "/pdf/unit2.pdf",
        videoUrl: "/videos/unit2.mp4",
      },
      {
        id: 3,
        title: "File Management",
        duration: "9 min",
        status: "not_started",
        pdfUrl: "/pdf/unit3.pdf",
        videoUrl: "/videos/unit3.mp4",
      },
      {
        id: 4,
        title: "System Settings Overview",
        duration: "7 min",
        status: "not_started",
        pdfUrl: "/pdf/unit4.pdf",
        videoUrl: "/videos/unit4.mp4",
      },
    ],
  },

  {
    id: 3,
    chapterNumber: 3,
    title: "Document Handling & Productivity Tools",
    unlocked: false,
    newlyUnlocked: false,
    progress: 0,
    unitsCount: 5,
    unlockedAt: "",
    units: [], // locked chapters have no unit access
  },

  {
    id: 4,
    chapterNumber: 4,
    title: "Internet & Email Essentials",
    unlocked: false,
    newlyUnlocked: false,
    progress: 0,
    unitsCount: 3,
    unlockedAt: "",
    units: [],
  },
];

  // Initialize chapters state
  const [chapters, setChapters] = useState<ChapterItem[]>(ChapterItemData);

  // Handler functions
  const handleSort = (order: "asc" | "desc" | "recent") => {
    setSortOrder(order);
  };

  const handleStatus = (status: "all" | "unlocked" | "locked") => {
    setStatusFilter(status);
  };

  // Memoized filtered chapters
  const filteredChapters = useMemo(() => {
    let result = [...chapters];

    // Filter by status
    if (statusFilter === "unlocked") {
      result = result.filter((ch) => ch.unlocked);
    } else if (statusFilter === "locked") {
      result = result.filter((ch) => !ch.unlocked);
    }

    // Sort
    if (sortOrder === "asc") {
      result.sort((a, b) => a.chapterNumber - b.chapterNumber);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.chapterNumber - a.chapterNumber);
    } else if (sortOrder === "recent") {
      result.sort((a, b) => {
        if (!a.unlockedAt || !b.unlockedAt) return 0;
        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
      });
    }

    return result;
  }, [chapters, statusFilter, sortOrder]);

   const sidebarItems = [
     { label: "Dashboard", icon: <Icon icon="iconamoon:home-duotone" width={24} /> },
     { label: "Attendance", icon: <Icon icon="mingcute:calendar-2-line" width={24} /> },
     { label: "Learning Material", icon: <Icon icon="fluent:learning-app-24-regular" width={24} /> },
     { label: "Task", icon: <Icon icon="hugeicons:task-02" width={24} /> },
     {
       label: "Examination",
       icon: (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

 <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

  

  {/* Filters */}
  <div className="flex gap-4 mb-8 flex-wrap">
    {/* Sort Dropdown */}
    <div className="relative">
      <button
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-gray-700"
        onClick={() => setSortOpen((prev) => !prev)}
      >
        Sort Chapters
        <Icon icon="mdi:chevron-down" />
      </button>

      {sortOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg text-black rounded-lg z-20 p-2 border border-gray-400 ">
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md"
            onClick={() => handleSort("asc")}
          >
            Ascending 
          </button>

          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md"
            onClick={() => handleSort("desc")}
          >
            Descending 
          </button>

          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md"
            onClick={() => handleSort("recent")}
          >
            Recently Unlocked
          </button>
        </div>
      )}
    </div>

    {/* Chapter Status Filter */}
    <div className="relative">
      <button
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-gray-700"
        onClick={() => setStatusOpen((prev) => !prev)}
      >
        Chapter Status
        <Icon icon="mdi:chevron-down" />
      </button>

      {statusOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg text-black z-20 p-2 border border-gray-400 ">
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => handleStatus("all")}
          >
            All Chapters
          </button>

          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => handleStatus("unlocked")}
          >
            Unlocked Only
          </button>

          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => handleStatus("locked")}
          >
            Locked Only
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Chapters */}
  <div className="grid grid-cols-1 gap-6">

    {filteredChapters.map((chapter) => {
      const isLocked = !chapter.unlocked;

      return (
        <div
          key={chapter.id}
          className={`relative bg-white rounded-2xl p-6 shadow-sm border border-gray-300 transition-all ${
            isLocked ? "opacity-50" : ""
          }`}
        >

          {/* Locked Icon */}
          {isLocked && (
            <Icon
              icon="mdi:lock"
              className="absolute top-4 right-5 text-gray-500"
              width={22}
            />
          )}

          {/* Status Tags */}
          {!isLocked && (
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#d4f8d4] text-[#2e7d32] border border-green-300 text-sm px-3 py-1 rounded-full">
                Unlocked
              </span>

              {chapter.newlyUnlocked && (
                <span className="bg-[#ffedc2] text-[#b7791f] border border-orange-300 text-sm px-3 py-1 rounded-full">
                  Newly Unlocked
                </span>
              )}
            </div>
          )}

          {/* Chapter Info */}
          <p className="text-sm text-gray-500">Chapter {chapter.chapterNumber}</p>
          <h2 className="text-xl font-semibold text-gray-800">{chapter.title}</h2>
          <div className="flex justify-between">

          <p className="text-sm text-gray-600">{chapter.unitsCount} Units</p>
          <p className="text-sm text-gray-600">{chapter.progress}% </p>
          </div>

          {/* Progress */}
          <div className="h-2 bg-gray-200 rounded-full mt-4">
            <div
              className={`h-2 rounded-full ${
                isLocked ? "bg-gray-300" : "bg-blue-500"
              }`}
              style={{ width: `${chapter.progress}%` }}
            ></div>
          </div>

          {/* Toggle Dropdown */}
          {!isLocked && (
            <button
              onClick={() =>
                setOpenChapter(openChapter === chapter.id ? null : chapter.id)
              }
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
            >
              <Icon
                icon={
                  openChapter === chapter.id ? "mdi:chevron-up" : "mdi:chevron-down"
                }
                width={26}
              />
            </button>
          )}

          {/* Units Dropdown */}
          {openChapter === chapter.id && (
            <div className="mt-6 border-t pt-6">

              {/* Progress title */}
              <p className="text-gray-800 font-semibold mb-2">Units</p>

             <div className="space-y-4">

  {chapter.units.map((unit, index) => (
    <div
      key={unit.id}
      className="flex justify-between items-center bg-gray-100 border border-gray-200 p-4 rounded-xl"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Unit Number */}
        <div className="w-10 h-10 bg-blue-100 text-blue-700 font-semibold rounded-xl flex items-center justify-center">
          {index + 1}
        </div>

        {/* Title + Icons */}
        <div className="flex gap-4 justify-center items-center">
  <p className="font-semibold text-center text-gray-900">{unit.title}</p>

  {/* Icons Row */}
  <div className="flex items-center gap-4 mt-1">

    {/* Video Icon */}
    <div
      className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg 
                 text-blue-500 transition-all duration-200 
                 hover:scale-110 hover:text-blue-900"
    >
      <Icon icon="ic:round-play-circle-filled" width={28} />
    </div>

    {/* PDF Icon (Eye / Document) */}
    <button
      className="flex items-center text-gray-600 transition-all duration-200 
                 hover:scale-110 hover:text-red-700"
    >
      <Icon icon="fluent:document-pdf-32-filled" width={26} />
    </button>

  </div>
</div>

      </div>

      {/* Status */}
      <span
        className={`font-semibold ${
          unit.status === "completed" ? "text-green-600" : "text-gray-500"
        }`}
      >
        {unit.status === "completed" ? "Completed" : "Not Started"}
      </span>
    </div>
  ))}

</div>


            </div>
          )}
        </div>
      );
    })}
  </div>

</main>


    </div>
  );
}
