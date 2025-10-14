"use client";
import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag, AlertCircle, CheckCircle2, Circle, User, BookOpen, Calendar, Timer, Eye, Award, TrendingUp, BarChart3, ChevronDown, ChevronUp, Play, FileText, Upload, X, Download, Plus, Minus } from 'lucide-react';

// Mock exam data - enhanced with more subjective questions
const mockExamsData: Exam[] = [
  {
    id: 'exam_001',
    title: 'Robotics Fundamentals - Mid Term',
    subject: 'Robotics & IoT',
    duration: 45,
    totalQuestions: 11,
    tenant: 'TechEdu Institute',
    instructor: 'Dr. Sarah Johnson',
    description: 'This comprehensive exam covers fundamental robotics concepts including sensors, actuators, control systems, and IoT integration. Students will be tested on theoretical knowledge as well as practical applications in real-world scenarios.',
    dateCreated: '2024-08-15',
    dueDate: '2024-09-01',
    status: 'available' as const,
    difficulty: 'Intermediate' as const,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which sensor is commonly used to measure distance in robotics applications?',
        options: ['Accelerometer', 'Ultrasonic sensor', 'Gyroscope', 'Temperature sensor'],
        correctAnswer: 1
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'What does IoT stand for in the context of modern robotics?',
        options: ['Internet of Things', 'Integration of Technology', 'Intelligence of Things', 'Interface of Technology'],
        correctAnswer: 0
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which programming language is most commonly used for Arduino-based robotics projects?',
        options: ['Python', 'JavaScript', 'C/C++', 'Java'],
        correctAnswer: 2
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What is the primary function of a servo motor in robotics?',
        options: ['Generate random movements', 'Provide precise angular position control', 'Measure temperature', 'Detect obstacles'],
        correctAnswer: 1
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'In IoT applications, what protocol is commonly used for lightweight messaging?',
        options: ['HTTP', 'FTP', 'MQTT', 'SMTP'],
        correctAnswer: 2
      },
      {
        id: 6,
        type: 'subjective',
        question: 'Design and explain a complete IoT-based home automation system. Include a detailed circuit diagram, component specifications, and programming logic. Discuss the security considerations and potential challenges in implementation.',
        maxFileSize: 10,
        allowedFormats: ['pdf', 'doc', 'docx']
      },
      {
        id: 7,
        type: 'subjective',
        question: 'Create a detailed flowchart and pseudocode for a line-following robot algorithm. Explain how the robot detects the line, makes decisions at intersections, and handles obstacles. Include error handling and optimization strategies.',
        maxFileSize: 5,
        allowedFormats: ['pdf', 'docx', 'jpg', 'png']
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'Which communication protocol is best suited for real-time robotics control?',
        options: ['TCP/IP', 'UDP', 'Serial Communication', 'Bluetooth'],
        correctAnswer: 2
      },
      {
        id: 9,
        type: 'subjective',
        question: 'Analyze a real-world robotics application (manufacturing, healthcare, agriculture, etc.). Discuss the technical challenges, solutions implemented, and future improvements. Support your analysis with relevant diagrams and data.',
        maxFileSize: 15,
        allowedFormats: ['pdf', 'doc', 'docx']
      },
      {
        id: 10,
        type: 'multiple-choice',
        question: 'What is the primary advantage of using ROS (Robot Operating System) in robotics development?',
        options: ['Faster processing speed', 'Modular architecture and code reusability', 'Lower cost', 'Better graphics'],
        correctAnswer: 1
      },
      {
        id: 11,
        type: 'subjective',
        question: 'Design a robotic arm control system with at least 3 degrees of freedom. Provide kinematic equations, control algorithms, and safety mechanisms. Include simulation results or theoretical analysis.',
        maxFileSize: 20,
        allowedFormats: ['pdf', 'docx', 'zip']
      }
    ]
  },
  {
    id: 'exam_002',
    title: 'Arduino Programming Basics',
    subject: 'Programming',
    duration: 60,
    totalQuestions: 15,
    tenant: 'CodeAcademy Pro',
    instructor: 'Prof. Michael Chen',
    description: 'An in-depth examination of Arduino programming fundamentals, covering C/C++ syntax, digital and analog I/O operations, interrupt handling, and serial communication protocols.',
    dateCreated: '2024-08-20',
    dueDate: '2024-09-05',
    status: 'completed' as const,
    difficulty: 'Beginner' as const,
    passingScore: 60,
    questions: [],
    result: {
      score: 85,
      percentage: 85,
      passed: true,
      timeSpent: 45,
      correctAnswers: 13,
      submittedAt: '2024-08-25T10:30:00Z'
    }
  },
  {
    id: 'exam_003',
    title: 'Advanced Sensor Integration',
    subject: 'Robotics & IoT',
    duration: 90,
    totalQuestions: 20,
    tenant: 'RoboTech University',
    instructor: 'Dr. Emma Wilson',
    description: 'This advanced exam focuses on complex sensor integration techniques, data fusion algorithms, calibration methods, and real-time processing for autonomous robotics systems.',
    dateCreated: '2024-08-25',
    dueDate: '2024-09-10',
    status: 'upcoming' as const,
    difficulty: 'Advanced' as const,
    passingScore: 75,
    questions: []
  }
];

