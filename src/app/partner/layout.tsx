import React from 'react'
import Sidebar from './component/sidebar'

export default function partnerLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className="flex">
      {/* Sidebar only for partner tanent */}
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
