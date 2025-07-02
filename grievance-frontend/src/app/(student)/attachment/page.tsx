"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import { Upload, FileText, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"

const AttachmentPage = () => {
  useAuthRedirect()
  
  const { token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string>("")
  const [issueId, setIssueId] = useState<string>("")
  const [rollNo, setRollNo] = useState<string>("")
  const [isReattachment, setIsReattachment] = useState<boolean>(false) // use when get from admin

  useEffect(() => {
    const issue_id = searchParams.get('issue_id')
    const rollno = searchParams.get('rollno')
    
    if (!issue_id || !rollno) {
      setError("Missing required parameters. Please go back and submit a grievance first.")
      return
    }
    
    setIssueId(issue_id)
    setRollNo(rollno)
  }, [searchParams])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file extension
      const fileName = file.name.toLowerCase()
      if (!fileName.endsWith('.pdf')) {
        setError("Please select a PDF file only. File must have .pdf extension.")
        return
      }
      
      // Validate MIME type
      if (file.type !== 'application/pdf') {
        setError("Please select a PDF file only. Invalid file type detected.")
        return
      }
      
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB.")
        return
      }
      
      // Additional validation: Check if file is empty
      if (file.size === 0) {
        setError("Please select a non-empty PDF file.")
        return
      }
      
      setSelectedFile(file)
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !token || !issueId || !rollNo) {
      setError("Please select a file and ensure you are logged in.")
      return
    }

    setUploading(true)
    setError("")

    try {
      // Create FormData and append fields
      const formData = new FormData()
      formData.append("attachment", selectedFile)
      formData.append("issue_id", issueId)
      formData.append("rollno", rollNo)

      const response = await fetch("https://grievanceportal.vercel.app/api/v1/attachments/upload", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          // Do NOT set Content-Type here; browser will set it automatically for FormData
        },
        body: formData,
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to upload attachment.")
      }

      setSuccess(true)
      setSelectedFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
      
    } catch (err: unknown) {
      console.error("Error uploading file:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Upload failed: ${errorMessage}`)
    } finally {
      setUploading(false)
    }
  }

  const handleBackToForm = () => {
    router.push('/lodge')
  }

  if (error && !issueId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-lg font-semibold text-slate-900">Error</h1>
          </div>
          <p className="text-sm text-slate-600 mb-4">{error}</p>
          <button
            onClick={handleBackToForm}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Grievance Form
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Upload Attachment</h1>
              <p className="text-slate-600 mt-1">
                {isReattachment 
                  ? "Add additional supporting documents to your grievance" 
                  : "Add supporting documents to your grievance (optional)"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Grievance Details */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Grievance Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Issue ID</p>
                <p className="text-sm font-medium text-slate-900">{issueId}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Roll Number</p>
                <p className="text-sm font-medium text-slate-900">{rollNo}</p>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="p-6">
            <div className="space-y-6">
              {/* File Selection */}
              <div>
                <label htmlFor="file-input" className="block text-sm font-semibold text-slate-900 mb-2">
                  Select File {!isReattachment && <span className="text-slate-500">(Optional)</span>}
                </label>
                <div className="relative">
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={uploading}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Only PDF files are allowed. Maximum file size: 2MB
                </p>
              </div>

              {/* Selected File Display */}
              {selectedFile && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">{selectedFile.name}</p>
                    <p className="text-xs text-green-700">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Attachment uploaded successfully!</p>
                    <p className="text-xs text-green-700">Your file has been attached to the grievance.</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    !selectedFile || uploading
                      ? "bg-slate-400 text-slate-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Attachment
                    </>
                  )}
                </button>
                
                {!isReattachment && (
                  <button
                    onClick={handleBackToForm}
                    title="Go back to grievance form"
                    className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> {isReattachment 
              ? "You can upload multiple attachments for the same grievance." 
              : "Attachments are optional when filing a grievance. You can upload supporting documents later if needed."
            } 
            Each file should be a PDF document and under 2MB in size.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AttachmentPage
