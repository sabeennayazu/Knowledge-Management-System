import React from 'react'
import Sidebar from './component/sidebar'

export default function studentLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className="flex">
      {/* Sidebar only for student tanent */}
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
