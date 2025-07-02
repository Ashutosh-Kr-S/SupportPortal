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
  issuse_type: string;
  status: string;
  date: string;
  attachments: any[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Grievance[];
}

const CampusAdminNewGrievancesPage = () => {
  useAuthRedirect();

  const { user, userType, token } = useAuth();
  const router = useRouter();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [filteredGrievances, setFilteredGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [campusFilter, setCampusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 1000;

  // Helper to check if current admin is campus admin
  const isCampusAdmin =
    userType === "admin" &&
    user &&
    Array.isArray((user as any).role) &&
    (user as any).role.some((r: string) => r.toLowerCase() === "campus admin");

  useEffect(() => {
    if (!isCampusAdmin) {
      setError("Access denied. Only campus admins can view new grievances.");
      setLoading(false);
      return;
    }

    fetchGrievances();
  }, [isCampusAdmin]);

  useEffect(() => {
    // Apply filters
    let filtered = grievances;

    // Filter by NEW status for this page
    filtered = filtered.filter((g) => g.status === "NEW");

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
          throw new Error(response.message || "Failed to fetch new grievances");
        }
      } catch (err: any) {
        console.error("Error fetching new grievances:", err);

        const errorMessage =
          err.message ||
          "Failed to fetch new grievances. Please check your connection and try again.";

        if (retryCount < MAX_RETRY_ATTEMPTS && !isRetry) {
          console.log(
            `Retrying... Attempt ${retryCount + 1}/${MAX_RETRY_ATTEMPTS}`
          );
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

  // Pagination logic
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
    router.push(`/campus/admin/review?id=${grievanceId}`);
  };

  if (!isCampusAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You need campus admin privileges to view new grievances.
          </p>
          <p className="text-sm text-gray-500">
            Current role:{" "}
            {userType === "admin" ? (user as any)?.role?.join(", ") : userType}
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
          <p className="text-gray-600 text-lg mb-2">
            Loading new grievances...
          </p>
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
          <div className="space-y-3">
            <button
              onClick={handleManualRetry}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => router.back()}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                New Grievances - Campus Admin
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and review new grievances for your campus (
                {filteredGrievances.length} total)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
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

            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="ACADEMIC">Academic</option>
                <option value="NON-ACADEMIC">Non-Academic</option>
                <option value="EXAMINATION">Examination</option>
              </select>
            </div>

            {/* Campus Filter */}
            <div>
              <select
                value={campusFilter}
                onChange={(e) => setCampusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Campuses</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.code.toLowerCase()}>
                    {campus.code} - {campus.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchGrievances()}
                disabled={isRefetching}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
                />
                {isRefetching ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* Grievances Grid */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-6 bg-gray-200 rounded w-32"></div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                      <div className="h-5 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-64 mb-1"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : currentGrievances.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No New Grievances Found
              </h3>
              <p className="text-gray-600">
                {searchTerm || typeFilter !== "all" || campusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No new grievances at the moment."}
              </p>
            </div>
          ) : (
            currentGrievances.map((grievance, index) => (
              <div
                key={grievance.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:scale-[1.01]"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "fadeInUp 0.3s ease-out forwards",
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {grievance.issuse_id}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            grievance.status
                          )}`}
                        >
                          {grievance.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(
                            grievance.issuse_type
                          )}`}
                        >
                          {grievance.issuse_type}
                        </span>
                      </div>
                      <p className="text-gray-600 font-medium mb-1">
                        {grievance.subject}
                      </p>
                    </div>
                    <button
                      onClick={() => handleReviewGrievance(grievance.issuse_id)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <FileCheck className="w-4 h-4" />
                      Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Roll No:</span>
                      <span className="font-medium">{grievance.rollno}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Campus:</span>
                      <span className="font-medium">
                        {grievance.campus.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {formatDate(grievance.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Attachments:</span>
                      <span className="font-medium">
                        {grievance.attachments.length}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {grievance.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredGrievances.length)} of{" "}
              {filteredGrievances.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusAdminNewGrievancesPage;
