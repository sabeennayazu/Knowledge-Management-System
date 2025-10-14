"use client";
import { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, Users, Clock, CheckCircle, XCircle, AlertTriangle, 
  Search, Download, Eye, Edit, Plus, User, BookOpen, BarChart3, TrendingUp,
  MapPin, GraduationCap, Target
} from 'lucide-react';

// Type definitions
type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day';
type UserRole = 'admin' | 'school' | 'tutor' | 'student';

interface SubjectAttendance {
  physics: AttendanceStatus;
  robotics: AttendanceStatus;
  coding: AttendanceStatus;
  mathematics: AttendanceStatus;
  chemistry: AttendanceStatus;
}

interface StudentAttendanceRecord {
  id: number;
  studentId: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  status: AttendanceStatus;
  lateBy: number;
  subjects: SubjectAttendance;
  totalHours: number;
  weeklyAttendance: number;
  monthlyAttendance: number;
  parentNotified: boolean;
  profileImage?: string;
}

interface TutorAttendanceRecord {
  id: number;
  tutorId: string;
  name: string;
  employeeId: string;
  department: string;
  subjects: string[];
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: AttendanceStatus;
  lateBy: number;
  workingHours: number;
  plannedHours: number;
  classesScheduled: number;
  classesConducted: number;
  location: string;
  weeklyHours: number;
  monthlyHours: number;
  overtimeHours: number;
  leaveType?: 'sick' | 'casual' | 'emergency' | null;
  notes?: string;
  approvedBy?: string;
  profileImage?: string;
}

interface DailyAttendanceRecord {
  date: string;
  status: AttendanceStatus;
  timeIn?: string | null;
  timeOut?: string | null;
  clockIn?: string | null;
  clockOut?: string | null;
  subjects?: SubjectAttendance;
  totalHours?: number;
  workingHours?: number;
  plannedHours?: number;
  classesScheduled?: number;
  classesConducted?: number;
  location?: string;
  lateBy: number;
  leaveType?: 'sick' | 'casual' | 'emergency' | null;
}

