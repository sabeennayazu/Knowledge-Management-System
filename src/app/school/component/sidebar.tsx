'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const sidebarItems = [
  { label: 'Profile', path: '/school/profile' },
  { label: 'Class Attendence', path: '/school/attendence' },
  { label: 'Classwise Progress', path: '/school/progress' },
  { label: 'Classwise Exam Report', path: '/school/exam-report' },
  { label: 'Classwise Project', path: '/school/project' },
  // { label: 'Tutor Progress', path: '/school/tutor-progress' },
  // { label: 'Payment', path: '/school/payment' },
  { label: 'Complaints', path: '/school/complaints' },
  { label: 'Invoice and Payment', path: '/school/invoice' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/school');
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