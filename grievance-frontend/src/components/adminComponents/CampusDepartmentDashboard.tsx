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
  Building,
  Send,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  CampusAcademicNavItems,
  CampusExamNavItems,
  CampusNonAcademicNavItems,
} from "@/styles/campusDepConstants";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const CampusDepartmentDashboard = () => {
  useAuthRedirect();

  const [newGrievances, setNewGrievances] = useState(25);
  const [pendingGrievances, setPendingGrievances] = useState(18);
  const [resolvedGrievances, setResolvedGrievances] = useState(72);
  const [rejectedGrievances, setRejectedGrievances] = useState(6);
  const [escalatedGrievances, setEscalatedGrievances] = useState(8);
  const [totalStudents, setTotalStudents] = useState(1200);
  const [responseTime, setResponseTime] = useState("1.5 hrs");
  const [satisfactionRate, setSatisfactionRate] = useState(85);
  const [monthlyGrievances, setMonthlyGrievances] = useState(129);
  const { user, userType } = useAuth();

  // Get user role to determine navigation items
  const getUserRole = () => {
    if (user && Array.isArray((user as any).role)) {
      const roles = (user as any).role;
      if (roles.includes("campus academic")) return "academic";
      if (roles.includes("campus examination")) return "examination";
      if (roles.includes("campus non-academic")) return "non-academic";
    }
    return "academic";
  };

  const userRole = getUserRole();

  // Get appropriate navigation items based on role
  const getNavItems = () => {
    switch (userRole) {
      case "examination":
        return CampusExamNavItems;
      case "non-academic":
        return CampusNonAcademicNavItems;
      default:
        return CampusAcademicNavItems;
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
      action: "New grievance received",
      student: "John Doe",
      program: "B.Tech CSE",
      time: "8 min ago",
      type: "new",
    },
    {
      id: 2,
      action: "Grievance resolved",
      student: "Jane Smith",
      program: "M.Sc Mathematics",
      time: "20 min ago",
      type: "resolved",
    },
    {
      id: 3,
      action: "Escalated to campus admin",
      student: "Mike Johnson",
      program: "B.Sc Physics",
      time: "45 min ago",
      type: "escalated",
    },
    {
      id: 4,
      action: "Response pending",
      student: "Sarah Wilson",
      program: "M.Tech ECE",
      time: "1 hr ago",
      type: "pending",
    },
    {
      id: 5,
      action: "Grievance under review",
      student: "Alex Brown",
      program: "B.Sc Biology",
      time: "2 hrs ago",
      type: "review",
    },
  ];

  // Program-wise grievance data
  const programStats = [
    { program: "B.Tech CSE", grievances: 28, trend: "up", resolved: 22 },
    { program: "M.Sc Math", grievances: 18, trend: "down", resolved: 15 },
    { program: "B.Sc Physics", grievances: 15, trend: "up", resolved: 12 },
    { program: "M.Tech ECE", grievances: 12, trend: "stable", resolved: 9 },
    { program: "B.Sc Bio", grievances: 10, trend: "down", resolved: 8 },
  ];

  const stats = [
    {
      title: "New Grievances",
      value: newGrievances,
      change: "+15%",
      icon: FileText,
      color: "blue",
      href: getRouteFromNavItems("New Grievance"),
      description: "Department specific cases",
      bgGradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Under Review",
      value: pendingGrievances,
      change: "-12%",
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
      change: "+20%",
      icon: CheckCircle,
      color: "green",
      href: getRouteFromNavItems("Resolve Grievance"),
      description: "Successfully completed",
      bgGradient: "from-green-500 to-emerald-500",
      hoverGradient: "from-green-600 to-emerald-600",
    },
    {
      title: "Escalated",
      value: escalatedGrievances,
      change: "+5%",
      icon: Send,
      color: "red",
      href: getRouteFromNavItems("Redirect Grievance"),
      description: "Sent to higher authority",
      bgGradient: "from-red-500 to-rose-500",
      hoverGradient: "from-red-600 to-rose-600",
    },
  ];

  const additionalMetrics = [
    {
      title: "Department Students",
      value: totalStudents,
      icon: GraduationCap,
      trend: "+4.2%",
      description: "Active in programs",
      color: "purple",
    },
    {
      title: "Response Time",
      value: responseTime,
      icon: Clock,
      trend: "-18%",
      description: "Average processing time",
      color: "teal",
    },
    {
      title: "Satisfaction Rate",
      value: `${satisfactionRate}%`,
      icon: UserCheck,
      trend: "+1%",
      description: "Department satisfaction",
      color: "indigo",
    },
    {
      title: "Monthly Total",
      value: monthlyGrievances,
      icon: BarChart3,
      trend: "+6%",
      description: "This month's cases",
      color: "pink",
    },
  ];

  const getDepartmentTitle = () => {
    switch (userRole) {
      case "examination":
        return "Campus Examination Dashboard";
      case "non-academic":
        return "Campus Non-Academic Dashboard";
      default:
        return "Campus Academic Dashboard";
    }
  };

  const getDepartmentDescription = () => {
    switch (userRole) {
      case "examination":
        return "Handle examination-related grievances and escalate complex cases";
      case "non-academic":
        return "Manage non-academic grievances and administrative issues";
      default:
        return "Manage academic grievances and coordinate with campus admin";
    }
  };

  const getDepartmentIcon = () => {
    switch (userRole) {
      case "examination":
        return "📝";
      case "non-academic":
        return "🏢";
      default:
        return "📚";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-900 to-teal-600 bg-clip-text text-transparent mb-2">
              {getDepartmentTitle()}
            </h1>
            <p className="text-gray-600 text-lg">
              {getDepartmentDescription()}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Building className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                Campus Department Level {getDepartmentIcon()}
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

        {/* Program Statistics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Program Statistics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Program Statistics
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Grievances by program this month
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {programStats.map((program, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {program.program}
                        </p>
                        <p className="text-sm text-gray-500">
                          {program.resolved} resolved / {program.grievances}{" "}
                          total
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {program.grievances}
                      </span>
                      <div
                        className={`flex items-center ${
                          program.trend === "up"
                            ? "text-red-500"
                            : program.trend === "down"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {program.trend === "up" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : program.trend === "down" ? (
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
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                Recent Activity
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Latest department actions
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
                        activity.type === "new"
                          ? "bg-blue-500"
                          : activity.type === "resolved"
                          ? "bg-green-500"
                          : activity.type === "escalated"
                          ? "bg-red-500"
                          : activity.type === "pending"
                          ? "bg-orange-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.student} • {activity.program}
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

        {/* Department Performance Insights */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
              Department Performance
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Key performance indicators for your department
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
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
                  Department level
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {escalatedGrievances}
                </div>
                <div className="text-sm text-gray-600">Escalated Cases</div>
                <div className="text-xs text-gray-500 mt-1">
                  To campus admin
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {Math.round((resolvedGrievances / monthlyGrievances) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Efficiency Rate</div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusDepartmentDashboard;
