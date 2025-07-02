"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Eye,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CreateAdmins from "@/components/adminComponents/CreateAdmins";
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const AdminDashboard = () => {

  useAuthRedirect();
  
  const [newGrievances, setNewGrievances] = useState(12);
  const [pendingGrievances, setPendingGrievances] = useState(8);
  const [resolvedGrievances, setResolvedGrievances] = useState(45);
  const [rejectedGrievances, setRejectedGrievances] = useState(3);
  const [totalStudents, setTotalStudents] = useState(1247);
  const [responseTime, setResponseTime] = useState("2.3 hrs");
  const { user, userType } = useAuth();
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);

  // Helper to check if current admin is superadmin
  const isSuperAdmin =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) =>
        r.toLowerCase() === "super_admin" ||
        r.toLowerCase() === "superadmin"
    );

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      action: "New grievance submitted",
      student: "John Doe",
      time: "5 min ago",
      type: "new",
    },
    {
      id: 2,
      action: "Grievance resolved",
      student: "Jane Smith",
      time: "15 min ago",
      type: "resolved",
    },
    {
      id: 3,
      action: "Response sent",
      student: "Mike Johnson",
      time: "1 hr ago",
      type: "pending",
    },
    {
      id: 4,
      action: "Grievance rejected",
      student: "Sarah Wilson",
      time: "2 hrs ago",
      type: "rejected",
    },
  ];

  const stats = [
    {
      title: "New Grievances",
      value: newGrievances,
      change: "+12%",
      icon: FileText,
      color: "blue",
      href: "/admin/grievance/new",
      description: "Awaiting review",
      bgGradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Pending Grievances",
      value: pendingGrievances,
      change: "-5%",
      icon: Clock,
      color: "orange",
      href: "/admin/grievance/pending",
      description: "In progress",
      bgGradient: "from-orange-500 to-amber-500",
      hoverGradient: "from-orange-600 to-amber-600",
    },
    {
      title: "Resolved Grievances",
      value: resolvedGrievances,
      change: "+23%",
      icon: CheckCircle,
      color: "green",
      href: "/admin/grievance/resolved",
      description: "Successfully completed",
      bgGradient: "from-green-500 to-emerald-500",
      hoverGradient: "from-green-600 to-emerald-600",
    },
    {
      title: "Rejected Grievances",
      value: rejectedGrievances,
      change: "0%",
      icon: XCircle,
      color: "red",
      href: "/admin/grievance/rejected",
      description: "Invalid submissions",
      bgGradient: "from-red-500 to-rose-500",
      hoverGradient: "from-red-600 to-rose-600",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Superadmin UI Section */}
        {isSuperAdmin && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-1">Admin Management</h2>
              <p className="text-gray-600 text-sm">Create new admin accounts for your organization.</p>
            </div>
            <button
              onClick={() => setShowCreateAdmin(true)}
              className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              + Create Admin
            </button>
          </div>
        )}
        {/* CreateAdmins Modal */}
        {isSuperAdmin && (
          <CreateAdmins
            isOpen={showCreateAdmin}
            onClose={() => setShowCreateAdmin(false)}
            onSuccess={() => setShowCreateAdmin(false)}
          />
        )}
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Here's what's happening with grievances today.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group relative">
                {/* Animated background */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${stat.bgGradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}
                ></div>

                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgGradient} shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`text-right ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : stat.change.startsWith("-")
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="text-sm font-medium">{stat.change}</span>
                      <div className="text-xs text-gray-500">vs last week</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-gray-600 font-medium text-sm mb-1">
                      {stat.title}
                    </h3>
                    <div className="flex items-baseline space-x-2">
                      <span
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.bgGradient} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      {stat.description}
                    </p>
                  </div>

                  <Link
                    href={stat.href}
                    className={`flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r ${stat.bgGradient} hover:${stat.hoverGradient} text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105 text-sm`}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Students Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 font-medium text-sm mb-1">
              Total Students
            </h3>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {totalStudents.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-500 text-xs">Registered users</p>
          </div>

          {/* Average Response Time */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-600">
                <span className="text-sm font-medium">-15%</span>
              </div>
            </div>
            <h3 className="text-gray-600 font-medium text-sm mb-1">
              Avg Response Time
            </h3>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {responseTime}
              </span>
            </div>
            <p className="text-gray-500 text-xs">Faster than last month</p>
          </div>

          {/* Priority Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-gray-600 font-medium text-sm mb-1">
              Priority Cases
            </h3>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {Math.floor(pendingGrievances * 0.3)}
              </span>
            </div>
            <p className="text-gray-500 text-xs">Require immediate attention</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-gray-600 text-sm mt-1">
              Latest updates on grievance submissions and resolutions
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "new"
                          ? "bg-blue-500"
                          : activity.type === "resolved"
                          ? "bg-green-500"
                          : activity.type === "pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        by {activity.student}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50 rounded-b-2xl">
            <Link
              href="/admin/activity"
              className="flex items-center justify-center w-full px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
            >
              View All Activity
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
