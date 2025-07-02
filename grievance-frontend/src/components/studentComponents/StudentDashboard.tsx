"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  TrendingUp,
  MessageSquare,
  Calendar,
  Phone,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const StudentDashboard = () => {
  useAuthRedirect();
  
  const [pendingGrievancenumber, setPendingGrievnacenumber] = useState(0);
  const [resolvedGrievancenumber, setResolvedGrievnacenumber] = useState(0);
  const [inProgressNumber, setInProgressNumber] = useState(0);
  const [totalGrievances, setTotalGrievances] = useState(0);

  // Mock data for demonstration
  const recentActivities = [
    {
      id: 1,
      type: "response",
      message: "Admin responded to your library complaint",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "status",
      message: "Grievance #GR2024001 status changed to In Progress",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "resolved",
      message: "Hostel WiFi issue has been resolved",
      time: "3 days ago",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "System Maintenance",
      content: "Portal will be down on Sunday 2-4 PM",
      urgent: true,
    },
    {
      id: 2,
      title: "New Guidelines",
      content: "Updated grievance submission guidelines available",
      urgent: false,
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your grievances and track their progress
          </p>
        </div>{" "}
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalGrievances}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">
                  {pendingGrievancenumber}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {inProgressNumber}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 shadow-sm hover:border-green-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {resolvedGrievancenumber}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Action Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Lodge New Grievance */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 hover:border-blue-200 hover:bg-white transition-all duration-200 h-full">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Lodge New Grievance
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Submit a new complaint or suggestion
                </p>
                <Link
                  href="/grievance/lodge"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
                >
                  Lodge Grievance
                </Link>
              </div>{" "}
              {/* Track Grievance */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:border-green-200 hover:bg-white transition-all duration-200 h-full">
                <div className="flex items-center mb-4">
                  <Search className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Track Grievance
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Check status of your submissions
                </p>
                <Link
                  href="/grievance/history"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-sm font-medium"
                >
                  View History
                </Link>
              </div>{" "}
              {/* Help & Guidelines */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-orange-100 hover:border-orange-200 hover:bg-white transition-all duration-200 h-full">
                <div className="flex items-center mb-4">
                  <HelpCircle className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Help & Guidelines
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn how to use the portal effectively
                </p>
                <button className="inline-flex items-center justify-center w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 text-sm font-medium">
                  View Guidelines
                </button>
              </div>{" "}
              {/* Emergency Contact */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-red-100 hover:border-red-200 hover:bg-white transition-all duration-200 h-full">
                <div className="flex items-center mb-4">
                  <Phone className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Emergency Contact
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  For urgent matters requiring immediate attention
                </p>
                <button className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium">
                  Contact Now
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                  Recent Activity
                </h3>
                <Link
                  href="/grievance/history"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                Announcements
              </h3>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      announcement.urgent
                        ? "bg-red-50 border-red-500"
                        : "bg-blue-50 border-blue-500"
                    }`}
                  >
                    <h4 className="font-medium text-sm text-gray-800">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {announcement.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                This Month
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submitted</span>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resolved</span>
                  <span className="font-semibold text-green-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Avg. Response Time
                  </span>
                  <span className="font-semibold text-purple-600">
                    2.3 days
                  </span>
                </div>
              </div>
            </div>

            {/* Important Contacts */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                Important Contacts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Student Helpdesk
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    011-XXXX-XXXX
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Dean Student Affairs
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    011-YYYY-YYYY
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Emergency</span>
                  <span className="text-sm font-medium text-red-600">
                    011-ZZZZ-ZZZZ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;