"use client";
import React, { useState } from 'react';
import { User, School, Users, BookOpen, TrendingUp, AlertCircle, CreditCard, Calendar, Edit, Save, X, Plus, Trash2, UserPlus, Shield } from 'lucide-react';

interface AdminStaff {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string;
  dateAdded: string;
  status: 'active' | 'inactive';
}

const SchoolProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCoordinatorModal, setShowAddCoordinatorModal] = useState(false);
  const [profileData, setProfileData] = useState({
    // School Identity & Access
    schoolName: "Brighton STEAM Academy",
    schoolCode: "BSA001",
    schoolAddress: "Ring Road, Kathmandu, Nepal",
    schoolPhone: "+977-1-4567890",
    schoolEmail: "info@brightonsteam.edu.np",
    establishedYear: "2015",
    principalName: "Dr. Sarah Johnson",
    principalEmail: "principal@brightonsteam.edu.np",
    principalPhone: "+977-1-4567891",
    
    // Academic Structure
    classesOffered: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
    sections: ["Science", "Technology", "Engineering", "Arts", "Mathematics"],
    subjects: ["Physics", "Robotics", "Coding", "Mathematics", "Digital Arts", "3D Design"],
    totalTutors: 12,
    totalStudents: 245,
    
    // Performance Data
    overallProgress: 78,
    classProgress: [
      { class: "Grade 1", progress: 85 },
      { class: "Grade 2", progress: 82 },
      { class: "Grade 3", progress: 75 },
      { class: "Grade 4", progress: 70 },
      { class: "Grade 5", progress: 68 },
      { class: "Grade 6", progress: 72 }
    ],
    tutorPerformance: 84,
    
    // Complaints & Feedback
    totalComplaints: 3,
    pendingComplaints: 1,
    resolvedComplaints: 2,
    
    // Administrative Info
    subscriptionPlan: "Premium STEAM Package",
    activeUntil: "2025-12-31",
    lastPayment: "2024-09-01"
  });

  const [adminStaff, setAdminStaff] = useState<AdminStaff[]>([
    {
      id: 1,
      name: "Mark Wilson",
      email: "mark.wilson@brightonsteam.edu.np",
      role: "Academic Coordinator",
      permissions: "Full Access",
      dateAdded: "2024-08-15",
      status: "active"
    },
    {
      id: 2,
      name: "Lisa Chen",
      email: "lisa.chen@brightonsteam.edu.np",
      role: "STEAM Coordinator",
      permissions: "Academic Only",
      dateAdded: "2024-09-01",
      status: "active"
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj.patel@brightonsteam.edu.np",
      role: "STEAM Coordinator",
      permissions: "Academic Only",
      dateAdded: "2024-07-20",
      status: "inactive"
    }
  ]);

  const [newCoordinator, setNewCoordinator] = useState({
    name: '',
    email: '',
    role: 'STEAM Coordinator',
    permissions: 'Academic Only'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const handleAddCoordinator = () => {
    const coordinator: AdminStaff = {
      id: Math.max(...adminStaff.map(s => s.id)) + 1,
      ...newCoordinator,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setAdminStaff([...adminStaff, coordinator]);
    setNewCoordinator({ name: '', email: '', role: 'STEAM Coordinator', permissions: 'Academic Only' });
    setShowAddCoordinatorModal(false);
  };

  const handleRemoveCoordinator = (id: number) => {
    if (window.confirm('Are you sure you want to remove this coordinator?')) {
      setAdminStaff(adminStaff.filter(staff => staff.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setAdminStaff(adminStaff.map(staff => 
      staff.id === id 
        ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active' }
        : staff
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <School className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700">School Profile Management</h1>
                <p className="text-gray-600">Manage your institution details and STEAM coordinators</p>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Super Admin Access</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Identity & Basic Information */}
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <School className="w-5 h-5" />
              School Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.schoolName}
                    onChange={(e) => setProfileData({...profileData, schoolName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.schoolName}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Code</label>
                  <p className="text-gray-800 font-mono bg-gray-100 px-3 py-2 rounded-lg">{profileData.schoolCode}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.establishedYear}
                      onChange={(e) => setProfileData({...profileData, establishedYear: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded-lg">{profileData.establishedYear}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    value={profileData.schoolAddress}
                    onChange={(e) => setProfileData({...profileData, schoolAddress: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.schoolAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.schoolPhone}
                      onChange={(e) => setProfileData({...profileData, schoolPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profileData.schoolPhone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.schoolEmail}
                      onChange={(e) => setProfileData({...profileData, schoolEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profileData.schoolEmail}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Principal Information */}
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Principal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.principalName}
                    onChange={(e) => setProfileData({...profileData, principalName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.principalName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principal Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.principalEmail}
                    onChange={(e) => setProfileData({...profileData, principalEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.principalEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principal Phone</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.principalPhone}
                    onChange={(e) => setProfileData({...profileData, principalPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.principalPhone}</p>
                )}
              </div>

              {/* Academic Stats */}
              <div className="border-t pt-4 mt-6">
                <h3 className="font-medium text-gray-700 mb-3">Academic Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-700">{profileData.totalTutors}</p>
                    <p className="text-sm text-gray-600">Total Tutors</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">{profileData.totalStudents}</p>
                    <p className="text-sm text-gray-600">Total Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEAM Coordinators Management */}
          <div className="lg:col-span-2 bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <Users className="w-5 h-5" />
                STEAM Coordinators Management
              </h2>
              <button
                onClick={() => setShowAddCoordinatorModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Coordinator
              </button>
            </div>

            <div className="space-y-4">
              {adminStaff.map((staff) => (
                <div key={staff.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-800">{staff.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          staff.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {staff.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{staff.email}</p>
                      <p className="text-gray-600 text-sm">{staff.role} • {staff.permissions}</p>
                      <p className="text-gray-500 text-xs mt-2">Added: {staff.dateAdded}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleStatus(staff.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          staff.status === 'active'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {staff.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      {staff.role === 'STEAM Coordinator' && (
                        <button
                          onClick={() => handleRemoveCoordinator(staff.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Structure */}
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Academic Structure
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classes Offered</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.classesOffered.map((cls, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">STEAM Sections</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.sections.map((section, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Progress */}
          <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Overview
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Overall School Progress</span>
                  <span className="text-2xl font-bold text-green-600">{profileData.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${profileData.overallProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-blue-600">{profileData.tutorPerformance}%</p>
                  <p className="text-xs text-gray-600">Tutor Performance</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-green-600">{profileData.resolvedComplaints}</p>
                  <p className="text-xs text-gray-600">Resolved Issues</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-yellow-600">{profileData.pendingComplaints}</p>
                  <p className="text-xs text-gray-600">Pending Issues</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-800 mb-2">Subscription Details</h3>
                <p className="text-sm text-purple-700 mb-1">{profileData.subscriptionPlan}</p>
                <p className="text-xs text-purple-600">Active until: {profileData.activeUntil}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Coordinator Modal */}
      {showAddCoordinatorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Add STEAM Coordinator</h2>
              <p className="text-gray-600 text-sm">Add a new coordinator to manage STEAM education</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newCoordinator.name}
                  onChange={(e) => setNewCoordinator({...newCoordinator, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter coordinator's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newCoordinator.email}
                  onChange={(e) => setNewCoordinator({...newCoordinator, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="coordinator@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newCoordinator.role}
                  onChange={(e) => setNewCoordinator({...newCoordinator, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="STEAM Coordinator">STEAM Coordinator</option>
                  <option value="Academic Coordinator">Academic Coordinator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <select
                  value={newCoordinator.permissions}
                  onChange={(e) => setNewCoordinator({...newCoordinator, permissions: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Academic Only">Academic Only</option>
                  <option value="Full Access">Full Access</option>
                  <option value="Limited Access">Limited Access</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddCoordinatorModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCoordinator}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Coordinator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolProfile;