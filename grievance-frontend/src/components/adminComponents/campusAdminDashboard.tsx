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
  Building2,
  GraduationCap,
  BookOpen,
  UserCheck,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CampusAdminNavItems } from "@/styles/campusConstants";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const CampusAdminDashboard = () => {
  useAuthRedirect();

  const [newGrievances, setNewGrievances] = useState(15);
  const [pendingGrievances, setPendingGrievances] = useState(12);
  const [resolvedGrievances, setResolvedGrievances] = useState(58);
  const [rejectedGrievances, setRejectedGrievances] = useState(5);
  const [totalStudents, setTotalStudents] = useState(892);
  const [responseTime, setResponseTime] = useState("1.8 hrs");
  const [satisfactionRate, setSatisfactionRate] = useState(87);
  const [monthlyGrievances, setMonthlyGrievances] = useState(245);
  const { user, userType } = useAuth();

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      action: "New grievance submitted",
      student: "John Doe",
      department: "Computer Science",
      time: "5 min ago",
      type: "new",
    },
    {
      id: 2,
      action: "Grievance resolved",
      student: "Jane Smith",
      department: "Mathematics",
      time: "15 min ago",
      type: "resolved",
    },
    {
      id: 3,
      action: "Response sent",
      student: "Mike Johnson",
      department: "Physics",
      time: "1 hr ago",
      type: "pending",
    },
    {
      id: 4,
      action: "Grievance redirected",
      student: "Sarah Wilson",
      department: "Chemistry",
      time: "2 hrs ago",
      type: "redirect",
    },
    {
      id: 5,
      action: "Grievance under review",
      student: "Alex Brown",
      department: "Biology",
      time: "3 hrs ago",
      type: "review",
    },
  ];

  // Department-wise grievance data
  const departmentStats = [
    { department: "Computer Science", grievances: 45, trend: "up" },
    { department: "Mathematics", grievances: 32, trend: "down" },
    { department: "Physics", grievances: 28, trend: "up" },
    { department: "Chemistry", grievances: 25, trend: "stable" },
    { department: "Biology", grievances: 22, trend: "down" },
  ];

  // Create route mapping from CampusAdminNavItems
  const getRouteFromNavItems = (searchTitle: string) => {
    const navItem = CampusAdminNavItems.find((item) =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    return navItem?.href || "#";
  };

  const stats = [
    {
      title: "New Grievances",
      value: newGrievances,
      change: "+18%",
      icon: FileText,
      color: "blue",
      href: getRouteFromNavItems("New Grievance"),
      description: "Awaiting initial review",
      bgGradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Under Review",
      value: pendingGrievances,
      change: "-8%",
      icon: Eye,
      color: "orange",
      href: getRouteFromNavItems("Review Grievance"),
      description: "Currently being processed",
      bgGradient: "from-orange-500 to-amber-500",
      hoverGradient: "from-orange-600 to-amber-600",
    },
    {
      title: "Resolved Cases",
      value: resolvedGrievances,
      change: "+25%",
      icon: CheckCircle,
      color: "green",
      href: getRouteFromNavItems("Resolve Grievance"),
      description: "Successfully completed",
      bgGradient: "from-green-500 to-emerald-500",
      hoverGradient: "from-green-600 to-emerald-600",
    },
    {
      title: "Rejected Cases",
      value: rejectedGrievances,
      change: "+2%",
      icon: XCircle,
      color: "red",
      href: getRouteFromNavItems("Reject Grievance"),
      description: "Invalid submissions",
      bgGradient: "from-red-500 to-rose-500",
      hoverGradient: "from-red-600 to-rose-600",
    },
  ];

  const additionalMetrics = [
    {
      title: "Campus Students",
      value: totalStudents,
      icon: GraduationCap,
      trend: "+5.2%",
      description: "Active enrollments",
      color: "purple",
    },
    {
      title: "Response Time",
      value: responseTime,
      icon: Clock,
      trend: "-12%",
      description: "Average processing time",
      color: "teal",
    },
    {
      title: "Satisfaction Rate",
      value: `${satisfactionRate}%`,
      icon: UserCheck,
      trend: "+3%",
      description: "Student satisfaction",
      color: "indigo",
    },
    {
      title: "Monthly Total",
      value: monthlyGrievances,
      icon: BarChart3,
      trend: "+8%",
      description: "This month's grievances",
      color: "pink",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2">
              Campus Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and oversee campus grievances efficiently
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">
                Campus Administration
              </span>
            </div>
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
                    Manage
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const colorClasses = {
              purple: "from-purple-500 to-indigo-500",
              teal: "from-teal-500 to-cyan-500",
              indigo: "from-indigo-500 to-purple-500",
              pink: "from-pink-500 to-rose-500",
            };

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${
                      colorClasses[metric.color as keyof typeof colorClasses]
                    } shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      metric.trend.startsWith("+")
                        ? "text-green-600"
                        : metric.trend.startsWith("-")
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {metric.trend.startsWith("+") ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : metric.trend.startsWith("-") ? (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    ) : null}
                    <span className="font-medium">{metric.trend}</span>
                  </div>
                </div>
                <h3 className="text-gray-600 font-medium text-sm mb-1">
                  {metric.title}
                </h3>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span
                    className={`text-3xl font-bold bg-gradient-to-r ${
                      colorClasses[metric.color as keyof typeof colorClasses]
                    } bg-clip-text text-transparent`}
                  >
                    {metric.value}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{metric.description}</p>
              </div>
            );
          })}
        </div>

        {/* Department Statistics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Statistics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Department Statistics
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Grievances by department this month
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          dept.trend === "up"
                            ? "bg-red-400"
                            : dept.trend === "down"
                            ? "bg-green-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {dept.department}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-700">
                        {dept.grievances}
                      </span>
                      {dept.trend === "up" && (
                        <ArrowUp className="w-4 h-4 text-red-500" />
                      )}
                      {dept.trend === "down" && (
                        <ArrowDown className="w-4 h-4 text-green-500" />
                      )}
                      {dept.trend === "stable" && (
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Latest grievance updates
              </p>
            </div>
            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "new"
                          ? "bg-blue-500"
                          : activity.type === "resolved"
                          ? "bg-green-500"
                          : activity.type === "pending"
                          ? "bg-orange-500"
                          : activity.type === "redirect"
                          ? "bg-purple-500"
                          : activity.type === "review"
                          ? "bg-indigo-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.student} • {activity.department}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
              Priority Actions
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Items requiring immediate attention
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href={getRouteFromNavItems("New Grievance")}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 transition-all duration-200 group"
              >
                <div>
                  <h3 className="font-semibold text-blue-900">
                    Review New Cases
                  </h3>
                  <p className="text-sm text-blue-600">
                    {newGrievances} pending
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={getRouteFromNavItems("Review Grievance")}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-orange-200 hover:border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all duration-200 group"
              >
                <div>
                  <h3 className="font-semibold text-orange-900">
                    Cases Under Review
                  </h3>
                  <p className="text-sm text-orange-600">
                    {pendingGrievances} active
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-green-200 bg-green-50">
                <div>
                  <h3 className="font-semibold text-green-900">
                    Response Target
                  </h3>
                  <p className="text-sm text-green-600">
                    Within {responseTime}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusAdminDashboard;
