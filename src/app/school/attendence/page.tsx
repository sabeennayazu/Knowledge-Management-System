"use client";
import { useState, useMemo, JSX } from 'react';
import { Calendar, Users, Clock, CheckCircle, XCircle, AlertTriangle, Search, Filter, Download, Eye, Edit, Plus } from 'lucide-react';

// Type definitions
type AttendanceStatus = 'present' | 'absent' | 'late';

interface SubjectAttendance {
  physics: AttendanceStatus;
  robotics: AttendanceStatus;
  coding: AttendanceStatus;
  mathematics: AttendanceStatus;
}

interface AttendanceRecord {
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
}

const ClasswiseAttendance = () => {
  // Sample data for demonstration
  const attendanceData: AttendanceRecord[] = [
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
        mathematics: "present"
      },
      totalHours: 7.25,
      weeklyAttendance: 95,
      monthlyAttendance: 92,
      parentNotified: true
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
      timeOut: "15:45",
      status: "late",
      lateBy: 15,
      subjects: {
        physics: "present",
        robotics: "present", 
        coding: "absent",
        mathematics: "present"
      },
      totalHours: 7.0,
      weeklyAttendance: 88,
      monthlyAttendance: 85,
      parentNotified: true
    },
    {
      id: 3,
      studentId: "ST003",
      name: "Charlie Brown",
      rollNumber: "GR1-003", 
      class: "Grade 1",
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
        mathematics: "absent"
      },
      totalHours: 0,
      weeklyAttendance: 72,
      monthlyAttendance: 78,
      parentNotified: false
    },
    {
      id: 4,
      studentId: "ST004",
      name: "Diana Wilson",
      rollNumber: "GR2-001",
      class: "Grade 2", 
      section: "Arts",
      date: "2024-09-02",
      timeIn: "08:25",
      timeOut: "15:50",
      status: "present",
      lateBy: 0,
      subjects: {
        physics: "present",
        robotics: "present",
        coding: "present",
        mathematics: "present"
      },
      totalHours: 7.42,
      weeklyAttendance: 98,
      monthlyAttendance: 96,
      parentNotified: true
    },
    {
      id: 5,
      studentId: "ST005",
      name: "Eva Martinez",
      rollNumber: "GR2-002",
      class: "Grade 2",
      section: "Mathematics", 
      date: "2024-09-02",
      timeIn: "09:15",
      timeOut: "15:45",
      status: "late",
      lateBy: 45,
      subjects: {
        physics: "late",
        robotics: "present",
        coding: "present",
        mathematics: "present"
      },
      totalHours: 6.5,
      weeklyAttendance: 82,
      monthlyAttendance: 89,
      parentNotified: true
    }
  ];

  // State variables
  const [selectedDate, setSelectedDate] = useState<string>("2024-09-02");
  const [selectedClass, setSelectedClass] = useState<string>("All Classes");
  const [selectedSection, setSelectedSection] = useState<string>("All Sections");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<AttendanceRecord | null>(null);
  const [editFormData, setEditFormData] = useState<AttendanceRecord | null>(null);

  const classes: string[] = ["All Classes", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
  const sections: string[] = ["All Sections", "Science", "Technology", "Engineering", "Arts", "Mathematics"];
  const subjects: (keyof SubjectAttendance)[] = ["physics", "robotics", "coding", "mathematics"];
  const subjectLabels: string[] = ["Physics", "Robotics", "Coding", "Mathematics"];

  const filteredData = useMemo(() => {
    return attendanceData.filter(student => {
      const matchesClass = selectedClass === "All Classes" || student.class === selectedClass;
      const matchesSection = selectedSection === "All Sections" || student.section === selectedSection;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || student.status === statusFilter;
      
      return matchesClass && matchesSection && matchesSearch && matchesStatus;
    });
  }, [selectedClass, selectedSection, searchTerm, statusFilter, attendanceData]);

  const getStatusColor = (status: AttendanceStatus): string => {
    switch (status) {
      case 'present': return 'text-green-700 bg-green-100';
      case 'absent': return 'text-red-700 bg-red-100';
      case 'late': return 'text-orange-700 bg-orange-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: AttendanceStatus): JSX.Element => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const calculateStats = () => {
    const total = filteredData.length;
    const present = filteredData.filter(s => s.status === 'present').length;
    const absent = filteredData.filter(s => s.status === 'absent').length;
    const late = filteredData.filter(s => s.status === 'late').length;
    const attendanceRate = total > 0 ? ((present + late) / total * 100).toFixed(1) : "0";

    return { total, present, absent, late, attendanceRate };
  };

  // Handle view student details
  const handleViewStudent = (student: AttendanceRecord) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Handle edit student attendance
  const handleEditStudent = (student: AttendanceRecord) => {
    setEditFormData({ ...student });
    setShowEditModal(true);
  };

  // Handle save edited attendance
  const handleSaveEdit = () => {
    if (editFormData) {
      // In a real application, you would update the data in your backend/state management
      const updatedData = attendanceData.map(student => 
        student.id === editFormData.id ? editFormData : student
      );
      console.log('Updated attendance data:', updatedData);
      // For now, just close the modal
      setShowEditModal(false);
      setEditFormData(null);
    }
  };

  // Handle form input changes for editing
  const handleEditInputChange = (field: keyof AttendanceRecord, value: any) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value
      });
    }
  };

  // Handle subject attendance change
  const handleSubjectChange = (subject: keyof SubjectAttendance, status: AttendanceStatus) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        subjects: {
          ...editFormData.subjects,
          [subject]: status
        }
      });
    }
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2">Classwise Attendance Management</h1>
              <p className="text-gray-600">Brighton STEAM Academy - Daily Attendance Tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Mark Attendance
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-700">{stats.present}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-bold text-orange-700">{stats.late}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-purple-700">{stats.attendanceRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{stats.attendanceRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

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
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Student name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white/90 rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Student Info</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Time</th>
                  {showDetails && (
                    <>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Subject Attendance</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Weekly %</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Monthly %</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Parent Notification</th>
                    </>
                  )}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-25 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">
                          {student.rollNumber} • {student.class} • {student.section}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                        {student.status === 'late' && (
                          <span className="text-xs text-orange-600 font-medium">
                            ({student.lateBy}min late)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>In: {student.timeIn || '-'}</div>
                        <div>Out: {student.timeOut || '-'}</div>
                        <div className="font-medium text-blue-600">{student.totalHours}h total</div>
                      </div>
                    </td>

                    {showDetails && (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {subjects.map((subjectKey, index) => {
                              const subjectStatus = student.subjects[subjectKey];
                              const subjectLabel = subjectLabels[index];
                              return (
                                <span
                                  key={subjectKey}
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(subjectStatus)}`}
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
                                  student.weeklyAttendance >= 90 ? 'bg-green-500' :
                                  student.weeklyAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${student.weeklyAttendance}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{student.weeklyAttendance}%</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.monthlyAttendance >= 90 ? 'bg-green-500' :
                                  student.monthlyAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${student.monthlyAttendance}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{student.monthlyAttendance}%</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            student.parentNotified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {student.parentNotified ? '✓ Notified' : '✗ Pending'}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditStudent(student)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit Attendance"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleViewStudent(student)}
                          className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No students found matching the current filters</p>
              <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {filteredData.length} of {attendanceData.length} students for {selectedDate}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-600 font-medium">Present: {stats.present}</span>
              <span className="text-red-600 font-medium">Absent: {stats.absent}</span>
              <span className="text-orange-600 font-medium">Late: {stats.late}</span>
              <span className="text-blue-600 font-bold">Rate: {stats.attendanceRate}%</span>
            </div>
          </div>
        </div>

        {/* View Student Modal */}
        {showViewModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-blue-800">Student Attendance Details</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Student Basic Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Student Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{selectedStudent.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Roll Number</p>
                        <p className="font-medium">{selectedStudent.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-medium">{selectedStudent.class}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Section</p>
                        <p className="font-medium">{selectedStudent.section}</p>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Today's Attendance</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStudent.status)}`}>
                          {getStatusIcon(selectedStudent.status)}
                          {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time In</p>
                        <p className="font-medium">{selectedStudent.timeIn || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time Out</p>
                        <p className="font-medium">{selectedStudent.timeOut || 'N/A'}</p>
                      </div>
                    </div>
                    {selectedStudent.status === 'late' && (
                      <div className="mt-2">
                        <p className="text-sm text-orange-600">Late by {selectedStudent.lateBy} minutes</p>
                      </div>
                    )}
                  </div>

                  {/* Subject-wise Attendance */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-3">Subject-wise Attendance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {subjects.map((subjectKey, index) => {
                        const subjectStatus = selectedStudent.subjects[subjectKey];
                        const subjectLabel = subjectLabels[index];
                        return (
                          <div key={subjectKey} className="flex items-center justify-between">
                            <span className="font-medium">{subjectLabel}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(subjectStatus)}`}>
                              {subjectStatus.charAt(0).toUpperCase() + subjectStatus.slice(1)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-3">Performance Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Weekly Attendance</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${selectedStudent.weeklyAttendance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{selectedStudent.weeklyAttendance}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Attendance</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${selectedStudent.monthlyAttendance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{selectedStudent.monthlyAttendance}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Hours Today</p>
                        <p className="font-medium text-lg">{selectedStudent.totalHours}h</p>
                      </div>
                    </div>
                  </div>

                  {/* Parent Notification */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-3">Communication</h3>
                    <div className="flex items-center justify-between">
                      <span>Parent Notification</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedStudent.parentNotified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedStudent.parentNotified ? '✓ Sent' : '✗ Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleEditStudent(selectedStudent);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit Attendance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Student Modal */}
        {showEditModal && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-blue-800">Edit Attendance - {editFormData.name}</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Attendance Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-4">Basic Attendance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={editFormData.status}
                          onChange={(e) => handleEditInputChange('status', e.target.value as AttendanceStatus)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Late By (minutes)</label>
                        <input
                          type="number"
                          value={editFormData.lateBy}
                          onChange={(e) => handleEditInputChange('lateBy', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                          disabled={editFormData.status !== 'late'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time In</label>
                        <input
                          type="time"
                          value={editFormData.timeIn || ''}
                          onChange={(e) => handleEditInputChange('timeIn', e.target.value || null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          disabled={editFormData.status === 'absent'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Out</label>
                        <input
                          type="time"
                          value={editFormData.timeOut || ''}
                          onChange={(e) => handleEditInputChange('timeOut', e.target.value || null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          disabled={editFormData.status === 'absent'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject-wise Attendance */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-4">Subject-wise Attendance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {subjects.map((subjectKey, index) => {
                        const subjectLabel = subjectLabels[index];
                        return (
                          <div key={subjectKey}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{subjectLabel}</label>
                            <select
                              value={editFormData.subjects[subjectKey]}
                              onChange={(e) => handleSubjectChange(subjectKey, e.target.value as AttendanceStatus)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                              <option value="late">Late</option>
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Performance Tracking */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-4">Performance Tracking</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Attendance (%)</label>
                        <input
                          type="number"
                          value={editFormData.weeklyAttendance}
                          onChange={(e) => handleEditInputChange('weeklyAttendance', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Attendance (%)</label>
                        <input
                          type="number"
                          value={editFormData.monthlyAttendance}
                          onChange={(e) => handleEditInputChange('monthlyAttendance', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Hours</label>
                        <input
                          type="number"
                          step="0.25"
                          value={editFormData.totalHours}
                          onChange={(e) => handleEditInputChange('totalHours', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max="12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parent Notification */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-4">Parent Communication</h3>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editFormData.parentNotified}
                          onChange={(e) => handleEditInputChange('parentNotified', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Parent has been notified</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
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

export default ClasswiseAttendance;