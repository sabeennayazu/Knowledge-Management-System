"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Calendar, BookOpen, CheckCircle, Clock, AlertCircle, Users, Target, TrendingUp, Award } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
}

interface Chapter {
  id: string;
  name: string;
  totalTopics: number;
  completedTopics: number;
  status: 'completed' | 'in-progress' | 'pending';
  topics: Topic[];
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
}

interface Subject {
  id: string;
  name: string;
  teacher: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  totalChapters: number;
  completedChapters: number;
  chapters: Chapter[];
  progressPercentage: number;
  color: string;
}

interface ClassData {
  className: string;
  totalStudents: number;
  averageAttendance: number;
  subjects: Subject[];
  overallProgress: number;
  academicYear: string;
  semester: string;
}

const ClasswiseProgress = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 6A');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(['math']);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['ch1']);

  const classOptions = ['Grade 6A', 'Grade 6B', 'Grade 7A', 'Grade 7B', 'Grade 8A'];

  const classData: ClassData = {
    className: selectedClass,
    totalStudents: 32,
    averageAttendance: 87.5,
    academicYear: '2024-25',
    semester: 'Fall Semester',
    overallProgress: 73.2,
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        color: 'bg-blue-500',
        teacher: {
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@school.edu',
          phone: '+1-555-0123',
          avatar: 'SJ'
        },
        totalChapters: 8,
        completedChapters: 5,
        progressPercentage: 78.5,
        chapters: [
          {
            id: 'ch1',
            name: 'Number Systems and Operations',
            totalTopics: 6,
            completedTopics: 6,
            status: 'completed',
            startDate: '2024-08-15',
            expectedEndDate: '2024-09-10',
            actualEndDate: '2024-09-08',
            topics: [
              { id: 't1', name: 'Natural Numbers', status: 'completed', completedDate: '2024-08-18', estimatedHours: 4, actualHours: 3.5 },
              { id: 't2', name: 'Whole Numbers', status: 'completed', completedDate: '2024-08-22', estimatedHours: 4, actualHours: 4.2 },
              { id: 't3', name: 'Integers', status: 'completed', completedDate: '2024-08-28', estimatedHours: 6, actualHours: 5.8 },
              { id: 't4', name: 'Rational Numbers', status: 'completed', completedDate: '2024-09-02', estimatedHours: 5, actualHours: 5.5 },
              { id: 't5', name: 'Basic Operations', status: 'completed', completedDate: '2024-09-06', estimatedHours: 4, actualHours: 4.0 },
              { id: 't6', name: 'Problem Solving', status: 'completed', completedDate: '2024-09-08', estimatedHours: 3, actualHours: 2.8 }
            ]
          },
          {
            id: 'ch2',
            name: 'Algebraic Expressions',
            totalTopics: 5,
            completedTopics: 3,
            status: 'in-progress',
            startDate: '2024-09-12',
            expectedEndDate: '2024-10-05',
            topics: [
              { id: 't7', name: 'Variables and Constants', status: 'completed', completedDate: '2024-09-15', estimatedHours: 3, actualHours: 3.2 },
              { id: 't8', name: 'Simple Expressions', status: 'completed', completedDate: '2024-09-20', estimatedHours: 4, actualHours: 4.5 },
              { id: 't9', name: 'Like and Unlike Terms', status: 'in-progress', estimatedHours: 3 },
              { id: 't10', name: 'Addition and Subtraction', status: 'pending', estimatedHours: 4 },
              { id: 't11', name: 'Practical Applications', status: 'pending', estimatedHours: 3 }
            ]
          }
        ]
      },
      {
        id: 'science',
        name: 'Science',
        color: 'bg-green-500',
        teacher: {
          name: 'Prof. Michael Chen',
          email: 'michael.chen@school.edu',
          phone: '+1-555-0124',
          avatar: 'MC'
        },
        totalChapters: 10,
        completedChapters: 6,
        progressPercentage: 68.3,
        chapters: [
          {
            id: 'sc1',
            name: 'Living and Non-living Things',
            totalTopics: 4,
            completedTopics: 4,
            status: 'completed',
            startDate: '2024-08-20',
            expectedEndDate: '2024-09-15',
            actualEndDate: '2024-09-12',
            topics: [
              { id: 'st1', name: 'Characteristics of Living Things', status: 'completed', completedDate: '2024-08-25', estimatedHours: 3, actualHours: 3.0 },
              { id: 'st2', name: 'Classification Systems', status: 'completed', completedDate: '2024-08-30', estimatedHours: 4, actualHours: 4.2 },
              { id: 'st3', name: 'Microscopic Life', status: 'completed', completedDate: '2024-09-05', estimatedHours: 5, actualHours: 5.5 },
              { id: 'st4', name: 'Life Cycles', status: 'completed', completedDate: '2024-09-12', estimatedHours: 4, actualHours: 3.8 }
            ]
          }
        ]
      },
      {
        id: 'english',
        name: 'English Literature',
        color: 'bg-purple-500',
        teacher: {
          name: 'Ms. Emily Rodriguez',
          email: 'emily.rodriguez@school.edu',
          phone: '+1-555-0125',
          avatar: 'ER'
        },
        totalChapters: 12,
        completedChapters: 8,
        progressPercentage: 75.8,
        chapters: []
      }
    ]
  };

  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Classwise Progress Dashboard</h1>
              <p className="text-gray-600">Track academic progress and syllabus coverage across all subjects</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Class Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{classData.totalStudents}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Students</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{classData.averageAttendance}%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Average Attendance</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{classData.overallProgress.toFixed(1)}%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Overall Progress</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{classData.academicYear}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Academic Year</h3>
          </div>
        </div>

        {/* Subjects Progress */}
        <div className="space-y-6">
          {classData.subjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Subject Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSubject(subject.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {expandedSubjects.includes(subject.id) ? 
                        <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      }
                      <div className={`w-4 h-4 ${subject.color} rounded-full`}></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{subject.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {subject.completedChapters} of {subject.totalChapters} chapters completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{subject.progressPercentage.toFixed(1)}%</div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 ${subject.color} rounded-full transition-all duration-300`}
                          style={{ width: `${subject.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {subject.teacher.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{subject.teacher.name}</div>
                        <div className="text-sm text-gray-600">{subject.teacher.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Content */}
              {expandedSubjects.includes(subject.id) && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <div className="p-6">
                    {/* Teacher Contact Info */}
                    <div className="bg-white rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Subject Teacher Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <div className="font-medium">{subject.teacher.email}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <div className="font-medium">{subject.teacher.phone}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Contact Hours:</span>
                          <div className="font-medium">Mon-Fri, 9AM-5PM</div>
                        </div>
                      </div>
                    </div>

                    {/* Chapters List */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Chapter-wise Progress
                      </h4>
                      
                      {subject.chapters.map((chapter) => (
                        <div key={chapter.id} className="bg-white rounded-lg border">
                          {/* Chapter Header */}
                          <div 
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleChapter(chapter.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {expandedChapters.includes(chapter.id) ? 
                                  <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                                  <ChevronRight className="w-4 h-4 text-gray-500" />
                                }
                                {getStatusIcon(chapter.status)}
                                <div>
                                  <h5 className="font-medium text-gray-800">{chapter.name}</h5>
                                  <p className="text-sm text-gray-600">
                                    {chapter.completedTopics} of {chapter.totalTopics} topics completed
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chapter.status)}`}>
                                  {chapter.status.replace('-', ' ').toUpperCase()}
                                </span>
                                <div className="text-right text-sm">
                                  <div className="text-gray-600">Progress</div>
                                  <div className="font-medium">{Math.round((chapter.completedTopics / chapter.totalTopics) * 100)}%</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Chapter Details */}
                          {expandedChapters.includes(chapter.id) && (
                            <div className="border-t border-gray-100 p-4 bg-gray-50">
                              {/* Chapter Timeline */}
                              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Start Date:
                                  </span>
                                  <div className="font-medium">{chapter.startDate}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Expected End:</span>
                                  <div className="font-medium">{chapter.expectedEndDate}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Actual End:</span>
                                  <div className="font-medium">{chapter.actualEndDate || 'In Progress'}</div>
                                </div>
                              </div>

                              {/* Topics List */}
                              <div>
                                <h6 className="font-medium text-gray-800 mb-3">Topics Coverage</h6>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                  {chapter.topics.map((topic) => (
                                    <div key={topic.id} className="bg-white rounded p-3 border">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          {getStatusIcon(topic.status)}
                                          <span className="font-medium text-sm">{topic.name}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(topic.status)}`}>
                                          {topic.status}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-600 space-y-1">
                                        {topic.completedDate && (
                                          <div>Completed: {topic.completedDate}</div>
                                        )}
                                        <div className="flex justify-between">
                                          <span>Estimated: {topic.estimatedHours}h</span>
                                          {topic.actualHours && (
                                            <span>Actual: {topic.actualHours}h</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClasswiseProgress;