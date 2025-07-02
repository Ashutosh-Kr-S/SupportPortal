"use client";
import React from "react";
import { NavItems } from "@/styles/constants";
import { AdminNavItems } from "@/styles/adminConstants";
import { CampusAdminNavItems } from "@/styles/campusConstants";
import {
  CampusAcademicNavItems,
  CampusNonAcademicNavItems,
  CampusExamNavItems,
} from "@/styles/campusDepConstants";
import {
  UniversityAcademicNavItems,
  UniversityExamNavItems,
  UniversityNonAcademicNavItems,
} from "@/styles/universityConstants";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AdminInfo } from "@/types/admin-info";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, userType } = useAuth();

  // Function to get navigation items based on user type and admin role
  const getNavItems = () => {
    if (userType === "student") {
      return NavItems;
    }

    if (userType === "admin" && user) {
      const admin = user as AdminInfo;
      const adminRole = admin.role[0]; // Get the first role

      switch (adminRole) {
        case "superadmin":
          return AdminNavItems;
        case "campus admin":
          return CampusAdminNavItems;
        case "campus academic":
          return CampusAcademicNavItems;
        case "campus examination":
          return CampusExamNavItems;
        case "campus non-academic":
          return CampusNonAcademicNavItems;
        case "university academic":
          return UniversityAcademicNavItems;
        case "university examination":
          return UniversityExamNavItems;
        case "university non-academic":
          return UniversityNonAcademicNavItems;
        default:
          return AdminNavItems; // Default to superadmin nav items
      }
    }

    return NavItems; // Default to student nav items
  };

  const navItems = getNavItems();

  const topNavItems = navItems.filter((item) => item.position === "top");
  const bottomNavItems = navItems.filter((item) => item.position === "bottom");
  const handleNavigation = (href: string) => {
    router.push(href);
  };
  return (
    <div
      className={`group bg-white/95 hover:bg-white/70 backdrop-blur-lg border-r border-blue-200/80 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out flex-shrink-0 w-16 hover:w-56 fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 ${className}`}
    >
      {" "}
      {/* Header section with logo or brand */}
      <div className="flex items-center justify-center p-4 border-b border-blue-100">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <span className="ml-2 text-blue-800 font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
          Grievance Portal
        </span>
      </div>
      <nav className="flex flex-col h-[calc(100%-6rem)]">
        <div className="flex-1 py-4">
          {topNavItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center mx-2 mb-2 p-3 cursor-pointer transition-all duration-300 ease-in-out rounded-xl ${
                pathname === item.href
                  ? "bg-blue-500 text-white shadow-lg transform scale-105"
                  : "text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:transform hover:scale-105"
              }`}
            >
              <div className="transition-transform duration-300 ease-in-out flex-shrink-0">
                {item.icon}
              </div>
              <span className="ml-3 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 whitespace-nowrap font-medium">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-blue-100 py-4">
          {bottomNavItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center mx-2 mb-2 p-3 cursor-pointer transition-all duration-300 ease-in-out rounded-xl ${
                pathname === item.href
                  ? "bg-red-500 text-white shadow-lg transform scale-105"
                  : "text-blue-600 hover:bg-red-50 hover:text-red-600 hover:transform hover:scale-105"
              }`}
            >
              <div className="transition-transform duration-300 ease-in-out flex-shrink-0">
                {item.icon}
              </div>
              <span className="ml-3 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 whitespace-nowrap font-medium">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
