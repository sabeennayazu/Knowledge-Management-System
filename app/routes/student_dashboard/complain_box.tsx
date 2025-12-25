import { useNavigate, useLocation, Link } from "react-router";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function StudentTaskPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"complaint" | "resolved">("complaint");

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} />,
    },
    {
      label: "Attendance",
      icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} />,
    },
    {
      label: "Learning Material",
      icon: <Icon icon="fluent:learning-app-24-regular" width={24} height={24} />,
    },
    {
      label: "Task",
      icon: <Icon icon="hugeicons:task-02" width={24} height={24} />,
    },
    {
      label: "Examination",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      label: "Progress",
      icon: (
        <Icon
          icon="streamline-plump:graph-bar-increase-solid"
          width={24}
          height={24}
        />
      ),
    },
    {
      label: "Complain Box",
      icon: (
        <Icon
          icon="streamline-freehand:customer-action-complaint"
          width={24}
          height={24}
        />
      ),
    },
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

  type SidebarLabel = keyof typeof routeMap;

  return (
    <div className="flex bg-[#fdfbf0]">

      {/* SIDEBAR */}
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

      {/* TOP NAVBAR */}
      <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10">
        <div className="flex justify-between items-center px-10 py-6">

          {/* Search */}
          <div className="relative w-[900px]">
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm text-gray-600"
            />
            <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-[#999]" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-3xl" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
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

      {/* MAIN CONTENT */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen bg-[#fdfbf0] w-[calc(100%-240px)]">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Submit a Complaint</h1>

        {/* TABS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setActiveTab("complaint")}
            className={`px-6 py-2 rounded-lg border ${
              activeTab === "complaint"
                ? "bg-white text-black border-black"
                : "bg-[#2D8F78] text-white"
            }`}
          >
            Complaint
          </button>

          <button
            onClick={() => setActiveTab("resolved")}
            className={`px-6 py-2 rounded-lg border ${
              activeTab === "resolved"
                ? "bg-white text-black border-gray-300"
                : "bg-[#2D8F78] text-white"
            }`}
          >
            Resolved
          </button>
        </div>

        {/* Complaint Form */}
        {activeTab === "complaint" && (
          <div className="bg-[#FFFBEA] p-6 rounded-2xl shadow-lg mt-6 border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800">
              Describe Your Complaint
            </h2>

            <textarea
              placeholder="Write your issue in detail..."
              className="w-full h-64 p-4 mt-4 text-black border border-gray-300 shadow-md rounded-xl bg-white"
            />

            <div className="flex justify-end gap-4 mt-4">
              <button className="text-black border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 border-gray-500">
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#2D8F78] hover:bg-[#32796a] text-white rounded-lg shadow-lg">
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Resolved Section */}
        {activeTab === "resolved" && (
          <div className="bg-[#FFFBEA] p-6 rounded-2xl shadow-lg mt-6 border border-gray-300">
            <div className="bg-white p-4 rounded-xl border">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Technical Issue with Robotics Module
                </h2>
                <div className="text-sm text-gray-500">2025-01-08 14:30</div>
              </div>

              <p className="text-gray-700 mt-2">
                The robotics simulation software keeps crashing during the exercise.
              </p>

              <h3 className="font-semibold mt-4">Admin Reply:</h3>

              <div className="bg-[#D9F6DD] p-4 rounded-2xl mt-3 border-l-8 border-b-4 border-[#2D8F78]">
                <div className="flex justify-between">
                  <p className="font-semibold text-black text-sm">Admin</p>
                  <div className="text-sm text-gray-500">2025-01-08 15:00</div>
                </div>

                <p className="mt-1 text-gray-700">
                  Thank you for reporting this issue. Our team is working on it.
                </p>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
