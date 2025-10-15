"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message:
        "Your Robotics Fundamentals exam is scheduled for Sept 10, 2025 at 10:00 AM.",
      date: "2025-09-01",
      read: false,
    },
    {
      id: 2,
      message:
        "Group Robotics Project deadline is extended to Sept 15, 2025.",
      date: "2025-08-31",
      read: false,
    },
    {
      id: 3,
      message: "Your Electronics midterm result has been published.",
      date: "2025-08-28",
      read: true,
    },
    {
      id: 4,
      message:
        "School will remain closed on Sept 5, 2025 due to a public holiday.",
      date: "2025-08-27",
      read: false,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          {notifications.length > 0 && (
            <Button
              onClick={clearAll}
              className="bg-red-500 hover:bg-red-600 text-white"
              size="sm"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No new notifications.</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`w-full bg-white rounded-xl shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between transition ${
                  notification.read ? "opacity-70" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>

                {!notification.read && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 sm:mt-0 text-blue-600 border-blue-300 hover:bg-blue-50"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
