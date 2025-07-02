"use client"
import { useEffect, useState, type FormEvent } from "react"
import Captcha from "../Captcha"
import { FileText, AlertCircle, CheckCircle, Upload } from "lucide-react"
import { GrievanceCategory } from "../../types/grievance-types"
import { useAuth } from "@/context/AuthContext"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import { useRouter } from "next/navigation"

const GrievanceForm = () => {
  useAuthRedirect()
  
  const { token } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<GrievanceCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [grievanceTypes, setGrievanceTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [captchaReset, setCaptchaReset] = useState(false)
  const [responseData, setResponseData] = useState<{ issue_id?: string; rollno?: string }>({})

  const academicKeywords = [
    "attendance", "syllabus", "marks", "assignment", "scholarship", "certificate", "fee",
    "class", "lecture", "professor", "teacher", "coursework", "grade", "result", "project", "lab", "internal", "midterm", "semester"
  ];
  const examinationKeywords = [
    "exam", "examination", "revaluation", "result", "paper", "course", "admit card", "supplementary", "backlog", "retotaling", "rechecking", "marksheet", "hall ticket"
  ];

  function detectCategory(type: string): "Academic" | "Non-Academic" | "Examination" | "Optional" | "" {
    const normalized = type.trim().toLowerCase();
  
    // Helper to check for whole word matches
    const matchesKeyword = (keywords: string[]) =>
      keywords.some(keyword => {
        const pattern = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'i');
        return pattern.test(normalized);
      });
  
    if (matchesKeyword(examinationKeywords)) return "Examination";
    else if (matchesKeyword(academicKeywords)) return "Academic";
    else return "Non-Academic";
  
    // Fallback: partial match (if no exact match found)
    // const partialMatch = (keywords: string[]) =>
    //   keywords.some(keyword => normalized.includes(keyword.toLowerCase()));
  
    // if (partialMatch(examinationKeywords)) return "Examination";
    // if (partialMatch(academicKeywords)) return "Academic";
    // if (partialMatch(nonAcademicKeywords)) return "Non-Academic";
  
    // return "";
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/grievance-types");
        const data = await res.json();
        setCategories(data.grievanceCategories);
      } catch (error) {
        console.error("Error fetching grievance types:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryObj = categories.find(
      (cat) => cat.issueType.toLowerCase() === selectedCategory.toLowerCase()
    );
    setGrievanceTypes(categoryObj ? categoryObj.subject : []);
    setSelectedType(""); // Reset type when category changes
  }, [selectedCategory, categories]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert("Please verify the CAPTCHA first.")
      return
    }

    if (!token) {
      alert("You must be logged in to submit a grievance.");
      return;
    }

    setSubmitting(true)
    try {
      let issueTypeToSend;

      // Only run detection if the selected category is 'Academic' or 'Optional'.
      if (selectedCategory === "Academic" || selectedCategory === "Optional") {
        issueTypeToSend = detectCategory(selectedType);
      } else {
        // For other categories (like 'Non-Academic'), use the selected category directly.
        issueTypeToSend = selectedCategory;
      }

      // Create a plain JavaScript object for the request body.
      const requestBody = {
        campus: 'G.B Pant DSEU Okhala-1',
        subject: selectedType,
        description: description,
        issue_type: issueTypeToSend.toUpperCase(),
        attachment: false // Always false since we're not handling attachments here
      };
      
      console.log("Body (JSON):", JSON.stringify(requestBody, null, 2));

      const res = await fetch("https://grievanceportal.vercel.app/api/v1/grievances", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify(requestBody), // Send the JSON string
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit grievance.");
      }

      console.log("Grievance submitted successfully:", data);

      // Store the response data for later attachment submission
      setResponseData({
        issue_id: data.data?.issuse_id,
        rollno: data.data?.rollno
      });

      setSuccess(true)
      setSelectedCategory("")
      setSelectedType("")
      setDescription("")
      setCaptchaVerified(false)
      setCaptchaReset(r => !r)
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      alert(`Error submitting form: ${errorMessage}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleAttachmentUpload = () => {
    if (responseData.issue_id && responseData.rollno) {
      router.push(`/attachment?issue_id=${responseData.issue_id}&rollno=${responseData.rollno}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Grievance Submission Portal</h1>
              <p className="text-slate-600 mt-1">Submit your concerns and feedback through this secure form</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="divide-y divide-slate-200">

            {/* Category Selection */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <label htmlFor="grievanceCategory" className="block text-sm font-semibold text-slate-900 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500">Select the type of grievance</p>
                </div>
                <div className="md:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Academic", "Non-Academic", "Optional"].map((category) => (
                      <label
                        key={category}
                        className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="grievanceCategory"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                          required
                        />
                        <span className="ml-3 text-sm font-medium text-slate-900">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Type */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <label htmlFor="grievanceType" className="block text-sm font-semibold text-slate-900 mb-1">
                    Subject Type <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500">Specify the nature of your grievance</p>
                </div>
                <div className="md:col-span-3">
                  {(() => {
                    let content = null;
                    if (loading) {
                      content = (
                        <div className="flex items-center gap-2 text-slate-500">
                          <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
                          Loading grievance types...
                        </div>
                      );
                    } else if (selectedCategory === "") {
                      content = (
                        <div className="flex items-center gap-2 text-slate-500 p-3 bg-slate-50 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          Please select a category first
                        </div>
                      );
                    } else if (grievanceTypes.length === 0) {
                      content = (
                        <input
                          type="text"
                          id="grievanceType"
                          name="grievanceType"
                          placeholder="Enter your grievance type"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          required
                        />
                      );
                    } else {
                      content = (
                        <select
                          id="grievanceType"
                          name="grievanceType"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          required
                        >
                          <option value="" disabled className="text-sm text-slate-500 ">
                            Select a grievance type
                          </option>
                          {grievanceTypes.map((type) => (
                            <option key={type} value={type} className="text-sm">
                              {type}
                            </option>
                          ))}
                        </select>
                      );
                    }
                    return content;
                  })()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Provide detailed information about your grievance (max 4000 characters)
                  </p>
                </div>
                <div className="md:col-span-3">
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    maxLength={4000}
                    placeholder="Please describe your grievance in detail..."
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-slate-500">{description.length}/4000 characters</div>
                    <div className={`text-xs ${description.length > 3800 ? "text-orange-600" : "text-slate-500"}`}>
                      {4000 - description.length} remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <label htmlFor="captcha" className="block text-sm font-semibold text-slate-900 mb-1">
                    Verification <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500">Complete the security verification</p>
                </div>
                <div className="md:col-span-3">
                  <Captcha onVerify={setCaptchaVerified} isEnabled={true} reset={captchaReset} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-6 bg-slate-50">
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    submitting || !captchaVerified
                      ? "bg-slate-400 text-slate-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                  }`}
                  disabled={submitting || !captchaVerified}
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting Grievance...
                    </div>
                  ) : (
                    "Submit Grievance"
                  )}
                </button>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="p-6 bg-green-50 border-t border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-green-900">Grievance Submitted Successfully</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Your grievance has been recorded. You will receive a confirmation email with your reference number
                      shortly.
                    </p>
                    {responseData.issue_id && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>Issue ID:</strong> {responseData.issue_id}
                          {responseData.rollno && (
                            <span className="ml-4">
                              <strong>Roll No:</strong> {responseData.rollno}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Use these details to upload attachments later if needed.
                        </p>
                        <button
                          onClick={handleAttachmentUpload}
                          className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Attachment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> All grievances are reviewed by the appropriate authorities. You will receive updates
            on the status of your submission via email. For urgent matters, please contact the administration directly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GrievanceForm