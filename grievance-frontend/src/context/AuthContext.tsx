"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { StudentInfo } from "../types/StudentInfo";
import { AdminInfo, AdminRole } from "../types/admin-info";

type User = AdminInfo | StudentInfo;

// Updated type to match the actual API response structure
export type LoginResponse = {
  success: boolean;
  message: string;
  token: string;
  user?: {
    rollNumber?: string;
    rollno?: string;
    name: string;
    email: string;
    // Add other fields that might come from the API
    [key: string]: any;
  };
  admin?: {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
    campusId: number;
  };
};

interface AuthContextType {
  user: StudentInfo | AdminInfo | null;
  token: string | null;
  userType: "student" | "admin" | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginResponse, userType: "student" | "admin") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  userType: null,
  loading: true,
  error: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<"student" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run in the browser environment
    if (typeof window !== "undefined") {
      // Initialize from localStorage
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedUserType = localStorage.getItem("userType");
      if (storedToken && storedUser && storedUserType) {
        setToken(storedToken);
        const parsedUser = JSON.parse(storedUser);
        console.log("User state initialized from localStorage:", parsedUser); // CONSOLE LOG ADDED
        // Type assertion based on userType
        if (storedUserType === "student") {
          setUser(parsedUser as StudentInfo);
        } else if (storedUserType === "admin") {
          setUser(parsedUser as AdminInfo);
        }
        setUserType(storedUserType as "student" | "admin");
      }
    }
    setLoading(false);
  }, []);

  const login = (data: LoginResponse, userType: "student" | "admin") => {
    setToken(data.token);

    // Transform the API response to match our expected user types
    if (userType === "student" && data.user) {
      // Map API response to StudentInfo structure
      const studentUser: StudentInfo = {
        rollno: data.user.rollno || data.user.rollNumber || "", // Handle both field names
        name: data.user.name,
        father: data.user.father || "",
        mother: data.user.mother || "",
        aadhar: data.user.aadhar || "",
        category: data.user.category || "",
        gender: data.user.gender || "",
        lateral_entry: data.user.lateral_entry || false,
        email: data.user.email,
        mobile: data.user.mobile || "",
        year: data.user.year || new Date().getFullYear(),
      };
      setUser(studentUser);
      console.log("User state updated after student login:", studentUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(studentUser));
      }
    } else if (userType === "admin" && data.admin) {
      // Map API response to AdminInfo structure
      const adminUser: AdminInfo = {
        AdminId: parseInt(data.admin.id.split("_")[1]), // Convert string ID to number
        name: data.admin.name,
        email: data.admin.email,
        role: [data.admin.role], // Convert single role to array
        phone: "", // Default value as it's not in the new response
        isverified: true, // Default value
        IsActive: true, // Default value
        LastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [], // Default empty array for permissions
      };
      setUser(adminUser);
      console.log("User state updated after admin login:", adminUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(adminUser));
      }
    }

    setUserType(userType);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", userType);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserType(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userType,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
