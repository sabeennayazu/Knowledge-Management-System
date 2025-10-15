"use client";

import { useState, useEffect, useRef } from "react";
import { MoreVertical, Calendar, Plus, Upload, X } from "lucide-react";
import DialogBox from "../../components/dialog/page";

export default function FeedbackPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const feedbacks = [
    { 
      name: "ram bahadur", 
      role: "IOT Professor",
      comment: "Excellent work on your Arduino project! Your understanding of circuit design and programming logic is impressive. Keep up the great work and consider exploring more advanced sensor integration.",
      date: "2025-08-22",
      subject: "Physics IOT",
      avatar: "RB"
    },
    { 
      name: "Mentor Jane", 
      role: "Robotics tutor",
      comment: "Focus more on component optimization and state management. I'd recommend practicing with more complex projects to strengthen your foundation.",
      date: "2025-08-18",
      subject: "Computer Science",
      avatar: "MJ"
    },
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDialog(false);
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 4000);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-sm relative">
      {/* Alert Banner */}
      {requestSent && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-xl w-full bg-green-100 border border-green-400 text-green-800 px-5 py-3 rounded-xl shadow-md flex items-center justify-between z-50">
          <span>✅ Request Sent Successfully</span>
          <button onClick={() => setRequestSent(false)}>
            <X className="w-5 h-5 text-green-700 hover:text-green-900" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black mb-2">Instructor Feedback</h1>
          <p className="text-gray-600">Feedback and comments from your instructors</p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            className="p-3 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical className="w-5 h-5 text-blue-800" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <button
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                onClick={() => {
                  setOpenDialog(true);
                  setOpenMenu(false);
                }}
              >
                <Plus className="w-4 h-4 text-blue-600" />
                Request Feedback
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-6">
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl border border-gray-200 shadow-md hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 
                       transition duration-200 ease-in-out bg-white"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-400  flex items-center justify-center text-white font-bold text-sm">
                {feedback.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                    
                    {/* Role Badge */}
                    <span className="inline-block mt-1 mb-1 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      {feedback.role}
                    </span>

                    <p className="  mt-1 mb-1 px-2 py-1 w-fit text-xs border border-yellow-400 text-yellow-600 bg-yellow-100 rounded-full font-medium">{feedback.subject}</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{feedback.comment}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {new Date(feedback.date).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "short", 
                      day: "numeric" 
                    })}
                  </div>
                  <button className="text-sm text-blue-600 cursor-pointer hover:text-indigo-700 transition-colors duration-200 font-medium">
                    Reply →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request Feedback Dialog using DialogBox */}
      <DialogBox
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Request Feedback"
      >
        <form className="space-y-6" onSubmit={handleRequestSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Query <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              placeholder="Write your request or question here..."
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>

          {/* New Media Upload UI */}
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50 transition cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">
              Drag & Drop media here or{" "}
              <span className="text-blue-600 font-medium cursor-pointer">browse</span>
            </p>
            <input type="file" className="hidden" />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg cursor-pointer bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Send Request
            </button>
          </div>
        </form>
      </DialogBox>
    </div>
  );
}
