"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  User,
  School,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Paperclip,
  Eye,
  RefreshCcw,
  TrendingUp,
  AlertTriangle,
  Info,
  Download,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Types for the tracking data
type TimelineEntry = {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actor_type: "student" | "admin" | "system";
  description: string;
  status?: string;
  attachments?: string[];
  notes?: string;
};

type GrievanceTrackingData = {
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
    history: TimelineEntry[];
    attachments: any[];
  };
  timeline: TimelineEntry[];
  current_status: string;
  progress_percentage: number;
  estimated_resolution?: string;
  assigned_admin?: {
    name: string;
    role: string;
    contact: string;
  };
};

type ApiResponse = {
  message: string;
  data: GrievanceTrackingData;
  success: boolean;
};

const TrackGrievance = () => {
  useAuthRedirect();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuth();
  
  const grievanceId = searchParams.get("id");
  
  const [trackingData, setTrackingData] = useState<GrievanceTrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!grievanceId) {
      setError("No grievance ID provided");
      setLoading(false);
      return;
    }

    fetchTrackingData();
  }, [grievanceId, token]);

  const fetchTrackingData = async (attempt = 0) => {
    try {
      if (attempt === 0) {
        setLoading(true);
      } else {
        setIsRetrying(true);
      }
      setError(null);

      if (!token) {
        throw new Error("No authentication token found");
      }

      // For now, we'll use mock data since the API endpoint might not exist yet
      // In a real implementation, this would be the actual API call:
      // const response = await fetch(
      //   `https://grievanceportal.vercel.app/api/v1/grievances/track/${grievanceId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      const mockTrackingData: GrievanceTrackingData = {
        issue_id: grievanceId || "",
        grievance_details: {
          id: 1,
          issue_id: grievanceId || "",
          rollno: "22041520",
          campus: "Main Campus",
          subject: "Library WiFi Connectivity Issue",
          description: "The WiFi in the library is frequently disconnecting, making it difficult to study and access online resources.",
          issue_type: "ACADEMIC",
          status: "IN_PROGRESS",
          attachment: "true",
          date_time: "2024-01-15T10:30:00Z",
        },
        responses_and_work: {
          responses: [],
          history: [],
          attachments: [],
        },
        timeline: [
          {
            id: "1",
            timestamp: "2024-01-15T10:30:00Z",
            action: "SUBMITTED",
            actor: "Student",
            actor_type: "student",
            description: "Grievance submitted successfully",
            status: "SUBMITTED",
            notes: "Initial submission with attachment"
          },
          {
            id: "2",
            timestamp: "2024-01-15T14:20:00Z",
            action: "ACKNOWLEDGED",
            actor: "System",
            actor_type: "system",
            description: "Grievance acknowledged and assigned to IT Department",
            status: "ACKNOWLEDGED",
            notes: "Auto-assigned based on issue category"
          },
          {
            id: "3",
            timestamp: "2024-01-16T09:15:00Z",
            action: "UNDER_REVIEW",
            actor: "Admin Kumar",
            actor_type: "admin",
            description: "Admin has started reviewing the grievance",
            status: "UNDER_REVIEW",
            notes: "Assigned to IT infrastructure team for assessment"
          },
          {
            id: "4",
            timestamp: "2024-01-16T15:45:00Z",
            action: "INVESTIGATION_STARTED",
            actor: "Tech Team Lead",
            actor_type: "admin",
            description: "Technical investigation initiated",
            status: "IN_PROGRESS",
            notes: "Network infrastructure team has been notified. Site visit scheduled for tomorrow."
          },
          {
            id: "5",
            timestamp: "2024-01-17T11:30:00Z",
            action: "UPDATE_PROVIDED",
            actor: "Network Admin",
            actor_type: "admin",
            description: "Progress update: Network equipment inspection completed",
            status: "IN_PROGRESS",
            notes: "Found issues with router configuration. Ordering replacement equipment. Expected resolution in 2-3 days."
          }
        ],
        current_status: "IN_PROGRESS",
        progress_percentage: 65,
        estimated_resolution: "2024-01-20T17:00:00Z",
        assigned_admin: {
          name: "Dr. Rajesh Kumar",
          role: "IT Department Head",
          contact: "rajesh.kumar@university.edu"
        }
      };

      setTrackingData(mockTrackingData);
      setRetryCount(0);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      
      if (attempt < 2) {
        const nextAttempt = attempt + 1;
        setRetryCount(nextAttempt);
        setTimeout(() => {
          fetchTrackingData(nextAttempt);
        }, nextAttempt * 1000);
      } else {
        setError("Failed to load grievance tracking data. Please try again later.");
        setRetryCount(attempt);
      }
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "RESOLVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "IN_PROGRESS":
      case "UNDER_REVIEW":
      case "INVESTIGATION_STARTED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "SUBMITTED":
      case "ACKNOWLEDGED":
      case "PENDING":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getTimelineIcon = (action: string) => {
    switch (action.toUpperCase()) {
      case "SUBMITTED":
        return <FileText className="w-4 h-4" />;
      case "ACKNOWLEDGED":
        return <CheckCircle className="w-4 h-4" />;
      case "UNDER_REVIEW":
        return <Eye className="w-4 h-4" />;
      case "INVESTIGATION_STARTED":
      case "IN_PROGRESS":
        return <TrendingUp className="w-4 h-4" />;
      case "UPDATE_PROVIDED":
        return <MessageSquare className="w-4 h-4" />;
      case "RESOLVED":
        return <CheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTimelineColor = (action: string, actorType: string) => {
    if (actorType === "system") return "bg-gray-500";
    
    switch (action.toUpperCase()) {
      case "SUBMITTED":
        return "bg-blue-500";
      case "ACKNOWLEDGED":
        return "bg-green-500";
      case "UNDER_REVIEW":
      case "INVESTIGATION_STARTED":
        return "bg-purple-500";
      case "UPDATE_PROVIDED":
        return "bg-orange-500";
      case "RESOLVED":
        return "bg-green-600";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleManualRetry = () => {
    setRetryCount(0);
    setError(null);
    fetchTrackingData();
  };

  if (!grievanceId) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Invalid Request
            </h2>
            <p className="text-red-600 mb-4">No grievance ID provided for tracking.</p>
            <Link
              href="/history"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/history"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to History
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">Track Grievance</h1>
            </div>
            
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
              <p className="text-gray-600 text-lg">Loading grievance details...</p>
              {retryCount > 0 && (
                <p className="text-sm text-blue-600">
                  {isRetrying ? `Retrying... (attempt ${retryCount + 1})` : `Attempted ${retryCount} time${retryCount > 1 ? 's' : ''}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/history"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to History
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">Track Grievance</h1>
            </div>
            
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Unable to Load Tracking Data
                </h3>
                <p className="text-red-600 mb-4 text-sm leading-relaxed">{error}</p>
                {retryCount > 0 && (
                  <p className="text-xs text-red-500 mb-4">
                    Failed after {retryCount} attempt{retryCount > 1 ? 's' : ''}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleManualRetry}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </button>
                  <Link
                    href="/history"
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Grievance Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The grievance with ID "{grievanceId}" could not be found.
            </p>
            <Link
              href="/history"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/history"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to History
            </Link>
            <button
              onClick={handleManualRetry}
              className="flex items-center px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <RefreshCcw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-600">
                Track Grievance
              </h1>
              <p className="text-gray-600">
                ID: {trackingData.issue_id}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{trackingData.progress_percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${trackingData.progress_percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Current Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Current Status:</span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(trackingData.current_status)}`}>
                {trackingData.current_status.replace('_', ' ')}
              </span>
            </div>
            {trackingData.estimated_resolution && (
              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                Est. Resolution: {new Date(trackingData.estimated_resolution).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                Timeline & Progress
              </h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {trackingData.timeline.map((entry, index) => (
                    <div key={entry.id} className="relative flex items-start">
                      {/* Timeline dot */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${getTimelineColor(entry.action, entry.actor_type)} z-10`}>
                        {getTimelineIcon(entry.action)}
                      </div>
                      
                      {/* Content */}
                      <div className="ml-6 flex-1">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">
                              {entry.action.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDate(entry.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 text-sm mb-2">
                            {entry.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {entry.actor}
                                <span className="ml-1 text-xs text-gray-500">
                                  ({entry.actor_type})
                                </span>
                              </span>
                            </div>
                            
                            {entry.status && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(entry.status)}`}>
                                {entry.status.replace('_', ' ')}
                              </span>
                            )}
                          </div>
                          
                          {entry.notes && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                              <p className="text-sm text-blue-800">
                                <Info className="w-4 h-4 inline mr-1" />
                                {entry.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grievance Details */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Info className="w-5 h-5 text-blue-600 mr-2" />
                Grievance Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Subject</h4>
                  <p className="text-gray-600 text-sm">{trackingData.grievance_details.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {trackingData.grievance_details.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="flex items-center gap-1 text-gray-500 mb-1">
                      <User className="w-3 h-3" />
                      Roll No.
                    </span>
                    <span className="font-medium text-gray-700">
                      {trackingData.grievance_details.rollno}
                    </span>
                  </div>
                  
                  <div>
                    <span className="flex items-center gap-1 text-gray-500 mb-1">
                      <School className="w-3 h-3" />
                      Campus
                    </span>
                    <span className="font-medium text-gray-700">
                      {trackingData.grievance_details.campus}
                    </span>
                  </div>
                  
                  <div>
                    <span className="flex items-center gap-1 text-gray-500 mb-1">
                      <FileText className="w-3 h-3" />
                      Type
                    </span>
                    <span className="font-medium text-gray-700">
                      {trackingData.grievance_details.issue_type}
                    </span>
                  </div>
                  
                  <div>
                    <span className="flex items-center gap-1 text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Submitted
                    </span>
                    <span className="font-medium text-gray-700">
                      {new Date(trackingData.grievance_details.date_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {trackingData.grievance_details.attachment === "true" && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Attachment</span>
                      <button className="flex items-center px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <Paperclip className="w-3 h-3 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assigned Admin */}
            {trackingData.assigned_admin && (
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 text-green-600 mr-2" />
                  Assigned Admin
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {trackingData.assigned_admin.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {trackingData.assigned_admin.role}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <a
                      href={`mailto:${trackingData.assigned_admin.contact}`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {trackingData.assigned_admin.contact}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  href="/history"
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View All Grievances
                </Link>
                
                <Link
                  href="/grievance/lodge"
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Lodge New Grievance
                </Link>
                
                <button
                  onClick={handleManualRetry}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackGrievance;
