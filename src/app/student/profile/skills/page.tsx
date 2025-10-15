"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Plus, Award, BookOpen, Clock } from "lucide-react";
import DialogBox from "../../components/dialog/page";

export default function SkillsPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<null | Skill>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>([
    {
      title: "Arduino Programming",
      institute: "ABC Institute",
      period: "Jan 2023 - Mar 2023",
      level: "Intermediate",
      description:
        "Learned microcontroller programming, sensor integration, and automation projects.",
    },
    {
      title: "Raspberry Pi",
      institute: "XYZ College",
      period: "Apr 2023 - Jun 2023",
      level: "Beginner",
      description:
        "Hands-on projects with Raspberry Pi, GPIO control, and Linux basics.",
    },
    {
      title: "IoT & Sensors",
      institute: "Tech Lab",
      period: "Jul 2023 - Sep 2023",
      level: "Advanced",
      description:
        "Implemented IoT solutions, real-time data collection, and cloud integration.",
    },
    {
      title: "Robotics (Motors & Actuators)",
      institute: "Robotics Academy",
      period: "Oct 2023 - Dec 2023",
      level: "Expert",
      description:
        "Designed and controlled robotic systems using motors, actuators, and sensors.",
    },
  ]);

  // Add/Edit Skill Form state
  const [formSkill, setFormSkill] = useState<Skill>({
    title: "",
    institute: "",
    period: "",
    level: "",
    description: "",
  });

  // Close menu when clicking outside
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  // Handle Add Skill Save
  function handleAddSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!formSkill.title) return;

    setSkills([...skills, formSkill]);
    setFormSkill({ title: "", institute: "", period: "", level: "", description: "" });
    setIsAddOpen(false);
  }

  // Handle Edit Skill Save
  function handleEditSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!editingSkill) return;

    setSkills(
      skills.map((s) => (s.title === editingSkill.title ? formSkill : s))
    );
    setEditingSkill(null);
    setFormSkill({ title: "", institute: "", period: "", level: "", description: "" });
    setIsEditOpen(false);
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-black">Skills & Expertise</h1>
        <div className="relative" ref={menuRef}>
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical className="w-5 h-5 text-black cursor-pointer" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border border-gray-200 z-10">
              <button
                onClick={() => {
                  setIsAddOpen(true);
                  setFormSkill({ title: "", institute: "", period: "", level: "", description: "" });
                  setOpenMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
              <button
                onClick={() => {
                  setIsEditOpen(true);
                  setOpenMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
              >
                <Award className="w-4 h-4" /> Edit Skills
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            onClick={() => setSelectedSkill(skill)}
            className="p-4 border rounded-xl bg-white shadow-sm 
                       hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 
                       transition duration-200 ease-in-out cursor-pointer"
          >
            <h3 className="font-medium text-gray-900">{skill.title}</h3>
          </div>
        ))}
      </div>

      {/* Skill Details Dialog */}
      <DialogBox
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill?.title || ""}
      >
        {selectedSkill && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
              <BookOpen className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Institute / College</h3>
                <p className="text-gray-800">{selectedSkill.institute}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
              <Clock className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Period</h3>
                <p className="text-gray-800">{selectedSkill.period}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg shadow-sm justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Level</h3>
                  <p className="text-gray-800">{selectedSkill.level}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                {selectedSkill.level}
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
              <BookOpen className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Details</h3>
                <p className="text-gray-800">{selectedSkill.description}</p>
              </div>
            </div>
          </div>
        )}
      </DialogBox>

      {/* Add Skill Dialog */}
      <DialogBox isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Skill">
        <form onSubmit={handleAddSkill} className="space-y-4">
          {renderForm(formSkill, setFormSkill)}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Skill
          </button>
        </form>
      </DialogBox>

      {/* Edit Skills Dialog */}
      <DialogBox isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Skills">
        {editingSkill ? (
          <form onSubmit={handleEditSkill} className="space-y-4">
            {renderForm(formSkill, setFormSkill)}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Update Skill
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-3 rounded-lg 
                           hover:bg-gray-50 hover:border-blue-200 transition duration-200 ease-in-out"
              >
                <span className="font-medium">{skill.title}</span>
                <button
                  onClick={() => {
                    setEditingSkill(skill);
                    setFormSkill(skill);
                  }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </DialogBox>
    </div>
  );
}

function renderForm(formSkill: Skill, setFormSkill: React.Dispatch<React.SetStateAction<Skill>>) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Title</label>
        <input
          type="text"
          placeholder="e.g. Python Development"
          value={formSkill.title}
          onChange={(e) => setFormSkill({ ...formSkill, title: e.target.value })}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
        <input
          type="text"
          placeholder="Institute Name"
          value={formSkill.institute}
          onChange={(e) => setFormSkill({ ...formSkill, institute: e.target.value })}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
        <input
          type="text"
          placeholder="e.g. Jan 2024 - Apr 2024"
          value={formSkill.period}
          onChange={(e) => setFormSkill({ ...formSkill, period: e.target.value })}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
        <input
          type="text"
          placeholder="Beginner / Intermediate / Expert"
          value={formSkill.level}
          onChange={(e) => setFormSkill({ ...formSkill, level: e.target.value })}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="What did you learn?"
          value={formSkill.description}
          onChange={(e) => setFormSkill({ ...formSkill, description: e.target.value })}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </>
  );
}

interface Skill {
  title: string;
  institute: string;
  period: string;
  level: string;
  description: string;
}
