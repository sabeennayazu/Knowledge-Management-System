'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const sidebarItems = [
  { label: 'Profile', path: '/partner/profile' },
  { label: 'Students Progress', path: '/partner/student-progress' },
  { label: 'Daily Task', path: '/partner/daily-task' },
  { label: 'Leaderboard', path: '/partner/leaderboard' },
  { label: 'Referal & Points', path: '/partner/referal-&-points' },
  { label: 'Earning', path: '/partner/earning' },
  { label: 'Components Delivery', path: '/partner/components-delivery' },
  { label: 'Attendence', path: '/partner/attendence' },
  { label: 'Task', path: '/partner/task' },
  { label: 'Projects', path: '/partner/projects' },
  { label: 'Financial Report', path: '/partner/financial-report' },
  { label: 'Complaints', path: '/partner/complaints' },
  { label: 'Task Upload', path: '/partner/task-upload' },
  { label: 'Self Progress', path: '/partner/self-progress' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/partner');
  }

  return (
    <>
      <aside className="w-64 min-h-screen  bg-white/90 border-r border-blue-100 shadow-lg p-6 flex flex-col gap-2">
        <h2 className="text-xl cursor-pointer font-bold text-blue-700 mb-4" onClick={handleDashboardClick}>Dashboard</h2>
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