interface Question {
  id: number;
  type: 'multiple-choice' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: number;
  maxFileSize?: number;
  allowedFormats?: string[];
}

interface ExamResult {
  examId?: string;
  score?: number;
  correctAnswers?: number;
  timeSpent: number;
  passed?: boolean;
  percentage?: number;
  totalQuestions?: number;
  answers?: Record<number, number>;
  subjectiveFiles?: File[];
  submittedAt: string;
  gradingStatus?: 'pending' | 'graded';
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  status: 'available' | 'completed' | 'upcoming';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  totalQuestions: number;
  questions: Question[];
  description: string;
  instructor: string;
  date?: string;
  dueDate: string;
  dateCreated: string;
  passingScore: number;
  tenant: string;
  result?: ExamResult;
}

interface ExamCardProps {
  exam: Exam;
  onStartExam: (exam: Exam) => void;
  onViewResults: (exam: Exam) => void;
}

interface ExamListPageProps {
  onStartExam: (exam: Exam) => void;
  onViewResults: (exam: Exam) => void;
}

interface ExamTakingPageProps {
  exam: Exam;
  onBackToList: () => void;
  onSubmitExam: (result: ExamResult) => void;
}

interface ExamResultsPageProps {
  exam: Exam;
  result: ExamResult;
  onBackToList: () => void;
}

