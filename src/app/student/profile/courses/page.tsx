"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  BookOpen,
  Clock,
  User,
  Eye,
  CheckCircle,
  Loader,
  XCircle,
  ArrowRight
} from "lucide-react";

export default function CourseProgressPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      name: "Introduction to Robotics",
      progress: 100,
      chapters: ["Motors & Sensors", "Kinematics", "Control Systems"],
      instructor: "Mr. Ram Bahadur",
      status: "Completed",
      description:
        "Learn the fundamentals of robotics, motion control, sensors, and actuators.",
      learningOutcomes: [
        "Understand robotics basics",
        "Control motors and sensors",
        "Design simple robotic systems"
      ]
    },
    {
      name: "IoT & Smart Devices",
      progress: 70,
      chapters: ["IoT Protocols", "Device Connectivity", "Cloud Integration"],
      instructor: "Mr. Rambahadur",
      status: "In Progress",
      description:
        "Explore Internet of Things, device connectivity, cloud integration, and real-time monitoring.",
      learningOutcomes: [
        "Connect devices to the cloud",
        "Understand IoT protocols",
        "Build smart applications"
      ]
    },
    {
      name: "Arduino & Embedded Systems",
      progress: 0,
      chapters: ["Arduino Basics", "Embedded Programming", "Circuit Design"],
      instructor: "Mr. Ram Bahadur",
      status: "Pending",
      description:
        "Introduction to Arduino microcontrollers, embedded programming, and circuit design.",
      learningOutcomes: [
        "Write basic Arduino programs",
        "Understand embedded systems",
        "Design and test simple circuits"
      ]
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle };
      case "in progress":
        return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Loader };
      case "pending":
        return { color: "bg-red-50 text-red-700 border-red-200", icon: XCircle };
      default:
        return { color: "bg-gray-50 text-gray-700 border-gray-200", icon: BookOpen };
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-orange-500";
    return "bg-purple-500";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Course Progress</h1>
          <p className="text-gray-600">Track your learning journey across different subjects</p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            className="p-3 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical className="w-5 h-5 text-black" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <Link href="/student/learning-materials">
              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-200">
                <BookOpen className="w-4 h-4" />
                View All Courses
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course, index) => {
          const statusCfg = getStatusConfig(course.status);
          const StatusIcon = statusCfg.icon;
          return (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-lg bg-white hover:-translate-y-1 
                       transition duration-200 ease-in-out"
            >
              {/* Title + Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{course.name}</h3>
                  <div className="flex items-center gap-6 text-sm text-gray-700 opacity-90">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {course.chapters.length} Chapters
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {course.instructor}
                    </span>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border ${statusCfg.color}`}
                >
                  <StatusIcon className="w-4 h-4" />
                  {course.status}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 opacity-90">Progress</span>
                  <span className="font-medium text-gray-900">{course.progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-50">
                <button
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                  onClick={() =>
                    setExpanded(expanded === index ? null : index)
                  }
                >
                  <Eye className="w-4 h-4" />
                  {expanded === index ? "Hide Details" : "View  Details"}
                </button>
              </div>

              {/* Expandable Details */}
              {expanded === index && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm space-y-3">
                  <div>
                    <p className="mb-1">
                      <span className="font-semibold">Description:</span>
                    </p>
                    <p className="text-gray-800">{course.description}</p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <span className="font-semibold">Chapters:</span>
                    </p>
                    <p className="text-gray-800">{course.chapters.join(", ")}</p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <span className="font-semibold">Learning Outcomes:</span>
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-gray-800">
                      {course.learningOutcomes.map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Link href="/student/learning-materials">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
                      <ArrowRight className="w-4 h-4" />
                      Go to Materials
                    </button>
                    </Link>
                   
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
