"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CircleUserRound,
  Settings,
  LogOut,
  User,
  Bell
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { StudentInfo } from "../../types/StudentInfo";
import { AdminInfo } from "../../types/admin-info";


interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const { user, loading, userType, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getUserDisplay = () => {
    if (loading) {
      return "Loading...";
    }
    if (!user) {
      return "Not logged in";
    }

    if (userType === "admin") {
      const admin = user as AdminInfo;
      return admin.name;
    }

    if (userType === "student") {
      const student = user as StudentInfo;
      return student.name;
    }

    return "Unknown user";
  };
  const getUserRole = () => {
    if (userType === "admin" && user) {
      const admin = user as AdminInfo;
      return admin.role[0] || "Admin";
    }
    if (userType === "student") return "Student";
    return "Guest";
  };

  const getUserSubtitle = () => {
    if (userType === "student") {
      const student = user as StudentInfo;
      return student.rollno;
    }
    return getUserRole();
  };
  return (
    <div
      className={`w-full h-18 bg-white/95 backdrop-blur-sm border-b border-blue-200/50 p-3 flex justify-between items-center shadow-sm ${className}`}
    >
      {/* Left Side - Logo */}
      <div className="flex items-center ml-12">
        <Image
          src="https://dseu.ac.in/assets/DSEULOGOTHICK-Bm0-gkb8.svg"
          width={40}
          height={40}
          alt="DSEU Logo"
          className="cursor-pointer"
        />
        <span className="ml-3 text-blue-600 font-bold text-lg hidden sm:block">
          Grievance Portal
        </span>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center space-x-3">
        {" "}
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-200"
          >
            <Bell className="w-5 h-5 text-blue-600" />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg z-50">
              <div className="p-4 border-b border-blue-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="p-4 hover:bg-blue-50 border-b border-blue-50">
                  <p className="text-sm text-gray-800">
                    Your grievance #GRV001 has been updated
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-blue-50 border-b border-blue-50">
                  <p className="text-sm text-gray-800">
                    New response received for grievance #GRV002
                  </p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
                <div className="p-4 text-center">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View All Notifications
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>{" "}
        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 bg-white/80 hover:bg-blue-50 rounded-xl px-3 py-2 border border-blue-200/50 transition-all duration-200 shadow-sm"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <CircleUserRound className="w-5 h-5 text-white" />
            </div>

            {/* User Info - Hidden on small screens */}
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800 max-w-24 truncate">
                {getUserDisplay()}
              </span>
              <span className="text-xs text-gray-500">{getUserSubtitle()}</span>
            </div>

            {/* Dropdown Arrow */}
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                showUserMenu ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg z-50">
              {/* User Info Header - Always visible in dropdown */}
              <div className="p-4 border-b border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <CircleUserRound className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {getUserDisplay()}
                    </p>
                    <p className="text-sm text-gray-500">{getUserSubtitle()}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full mt-1">
                      {getUserRole()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                  onClick={() => router.push("/profile")}
                >
                  <User className="w-4 h-4 mr-3 text-blue-500" />
                  Profile
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  <Settings className="w-4 h-4 mr-3 text-blue-500" />
                  Settings
                </button>
                <div className="border-t border-blue-100 my-2"></div>
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={logout}>
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
