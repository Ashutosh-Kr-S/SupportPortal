'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface GrievanceDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  dateSubmitted: string;
  category: string;
}

export default function GrievanceDetailsPage() {
  const params = useParams();
  const [grievance, setGrievance] = useState<GrievanceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // Fetch grievance details by ID
      // This is a placeholder - replace with actual API call
      setGrievance({
        id: params.id as string,
        title: 'Sample Grievance',
        description: 'This is a sample grievance description.',
        status: 'Pending',
        dateSubmitted: new Date().toISOString(),
        category: 'Academic'
      });
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!grievance) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Grievance Not Found</h1>
          <p className="text-gray-600">The requested grievance could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">Grievance Details</h1>
            <p className="text-blue-100">ID: {grievance.id}</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                  {grievance.title}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  grievance.status === 'Pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : grievance.status === 'Resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {grievance.status}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                  {grievance.category}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Submitted
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                  {new Date(grievance.dateSubmitted).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="text-gray-900 bg-gray-50 p-4 rounded-md min-h-32">
                {grievance.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}