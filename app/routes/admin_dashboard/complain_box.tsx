import React, { useState } from "react";

export default function ComplainBoxPage() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (complaint.trim()) {
      setSubmitted(true);
      setComplaint("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleCancel = () => {
    setComplaint("");
  };

  return (
    <div className="p-8 bg-[#fdfbf0] min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Dashboard/ <span className="font-medium">Submit a Complaint</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Submit a Complaint</h1>
          <p className="text-gray-600 text-sm">
            Please provide details about your issue below. We will review your submission and get back to you shortly
          </p>
        </div>

        {/* Complaint Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[#e8e4d8]">
          {/* Form Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Describe your Complaint in Detail</h2>
          </div>

          {/* Textarea */}
          <div className="mb-6">
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Please provide as much detail as possible..."
              className="w-full h-64 p-4 border-2 border-[#e8e4d8] rounded-xl focus:outline-none focus:border-[#3A7D7D] resize-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-[#3A7D7D] text-white font-medium hover:bg-[#2f5f5f] transition-colors"
            >
              Submit
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="text-green-700 font-medium">✓ Complaint submitted successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
