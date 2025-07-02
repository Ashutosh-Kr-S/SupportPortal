// University Exam New
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  FilePlus,
  AlertCircle,
  RefreshCw,
  Loader2,
  FileText,
  Calendar,
  User,
  Building,
  GraduationCap,
} from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import {
  getUniversityDeptNewGrievances,
  getDummyGrievances,
  Grievance,
} from "@/services/grievance.service";

const UniversityExamNewPage = () => {
  useAuthRedirect();
  const { user, userType } = useAuth();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isUniversityExam =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) => r.toLowerCase() === "university examination"
    );

  const fetchGrievances = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to fetch from API first, fallback to dummy data
      const response = await getUniversityDeptNewGrievances("examination");
      setGrievances(response.data || []);
    } catch (err) {
      console.warn("API call failed, using dummy data:", err);
      // Use dummy data as fallback - filter for examination grievances
      setGrievances(getDummyGrievances("NEW", "EXAMINATION"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUniversityExam) {
      fetchGrievances();
    }
  }, [isUniversityExam]);

  if (!isUniversityExam) {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  New Examination Grievances - University Examination Admin
                </h1>
                <p className="text-gray-600 mt-1">
                  View and manage new examination grievances at university level
                </p>
              </div>
            </div>
            <button
              onClick={fetchGrievances}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">
              Loading examination grievances...
            </span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Error Loading Grievances
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchGrievances}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : grievances.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No New Examination Grievances
            </h2>
            <p className="text-gray-600">
              There are currently no new examination grievances to review at
              university level.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                New Examination Grievances ({grievances.length})
              </h3>
              <div className="grid gap-6">
                {grievances.map((grievance) => (
                  <div
                    key={grievance.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {grievance.subject}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ID: {grievance.issuse_id}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        EXAMINATION
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {grievance.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{grievance.rollno}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{grievance.campus}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(grievance.date).toLocaleDateString()}
                        </span>
                      </div>
                      {grievance.attachment && (
                        <div className="flex items-center gap-1">
                          <FilePlus className="w-4 h-4" />
                          <span>Has Attachment</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                        Review
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        Accept
                      </button>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm">
                        Redirect to Campus
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityExamNewPage;
