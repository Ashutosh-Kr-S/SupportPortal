// University Non-Academic Reject
"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { XCircle, AlertCircle } from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const UniversityNonAcademicRejectPage = () => {
  useAuthRedirect();
  const { user, userType } = useAuth();

  const isUniversityNonAcademic =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) => r.toLowerCase() === "university non-academic"
    );

  if (!isUniversityNonAcademic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Rejected Non-Academic Grievances - University Non-Academic Admin
              </h1>
              <p className="text-gray-600 mt-1">
                View rejected non-academic grievances at university level
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <XCircle className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Rejected Non-Academic Grievances
        </h2>
        <p className="text-gray-600">
          View all rejected non-academic grievances at university level.
        </p>
      </div>
    </div>
  );
};

export default UniversityNonAcademicRejectPage;
