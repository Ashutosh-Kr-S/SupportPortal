import { NextResponse } from "next/server";
import { grievanceCategories } from "@/types/grievance-types";

export async function GET() {
  try {
    // Sort the subject arrays alphabetically before returning
    const sortedCategories = grievanceCategories.map((category) => ({
      ...category,
      subject: [...category.subject].sort((a, b) => a.localeCompare(b)),
    }));

    return NextResponse.json({ grievanceCategories: sortedCategories });
  } catch (error) {
    console.error("Error fetching grievance types:", error);
    return NextResponse.json(
      { error: "Failed to fetch grievance types" },
      { status: 500 }
    );
  }
}