const MultitenantAttendanceSystem = () => {
  // Current user context
  const [currentUser] = useState<{role: UserRole, name: string, tenantId: string}>({
    role: 'tutor',
    name: 'Dr. Sarah Johnson',
    tenantId: 'brighton-steam-academy'
  });

  const [activeView, setActiveView] = useState<'students' | 'tutors'>('students');

  // Sample student data
  const studentAttendanceData: StudentAttendanceRecord[] = [
    {
      id: 1,
      studentId: "ST001",
      name: "Alice Johnson",
      rollNumber: "GR1-001",
      class: "Grade 1",
      section: "Science",
      date: "2024-09-02",
      timeIn: "08:30",
      timeOut: "15:45",
      status: "present",
      lateBy: 0,
      subjects: {
        physics: "present",
        robotics: "present",
        coding: "present",
        mathematics: "present",
        chemistry: "present"
      },
      totalHours: 7.25,
      weeklyAttendance: 95,
      monthlyAttendance: 92,
      parentNotified: true,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616c96f40e3?w=100"
    },
    {
      id: 2,
      studentId: "ST002",
      name: "Bob Smith",
      rollNumber: "GR1-002",
      class: "Grade 1",
      section: "Technology",
      date: "2024-09-02",
      timeIn: "08:45",
      timeOut: "15:30",
      status: "late",
      lateBy: 15,
      subjects: {
        physics: "present",
        robotics: "late",
        coding: "present",
        mathematics: "present",
        chemistry: "present"
      },
      totalHours: 6.75,
      weeklyAttendance: 88,
      monthlyAttendance: 85,
      parentNotified: false,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
      id: 3,
      studentId: "ST003",
      name: "Emma Wilson",
      rollNumber: "GR2-001",
      class: "Grade 2",
      section: "Engineering",
      date: "2024-09-02",
      timeIn: null,
      timeOut: null,
      status: "absent",
      lateBy: 0,
      subjects: {
        physics: "absent",
        robotics: "absent",
        coding: "absent",
        mathematics: "absent",
        chemistry: "absent"
      },
      totalHours: 0,
      weeklyAttendance: 72,
      monthlyAttendance: 78,
      parentNotified: true,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    }
  ];

  // Sample tutor data
  const tutorAttendanceData: TutorAttendanceRecord[] = [
    {
      id: 1,
      tutorId: "T001",
      name: "Dr. Sarah Johnson",
      employeeId: "EMP-2023-001",
      department: "STEAM Education",
      subjects: ["Physics", "Robotics", "Mathematics"],
      date: "2024-09-02",
      clockIn: "07:45",
      clockOut: "16:30",
      status: "present",
      lateBy: 0,
      workingHours: 8.75,
      plannedHours: 8,
      classesScheduled: 6,
      classesConducted: 6,
      location: "Main Campus",
      weeklyHours: 42,
      monthlyHours: 168,
      overtimeHours: 0.75,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
      id: 2,
      tutorId: "T002",
      name: "Prof. Michael Chen",
      employeeId: "EMP-2023-002",
      department: "Computer Science",
      subjects: ["Coding", "Robotics", "Technology"],
      date: "2024-09-02",
      clockIn: "08:15",
      clockOut: "17:00",
      status: "late",
      lateBy: 15,
      workingHours: 8.75,
      plannedHours: 8,
      classesScheduled: 5,
      classesConducted: 5,
      location: "Tech Lab",
      weeklyHours: 40,
      monthlyHours: 160,
      overtimeHours: 0.75,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    {
      id: 3,
      tutorId: "T003",
      name: "Dr. Emily Rodriguez",
      employeeId: "EMP-2023-003",
      department: "Applied Sciences",
      subjects: ["Chemistry", "Physics", "Engineering"],
      date: "2024-09-02",
      clockIn: null,
      clockOut: null,
      status: "absent",
      lateBy: 0,
      workingHours: 0,
      plannedHours: 8,
      classesScheduled: 4,
      classesConducted: 0,
      location: "Science Lab",
      weeklyHours: 32,
      monthlyHours: 152,
      overtimeHours: 0,
      leaveType: "sick",
      notes: "Medical appointment",
      approvedBy: "Dr. Sarah Johnson",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616c96f40e3?w=100"
    }
  ];

  // State variables - ALL PROPERLY DEFINED
  const [selectedDate, setSelectedDate] = useState<string>("2024-09-02");
  const [selectedClass, setSelectedClass] = useState<string>("All Classes");
  const [selectedSection, setSelectedSection] = useState<string>("All Sections");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All Departments");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [historyPeriod, setHistoryPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedStudentRecord, setSelectedStudentRecord] = useState<StudentAttendanceRecord | null>(null);
  const [selectedTutorRecord, setSelectedTutorRecord] = useState<TutorAttendanceRecord | null>(null);

  const classes: string[] = ["All Classes", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
  const sections: string[] = ["All Sections", "Science", "Technology", "Engineering", "Arts", "Mathematics"];
  const departments: string[] = ["All Departments", "STEAM Education", "Computer Science", "Applied Sciences", "Mathematics", "Arts"];
  const subjects: (keyof SubjectAttendance)[] = ["physics", "robotics", "coding", "mathematics", "chemistry"];
  const subjectLabels: string[] = ["Physics", "Robotics", "Coding", "Mathematics", "Chemistry"];

  // Generate attendance history data
  const generateAttendanceHistory = (): {[key: string]: DailyAttendanceRecord[]} => {
    const history: {[key: string]: DailyAttendanceRecord[]} = {};
    const today = new Date('2024-09-02');
    
    // Generate student history
    studentAttendanceData.forEach(student => {
      history[`student_${student.id}`] = [];
      
      // Generate last 30 days of data
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        
        // Skip weekends
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;
        
        const attendanceRate = student.monthlyAttendance / 100;
        const isPresent = Math.random() < attendanceRate;
        const isLate = isPresent && Math.random() < 0.15;
        
        const status: AttendanceStatus = !isPresent ? 'absent' : (isLate ? 'late' : 'present');
        
        // Generate subject-wise attendance
        const subjectAttendance: SubjectAttendance = {
          physics: status === 'absent' ? 'absent' : (Math.random() < 0.9 ? 'present' : 'late'),
          robotics: status === 'absent' ? 'absent' : (Math.random() < 0.9 ? 'present' : 'late'),
          coding: status === 'absent' ? 'absent' : (Math.random() < 0.9 ? 'present' : 'late'),
          mathematics: status === 'absent' ? 'absent' : (Math.random() < 0.9 ? 'present' : 'late'),
          chemistry: status === 'absent' ? 'absent' : (Math.random() < 0.9 ? 'present' : 'late')
        };
        
        history[`student_${student.id}`].push({
          date: dateStr,
          status,
          timeIn: status !== 'absent' ? '08:' + (Math.floor(Math.random() * 60)).toString().padStart(2, '0') : null,
          timeOut: status !== 'absent' ? '15:' + (Math.floor(Math.random() * 60)).toString().padStart(2, '0') : null,
          subjects: subjectAttendance,
          lateBy: isLate ? Math.floor(Math.random() * 30) + 5 : 0,
          totalHours: status !== 'absent' ? 6 + Math.random() * 2 : 0
        });
      }
    });
    
    // Generate tutor history
    tutorAttendanceData.forEach(tutor => {
      history[`tutor_${tutor.id}`] = [];
      
      // Generate last 30 days of data
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        
        // Skip weekends
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;
        
        const attendanceRate = 0.95; // Tutors have high attendance
        const isPresent = Math.random() < attendanceRate;
        const isLate = isPresent && Math.random() < 0.1;
        const isHalfDay = isPresent && Math.random() < 0.05;
        
        let status: AttendanceStatus = 'present';
        if (!isPresent) status = 'absent';
        else if (isHalfDay) status = 'half-day';
        else if (isLate) status = 'late';
        
        const workingHours = status === 'absent' ? 0 : 
                           status === 'half-day' ? 4 + Math.random() * 2 : 
                           7 + Math.random() * 2;
        
        history[`tutor_${tutor.id}`].push({
          date: dateStr,
          status,
          clockIn: status !== 'absent' ? '0' + (7 + Math.floor(Math.random() * 2)) + ':' + (Math.floor(Math.random() * 60)).toString().padStart(2, '0') : null,
          clockOut: status !== 'absent' ? '1' + (5 + Math.floor(Math.random() * 3)) + ':' + (Math.floor(Math.random() * 60)).toString().padStart(2, '0') : null,
          workingHours: Math.round(workingHours * 100) / 100,
          plannedHours: 8,
          classesScheduled: Math.floor(Math.random() * 3) + 4,
          classesConducted: status === 'absent' ? 0 : Math.floor(Math.random() * 3) + 4,
          location: tutor.location,
          lateBy: isLate ? Math.floor(Math.random() * 20) + 5 : 0,
          leaveType: status === 'absent' ? (['sick', 'casual', 'emergency'] as const)[Math.floor(Math.random() * 3)] : null
        });
      }
    });
    
    return history;
  };

  const attendanceHistory = generateAttendanceHistory();

  // Helper function to get attendance history for selected record
  const getAttendanceHistoryData = () => {
    const recordKey = selectedStudentRecord 
      ? `student_${selectedStudentRecord.id}` 
      : selectedTutorRecord 
        ? `tutor_${selectedTutorRecord.id}` 
        : null;
    
    if (!recordKey || !attendanceHistory[recordKey]) return [];
    
    const fullHistory = attendanceHistory[recordKey];
    const today = new Date();
    
    switch (historyPeriod) {
      case 'weekly':
        return fullHistory.slice(-7);
      case 'monthly':
        return fullHistory.slice(-30);
      case 'yearly':
        const yearlyData: any[] = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        months.forEach((month, index) => {
          const monthData = fullHistory.filter((record: any) => {
            const recordDate = new Date(record.date);
            return recordDate.getMonth() === index && recordDate.getFullYear() === today.getFullYear();
          });
          
          if (monthData.length > 0) {
            const presentCount = monthData.filter((r: any) => r.status === 'present').length;
            const absentCount = monthData.filter((r: any) => r.status === 'absent').length;
            const lateCount = monthData.filter((r: any) => r.status === 'late').length;
            const attendanceRate = ((presentCount + lateCount) / monthData.length * 100).toFixed(1);
            
            yearlyData.push({
              month,
              totalDays: monthData.length,
              present: presentCount,
              absent: absentCount,
              late: lateCount,
              attendanceRate,
              details: monthData
            });
          }
        });
        
        return yearlyData;
      default:
        return fullHistory;
    }
  };

  // Filter student data
  const filteredStudentData = useMemo(() => {
    return studentAttendanceData.filter(student => {
      const matchesClass = selectedClass === "All Classes" || student.class === selectedClass;
      const matchesSection = selectedSection === "All Sections" || student.section === selectedSection;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || student.status === statusFilter;
      
      return matchesClass && matchesSection && matchesSearch && matchesStatus;
    });
  }, [selectedClass, selectedSection, searchTerm, statusFilter]);

  // Filter tutor data - tutors see only their own data unless admin/school
  const filteredTutorData = useMemo(() => {
    let baseData = tutorAttendanceData;
    
    // If current user is tutor, show only their data
    if (currentUser.role === 'tutor') {
      baseData = tutorAttendanceData.filter(tutor => tutor.name === currentUser.name);
    }
    
    return baseData.filter(tutor => {
      const matchesDepartment = selectedDepartment === "All Departments" || tutor.department === selectedDepartment;
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tutor.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || tutor.status === statusFilter;
      
      return matchesDepartment && matchesSearch && matchesStatus;
    });
  }, [selectedDepartment, searchTerm, statusFilter, currentUser.role, currentUser.name]);

  // ESC key functionality for closing modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showViewModal) {
          setShowViewModal(false);
          setSelectedStudentRecord(null);
          setSelectedTutorRecord(null);
        } else if (showEditModal) {
          setShowEditModal(false);
          setSelectedStudentRecord(null);
          setSelectedTutorRecord(null);
        } else if (showHistoryModal) {
          setShowHistoryModal(false);
          setSelectedStudentRecord(null);
          setSelectedTutorRecord(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showViewModal, showEditModal, showHistoryModal]);

  const getStatusColor = (status: AttendanceStatus): string => {
    switch (status) {
      case 'present': return 'text-green-700 bg-green-100 border-green-200';
      case 'absent': return 'text-red-700 bg-red-100 border-red-200';
      case 'late': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'half-day': return 'text-blue-700 bg-blue-100 border-blue-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <AlertTriangle className="w-4 h-4" />;
      case 'half-day': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const calculateStudentStats = () => {
    const total = filteredStudentData.length;
    const present = filteredStudentData.filter(s => s.status === 'present').length;
    const absent = filteredStudentData.filter(s => s.status === 'absent').length;
    const late = filteredStudentData.filter(s => s.status === 'late').length;
    const halfDay = filteredStudentData.filter(s => s.status === 'half-day').length;
    const attendanceRate = total > 0 ? (((present + late + halfDay) / total) * 100).toFixed(1) : "0";

    return { total, present, absent, late, halfDay, attendanceRate };
  };

  const calculateTutorStats = () => {
    const total = filteredTutorData.length;
    const present = filteredTutorData.filter(t => t.status === 'present').length;
    const absent = filteredTutorData.filter(t => t.status === 'absent').length;
    const late = filteredTutorData.filter(t => t.status === 'late').length;
    const halfDay = filteredTutorData.filter(t => t.status === 'half-day').length;
    const attendanceRate = total > 0 ? (((present + late + halfDay) / total) * 100).toFixed(1) : "0";
    const totalHours = filteredTutorData.reduce((sum, t) => sum + t.workingHours, 0);
    const avgHours = total > 0 ? (totalHours / total).toFixed(1) : "0";

    return { total, present, absent, late, halfDay, attendanceRate, totalHours, avgHours };
  };

  // Handler functions
  const handleViewStudentRecord = (record: StudentAttendanceRecord) => {
    setSelectedStudentRecord(record);
    setSelectedTutorRecord(null);
    setShowViewModal(true);
  };

  const handleViewTutorRecord = (record: TutorAttendanceRecord) => {
    setSelectedTutorRecord(record);
    setSelectedStudentRecord(null);
    setShowViewModal(true);
  };

  const handleViewStudentHistory = (record: StudentAttendanceRecord) => {
    setSelectedStudentRecord(record);
    setSelectedTutorRecord(null);
    setShowHistoryModal(true);
  };

  const handleViewTutorHistory = (record: TutorAttendanceRecord) => {
    setSelectedTutorRecord(record);
    setSelectedStudentRecord(null);
    setShowHistoryModal(true);
  };

  const handleEditStudentRecord = (record: StudentAttendanceRecord) => {
    setSelectedStudentRecord(record);
    setSelectedTutorRecord(null);
    setShowEditModal(true);
  };

  const handleEditTutorRecord = (record: TutorAttendanceRecord) => {
    setSelectedTutorRecord(record);
    setSelectedStudentRecord(null);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowHistoryModal(false);
    setSelectedStudentRecord(null);
    setSelectedTutorRecord(null);
  };

  const studentStats = calculateStudentStats();
  const tutorStats = calculateTutorStats();

  const canModifyAttendance = () => {
    return ['admin', 'school', 'tutor'].includes(currentUser.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  STEAM Education Portal
                </h1>
                <p className="text-gray-600">
                  {activeView === 'students' 
                    ? 'Student Classwise Attendance Management' 
                    : (currentUser.role === 'tutor' 
                        ? 'My Attendance Dashboard' 
                        : 'Tutor Attendance Management')
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{currentUser.name} ({currentUser.role})</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('students')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeView === 'students' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setActiveView('tutors')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeView === 'tutors' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {currentUser.role === 'tutor' ? 'My Attendance' : 'Tutors'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {activeView === 'students' ? (
            <>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-blue-700">{studentStats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="text-2xl font-bold text-green-700">{studentStats.present}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="text-2xl font-bold text-red-700">{studentStats.absent}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Late</p>
                    <p className="text-2xl font-bold text-orange-700">{studentStats.late}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="text-2xl font-bold text-purple-700">{studentStats.attendanceRate}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total {currentUser.role === 'tutor' ? 'Days' : 'Tutors'}</p>
                    <p className="text-2xl font-bold text-blue-700">{tutorStats.total}</p>
                  </div>
                  <User className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="text-2xl font-bold text-green-700">{tutorStats.present}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="text-2xl font-bold text-red-700">{tutorStats.absent}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Hours</p>
                    <p className="text-2xl font-bold text-orange-700">{tutorStats.avgHours}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="text-2xl font-bold text-purple-700">{tutorStats.attendanceRate}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Filters Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {activeView === 'students' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sections.map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                {(currentUser.role === 'admin' || currentUser.role === 'school') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div></div>
                <div></div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={activeView === 'students' ? "Name or roll number" : "Name or employee ID"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 text-sm"
            >
              <Eye className="w-4 h-4" />
              {showDetails ? 'Simple View' : 'Detailed View'}
            </button>
            
            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              {canModifyAttendance() && activeView === 'students' && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Mark Attendance
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${activeView === 'students' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${activeView === 'students' ? 'text-blue-800' : 'text-purple-800'}`}>
                    {activeView === 'students' ? 'Student Info' : 'Tutor Info'}
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${activeView === 'students' ? 'text-blue-800' : 'text-purple-800'}`}>
                    Status
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${activeView === 'students' ? 'text-blue-800' : 'text-purple-800'}`}>
                    Time
                  </th>
                  {showDetails && (
                    <>
                      {activeView === 'students' ? (
                        <>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-blue-800`}>Subjects</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-blue-800`}>Weekly %</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-blue-800`}>Parent Alert</th>
                        </>
                      ) : (
                        <>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-purple-800`}>Classes</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-purple-800`}>Hours</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-purple-800`}>Location</th>
                        </>
                      )}
                    </>
                  )}
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${activeView === 'students' ? 'text-blue-800' : 'text-purple-800'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeView === 'students' 
                  ? filteredStudentData.map((record) => (
                      <tr key={record.id} className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 transition-all">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {record.profileImage && (
                              <img
                                src={record.profileImage}
                                alt={record.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                              />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{record.name}</div>
                              <div className="text-sm text-gray-500">
                                {record.rollNumber} • {record.class} • {record.section}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
                              {getStatusIcon(record.status)}
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                            {record.status === 'late' && (
                              <span className="text-xs text-orange-600 font-medium">
                                ({record.lateBy}min)
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">In:</span>
                              <span className="font-medium">{record.timeIn || '-'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Out:</span>
                              <span className="font-medium">{record.timeOut || '-'}</span>
                            </div>
                            <div className="font-medium text-blue-600 mt-1">
                              {record.totalHours}h total
                            </div>
                          </div>
                        </td>

                        {showDetails && (
                          <>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {subjects.map((subjectKey, index) => {
                                  const subjectStatus = record.subjects[subjectKey];
                                  const subjectLabel = subjectLabels[index];
                                  return (
                                    <span
                                      key={subjectKey}
                                      className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getStatusColor(subjectStatus)}`}
                                    >
                                      {subjectLabel.substring(0, 3)}
                                    </span>
                                  );
                                })}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-12 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      record.weeklyAttendance >= 90 ? 'bg-green-500' :
                                      record.weeklyAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${record.weeklyAttendance}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{record.weeklyAttendance}%</span>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                record.parentNotified ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                              }`}>
                                {record.parentNotified ? '✓ Notified' : '⚠ Pending'}
                              </span>
                            </td>
                          </>
                        )}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {canModifyAttendance() && (
                              <button 
                                onClick={() => handleEditStudentRecord(record)}
                                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Edit Attendance"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleViewStudentRecord(record)}
                              className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleViewStudentHistory(record)}
                              className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                              title="View Attendance History"
                            >
                              <BarChart3 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : filteredTutorData.map((record) => (
                      <tr key={record.id} className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 transition-all">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {record.profileImage && (
                              <img
                                src={record.profileImage}
                                alt={record.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                              />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{record.name}</div>
                              <div className="text-sm text-gray-500">
                                {record.employeeId} • {record.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
                              {getStatusIcon(record.status)}
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                            {record.status === 'late' && (
                              <span className="text-xs text-orange-600 font-medium">
                                ({record.lateBy}min)
                              </span>
                            )}
                            {record.leaveType && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                {record.leaveType}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">In:</span>
                              <span className="font-medium">{record.clockIn || '-'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Out:</span>
                              <span className="font-medium">{record.clockOut || '-'}</span>
                            </div>
                            <div className="font-medium text-purple-600 mt-1">
                              {record.workingHours}h worked
                            </div>
                          </div>
                        </td>

                        {showDetails && (
                          <>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <div className="flex items-center gap-1">
                                  <Target className="w-3 h-3 text-gray-500" />
                                  <span>{record.classesConducted}/{record.classesScheduled}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Subjects: {record.subjects.slice(0, 2).join(', ')}
                                  {record.subjects.length > 2 && '...'}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <div className="font-medium">
                                  {record.workingHours}/{record.plannedHours}h
                                </div>
                                {record.overtimeHours > 0 && (
                                  <div className="text-xs text-orange-600">
                                    +{record.overtimeHours}h OT
                                  </div>
                                )}
                                <div className="text-xs text-gray-500">
                                  Weekly: {record.weeklyHours}h
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span>{record.location}</span>
                              </div>
                              {record.approvedBy && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Approved by: {record.approvedBy}
                                </div>
                              )}
                            </td>
                          </>
                        )}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {canModifyAttendance() && (
                              <button 
                                onClick={() => handleEditTutorRecord(record)}
                                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Edit Attendance"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleViewTutorRecord(record)}
                              className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleViewTutorHistory(record)}
                              className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                              title="View Attendance History"
                            >
                              <BarChart3 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>

          {(activeView === 'students' ? filteredStudentData : filteredTutorData).length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeView === 'students' ? (
                  <Users className="w-8 h-8 text-gray-400" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-gray-500 text-lg">
                No {activeView} found matching the current filters
              </p>
              <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {activeView === 'students' ? filteredStudentData.length : filteredTutorData.length} of {activeView === 'students' ? studentAttendanceData.length : tutorAttendanceData.length} {activeView} for {selectedDate}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {activeView === 'students' ? (
                <>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Present: {studentStats.present}
                  </span>
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    <XCircle className="w-4 h-4" />
                    Absent: {studentStats.absent}
                  </span>
                  <span className="flex items-center gap-1 text-orange-600 font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    Late: {studentStats.late}
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 font-bold">
                    <TrendingUp className="w-4 h-4" />
                    Rate: {studentStats.attendanceRate}%
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Present: {tutorStats.present}
                  </span>
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    <XCircle className="w-4 h-4" />
                    Absent: {tutorStats.absent}
                  </span>
                  <span className="flex items-center gap-1 text-orange-600 font-medium">
                    <Clock className="w-4 h-4" />
                    Avg Hours: {tutorStats.avgHours}h
                  </span>
                  <span className="flex items-center gap-1 text-purple-600 font-bold">
                    <BarChart3 className="w-4 h-4" />
                    Rate: {tutorStats.attendanceRate}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Attendance History Modal */}
        {showHistoryModal && (selectedStudentRecord || selectedTutorRecord) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {activeView === 'students' ? 'Student' : 'Tutor'} Attendance History
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {selectedStudentRecord?.name || selectedTutorRecord?.name} - Detailed Attendance Records
                    </p>
                  </div>
                  <button
                    onClick={closeModals}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Period Selector */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">View Period:</span>
                  <div className="flex gap-2">
                    {[
                      { key: 'weekly', label: 'Weekly', icon: Calendar },
                      { key: 'monthly', label: 'Monthly', icon: Calendar },
                      { key: 'yearly', label: 'Yearly', icon: BarChart3 }
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setHistoryPeriod(key as 'weekly' | 'monthly' | 'yearly')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          historyPeriod === key
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* History Content */}
                <div className="overflow-y-auto max-h-[60vh]">
                  {historyPeriod === 'yearly' ? (
                    /* Yearly Summary View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getAttendanceHistoryData().map((monthData: any, index: number) => (
                        <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
                          <h4 className="font-bold text-lg text-gray-800 mb-3">{monthData.month} 2024</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total Days:</span>
                              <span className="font-medium">{monthData.totalDays}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-green-600">Present:</span>
                              <span className="font-medium text-green-600">{monthData.present}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-red-600">Absent:</span>
                              <span className="font-medium text-red-600">{monthData.absent}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-orange-600">Late:</span>
                              <span className="font-medium text-orange-600">{monthData.late}</span>
                            </div>
                            <div className="border-t pt-2 mt-3">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700">Attendance Rate:</span>
                                <span className="font-bold text-blue-600">{monthData.attendanceRate}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${monthData.attendanceRate}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Daily Detail View */
                    <div className="space-y-4">
                      {getAttendanceHistoryData().map((dayData: any, index: number) => (
                        <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold text-gray-800">
                                {new Date(dayData.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(dayData.status)}`}>
                                {getStatusIcon(dayData.status)}
                                {dayData.status.charAt(0).toUpperCase() + dayData.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                {dayData.timeIn && dayData.timeOut 
                                  ? `${dayData.timeIn} - ${dayData.timeOut}`
                                  : dayData.clockIn && dayData.clockOut
                                    ? `${dayData.clockIn} - ${dayData.clockOut}`
                                    : dayData.status === 'absent' 
                                      ? 'Absent' 
                                      : 'N/A'}
                              </div>
                              {selectedStudentRecord && (
                                <div className="text-sm font-medium text-blue-600">
                                  {dayData.totalHours}h total
                                </div>
                              )}
                              {selectedTutorRecord && (
                                <div className="text-sm font-medium text-purple-600">
                                  {dayData.workingHours}h worked
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Student Subject Details */}
                          {selectedStudentRecord && dayData.subjects && (
                            <div>
                              <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Subject-wise Attendance
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {subjects.map((subjectKey, subIndex) => {
                                  const subjectStatus = dayData.subjects[subjectKey];
                                  const subjectLabel = subjectLabels[subIndex];
                                  return (
                                    <div key={subjectKey} className="text-center">
                                      <div className="text-xs text-gray-600 mb-1">{subjectLabel}</div>
                                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getStatusColor(subjectStatus)}`}>
                                        {subjectStatus === 'present' ? '✓' : subjectStatus === 'late' ? '⏰' : '✗'}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Tutor Work Details */}
                          {selectedTutorRecord && (
                            <div>
                              <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Work Summary
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center bg-blue-50 p-3 rounded-lg">
                                  <div className="text-lg font-bold text-blue-600">{dayData.classesScheduled || 0}</div>
                                  <div className="text-xs text-gray-600">Scheduled Classes</div>
                                </div>
                                <div className="text-center bg-green-50 p-3 rounded-lg">
                                  <div className="text-lg font-bold text-green-600">{dayData.classesConducted || 0}</div>
                                  <div className="text-xs text-gray-600">Conducted Classes</div>
                                </div>
                                <div className="text-center bg-purple-50 p-3 rounded-lg">
                                  <div className="text-lg font-bold text-purple-600">{dayData.workingHours || 0}h</div>
                                  <div className="text-xs text-gray-600">Working Hours</div>
                                </div>
                                <div className="text-center bg-orange-50 p-3 rounded-lg">
                                  <div className="flex items-center justify-center gap-1">
                                    <MapPin className="w-3 h-3 text-gray-500" />
                                    <span className="text-sm font-medium">{dayData.location || 'N/A'}</span>
                                  </div>
                                  <div className="text-xs text-gray-600">Location</div>
                                </div>
                              </div>
                              {dayData.leaveType && (
                                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                    <span className="text-sm font-medium text-yellow-800">
                                      Leave Type: {dayData.leaveType}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Additional Info */}
                          {dayData.lateBy > 0 && (
                            <div className="mt-3 p-2 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="text-sm text-orange-800">
                                Late by {dayData.lateBy} minutes
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {getAttendanceHistoryData().length === 0 && (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">No attendance data available for the selected period</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* History Summary Stats */}
                {historyPeriod !== 'yearly' && getAttendanceHistoryData().length > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
                    <h4 className="font-bold text-gray-800 mb-3">
                      {historyPeriod === 'weekly' ? 'Weekly' : 'Monthly'} Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const data = getAttendanceHistoryData();
                        const totalDays = data.length;
                        const presentDays = data.filter((d: any) => d.status === 'present').length;
                        const absentDays = data.filter((d: any) => d.status === 'absent').length;
                        const lateDays = data.filter((d: any) => d.status === 'late').length;
                        const attendanceRate = totalDays > 0 ? (((presentDays + lateDays) / totalDays) * 100).toFixed(1) : '0';
                        
                        return (
                          <>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{totalDays}</div>
                              <div className="text-sm text-gray-600">Total Days</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{presentDays}</div>
                              <div className="text-sm text-gray-600">Present</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">{absentDays}</div>
                              <div className="text-sm text-gray-600">Absent</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{attendanceRate}%</div>
                              <div className="text-sm text-gray-600">Attendance Rate</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Press ESC to close • {historyPeriod === 'yearly' ? 'Monthly summaries' : 'Daily records'}
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export {historyPeriod === 'yearly' ? 'Yearly' : historyPeriod === 'monthly' ? 'Monthly' : 'Weekly'} Report
                    </button>
                    <button
                      onClick={closeModals}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && (selectedStudentRecord || selectedTutorRecord) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {activeView === 'students' ? 'Student' : 'Tutor'} Details
                  </h2>
                  <button
                    onClick={closeModals}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      {(selectedStudentRecord?.profileImage || selectedTutorRecord?.profileImage) && (
                        <img
                          src={selectedStudentRecord?.profileImage || selectedTutorRecord?.profileImage}
                          alt={selectedStudentRecord?.name || selectedTutorRecord?.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedStudentRecord?.name || selectedTutorRecord?.name}
                        </h3>
                        <div className="text-gray-600 space-y-1">
                          {selectedStudentRecord ? (
                            <>
                              <p>Roll: {selectedStudentRecord.rollNumber}</p>
                              <p>{selectedStudentRecord.class} • {selectedStudentRecord.section}</p>
                            </>
                          ) : selectedTutorRecord && (
                            <>
                              <p>Employee ID: {selectedTutorRecord.employeeId}</p>
                              <p>{selectedTutorRecord.department}</p>
                              <div className="flex items-center gap-2 mt-2">
                                {selectedTutorRecord.subjects.map((subject, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {subject}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Today's Status */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Today's Attendance ({selectedDate})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Status</p>
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedStudentRecord?.status || selectedTutorRecord?.status || 'absent')}`}>
                          {getStatusIcon(selectedStudentRecord?.status || selectedTutorRecord?.status || 'absent')}
                          {(selectedStudentRecord?.status || selectedTutorRecord?.status || 'absent').charAt(0).toUpperCase() + (selectedStudentRecord?.status || selectedTutorRecord?.status || 'absent').slice(1)}
                        </span>
                        {(selectedStudentRecord?.status === 'late' || selectedTutorRecord?.status === 'late') && (
                          <p className="text-orange-600 text-sm mt-2">
                            Late by {selectedStudentRecord?.lateBy || selectedTutorRecord?.lateBy} minutes
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Time In</p>
                        <p className="font-semibold text-lg">
                          {selectedStudentRecord?.timeIn || selectedTutorRecord?.clockIn || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Time Out</p>
                        <p className="font-semibold text-lg">
                          {selectedStudentRecord?.timeOut || selectedTutorRecord?.clockOut || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                  <button
                    onClick={closeModals}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Close
                  </button>
                  {canModifyAttendance() && (
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        if (selectedStudentRecord) {
                          handleEditStudentRecord(selectedStudentRecord);
                        } else if (selectedTutorRecord) {
                          handleEditTutorRecord(selectedTutorRecord);
                        }
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
                    >
                      Edit {activeView === 'students' ? 'Student' : 'Tutor'} Attendance
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (selectedStudentRecord || selectedTutorRecord) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Edit {activeView === 'students' ? 'Student' : 'Tutor'} Attendance - {selectedStudentRecord?.name || selectedTutorRecord?.name}
                  </h2>
                  <button
                    onClick={closeModals}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Attendance Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Basic Attendance Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select 
                          defaultValue={selectedStudentRecord?.status || selectedTutorRecord?.status}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="half-day">Half Day</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Late By (minutes)</label>
                        <input
                          type="number"
                          defaultValue={selectedStudentRecord?.lateBy || selectedTutorRecord?.lateBy || 0}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="0"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time In</label>
                        <input
                          type="time"
                          defaultValue={selectedStudentRecord?.timeIn || selectedTutorRecord?.clockIn || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Out</label>
                        <input
                          type="time"
                          defaultValue={selectedStudentRecord?.timeOut || selectedTutorRecord?.clockOut || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={closeModals}
                    className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel Changes
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium">
                    Save Changes
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

export default MultitenantAttendanceSystem;