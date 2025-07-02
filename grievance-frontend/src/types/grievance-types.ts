export type GrievanceCategory = {
  issueType: string;
  subject: string[];
};

export const grievanceCategories: GrievanceCategory[] = [
  {
    issueType: "Academic",
    subject: [
      "Attendance of students",
      "Revaluation practices",
      "Admit card related issue",
      "Course selection issue",
      "Back Paper result issue",
      "Change of Course/Program (incorrect name)",
      "Labs related issues",
      "Delay in conduct of examination or declaration of results",
      "Request for Bonafide Certificate for Opening Bank Account,etc",
      "Permission for Registration with Pending Dues",
      "Request to provide provisional Degree Certificate within 30 days (After Completion of the Course)",
      "Request for Transcripts, Grade Card and Degree",
      "Discrepancy in Certificates/Correction in Certificates",
      "Withdrawal of admission (NEP)",
      "Personal details issue",
      "Library related issues",
      "Delay in PhD thesis evaluation",
      "PhD Scholarship/Fellowship Issues",
      "NOC application"
    ]
  },
  {
    issueType: "Non-Academic",
    subject: [
      "Bus Pass",
      "Id Card Reissue",
      "Issue with information in University Brochure",
      "Issue with information in University Website",
      "Refund of Security Fee of Academic/Hostel",
      "Hostel Req.",
      "Scholarship",
      "Fee/Late payment issues/Fine",
      "Reservation Policy in Admission",
      "Non-payment or delay in payment of scholarship to any student",
      "Harassment and victimization of students including sexual harassment",
      "Ragging",
      "Issues related to Hygiene/Maintenance/cleanliness",
      "Student welfare and sports & cultural events related"
    ]
  },
  {
    issueType: "Optional",
    subject: []
  }
];