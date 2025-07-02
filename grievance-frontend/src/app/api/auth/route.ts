// import { NextRequest, NextResponse } from "next/server";

// // Mock auth data - This will be replaced with real authentication later
// const mockAuthData = {
//   isAuthenticated: true,
//   userType: "student", // or "admin"
//   userId: "22041528", // roll number for student, adminId for admin
// };

// export async function GET() {
//   try {
//     // Simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // This will be replaced with actual session/token validation
//     return NextResponse.json(mockAuthData);
//   } catch (error) {
//     console.error("Error in auth:", error);
//     return NextResponse.json(
//       {
//         isAuthenticated: false,
//         error: "Failed to authenticate user",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { rollNo, password } = await request.json();
//     const res = await fetch(
//       "https://grievanceportal.vercel.app/api/v1/users/auth/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNo, password }),
//       }
//     );
//     const data = await res.json();
//     if (!res.ok) {
//       return NextResponse.json(
//         { message: data.message || "Login failed" },
//         { status: res.status }
//       );
//     }

//     // Determine userType
//     let userType = "student";
//     if (data.isAdmin || data.role === "admin") {
//       userType = "admin";
//     }

//     // Return only userId and userType
//     return NextResponse.json({
//       userId: data.userId || data.rollNo || data.adminId, // adapt to your API response
//       userType,
//     });
//   } catch (error) {
//     console.error("Error in auth login:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
