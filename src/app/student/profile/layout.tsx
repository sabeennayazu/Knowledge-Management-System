"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect, useRef } from "react";
import Notification from "../components/notification/page";
import Image from "next/image";
import {
  MoreVertical,
  User,
  Award,
  BookOpen,
  FolderOpen,
  FileText,
  MessageSquare,
} from "lucide-react";

const tabs = [
  { name: "Personal Info", href: "/student/profile/personal-info", icon: User },
  { name: "Skills", href: "/student/profile/skills", icon: Award },
  { name: "Course Progress", href: "/student/profile/courses", icon: BookOpen },
  { name: "Projects", href: "/student/profile/projects", icon: FolderOpen },
  { name: "Assessments", href: "/student/profile/assessments", icon: FileText },
  {
    name: "Instructor Feedback",
    href: "/student/profile/instructor-feedback",
    icon: MessageSquare,
  },
];

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // If user is at `/student/profile`, treat it as `/student/profile/personal-info`
  const effectivePath =
    pathname === "/student/profile"
      ? "/student/profile/personal-info"
      : pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
		<Notification/>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-md border border-black-100/50 overflow-hidden mb-8 backdrop-blur-sm">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar */}
             

<Image
  src="/dada.png"
  alt="Sabin Nayaju"
  width={112} // same as w-28 (28 * 4)
  height={112}
  className="rounded-full object-cover border-gray-500 shadow-md ring-2 ring-blue-100"
/>

              {/* Student Info */}
              <div className="flex-1 text-center lg:text-left pt-10">
                <h1 className="text-3xl font-light text-gray-900 mb-2 ">
                  Sabin Nayaju
                </h1>
              </div>

              {/* Actions */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="p-3 rounded-xl hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-xl shadow-lg z-50 overflow-hidden">
                    <button className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50/50 transition-colors duration-200">
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 mb-8">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = effectivePath === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-3 px-6 py-4 whitespace-nowrap font-medium transition-all duration-200 hover:bg-gray-100 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/90 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-blue-50/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
