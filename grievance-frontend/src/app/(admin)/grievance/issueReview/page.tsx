"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { campuses } from "@/types/AllCampus";
import {
  FileText,
  Calendar,
  User,
  Building,
  AlertCircle,
  ArrowLeft,
  Download,
  FileCheck,
  Paperclip,
  CheckCircle,
  XCircle,
  RotateCcw,
  Send,
  ChevronDown,
  Eye,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Type definitions
interface Grievance {
  id: number;
  issuse_id: string;
  rollno: string;
  campus: string;
  subject: string;
  description: string;
  issuse_type: "ACADEMIC" | "NON-ACADEMIC" | "EXAMINATION";
  status: "NEW" | "PENDING" | "RESOLVED" | "REJECTED";
  attachment: string;
  date: string;
  responses: any[];
  history: any[];
  attachments: Array<{
    id: number;
    issuse_id: number;
    filename: string;
    filepath: string;
    uploadedby: string;
    uploadedat: string;
    createdat: string;
    updatedat: string;
    originalfilename: string;
    mimetype: string;
    filesize: number;
  }>;
}

interface ApiResponse {
  success: boolean;
  data: Grievance;
  message: string;
}

const IssueReviewPage = () => {
  useAuthRedirect();

  const { user, userType, token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const grievanceId = searchParams.get("id");

  const [grievance, setGrievance] = useState<Grievance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Action dropdown states
  const [showRedirectDropdown, setShowRedirectDropdown] = useState(false);

  // Redirect form states
  const [redirectRole, setRedirectRole] = useState("");
  const [redirectCampus, setRedirectCampus] = useState("");

  // Review box state
  const [reviewText, setReviewText] = useState("");

  // Helper to check if current admin is superadmin
  const isSuperAdmin =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some(
      (r: string) =>
        r.toLowerCase() === "super_admin" || r.toLowerCase() === "superadmin"
    );

  useEffect(() => {
    if (!isSuperAdmin) {
      setError("Access denied. Only super admins can review grievances.");
      setLoading(false);
      return;
    }

    if (!grievanceId) {
      setError("No grievance ID provided.");
      setLoading(false);
      return;
    }

    fetchGrievance();
  }, [isSuperAdmin, grievanceId]);

  const fetchGrievance = async () => {
    try {
      setLoading(true);

      // Mock data for testing UI - remove when real API is available
      const mockGrievance: Grievance = {
        id: 1,
        issuse_id: grievanceId || "ISSUE-1750859584319-8477",
        rollno: "41522063",
        campus: "G.B Pant DSEU Okhala-1",
        subject: "Scholarship Application Issue",
        description: `Hello,

I am facing issues with my scholarship application. I have submitted all the required documents but the status is not being updated. I need urgent help as the deadline is approaching.

Please look into this matter and provide a solution as soon as possible.

Thank you.`,
        issuse_type: "NON-ACADEMIC",
        status: "PENDING",
        attachment: "true",
        date: "2025-06-25T13:53:04.454Z",
        responses: [],
        history: [],
        attachments: [
          {
            id: 1,
            issuse_id: 1,
            filename: "scholarship_documents.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            uploadedby: "41522063",
            uploadedat: "2025-06-25T13:53:04.454Z",
            createdat: "2025-06-25T13:53:04.454Z",
            updatedat: "2025-06-25T13:53:04.454Z",
            originalfilename: "scholarship_documents.pdf",
            mimetype: "application/pdf",
            filesize: 102400,
          },
          {
            id: 2,
            issuse_id: 1,
            filename: "identity_proof.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            uploadedby: "41522063",
            uploadedat: "2025-06-25T14:10:15.332Z",
            createdat: "2025-06-25T14:10:15.332Z",
            updatedat: "2025-06-25T14:10:15.332Z",
            originalfilename: "identity_proof.pdf",
            mimetype: "application/pdf",
            filesize: 78912,
          },
        ],
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setGrievance(mockGrievance);
      setError(null);

      /* 
      // Uncomment this when real API is available
      const response = await fetch(
        `https://grievanceportal.vercel.app/api/v1/super-admin/grievance/${grievanceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setGrievance(data.data);
        } else {
          setError("Failed to fetch grievance details");
        }
      } else {
        setError("Failed to fetch grievance details");
      }
      */
    } catch (err) {
      console.error("Error fetching grievance:", err);
      setError("Failed to fetch grievance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "RESOLVED":
        return "bg-green-100 text-green-800 border border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "ACADEMIC":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "NON-ACADEMIC":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "EXAMINATION":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleResolve = async () => {
    setActionLoading(true);
    try {
      // API call to resolve grievance
      console.log("Resolving grievance:", {
        grievanceId,
        review: reviewText, // Include review text
      });
      // Add actual API call here
      alert("Grievance resolved successfully!");
      setReviewText(""); // Clear review after action
    } catch (error) {
      console.error("Error resolving grievance:", error);
      alert("Failed to resolve grievance. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      // API call to reject grievance
      console.log("Rejecting grievance:", {
        grievanceId,
        review: reviewText, // Include review text
      });
      // Add actual API call here
      alert("Grievance rejected successfully!");
      setReviewText(""); // Clear review after action
    } catch (error) {
      console.error("Error rejecting grievance:", error);
      alert("Failed to reject grievance. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturn = async () => {
    setActionLoading(true);
    try {
      // API call to return grievance
      console.log("Returning grievance:", {
        grievanceId,
        review: reviewText, // Include review text
      });
      // Add actual API call here
      alert("Grievance returned successfully!");
      setReviewText(""); // Clear review after action
    } catch (error) {
      console.error("Error returning grievance:", error);
      alert("Failed to return grievance. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRedirect = async () => {
    if (!redirectRole || !redirectCampus) {
      alert("Please fill in all fields for redirecting this grievance.");
      return;
    }

    setActionLoading(true);
    try {
      // API call to redirect grievance
      console.log("Redirecting grievance:", {
        grievanceId,
        role: redirectRole,
        campus: redirectCampus,
        review: reviewText, // Include review text
      });
      // Add actual API call here
      alert("Grievance redirected successfully!");
      setShowRedirectDropdown(false);
      setRedirectRole("");
      setRedirectCampus("");
      setReviewText(""); // Clear review after action
    } catch (error) {
      console.error("Error redirecting grievance:", error);
      alert("Failed to redirect grievance. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewPDF = (attachment: any) => {
    // Open PDF in new tab
    window.open(attachment.filepath, "_blank");
  };

  const closeAllDropdowns = () => {
    setShowRedirectDropdown(false);
  };

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You need super admin privileges to review grievances.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <p className="text-gray-600">Loading grievance details...</p>
        </div>
      </div>
    );
  }

  if (error || !grievance) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Grievance Review: {grievance.issuse_id}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                    grievance.status
                  )}`}
                >
                  {grievance.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeClass(
                    grievance.issuse_type
                  )}`}
                >
                  {grievance.issuse_type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Issue Details */}
          <div className="space-y-6">
            {/* Issue Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Issue Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Roll Number
                  </label>
                  <p className="text-gray-900 font-mono">{grievance.rollno}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campus
                  </label>
                  <p className="text-gray-900">
                    {grievance.campus.toUpperCase()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Submitted
                  </label>
                  <p className="text-gray-900">{formatDate(grievance.date)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Type
                  </label>
                  <p className="text-gray-900">{grievance.issuse_type}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <p className="text-gray-900 font-semibold text-lg">
                    {grievance.subject}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {grievance.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - PDF Attachments, Review Box, and Actions */}
          <div className="space-y-6">
            {/* PDF Attachments at the top */}
            {grievance.attachments.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Attachments ({grievance.attachments.length})
                </h2>

                <div className="space-y-2">
                  {grievance.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {attachment.originalfilename}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(attachment.filesize / 1024).toFixed(1)} KB • PDF
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewPDF(attachment)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review Box */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Write Review
              </h3>

              <div className="space-y-4">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review or comments about this grievance. This review will be included when you perform any action below."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                />

                <p className="text-sm text-gray-600">
                  💡 Write your review once and it will be automatically
                  included with whichever action you choose below.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Review Actions
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {/* Resolve Button */}
                <button
                  onClick={handleResolve}
                  disabled={actionLoading}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  {actionLoading ? "..." : "Resolve"}
                </button>

                {/* Reject Button */}
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  {actionLoading ? "..." : "Reject"}
                </button>

                {/* Return Button */}
                <button
                  onClick={handleReturn}
                  disabled={actionLoading}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  {actionLoading ? "..." : "Return"}
                </button>

                {/* Redirect Button */}
                <div className="relative">
                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      setShowRedirectDropdown(!showRedirectDropdown);
                    }}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center relative text-sm"
                  >
                    <div className="flex items-center gap-1">
                      <Send className="w-4 h-4" />
                      Redirect
                    </div>
                    <ChevronDown className="w-3 h-3 absolute right-2" />
                  </button>

                  {showRedirectDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                          </label>
                          <select
                            value={redirectRole}
                            onChange={(e) => setRedirectRole(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Role</option>
                            <option value="campus_admin">Campus Admin</option>
                            <option value="academic_admin">
                              Academic Admin
                            </option>
                            <option value="non_academic_admin">
                              Non-Academic Admin
                            </option>
                            <option value="examination_admin">
                              Examination Admin
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Campus
                          </label>
                          <select
                            value={redirectCampus}
                            onChange={(e) => setRedirectCampus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Campus</option>
                            {campuses.map((campus) => (
                              <option
                                key={campus.id}
                                value={campus.code.toLowerCase()}
                              >
                                {campus.code} - {campus.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={handleRedirect}
                          disabled={actionLoading}
                          className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Send className="w-3 h-3" />
                          Submit Redirect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueReviewPage;
