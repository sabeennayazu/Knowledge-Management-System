import { BookOpen, Building, CheckCircle, ChevronRight, Clock, MapPin, School, Star, Target, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

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




const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700';
    case 'inactive': return 'bg-red-100 text-red-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const renderOverviewTab = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);


  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
    setShowSchoolModal(true);
  };
  return (
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
  )
}
export default renderOverviewTab;