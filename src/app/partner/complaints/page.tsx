"use client";
import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, AlertCircle, CheckCircle, Clock, Plus, Send, User, 
  Calendar, Filter, Search, Eye, Reply, School, Shield, Settings, 
  Package, CreditCard, Wifi, BookOpen, Users, ChevronDown, FileText,
  Phone, Mail, Building, Wrench, GraduationCap, Laptop, Globe
} from 'lucide-react';

// Type definitions
type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';
type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
type CategoryToAdmin = 'Technical' | 'Equipment' | 'Payment' | 'Platform' | 'Content' | 'Support' | 'Training';
type CategoryToSchool = 'Scheduling' | 'Student_Behavior' | 'Curriculum' | 'Facilities' | 'Communication' | 'Resources' | 'Administration';

interface Reply {
  id: number;
  sender: string;
  role: 'tutor' | 'student' | 'admin' | 'school';
  message: string;
  timestamp: string;
  attachments?: string[];
}

interface StudentComplaint {
  id: number;
  studentName: string;
  studentId: string;
  studentClass: string;
  subject: string;
  category: string;
  priority: Priority;
  status: ComplaintStatus;
  dateSubmitted: string;
  description: string;
  replies: Reply[];
  parentNotified: boolean;
  resolved?: boolean;
  resolutionNotes?: string;
}

interface ComplaintToAdmin {
  id: number;
  subject: string;
  category: CategoryToAdmin;
  priority: Priority;
  status: ComplaintStatus;
  dateSubmitted: string;
  description: string;
  adminReply?: string;
  ticketNumber?: string;
  expectedResolution?: string;
}

interface ComplaintToSchool {
  id: number;
  subject: string;
  category: CategoryToSchool;
  priority: Priority;
  status: ComplaintStatus;
  dateSubmitted: string;
  description: string;
  schoolReply?: string;
  affectedStudents?: string[];
  classesAffected?: string[];
}

