"use client";
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

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

export default function StudentHome() {
  return (
     <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-100">
          
          {/* Main Content */}
          <main className="flex-1 p-8 flex flex-col gap-8 relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome, Student!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    {/* Leaderboard below the pie chart */}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  );
}
