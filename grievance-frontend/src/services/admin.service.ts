export async function getAllAdmins() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser");
  }

  const response = await fetch(
    "https://grievanceportal.vercel.app/api/v1/super-admin/admins",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch admins");
  }
  return response.json();
}

export async function getAllGrievance() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser");
  }

  const response = await fetch(
    "https://grievanceportal.vercel.app/api/v1/super-admin/new-grievances",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch grievances");
  }
  return response.json();
}

export async function getPendingGrievances() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser");
  }

  const response = await fetch(
    "https://grievanceportal.vercel.app/api/v1/super-admin/pending-grievances",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pending grievances");
  }
  return response.json();
}

export async function getResolvedGrievances() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser");
  }

  const response = await fetch(
    "https://grievanceportal.vercel.app/api/v1/super-admin/resolved-grievances",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch resolved grievances");
  }
  return response.json();
}

export async function getRejectedGrievances() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser");
  }

  const response = await fetch(
    "https://grievanceportal.vercel.app/api/v1/super-admin/rejected-grievances",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch rejected grievances");
  }
  return response.json();
}
