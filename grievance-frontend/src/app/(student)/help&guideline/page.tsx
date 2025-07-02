"use client";
import { HelpCircle, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function HelpGuidelinePage() {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Help & Guidelines
          </h1>
          <p className="text-gray-600">
            Find answers, best practices, and resources for submitting and tracking grievances.
          </p>
        </div>

        {/* Guidelines Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-orange-100 shadow-sm">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Submission Guidelines</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm">
            <li>Clearly describe your grievance with all relevant details.</li>
            <li>Attach supporting documents or images if available.</li>
            <li>Choose the correct category for faster resolution.</li>
            <li>Do not submit duplicate grievances for the same issue.</li>
            <li>Check your email regularly for updates from the admin team.</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">How do I submit a new grievance?</h3>
              <p className="text-gray-600 text-sm">
                Go to the dashboard and click "Lodge New Grievance". Fill in the required details and submit.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">How can I track my grievance status?</h3>
              <p className="text-gray-600 text-sm">
                Use the "Track Grievance" option on your dashboard to view real-time updates.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Who can I contact for urgent help?</h3>
              <p className="text-gray-600 text-sm">
                Refer to the "Important Contacts" section on your dashboard for emergency numbers.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-green-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-gray-800 font-medium">Still need help?</span>
          </div>
          <Link
            href="mailto:support@university.edu"
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 text-sm font-medium shadow-md hover:shadow-lg"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}