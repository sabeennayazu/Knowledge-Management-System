"use client";

import { useState } from "react";
import { BookOpen, Video, ChevronDown, ChevronUp, FileText } from "lucide-react";
import Notification from "../components/notification/page";

export default function LearningMaterialsPage() {
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const books = [
    {
      chapter: "Chapter 1: Introduction to Robotics",
      units: ["Unit 1: What is Robotics?", "Unit 2: Applications of Robotics"],
    },
    {
      chapter: "Chapter 2: Sensors",
      units: ["Unit 1: Types of Sensors", "Unit 2: Sensor Applications"],
    },
  ];

  const videos = [
    { title: "Basics of Arduino", duration: "10:23" },
    { title: "Motors & Actuators", duration: "15:12" },
    { title: "Sensor Integration", duration: "8:45" },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Notification />
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-light text-gray-900 mb-2"><strong>Learning Materials</strong></h1>
        <p className="text-gray-600">Find your reading and video materials by unit and chapter.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Books Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Books</h2>
          </div>

          <div className="space-y-4">
            {books.map((chapter, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50"
                  onClick={() => setOpenChapter(openChapter === index ? null : index)}
                >
                  {chapter.chapter}
                  {openChapter === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openChapter === index && (
                  <div className="px-6 pb-3 space-y-2">
                    {chapter.units.map((unit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-gray-500" />
                        {unit}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
          </div>

          <div className="grid gap-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border rounded-lg p-3 hover:shadow-md cursor-pointer transition"
              >
                <div className="w-20 h-14 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  ▶
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
