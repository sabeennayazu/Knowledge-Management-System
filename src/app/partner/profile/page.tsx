"use client";
import React, { useState } from 'react';
import {
  User, School, Users, BookOpen, TrendingUp, AlertCircle, Edit, Save, X, Plus, Trash2, Shield, GraduationCap,
  MapPin, Phone, Mail, Clock, Award, Target,
  CheckCircle, XCircle, Star, Building, ChevronRight, BookCheck, Lightbulb
} from 'lucide-react';

interface School {
  id: number;
  name: string;
  code: string;
  address: string;
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
  classesTeaching: string[];
  subjects: string[];
  totalStudents: number;
  avgProgress: number;
  contractStatus: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

interface Performance {
  schoolId: number;
  schoolName: string;
  overallRating: number;
  studentSatisfaction: number;
  completionRate: number;
  punctuality: number;
  feedback: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentComments: string[];
}

interface Qualification {
  id: number;
  degree: string;
  institution: string;
  year: string;
  specialization: string;
  verified: boolean;
}

interface Certification {
  id: number;
  name: string;
  institution: string;
  completionDate: string;
  validUntil: string;
}

const TutorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [showAddQualModal, setShowAddQualModal] = useState(false);
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [editingQualification, setEditingQualification] = useState<Qualification | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  const [newQualification, setNewQualification] = useState({
    degree: '',
    institution: '',
    year: '',
    specialization: '',
    verified: false
  });

  const [newCertification, setNewCertification] = useState({
    name: '',
    institution: '',
    completionDate: '',
    validUntil: ''
  });

  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@steamtutor.com",
    phone: "+977-1-9876543",
    address: "Thamel, Kathmandu, Nepal",
    dateOfBirth: "1988-03-15",
    nationality: "Nepali",
    profileImage: "/api/placeholder.png",

    // Professional Information
    tutorId: "TUT-2024-0156",
    specialization: ["Robotics", "Programming", "Mathematics", "Physics"],
    experience: "8 years",
    joinDate: "2023-01-15",
    employeeStatus: "Full-time",
    availabilityStatus: "Available",

    // Contact & Emergency
    emergencyContact: {
      name: "Maria Rodriguez",
      relationship: "Sister",
      phone: "+977-1-9876544"
    },

    // Professional Stats
    totalSchools: 3,
    totalStudents: 87,
    totalClasses: 12,
    overallRating: 4.7,
    completedLessons: 245,

