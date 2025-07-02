// Grievance Service for different admin roles
export interface Grievance {
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
  attachments?: Array<{
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

export interface ApiResponse {
  success: boolean;
  data: Grievance[];
  total: number;
  message: string;
}

// Helper function to check browser environment
function checkBrowserEnvironment() {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser");
  }
}

// Helper function to get auth headers
function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

// Base API URL
const BASE_URL = "https://grievanceportal.vercel.app/api/v1";

// Campus Admin API calls
export async function getCampusAdminNewGrievances() {
  checkBrowserEnvironment();
  const response = await fetch(`${BASE_URL}/campus-admin/new-grievances`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch campus admin new grievances");
  }
  return response.json();
}

export async function getCampusAdminPendingGrievances() {
  checkBrowserEnvironment();
  const response = await fetch(`${BASE_URL}/campus-admin/pending-grievances`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch campus admin pending grievances");
  }
  return response.json();
}

export async function getCampusAdminResolvedGrievances() {
  checkBrowserEnvironment();
  const response = await fetch(`${BASE_URL}/campus-admin/resolved-grievances`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch campus admin resolved grievances");
  }
  return response.json();
}

export async function getCampusAdminRejectedGrievances() {
  checkBrowserEnvironment();
  const response = await fetch(`${BASE_URL}/campus-admin/rejected-grievances`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch campus admin rejected grievances");
  }
  return response.json();
}

// Campus Department (Academic, Exam, Non-Academic) API calls
export async function getCampusDeptNewGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/campus-${deptType}/new-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch campus ${deptType} new grievances`);
  }
  return response.json();
}

export async function getCampusDeptPendingGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/campus-${deptType}/pending-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch campus ${deptType} pending grievances`);
  }
  return response.json();
}

export async function getCampusDeptResolvedGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/campus-${deptType}/resolved-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch campus ${deptType} resolved grievances`);
  }
  return response.json();
}

export async function getCampusDeptRejectedGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/campus-${deptType}/rejected-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch campus ${deptType} rejected grievances`);
  }
  return response.json();
}

export async function getCampusDeptReviewGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/campus-${deptType}/review-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch campus ${deptType} review grievances`);
  }
  return response.json();
}

export async function getCampusDeptRedirectGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/campus-${deptType}/redirect-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch campus ${deptType} redirect grievances`);
  }
  return response.json();
}

// University Department API calls
export async function getUniversityDeptNewGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/university-${deptType}/new-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch university ${deptType} new grievances`);
  }
  return response.json();
}

export async function getUniversityDeptPendingGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/university-${deptType}/pending-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch university ${deptType} pending grievances`
    );
  }
  return response.json();
}

export async function getUniversityDeptResolvedGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/university-${deptType}/resolved-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch university ${deptType} resolved grievances`
    );
  }
  return response.json();
}

export async function getUniversityDeptRejectedGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/university-${deptType}/rejected-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch university ${deptType} rejected grievances`
    );
  }
  return response.json();
}

export async function getUniversityDeptReviewGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/university-${deptType}/review-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch university ${deptType} review grievances`);
  }
  return response.json();
}

export async function getUniversityDeptRedirectGrievances(deptType: string) {
  checkBrowserEnvironment();
  const response = await fetch(
    `${BASE_URL}/university-${deptType}/redirect-grievances`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch university ${deptType} redirect grievances`
    );
  }
  return response.json();
}

// Dummy data for fallback when APIs are not available
export const getDummyGrievances = (
  status: string,
  issueType?: string
): Grievance[] => {
  const baseGrievances: Grievance[] = [
    {
      id: 1,
      issuse_id: "GRV001",
      rollno: "22041520",
      campus: "Dwarka Campus",
      subject: "Grade Discrepancy in Mathematics",
      description:
        "There seems to be an error in my mathematics grade calculation. I believe my grade should be higher based on my performance.",
      issuse_type: "ACADEMIC",
      status: status as any,
      attachment: "transcript.pdf",
      date: "2024-07-01T10:30:00Z",
      responses: [],
      history: [],
    },
    {
      id: 2,
      issuse_id: "GRV002",
      rollno: "22041521",
      campus: "South Campus",
      subject: "Hostel Room Maintenance Issue",
      description:
        "The air conditioning in my hostel room has not been working for the past week. Multiple complaints have been made but no action taken.",
      issuse_type: "NON-ACADEMIC",
      status: status as any,
      attachment: "",
      date: "2024-07-02T14:15:00Z",
      responses: [],
      history: [],
    },
    {
      id: 3,
      issuse_id: "GRV003",
      rollno: "22041522",
      campus: "East Campus",
      subject: "Exam Schedule Conflict",
      description:
        "I have two exams scheduled at the same time. This creates a conflict and I need to reschedule one of them.",
      issuse_type: "EXAMINATION",
      status: status as any,
      attachment: "exam_schedule.pdf",
      date: "2024-07-01T09:00:00Z",
      responses: [],
      history: [],
    },
    {
      id: 4,
      issuse_id: "GRV004",
      rollno: "22041523",
      campus: "West Campus",
      subject: "Library Access Issues",
      description:
        "Unable to access digital library resources. Getting authentication errors when trying to log in.",
      issuse_type: "ACADEMIC",
      status: status as any,
      attachment: "",
      date: "2024-07-03T11:45:00Z",
      responses: [],
      history: [],
    },
    {
      id: 5,
      issuse_id: "GRV005",
      rollno: "22041524",
      campus: "Dwarka Campus",
      subject: "Fee Payment Issues",
      description:
        "Payment gateway is not working properly. I've attempted multiple times to pay my semester fees but the transaction keeps failing.",
      issuse_type: "NON-ACADEMIC",
      status: status as any,
      attachment: "payment_receipt.pdf",
      date: "2024-07-02T16:20:00Z",
      responses: [],
      history: [],
    },
  ];

  if (issueType && issueType !== "all") {
    return baseGrievances.filter(
      (g) => g.issuse_type === issueType.toUpperCase()
    );
  }

  return baseGrievances;
};
