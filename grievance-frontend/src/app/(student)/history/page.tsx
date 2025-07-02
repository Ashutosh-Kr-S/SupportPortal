"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Hourglass,
  Search,
  X,
  FileText,
  User,
  Calendar,
  Paperclip,
  Info,
  School,
  FileX,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Updated type to match the new API response structure
type GrievanceResponse = {
  issue_id: string;
  grievance_details: {
    id: number;
    issue_id: string;
    rollno: string;
    campus: string;
    subject: string;
    description: string;
    issue_type: string;
    status: string;
    attachment: string | null;
    date_time: string;
  };
  responses_and_work: {
    responses: any[];
    history: any[];
    attachments: any[];
  };
};

type ApiResponse = {
  message: string;
  data: GrievanceResponse[];
  total_grievances: number;
  success: boolean;
};

const History = () => {
  useAuthRedirect();

  const [allGrievances, setAllGrievances] = useState<GrievanceResponse[]>([]);
  const [grievances, setGrievances] = useState<GrievanceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedGrievance, setExpandedGrievance] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { token, user } = useAuth();

  const toggleAccordion = (id: string) => {
    setExpandedGrievance(expandedGrievance === id ? null : id);
  };

  const handleTrack = (id: string) => {
    // Add tracking functionality here
    console.log("Tracking grievance:", id);
  };

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          "https://grievanceportal.vercel.app/api/v1/grievances/my-grievances",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();

        if (apiResponse.success) {
          setAllGrievances(apiResponse.data);
          setGrievances(apiResponse.data);
        } else {
          throw new Error(apiResponse.message || "Failed to fetch grievances");
        }
      } catch (error) {
        console.error("Error fetching grievances:", error);
        setError("Failed to load grievance history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchGrievances();
    } else {
      setLoading(false);
      setError("Please login to view your grievance history.");
    }
  }, [token]);

  useEffect(() => {
    // Live filter as user types, but do not show error if none
    if (searchQuery.trim() === "") {
      setGrievances(allGrievances);
      return;
    }
    const filtered = allGrievances.filter((g) =>
      g.grievance_details.subject
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())
    );
    setGrievances(filtered);
    // Do not set error here
  }, [searchQuery, allGrievances]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a subject to search.");
      return;
    }
    // Only show error if no matches when Search is clicked
    if (grievances.length === 0) {
      setError("No grievances found matching the subject.");
    } else {
      setError(null);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setGrievances(allGrievances);
    setError(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
      case "IN PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg px-6 py-6 flex flex-col items-center max-w-xs w-full">
          <AlertTriangle className="w-7 h-7 text-blue-500 mb-2" />
          <p className="text-gray-700 text-center mb-4 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
            aria-label="Refresh"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-6 mb-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-600">
              Grievance History
            </h2>
          </div>

          {/* Search Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by Subject..."
                className="pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            </div>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="bg-white/80 text-blue-600 px-4 py-2.5 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm flex items-center"
              >
                <X className="w-4 h-4 mr-1" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Grievances Grid */}
        {grievances.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-600 text-lg">No grievances found</p>
            <Link
              href="/grievance/lodge"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Lodge a New Grievance
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {grievances.map((grievance) => (
              <div
                key={grievance.issue_id}
                className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Grievance Card Header */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-800">
                          {grievance.grievance_details.subject}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            grievance.grievance_details.status
                          )}`}
                        >
                          {grievance.grievance_details.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <span>{grievance.grievance_details.issue_id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>
                            {new Date(
                              grievance.grievance_details.date_time
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4 text-blue-400" />
                          <span>{grievance.grievance_details.campus}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-400" />
                          <span>{grievance.grievance_details.rollno}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        onClick={() => handleTrack(grievance.issue_id)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                      >
                        <Hourglass className="w-4 h-4 mr-1" />
                        Track
                      </button>
                      <button
                        onClick={() => toggleAccordion(grievance.issue_id)}
                        className="text-blue-500 hover:text-blue-600 flex items-center text-sm font-medium"
                      >
                        Details
                        <svg
                          className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                            expandedGrievance === grievance.issue_id
                              ? "rotate-180"
                              : ""
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
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedGrievance === grievance.issue_id && (
                  <div className="border-t border-blue-100 bg-blue-50/30 p-5">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Description */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4 text-blue-500" />
                          Description
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed bg-white/80 p-4 rounded-lg border border-blue-100">
                          {grievance.grievance_details.description}
                        </p>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Info className="w-4 h-4 text-blue-400" />
                          <span className="font-medium text-gray-700">
                            Type:
                          </span>
                          <span className="text-gray-600">
                            {grievance.grievance_details.issue_type}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span className="font-medium text-gray-700">
                            Submitted:
                          </span>
                          <span className="text-gray-600">
                            {new Date(
                              grievance.grievance_details.date_time
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          {grievance.grievance_details.attachment === "true" ? (
                            <>
                              <Paperclip className="w-4 h-4 text-blue-500" />
                              <button
                                className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                                onClick={() =>
                                  window.open(
                                    grievance.grievance_details.attachment!,
                                    "_blank"
                                  )
                                }
                              >
                                View Attachment
                              </button>
                            </>
                          ) : (
                            <>
                              <FileX className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500 text-sm">
                                No attachment
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