    // Bio
    bio: "Passionate STEAM educator with 8+ years of experience in robotics and programming. Dedicated to inspiring young minds through hands-on learning and innovative teaching methods."
  });

  const [schools, setSchools] = useState<School[]>([
    {
      id: 1,
      name: "Brighton STEAM Academy",
      code: "BSA001",
      address: "Ring Road, Kathmandu",
      coordinator: {
        name: "Mark Wilson",
        email: "mark.wilson@brightonsteam.edu.np",
        phone: "+977-1-4567891"
      },
      classesTeaching: ["Grade 4", "Grade 5", "Grade 6"],
      subjects: ["Robotics", "Programming"],
      totalStudents: 35,
      avgProgress: 82,
      contractStatus: "active",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Future Leaders School",
      code: "FLS002",
      address: "Lalitpur, Nepal",
      coordinator: {
        name: "Sarah Chen",
        email: "sarah.chen@futureleaders.edu.np",
        phone: "+977-1-5567892"
      },
      classesTeaching: ["Grade 3", "Grade 4"],
      subjects: ["Mathematics", "Physics"],
      totalStudents: 28,
      avgProgress: 78,
      contractStatus: "active",
      joinDate: "2023-06-01"
    },
    {
      id: 3,
      name: "Innovation Hub Academy",
      code: "IHA003",
      address: "Bhaktapur, Nepal",
      coordinator: {
        name: "Raj Sharma",
        email: "raj.sharma@innovationhub.edu.np",
        phone: "+977-1-6567893"
      },
      classesTeaching: ["Grade 5", "Grade 6"],
      subjects: ["Robotics", "Programming"],
      totalStudents: 24,
      avgProgress: 85,
      contractStatus: "active",
      joinDate: "2024-02-01"
    }
  ]);

  const [qualifications, setQualifications] = useState<Qualification[]>([
    {
      id: 1,
      degree: "M.Sc. in Computer Science",
      institution: "Tribhuvan University",
      year: "2018",
      specialization: "Artificial Intelligence & Robotics",
      verified: true
    },
    {
      id: 2,
      degree: "B.Sc. in Mathematics",
      institution: "Kathmandu University",
      year: "2016",
      specialization: "Applied Mathematics",
      verified: true
    },
    {
      id: 3,
      degree: "STEAM Education Certificate",
      institution: "International STEAM Institute",
      year: "2020",
      specialization: "Innovative Teaching Methods",
      verified: true
    }
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: 1,
      name: "STEAM Teaching Certification",
      institution: "International STEAM Institute",
      completionDate: "2020-12-15",
      validUntil: "2026-12-31"
    },
    {
      id: 2,
      name: "Child Safety Training",
      institution: "Nepal Education Board",
      completionDate: "2024-01-15",
      validUntil: ""
    },
    {
      id: 3,
      name: "Advanced Robotics Workshop",
      institution: "Tech Innovation Center",
      completionDate: "2023-08-20",
      validUntil: ""
    },
    {
      id: 4,
      name: "Digital Teaching Methods",
      institution: "Online Learning Academy",
      completionDate: "2023-11-10",
      validUntil: ""
    }
  ]);

  const [performance] = useState<Performance[]>([
    {
      schoolId: 1,
      schoolName: "Brighton STEAM Academy",
      overallRating: 4.8,
      studentSatisfaction: 4.7,
      completionRate: 95,
      punctuality: 98,
      feedback: { positive: 28, neutral: 5, negative: 2 },
      recentComments: ["Excellent teaching methods!", "Very interactive classes", "Great with robotics projects"]
    },
    {
      schoolId: 2,
      schoolName: "Future Leaders School",
      overallRating: 4.6,
      studentSatisfaction: 4.5,
      completionRate: 92,
      punctuality: 96,
      feedback: { positive: 22, neutral: 4, negative: 2 },
      recentComments: ["Clear explanations", "Good problem-solving approach", "Helpful with math concepts"]
    },
    {
      schoolId: 3,
      schoolName: "Innovation Hub Academy",
      overallRating: 4.9,
      studentSatisfaction: 4.8,
      completionRate: 97,
      punctuality: 99,
      feedback: { positive: 21, neutral: 2, negative: 1 },
      recentComments: ["Outstanding programming mentor", "Inspiring teacher", "Makes learning fun"]
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
    setShowSchoolModal(true);
  };

  const handleAddQualification = () => {
    const qualification: Qualification = {
      id: Math.max(...qualifications.map(q => q.id)) + 1,
      ...newQualification
    };
    setQualifications([...qualifications, qualification]);
    setNewQualification({ degree: '', institution: '', year: '', specialization: '', verified: false });
    setShowAddQualModal(false);
  };

  const handleEditQualification = (qualification: Qualification) => {
    setEditingQualification(qualification);
    setNewQualification(qualification);
    setShowAddQualModal(true);
  };

  const handleUpdateQualification = () => {
    if (editingQualification) {
      setQualifications(qualifications.map(q =>
        q.id === editingQualification.id ? { ...newQualification, id: editingQualification.id } : q
      ));
      setEditingQualification(null);
      setNewQualification({ degree: '', institution: '', year: '', specialization: '', verified: false });
      setShowAddQualModal(false);
    }
  };

  const handleDeleteQualification = (id: number) => {
    if (window.confirm('Are you sure you want to delete this qualification?')) {
      setQualifications(qualifications.filter(q => q.id !== id));
    }
  };

  const handleAddCertification = () => {
    const certification: Certification = {
      id: Math.max(...certifications.map(c => c.id)) + 1,
      ...newCertification
    };
    setCertifications([...certifications, certification]);
    setNewCertification({ name: '', institution: '', completionDate: '', validUntil: '' });
    setShowAddCertModal(false);
  };

  const handleEditCertification = (certification: Certification) => {
    setEditingCertification(certification);
    setNewCertification(certification);
    setShowAddCertModal(true);
  };

  const handleUpdateCertification = () => {
    if (editingCertification) {
      setCertifications(certifications.map(c =>
        c.id === editingCertification.id ? { ...newCertification, id: editingCertification.id } : c
      ));
      setEditingCertification(null);
      setNewCertification({ name: '', institution: '', completionDate: '', validUntil: '' });
      setShowAddCertModal(false);
    }
  };

  const handleDeleteCertification = (id: number) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      setCertifications(certifications.filter(c => c.id !== id));
    }
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
          <School className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-700">{profileData.totalSchools}</p>
          <p className="text-sm text-gray-600">Schools</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
          <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">{profileData.totalStudents}</p>
          <p className="text-sm text-gray-600">Students</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
          <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">{profileData.totalClasses}</p>
          <p className="text-sm text-gray-600">Classes</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
          <Star className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-700">{profileData.overallRating}</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>

      {/* Schools Overview */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5" />
          Teaching Schools
        </h3>
        <div className="space-y-4">
          {schools.map((school) => (
            <div key={school.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{school.name}</h4>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{school.code}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(school.contractStatus)}`}>
                      {school.contractStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {school.address}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {school.totalStudents} students
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {school.avgProgress}% progress
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleSchoolClick(school)}
                  className="hover:bg-blue-50 p-1 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Performance Summary */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Lesson Completion</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">94.5%</p>
            <p className="text-xs text-green-600">Above average</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Student Satisfaction</span>
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">{profileData.overallRating}/5.0</p>
            <p className="text-xs text-blue-600">Excellent rating</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Punctuality</span>
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-700">97.8%</p>
            <p className="text-xs text-purple-600">Very reliable</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfoTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </h3>
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => document.getElementById('profile-image-input')?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setProfileData({ ...profileData, profileImage: e.target?.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{profileData.fullName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tutor ID</label>
              <p className="text-gray-800 font-mono bg-gray-100 px-3 py-2 rounded-lg">{profileData.tutorId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded-lg">{profileData.dateOfBirth}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            {isEditing ? (
              <textarea
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
              />
            ) : (
              <p className="text-gray-800 font-medium">{profileData.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {profileData.phone}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  {profileData.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Professional Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            ) : (
              <p className="text-gray-800">{profileData.bio}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded-lg">{profileData.experience}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded-lg">{profileData.joinDate}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
            <div className="flex flex-wrap gap-2">
              {profileData.specialization.map((spec: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
              <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {profileData.employeeStatus}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {profileData.availabilityStatus}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-700 mb-3">Emergency Contact</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium text-gray-800">{profileData.emergencyContact.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Relationship:</span>
                <span className="text-sm font-medium text-gray-800">{profileData.emergencyContact.relationship}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phone:</span>
                <span className="text-sm font-medium text-gray-800">{profileData.emergencyContact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderSchoolsTab = () => (
    <div className="space-y-6">
      {schools.map((school) => (
        <div key={school.id} className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-800">{school.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{school.code}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(school.contractStatus)}`}>
                  {school.contractStatus.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 flex items-center gap-1 mb-2">
                <MapPin className="w-4 h-4" />
                {school.address}
              </p>
              <p className="text-sm text-gray-500">Teaching since: {school.joinDate}</p>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 px-3 py-2 rounded-lg mb-2">
                <p className="text-sm text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-blue-700">{school.avgProgress}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coordinator Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                School Coordinator
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-800">{school.coordinator.name}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {school.coordinator.email}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {school.coordinator.phone}
                </p>
              </div>
            </div>

            {/* Teaching Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Teaching Details
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Classes Teaching:</p>
                  <div className="flex flex-wrap gap-1">
                    {school.classesTeaching.map((cls, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {school.subjects.map((subject, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Students:</span>
                  <span className="font-medium text-gray-800">{school.totalStudents}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {performance.map((perf, index) => (
        <div key={index} className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">{perf.schoolName}</h3>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-700">{perf.overallRating}/5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Student Satisfaction</p>
              <p className="text-2xl font-bold text-blue-700">{perf.studentSatisfaction}/5</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-green-700">{perf.completionRate}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Punctuality</p>
              <p className="text-2xl font-bold text-purple-700">{perf.punctuality}%</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Total Feedback</p>
              <p className="text-2xl font-bold text-orange-700">{perf.feedback.positive + perf.feedback.neutral + perf.feedback.negative}</p>
            </div>
          </div>

          {/* Feedback Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">Feedback Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Positive
                  </span>
                  <span className="font-medium text-gray-700">{perf.feedback.positive}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Neutral
                  </span>
                  <span className="font-medium text-gray-700">{perf.feedback.neutral}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Negative
                  </span>
                  <span className="font-medium text-gray-700">{perf.feedback.negative}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">Recent Comments</h4>
              <div className="space-y-2">
                {perf.recentComments.map((comment: string, idx: number) => (
                  <div key={idx} className="bg-white p-2 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-gray-700">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderQualificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Educational Qualifications
          </h3>
          <button
            onClick={() => setShowAddQualModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Qualification
          </button>
        </div>

        <div className="space-y-4">
          {qualifications.map((qual) => (
            <div key={qual.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{qual.degree}</h4>
                    {qual.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{qual.institution}</p>
                  <p className="text-sm text-gray-500">Specialization: {qual.specialization}</p>
                  <p className="text-sm text-gray-500">Year: {qual.year}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditQualification(qual)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteQualification(qual.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Training */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Certifications & Training
          </h3>
          <button
            onClick={() => setShowAddCertModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <BookCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.institution}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Completed: {cert.completionDate}
                      {cert.validUntil && ` • Valid until: ${cert.validUntil}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCertification(cert)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCertification(cert.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      {/* Skills & Competencies */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Skills & Competencies
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Robotics Programming</span>
              <span className="text-sm font-medium text-blue-600">Expert (95%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Mathematics Teaching</span>
              <span className="text-sm font-medium text-green-600">Advanced (88%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Classroom Management</span>
              <span className="text-sm font-medium text-purple-600">Advanced (92%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Digital Tools & Technology</span>
              <span className="text-sm font-medium text-orange-600">Advanced (90%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Student Engagement</span>
              <span className="text-sm font-medium text-pink-600">Expert (96%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700">Tutor Profile Dashboard</h1>
                <p className="text-gray-600">Manage your teaching profile and track performance</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Active Tutor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">Available</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing && activeTab === 'personal' ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : isEditing && activeTab === 'personal' ? (
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
              ) : null}
            </div>
          </div>
        </div>


        {/* Navigation Tabs */}
        <div className="bg-white/90 rounded-xl shadow-lg mb-6 border border-blue-100">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'schools', label: 'Schools & Coordinators', icon: School },
              { id: 'performance', label: 'Performance', icon: Star },
              { id: 'qualifications', label: 'Qualifications', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'personal' && renderPersonalInfoTab()}
          {activeTab === 'schools' && renderSchoolsTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
          {activeTab === 'qualifications' && renderQualificationsTab()}
        </div>
      </div>

      {/* School Detail Modal */}
      {showSchoolModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">{selectedSchool.name}</h2>
                <button
                  onClick={() => setShowSchoolModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">School Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Code:</span> {selectedSchool.code}</p>
                    <p><span className="text-gray-600">Address:</span> {selectedSchool.address}</p>
                    <p><span className="text-gray-600">Students:</span> {selectedSchool.totalStudents}</p>
                    <p><span className="text-gray-600">Average Progress:</span> {selectedSchool.avgProgress}%</p>
                    <p><span className="text-gray-600">Join Date:</span> {selectedSchool.joinDate}</p>
                    <p>
                      <span className="text-gray-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSchool.contractStatus)}`}>
                        {selectedSchool.contractStatus.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Coordinator Contact</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{selectedSchool.coordinator.name}</p>
                    <p className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {selectedSchool.coordinator.email}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedSchool.coordinator.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Teaching Assignment</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Classes:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSchool.classesTeaching.map((cls: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSchool.subjects.map((subject: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Add/Edit Qualification Modal */}
      {showAddQualModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editingQualification ? 'Edit Qualification' : 'Add New Qualification'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Certificate</label>
                <input
                  type="text"
                  value={newQualification.degree}
                  onChange={(e) => setNewQualification({ ...newQualification, degree: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., M.Sc. in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={newQualification.institution}
                  onChange={(e) => setNewQualification({ ...newQualification, institution: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Tribhuvan University"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  value={newQualification.year}
                  onChange={(e) => setNewQualification({ ...newQualification, year: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2018"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  value={newQualification.specialization}
                  onChange={(e) => setNewQualification({ ...newQualification, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Artificial Intelligence & Robotics"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="verified"
                  checked={newQualification.verified}
                  onChange={(e) => setNewQualification({ ...newQualification, verified: e.target.checked })}
                  className="mr-2 rounded"
                />
                <label htmlFor="verified" className="text-sm text-gray-700">Mark as verified</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddQualModal(false);
                  setEditingQualification(null);
                  setNewQualification({ degree: '', institution: '', year: '', specialization: '', verified: false });
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingQualification ? handleUpdateQualification : handleAddQualification}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingQualification ? 'Update' : 'Add'} Qualification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {/* Add Certificate Modal */}
      {showAddCertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCertification ? 'Edit Certificate' : 'Add New Certificate'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
                <input
                  type="text"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Advanced Robotics Workshop"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Institution</label>
                <input
                  type="text"
                  value={newCertification.institution}
                  onChange={(e) => setNewCertification({ ...newCertification, institution: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Tech Innovation Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                <input
                  type="date"
                  value={newCertification.completionDate}
                  onChange={(e) => setNewCertification({ ...newCertification, completionDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until (Optional)</label>
                <input
                  type="date"
                  value={newCertification.validUntil}
                  onChange={(e) => setNewCertification({ ...newCertification, validUntil: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddCertModal(false);
                  setEditingCertification(null);
                  setNewCertification({ name: '', institution: '', completionDate: '', validUntil: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingCertification ? handleUpdateCertification : handleAddCertification}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingCertification ? 'Update' : 'Add'} Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;