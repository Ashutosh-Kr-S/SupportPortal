// Campus Academic - Redirect & Reject Grievances
"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Send, XCircle, AlertCircle } from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const CampusAcademicRedirectGrievancesPage = () => {
  useAuthRedirect();
  const { user, userType } = useAuth();

  const isCampusAcademic =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) => r.toLowerCase() === "campus academic"
    );

  if (!isCampusAcademic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Redirect Academic Grievances - Campus Academic Admin
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <Send className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Redirect Academic Grievances
        </h2>
        <p className="text-gray-600">
          Redirect academic grievances to appropriate departments or higher
          authorities.
        </p>
      </div>
    </div>
  );
};

export default CampusAcademicRedirectGrievancesPage;
