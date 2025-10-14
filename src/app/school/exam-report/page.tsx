"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, TrendingUp, TrendingDown, Award, Calendar, 
  Filter, Search, Download, Eye, BarChart3, PieChart, Target,
  GraduationCap, Clock, ChevronDown, ChevronRight, FileText,
  Star, AlertCircle, CheckCircle2, XCircle, User, School,
  ArrowUp, ArrowDown, Minus, RefreshCw, Settings, Mail,
  ChevronLeft, ChevronUp, Plus, Book
} from 'lucide-react';

// Mock data for classwise results
const mockClassData = [
  {
    id: 'class_10_a',
    className: 'Class 10 - A',
    section: 'A',
    grade: 10,
    totalStudents: 32,
    classTeacher: 'Mrs. Sarah Johnson',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English'],
    academicYear: '2024-2025',
    term: 'Mid-Term',
    averagePerformance: 78.5,
    passRate: 87.5,
    topPerformer: 'Alice Chen',
    attendanceRate: 92.3
  },
  {
    id: 'class_9_b',
    className: 'Class 9 - B',
    section: 'B',
    grade: 9,
    totalStudents: 28,
    classTeacher: 'Mr. David Williams',
    subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Art & Design'],
    academicYear: '2024-2025',
    term: 'Mid-Term',
    averagePerformance: 74.2,
    passRate: 82.1,
    topPerformer: 'Raj Patel',
    attendanceRate: 89.7
  },
  {
    id: 'class_8_a',
    className: 'Class 8 - A',
    section: 'A',
    grade: 8,
    totalStudents: 30,
    classTeacher: 'Ms. Emily Davis',
    subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Technology'],
    academicYear: '2024-2025',
    term: 'Mid-Term',
    averagePerformance: 81.3,
    passRate: 90.0,
    topPerformer: 'Maria Rodriguez',
    attendanceRate: 94.2
  }
];

const mockStudentResults = [
  {
    id: 'student_001',
    rollNumber: 'S001',
    name: 'Alice Chen',
    classId: 'class_10_a',
    overallPercentage: 92.5,
    overallGrade: 'A+',
    rank: 1,
    attendance: 96.5,
    subjects: [
      { subject: 'Mathematics', score: 95, grade: 'A+', maxMarks: 100, teacher: 'Dr. Smith' },
      { subject: 'Physics', score: 90, grade: 'A+', maxMarks: 100, teacher: 'Prof. Johnson' },
      { subject: 'Chemistry', score: 88, grade: 'A', maxMarks: 100, teacher: 'Dr. Wilson' },
      { subject: 'Biology', score: 94, grade: 'A+', maxMarks: 100, teacher: 'Ms. Brown' },
      { subject: 'Computer Science', score: 98, grade: 'A+', maxMarks: 100, teacher: 'Mr. Taylor' },
      { subject: 'English', score: 90, grade: 'A+', maxMarks: 100, teacher: 'Mrs. Davis' }
    ],
    activities: [
      { activity: 'Science Fair', achievement: 'Gold Medal', date: '2024-08-15' },
      { activity: 'Math Olympiad', achievement: '2nd Place', date: '2024-07-20' }
    ],
    assessments: [
      { type: 'Mid-Term Exam', totalScore: 555, maxScore: 600, percentage: 92.5 },
      { type: 'Unit Tests', averageScore: 89.2, count: 12 },
      { type: 'Projects', averageScore: 94.1, count: 6 }
    ],
    parentContact: { name: 'Robert Chen', email: 'robert.chen@email.com', phone: '+1-555-0123' },
    remarks: 'Exceptional performance in all subjects. Shows leadership qualities.',
    lastUpdated: '2024-09-01T10:00:00Z'
  },
  {
    id: 'student_002',
    rollNumber: 'S002',
    name: 'Bob Wilson',
    classId: 'class_10_a',
    overallPercentage: 76.8,
    overallGrade: 'B+',
    rank: 8,
    attendance: 88.2,
    subjects: [
      { subject: 'Mathematics', score: 72, grade: 'B', maxMarks: 100, teacher: 'Dr. Smith' },
      { subject: 'Physics', score: 78, grade: 'B+', maxMarks: 100, teacher: 'Prof. Johnson' },
      { subject: 'Chemistry', score: 74, grade: 'B', maxMarks: 100, teacher: 'Dr. Wilson' },
      { subject: 'Biology', score: 80, grade: 'B+', maxMarks: 100, teacher: 'Ms. Brown' },
      { subject: 'Computer Science', score: 82, grade: 'A-', maxMarks: 100, teacher: 'Mr. Taylor' },
      { subject: 'English', score: 75, grade: 'B+', maxMarks: 100, teacher: 'Mrs. Davis' }
    ],
    activities: [
      { activity: 'Sports Day', achievement: 'Bronze Medal', date: '2024-08-10' }
    ],
    assessments: [
      { type: 'Mid-Term Exam', totalScore: 461, maxScore: 600, percentage: 76.8 },
      { type: 'Unit Tests', averageScore: 74.5, count: 12 },
      { type: 'Projects', averageScore: 78.3, count: 6 }
    ],
    parentContact: { name: 'Jennifer Wilson', email: 'jennifer.wilson@email.com', phone: '+1-555-0124' },
    remarks: 'Good potential. Needs to improve consistency in Mathematics.',
    lastUpdated: '2024-09-01T10:00:00Z'
  },
  {
    id: 'student_003',
    rollNumber: 'S003',
    name: 'Carol Martinez',
    classId: 'class_10_a',
    overallPercentage: 64.2,
    overallGrade: 'C+',
    rank: 18,
    attendance: 82.1,
    subjects: [
      { subject: 'Mathematics', score: 58, grade: 'C', maxMarks: 100, teacher: 'Dr. Smith' },
      { subject: 'Physics', score: 62, grade: 'C+', maxMarks: 100, teacher: 'Prof. Johnson' },
      { subject: 'Chemistry', score: 60, grade: 'C', maxMarks: 100, teacher: 'Dr. Wilson' },
      { subject: 'Biology', score: 70, grade: 'B-', maxMarks: 100, teacher: 'Ms. Brown' },
      { subject: 'Computer Science', score: 68, grade: 'C+', maxMarks: 100, teacher: 'Mr. Taylor' },
      { subject: 'English', score: 67, grade: 'C+', maxMarks: 100, teacher: 'Mrs. Davis' }
    ],
    activities: [],
    assessments: [
      { type: 'Mid-Term Exam', totalScore: 385, maxScore: 600, percentage: 64.2 },
      { type: 'Unit Tests', averageScore: 61.8, count: 12 },
      { type: 'Projects', averageScore: 66.5, count: 6 }
    ],
    parentContact: { name: 'Carlos Martinez', email: 'carlos.martinez@email.com', phone: '+1-555-0125' },
    remarks: 'Requires additional support. Parent meeting recommended.',
    lastUpdated: '2024-09-01T10:00:00Z'
  }
];

