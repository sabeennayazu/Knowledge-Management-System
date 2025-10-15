"use client";

import { useState } from "react";
import { format, parseISO, differenceInDays } from "date-fns";
import { CheckCircle, Users, User } from "lucide-react";
import Notification from "../components/notification/page";

interface Project {
  title: string;
  status: "Ongoing" | "Completed";
  dueDate: string;
  description: string;
  requirements: string[];
  members?: string[];
}

const initialProjects: Project[] = [
  {
    title: "Line Following Robot",
    status: "Ongoing",
    dueDate: "2025-09-20",
    description:
      "Build a robot that can follow a black line using IR sensors. Focuses on embedded systems basics.",
    requirements: [
      "IR sensors integration",
      "Motor driver circuit",
      "Microcontroller programming",
    ],
    members: ["Sabin", "Rijan", "Dipen", "Sujal"],
  },
  {
    title: "Obstacle Avoiding Car",
    status: "Completed",
    dueDate: "2025-08-15",
    description:
      "Design a car that avoids obstacles using ultrasonic sensors. Teaches real-time decision making.",
    requirements: [
      "Ultrasonic sensor setup",
      "Chassis assembly",
      "Arduino coding",
    ],
    members: ["Sabin"],
  },
  {
    title: "Smart Street Light System",
    status: "Completed",
    dueDate: "2025-07-10",
    description:
      "Create a smart lighting system that automatically turns on at night and off during the day using LDR sensors.",
    requirements: [
      "LDR sensor integration",
      "Relay module wiring",
      "Efficient power management",
    ],
    members: ["Sabin", "Rijan"],
  },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"Ongoing" | "Completed">(
    "Ongoing"
  );
  const [expanded, setExpanded] = useState<number | null>(null);

  const filteredProjects = initialProjects.filter(
    (p) => p.status === activeTab
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Notification />
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Projects</h1>
      <p className="text-gray-700 mb-8">
        View your assigned and completed projects from your teacher.
      </p>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-8">
        {["Ongoing", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as "Ongoing" | "Completed");
              setExpanded(null);
            }}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 hover:cursor-pointer"
                : "text-gray-500 hover:text-gray-700 cursor-pointer"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-6 max-w-4xl">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => {
            const due = parseISO(project.dueDate);
            const today = new Date();
            const remaining = differenceInDays(due, today);

            const isGroup =
              project.members && project.members.length > 1 ? true : false;

            return (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition cursor-pointer"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {project.title}
                  </h2>
                  <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    Due: {format(due, "PPP")}
                  </span>
                </div>

                {/* Project type indicator */}
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  {isGroup ? (
                    <>
                      <Users className="w-4 h-4 mr-1" />
                      Group Project
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-1" />
                      Solo Project
                    </>
                  )}
                </div>

                {/* Timer or Completed Label */}
                {project.status === "Ongoing" ? (
                  <p className="text-sm text-blue-600 mt-1">
                    {remaining > 0
                      ? `${remaining} days remaining`
                      : remaining === 0
                      ? "Due today"
                      : `${Math.abs(remaining)} days overdue`}
                  </p>
                ) : (
                  <div className="flex items-center text-green-600 mt-1 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </div>
                )}

                {/* Expanded Info */}
                {expanded === idx && (
                  <div className="mt-5 border-t pt-4 text-gray-800 space-y-3">
                    <p>{project.description}</p>
                    <div>
                      <strong>Requirements:</strong>
                      <ul className="list-disc list-inside text-gray-700 mt-1">
                        {project.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    {project.members && project.members.length > 0 && (
                      <p>
                        <strong>Members:</strong>{" "}
                        {project.members.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 italic">
            No {activeTab.toLowerCase()} projects found.
          </p>
        )}
      </div>
    </div>
  );
}
