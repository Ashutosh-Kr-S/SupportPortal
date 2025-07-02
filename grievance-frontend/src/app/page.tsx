'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminDashboard from '../components/adminComponents/AdminDashboard';
import StudentDashboard from '../components/studentComponents/StudentDashboard';

export default function HomePage() {
  const { user, userType, loading , token , error} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user && userType) {
        // User is logged in, redirect to appropriate dashboard
        if (userType === 'student') {
          router.push('/dashboard');
        } else if (userType === 'admin') {
          router.push('/grievance/dashboard');
        }
      } else {
        // User is not logged in, redirect to login
        router.push('/login');
      }
    }
  }, [user, userType, loading, router]);

  // Show loading while determining auth state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!token) {
    // The redirect will happen in useEffect, so just render nothing here
    return null;
  }

  // let welcomeName = "";
  // if (user) {
  //   if (userType === "admin" && "name" in user) welcomeName = String(user.name);
  //   if (userType === "student" && "name" in user) welcomeName = String(user.name);
  // }

  return (
    <div>
      {/* {welcomeName && (
        <div className="p-8 pb-0">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {welcomeName}!</h1>
        </div>
      )} */}
      {userType === "admin" && <AdminDashboard />}
      {userType === "student" && <StudentDashboard />}
      {!userType && (
        <div className="p-8 text-gray-600">
          No dashboard available for your role.<br />
          <a href="/logout" className="text-blue-600 underline">Login with a different account</a>
        </div>
      )}
    </div>
  );
}
