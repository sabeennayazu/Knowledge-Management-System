"use client";
import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, User, Calendar, BookOpen, CheckCircle, 
  Clock, AlertCircle, Users, Target, TrendingUp, Award, GraduationCap,
  FileText, Presentation, ClipboardCheck, Brain, Star, 
  BarChart3, PieChart, Activity, MessageSquare, Phone, Mail,
  Filter, Search, Download, Eye, Edit3, Plus
} from 'lucide-react';

interface AssignmentProgress {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submittedDate?: string;
  status: 'completed' | 'pending' | 'overdue' | 'graded';
  score?: number;
  maxScore: number;
  feedback?: string;
}

interface ProjectProgress {
  id: string;
  title: string;
  type: 'individual' | 'group';
  subject: string;
  startDate: string;
  dueDate: string;
  completionPercentage: number;
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded';
  grade?: string;
  milestones: {
    name: string;
    completed: boolean;
    dueDate: string;
  }[];
}

interface ExamResult {
  id: string;
  examName: string;
  subject: string;
  date: string;
  score: number;
  maxScore: number;
  grade: string;
  rank?: number;
  totalStudents?: number;
  topics: {
    name: string;
    score: number;
    maxScore: number;
  }[];
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject: string;
  notes?: string;
}

interface ClassPerformance {
  subject: string;
  participation: number; // 1-5 scale
  behavior: number; // 1-5 scale
  engagement: number; // 1-5 scale
  collaboration: number; // 1-5 scale
  notes: string;
  lastUpdated: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  class: string;
  section: string;
  avatar: string;
  parentContact: {
    name: string;
    phone: string;
    email: string;
  };
  overallGrade: string;
  gpa: number;
  attendancePercentage: number;
  assignmentCompletion: number;
  projectCompletion: number;
  behaviorScore: number;
  assignments: AssignmentProgress[];
  projects: ProjectProgress[];
  examResults: ExamResult[];
  attendance: AttendanceRecord[];
  classPerformance: ClassPerformance[];
  strengths: string[];
  improvements: string[];
  lastUpdated: string;
}

const StudentsProgressDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 6A');
  const [selectedStudent, setSelectedStudent] = useState<string | null>('student1');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);

  const classOptions = ['Grade 6A', 'Grade 6B', 'Grade 7A', 'Grade 7B', 'Grade 8A'];
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Art'];
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Presentation },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'performance', label: 'Class Performance', icon: Star }
  ];

  // Sample data
  const students: Student[] = [
    {
      id: 'student1',
      name: 'Emma Wilson',
      email: 'emma.wilson@school.edu',
      rollNumber: 'ST001',
      class: 'Grade 6A',
      section: 'A',
      avatar: 'EW',
      parentContact: {
        name: 'Robert Wilson',
        phone: '+1-555-0101',
        email: 'robert.wilson@gmail.com'
      },
      overallGrade: 'A-',
      gpa: 3.7,
      attendancePercentage: 94.5,
      assignmentCompletion: 89.2,
      projectCompletion: 92.5,
      behaviorScore: 4.2,
      strengths: ['Problem Solving', 'Creative Thinking', 'Leadership'],
      improvements: ['Time Management', 'Group Communication'],
      lastUpdated: '2024-09-08',
      assignments: [
        {
          id: 'a1',
          title: 'Algebraic Expressions Worksheet',
          subject: 'Mathematics',
          dueDate: '2024-09-10',
          submittedDate: '2024-09-09',
          status: 'graded',
          score: 85,
          maxScore: 100,
          feedback: 'Good understanding of basic concepts. Work on complex problems.'
        },
        {
          id: 'a2',
          title: 'Science Lab Report - Plant Growth',
          subject: 'Science',
          dueDate: '2024-09-12',
          status: 'pending',
          maxScore: 50
        }
      ],
      projects: [
        {
          id: 'p1',
          title: 'Solar System Model',
          type: 'individual',
          subject: 'Science',
          startDate: '2024-08-15',
          dueDate: '2024-09-30',
          completionPercentage: 75,
          status: 'in-progress',
          milestones: [
            { name: 'Research Phase', completed: true, dueDate: '2024-08-25' },
            { name: 'Material Collection', completed: true, dueDate: '2024-09-05' },
            { name: 'Model Construction', completed: false, dueDate: '2024-09-20' },
            { name: 'Presentation Prep', completed: false, dueDate: '2024-09-28' }
          ]
        }
      ],
      examResults: [
        {
          id: 'e1',
          examName: 'Mid-Term Mathematics',
          subject: 'Mathematics',
          date: '2024-08-30',
          score: 78,
          maxScore: 100,
          grade: 'B+',
          rank: 8,
          totalStudents: 32,
          topics: [
            { name: 'Algebra', score: 18, maxScore: 20 },
            { name: 'Geometry', score: 25, maxScore: 30 },
            { name: 'Statistics', score: 35, maxScore: 50 }
          ]
        }
      ],
      attendance: [
        { date: '2024-09-08', status: 'present', subject: 'Mathematics' },
        { date: '2024-09-08', status: 'present', subject: 'Science' },
        { date: '2024-09-07', status: 'late', subject: 'English', notes: '10 minutes late' }
      ],
      classPerformance: [
        {
          subject: 'Mathematics',
          participation: 4,
          behavior: 5,
          engagement: 4,
          collaboration: 3,
          notes: 'Excellent individual work, needs to improve group participation',
          lastUpdated: '2024-09-05'
        },
        {
          subject: 'Science',
          participation: 5,
          behavior: 4,
          engagement: 5,
          collaboration: 4,
          notes: 'Very engaged in lab activities, shows great curiosity',
          lastUpdated: '2024-09-06'
        }
      ]
    },
    {
      id: 'student2',
      name: 'Alex Johnson',
      email: 'alex.johnson@school.edu',
      rollNumber: 'ST002',
      class: 'Grade 6A',
      section: 'A',
      avatar: 'AJ',
      parentContact: {
        name: 'Sarah Johnson',
        phone: '+1-555-0102',
        email: 'sarah.johnson@gmail.com'
      },
      overallGrade: 'B+',
      gpa: 3.3,
      attendancePercentage: 87.2,
      assignmentCompletion: 78.5,
      projectCompletion: 85.0,
      behaviorScore: 4.0,
      strengths: ['Creative Arts', 'Technical Skills'],
      improvements: ['Mathematical Concepts', 'Time Management'],
      lastUpdated: '2024-09-08',
      assignments: [],
      projects: [],
      examResults: [],
      attendance: [],
      classPerformance: []
    }
  ];

  const currentStudent = students.find(s => s.id === selectedStudent);
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800',
      'graded': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'overdue': 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'submitted': 'bg-blue-100 text-blue-800',
      'not-started': 'bg-gray-100 text-gray-600',
      'present': 'bg-green-100 text-green-800',
      'absent': 'bg-red-100 text-red-800',
      'late': 'bg-yellow-100 text-yellow-800',
      'excused': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Students Progress Dashboard</h1>
              <p className="text-gray-600">Track individual student performance across all subjects and activities</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Students List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Students</h3>
                <span className="text-sm text-gray-500">{filteredStudents.length} students</span>
              </div>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Student List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStudent === student.id 
                        ? 'bg-indigo-50 border-2 border-indigo-200' 
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 text-sm truncate">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.rollNumber}</div>
                        <div className={`text-xs font-medium ${getGradeColor(student.overallGrade)}`}>
                          {student.overallGrade} ({student.gpa.toFixed(1)})
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="lg:col-span-3">
            {currentStudent ? (
              <div className="space-y-6">
                {/* Student Header */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {currentStudent.avatar}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{currentStudent.name}</h2>
                        <p className="text-gray-600">{currentStudent.rollNumber} • {currentStudent.class} - {currentStudent.section}</p>
                        <p className="text-sm text-gray-500">{currentStudent.email}</p>
                      </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getGradeColor(currentStudent.overallGrade)}`}>
                          {currentStudent.overallGrade}
                        </div>
                        <div className="text-sm text-gray-500">Overall Grade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{currentStudent.gpa.toFixed(1)}</div>
                        <div className="text-sm text-gray-500">GPA</div>
                      </div>
                    </div>
                  </div>

                  {/* Parent Contact */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Parent Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{currentStudent.parentContact.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{currentStudent.parentContact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{currentStudent.parentContact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardCheck className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">Attendance</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{currentStudent.attendancePercentage}%</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Assignments</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{currentStudent.assignmentCompletion}%</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Presentation className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600">Projects</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{currentStudent.projectCompletion}%</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-gray-600">Behavior</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{currentStudent.behaviorScore.toFixed(1)}/5</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="border-b border-gray-200">
                    <div className="flex overflow-x-auto">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                              activeTab === tab.id
                                ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Strengths and Improvements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Strengths
                            </h4>
                            <div className="space-y-2">
                              {currentStudent.strengths.map((strength, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-green-700">{strength}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <h4 className="font-medium text-yellow-800 mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Areas for Improvement
                            </h4>
                            <div className="space-y-2">
                              {currentStudent.improvements.map((improvement, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                                  <span className="text-sm text-yellow-700">{improvement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Recent Activity Summary
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-700 mb-2">Latest Assignment</h5>
                              {currentStudent.assignments.length > 0 ? (
                                <div>
                                  <div className="text-sm text-gray-600">{currentStudent.assignments[0].title}</div>
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(currentStudent.assignments[0].status)}`}>
                                    {currentStudent.assignments[0].status}
                                  </span>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500">No assignments yet</div>
                              )}
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-700 mb-2">Current Project</h5>
                              {currentStudent.projects.length > 0 ? (
                                <div>
                                  <div className="text-sm text-gray-600">{currentStudent.projects[0].title}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {currentStudent.projects[0].completionPercentage}% complete
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500">No projects assigned</div>
                              )}
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-700 mb-2">Latest Exam</h5>
                              {currentStudent.examResults.length > 0 ? (
                                <div>
                                  <div className="text-sm text-gray-600">{currentStudent.examResults[0].examName}</div>
                                  <div className="text-sm font-medium text-indigo-600 mt-1">
                                    {currentStudent.examResults[0].score}/{currentStudent.examResults[0].maxScore} ({currentStudent.examResults[0].grade})
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500">No exam results</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Assignments Tab */}
                    {activeTab === 'assignments' && (
                      <div className="space-y-4">
                        {currentStudent.assignments.length > 0 ? (
                          currentStudent.assignments.map((assignment) => (
                            <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-800">{assignment.title}</h4>
                                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}>
                                  {assignment.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Due Date:</span>
                                  <div className="font-medium">{assignment.dueDate}</div>
                                </div>
                                {assignment.submittedDate && (
                                  <div>
                                    <span className="text-gray-500">Submitted:</span>
                                    <div className="font-medium">{assignment.submittedDate}</div>
                                  </div>
                                )}
                                {assignment.score !== undefined && (
                                  <div>
                                    <span className="text-gray-500">Score:</span>
                                    <div className="font-medium">{assignment.score}/{assignment.maxScore}</div>
                                  </div>
                                )}
                              </div>
                              {assignment.feedback && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                  <span className="text-sm text-blue-800 font-medium">Feedback: </span>
                                  <span className="text-sm text-blue-700">{assignment.feedback}</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No assignments recorded yet</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                      <div className="space-y-4">
                        {currentStudent.projects.length > 0 ? (
                          currentStudent.projects.map((project) => (
                            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-800">{project.title}</h4>
                                  <p className="text-sm text-gray-600">{project.subject} • {project.type}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                                  {project.status}
                                </span>
                              </div>
                              <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-600">Progress</span>
                                  <span className="text-sm font-medium">{project.completionPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${project.completionPercentage}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                  <span className="text-gray-500">Start Date:</span>
                                  <div className="font-medium">{project.startDate}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Due Date:</span>
                                  <div className="font-medium">{project.dueDate}</div>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-700 mb-2">Milestones</h5>
                                <div className="space-y-2">
                                  {project.milestones.map((milestone, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                      <div className="flex items-center gap-2">
                                        {milestone.completed ? (
                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <Clock className="w-4 h-4 text-gray-400" />
                                        )}
                                        <span className={`text-sm ${milestone.completed ? 'text-green-700' : 'text-gray-600'}`}>
                                          {milestone.name}
                                        </span>
                                      </div>
                                      <span className="text-xs text-gray-500">{milestone.dueDate}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Presentation className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No projects assigned yet</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Exams Tab */}
                    {activeTab === 'exams' && (
                      <div className="space-y-4">
                        {currentStudent.examResults.length > 0 ? (
                          currentStudent.examResults.map((exam) => (
                            <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-800">{exam.examName}</h4>
                                  <p className="text-sm text-gray-600">{exam.subject} • {exam.date}</p>
                                </div>
                                <div className="text-right">
                                  <div className={`text-xl font-bold ${getGradeColor(exam.grade)}`}>
                                    {exam.grade}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {exam.score}/{exam.maxScore}
                                  </div>
                                </div>
                              </div>
                              {exam.rank && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                  <div className="text-sm text-blue-700">
                                    <strong>Class Rank:</strong> {exam.rank} out of {exam.totalStudents} students
                                  </div>
                                </div>
                              )}
                              <div>
                                <h5 className="font-medium text-gray-700 mb-2">Topic-wise Performance</h5>
                                <div className="space-y-2">
                                  {exam.topics.map((topic, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                      <span className="text-sm text-gray-700">{topic.name}</span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{topic.score}/{topic.maxScore}</span>
                                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                          <div 
                                            className="bg-indigo-500 h-1.5 rounded-full"
                                            style={{ width: `${(topic.score / topic.maxScore) * 100}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No exam results available</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Attendance Tab */}
                    {activeTab === 'attendance' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-800">Recent Attendance</h4>
                          <div className="text-sm text-gray-500">
                            Overall: {currentStudent.attendancePercentage}%
                          </div>
                        </div>
                        {currentStudent.attendance.length > 0 ? (
                          <div className="space-y-2">
                            {currentStudent.attendance.map((record, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="text-sm font-medium text-gray-800">{record.date}</div>
                                  <div className="text-sm text-gray-600">{record.subject}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                                    {record.status}
                                  </span>
                                  {record.notes && (
                                    <div className="text-xs text-gray-500">({record.notes})</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <ClipboardCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No attendance records available</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Class Performance Tab */}
                    {activeTab === 'performance' && (
                      <div className="space-y-4">
                        {currentStudent.classPerformance.length > 0 ? (
                          currentStudent.classPerformance.map((performance, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-gray-800">{performance.subject}</h4>
                                <div className="text-xs text-gray-500">Updated: {performance.lastUpdated}</div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Participation</div>
                                  {renderStarRating(performance.participation)}
                                  <div className="text-xs text-gray-500 mt-1">{performance.participation}/5</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Behavior</div>
                                  {renderStarRating(performance.behavior)}
                                  <div className="text-xs text-gray-500 mt-1">{performance.behavior}/5</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Engagement</div>
                                  {renderStarRating(performance.engagement)}
                                  <div className="text-xs text-gray-500 mt-1">{performance.engagement}/5</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Collaboration</div>
                                  {renderStarRating(performance.collaboration)}
                                  <div className="text-xs text-gray-500 mt-1">{performance.collaboration}/5</div>
                                </div>
                              </div>
                              {performance.notes && (
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <div className="text-sm text-blue-800">
                                    <strong>Teacher Notes:</strong> {performance.notes}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No performance data available</p>
                          </div>
                        )}
                        
                        {/* Add Performance Button */}
                        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                          <div className="flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Performance Assessment
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Edit3 className="w-4 h-4" />
                    Add Assessment
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Contact Parent
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Generate Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Full Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Student</h3>
                <p className="text-gray-600">Choose a student from the list to view their detailed progress</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsProgressDashboard;