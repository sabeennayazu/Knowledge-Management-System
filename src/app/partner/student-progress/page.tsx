"use client"
import React, { useState } from 'react';
import {
  Users, BookOpen, Award, TrendingUp, Calendar, ChevronDown,
  Filter, Search, Download, RefreshCw, Eye, Edit, AlertTriangle,
  CheckCircle, Clock, Target, BarChart3, PieChart, Activity,
  GraduationCap, Lightbulb, Beaker, Cpu, Calculator, Zap,
  Star, ArrowUp, ArrowDown, Minus, User, FileText, ClipboardCheck,
  X,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Area, AreaChart } from 'recharts';

interface Student {
  id: string;
  name: string;
  avatar: string;
  class: string;
  rollNumber: string;
  overallProgress: number;
  assignments: {
    completed: number;
    total: number;
    avgScore: number;
  };
  projects: {
    completed: number;
    total: number;
    avgScore: number;
  };
  attendance: {
    present: number;
    total: number;
    percentage: number;
  };
  exams: {
    attempted: number;
    total: number;
    avgScore: number;
  };
  classPerformance: {
    participation: number;
    behavior: number;
    engagement: number;
  };
  subjects: {
    robotics: number;
    programming: number;
    mathematics: number;
    physics: number;
    engineering: number;
  };
  recentActivity: {
    date: string;
    activity: string;
    score?: number;
  }[];
  strengths: string[];
  improvements: string[];
  lastUpdated: string;
}

interface ClassData {
  id: string;
  name: string;
  totalStudents: number;
  avgProgress: number;
  subjects: string[];
  tutor: string;
}

const StudentsProgressDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dateRange, setDateRange] = useState('30');

  const classes: ClassData[] = [
    { id: '1', name: 'Grade 4A', totalStudents: 25, avgProgress: 78, subjects: ['Robotics', 'Programming'], tutor: 'Dr. Emily Rodriguez' },
    { id: '2', name: 'Grade 4B', totalStudents: 22, avgProgress: 82, subjects: ['Mathematics', 'Physics'], tutor: 'Dr. Emily Rodriguez' },
    { id: '3', name: 'Grade 5A', totalStudents: 28, avgProgress: 75, subjects: ['Robotics', 'Engineering'], tutor: 'Dr. Emily Rodriguez' },
    { id: '4', name: 'Grade 6A', totalStudents: 20, avgProgress: 85, subjects: ['Programming', 'Mathematics'], tutor: 'Dr. Emily Rodriguez' }
  ];

  const students: Student[] = [
    {
      id: '1',
      name: 'Aarav Sharma',
      avatar: '/api/placeholder/40/40',
      class: 'Grade 4A',
      rollNumber: '001',
      overallProgress: 85,
      assignments: { completed: 18, total: 20, avgScore: 88 },
      projects: { completed: 4, total: 5, avgScore: 92 },
      attendance: { present: 45, total: 50, percentage: 90 },
      exams: { attempted: 3, total: 3, avgScore: 85 },
      classPerformance: { participation: 90, behavior: 95, engagement: 88 },
      subjects: { robotics: 88, programming: 85, mathematics: 90, physics: 82, engineering: 87 },
      recentActivity: [
        { date: '2024-09-07', activity: 'Completed Robot Building Assignment', score: 95 },
        { date: '2024-09-05', activity: 'Physics Quiz', score: 82 },
        { date: '2024-09-03', activity: 'Programming Project Submission', score: 88 }
      ],
      strengths: ['Problem Solving', 'Creative Thinking', 'Team Work'],
      improvements: ['Time Management', 'Documentation'],
      lastUpdated: '2024-09-08'
    },
    {
      id: '2',
      name: 'Priya Patel',
      avatar: '/api/placeholder/40/40',
      class: 'Grade 4A',
      rollNumber: '002',
      overallProgress: 92,
      assignments: { completed: 20, total: 20, avgScore: 94 },
      projects: { completed: 5, total: 5, avgScore: 96 },
      attendance: { present: 48, total: 50, percentage: 96 },
      exams: { attempted: 3, total: 3, avgScore: 91 },
      classPerformance: { participation: 95, behavior: 98, engagement: 94 },
      subjects: { robotics: 94, programming: 92, mathematics: 95, physics: 90, engineering: 93 },
      recentActivity: [
        { date: '2024-09-07', activity: 'Excellence in Mathematics Test', score: 98 },
        { date: '2024-09-06', activity: 'Led Team Project Presentation', score: 95 },
        { date: '2024-09-04', activity: 'Robotics Challenge Winner', score: 100 }
      ],
      strengths: ['Leadership', 'Mathematical Skills', 'Attention to Detail'],
      improvements: ['Public Speaking Confidence'],
      lastUpdated: '2024-09-08'
    },
    {
      id: '3',
      name: 'Rohan Thapa',
      avatar: '/api/placeholder/40/40',
      class: 'Grade 4B',
      rollNumber: '015',
      overallProgress: 68,
      assignments: { completed: 15, total: 20, avgScore: 72 },
      projects: { completed: 3, total: 5, avgScore: 75 },
      attendance: { present: 40, total: 50, percentage: 80 },
      exams: { attempted: 2, total: 3, avgScore: 65 },
      classPerformance: { participation: 70, behavior: 85, engagement: 65 },
      subjects: { robotics: 70, programming: 65, mathematics: 75, physics: 68, engineering: 72 },
      recentActivity: [
        { date: '2024-09-06', activity: 'Missed Programming Assignment' },
        { date: '2024-09-04', activity: 'Physics Lab Report', score: 68 },
        { date: '2024-09-02', activity: 'Mathematics Quiz', score: 75 }
      ],
      strengths: ['Hands-on Learning', 'Curiosity'],
      improvements: ['Consistency', 'Assignment Completion', 'Attendance'],
      lastUpdated: '2024-09-08'
    },
    {
      id: '4',
      name: 'Sita Rai',
      avatar: '/api/placeholder/40/40',
      class: 'Grade 5A',
      rollNumber: '008',
      overallProgress: 88,
      assignments: { completed: 19, total: 22, avgScore: 86 },
      projects: { completed: 6, total: 6, avgScore: 90 },
      attendance: { present: 52, total: 55, percentage: 95 },
      exams: { attempted: 4, total: 4, avgScore: 88 },
      classPerformance: { participation: 92, behavior: 94, engagement: 90 },
      subjects: { robotics: 90, programming: 88, mathematics: 85, physics: 89, engineering: 92 },
      recentActivity: [
        { date: '2024-09-07', activity: 'Engineering Design Project', score: 92 },
        { date: '2024-09-05', activity: 'Robotics Competition', score: 88 },
        { date: '2024-09-03', activity: 'Advanced Programming Challenge', score: 85 }
      ],
      strengths: ['Engineering Design', 'Analytical Thinking', 'Persistence'],
      improvements: ['Speed in Problem Solving'],
      lastUpdated: '2024-09-08'
    }
  ];

  const progressTrendData = [
    { month: 'Jan', assignments: 75, projects: 80, exams: 78, attendance: 92 },
    { month: 'Feb', assignments: 78, projects: 82, exams: 80, attendance: 90 },
    { month: 'Mar', assignments: 82, projects: 85, exams: 83, attendance: 88 },
    { month: 'Apr', assignments: 85, projects: 87, exams: 85, attendance: 91 },
    { month: 'May', assignments: 83, projects: 89, exams: 87, attendance: 93 },
    { month: 'Jun', assignments: 87, projects: 91, exams: 89, attendance: 95 }
  ];

  const subjectPerformanceData = [
    { subject: 'Robotics', average: 85, color: '#3B82F6' },
    { subject: 'Programming', average: 82, color: '#10B981' },
    { subject: 'Mathematics', average: 88, color: '#F59E0B' },
    { subject: 'Physics', average: 80, color: '#EF4444' },
    { subject: 'Engineering', average: 86, color: '#8B5CF6' }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return 'text-green-600 bg-green-100';
    if (progress >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressIcon = (progress: number) => {
    if (progress >= 85) return <ArrowUp className="w-4 h-4" />;
    if (progress >= 70) return <Minus className="w-4 h-4" />;
    return <ArrowDown className="w-4 h-4" />;
  };

  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.rollNumber.includes(searchTerm);
    return matchesClass && matchesSearch;
  });

  const openStudentDetail = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Progress Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Track and manage student performance across all STEAM subjects</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold">{students.length}</p>
                <p className="text-blue-200 text-sm mt-1">Across all classes</p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Average Progress</p>
                <p className="text-3xl font-bold">83%</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-4 h-4 text-green-200" />
                  <p className="text-green-200 text-sm">+5% from last month</p>
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Active Classes</p>
                <p className="text-3xl font-bold">{classes.length}</p>
                <p className="text-purple-200 text-sm mt-1">STEAM subjects</p>
              </div>
              <GraduationCap className="w-12 h-12 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold">89%</p>
                <p className="text-orange-200 text-sm mt-1">Assignments & Projects</p>
              </div>
              <Target className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Progress Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="assignments" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="projects" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="exams" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-purple-600" />
              Subject Performance
            </h3>
            <div className="space-y-4">
              {subjectPerformanceData.map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${subject.average}%`,
                          backgroundColor: subject.color 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 w-8">{subject.average}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[250px]"
                />
              </div>
              
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
              
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Subjects</option>
                <option value="robotics">Robotics</option>
                <option value="programming">Programming</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
              >
                <div className="flex flex-col gap-1 w-4 h-4">
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Students Grid/List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Students Overview ({filteredStudents.length})
            </h3>
          </div>
          
          <div className="p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-200"
                    onClick={() => openStudentDetail(student)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.class} • Roll: {student.rollNumber}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getProgressColor(student.overallProgress)}`}>
                        {getProgressIcon(student.overallProgress)}
                        {student.overallProgress}%
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Assignments</span>
                        <span className="text-sm font-medium">{student.assignments.completed}/{student.assignments.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(student.assignments.completed / student.assignments.total) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Projects</span>
                        <span className="text-sm font-medium">{student.projects.completed}/{student.projects.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(student.projects.completed / student.projects.total) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Attendance</span>
                        <span className="text-sm font-medium">{student.attendance.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${student.attendance.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Updated: {student.lastUpdated}
                      </div>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-blue-200"
                    onClick={() => openStudentDetail(student)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-800">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.class} • Roll: {student.rollNumber}</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Progress</div>
                          <div className={`font-semibold ${getProgressColor(student.overallProgress).split(' ')[0]}`}>
                            {student.overallProgress}%
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Assignments</div>
                          <div className="font-semibold text-gray-800">
                            {student.assignments.completed}/{student.assignments.total}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Attendance</div>
                          <div className="font-semibold text-gray-800">
                            {student.attendance.percentage}%
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Avg Score</div>
                          <div className="font-semibold text-gray-800">
                            {student.assignments.avgScore}%
                          </div>
                        </div>
                      </div>
                      
                      <Eye className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Student Detail Modal */}
        {showDetailModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                      <p className="text-blue-100">{selectedStudent.class} • Roll No: {selectedStudent.rollNumber}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-400 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Overall Progress Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedStudent.overallProgress}%</div>
                    <div className="text-sm text-blue-700 font-medium">Overall Progress</div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedStudent.overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedStudent.assignments.avgScore}%</div>
                    <div className="text-sm text-green-700 font-medium">Avg Assignment Score</div>
                    <div className="text-xs text-green-600 mt-1">
                      {selectedStudent.assignments.completed}/{selectedStudent.assignments.total} completed
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedStudent.attendance.percentage}%</div>
                    <div className="text-sm text-purple-700 font-medium">Attendance</div>
                    <div className="text-xs text-purple-600 mt-1">
                      {selectedStudent.attendance.present}/{selectedStudent.attendance.total} days
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedStudent.exams.avgScore}%</div>
                    <div className="text-sm text-orange-700 font-medium">Exam Average</div>
                    <div className="text-xs text-orange-600 mt-1">
                      {selectedStudent.exams.attempted}/{selectedStudent.exams.total} attempted
                    </div>
                  </div>
                </div>

                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Subject Performance */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      Subject Performance
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(selectedStudent.subjects).map(([subject, score]) => {
                        const subjectIcons = {
                          robotics: <Cpu className="w-5 h-5 text-blue-600" />,
                          programming: <Activity className="w-5 h-5 text-green-600" />,
                          mathematics: <Calculator className="w-5 h-5 text-purple-600" />,
                          physics: <Zap className="w-5 h-5 text-yellow-600" />,
                          engineering: <Beaker className="w-5 h-5 text-red-600" />
                        };
                        
                        return (
                          <div key={subject} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {subjectIcons[subject as keyof typeof subjectIcons]}
                              <span className="text-sm font-medium text-gray-700 capitalize">{subject}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-gray-800 w-10">{score}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Class Performance Metrics */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-red-600" />
                      Class Performance
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">Participation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${selectedStudent.classPerformance.participation}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800 w-10">{selectedStudent.classPerformance.participation}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">Behavior</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${selectedStudent.classPerformance.behavior}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800 w-10">{selectedStudent.classPerformance.behavior}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">Engagement</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${selectedStudent.classPerformance.engagement}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800 w-10">{selectedStudent.classPerformance.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity & Strengths/Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {selectedStudent.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                            {activity.score ? (
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{activity.activity}</p>
                            <p className="text-xs text-gray-600">{activity.date}</p>
                            {activity.score && (
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                activity.score >= 85 ? 'bg-green-100 text-green-700' :
                                activity.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                Score: {activity.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Areas for Improvement */}
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-green-600" />
                        Strengths
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.strengths.map((strength, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-yellow-600" />
                        Areas for Improvement
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.improvements.map((improvement, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
                          >
                            {improvement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Update Progress
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Add Comment
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Generate Report
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact Parent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsProgressDashboard;