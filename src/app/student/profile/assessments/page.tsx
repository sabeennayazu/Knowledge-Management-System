"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, FileText, Calendar, Award, BarChart3, Plus } from "lucide-react";
import Link from "next/link";

export default function AssessmentsPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const assessments = [
    { 
      name: "1st Assessment", 
      subject: "IOT & Embedded Systems",
      score: 85, 
      date: "2025-08-20", 
      maxScore: 100,
      grade: "A",
      feedback: "Good understanding of concepts",
      shortDescription: "Covers basics of sensors and microcontrollers.",
      aims: "Test understanding of IoT fundamentals and hardware interfacing",
      duration: "60 min",
      examTypes: { MCQ: 50, Practical: 50 } 
    },
    { 
      name: "First Mid Term", 
      subject: "Robotics",
      score: 90, 
      date: "2025-07-10", 
      maxScore: 100,
      grade: "A+",
      feedback: "Excellent problem-solving skills",
      shortDescription: "Robotics theory and application basics.",
      aims: "Evaluate problem-solving and control system knowledge",
      duration: "90 min",
      examTypes: { MCQ: 60, Practical: 40 } 
    },
    { 
      name: "Final Project", 
      subject: "Computer Science",
      score: 88, 
      date: "2025-09-15", 
      maxScore: 100,
      grade: "A",
      feedback: "Creative approach and good execution",
      shortDescription: "Build a functional software project.",
      aims: "Test coding, design, and project implementation skills",
      duration: "Project-based",
      examTypes: { Practical: 100 } 
    },
    { 
      name: "Lab Report", 
      subject: "Electronics",
      score: 92, 
      date: "2025-08-05", 
      maxScore: 100,
      grade: "A+",
      feedback: "Thorough analysis and clear presentation",
      shortDescription: "Document lab experiments and results.",
      aims: "Evaluate lab skills, analysis, and reporting",
      duration: "2 hours",
      examTypes: { Practical: 100 } 
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Exam": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Quiz": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Project": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Assignment": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const averageScore = Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length);

  return (
    <div className="p-8 border-gray-500 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Academic Assessments</h1>
          <p className="text-gray-600">Track your academic performance and progress</p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            className="p-3 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical className="w-5 h-5 text-black cursor-pointer" />
          </button>
          {openMenu && (
            <Link href="/student/results">
            <div className="absolute right-0 mt-2 w-44 bg-white  rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <button className="flex items-center gap-3 w-full text-left cursor-pointer px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </button>
            </div>
            </Link>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-gray-300 shadow-md hover:-translate-y-1 
                       transition duration-200 ease-in-out hover:shadow-lg bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-indigo-50">
              <Award className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Average Score</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{averageScore}%</p>
        </div>
          
          <Link href={"/student/results"}>
        <div className="p-6 rounded-xl border border-gray-300 shadow-md hover:-translate-y-1 
                       transition duration-200 ease-in-out hover:shadow-lg bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-indigo-50">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total Assessments</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{assessments.length}</p>
        </div>
          </Link>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {assessments.map((assessment, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl border border-gray-300 shadow-md hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 
                       transition duration-200 ease-in-out bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{assessment.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor("Exam")}`}>
                    Exam
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{assessment.subject}</p>
                <p className="text-xs text-gray-500">{assessment.feedback}</p>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-lg font-semibold text-lg ${getScoreColor(assessment.score)}`}>
                  {assessment.score}%
                </div>
                <p className="text-sm text-gray-600 mt-1">Grade: {assessment.grade}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(assessment.date).toLocaleDateString("en-US", { 
                  year: "numeric", 
                  month: "short", 
                  day: "numeric" 
                })}
              </div>
              <button
                className="text-sm text-blue-600 hover:text-gray-900 transition-colors duration-200 font-medium cursor-pointer"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                {expanded === index ? "Hide Details" : "View Details"} →
              </button>
            </div>

            {/* Expandable Section */}
            {expanded === index && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm space-y-2">
                <p><span className="font-semibold">Short Description:</span> {assessment.shortDescription}</p>
                <p><span className="font-semibold">Aims / Purpose:</span> {assessment.aims}</p>
                <p><span className="font-semibold">Duration:</span> {assessment.duration}</p>
                <p>
                  <span className="font-semibold">Exam Type:</span>{" "}
                  {Object.entries(assessment.examTypes).map(([type, percent]) => `${type} (${percent}%)`).join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => router.push("/student/results")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl cursor-pointer hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          View Full Report
        </button>
      </div>
    </div>
  );
}
