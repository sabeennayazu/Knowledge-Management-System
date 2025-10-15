"use client";
import Notification from "../../components/notification/page";
export default function RoboticsNoticePage() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Notification />
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-sm border">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-black underline mb-6">
        NOTICE
      </h1>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center text-gray-900 mb-8">
        National Robotics Championship 2025
      </h2>

      {/* Body */}
      <div className="space-y-4 text-gray-800 leading-relaxed">
        <p>
          This is to notify all students that the{" "}
          <span className="font-semibold">National Robotics Championship 2025</span>{" "}
          will be held on <span className="font-semibold">October 3–5, 2025</span>{" "}
          at the <span className="font-semibold">Engineering Block, Robotics Lab & Arena</span>.
        </p>

        <p>
          The championship aims to encourage innovation, technical skills, and
          teamwork in the field of robotics. Teams of up to 5 members are allowed
          to participate. The competition will include both autonomous and manual
          robotics challenges. Projects will be evaluated by industry experts and
          faculty members.
        </p>

        <p>
          Interested participants are requested to register with the{" "}
          <span className="font-semibold">Robotics Club</span> on or before{" "}
          <span className="font-semibold">September 20, 2025</span>.
        </p>
      </div>

      {/* Prize Pool */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-black underline mb-2">Prize Pool</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>Winner: Rs 50,000</li>
          <li>1st Runner Up: Rs 25,000</li>
          <li>2nd Runner Up: Rs 15,000</li>
        </ul>
      </div>

      {/* Organizer */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-black underline mb-2">Organizer</h3>
        <p className="text-gray-800">
          Robotics Club in collaboration with the Department of Computer Science
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10 text-right text-gray-800">
        <p>__________________________</p>
        <p className="font-semibold">Event Coordinator</p>
        <p>Robotics Club</p>
      </div>
    </div>
    </div>
  );
}
