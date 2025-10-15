"use client";

import { useState } from "react";
import Notification from "../notification/page";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [language, setLanguage] = useState("English");
  const [activeTab, setActiveTab] = useState<"account" | "preferences">("account");

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Notification />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex w-full space-x-6 justify-left border-b mb-6">
          {["account", "preferences"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "account" | "preferences")}
              className={`pb-3 px-2 font-medium transition ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600 hover:cursor-pointer"
                  : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              }`}
            >
              {tab === "account" ? "Login & Security" : "Preferences"}
            </button>
          ))}
        </div>

        {/* Login & Security */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Password Management</h2>
              <div className="space-y-3">
                <h3 className="font-medium">Change Password</h3>
                <input type="password" placeholder="Enter Old Password" className="w-full border rounded-lg px-3 py-2" />
                <input type="password" placeholder="New Password" className="w-full border rounded-lg px-3 py-2" />
                <input type="password" placeholder="Confirm New Password" className="w-full border rounded-lg px-3 py-2" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Password</button>

                <h3 className="font-medium mt-6">Recover Password</h3>
                <p className="text-sm text-gray-600">
                  If you forget your password, you can recover it using your registered email or phone number.
                </p>
                <input type="email" placeholder="Recovery Email" defaultValue="sabin@example.com" className="w-full border rounded-lg px-3 py-2" />
                <input type="tel" placeholder="Recovery Phone Number" defaultValue="+977 9800000000" className="w-full border rounded-lg px-3 py-2" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send Recovery Link / OTP</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
              <div className="flex items-center justify-between mb-3">
                <span>Enable 2FA</span>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Two-factor authentication (2FA) adds an extra layer of security to your account. After entering your
                password, you will also need to enter a code sent to your recovery email or phone number.
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send OTP to Recovery Contact</button>
            </div>
          </div>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
              <h2 className="text-lg font-semibold">Dark Mode</h2>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="w-5 h-5 accent-blue-500"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">Language</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-48 border rounded-lg px-3 py-2"
              >
                <option value="English">English</option>
                <option value="Nepali">Nepali</option>
              </select>
            </div>

            <div className="bg-white p-6 rounded-xl shadow space-y-3">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <div className="flex items-center justify-between">
                <span>Email Alerts (exams, projects, results)</span>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Alerts (important announcements)</span>
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={(e) => setSmsNotif(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>In-app Push Notifications</span>
                <input
                  type="checkbox"
                  checked={pushNotif}
                  onChange={(e) => setPushNotif(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">Dashboard Customization</h2>
              <select className="w-64 border rounded-lg px-3 py-2">
                <option value="exams">Exams</option>
                <option value="projects">Projects</option>
                <option value="attendance">Attendance</option>
              </select>
            </div>

            <div className="bg-white p-6 rounded-xl shadow space-y-3">
              <h2 className="text-lg font-semibold">Calendar Preferences</h2>
              <div className="flex items-center justify-between">
                <span>Show Holidays</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Show Exam Schedules</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Enable Reminders</span>
                <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
