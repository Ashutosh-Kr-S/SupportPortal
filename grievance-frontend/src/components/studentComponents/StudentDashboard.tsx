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
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { NavItems } from "@/styles/constants";

const StudentDashboard = () => {
  useAuthRedirect();

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Get routes from constants
  const getRoute = (title: string) => {
    try {
      const item = NavItems.find((item) => item.title === title);
      return item ? item.href : "#";
    } catch (err) {
      console.error("Error finding route:", err);
      return "#";
    }
  };

  const [pendingGrievancenumber, setPendingGrievnacenumber] = useState(0);
  const [resolvedGrievancenumber, setResolvedGrievnacenumber] = useState(0);
  const [inProgressNumber, setInProgressNumber] = useState(0);
  const [totalGrievances, setTotalGrievances] = useState(0);

  // Set dummy data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setPendingGrievnacenumber(3);
        setResolvedGrievnacenumber(8);
        setInProgressNumber(2);
        setTotalGrievances(13);

        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard initialization error:", err);
      }
    };

    initializeData();
  }, []);

  // Mock data for demonstration
  const recentActivities = [
    {
      id: 1,
      type: "response",
      message: "Admin responded to your library complaint #GR2024012",
      time: "2 hours ago",
      status: "responded",
    },
    {
      id: 2,
      type: "status",
      message: "Grievance #GR2024008 status changed to In Progress",
      time: "1 day ago",
      status: "in-progress",
    },
    {
      id: 3,
      type: "resolved",
      message: "Hostel WiFi connectivity issue has been resolved #GR2024003",
      time: "3 days ago",
      status: "resolved",
    },
    {
      id: 4,
      type: "submitted",
      message: "New grievance submitted: Cafeteria food quality #GR2024015",
      time: "5 days ago",
      status: "submitted",
    },
    {
      id: 5,
      type: "response",
      message: "Maintenance team responded to AC repair request #GR2024007",
      time: "1 week ago",
      status: "responded",
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

  // Error component
  const ErrorDisplay = () => (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  // Handle error state
  if (error) return <ErrorDisplay />;

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
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm hover:border-blue-200 hover:shadow-md transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600 transition-all duration-500">
                  {totalGrievances}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500 transition-transform duration-300 hover:scale-110" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100 shadow-sm hover:border-orange-200 hover:shadow-md transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600 transition-all duration-500">
                  {pendingGrievancenumber}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500 transition-transform duration-300 hover:scale-110" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm hover:border-purple-200 hover:shadow-md transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-purple-600 transition-all duration-500">
                  {inProgressNumber}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500 transition-transform duration-300 hover:scale-110" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 shadow-sm hover:border-green-200 hover:shadow-md transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600 transition-all duration-500">
                  {resolvedGrievancenumber}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Action Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Lodge New Grievance */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all duration-300 h-full group">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Lodge New Grievance
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Submit a new complaint, suggestion, or feedback to improve
                  campus facilities and services
                </p>
                <Link
                  href={getRoute("Lodge Grievance")}
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                >
                  Lodge Grievance
                </Link>
              </div>

              {/* Track Grievance */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:border-green-200 hover:bg-white hover:shadow-lg transition-all duration-300 h-full group">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                    <Search className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Track Grievance
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Monitor the status and progress of your submitted grievances
                  with real-time updates
                </p>
                <Link
                  href={getRoute("Grievance History")}
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                >
                  View History
                </Link>
              </div>

              {/* Help & Guidelines */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-orange-100 hover:border-orange-200 hover:bg-white hover:shadow-lg transition-all duration-300 h-full group">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Help & Guidelines
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Access comprehensive guides, FAQs, and best practices for
                  effective grievance submission
                </p>
                <Link
  href="/help&guideline"
  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
>
  View Guidelines
</Link>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-red-100 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all duration-300 h-full group">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 rounded-lg mr-3 group-hover:bg-red-200 transition-colors">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Emergency Contact
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Get immediate assistance for urgent matters that require
                  immediate attention and resolution
                </p>
                <Link
                  href={getRoute("Dashboard")}
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                >
                  Contact Now
                </Link>
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
                  href={getRoute("Grievance History")}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentActivities?.slice(0, 4).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div
                      className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 transition-colors ${
                        activity.status === "resolved"
                          ? "bg-green-500"
                          : activity.status === "responded"
                          ? "bg-blue-500"
                          : activity.status === "in-progress"
                          ? "bg-purple-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {activity.message || "No message available"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-medium">
                        {activity.time || "Unknown time"}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No recent activities</p>
                  </div>
                )}
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
                {announcements?.length > 0 ? (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`p-3 rounded-lg border-l-4 transition-colors duration-200 ${
                        announcement.urgent
                          ? "bg-red-50 border-red-500 hover:bg-red-100"
                          : "bg-blue-50 border-blue-500 hover:bg-blue-100"
                      }`}
                    >
                      <h4 className="font-medium text-sm text-gray-800">
                        {announcement.title || "Untitled Announcement"}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {announcement.content || "No content available"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No announcements</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 text-indigo-600 mr-2" />
                Quick Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Be specific and detailed when describing your grievance
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Attach relevant documents or photos if applicable
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Check your email regularly for updates on your grievance
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Follow up if no response within 3-5 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Important Contacts */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                Important Contacts
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-600 font-medium">
                    Student Helpdesk
                  </span>
                  <a
                    href="tel:011-2659-1234"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    011-2659-1234
                  </a>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-600 font-medium">
                    Dean Student Affairs
                  </span>
                  <a
                    href="tel:011-2659-5678"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    011-2659-5678
                  </a>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-600 font-medium">
                    Campus Security
                  </span>
                  <a
                    href="tel:011-2659-9999"
                    className="text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    011-2659-9999
                  </a>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                  <span className="text-sm text-red-700 font-medium">
                    Emergency Hotline
                  </span>
                  <a
                    href="tel:108"
                    className="text-sm font-bold text-red-600 hover:text-red-700"
                  >
                    108
                  </a>
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