interface ExamSubmittedPageProps {
  result: ExamResult;
  onBackToList: () => void;
  onViewResults: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ExamCard: React.FC<ExamCardProps> = ({ exam, onStartExam, onViewResults }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = (status: 'available' | 'completed' | 'upcoming' | string): string => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getDifficultyColor = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string): string => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-yellow-600';
      case 'Advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Count question types
  const objectiveCount = exam.questions.filter(q => q.type === 'multiple-choice').length;
  const subjectiveCount = exam.questions.filter(q => q.type === 'subjective').length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-800">{exam.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
                {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600 text-sm">by {exam.tenant}</p>
          </div>
          {exam.result && (
            <div className="text-right">
              <div className={`text-2xl font-bold ${exam.result.passed ? 'text-green-600' : 'text-red-600'}`}>
                {exam.result.percentage}%
              </div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          )}
        </div>

        {/* Quick Details */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">{exam.subject}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Timer className="w-4 h-4" />
            <span className="text-sm">{exam.duration} min</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="text-sm">{exam.totalQuestions} questions</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Circle className="w-4 h-4" />
            <span className="text-sm">{objectiveCount} MCQ / {subjectiveCount} Essay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getDifficultyColor(exam.difficulty)}`}>
              {exam.difficulty}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {isExpanded 
              ? exam.description 
              : `${exam.description.substring(0, 120)}${exam.description.length > 120 ? '...' : ''}`
            }
          </p>
          {exam.description.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  See less <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  See more <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm"><strong>Instructor:</strong> {exam.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm"><strong>Due Date:</strong> {formatDate(exam.dueDate)}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm"><strong>Passing Score:</strong> {exam.passingScore}%</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm"><strong>Created:</strong> {formatDate(exam.dateCreated)}</span>
                </div>
              </div>
            </div>
            
            {/* Question Breakdown */}
            {(objectiveCount > 0 || subjectiveCount > 0) && (
              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Question Breakdown:</h4>
                <div className="flex gap-4">
                  {objectiveCount > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {objectiveCount} Multiple Choice
                    </span>
                  )}
                  {subjectiveCount > 0 && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {subjectiveCount} Essay/Upload
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {exam.result && (
          <div className="bg-blue-50 rounded-lg p-6 mb-4">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Your Results
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${exam.result.score ? 'text-blue-600' : 'text-orange-600'}`}>
                  {exam.result.score || 'Pending'}%
                </div>
                <div className="text-xs text-blue-700">Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{exam.result.correctAnswers || 0}/{exam.totalQuestions}</div>
                <div className="text-xs text-blue-700">Graded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{exam.result.timeSpent}m</div>
                <div className="text-xs text-blue-700">Time Used</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${
                  exam.result.passed === undefined ? 'text-orange-600' : 
                  exam.result.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {exam.result.passed === undefined ? 'PENDING' : exam.result.passed ? 'PASS' : 'FAIL'}
                </div>
                <div className="text-xs text-gray-600">Status</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {exam.status === 'available' && (
            <button
              onClick={() => onStartExam(exam)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Exam
            </button>
          )}
          {exam.status === 'completed' && (
            <button
              onClick={() => onViewResults(exam)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Results
            </button>
          )}
          {exam.status === 'upcoming' && (
            <button
              disabled
              className="flex-1 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Available Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ExamListPage: React.FC<ExamListPageProps> = ({ onStartExam, onViewResults }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredExams = mockExamsData.filter(exam => {
    if (filter === 'all') return true;
    return exam.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Exam Section</h1>
          <p className="text-gray-600">Take exams and track your progress in Robotics & IoT</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'all', label: 'All Exams', count: mockExamsData.length },
            { key: 'available', label: 'Available', count: mockExamsData.filter(e => e.status === 'available').length },
            { key: 'completed', label: 'Completed', count: mockExamsData.filter(e => e.status === 'completed').length },
            { key: 'upcoming', label: 'Upcoming', count: mockExamsData.filter(e => e.status === 'upcoming').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filter === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Exam Cards */}
        <div className="grid gap-6">
          {filteredExams.map(exam => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onStartExam={onStartExam}
              onViewResults={onViewResults}
            />
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No exams found</h3>
              <p className="text-gray-600">No exams match the current filter. Try selecting a different category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ExamTakingPage: React.FC<ExamTakingPageProps> = ({ exam, onBackToList, onSubmitExam }) => {
  const [currentSection, setCurrentSection] = useState<'objective' | 'subjective'>('objective');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [subjectiveFiles, setSubjectiveFiles] = useState<File[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(exam.duration * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Separate questions by type
  const objectiveQuestions = exam.questions.filter(q => q.type === 'multiple-choice');
  const subjectiveQuestions = exam.questions.filter(q => q.type === 'subjective');

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const validateFiles = (files: FileList): string[] => {
    const errors: string[] = [];
    const maxTotalSize = 50 * 1024 * 1024; // 50MB total limit
    const allowedFormats = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'zip'];
    
    let totalSize = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      totalSize += file.size;
      
      // Check individual file size (max 10MB per file)
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name}: File size exceeds 10MB limit`);
      }
      
      // Check file format
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedFormats.includes(fileExtension)) {
        errors.push(`${file.name}: Invalid format. Only ${allowedFormats.join(', ').toUpperCase()} files are allowed`);
      }
    }
    
    // Check total size
    if (totalSize > maxTotalSize) {
      errors.push(`Total file size exceeds 50MB limit (current: ${formatFileSize(totalSize)})`);
    }
    
    return errors;
  };

  const handleFilesUpload = (files: FileList) => {
    setUploadErrors([]);
    
    const errors = validateFiles(files);
    if (errors.length > 0) {
      setUploadErrors(errors);
      return;
    }
    
    const fileArray = Array.from(files);
    setSubjectiveFiles(prev => [...prev, ...fileArray]);
  };

  const handleFileRemove = (index: number) => {
    setSubjectiveFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFilesUpload(files);
    }
  };

  const handleSubmitExam = () => {
    const timeSpent = exam.duration - Math.floor(timeRemaining / 60);
    
    if (objectiveQuestions.length > 0) {
      const correctCount = Object.entries(answers).reduce((count, [qId, answer]) => {
        const question = objectiveQuestions.find(q => q.id === parseInt(qId));
        return question && question.correctAnswer === answer ? count + 1 : count;
      }, 0);
      
      if (subjectiveQuestions.length > 0) {
        // Mixed exam - objective auto-graded, subjective pending
        onSubmitExam({
          examId: exam.id,
          score: undefined,
          percentage: undefined,
          passed: undefined,
          timeSpent,
          correctAnswers: correctCount,
          totalQuestions: exam.questions.length,
          answers,
          subjectiveFiles,
          submittedAt: new Date().toISOString(),
          gradingStatus: 'pending'
        });
      } else {
        // Pure objective exam
        const objectiveScore = Math.round((correctCount / objectiveQuestions.length) * 100);
        onSubmitExam({
          examId: exam.id,
          score: objectiveScore,
          percentage: objectiveScore,
          passed: objectiveScore >= exam.passingScore,
          timeSpent,
          correctAnswers: correctCount,
          totalQuestions: exam.questions.length,
          answers,
          submittedAt: new Date().toISOString(),
          gradingStatus: 'graded'
        });
      }
    } else {
      // Pure subjective exam
      onSubmitExam({
        examId: exam.id,
        timeSpent,
        totalQuestions: exam.questions.length,
        subjectiveFiles,
        submittedAt: new Date().toISOString(),
        gradingStatus: 'pending'
      });
    }
  };

  const getObjectiveAnsweredCount = () => Object.keys(answers).length;
  const hasSubjectiveFiles = subjectiveFiles.length > 0;

  const currentObjectiveQuestion = objectiveQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToList}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="bg-blue-100 rounded-lg p-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{exam.title}</h1>
                <p className="text-sm text-gray-600">{exam.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="font-bold text-blue-600">
                  {getObjectiveAnsweredCount()}/{objectiveQuestions.length} MCQ | {hasSubjectiveFiles ? 'Files Uploaded' : 'No Files'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Time Remaining</div>
                <div className={`font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-green-600'}`}>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {formatTime(timeRemaining)}
                </div>
              </div>
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Flag className="w-4 h-4 inline mr-2" />
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Exam Sections</h3>
            
            {/* Section Tabs */}
            <div className="space-y-2 mb-6">
              {objectiveQuestions.length > 0 && (
                <button
                  onClick={() => {
                    setCurrentSection('objective');
                    setCurrentQuestion(0);
                  }}
                  className={`w-full p-3 rounded-lg font-medium transition-all text-left ${
                    currentSection === 'objective'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="w-4 h-4" />
                      <span>Multiple Choice</span>
                    </div>
                    <span className="text-xs opacity-75">
                      {getObjectiveAnsweredCount()}/{objectiveQuestions.length}
                    </span>
                  </div>
                </button>
              )}
              
              {subjectiveQuestions.length > 0 && (
                <button
                  onClick={() => setCurrentSection('subjective')}
                  className={`w-full p-3 rounded-lg font-medium transition-all text-left ${
                    currentSection === 'subjective'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Essay Questions</span>
                    </div>
                    <span className="text-xs opacity-75">
                      {subjectiveFiles.length} files
                    </span>
                  </div>
                </button>
              )}
            </div>
            
            {/* Question Navigation for Objective Section */}
            {currentSection === 'objective' && objectiveQuestions.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Questions</h4>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                  {objectiveQuestions.map((question, index) => {
                    const isAnswered = answers[question.id] !== undefined;
                    const isCurrent = currentQuestion === index;
                    
                    return (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          isCurrent ? 'bg-blue-600 text-white ring-2 ring-blue-300' :
                          isAnswered ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                          {isAnswered ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                          <span className="hidden lg:inline">Q{index + 1}</span>
                          <span className="lg:hidden">{index + 1}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Subjective Questions List */}
            {currentSection === 'subjective' && subjectiveQuestions.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Essay Questions ({subjectiveQuestions.length})</h4>
                <div className="space-y-2">
                  {subjectiveQuestions.map((question, index) => (
                    <div key={question.id} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-sm">Question {exam.questions.findIndex(q => q.id === question.id) + 1}</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {question.question.substring(0, 80)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Progress Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>MCQ Answered:</span>
                  <span className="font-medium">{getObjectiveAnsweredCount()}/{objectiveQuestions.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Files Uploaded:</span>
                  <span className="font-medium">{subjectiveFiles.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((getObjectiveAnsweredCount() + (hasSubjectiveFiles ? subjectiveQuestions.length : 0)) / exam.totalQuestions) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg">
            {currentSection === 'objective' && objectiveQuestions.length > 0 ? (
              // Objective Questions Section
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Multiple Choice - Question {currentQuestion + 1} of {objectiveQuestions.length}
                  </span>
                  <div className="flex items-center gap-4">
                    {answers[currentObjectiveQuestion.id] !== undefined && (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Answered
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 leading-relaxed mb-6">
                    {currentObjectiveQuestion.question}
                  </h2>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3 mb-8">
                  {currentObjectiveQuestion.options?.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                        answers[currentObjectiveQuestion.id] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentObjectiveQuestion.id}`}
                        value={index}
                        checked={answers[currentObjectiveQuestion.id] === index}
                        onChange={() => handleAnswerSelect(currentObjectiveQuestion.id, index)}
                        className="mt-1 w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-800 font-medium">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-gray-700 flex-1">{option}</span>
                    </label>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-500">
                      {answers[currentObjectiveQuestion.id] !== undefined ? 'Answer saved automatically' : 'Select an answer to continue'}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentQuestion(Math.min(objectiveQuestions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === objectiveQuestions.length - 1}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              // Subjective Questions Section
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    Essay Questions - Upload All Answers
                  </span>
                  <div className="flex items-center gap-4">
                    {hasSubjectiveFiles && (
                      <span className="text-purple-600 text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {subjectiveFiles.length} Files Uploaded
                      </span>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-2 text-purple-800 mb-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Essay Questions Instructions</span>
                  </div>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• Prepare answers for all essay questions and upload them together</li>
                    <li>• You can upload multiple files (one per question or combined)</li>
                    <li>• Clearly label your files or include question numbers in your answers</li>
                    <li>• Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP</li>
                    <li>• Maximum 10MB per file, 50MB total</li>
                  </ul>
                </div>

                {/* All Subjective Questions Display */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">All Essay Questions</h3>
                  <div className="space-y-6">
                    {subjectiveQuestions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                            Question {exam.questions.findIndex(q => q.id === question.id) + 1}
                          </span>
                          <span className="text-xs text-gray-500">
                            Max {question.maxFileSize || 10}MB | {question.allowedFormats?.map(f => f.toUpperCase()).join(', ') || 'PDF'}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800 mb-3">{question.question}</h4>
                        <div className="text-sm text-gray-600">
                          Prepare your detailed answer including diagrams, calculations, and explanations as needed.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bulk File Upload Area */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload All Essay Answers
                  </h3>
                  
                  {/* Upload Zone */}
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive 
                        ? 'border-purple-400 bg-purple-50' 
                        : subjectiveFiles.length > 0
                          ? 'border-green-400 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mx-auto">
                        <Upload className="w-10 h-10 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg mb-2">Upload Your Essay Answers</h4>
                        <p className="text-gray-600 mb-4">
                          Drag and drop multiple files here, or click to browse
                        </p>
                        <input
                          type="file"
                          id="subjective-files-upload"
                          multiple
                          accept=".pdf,.doc,.docx,.txt,.jpg,.png,.zip"
                          onChange={(e) => {
                            if (e.target.files) {
                              handleFilesUpload(e.target.files);
                            }
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor="subjective-files-upload"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          Add Files
                        </label>
                      </div>
                      <div className="text-xs text-gray-500">
                        Multiple files supported | Max 10MB per file | Total limit: 50MB
                      </div>
                    </div>
                  </div>

                  {/* Upload Errors */}
                  {uploadErrors.length > 0 && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">Upload Errors</span>
                      </div>
                      <ul className="text-sm text-red-700 space-y-1">
                        {uploadErrors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Uploaded Files List */}
                  {subjectiveFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Uploaded Files ({subjectiveFiles.length})
                      </h4>
                      <div className="space-y-2">
                        {subjectiveFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-purple-600" />
                              <div>
                                <div className="font-medium text-gray-800">{file.name}</div>
                                <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleFileRemove(index)}
                              className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Total Size Display */}
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-purple-700">Total Upload Size:</span>
                          <span className="font-medium text-purple-800">
                            {formatFileSize(subjectiveFiles.reduce((total, file) => total + file.size, 0))} / 50MB
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(100, (subjectiveFiles.reduce((total, file) => total + file.size, 0) / (50 * 1024 * 1024)) * 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upload Tips */}
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Tips for Essay Answers
                    </h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Clearly number your answers to match the question numbers</li>
                      <li>• Include diagrams, calculations, or code snippets as required</li>
                      <li>• You can submit one comprehensive file or separate files per question</li>
                      <li>• Convert to PDF for best compatibility and formatting preservation</li>
                      <li>• Save your work frequently while preparing your answers</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5" />
              Submit Exam Confirmation
            </h3>
            
            <div className="mb-6 space-y-4">
              <p className="text-gray-600">
                Are you sure you want to submit your exam? Please review your progress:
              </p>
              
              {/* Progress Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-medium ml-2">{exam.totalQuestions}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">MCQ Answered:</span>
                    <span className="font-medium ml-2">{getObjectiveAnsweredCount()}/{objectiveQuestions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Essay Questions:</span>
                    <span className="font-medium ml-2">{subjectiveQuestions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Files Uploaded:</span>
                    <span className="font-medium ml-2">{subjectiveFiles.length}</span>
                  </div>
                </div>
              </div>
              
              {(getObjectiveAnsweredCount() < objectiveQuestions.length || (subjectiveQuestions.length > 0 && !hasSubjectiveFiles)) && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-700 text-sm font-medium">
                    Warning: {' '}
                    {getObjectiveAnsweredCount() < objectiveQuestions.length && 
                      `${objectiveQuestions.length - getObjectiveAnsweredCount()} MCQ unanswered. `
                    }
                    {subjectiveQuestions.length > 0 && !hasSubjectiveFiles && 
                      `No files uploaded for ${subjectiveQuestions.length} essay questions.`
                    }
                  </p>
                </div>
              )}
              
              {subjectiveQuestions.length > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <strong>Note:</strong> Essay questions will be manually graded. Results will be available after instructor review.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExamResultsPage: React.FC<ExamResultsPageProps> = ({ exam, result, onBackToList }) => {
  const questions = exam.questions || [];
  const objectiveQuestions = questions.filter(q => q.type === 'multiple-choice');
  const subjectiveQuestions = questions.filter(q => q.type === 'subjective');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`p-8 text-white ${
            result.passed === undefined ? 'bg-gradient-to-r from-orange-600 to-orange-700' :
            result.passed ? 'bg-gradient-to-r from-green-600 to-green-700' : 
            'bg-gradient-to-r from-red-600 to-red-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
                <p className="text-white/80">Exam Results</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold">
                  {result.percentage || 'Pending'}
                  {result.percentage && '%'}
                </div>
                <div className="text-white/80">
                  {result.gradingStatus === 'pending' ? 'Under Review' : 'Final Score'}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {result.correctAnswers || 0}/{objectiveQuestions.length}
                </div>
                <div className="text-sm text-gray-600">MCQ Correct</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {result.subjectiveFiles?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Essay Files</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Timer className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{result.timeSpent}m</div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
              <div className={`text-center p-4 rounded-lg ${
                result.passed === undefined ? 'bg-orange-50' :
                result.passed ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <CheckCircle2 className={`w-8 h-8 mx-auto mb-2 ${
                  result.passed === undefined ? 'text-orange-600' :
                  result.passed ? 'text-green-600' : 'text-red-600'
                }`} />
                <div className={`text-2xl font-bold ${
                  result.passed === undefined ? 'text-orange-600' :
                  result.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.passed === undefined ? 'PENDING' : result.passed ? 'PASSED' : 'FAILED'}
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>

            {/* Grading Status Notice */}
            {subjectiveQuestions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Grading Status</span>
                </div>
                <div className="text-sm text-blue-700">
                  {result.gradingStatus === 'pending' ? (
                    <>
                      Your essay questions are currently being reviewed by the instructor. 
                      {objectiveQuestions.length > 0 && ' Multiple choice questions have been auto-graded.'}
                      You will be notified when complete grading is available.
                    </>
                  ) : (
                    'All questions have been graded and your final results are now available.'
                  )}
                </div>
              </div>
            )}

            {/* Performance Analysis - only show if we have percentage */}
            {result.percentage && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Accuracy</span>
                      <span>{result.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${result.percentage >= 80 ? 'bg-green-500' : result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Time Efficiency</span>
                      <span>{Math.round((result.timeSpent / exam.duration) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (result.timeSpent / exam.duration) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question Review - Only show objective questions with detailed review */}
            {objectiveQuestions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Multiple Choice Review</h3>
                <div className="space-y-4">
                  {objectiveQuestions.map((question, index) => {
                    const userAnswer = result.answers?.[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className={`border-2 rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-800">Question {exam.questions.findIndex(q => q.id === question.id) + 1}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{question.question}</p>
                        <div className="space-y-2">
                          {question.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className={`p-3 rounded-lg border ${
                              optionIndex === question.correctAnswer ? 'border-green-400 bg-green-100' :
                              optionIndex === userAnswer && userAnswer !== question.correctAnswer ? 'border-red-400 bg-red-100' :
                              'border-gray-200 bg-gray-50'
                            }`}>
                              <div className="flex items-center gap-3">
                                {optionIndex === question.correctAnswer && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                                {optionIndex === userAnswer && userAnswer !== question.correctAnswer && <X className="w-4 h-4 text-red-600" />}
                                <span className="font-medium text-gray-800">{String.fromCharCode(65 + optionIndex)}.</span>
                                <span className="flex-1">{option}</span>
                                {optionIndex === question.correctAnswer && <span className="text-green-600 text-xs font-medium">Correct Answer</span>}
                                {optionIndex === userAnswer && userAnswer !== question.correctAnswer && <span className="text-red-600 text-xs font-medium">Your Answer</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Subjective Questions Summary */}
            {subjectiveQuestions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Essay Questions Summary
                </h3>
                
                {/* Uploaded Files */}
                {result.subjectiveFiles && result.subjectiveFiles.length > 0 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Submitted Files ({result.subjectiveFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {result.subjectiveFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white rounded p-3 border">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{file.name}</div>
                            <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <div className="text-xs text-purple-700">
                        Total uploaded: {formatFileSize(result.subjectiveFiles.reduce((total, file) => total + file.size, 0))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Questions List */}
                <div className="space-y-3">
                  {subjectiveQuestions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800">
                          Question {exam.questions.findIndex(q => q.id === question.id) + 1} (Essay)
                        </h4>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                          {result.gradingStatus === 'pending' ? 'Under Review' : 'Graded'}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{question.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={onBackToList}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Exams
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Print Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamSubmittedPage: React.FC<ExamSubmittedPageProps> = ({ result, onBackToList, onViewResults }) => {
  const hasSubjectiveQuestions = result.subjectiveFiles && result.subjectiveFiles.length > 0;
  const isPending = result.gradingStatus === 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className={`rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 ${
            isPending ? 'bg-blue-100' : result.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <CheckCircle2 className={`w-10 h-10 ${
              isPending ? 'text-blue-600' : result.passed ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {isPending ? 'Exam Submitted Successfully!' : 'Exam Completed!'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isPending ? (
              hasSubjectiveQuestions ? 
                'Your answers have been submitted. Essay questions will be manually graded by your instructor.' :
                'Your answers have been recorded and automatically graded.'
            ) : (
              'Your exam has been fully graded and results are now available.'
            )}
          </p>
          
          {/* Quick Results */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-2xl font-bold ${
                  isPending ? 'text-blue-600' : result.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.percentage || 'Pending'}
                  {result.percentage && '%'}
                </div>
                <div className="text-sm text-gray-500">
                  {isPending ? 'Partial Score' : 'Final Score'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {result.correctAnswers || 0}/{result.totalQuestions}
                </div>
                <div className="text-sm text-gray-500">
                  {hasSubjectiveQuestions ? 'Auto-Graded' : 'Correct'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.timeSpent}m
                </div>
                <div className="text-sm text-gray-500">Time Used</div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className={`p-4 rounded-lg mb-6 ${
            isPending ? 'bg-blue-50 border border-blue-200' :
            result.passed ? 'bg-green-50 border border-green-200' : 
            'bg-red-50 border border-red-200'
          }`}>
            <div className={`font-semibold ${
              isPending ? 'text-blue-800' :
              result.passed ? 'text-green-800' : 'text-red-800'
            }`}>
              {isPending ? 'Grading in Progress' :
               result.passed ? 'Congratulations! You passed the exam.' : 
               'Unfortunately, you did not pass this exam.'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {isPending ? 'You will receive an email notification when grading is complete.' :
               result.passed ? 'Great job on your performance!' : 
               'Don\'t worry, you can review the material and try again.'}
            </div>
          </div>

          {/* File Upload Summary */}
          {hasSubjectiveQuestions && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Uploaded Files Summary
              </h4>
              <div className="space-y-2 text-sm">
                {result.subjectiveFiles?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded p-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>{file.name}</span>
                    </div>
                    <span className="text-gray-500">{formatFileSize(file.size)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-purple-200 text-xs text-purple-700">
                Total: {formatFileSize(result.subjectiveFiles?.reduce((total, file) => total + file.size, 0) || 0)}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onViewResults}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Detailed Results
            </button>
            <button
              onClick={onBackToList}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Exams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainExamApp = () => {
  const [currentView, setCurrentView] = useState<'list' | 'taking' | 'submitted' | 'results'>('list');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentView('taking');
  };

  const handleSubmitExam = (result: ExamResult) => {
    setExamResult(result);
    setCurrentView('submitted');
    
    // Update the exam data to mark as completed
    const examIndex = mockExamsData.findIndex(e => e.id === result.examId);
    if (examIndex !== -1) {
      mockExamsData[examIndex].status = 'completed';
      mockExamsData[examIndex].result = {
        score: result.score,
        percentage: result.percentage,
        passed: result.passed,
        timeSpent: result.timeSpent,
        correctAnswers: result.correctAnswers,
        submittedAt: result.submittedAt,
        gradingStatus: result.gradingStatus,
        subjectiveFiles: result.subjectiveFiles
      };
    }
  };

  const handleViewResults = (exam: Exam) => {
    setSelectedExam(exam);
    setExamResult(exam.result ?? null);
    setCurrentView('results');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedExam(null);
    setExamResult(null);
  };

  const handleViewDetailedResults = () => {
    setCurrentView('results');
  };

  switch (currentView) {
    case 'taking':
      if (!selectedExam) return null;
      return (
        <ExamTakingPage
          exam={selectedExam}
          onBackToList={handleBackToList}
          onSubmitExam={handleSubmitExam}
        />
      );
    case 'submitted':
      if (!examResult) return null;
      return (
        <ExamSubmittedPage
          result={examResult}
          onBackToList={handleBackToList}
          onViewResults={handleViewDetailedResults}
        />
      );
    case 'results':
      if (!selectedExam || !examResult) return null;
      return (
        <ExamResultsPage
          exam={selectedExam}
          result={examResult}
          onBackToList={handleBackToList}
        />
      );
    case 'list':
    default:
      return (
        <ExamListPage
          onStartExam={handleStartExam}
          onViewResults={handleViewResults}
        />
      );
  }
};

export default MainExamApp;