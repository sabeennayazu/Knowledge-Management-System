import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";


interface Complaint {
  id: number;
  title: string;
  category: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  submittedBy: string;
  date: string;
  status: "PENDING" | "IN PROGRESS" | "RESOLVED";
  description: string;
  conversation: Array<{
    author: string;
    message: string;
    date: string;
    isAdmin: boolean;
  }>;
}

export default function ComplainBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"from-student" | "to-admin" | "new-complaint">("from-student");
  const [showMyComplaints, setShowMyComplaints] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const location = useLocation();

  // Dummy data
  const complaintsFromStudent: Complaint[] = [
    {
      id: 1,
      title: "Technical Issue with Robotics Module",
      category: "Technical",
      priority: "HIGH",
      submittedBy: "Alex Johnson (Grade 9-I)",
      date: "2025-01-09",
      status: "PENDING",
      description: "The robotics simulation software keeps crashing during the programming exercise. I've tried refreshing multiple times but the issue persists.",
      conversation: [
        {
          author: "Admin",
          message: "Thank you for reporting this issue. Our IT team is looking into the robotics simulation problem.",
          date: "2025-01-08 14:30",
          isAdmin: true,
        },
      ],
    },
    {
      id: 2,
      title: "Difficulty Understanding 3D Design Assignment",
      category: "Academic",
      priority: "MEDIUM",
      submittedBy: "Emma Johnson",
      date: "2025-01-08",
      status: "RESOLVED",
      description: "The robotics simulation software keeps crashing during the programming exercise. I've tried refreshing multiple times but the issue persists.",
      conversation: [
        {
          author: "Admin",
          message: "Thank you for reporting this issue. Our IT team is looking into the robotics simulation problem.",
          date: "2025-01-08 14:30",
          isAdmin: true,
        },
      ],
    },
    {
      id: 3,
      title: "Tutor Not Available for Scheduled Session",
      category: "Scheduling",
      priority: "MEDIUM",
      submittedBy: "Marcus Wilson (Grade 8-A)",
      date: "2025-01-08",
      status: "PENDING",
      description: "My mathematics tutor didn't show up for our scheduled session yesterday. This is the second time this month.",
      conversation: [
        {
          author: "Admin",
          message: "Thank you for reporting this issue. Our IT team is looking into the robotics simulation problem.",
          date: "2025-01-08 14:30",
          isAdmin: true,
        },
      ],
    },
  ];

  const complaintsToAdmin: Complaint[] = [
    {
      id: 4,
      title: "Platform Performance Issues",
      category: "Technical",
      priority: "HIGH",
      submittedBy: "Admin",
      date: "2025-01-08",
      status: "IN PROGRESS",
      description: "Our students are experiencing frequent timeouts and slow loading times during peak hours (2-4 PM). This is affecting their learning experience.",
      conversation: [
        {
          author: "Admin",
          message: "We're upgrading server capacity and implementing CDN improvements. Expected completion by Jan 15th.",
          date: "2025-01-08 14:30",
          isAdmin: true,
        },
        {
          author: "You",
          message: "Thank you for the quick response. Can you provide an ETA for when this will be resolved?",
          date: "2025-01-08 15:45",
          isAdmin: false,
        },
        {
          author: "Admin",
          message: "We are currently testing the CDN implementation. Should be live by tomorrow morning. We'll send updates every 2 hours.",
          date: "2025-01-09 10:20",
          isAdmin: true,
        },
      ],
    },
    {
      id: 5,
      title: "Request for Additional Modules",
      category: "Feature Request",
      priority: "MEDIUM",
      submittedBy: "School Admin",
      date: "2025-01-03",
      status: "PENDING",
      description: "We would like to request additional modules for advanced robotics and AI programming for our Grade 8 students.",
      conversation: [
        {
          author: "Admin",
          message: "Thank you for the request. We're currently evaluating the feasibility of adding these modules. Our product team will review your requirements.",
          date: "2025-01-04 09:15",
          isAdmin: true,
        },
      ],
    },
  ];

  const sidebarItems = [
    { label: "Dashboard", icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} /> },
    { label: "Attendance", icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} /> },
    { label: "Tutor", icon: <Icon icon="fluent-emoji-high-contrast:teacher" width={24} height={24} /> },
    { label: "Examination", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { label: "Invoice", icon: <Icon icon="streamline-ultimate:cash-payment-bills-bold" width={24} height={24} /> },
    { label: "Complain Box", icon: <Icon icon="streamline-freehand:customer-action-complaint" width={24} height={24} /> },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800";
      case "MEDIUM":
        return "bg-orange-100 text-orange-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200                           ${location.pathname === routeMap[item.label]
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

      {/* Main Content */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">
       
       

        {/* Tabs - Hidden when showing My Complaints */}
        {!showMyComplaints && (
        <div className="mb-8 flex flex-wrap gap-3 md:gap-4">
          <button
            onClick={() => {
              setActiveTab("from-student");
              setShowMyComplaints(false);
            }}
            className={`px-4 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 border-2 ${
              activeTab === "from-student" && !showMyComplaints
                ? "bg-white text-black border-black"
                : "bg-[#3A7D7D] text-white border-black"
            }`}
          >
            From Student ({complaintsFromStudent.length})
          </button>

          <button
            onClick={() => {
              setActiveTab("to-admin");
              setShowMyComplaints(false);
            }}
            className={`px-4 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 border-2 ${
              activeTab === "to-admin" && !showMyComplaints
                ? "bg-white text-black border-black"
                : "bg-[#3A7D7D] text-white border-black"
            }`}
          >
            To Admin 
          </button>

          
        </div>
        )}

        {/* My Complaints Tab */}
        {showMyComplaints && (
          <div className="mb-8">
            <button
              className="px-4 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 border-2 bg-white text-black border-black"
            >
              My Complaints
            </button>
          </div>
        )}

        {/* Filter and Action Bar - Always visible */}
        <div className="mb-6 flex flex-wrap justify-end items-center gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-700 text-black rounded-lg text-sm bg-white focus:outline-none cursor-pointer hover:border-gray-800"
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        <button 
          onClick={() => setShowMyComplaints(true)}
          className="cursor-pointer hover:opacity-75 transition"
        >
          <Icon icon="material-symbols:history-rounded" className="text-black w-6 h-6"/>
        </button>
        {showMyComplaints && (
          <button
            onClick={() => setShowMyComplaints(false)}
            className="text-[#3A7D7D] font-medium cursor-pointer hover:text-[#2A6D6D] flex items-center gap-1"
          >
            <Icon icon="mdi:arrow-left" width={20} height={20} />
            Back
          </button>
        )}
        </div>

        {/* Complaints List - From Student */}
        {activeTab === "from-student" && !showMyComplaints && (
          <div className="space-y-4">
            {complaintsFromStudent.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow duration-200"
              >

               {/* Header */}
<div className="flex flex-col gap-4 mb-4 md:flex-row md:items-start md:justify-between">

  {/* LEFT: Title + user info */}
  <div className="flex-1">
    
    {/* Row: Title + Badges + Reply Button */}
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        {complaint.title}
      </h3>

      {/* Right Side: Badges + Reply */}

        {/* Badges */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
            complaint.priority
          )}`}
        >
          {complaint.priority}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            complaint.status
          )}`}
        >
          {complaint.status}
        </span>
      </div>

        {/* Reply Button */}
        <button className="flex items-center gap-1 px-3 py-1.5 bg-[#DDFFE7] text-black rounded-lg cursor-pointer hover:bg-[#438582] hover:text-white transition-colors duration-200">
          <Icon icon="material-symbols-light:reply-rounded" width={20} height={20} />
          Reply
        </button>

    </div>

    {/* User + Date */}
    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
      <div className="flex items-center gap-1">
        <Icon icon="iconamoon:profile" width={16} height={16} />
        <span>{complaint.submittedBy}</span>
      </div>

      <div className="flex items-center gap-1">
        <Icon icon="ant-design:calendar-outlined" width={16} height={16} />
        <span>{complaint.date}</span>
      </div>
    </div>

  </div>
</div>


          

                {/* Description */}
                <p className="text-gray-700 mb-4 text-sm md:text-base">{complaint.description}</p>

                {/* Conversation */}
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Conversation:</h4>
                  <div className="space-y-3">
  {complaint.conversation.map((msg, idx) => (
    <div key={idx} className="w-full">
      <div
        className={`
          w-full 
          px-4 py-3 
          border-l-4 
          border-[#3A7D7D] 
          rounded-md 
          ${msg.isAdmin 
            ? "bg-[#DDFFE7] text-black" 
            : "bg-blue-100 text-gray-800"
          }
        `}
      >
        <p className="text-sm">{msg.message}</p>
        <span className="text-xs opacity-75 mt-1 block">{msg.date}</span>
      </div>
    </div>
  ))}
</div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* To Admin - Form View */}
        {activeTab === "to-admin" && !showMyComplaints && (
          <div className="bg-[#FEFCE8] rounded-lg border border-gray-300 shadow-lg p-8">
            

            {/* Description Section */}
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Describe your Complaint in Detail</h3>
              <textarea
                placeholder="Please provide as much detail as possible..."
                className="w-full bg-white px-4 py-3 border-2 border-gray-300 rounded-lg shadow-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-400   "
                rows={10}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 bg-[#3A7D7D] text-white font-medium rounded-lg hover:bg-[#2A6D6D]">
                Submit
              </button>
            </div>
          </div>
        )}

        {/* My Complaints View */}
        {showMyComplaints && (
          <div className="space-y-4">
            {complaintsToAdmin.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{complaint.title}</h3>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#DDFFE7] text-black rounded-lg cursor-pointer hover:bg-[#438582] hover:text-white transition-colors duration-200 text-sm"
                  >
                    <Icon icon="material-symbols-light:reply-rounded" width={18} height={18} />
                    Reply
                  </button>
                </div>

                {/* Category, Date and Info */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {complaint.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                  <span className="text-xs text-gray-600 ml-auto">
                    <Icon icon="ant-design:calendar-outlined" className="inline mr-1" width={16} />
                    {complaint.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4">{complaint.description}</p>

                {/* Conversation - Always Visible */}
                {complaint.conversation.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Conversation:</h4>
                    <div className="space-y-3">
                      {complaint.conversation.map((msg, idx) => (
                        <div key={idx}>
                          <div
                            className={`px-4 py-3 border-l-4 rounded-md ${
                              msg.isAdmin
                                ? "bg-[#DDFFE7] text-black border-[#3A7D7D]"
                                : "bg-blue-100 text-gray-800 border-blue-400"
                            }`}
                          >
                            <p className="text-sm font-medium mb-1">{msg.isAdmin ? "Admin Reply" : "Your Message"}</p>
                            <p className="text-sm">{msg.message}</p>
                            <span className="text-xs opacity-75 mt-2 block">{msg.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

       
      </main>
    </div>
  );
}
