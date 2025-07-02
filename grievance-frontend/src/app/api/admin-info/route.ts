// import { NextResponse } from "next/server";



// const admins: AdminInfo[] = [
//   {
//     AdminId: 1,
//     name: "Amit",
//     email: "superadmin@example.com",
//     phone: "1234567890",
//     isverified: true,
//     IsActive: true,
//     LastLogin: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     role: ["Super Admin"],
//     permissions: ["read", "write", "delete"],
//     campusId: 1021 // dwarka campus
//   },
//   {
//     AdminId: 2,
//     name: "Sumit",
//     email: "campusadmin@example.com",
//     phone: "9876543210",
//     isverified: true,
//     IsActive: true,
//     LastLogin: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     role: ["Campus Admin"],
//     permissions: ["read", "write"],
//     campusId: 1022 // GBPant Campus-1
//   },
//   {
//     AdminId: 3,
//     name: "Ravi",
//     email: "examadmin@example.com",
//     phone: "5555555555",
//     isverified: true,
//     IsActive: true,
//     LastLogin: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     role: ["Examination Admin"],
//     permissions: ["read", "write"],
//     campusId: 1022 // GBPant Campus-1
//   },
//   {
//     AdminId: 4,
//     name: "Priya",
//     email: "academicadmin@example.com"  ,
//     phone: "4444444444",
//     isverified: true,
//     IsActive: true,
//     LastLogin: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     role: ["Academic Admin"],
//     permissions: ["read", "write"],
//     campusId: 1022 // GBPant Campus-1
//   },
//   {
//     AdminId: 5,
//     name: "Anjali",
//     email: "nonacademicadmin@example.com",
//     phone: "3333333333",
//     isverified: true,
//     IsActive: true,
//     LastLogin: new Date().toISOString(),

//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     role: ["Non-Academic Admin"],
//     permissions: ["read", "write"],
//     campusId: 1022 // GBPant Campus-1
//   }
// ];

// export async function GET() {
//   try {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     return NextResponse.json({ admins });
//   } catch (error) {
//     console.error('Error fetching admin info:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch admin information' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const adminInfo: AdminInfo = await request.json();

//     if (!adminInfo.name || !adminInfo.email) {
//       return NextResponse.json(
//         { error: "Name and email are required." },
//         { status: 400 }
//       );
//     }

//     // Here you would typically save the admin info to a database
//     // For this example, we will just return the received data
//     return NextResponse.json({
//       message: "Admin information received successfully.",
//       adminInfo,
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid JSON or request body." },
//       { status: 400 }
//     );
//   }
// }


