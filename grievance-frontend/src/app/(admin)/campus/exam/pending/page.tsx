// Campus Examination - Essential Pages
"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Clock,
  CheckCircle,
  Eye,
  Send,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";

// Campus Exam Pending
export const CampusExamPendingPage = () => {
  useAuthRedirect();
  const { user, userType } = useAuth();

  const isCampusExam =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) => r.toLowerCase() === "campus examination"
    );

  if (!isCampusExam) {
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
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pending Examination Grievances - Campus Examination Admin
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <Clock className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Pending Examination Grievances
        </h2>
        <p className="text-gray-600">
          This page will show all pending examination grievances.
        </p>
      </div>
    </div>
  );
};

// Campus Exam Resolve
export const CampusExamResolvePage = () => {
  useAuthRedirect();
  const { user, userType } = useAuth();

  const isCampusExam =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) => r.toLowerCase() === "campus examination"
    );

  if (!isCampusExam) {
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
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Resolved Examination Grievances - Campus Examination Admin
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <CheckCircle className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Resolved Examination Grievances
        </h2>
        <p className="text-gray-600">
          View all resolved examination grievances.
        </p>
      </div>
    </div>
  );
};

export default CampusExamPendingPage;
