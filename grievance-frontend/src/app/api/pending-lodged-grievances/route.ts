import { NextResponse } from "next/server";

//define type for grievance
export type Grievance = {
  rollno: string;
  issueId: string;
  subject: string;
  description: string;
  issueType: 'Academic' | 'Non-Academic' | 'Examination';
  status: "Pending";
  date: Date;
  time: Date;
  attachment: boolean;
};

const grievances: Grievance[] = [
  {   
    rollno: "22041520",
    issueId: "G12345",
    subject: "Delay in Result Declaration",
    description: "The results for the last semester have not been declared yet.",
    issueType: "Academic",
    status: "Pending",
    date: new Date("2023-10-01"),
    time: new Date("2023-10-01T10:00:00"),
    attachment: false,
  },
  {
    rollno: "22041521",
    issueId: "G12346",
    subject: "Poor Infrastructure in Labs",
    description: "The labs are not well-equipped for practicals.",
    issueType: "Academic",
    status: "Pending",
    date: new Date("2023-09-15"),
    time: new Date("2023-09-15T11:00:00"),
    attachment: true,
  },
  {
    rollno: "22041522",
    issueId: "G12347",
    subject: "Misbehavior by Faculty",
    description: "A faculty member was rude during a class.",
    issueType: "Non-Academic",
    status: "Pending",
    date: new Date("2023-10-05"),
    time: new Date("2023-10-05T09:30:00"),
    attachment: false,
  },
  {
    rollno: "22041523",
    issueId: "G12348",
    subject: "Delay in Scholarship Disbursement",
    description: "The scholarship for this semester has not been credited yet.",
    issueType: "Examination",
    status: "Pending",
    date: new Date("2023-10-10"),
    time: new Date("2023-10-10T14:00:00"),
    attachment: true,
  },
  {
    rollno: "22041524",
    issueId: "G12349",
    subject: "Unfair Exam Practices",
    description: "There were instances of favoritism during the last exam.",
    issueType: "Academic",
    status: "Pending",
    date: new Date("2023-09-20"),
    time: new Date("2023-09-20T12:00:00"),
    attachment: false,
  },
  {
    rollno: "22041525",
    issueId: "G12350",
    subject: "Lack of Extracurricular Activities",
    description: "There are no events or activities planned for this semester.",
    issueType: "Examination",
    status: "Pending",
    date: new Date("2023-10-12"),
    time: new Date("2023-10-12T15:00:00"),
    attachment: true,
  },
  {
    rollno: "22041526",
    issueId: "G12351",
    subject: "Library Book Availability",
    description: "Many required books are not available in the library.",
    issueType: "Academic",
    status: "Pending",
    date: new Date("2023-10-15"),
    time: new Date("2023-10-15T08:00:00"),
    attachment: false,
  },
  {
    rollno: "22041527",
    issueId: "G12352",
    subject: "Canteen Food Quality",
    description: "The food quality in the canteen has deteriorated.",
    issueType: "Non-Academic",
    status: "Pending",
    date: new Date("2023-09-25"),
    time: new Date("2023-09-25T13:00:00"),
    attachment: true,
  },{
    rollno: "22041528",
    issueId: "G12353",
    subject: "Internet Connectivity Issues",
    description: "The internet connection on campus is frequently down.",
    issueType: "Academic",
    status: "Pending",
    date: new Date("2023-10-20"),
    time: new Date("2023-10-20T16:00:00"),
    attachment: false,
  },{
    rollno: "22041529",
    issueId: "G12354",
    subject: "Hostel Maintenance Issues",
    description: "There are several maintenance issues in the hostel rooms.",
    issueType: "Non-Academic",
    status: "Pending",
    date: new Date("2023-10-22"),
    time: new Date("2023-10-22T17:00:00"),
    attachment: true,
  }
];


export async function GET(request: Request) {
  return NextResponse.json(grievances);
}
export async function POST(request: Request) {
  try {
    const grievance: Grievance = await request.json();

    if (!grievance.rollno || !grievance.issueId || !grievance.subject) {
      return NextResponse.json(
        { error: "Roll number, issue ID, and subject are required." },
        { status: 400 }
      );
    }

    grievances.push(grievance);
    return NextResponse.json({ message: "Grievance lodged successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error lodging grievance:", error);
    return NextResponse.json({ error: "Failed to lodge grievance." }, { status: 500 });
  }
}


    