interface Class {
  id: string;
  className: string;
  section: string;
  grade: number;
  totalStudents: number;
  classTeacher: string;
  subjects: string[];
  academicYear: string;
  term: string;
  averagePerformance: number;
  passRate: number;
  topPerformer: string;
  attendanceRate: number;
}

interface StudentResult {
  id: string;
  rollNumber: string;
  name: string;
  classId: string;
  overallPercentage: number;
  overallGrade: string;
  rank: number;
  attendance: number;
  subjects: SubjectResult[];
  activities: Activity[];
  assessments: Assessment[];
  parentContact: ParentContact;
  remarks: string;
  lastUpdated: string;
}

interface SubjectResult {
  subject: string;
  score: number;
  grade: string;
  maxMarks: number;
  teacher: string;
}

interface Activity {
  activity: string;
  achievement: string;
  date: string;
}

interface Assessment {
  type: string;
  totalScore?: number;
  maxScore?: number;
  percentage?: number;
  averageScore?: number;
  count?: number;
}

interface ParentContact {
  name: string;
  email: string;
  phone: string;
}

const ClasswiseResultsDashboard: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [view, setView] = useState<'overview' | 'detailed' | 'student'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'percentage' | 'attendance'>('rank');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const filteredClasses = mockClassData.filter(cls => {
    const matchesSearch = cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || cls.grade.toString() === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const getClassStudents = (classId: string) => {
    return mockStudentResults
      .filter(student => student.classId === classId)
      .sort((a, b) => {
        switch (sortBy) {
          case 'rank': return a.rank - b.rank;
          case 'percentage': return b.overallPercentage - a.overallPercentage;
          case 'attendance': return b.attendance - a.attendance;
          default: return 0;
        }
      });
  };

  const getPerformanceColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceBg = (percentage: number): string => {
    if (percentage >= 90) return 'bg-green-50 border-green-200';
    if (percentage >= 80) return 'bg-blue-50 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-50 border-yellow-200';
    if (percentage >= 60) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getGradeIcon = (grade: string) => {
    if (grade.includes('A')) return <Star className="w-4 h-4 text-yellow-500" />;
    if (grade.includes('B')) return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (grade.includes('C')) return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const toggleCardExpansion = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  // Overview Dashboard
  if (view === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Classwise Results Dashboard</h1>
                <p className="text-gray-600">Monitor and analyze student performance across all classes</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Classes</p>
                  <p className="text-3xl font-bold text-gray-800">{mockClassData.length}</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <School className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {mockClassData.reduce((sum, cls) => sum + cls.totalStudents, 0)}
                  </p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Average Performance</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {Math.round(mockClassData.reduce((sum, cls) => sum + cls.averagePerformance, 0) / mockClassData.length)}%
                  </p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Overall Pass Rate</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {Math.round(mockClassData.reduce((sum, cls) => sum + cls.passRate, 0) / mockClassData.length)}%
                  </p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by class name or teacher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Grades</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>

          {/* Class Cards */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClasses.map((classData) => {
              const isExpanded = expandedCards.has(classData.id);
              
              return (
                <div key={classData.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    {/* Class Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{classData.className}</h3>
                        <p className="text-gray-600 text-sm">by {classData.classTeacher}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getPerformanceColor(classData.averagePerformance)}`}>
                          {Math.round(classData.averagePerformance)}%
                        </div>
                        <div className="text-xs text-gray-500">Avg Performance</div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{classData.totalStudents} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{classData.passRate}% pass rate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-gray-700">Top: {classData.topPerformer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-700">{classData.attendanceRate}% attendance</span>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Class Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Academic Year:</span>
                            <span className="font-medium">{classData.academicYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Term:</span>
                            <span className="font-medium">{classData.term}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subjects:</span>
                            <span className="font-medium">{classData.subjects.length} subjects</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h5 className="font-medium text-gray-700 mb-2">Subjects</h5>
                          <div className="flex flex-wrap gap-1">
                            {classData.subjects.slice(0, 4).map((subject, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {subject}
                              </span>
                            ))}
                            {classData.subjects.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                +{classData.subjects.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedClass(classData);
                          setView('detailed');
                        }}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Results
                      </button>
                      <button
                        onClick={() => toggleCardExpansion(classData.id)}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="bg-gray-50 px-6 py-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Class Performance</span>
                      <span>{classData.averagePerformance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          classData.averagePerformance >= 80 ? 'bg-green-500' :
                          classData.averagePerformance >= 70 ? 'bg-blue-500' :
                          classData.averagePerformance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${classData.averagePerformance}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No classes found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detailed Class View
  if (view === 'detailed' && selectedClass) {
    const classStudents = getClassStudents(selectedClass.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setView('overview')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="bg-blue-100 rounded-lg p-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedClass.className}</h1>
                <p className="text-gray-600">Detailed Results Analysis</p>
              </div>
            </div>
          </div>

          {/* Class Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-gray-800">{selectedClass.totalStudents}</p>
                  <p className="text-xs text-gray-500 mt-1">in {selectedClass.className}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Class Average</p>
                  <p className={`text-3xl font-bold ${getPerformanceColor(selectedClass.averagePerformance)}`}>
                    {selectedClass.averagePerformance}%
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Above target
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pass Rate</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedClass.passRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">{Math.round(selectedClass.totalStudents * selectedClass.passRate / 100)} students passed</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Attendance</p>
                  <p className="text-3xl font-bold text-yellow-600">{selectedClass.attendanceRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">Average attendance rate</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rank">Sort by Rank</option>
                  <option value="percentage">Sort by Score</option>
                  <option value="attendance">Sort by Attendance</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Results
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact Parents
                </button>
              </div>
            </div>
          </div>

          {/* Students Results Table/Cards */}
          <div className="space-y-4">
            {classStudents
              .filter(student => 
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((student) => (
                <div key={student.id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${getPerformanceBg(student.overallPercentage)}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                          <p className="text-gray-600 text-sm">Roll No: {student.rollNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getPerformanceColor(student.overallPercentage)}`}>
                          {student.overallPercentage}%
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          {getGradeIcon(student.overallGrade)}
                          <span>{student.overallGrade}</span>
                          <span className="ml-2">Rank #{student.rank}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Overall Score</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">{student.overallPercentage}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">Class Rank</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">#{student.rank}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">Attendance</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">{student.attendance}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-gray-700">Subjects</span>
                        </div>
                        <div className="text-lg font-bold text-orange-600">{student.subjects.length}</div>
                      </div>
                    </div>

                    {/* Subject Scores Overview */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Subject Performance</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {student.subjects.map((subject, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-800 text-sm">{subject.subject}</span>
                              <span className={`font-bold ${getPerformanceColor(subject.score)}`}>
                                {subject.score}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {getGradeIcon(subject.grade)}
                              <span className="text-sm text-gray-600">{subject.grade}</span>
                              <span className="text-xs text-gray-500 ml-auto">by {subject.teacher}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  subject.score >= 80 ? 'bg-green-500' :
                                  subject.score >= 70 ? 'bg-blue-500' :
                                  subject.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${subject.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setView('student');
                        }}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Contact Parent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {classStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No students found</h3>
                <p className="text-gray-600">No students match your search criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Individual Student View
  if (view === 'student' && selectedStudent && selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setView('detailed')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedStudent.name}</h1>
                <p className="text-gray-600">Detailed Performance Report - {selectedClass.className}</p>
              </div>
            </div>
          </div>

          {/* Student Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Student Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Roll Number:</span>
                    <span className="font-semibold">{selectedStudent.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-semibold">{selectedClass.className}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall Grade:</span>
                    <div className="flex items-center gap-1">
                      {getGradeIcon(selectedStudent.overallGrade)}
                      <span className="font-semibold">{selectedStudent.overallGrade}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class Rank:</span>
                    <span className="font-semibold">#{selectedStudent.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance:</span>
                    <span className="font-semibold">{selectedStudent.attendance}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Parent Contact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parent Name:</span>
                    <span className="font-semibold">{selectedStudent.parentContact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold text-blue-600">{selectedStudent.parentContact.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold">{selectedStudent.parentContact.phone}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Report to Parent
                </button>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className={`rounded-xl shadow-lg p-6 border-2 ${getPerformanceBg(selectedStudent.overallPercentage)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Overall Score</p>
                  <p className={`text-3xl font-bold ${getPerformanceColor(selectedStudent.overallPercentage)}`}>
                    {selectedStudent.overallPercentage}%
                  </p>
                </div>
                <BarChart3 className={`w-8 h-8 ${getPerformanceColor(selectedStudent.overallPercentage).replace('text', 'text')}`} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Class Rank</p>
                  <p className="text-3xl font-bold text-purple-600">#{selectedStudent.rank}</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Subjects</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedStudent.subjects.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Attendance</p>
                  <p className="text-3xl font-bold text-green-600">{selectedStudent.attendance}%</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Subject Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Subject Performance</h3>
              <div className="space-y-4">
                {selectedStudent.subjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{subject.subject}</h4>
                        <p className="text-sm text-gray-600">Teacher: {subject.teacher}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getPerformanceColor(subject.score)}`}>
                          {subject.score}%
                        </div>
                        <div className="flex items-center gap-1">
                          {getGradeIcon(subject.grade)}
                          <span className="text-sm font-medium">{subject.grade}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          subject.score >= 80 ? 'bg-green-500' :
                          subject.score >= 70 ? 'bg-blue-500' :
                          subject.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.score}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {subject.score}/{subject.maxMarks} marks
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Breakdown & Activities */}
            <div className="space-y-8">
              {/* Assessments */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Assessment Breakdown</h3>
                <div className="space-y-4">
                  {selectedStudent.assessments.map((assessment, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">{assessment.type}</h4>
                        <span className={`font-bold ${
                          assessment.percentage ? getPerformanceColor(assessment.percentage) : 'text-blue-600'
                        }`}>
                          {assessment.percentage ? `${assessment.percentage}%` : 
                           assessment.averageScore ? `${assessment.averageScore}%` : 'N/A'}
                        </span>
                      </div>
                      {assessment.totalScore && (
                        <p className="text-sm text-gray-600">
                          {assessment.totalScore}/{assessment.maxScore} marks
                        </p>
                      )}
                      {assessment.count && (
                        <p className="text-sm text-gray-600">
                          Based on {assessment.count} assessments
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities & Achievements */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Activities & Achievements</h3>
                {selectedStudent.activities.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStudent.activities.map((activity, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">{activity.activity}</h4>
                            <p className="text-yellow-700 font-medium">{activity.achievement}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No activities recorded yet</p>
                  </div>
                )}
              </div>

              {/* Teacher Remarks */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Teacher's Remarks</h3>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-gray-800 italic">"{selectedStudent.remarks}"</p>
                  <div className="text-sm text-gray-600 mt-2">
                    Last updated: {new Date(selectedStudent.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email to Parent
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Update Record
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ClasswiseResultsDashboard;