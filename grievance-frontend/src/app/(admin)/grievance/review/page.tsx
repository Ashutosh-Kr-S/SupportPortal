"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllGrievance } from "@/services/admin.service";
import { campuses } from "@/types/AllCampus";
import {
  FileText,
  Calendar,
  User,
  Building,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Eye,
  FileCheck,
  Paperclip,
  Clock,
  MapPin,
  RefreshCw,
  RotateCcw,
  Loader2,
  WifiOff,
} from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  data: Grievance[];
  total: number;
  message: string;
}

const ReviewGrievancesPage = () => {
  useAuthRedirect();

  const { user, userType, token } = useAuth();
  const router = useRouter();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [filteredGrievances, setFilteredGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);

  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [campusFilter, setCampusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Constants for retry logic
  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 1000; // 1 second

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
      setError("Access denied. Only super admins can view review grievances.");
      setLoading(false);
      return;
    }
    fetchGrievances();
  }, [isSuperAdmin]);

  useEffect(() => {
    let filtered = grievances;
    if (searchTerm) {
      filtered = filtered.filter(
        (g) =>
          g.rollno.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.issuse_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter((g) => g.issuse_type === typeFilter);
    }
    if (campusFilter !== "all") {
      filtered = filtered.filter(
        (g) => g.campus.toLowerCase() === campusFilter.toLowerCase()
      );
    }
    setFilteredGrievances(filtered);
    setCurrentPage(1);
  }, [grievances, searchTerm, typeFilter, campusFilter]);

  const fetchGrievances = useCallback(
    async (isRetry = false) => {
      try {
        if (!isRetry) {
          setLoading(true);
          setError(null);
        } else {
          setIsRefetching(true);
        }
        const response: ApiResponse = await getAllGrievance();
        if (response.success) {
          setGrievances(response.data || []);
          setError(null);
          setRetryCount(0);
        } else {
          throw new Error(response.message || "Failed to fetch review grievances");
        }
      } catch (err: any) {
        const errorMessage =
          err.message ||
          "Failed to fetch review grievances. Please check your connection and try again.";
        if (retryCount < MAX_RETRY_ATTEMPTS && !isRetry) {
          setRetryCount((prev) => prev + 1);
          setTimeout(() => {
            fetchGrievances(true);
          }, RETRY_DELAY * (retryCount + 1));
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
        setIsRefetching(false);
      }
    },
    [retryCount]
  );

  const handleManualRetry = useCallback(() => {
    setRetryCount(0);
    fetchGrievances();
  }, [fetchGrievances]);

  const totalPages = Math.ceil(filteredGrievances.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGrievances = filteredGrievances.slice(startIndex, endIndex);

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

  const handleReviewGrievance = (grievanceId: string) => {
    router.push(`/grievance/issueReview?id=${grievanceId}`);
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
            You need super admin privileges to view review grievances.
          </p>
          <p className="text-sm text-gray-500">
            Current role: {userType === "admin" ? (user as any)?.role?.join(", ") : userType}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg mb-2">Loading review grievances...</p>
          {retryCount > 0 && (
            <p className="text-sm text-orange-600">
              Retrying... Attempt {retryCount}/{MAX_RETRY_ATTEMPTS}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <WifiOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          {retryCount >= MAX_RETRY_ATTEMPTS && (
            <p className="text-sm text-orange-600 mb-4">
              Failed after {MAX_RETRY_ATTEMPTS} attempts. Please check your
              internet connection.
            </p>
          )}
          <button
            onClick={handleManualRetry}
            disabled={isRefetching}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 mx-auto"
          >
            {isRefetching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Try Again
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `,
        }}
      />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Review Grievances - Super Admin View
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and review all grievances redirected to superadmin ({filteredGrievances.length} total)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, rollno, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="ACADEMIC">Academic</option>
                <option value="NON-ACADEMIC">Non-Academic</option>
                <option value="EXAMINATION">Examination</option>
              </select>
            </div>
            <div>
              <select
                value={campusFilter}
                onChange={(e) => setCampusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Campuses</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.code.toLowerCase()}>
                    {campus.code} - {campus.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentGrievances.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No grievances found.
                  </td>
                </tr>
              ) : (
                currentGrievances.map((grievance) => (
                  <tr key={grievance.id} style={{ animation: "fadeInUp 0.5s" }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grievance.issuse_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grievance.rollno}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grievance.campus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grievance.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(grievance.issuse_type)}`}>
                        {grievance.issuse_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(grievance.status)}`}>
                        {grievance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(grievance.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleReviewGrievance(grievance.issuse_id)}
                        className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" /> Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewGrievancesPage;
