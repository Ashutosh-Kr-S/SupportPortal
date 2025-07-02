"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import CampusAdminDashboard from "./campusAdminDashboard";
import CampusDepartmentDashboard from "./CampusDepartmentDashboard";
import UniversityDashboard from "./UniversityDashboard";

const RoleBasedDashboard = () => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (userType !== "admin" || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Get user role to determine which dashboard to render
  const getUserRole = () => {
    if (user && Array.isArray((user as any).role)) {
      const roles = (user as any).role;

      // Check for superadmin first
      if (
        roles.some(
          (r: string) =>
            r.toLowerCase() === "superadmin" ||
            r.toLowerCase() === "super_admin"
        )
      ) {
        return "superadmin";
      }

      // Check for university level roles
      if (roles.includes("university academic")) return "university-academic";
      if (roles.includes("university examination"))
        return "university-examination";
      if (roles.includes("university non-academic"))
        return "university-non-academic";

      // Check for campus admin
      if (roles.includes("campus admin")) return "campus-admin";

      // Check for campus department roles
      if (roles.includes("campus academic")) return "campus-academic";
      if (roles.includes("campus examination")) return "campus-examination";
      if (roles.includes("campus non-academic")) return "campus-non-academic";
    }
    return "unknown";
  };

  const userRole = getUserRole();

  // Render appropriate dashboard based on role
  switch (userRole) {
    case "superadmin":
      return <AdminDashboard />;

    case "university-academic":
    case "university-examination":
    case "university-non-academic":
      return <UniversityDashboard />;

    case "campus-admin":
      return <CampusAdminDashboard />;

    case "campus-academic":
    case "campus-examination":
    case "campus-non-academic":
      return <CampusDepartmentDashboard />;

    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❓</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Unknown Role
            </h1>
            <p className="text-gray-600">
              Your role "{userRole}" is not recognized in the system.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please contact the administrator for assistance.
            </p>
          </div>
        </div>
      );
  }
};

export default RoleBasedDashboard;
