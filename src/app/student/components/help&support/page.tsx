"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Notification from "../notification/page";

export default function HelpSupportPage() {
  const [feedback, setFeedback] = useState("");

  return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          <Notification />

      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid grid-cols-4 gap-2">
          <TabsTrigger value="faq" className="hover:cursor-pointer">FAQ</TabsTrigger>
          <TabsTrigger value="guides" className="hover:cursor-pointer">Guides</TabsTrigger>
          <TabsTrigger value="contact" className="hover:cursor-pointer">Contact Support</TabsTrigger>
          <TabsTrigger value="feedback" className="hover:cursor-pointer">Feedback</TabsTrigger>
        </TabsList>

        {/* FAQ Section */}
        <TabsContent value="faq" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-black">
              <div>
                <p className="font-semibold">🔑 How do I reset my password?</p>
                <p className="text-sm text-gray-600">
                  Go to <b>Settings → Login & Security</b>, enter your old password and
                  set a new one. If you forget your password, use the recovery email or
                  phone option.
                </p>
              </div>
              <div>
                <p className="font-semibold">📅 How can I check my exam schedule?</p>
                <p className="text-sm text-gray-600">
                  Visit the <b>Exams</b> page. You can view upcoming and previous exams
                  along with a calendar that highlights important dates.
                </p>
              </div>
              <div>
                <p className="font-semibold">🤝 How do I track my projects?</p>
                <p className="text-sm text-gray-600">
                  Go to the <b>Projects</b> page. You’ll see assigned projects, their
                  progress, and details when you expand each project card.
                </p>
              </div>
              <div>
                <p className="font-semibold">🔔 How do I manage notifications?</p>
                <p className="text-sm text-gray-600">
                  Notifications can be customized in <b>Settings → Preferences</b>. You
                  can enable or disable email, SMS, and push notifications.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Section */}
        <TabsContent value="guides" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Guides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-black">
              <div>
                <p className="font-semibold">📖 Checking Results</p>
                <p className="text-sm text-gray-600">
                  Navigate to the <b>Exams</b> page → Select your exam → Your results
                  will be displayed with subject-wise details.
                </p>
              </div>
              <div>
                <p className="font-semibold">⚙️ Enabling Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">
                  In <b>Settings → Login & Security</b>, toggle on 2FA. An OTP will be
                  sent to your recovery email or phone for verification.
                </p>
              </div>
              <div>
                <p className="font-semibold">🎨 Customizing Dashboard</p>
                <p className="text-sm text-gray-600">
                  In <b>Settings → Preferences</b>, select your default dashboard view
                  (Exams, Projects, or Attendance) and set calendar options.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Support Section */}
        <TabsContent value="contact" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-black">
              <p className="text-sm text-gray-600">
                If you can’t find your answer, contact our support team:
              </p>
              <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
                <li>Email: <b>support@sms.edu</b></li>
                <li>Phone: <b>+977-9811111111</b></li>
                <li>Live Chat: Available Mon–Fri, 9:00 AM – 6:00 PM</li>
              </ul>

              <h3 className="font-semibold mt-4">Submit a Ticket</h3>
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Describe your issue..." />
              <Button className="bg-blue-500">Submit Ticket</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Section */}
        <TabsContent value="feedback" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-black">
              <p className="text-sm text-gray-600">
                Help us improve! Share your thoughts or suggestions below:
              </p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback..."
              />
              <Button className="bg-blue-500">Submit Feedback</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
