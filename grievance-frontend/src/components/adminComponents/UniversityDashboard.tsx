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
  University,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  UniversityAcademicNavItems,
  UniversityExamNavItems,
  UniversityNonAcademicNavItems,
} from "@/styles/universityConstants";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const UniversityDashboard = () => {
  useAuthRedirect();

  const [newGrievances, setNewGrievances] = useState(45);
  const [pendingGrievances, setPendingGrievances] = useState(32);
  const [resolvedGrievances, setResolvedGrievances] = useState(128);
  const [rejectedGrievances, setRejectedGrievances] = useState(12);
  const [totalCampuses, setTotalCampuses] = useState(8);
  const [totalStudents, setTotalStudents] = useState(5420);
  const [responseTime, setResponseTime] = useState("2.4 hrs");
  const [satisfactionRate, setSatisfactionRate] = useState(89);
  const [monthlyGrievances, setMonthlyGrievances] = useState(485);
  const { user, userType } = useAuth();

  // Get user role to determine navigation items
  const getUserRole = () => {
    if (user && Array.isArray((user as any).role)) {
      const roles = (user as any).role;
      if (roles.includes("university academic")) return "academic";
      if (roles.includes("university examination")) return "examination";
      if (roles.includes("university non-academic")) return "non-academic";
    }
    return "academic";
  };

  const userRole = getUserRole();

  // Get appropriate navigation items based on role
  const getNavItems = () => {
    switch (userRole) {
      case "examination":
        return UniversityExamNavItems;
      case "non-academic":
        return UniversityNonAcademicNavItems;
      default:
        return UniversityAcademicNavItems;
    }
  };

  const navItems = getNavItems();

  // Create route mapping from NavItems
  const getRouteFromNavItems = (searchTitle: string) => {
    const navItem = navItems.find((item) =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    return navItem?.href || "#";
  };

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      action: "Campus escalation received",
      campus: "Main Campus",
      department: "Computer Science",
      time: "10 min ago",
      type: "escalation",
    },
    {
      id: 2,
      action: "University grievance resolved",
      campus: "North Campus",
      department: "Mathematics",
      time: "25 min ago",
      type: "resolved",
    },
    {
      id: 3,
      action: "Policy guidance sent",
      campus: "South Campus",
      department: "Physics",
      time: "1 hr ago",
      type: "guidance",
    },
    {
      id: 4,
      action: "Grievance redirected to campus",
      campus: "East Campus",
      department: "Chemistry",
      time: "2 hrs ago",
      type: "redirect",
    },
    {
      id: 5,
      action: "Complex case under review",
      campus: "West Campus",
      department: "Biology",
      time: "3 hrs ago",
      type: "review",
    },
  ];

  // Campus-wise grievance data
  const campusStats = [
    { campus: "Main Campus", grievances: 85, trend: "up", resolved: 65 },
    { campus: "North Campus", grievances: 62, trend: "down", resolved: 45 },
    { campus: "South Campus", grievances: 58, trend: "up", resolved: 42 },
    { campus: "East Campus", grievances: 45, trend: "stable", resolved: 38 },
    { campus: "West Campus", grievances: 38, trend: "down", resolved: 35 },
  ];

  const stats = [
    {
      title: "University Grievances",
      value: newGrievances,
      change: "+22%",
      icon: FileText,
      color: "blue",
      href: getRouteFromNavItems("New Grievance"),
      description: "Escalated from campuses",
      bgGradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Under Review",
      value: pendingGrievances,
      change: "-5%",
      icon: Eye,
      color: "orange",
      href: getRouteFromNavItems("Review Grievance"),
      description: "Complex cases being reviewed",
      bgGradient: "from-orange-500 to-amber-500",
      hoverGradient: "from-orange-600 to-amber-600",
    },
    {
      title: "Resolved Cases",
      value: resolvedGrievances,
      change: "+18%",
      icon: CheckCircle,
      color: "green",
      href: getRouteFromNavItems("Resolve Grievance"),
      description: "University level resolutions",
      bgGradient: "from-green-500 to-emerald-500",
      hoverGradient: "from-green-600 to-emerald-600",
    },
    {
      title: "Policy Clarifications",
      value: rejectedGrievances,
      change: "+8%",
      icon: XCircle,
      color: "red",
      href: getRouteFromNavItems("Reject Grievance"),
      description: "Sent back with guidance",
      bgGradient: "from-red-500 to-rose-500",
      hoverGradient: "from-red-600 to-rose-600",
    },
  ];

  const additionalMetrics = [
    {
      title: "Total Campuses",
      value: totalCampuses,
      icon: Building2,
      trend: "+0%",
      description: "Active campus locations",
      color: "purple",
    },
    {
      title: "University Students",
      value: `${(totalStudents / 1000).toFixed(1)}K`,
      icon: GraduationCap,
      trend: "+3.2%",
      description: "Total university enrollment",
      color: "teal",
    },
    {
      title: "Response Time",
      value: responseTime,
      icon: Clock,
      trend: "-8%",
      description: "Average resolution time",
      color: "indigo",
    },
    {
      title: "Satisfaction Rate",
      value: `${satisfactionRate}%`,
      icon: UserCheck,
      trend: "+2%",
      description: "University-wide satisfaction",
      color: "pink",
    },
  ];

  const getDepartmentTitle = () => {
    switch (userRole) {
      case "examination":
        return "University Examination Dashboard";
      case "non-academic":
        return "University Non-Academic Dashboard";
      default:
        return "University Academic Dashboard";
    }
  };

  const getDepartmentDescription = () => {
    switch (userRole) {
      case "examination":
        return "Manage examination-related grievances across all campuses";
      case "non-academic":
        return "Handle non-academic grievances and administrative issues";
      default:
        return "Oversee academic grievances at university level";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-900 to-indigo-600 bg-clip-text text-transparent mb-2">
              {getDepartmentTitle()}
            </h1>
            <p className="text-gray-600 text-lg">
              {getDepartmentDescription()}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <University className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">
                University Level Administration
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
                      <div className="text-xs text-gray-500">vs last month</div>
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

        {/* Campus Statistics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campus Statistics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                Campus Statistics
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Grievances by campus this month
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {campusStats.map((campus, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {campus.campus}
                        </p>
                        <p className="text-sm text-gray-500">
                          {campus.resolved} resolved / {campus.grievances} total
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {campus.grievances}
                      </span>
                      <div
                        className={`flex items-center ${
                          campus.trend === "up"
                            ? "text-red-500"
                            : campus.trend === "down"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {campus.trend === "up" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : campus.trend === "down" ? (
                          <ArrowDown className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-1 bg-gray-400 rounded"></div>
                        )}
                      </div>
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
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Recent Activity
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Latest university-level actions
              </p>
            </div>
            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "escalation"
                          ? "bg-red-500"
                          : activity.type === "resolved"
                          ? "bg-green-500"
                          : activity.type === "guidance"
                          ? "bg-blue-500"
                          : activity.type === "redirect"
                          ? "bg-orange-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.campus} • {activity.department}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* University Insights */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              University Insights
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Key metrics and trends across all campuses
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {Math.round(
                    (resolvedGrievances /
                      (resolvedGrievances +
                        pendingGrievances +
                        newGrievances)) *
                      100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600">Resolution Rate</div>
                <div className="text-xs text-gray-500 mt-1">
                  University-wide
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {responseTime}
                </div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
                <div className="text-xs text-gray-500 mt-1">
                  Escalated cases
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {totalCampuses}
                </div>
                <div className="text-sm text-gray-600">Active Campuses</div>
                <div className="text-xs text-gray-500 mt-1">
                  Reporting to university
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;
