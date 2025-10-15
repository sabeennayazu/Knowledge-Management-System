"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Upload, CheckCircle } from "lucide-react";
import Notification from "../components/notification/page";

interface Task {
  title: string;
  description: string;
  requirements: string[];
  dueDate: string;
  submitted: boolean;
  submissionLink?: string;
}

const initialTasks: Task[] = [
  {
    title: "Robotics Assignment 1",
    description: "Build a simple line-following robot using IR sensors.",
    requirements: [
      "Working prototype",
      "Circuit diagram",
      "Code documentation",
    ],
    dueDate: "2025-09-10",
    submitted: false,
  },
  {
    title: "Electronics Worksheet",
    description: "Solve the given circuit problems and upload as PDF.",
    requirements: ["All questions attempted", "Clear handwriting or typed"],
    dueDate: "2025-09-15",
    submitted: false,
  },
  {
    title: "Arduino Project Report",
    description: "Submit report on Arduino-based temperature sensor.",
    requirements: ["5 pages min.", "Include circuit + code"],
    dueDate: "2025-08-25",
    submitted: true,
    submissionLink: "https://example.com/my-report.pdf",
  },
];

export default function TasksPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<"Ongoing" | "Submitted">("Ongoing");
  const [submissionText, setSubmissionText] = useState("");

  const handleSubmit = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].submitted = true;
    updatedTasks[index].submissionLink = submissionText || "Submitted in system";
    setTasks(updatedTasks);
    setSubmissionText("");
    setExpanded(null);
  };

  const filteredTasks = tasks.filter((task) =>
    activeTab === "Ongoing" ? !task.submitted : task.submitted
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Notification />
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Tasks</h1>
      <p className="text-gray-700 mb-8">
        View and submit your assignments assigned by your teacher.
      </p>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-8">
        {["Ongoing", "Submitted"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as "Ongoing" | "Submitted");
              setExpanded(null);
            }}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 hover:cursor-pointer"
                : "text-gray-500 hover:text-gray-700 cursor-pointer"
            }`}
          >
            {tab} Tasks
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-6 max-w-4xl">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition cursor-pointer"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {task.title}
                </h2>
                <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Due: {format(parseISO(task.dueDate), "PPP")}
                </span>
              </div>

              {/* Status */}
              {task.submitted ? (
                <div className="flex items-center text-green-600 mt-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Submitted
                </div>
              ) : (
                <div className="flex items-center text-orange-600 mt-2 text-sm font-medium">
                  <Upload className="w-4 h-4 mr-1" />
                  Pending Submission
                </div>
              )}

              {/* Expanded Info */}
              {expanded === idx && (
                <div className="mt-5 border-t pt-4 text-gray-800 space-y-3">
                  <p>
                    <strong>Description:</strong> {task.description}
                  </p>
                  <div>
                    <strong>Requirements:</strong>
                    <ul className="list-disc list-inside text-gray-700 mt-1">
                      {task.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Submission Section (only if not submitted) */}
                  {!task.submitted ? (
                    <div className="mt-4">
                      <textarea
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Paste link to your assignment or notes..."
                        className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-blue-300"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubmit(idx);
                        }}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  ) : (
                    <p>
                      <strong>Submission Link:</strong>{" "}
                      <a
                        href={task.submissionLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        {task.submissionLink}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 italic">No tasks available.</p>
        )}
      </div>
    </div>
  );
}
