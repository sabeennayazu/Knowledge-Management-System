'use client';
import { usePathname } from 'next/navigation';
import React from 'react'

const sidebarItems = [
  { label: 'Profile', path: '/student/profile' },
  { label: 'Attendence', path: '/student/attendence' },
  { label: 'Learning Material', path: '/student/learning-material' },
  { label: 'Daily Task and Progress', path: '/student/daily-task-and-progress' },
  { label: 'Exam Section', path: '/student/exam-section' },
  { label: 'Result', path: '/student/result' },
  { label: 'Projects', path: '/student/projects' },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className="w-64 min-h-screen bg-white/90 border-r border-blue-100 shadow-lg p-6 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Dashboard</h2>
        <nav className="flex-1 flex flex-col gap-2">
          {sidebarItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <a
              key={item.label}
              href={item.path}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              {item.label}
            </a>
          );
        })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar