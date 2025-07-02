import { NextResponse } from "next/server";

const programMap: Record<number, string> = {
  10028: "B.Tech Computer Science Engineering",
  10029: "B.Tech Electronics and Communication Engineering",
  10030: "B.Tech Mechanical Engineering",
  10031: "B.Tech Civil Engineering",
  10032: "B.Tech Electrical Engineering",
};

const campusMap: Record<number, string> = {
  1021: "Dwarka Campus",
  1022: "GBPant Campus-1",
  1023: "South Campus",
  1024: "West Campus",
  1025: "East Campus",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const programid = Number(searchParams.get("programid"));
  const campusid = Number(searchParams.get("campusid"));

  const programName = programMap[programid] || "Unknown Program";
  const campusName = campusMap[campusid] || "Unknown Campus";

  return NextResponse.json({
    programid,
    programName,
    campusid,
    campusName,
  });
}

