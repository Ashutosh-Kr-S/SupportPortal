// Generic Grievance Page Component
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  AlertCircle,
  RefreshCw,
  Loader2,
  FileText,
  Calendar,
  User,
  Building,
  FilePlus,
  GraduationCap,
  Settings,
  BookOpen,
  Clock,
  CheckCircle,
  Eye,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import {
  getCampusDeptNewGrievances,
  getCampusDeptPendingGrievances,
  getCampusDeptResolvedGrievances,
  getCampusDeptRejectedGrievances,
  getCampusDeptReviewGrievances,
  getCampusDeptRedirectGrievances,
  getUniversityDeptNewGrievances,
  getUniversityDeptPendingGrievances,
  getUniversityDeptResolvedGrievances,
  getUniversityDeptRejectedGrievances,
  getUniversityDeptReviewGrievances,
  getUniversityDeptRedirectGrievances,
  getDummyGrievances,
  Grievance,
} from "@/services/grievance.service";

interface GenericGrievancePageProps {
  pageType: "new" | "pending" | "resolved" | "rejected" | "review" | "redirect";
  adminLevel: "campus" | "university";
  adminType: "academic" | "examination" | "non-academic" | "admin";
  title: string;
  description: string;
  roleCheck: string;
}

const GenericGrievancePage: React.FC<GenericGrievancePageProps> = ({
  pageType,
  adminLevel,
  adminType,
  title,
  description,
  roleCheck,
}) => {
  useAuthRedirect();
  const { user, userType } = useAuth();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user has required role
  const hasRequiredRole =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) => r.toLowerCase() === roleCheck.toLowerCase()
    );

  // Get appropriate icon based on page type
  const getIcon = () => {
    switch (pageType) {
      case "new":
        return <FilePlus className="w-6 h-6 text-white" />;
      case "pending":
        return <Clock className="w-6 h-6 text-white" />;
      case "resolved":
        return <CheckCircle className="w-6 h-6 text-white" />;
      case "rejected":
        return <XCircle className="w-6 h-6 text-white" />;
      case "review":
        return <Eye className="w-6 h-6 text-white" />;
      case "redirect":
        return <ArrowRight className="w-6 h-6 text-white" />;
      default:
        return <FileText className="w-6 h-6 text-white" />;
    }
  };

  // Get appropriate color based on admin type
  const getColor = () => {
    switch (adminType) {
      case "academic":
        return "blue";
      case "examination":
        return "purple";
      case "non-academic":
        return "green";
      case "admin":
        return "indigo";
      default:
        return "gray";
    }
  };

  // Get appropriate color based on page type
  const getPageColor = () => {
    switch (pageType) {
      case "new":
        return "blue";
      case "pending":
        return "orange";
      case "resolved":
        return "green";
      case "rejected":
        return "red";
      case "review":
        return "purple";
      case "redirect":
        return "indigo";
      default:
        return "gray";
    }
  };

  const color = getPageColor();

  // Get API function based on level, type and page
  const getApiFunction = () => {
    const deptType = adminType === "admin" ? "admin" : adminType;

    if (adminLevel === "campus") {
      switch (pageType) {
        case "new":
          return () => getCampusDeptNewGrievances(deptType);
        case "pending":
          return () => getCampusDeptPendingGrievances(deptType);
        case "resolved":
          return () => getCampusDeptResolvedGrievances(deptType);
        case "rejected":
          return () => getCampusDeptRejectedGrievances(deptType);
        case "review":
          return () => getCampusDeptReviewGrievances(deptType);
        case "redirect":
          return () => getCampusDeptRedirectGrievances(deptType);
        default:
          return () => getCampusDeptNewGrievances(deptType);
      }
    } else {
      switch (pageType) {
        case "new":
          return () => getUniversityDeptNewGrievances(deptType);
        case "pending":
          return () => getUniversityDeptPendingGrievances(deptType);
        case "resolved":
          return () => getUniversityDeptResolvedGrievances(deptType);
        case "rejected":
          return () => getUniversityDeptRejectedGrievances(deptType);
        case "review":
          return () => getUniversityDeptReviewGrievances(deptType);
        case "redirect":
          return () => getUniversityDeptRedirectGrievances(deptType);
        default:
          return () => getUniversityDeptNewGrievances(deptType);
      }
    }
  };

  const fetchGrievances = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiFunction = getApiFunction();
      const response = await apiFunction();
      setGrievances(response.data || []);
    } catch (err) {
      console.warn("API call failed, using dummy data:", err);
      // Use dummy data as fallback
      const status = pageType.toUpperCase();
      const issueTypeFilter =
        adminType === "academic"
          ? "ACADEMIC"
          : adminType === "examination"
          ? "EXAMINATION"
          : adminType === "non-academic"
          ? "NON-ACADEMIC"
          : undefined;
      setGrievances(getDummyGrievances(status, issueTypeFilter));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasRequiredRole) {
      fetchGrievances();
    }
  }, [hasRequiredRole]);

  if (!hasRequiredRole) {
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
              <div
                className={`w-12 h-12 bg-${color}-600 rounded-full flex items-center justify-center`}
              >
                {getIcon()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
            </div>
            <button
              onClick={fetchGrievances}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 disabled:opacity-50`}
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
            <Loader2 className={`w-8 h-8 animate-spin text-${color}-600`} />
            <span className="ml-2 text-gray-600">Loading grievances...</span>
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
            {getIcon()}
            <h2 className="text-xl font-semibold text-gray-900 mb-2 mt-6">
              No {pageType.charAt(0).toUpperCase() + pageType.slice(1)}{" "}
              Grievances
            </h2>
            <p className="text-gray-600">
              There are currently no {pageType} grievances to review.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {pageType.charAt(0).toUpperCase() + pageType.slice(1)}{" "}
                Grievances ({grievances.length})
              </h3>
              <div className="grid gap-6">
                {grievances.map((grievance) => (
                  <div
                    key={grievance.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-${color}-100 rounded-full flex items-center justify-center`}
                        >
                          <FileText className={`w-5 h-5 text-${color}-600`} />
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
                      >
                        {grievance.issuse_type}
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
                      {pageType === "new" && (
                        <>
                          <button
                            className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 text-sm`}
                          >
                            Review
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                            Accept
                          </button>
                          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm">
                            Redirect
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Reject
                          </button>
                        </>
                      )}
                      {pageType === "pending" && (
                        <>
                          <button
                            className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 text-sm`}
                          >
                            View
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                            Resolve
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Reject
                          </button>
                        </>
                      )}
                      {(pageType === "resolved" || pageType === "rejected") && (
                        <button
                          className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 text-sm`}
                        >
                          View Details
                        </button>
                      )}
                      {pageType === "review" && (
                        <>
                          <button
                            className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 text-sm`}
                          >
                            Review
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Request Changes
                          </button>
                        </>
                      )}
                      {pageType === "redirect" && (
                        <>
                          <button
                            className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 text-sm`}
                          >
                            View
                          </button>
                          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm">
                            Redirect
                          </button>
                        </>
                      )}
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

export default GenericGrievancePage;
