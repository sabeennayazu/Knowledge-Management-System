"use client";

import { useState } from "react";
import { format, parseISO, compareAsc } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import Notification from "../components/notification/page";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Result {
  subject: string;
  status: "Passed" | "Failed";
  examDate: string;
  score: number;
  total: number;
  remarks: string;
}

const initialResults: Result[] = [
  {
    subject: "Robotics Fundamentals",
    status: "Passed",
    examDate: "2025-08-15",
    score: 85,
    total: 100,
    remarks: "Good grasp of basics, especially sensors and circuits.",
  },
  {
    subject: "Electronics Basics",
    status: "Failed",
    examDate: "2025-07-20",
    score: 38,
    total: 100,
    remarks: "Needs improvement in circuit analysis.",
  },
  {
    subject: "Advanced Robotics",
    status: "Passed",
    examDate: "2025-06-10",
    score: 72,
    total: 100,
    remarks: "Good problem-solving but programming part needs refinement.",
  },
];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<"Latest" | "All">("Latest");
  const [expanded, setExpanded] = useState<number | null>(null);

  const latestResults = initialResults.slice(0, 2); // latest 2 results

  // Sort by date so oldest is left, latest is right
  const sortedResults = [...initialResults].sort((a, b) =>
    compareAsc(parseISO(a.examDate), parseISO(b.examDate))
  );

 // Map data for graph
const resultsData = sortedResults.map((res) => ({
  subject: res.subject,       // for x-axis
  score: res.score,
  examDate: format(parseISO(res.examDate), "MMM d, yyyy"), // tooltip
}));

  const filteredResults =
    activeTab === "Latest" ? latestResults : initialResults;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Notification />
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Results</h1>
      <p className="text-gray-700 mb-8">
        View your online exam results and performance feedback.
      </p>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-8">
        {["Latest", "All"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as "Latest" | "All");
              setExpanded(null);
            }}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 hover:cursor-pointer"
                : "text-gray-500 hover:text-gray-700 cursor-pointer"
            }`}
          >
            {tab} Results
          </button>
        ))}
      </div>

      {/* Results Cards */}
      <div className="space-y-6 max-w-4xl">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, idx) => {
            const examDate = parseISO(result.examDate);
            const percentage = ((result.score / result.total) * 100).toFixed(1);

            return (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition cursor-pointer"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {result.subject}
                  </h2>
                  <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {format(examDate, "PPP")}
                  </span>
                </div>

                {/* Status */}
                {result.status === "Passed" ? (
                  <div className="flex items-center text-green-600 mt-2 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Passed ({percentage}%)
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 mt-2 text-sm font-medium">
                    <XCircle className="w-4 h-4 mr-1" />
                    Failed ({percentage}%)
                  </div>
                )}

                {/* Expanded Info */}
                {expanded === idx && (
                  <div className="mt-5 border-t pt-4 text-gray-800 space-y-3">
                    <p>
                      <strong>Score:</strong> {result.score}/{result.total}
                    </p>
                    <p>
                      <strong>Remarks:</strong> {result.remarks}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 italic">No results available.</p>
        )}
      </div>

      {/* Line Graph - Only for All Results */}
      {activeTab === "All" && (
        <div className="mt-12 max-w-4xl bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Graph
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={resultsData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="subject" />   {/* <-- Use subject instead of date */}
  <YAxis domain={[0, 100]} />
  <Tooltip
    formatter={(value) => [`${value} marks`, "Score"]}
    labelFormatter={(label, payload) => {
      const d = payload?.[0]?.payload;
      return `${d.subject} | ${d.examDate}`;
    }}
  />
  <Line
    type="monotone"
    dataKey="score"
    stroke="#2563eb"
    strokeWidth={2}
    dot={{ r: 5 }}
  />
</LineChart>

          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
