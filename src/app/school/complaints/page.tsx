"use client";
import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock, Plus, Send, User, Calendar, Filter, Search, Eye, Reply } from 'lucide-react';

// Type definitions
type ComplaintStatus = 'pending' | 'in_progress' | 'resolved';
type Priority = 'Low' | 'Medium' | 'High';
type Category = 'Technical' | 'Academic' | 'Scheduling' | 'Content' | 'Billing' | 'Support' | 'Feature Request';

interface Reply {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  isSchoolReply: boolean;
}

interface ReceivedComplaint {
  id: number;
  studentName: string;
  studentClass: string;
  subject: string;
  category: string;
  priority: Priority;
  status: ComplaintStatus;
  dateSubmitted: string;
  description: string;
  replies: Reply[];
}

interface SentComplaint {
  id: number;
  subject: string;
  category: Category;
  priority: Priority;
  status: ComplaintStatus;
  dateSubmitted: string;
  description: string;
  adminReply: string | null;
}

interface NewComplaint {
  subject: string;
  category: Category;
  priority: Priority;
  description: string;
}

const SchoolComplaints = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [selectedComplaint, setSelectedComplaint] = useState<ReceivedComplaint | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for received complaints (from students)
  const [receivedComplaints, setReceivedComplaints] = useState<ReceivedComplaint[]>([
    {
      id: 1,
      studentName: "Alex Johnson",
      studentClass: "Grade 5-A",
      subject: "Technical Issue with Robotics Module",
      category: "Technical",
      priority: "High",
      status: "pending",
      dateSubmitted: "2025-01-08",
      description: "The robotics simulation software keeps crashing during the programming exercise. I've tried refreshing multiple times but the issue persists.",
      replies: [
        {
          id: 1,
          sender: "School Admin",
          message: "Thank you for reporting this issue. Our IT team is looking into the robotics simulation problem.",
          timestamp: "2025-01-08 14:30",
          isSchoolReply: true
        }
      ]
    },
    {
      id: 2,
      studentName: "Emma Chen",
      studentClass: "Grade 4-B",
      subject: "Difficulty Understanding 3D Design Assignment",
      category: "Academic",
      priority: "Medium",
      status: "resolved",
      dateSubmitted: "2025-01-07",
      description: "I'm having trouble with the 3D modeling assignment. The instructions are unclear and I can't figure out how to use the extrude tool properly.",
      replies: [
        {
          id: 1,
          sender: "School Admin",
          message: "I've assigned our 3D design tutor to provide you additional support. Please check your dashboard for the scheduled help session.",
          timestamp: "2025-01-07 16:45",
          isSchoolReply: true
        },
        {
          id: 2,
          sender: "Emma Chen",
          message: "Thank you! The extra help session was very useful and I completed the assignment.",
          timestamp: "2025-01-08 10:20",
          isSchoolReply: false
        }
      ]
    },
    {
      id: 3,
      studentName: "Marcus Wilson",
      studentClass: "Grade 6-A",
      subject: "Tutor Not Available for Scheduled Session",
      category: "Scheduling",
      priority: "High",
      status: "in_progress",
      dateSubmitted: "2025-01-09",
      description: "My mathematics tutor didn't show up for our scheduled session yesterday. This is the second time this month.",
      replies: []
    }
  ]);

  // Sample data for sent complaints (to admin)
  const [sentComplaints, setSentComplaints] = useState<SentComplaint[]>([
    {
      id: 1,
      subject: "Platform Performance Issues",
      category: "Technical",
      priority: "High",
      status: "in_progress",
      dateSubmitted: "2025-01-05",
      description: "Our students are experiencing frequent timeouts and slow loading times during peak hours (2-4 PM). This is affecting their learning experience.",
      adminReply: "We're upgrading server capacity and implementing CDN improvements. Expected completion by Jan 15th."
    },
    {
      id: 2,
      subject: "Request for Additional STEAM Modules",
      category: "Content",
      priority: "Medium",
      status: "pending",
      dateSubmitted: "2025-01-03",
      description: "We would like to request additional modules for advanced robotics and AI programming for our Grade 6 students.",
      adminReply: null
    }
  ]);

  const [newComplaint, setNewComplaint] = useState<NewComplaint>({
    subject: '',
    category: 'Technical',
    priority: 'Medium',
    description: ''
  });

  const [replyText, setReplyText] = useState('');

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateComplaint = () => {
    const complaint: SentComplaint = {
      id: sentComplaints.length + 1,
      ...newComplaint,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      adminReply: null
    };
    setSentComplaints([complaint, ...sentComplaints]);
    setNewComplaint({ subject: '', category: 'Technical', priority: 'Medium', description: '' });
    setShowCreateModal(false);
  };

  const handleReply = (complaintId: number) => {
    const updatedComplaints = receivedComplaints.map(complaint => {
      if (complaint.id === complaintId) {
        const newReply: Reply = {
          id: complaint.replies.length + 1,
          sender: "School Admin",
          message: replyText,
          timestamp: new Date().toLocaleString(),
          isSchoolReply: true
        };
        return {
          ...complaint,
          replies: [...complaint.replies, newReply],
          status: 'in_progress' as ComplaintStatus
        };
      }
      return complaint;
    });
    setReceivedComplaints(updatedComplaints);
    setReplyText('');
    setShowReplyModal(false);
  };

  const handleStatusChange = (complaintId: number, newStatus: ComplaintStatus) => {
    const updatedComplaints = receivedComplaints.map(complaint => {
      if (complaint.id === complaintId) {
        return { ...complaint, status: newStatus };
      }
      return complaint;
    });
    setReceivedComplaints(updatedComplaints);
  };

  const filteredReceivedComplaints = receivedComplaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesSearch = complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredSentComplaints = sentComplaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700">Complaints Management</h1>
                <p className="text-gray-600">Manage student complaints and communicate with admin</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Complaint to Admin
            </button>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('received')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'received'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                From Students ({receivedComplaints.length})
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'sent'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                To Admin ({sentComplaints.length})
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ComplaintStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        {activeTab === 'received' ? (
          <div className="space-y-4">
            {filteredReceivedComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white/90 rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{complaint.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                          {complaint.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {complaint.studentName} ({complaint.studentClass})
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {complaint.dateSubmitted}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint.id, e.target.value as ComplaintStatus)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Reply className="w-3 h-3" />
                        Reply
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{complaint.description}</p>
                  
                  {complaint.replies.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-700 mb-3">Conversation:</h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {complaint.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-3 rounded-lg ${
                              reply.isSchoolReply
                                ? 'bg-blue-50 border-l-4 border-blue-400 ml-4'
                                : 'bg-gray-50 border-l-4 border-gray-400 mr-4'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm text-gray-700">{reply.sender}</span>
                              <span className="text-xs text-gray-500">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSentComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white/90 rounded-xl shadow-lg border border-blue-100 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{complaint.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{complaint.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {complaint.dateSubmitted}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{complaint.description}</p>
                
                {complaint.adminReply && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <h4 className="font-medium text-green-800 mb-2">Admin Reply:</h4>
                    <p className="text-green-700">{complaint.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Complaint Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Create Complaint to Admin</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newComplaint.subject}
                  onChange={(e) => setNewComplaint({...newComplaint, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newComplaint.category}
                    onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value as Category})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Content">Content</option>
                    <option value="Billing">Billing</option>
                    <option value="Support">Support</option>
                    <option value="Feature Request">Feature Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newComplaint.priority}
                    onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value as Priority})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Detailed description of the issue or request"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateComplaint}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Complaint
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
              <h2 className="text-xl font-bold text-gray-800">Reply to: {selectedComplaint.subject}</h2>
              <p className="text-gray-600 text-sm">Student: {selectedComplaint.studentName} ({selectedComplaint.studentClass})</p>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
                placeholder="Type your reply to the student..."
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReply(selectedComplaint.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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

export default SchoolComplaints;