// import { NextRequest, NextResponse } from "next/server";

// const students = [
//   {
//     rollno: "22041520",
//     name: "AKHIL SINGH",
//     father: "RAVINDRA SINGH",
//     mother: "RITU VERMA",
//     aadhar: "628375000000",
//     category: "OBC-NCL",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "9818242131",
//     email: "akhilsingh3862@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041521",
//     name: "AMAAN",
//     father: "AAS MOHAMMAD KHAN",
//     mother: "SHAISTA PRAVEEN",
//     aadhar: "341037000000",
//     category: "OBC-NCL",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "9990672081",
//     email: "amaansaifi42574@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041522",
//     name: "AMAAN KHAN",
//     father: "NAEEM KHAN",
//     mother: "NAZMEEN",
//     aadhar: "404987000000",
//     category: "GENERAL",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "8375984441",
//     email: "pathanboy4441@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041523",
//     name: "AMRESH KUMAR",
//     father: "MUKUND KUMAR SINGH",
//     mother: "RASHMI DEVI",
//     aadhar: "580309000000",
//     category: "GEN-EWS",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "9608235590",
//     email: "rashmidevi8527@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041524",
//     name: "ANAND KUMAR",
//     father: "SUNIL KUMAR SINGH",
//     mother: "ABHA SINGH",
//     aadhar: "412792000000",
//     category: "GEN-EWS",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "8800570318",
//     email: "anandjitech@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041525",
//     name: "ANANT SINGH",
//     father: "SHAILESH SINGH",
//     mother: "PRIYANKA SINGH",
//     aadhar: "424157000000",
//     category: "GENERAL",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "9319848690",
//     email: "rajs002ssp@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041526",
//     name: "ANIVESH KUMAR",
//     father: "ANIL KUMAR",
//     mother: "RINKU DEVI",
//     aadhar: "853286000000",
//     category: "GENERAL",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "9354770955",
//     email: "br9354770955@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041527",
//     name: "ANJALI",
//     father: "JAYANT KUMAR",
//     mother: "POONAM KUMARI",
//     aadhar: "542453000000",
//     category: "GENERAL",
//     gender: "Female",
//     lateral_entry: false,
//     mobile: "8700110417",
//     email: "duttanjali78@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041528",
//     name: "ANKITA SINGH",
//     father: "AMARDEV SINGH",
//     mother: "MEERA SINGH",
//     aadhar: "233810000000",
//     category: "GENERAL",
//     gender: "Female",
//     lateral_entry: false,
//     mobile: "8882959375",
//     email: "ankita722005@gmail.com",
//     year: 2024,
//   },
//   {
//     rollno: "22041529",
//     name: "ANSUMAN PANDA",
//     father: "PRADEEP KUMAR PANDA",
//     mother: "ANURAKTA PANDA",
//     aadhar: "196513000000",
//     category: "GENERAL",
//     gender: "Male",
//     lateral_entry: false,
//     mobile: "8860404852",
//     email: "ansuman.hk7377@gmail.com",
//     year: 2024,
//   },
// ];

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const rollno = searchParams.get("rollno");
//   const student = students.find(s => s.rollno === rollno);
//   return NextResponse.json(student); // Not the whole array!
// }

// export async function POST(request: Request) {
//   try {
//     const studentInfo: StudentInfo = await request.json();

//     if (!studentInfo.rollno || !studentInfo.name) {
//       return NextResponse.json(
//         { error: "Roll number and name are required." },
//         { status: 400 }
//       );
//     }

//     // Here you would typically save the student info to a database
//     // For this example, we will just return the received data
//     return NextResponse.json({
//       message: "Student information received successfully.",
//       studentInfo,
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid JSON or request body." },
//       { status: 400 }
//     );
//   }
// }


