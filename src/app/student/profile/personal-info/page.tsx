"use client";

import { User, Phone, Mail, Users, UserCheck, Heart } from "lucide-react";

export default function PersonalInfoPage() {
  const student = {
    name: "Sabin Nayaju",
    class: "10",
    section: "A",
    gender: "Male",
    phone: "+977 9800000000",
    email: "sabin@example.com",
    guardianName: "Nabin Nayaju",
    guardianPhone: "+977 9811111111",
    guardianRelation: "Father",
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}


        {/* Info Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Information Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-blue-500 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Student Info</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Gender */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Gender</p>
                  <p className="text-lg text-gray-900 font-semibold">{student.gender}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone</p>
                  <p className="text-lg text-gray-900 font-semibold">{student.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-lg text-gray-900 font-semibold">{student.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Information Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-green-500 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Guardian Info</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Guardian Name */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Name</p>
                  <p className="text-lg text-gray-900 font-semibold">{student.guardianName}</p>
                </div>
              </div>

              {/* Guardian Phone */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone</p>
                  <p className="text-lg text-gray-900 font-semibold">{student.guardianPhone}</p>
                </div>
              </div>

              {/* Guardian Relation */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Relation</p>
                  <p className="text-lg text-gray-900 font-semibold">{student.guardianRelation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="text-center px-6">
              <div className="text-3xl font-bold text-blue-600">10</div>
              <div className="text-gray-500 font-medium">Current Class</div>
            </div>
            <div className="text-center px-6">
              <div className="text-3xl font-bold text-emerald-600">A</div>
              <div className="text-gray-500 font-medium">Section</div>
            </div>
            <div className="text-center px-6">
              <div className="text-3xl font-bold text-purple-600">2024</div>
              <div className="text-gray-500 font-medium">Academic Year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}