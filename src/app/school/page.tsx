"use client";
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { AlertCircle, BookOpen, Calendar, CreditCard, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Activity',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.15)',
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#6366f1',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6366f1', font: { weight: "bold" as const } },
    },
    y: {
      grid: { color: '#e0e7ff' },
      ticks: { color: '#6366f1', font: { weight: "bold" as const } },
    },
  },
  aspectRatio: 2.2,
};

const pieData = {
  labels: ['Attendance', 'Exams', 'Payments', 'Complaints'],
  datasets: [
    {
      label: 'Overview',
      data: [300, 50, 100, 60],
      backgroundColor: [
        'rgba(59,130,246,0.8)',
        'rgba(245,158,66,0.8)',
        'rgba(16,185,129,0.8)',
        'rgba(239,68,68,0.8)',
      ],
      borderColor: [
        '#fff', '#fff', '#fff', '#fff'
      ],
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: '#6366f1',
        font: { weight: "bold" as const, size: 14 },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: '#6366f1',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
  },
  aspectRatio: 1.7,
};

const leaderboard = [
  { name: 'John Doe', score: 98 },
  { name: 'Jane Smith', score: 95 },
  { name: 'Emily Johnson', score: 92 },
  { name: 'Michael Brown', score: 89 },
  { name: 'Sarah Lee', score: 87 },
];

export default function SchoolHome() {
  const profileData= {
      // School Identity & Access
      schoolName: "Brighton STEAM Academy",
      schoolCode: "BSA001",
      primaryAdmin: "Dr. Sarah Johnson",
      adminStaff: [
        { name: "Mark Wilson", role: "Academic Coordinator", permissions: "Full Access" },
        { name: "Lisa Chen", role: "STEAM Coordinator", permissions: "Academic Only" }
      ],
      
      // Academic Structure
      classesOffered: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      sections: ["Science", "Technology", "Engineering", "Arts", "Mathematics"],
      subjects: ["Physics", "Robotics", "Coding", "Mathematics", "Digital Arts", "3D Design"],
      totalTutors: 12,
      totalStudents: 245,
      
      // Performance Data
      overallProgress: 78,
      classProgress: [
        { class: "Grade 1", progress: 85 },
        { class: "Grade 2", progress: 82 },
        { class: "Grade 3", progress: 75 },
        { class: "Grade 4", progress: 70 },
        { class: "Grade 5", progress: 68 },
        { class: "Grade 6", progress: 72 }
      ],
      tutorPerformance: 84,
      
      // Complaints & Feedback
      totalComplaints: 3,
      pendingComplaints: 1,
      resolvedComplaints: 2,
      
      // Administrative Info
      subscriptionPlan: "Premium STEAM Package",
      activeUntil: "2025-12-31",
      lastPayment: "2024-09-01"
    };
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-100">

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col gap-8 relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome, {profileData.schoolName}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Academic Structure */}
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Academic Structure
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-700">{profileData.totalTutors}</p>
                  <p className="text-sm text-gray-600">Total Tutors</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-700">{profileData.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classes Offered</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.classesOffered.map((cls, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">STEAM Sections</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.sections.map((section, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Progress */}
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance & Progress
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Overall School Progress</span>
                  <span className="text-2xl font-bold text-green-600">{profileData.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${profileData.overallProgress}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Class-wise Progress</h3>
                <div className="space-y-2">
                  {profileData.classProgress.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{cls.class}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${cls.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{cls.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Tutor Performance</span>
                  <span className="text-xl font-bold text-yellow-600">{profileData.tutorPerformance}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complaints & Administrative Info */}
        
          {/* Complaints & Feedback */}
          <div className="bg-white/90 border border-blue-100 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Complaints & Feedback
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-700 font-medium">Pending Complaints</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                  {profileData.pendingComplaints}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700 font-medium">Resolved Complaints</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  {profileData.resolvedComplaints}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Total Complaints</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                  {profileData.totalComplaints}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{width: `${(profileData.resolvedComplaints / profileData.totalComplaints) * 100}%`}}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Resolution Rate: {Math.round((profileData.resolvedComplaints / profileData.totalComplaints) * 100)}%
              </p>
            </div>
          </div>

          {/* Administrative & Plan Info */}
          <div className="bg-white/90 border border-blue-100 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Subscription & Plan Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Plan</label>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                  <p className="font-bold text-lg">{profileData.subscriptionPlan}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Active Until</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={16} className="text-gray-500" />
                  <p className="text-gray-800 font-medium">{profileData.activeUntil}</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Account Status: Active</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your subscription is active and all features are available.
                </p>
              </div>
            </div>
          </div>
        
              
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Overview (Line Graph)</h3>
                <div className="w-full max-w-xl">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Distribution (Pie Chart)</h3>
                <div className="w-full max-w-xs">
                  <Pie data={pieData} options={pieOptions} />
                </div>
                {/* Leaderboard below the pie chart
                <div className="w-full mt-8 rounded-2xl border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
                  <h3 className="text-lg font-extrabold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide drop-shadow">Teacher Leaderboard</h3>
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 to-pink-100">
                        <th className="py-2 px-3 font-semibold text-blue-700">Rank</th>
                        <th className="py-2 px-3 font-semibold text-blue-700">Name</th>
                        <th className="py-2 px-3 font-semibold text-blue-700">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((teacher, idx) => (
                        <tr key={teacher.name} className={
                          idx === 0 ? 'bg-gradient-to-r from-yellow-200 to-yellow-50 font-bold' :
                            idx === 1 ? 'bg-gradient-to-r from-purple-100 to-blue-50 font-semibold' :
                              idx === 2 ? 'bg-gradient-to-r from-pink-100 to-orange-50 font-medium' :
                                'hover:bg-blue-50 transition-colors'
                        }>
                          <td className="py-2 px-3">{idx + 1}</td>
                          <td className={
                            'py-2 px-3 ' +
                            (idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-purple-600' : idx === 2 ? 'text-pink-600' : 'text-blue-700') +
                            ' font-semibold tracking-wide'
                          }>{teacher.name}</td>
                          <td className="py-2 px-3 text-blue-800 font-bold">{teacher.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
