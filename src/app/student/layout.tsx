"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  User,
  ClipboardList,
  GraduationCap,
  FolderKanban,
  CalendarDays,
  Settings,
  HelpCircle,
  Users,
  Clock,
  LogOut,
} from "lucide-react";

// ✅ Define links BEFORE using them
const links = [
  { name: "Learning Materials", href: "/student/learning-materials", icon: BookOpen },
  { name: "Attendance", href: "/student/attendance", icon: Clock },
  { name: "Tasks", href: "/student/tasks", icon: ClipboardList },
  { name: "Exams", href: "/student/exams", icon: GraduationCap },
  { name: "Projects", href: "/student/projects", icon: FolderKanban },
  { name: "Results", href: "/student/results", icon: CalendarDays }, // 🔄 Changed here
  { name: "Events", href: "/student/events", icon: Users },
];

const settingsItems = [
  { name: "Settings & Privacy", href: "/student/components/settings", icon: Settings },
  { name: "Help & Support", href: "/student/components/help&support", icon: HelpCircle },
  { name: "Profile", href: "/student/profile", icon: User },
  { name: "Logout", href: "/logout", icon: LogOut },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-blue-100 shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Top section */}
        <div>
          <a href="/student" className="text-xl font-bold text-blue-700 mb-6 pl-4 block">
            Dashboard
          </a>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors ${
                  pathname === link.href ? "bg-blue-100 text-blue-700 font-semibold" : ""
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Settings Dropdown */}
        <div className="relative mt-4">
          <button
            className="w-full flex justify-between items-center px-3 py-2 cursor-pointer rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              Settings
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${settingsOpen ? "rotate-180" : ""}`} />
          </button>

          {settingsOpen && (
            <div className="absolute bottom-full mb-2 w-full flex flex-col gap-1 bg-white rounded-lg shadow-md border border-blue-100">
              {settingsItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64 bg-gradient-to-br from-blue-50 to-purple-100 transition-all duration-300">
        {/* Top bar for mobile */}
        <header className="w-full flex items-center p-4 bg-white/80 shadow-md md:hidden">
          <button
            className="p-2 rounded-md hover:bg-blue-100 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6 text-blue-700" /> : <Menu className="w-6 h-6 text-blue-700" />}
          </button>
          <h1 className="ml-4 font-bold text-blue-700 text-lg">Dashboard</h1>
        </header>

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
