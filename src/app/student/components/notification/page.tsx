"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Trophy, Bot, Brain, MoreVertical } from "lucide-react";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      title: "Hackathon Championship",
      content: "Participate to win Rs 40,000. Showcase your coding skills...",
      date: "Sept 12, 2025",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      read: false,
    },
    {
      title: "Robotics Workshop",
      content: "Hands-on robotics training with experts. Limited seats...",
      date: "Sept 20, 2025",
      icon: <Bot className="w-5 h-5 text-green-600" />,
      read: false,
    },
    {
      title: "AI Seminar",
      content: "Join the AI Seminar on deep learning & generative AI...",
      date: "Sept 25, 2025",
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      read: false,
    },
  ]);

  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRead = (index: number) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, read: !n.read } : n))
    );
    setMenuOpen(null);
  };

  const deleteNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
    setMenuOpen(null);
  };

  return (
    <div className="fixed top-2 right-6 z-50" ref={dropdownRef}>
      {/* 🔔 Notification Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl cursor-pointer"
      >
        <Bell className="h-6 w-6 text-blue-600" />

        {/* Badge */}
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full shadow">
            {notifications.length}
          </span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-9 right-6 mt-3 w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" /> Notifications
              </h3>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto relative">
              {notifications.map((n, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 border-b relative"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">{n.icon}</div>

                  {/* Text */}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        n.read ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {n.title}
                    </p>
                    <p
                      className={`text-xs ${
                        n.read ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {n.content.length > 50
                        ? n.content.slice(0, 50) + "..."
                        : n.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                  </div>

                  {/* Triple Dot Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === idx ? null : idx)
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </button>

                    {/* Dropdown menu */}
                    {menuOpen === idx && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg text-sm z-50">
                        <button
                          onClick={() => toggleRead(idx)}
                          className="block w-full text-left px-3 py-2 cursor-pointer hover:bg-gray-100 text-black"
                        >
                          {n.read ? "Mark as Unread" : "Mark as Read"}
                        </button>
                        <button
                          onClick={() => deleteNotification(idx)}
                          className="block w-full text-left px-3 py-2 cursor-pointer hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 text-center bg-gray-50">
              <button
                onClick={() => router.push("/student/notifications")}
                className="text-xs font-medium cursor-pointer text-blue-600 hover:underline"
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
