"use client";
import React from "react";

const personalInfo = {
  fullName: "John Doe",
  contact: "+977-9800000000",
  gender: "Male",
  dob: "2005-04-12",
  address: "Kathmandu, Nepal",
  photo: "https://i.pravatar.cc/200?img=12", // Placeholder photo
};

const academicInfo = {
  school: "ABC International School",
  class: "10",
  section: "B",
  rollNo: "23",
  schoolAddress: "Baneshwor, Kathmandu",
};

const guardianInfo = {
  guardianName: "Michael Doe",
  contact: "+977-9811111111",
  relation: "Father",
  occupation: "Engineer",
};

const otherInfo = {
  bloodGroup: "O+",
  hobbies: "Reading, Football, Painting",
  nationality: "Nepali",
  languages: "English, Nepali, Hindi",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-100">
      <main className="flex-1 p-8 flex flex-col gap-8 relative">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Student Profile</h1>

        {/* First Row: Personal Info + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Personal Information
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-36">
              <ul className="space-y-3 text-blue-800">
                <li>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {personalInfo.fullName}
                </li>
                <li>
                  <span className="font-semibold">Contact:</span>{" "}
                  {personalInfo.contact}
                </li>
                <li>
                  <span className="font-semibold">Gender:</span>{" "}
                  {personalInfo.gender}
                </li>
                <li>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {personalInfo.dob}
                </li>
                <li>
                  <span className="font-semibold">Address:</span>{" "}
                  {personalInfo.address}
                </li>
              </ul>


              <img
                src={personalInfo.photo}
                alt="Student Photo"
                className="w-40 h-40 rounded-full border-4 border-blue-200 shadow-lg object-cover"
              />
            </div>
          </div>

          {/* other information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Other Information
            </h3>
            <ul className="space-y-3 text-blue-800">
            <li>
              <span className="font-semibold">Blood Group:</span>{" "}
              {otherInfo.bloodGroup}
            </li>
            <li>
              <span className="font-semibold">Hobbies:</span>{" "}
              {otherInfo.hobbies}
            </li>
            <li>
              <span className="font-semibold">Nationality:</span>{" "}
              {otherInfo.nationality}
            </li>
            <li>
              <span className="font-semibold">Languages:</span>{" "}
              {otherInfo.languages}
            </li>
          </ul>
          </div>
          {/* Student Photo */}
          <div className="flex justify-center md:justify-start">

          </div>
        </div>

        {/* Second Row: Academic + Guardian */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Academic Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Academic Information
            </h3>
            <ul className="space-y-3 text-blue-800">
              <li>
                <span className="font-semibold">School:</span>{" "}
                {academicInfo.school}
              </li>
              <li>
                <span className="font-semibold">Class:</span>{" "}
                {academicInfo.class}
              </li>
              <li>
                <span className="font-semibold">Section:</span>{" "}
                {academicInfo.section}
              </li>
              <li>
                <span className="font-semibold">Roll No:</span>{" "}
                {academicInfo.rollNo}
              </li>
              <li>
                <span className="font-semibold">School Address:</span>{" "}
                {academicInfo.schoolAddress}
              </li>
            </ul>
          </div>

          {/* Guardian Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Guardian Information
            </h3>
            <ul className="space-y-3 text-blue-800">
              <li>
                <span className="font-semibold">Guardian Name:</span>{" "}
                {guardianInfo.guardianName}
              </li>
              <li>
                <span className="font-semibold">Contact:</span>{" "}
                {guardianInfo.contact}
              </li>
              <li>
                <span className="font-semibold">Relation:</span>{" "}
                {guardianInfo.relation}
              </li>
              <li>
                <span className="font-semibold">Occupation:</span>{" "}
                {guardianInfo.occupation}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
