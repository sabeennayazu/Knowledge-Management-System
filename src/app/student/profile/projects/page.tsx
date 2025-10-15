"use client";
import { useState, useEffect, useRef } from "react";
import {
  MoreVertical,
  FolderOpen,
  Clock,
  CheckCircle,
  Circle,
  Plus,
  Calendar,
  User,
  Code,
  Users,
  Wrench,
  FileText,
  Trash2,
  Edit,
} from "lucide-react";
import DialogBox from "../../components/dialog/page";

export default function ProjectsPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New state for add/manage
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const [projects, setProjects] = useState<any[]>([
    {
      title: "Traffic Lights",
      status: "Completed",
      description:
        "Arduino-based traffic light control system with automated timing sequences and pedestrian crossing functionality. This project demonstrates embedded programming concepts and real-world traffic management principles.",
      dueDate: "2025-07-15",
      team: ["John", "Alice"],
      tools: ["Arduino UNO", "LEDs", "Resistors", "Breadboard", "Jumper wires"],
      language: "C/C++ (Arduino IDE)",
      shortDescription: "Control traffic lights automatically using Arduino.",
    },
    {
      title: "Line Following Robot",
      status: "In Progress",
      description:
        "Autonomous robot using sensors and motors with advanced path detection algorithms. Features obstacle avoidance and speed control based on line curvature.",
      dueDate: "2025-09-30",
      team: ["John", "Bob", "Carol"],
      tools: ["Arduino UNO", "IR Sensors", "Motors", "Chassis"],
      language: "C/C++ (Arduino IDE)",
      shortDescription: "Robot that follows a line using sensor feedback.",
    },
    {
      title: "Decibel Meter",
      status: "Pending",
      description:
        "Sound level measurement device with real-time monitoring and data logging capabilities. Includes calibration features and noise pollution analysis.",
      dueDate: "2025-10-15",
      team: ["John"],
      tools: ["Microphone sensor", "Arduino", "LCD Display"],
      language: "C/C++ (Arduino IDE)",
      shortDescription: "Measures ambient sound levels and displays them.",
    },
    {
      title: "Smart Home Automation",
      status: "Pending",
      description:
        "IoT-based home control system with mobile app integration, voice control, and energy monitoring. Features include security alerts and automated scheduling.",
      dueDate: "2025-11-30",
      team: ["John", "David"],
      tools: ["Raspberry Pi", "Relay Modules", "Sensors", "WiFi Module"],
      language: "Python",
      shortDescription: "Control home appliances remotely using IoT devices.",
    },
  ]);

  // Form state
  const emptyForm = {
    title: "",
    status: "Planned",
    description: "",
    dueDate: "",
    team: [] as string[],
    tools: [] as string[],
    language: "",
    shortDescription: "",
  };
  const [formProject, setFormProject] = useState<any>(emptyForm);

  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Planned":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  // Add Project
  function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    if (!formProject.title) return;
    setProjects([...projects, formProject]);
    setFormProject(emptyForm);
    setIsAddOpen(false);
  }

  // Edit Project
  function handleEditProject(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProject) return;
    setProjects(
      projects.map((p) =>
        p.title === editingProject.title ? formProject : p
      )
    );
    setEditingProject(null);
    setFormProject(emptyForm);
    setIsManageOpen(false);
  }

  // Delete Project
  function handleDeleteProject(title: string) {
    setProjects(projects.filter((p) => p.title !== title));
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Projects Portfolio
          </h1>
          <p className="text-gray-600">
            Manage and track your academic and personal projects
          </p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            className="p-3 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical className="w-5 h-5 text-black" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <button
                onClick={() => {
                  setIsAddOpen(true);
                  setFormProject(emptyForm);
                  setOpenMenu(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
              <button
                onClick={() => {
                  setIsManageOpen(true);
                  setOpenMenu(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                <FolderOpen className="w-4 h-4" />
                Manage Projects
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl border border-gray-300 shadow-md hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 
                       transition duration-200 ease-in-out bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {project.shortDescription}
                </p>
              </div>
              <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  project.status
                )}`}
              >
                {getStatusIcon(project.status)}
                {project.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {project.dueDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {project.team.length} member
                {project.team.length > 1 ? "s" : ""}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 ">
              <button
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium flex items-center gap-2 cursor-pointer"
                onClick={() => handleViewDetails(project)}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Project Details Dialog */}
      <DialogBox
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={selectedProject?.title || "Project Details"}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex justify-between items-start">
              <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  selectedProject.status
                )}`}
              >
                {getStatusIcon(selectedProject.status)}
                {selectedProject.status}
              </span>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {selectedProject.dueDate}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-gray-800">Description</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Tools/Items */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  Tools & Components
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((tool: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Programming Language */}
            {selectedProject.language && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Programming Language
                  </span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {selectedProject.language}
                </span>
              </div>
            )}

            {/* Team Members */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-800">Team Members</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.team.map((member: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogBox>

      {/* Add Project Dialog */}
      <DialogBox
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="New Project"
      >
        <form onSubmit={handleAddProject} className="space-y-4">
          {renderForm(formProject, setFormProject)}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Project
          </button>
        </form>
      </DialogBox>

      {/* Manage Projects Dialog */}
      <DialogBox
        isOpen={isManageOpen}
        onClose={() => {
          setIsManageOpen(false);
          setEditingProject(null);
        }}
        title="Manage Projects"
      >
        {editingProject ? (
          <form onSubmit={handleEditProject} className="space-y-4">
            {renderForm(formProject, setFormProject)}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update Project
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <span className="font-medium">{proj.title}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setFormProject(proj);
                    }}
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.title)}
                    className="text-red-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogBox>
    </div>
  );
}

function renderForm(formProject: any, setFormProject: any) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formProject.title}
          placeholder="Project Title"
          onChange={(e) =>
            setFormProject({ ...formProject, title: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short Description
        </label>
        <input
          type="text"
          value={formProject.shortDescription}
          placeholder="Brief summary"
          onChange={(e) =>
            setFormProject({ ...formProject, shortDescription: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formProject.status}
          onChange={(e) =>
            setFormProject({ ...formProject, status: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        >
          <option>Planned</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={formProject.dueDate}
          onChange={(e) =>
            setFormProject({ ...formProject, dueDate: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Team Members (comma separated)
        </label>
        <input
          type="text"
          value={formProject.team?.join(", ")}
          placeholder="John, Alice"
          onChange={(e) =>
            setFormProject({
              ...formProject,
              team: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tools (comma separated)
        </label>
        <input
          type="text"
          value={formProject.tools?.join(", ")}
          placeholder="Arduino, Sensors"
          onChange={(e) =>
            setFormProject({
              ...formProject,
              tools: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Programming Language
        </label>
        <input
          type="text"
          value={formProject.language}
          placeholder="C/C++, Python..."
          onChange={(e) =>
            setFormProject({ ...formProject, language: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formProject.description}
          placeholder="Detailed project description..."
          onChange={(e) =>
            setFormProject({ ...formProject, description: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>
    </>
  );
}