const TutorComplaintsSystem = () => {
  const [activeTab, setActiveTab] = useState<'student_complaints' | 'to_admin' | 'to_school'>('student_complaints');
  const [selectedComplaint, setSelectedComplaint] = useState<StudentComplaint | null>(null);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showCreateSchoolModal, setShowCreateSchoolModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  // Sample data for student complaints received by tutor
  const [studentComplaints, setStudentComplaints] = useState<StudentComplaint[]>([
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "ST2024001",
      studentClass: "Grade 6A",
      subject: "Difficulty with Robotics Programming Assignment",
      category: "Academic Support",
      priority: "High",
      status: "in_progress",
      dateSubmitted: "2024-09-12",
      description: "I'm having trouble understanding the loop concepts in the robotics programming module. The Arduino code examples are confusing and I can't get my robot to move in the pattern required.",
      parentNotified: true,
      replies: [
        {
          id: 1,
          sender: "Mr. Alex Thompson",
          role: "tutor",
          message: "I understand your concern, Sarah. Let's schedule a one-on-one session to go through the loop concepts step by step. I'll also provide you with simplified examples.",
          timestamp: "2024-09-12 14:30",
          attachments: ["loop_examples.pdf"]
        }
      ]
    },
    {
      id: 2,
      studentName: "Marcus Chen",
      studentId: "ST2024002",
      studentClass: "Grade 7B",
      subject: "3D Printing Material Not Working",
      category: "Technical Issue",
      priority: "Medium",
      status: "resolved",
      dateSubmitted: "2024-09-10",
      description: "The 3D printer in our class keeps jamming with the new filament. I've tried multiple times but can't complete my engineering project.",
      parentNotified: false,
      resolved: true,
      resolutionNotes: "Replaced filament and cleaned printer nozzle. Student completed project successfully.",
      replies: [
        {
          id: 1,
          sender: "Mr. Alex Thompson",
          role: "tutor",
          message: "I'll check the 3D printer and replace the filament. Please try again tomorrow.",
          timestamp: "2024-09-10 16:45"
        },
        {
          id: 2,
          sender: "Marcus Chen",
          role: "student",
          message: "Thank you! The printer is working perfectly now and I finished my project.",
          timestamp: "2024-09-11 10:20"
        }
      ]
    },
    {
      id: 3,
      studentName: "Emma Wilson",
      studentId: "ST2024003",
      studentClass: "Grade 5A",
      subject: "Missed Classes Due to Technical Issues",
      category: "Attendance",
      priority: "High",
      status: "pending",
      dateSubmitted: "2024-09-13",
      description: "I've missed three online sessions this week because the platform keeps saying 'connection failed'. My internet is working fine for other activities.",
      parentNotified: true,
      replies: []
    }
  ]);

  // Sample data for complaints sent to admin
  const [adminComplaints, setAdminComplaints] = useState<ComplaintToAdmin[]>([
    {
      id: 1,
      subject: "Arduino Kits Not Delivered for Robotics Module",
      category: "Equipment",
      priority: "High",
      status: "in_progress",
      dateSubmitted: "2024-09-10",
      description: "The Arduino Uno kits ordered for Grade 6 and 7 robotics classes haven't been delivered yet. This is affecting 45 students across 3 classes. The original delivery date was September 5th.",
      ticketNumber: "ADM-2024-0891",
      adminReply: "We're expediting the shipment. Expected delivery by September 15th. We'll also provide digital simulators as a temporary solution.",
      expectedResolution: "2024-09-15"
    },
    {
      id: 2,
      subject: "Platform Performance Issues During Peak Hours",
      category: "Technical",
      priority: "Medium",
      status: "pending",
      dateSubmitted: "2024-09-12",
      description: "Students are experiencing frequent disconnections and slow loading times during 2-4 PM slots. This affects the quality of interactive STEAM sessions.",
      ticketNumber: "ADM-2024-0892"
    },
    {
      id: 3,
      subject: "Request for Advanced 3D Modeling Software Access",
      category: "Content",
      priority: "Low",
      status: "pending",
      dateSubmitted: "2024-09-08",
      description: "Current 3D modeling tools are basic. Request access to advanced software like Fusion 360 for Grade 8 students working on engineering projects."
    }
  ]);

  // Sample data for complaints sent to school
  const [schoolComplaints, setSchoolComplaints] = useState<ComplaintToSchool[]>([
    {
      id: 1,
      subject: "Inconsistent Class Schedule Changes",
      category: "Scheduling",
      priority: "High",
      status: "in_progress",
      dateSubmitted: "2024-09-11",
      description: "Multiple last-minute schedule changes this week have disrupted planned STEAM activities. Students are confused about timing and some have missed important sessions.",
      affectedStudents: ["ST2024001", "ST2024002", "ST2024003"],
      classesAffected: ["Grade 6A", "Grade 7B"],
      schoolReply: "We're implementing a 48-hour advance notice policy for schedule changes. Emergency changes will be communicated via SMS to both tutors and parents."
    },
    {
      id: 2,
      subject: "Student Disruptive Behavior Affecting Online Sessions",
      category: "Student_Behavior",
      priority: "Medium",
      status: "resolved",
      dateSubmitted: "2024-09-09",
      description: "Two students in Grade 7B have been consistently disruptive during online sessions, affecting other students' learning experience. Need school intervention.",
      affectedStudents: ["ST2024025", "ST2024026"],
      classesAffected: ["Grade 7B"],
      schoolReply: "Parents have been contacted and students have been given counseling. Behavior monitoring is in place."
    },
    {
      id: 3,
      subject: "Inadequate Study Materials for New Curriculum",
      category: "Curriculum",
      priority: "Medium",
      status: "pending",
      dateSubmitted: "2024-09-13",
      description: "The new AI and Machine Learning module lacks supporting materials and textbooks. Students need additional resources for theoretical understanding.",
      classesAffected: ["Grade 8A", "Grade 8B"]
    }
  ]);

  const [newAdminComplaint, setNewAdminComplaint] = useState({
    subject: '',
    category: 'Technical' as CategoryToAdmin,
    priority: 'Medium' as Priority,
    description: ''
  });

  const [newSchoolComplaint, setNewSchoolComplaint] = useState({
    subject: '',
    category: 'Scheduling' as CategoryToSchool,
    priority: 'Medium' as Priority,
    description: '',
    affectedStudents: [] as string[],
    classesAffected: [] as string[]
  });

  const [replyText, setReplyText] = useState('');

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500 text-white';
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      'Technical': <Laptop className="w-4 h-4" />,
      'Equipment': <Package className="w-4 h-4" />,
      'Payment': <CreditCard className="w-4 h-4" />,
      'Platform': <Globe className="w-4 h-4" />,
      'Content': <BookOpen className="w-4 h-4" />,
      'Support': <Settings className="w-4 h-4" />,
      'Training': <GraduationCap className="w-4 h-4" />,
      'Scheduling': <Calendar className="w-4 h-4" />,
      'Student_Behavior': <Users className="w-4 h-4" />,
      'Curriculum': <BookOpen className="w-4 h-4" />,
      'Facilities': <Building className="w-4 h-4" />,
      'Communication': <Phone className="w-4 h-4" />,
      'Resources': <FileText className="w-4 h-4" />,
      'Administration': <Settings className="w-4 h-4" />
    };
    return iconMap[category as keyof typeof iconMap] || <FileText className="w-4 h-4" />;
  };

  const handleCreateAdminComplaint = () => {
    const complaint: ComplaintToAdmin = {
      id: adminComplaints.length + 1,
      ...newAdminComplaint,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      ticketNumber: `ADM-2024-${(adminComplaints.length + 893).toString().padStart(4, '0')}`
    };
    setAdminComplaints([complaint, ...adminComplaints]);
    setNewAdminComplaint({ subject: '', category: 'Technical', priority: 'Medium', description: '' });
    setShowCreateAdminModal(false);
  };

  const handleCreateSchoolComplaint = () => {
    const complaint: ComplaintToSchool = {
      id: schoolComplaints.length + 1,
      ...newSchoolComplaint,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    setSchoolComplaints([complaint, ...schoolComplaints]);
    setNewSchoolComplaint({ 
      subject: '', 
      category: 'Scheduling', 
      priority: 'Medium', 
      description: '', 
      affectedStudents: [], 
      classesAffected: [] 
    });
    setShowCreateSchoolModal(false);
  };

  const handleReplyToStudent = (complaintId: number) => {
    const updatedComplaints = studentComplaints.map(complaint => {
      if (complaint.id === complaintId) {
        const newReply: Reply = {
          id: complaint.replies.length + 1,
          sender: "Mr. Alex Thompson",
          role: "tutor",
          message: replyText,
          timestamp: new Date().toLocaleString()
        };
        return {
          ...complaint,
          replies: [...complaint.replies, newReply],
          status: 'in_progress' as ComplaintStatus
        };
      }
      return complaint;
    });
    setStudentComplaints(updatedComplaints);
    setReplyText('');
    setShowReplyModal(false);
  };

  const handleStatusChange = (complaintId: number, newStatus: ComplaintStatus) => {
    const updatedComplaints = studentComplaints.map(complaint => {
      if (complaint.id === complaintId) {
        return { ...complaint, status: newStatus };
      }
      return complaint;
    });
    setStudentComplaints(updatedComplaints);
  };

  const filteredStudentComplaints = studentComplaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    const matchesClass = selectedClass === 'all' || complaint.studentClass === selectedClass;
    const matchesSearch = complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesClass && matchesSearch;
  });

  const filteredAdminComplaints = adminComplaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const filteredSchoolComplaints = schoolComplaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const classes = ['Grade 5A', 'Grade 6A', 'Grade 6B', 'Grade 7A', 'Grade 7B', 'Grade 8A', 'Grade 8B'];

  // ESC key functionality for closing modals
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (showReplyModal) {
            setShowReplyModal(false);
            setSelectedComplaint(null);
            
          } else if (showCreateAdminModal) {
            setShowCreateAdminModal(false);
          } else if (showCreateSchoolModal) {
            setShowCreateSchoolModal(false);
          }
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showReplyModal, showCreateAdminModal, showCreateSchoolModal]);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-700">Tutor Complaints Management</h1>
                <p className="text-gray-600">Manage student issues and escalate concerns to admin and school</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateSchoolModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <School className="w-4 h-4" />
                Report to School
              </button>
              <button
                onClick={() => setShowCreateAdminModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Report to Admin
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {studentComplaints.filter(c => c.status === 'pending').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Pending Student Issues</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {studentComplaints.filter(c => c.status === 'in_progress').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">In Progress</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {adminComplaints.filter(c => c.status === 'pending').length + 
                 schoolComplaints.filter(c => c.status === 'pending').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Escalated Issues</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {studentComplaints.filter(c => c.status === 'resolved').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Resolved This Week</h3>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('student_complaints')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'student_complaints'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Student Issues ({studentComplaints.length})
              </button>
              <button
                onClick={() => setActiveTab('to_admin')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'to_admin'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                To Admin ({adminComplaints.length})
              </button>
              <button
                onClick={() => setActiveTab('to_school')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'to_school'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                To School ({schoolComplaints.length})
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ComplaintStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {activeTab === 'student_complaints' && (
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Classes</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'student_complaints' && (
          <div className="space-y-4">
            {filteredStudentComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{complaint.subject}</h3>
                        <span className={`px-2 py-1 flex rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1">{complaint.status.replace('_', ' ').toUpperCase()}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                        {complaint.parentNotified && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            Parent Notified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {complaint.studentName} ({complaint.studentId})
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {complaint.studentClass}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {complaint.dateSubmitted}
                        </span>
                      </div>
                      <div className="text-sm text-purple-600 font-medium">{complaint.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint.id, e.target.value as ComplaintStatus)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setShowReplyModal(true);
                        }}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Reply className="w-3 h-3" />
                        Reply
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{complaint.description}</p>
                  
                  {complaint.resolutionNotes && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg mb-4">
                      <h4 className="font-medium text-green-800 mb-1">Resolution Notes:</h4>
                      <p className="text-green-700 text-sm">{complaint.resolutionNotes}</p>
                    </div>
                  )}
                  
                  {complaint.replies.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Conversation ({complaint.replies.length})
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {complaint.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-3 rounded-lg ${
                              reply.role === 'tutor'
                                ? 'bg-purple-50 border-l-4 border-purple-400 ml-4'
                                : 'bg-gray-50 border-l-4 border-gray-400 mr-4'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-gray-700">{reply.sender}</span>
                                <span className={`px-1 py-0.5 rounded text-xs ${
                                  reply.role === 'tutor' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {reply.role}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.message}</p>
                            {reply.attachments && (
                              <div className="mt-2">
                                {reply.attachments.map((attachment, index) => (
                                  <span key={index} className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mr-2">
                                    <FileText className="w-3 h-3" />
                                    {attachment}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredStudentComplaints.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Student Complaints</h3>
                <p className="text-gray-600">All student issues have been addressed or no complaints match your filters.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'to_admin' && (
          <div className="space-y-4">
            {filteredAdminComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(complaint.category)}
                        <h3 className="text-lg font-bold text-gray-800">{complaint.subject}</h3>
                      </div>
                      <span className={`px-2 py-1 flex rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1">{complaint.status.replace('_', ' ').toUpperCase()}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">{complaint.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {complaint.dateSubmitted}
                      </span>
                      {complaint.ticketNumber && (
                        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <FileText className="w-3 h-3" />
                          {complaint.ticketNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  {complaint.expectedResolution && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Expected Resolution:</span>
                      <div className="text-purple-600 font-medium">{complaint.expectedResolution}</div>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4">{complaint.description}</p>
                
                {complaint.adminReply && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <h4 className="font-medium text-green-800">Admin Response:</h4>
                    </div>
                    <p className="text-green-700">{complaint.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
            {filteredAdminComplaints.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Admin Complaints</h3>
                <p className="text-gray-600">No complaints have been submitted to admin or none match your filters.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'to_school' && (
          <div className="space-y-4">
            {filteredSchoolComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(complaint.category)}
                        <h3 className="text-lg font-bold text-gray-800">{complaint.subject}</h3>
                      </div>
                      <span className={`px-2 py-1 flex rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1">{complaint.status.replace('_', ' ').toUpperCase()}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="font-medium">{complaint.category.replace('_', ' ')}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {complaint.dateSubmitted}
                      </span>
                    </div>
                    {(complaint.classesAffected || complaint.affectedStudents) && (
                      <div className="text-sm text-gray-600">
                        {complaint.classesAffected && complaint.classesAffected.length > 0 && (
                          <div className="mb-1">
                            <span className="font-medium">Affected Classes: </span>
                            <span className="text-purple-600">{complaint.classesAffected.join(', ')}</span>
                          </div>
                        )}
                        {complaint.affectedStudents && complaint.affectedStudents.length > 0 && (
                          <div>
                            <span className="font-medium">Affected Students: </span>
                            <span className="text-purple-600">{complaint.affectedStudents.length} students</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{complaint.description}</p>
                
                {complaint.schoolReply && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <School className="w-4 h-4 text-blue-600" />
                      <h4 className="font-medium text-blue-800">School Response:</h4>
                    </div>
                    <p className="text-blue-700">{complaint.schoolReply}</p>
                  </div>
                )}
              </div>
            ))}
            {filteredSchoolComplaints.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <School className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No School Complaints</h3>
                <p className="text-gray-600">No complaints have been submitted to school or none match your filters.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Admin Complaint Modal */}
      {showCreateAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Report Issue to Admin
              </h2>
              <p className="text-gray-600 text-sm mt-1">Submit technical, equipment, or platform-related issues</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newAdminComplaint.subject}
                  onChange={(e) => setNewAdminComplaint({...newAdminComplaint, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newAdminComplaint.category}
                    onChange={(e) => setNewAdminComplaint({...newAdminComplaint, category: e.target.value as CategoryToAdmin})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Technical">Technical Issue</option>
                    <option value="Equipment">Equipment/Hardware</option>
                    <option value="Payment">Payment/Billing</option>
                    <option value="Platform">Platform Performance</option>
                    <option value="Content">Content/Curriculum</option>
                    <option value="Support">Support Request</option>
                    <option value="Training">Training/Resources</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newAdminComplaint.priority}
                    onChange={(e) => setNewAdminComplaint({...newAdminComplaint, priority: e.target.value as Priority})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  value={newAdminComplaint.description}
                  onChange={(e) => setNewAdminComplaint({...newAdminComplaint, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={5}
                  placeholder="Provide detailed information about the issue, including steps to reproduce, affected students/classes, and any error messages"
                />
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Helpful Information to Include:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Number of affected students or classes</li>
                  <li>• Specific times when issues occur</li>
                  <li>• Screenshots or error messages (if applicable)</li>
                  <li>• Hardware/software details for equipment issues</li>
                </ul>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateAdminModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAdminComplaint}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit to Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create School Complaint Modal */}
      {showCreateSchoolModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                Report Issue to School
              </h2>
              <p className="text-gray-600 text-sm mt-1">Submit scheduling, behavioral, or administrative issues</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newSchoolComplaint.subject}
                  onChange={(e) => setNewSchoolComplaint({...newSchoolComplaint, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newSchoolComplaint.category}
                    onChange={(e) => setNewSchoolComplaint({...newSchoolComplaint, category: e.target.value as CategoryToSchool})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Scheduling">Scheduling Issues</option>
                    <option value="Student_Behavior">Student Behavior</option>
                    <option value="Curriculum">Curriculum Concerns</option>
                    <option value="Facilities">Facilities/Resources</option>
                    <option value="Communication">Communication</option>
                    <option value="Resources">Learning Resources</option>
                    <option value="Administration">Administrative Issues</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newSchoolComplaint.priority}
                    onChange={(e) => setNewSchoolComplaint({...newSchoolComplaint, priority: e.target.value as Priority})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affected Classes</label>
                <div className="grid grid-cols-3 gap-2">
                  {classes.map(cls => (
                    <label key={cls} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newSchoolComplaint.classesAffected.includes(cls)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewSchoolComplaint({
                              ...newSchoolComplaint,
                              classesAffected: [...newSchoolComplaint.classesAffected, cls]
                            });
                          } else {
                            setNewSchoolComplaint({
                              ...newSchoolComplaint,
                              classesAffected: newSchoolComplaint.classesAffected.filter(c => c !== cls)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{cls}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  value={newSchoolComplaint.description}
                  onChange={(e) => setNewSchoolComplaint({...newSchoolComplaint, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Provide detailed information about the issue and its impact on teaching and learning"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateSchoolModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSchoolComplaint}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit to School
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Reply to Student</h2>
              <p className="text-gray-600 text-sm">
                <strong>{selectedComplaint.studentName}</strong> ({selectedComplaint.studentId}) - {selectedComplaint.studentClass}
              </p>
              <p className="text-purple-600 text-sm font-medium">{selectedComplaint.subject}</p>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={5}
                placeholder="Type your response to the student. Be clear, supportive, and provide specific next steps..."
              />
              <div className="mt-3 flex items-center gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Copy parent on reply</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Mark as resolved</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReplyToStudent(selectedComplaint.id)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorComplaintsSystem;