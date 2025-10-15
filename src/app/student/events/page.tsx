"use client";

import Link from "next/link";
import Notification from "../components/notification/page";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      title: "Robitics Championship",
      content:
        "Participate in this competition to win Rs 50,000. Showcase your coding, robotics, and AI skills. Teams of up to 4 members are allowed. Meals and workspace will be provided throughout the event.",
      date: "2025-09-12",
      venue: "Main Auditorium",
      organizer: "Tech Club",
    },
    {
      title: "AI Seminar & Workshop",
      content:
        "Join the AI Workshop to learn about deep learning, computer vision, and real-world applications of generative AI. Industry experts will conduct sessions and hands-on coding labs.",
      date: "2025-09-18",
      venue: "Lab 2, Block B",
      organizer: "CS Department",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div className="p-8 space-y-6">
        <Notification/>
      <h1 className="text-2xl font-bold text-black mb-6">School Events</h1>

      {events.map((event, index) => {
        const preview =
          event.content.length > 50
            ? event.content.slice(0, 50) + "..."
            : event.content;

        return (
          <Link
            key={index}
            href="/student/events/notice"
            className="block p-5 bg-white rounded-lg shadow-md border-l-4 border-indigo-500 cursor-pointer hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-black">{event.title}</h2>

            <p className="text-sm text-gray-700 mt-2">
              {preview}
              {event.content.length > 50 && (
                <span className="text-blue-600 font-medium"> see more</span>
              )}
            </p>
          </Link>
        );
      })}
    </div>
  </div>
  );
}
