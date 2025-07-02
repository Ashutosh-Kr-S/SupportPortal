"use client";
import { CircleUserRound, Mail, Phone, User, IdCard, Building2 } from "lucide-react";

const dummyAdmin = {
  name: "Priya Singh",
  adminId: "ADM2025",
  email: "priya.singh@dseu.ac.in",
  phone: "+91 9876543211",
  role: "Super Admin",
  campus: "G. B. Pant Okhla Campus - I",
  department: "Administration",
};

export default function AdminProfilePage() {
  // In real use, replace dummyAdmin with actual admin data from context or API
  const profile = dummyAdmin;
  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-5 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-24 h-24 bg-white/10 rounded-full p-1 backdrop-blur-sm">
              <div className="w-full h-full bg-gradient-to-br from-white/90 to-white/50 rounded-full flex items-center justify-center">
                <CircleUserRound className="w-16 h-16 text-blue-700" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <div className="mt-1.5 space-y-0.5">
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-blue-100">
                  <IdCard className="w-4 h-4" />
                  <span className="text-sm">{profile.adminId}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-blue-100">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{profile.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <InfoCard title="Contact Information" icon={<Mail className="w-5 h-5" />}>
            <ProfileField icon={<Mail />} label="Email" value={profile.email} />
            <ProfileField icon={<Phone />} label="Phone" value={profile.phone} />
          </InfoCard>

          {/* Work Information */}
          <InfoCard title="Work Information" icon={<Building2 className="w-5 h-5" />}>
            <ProfileField icon={<Building2 className="w-5 h-5 text-blue-500" />} label="Campus" value={profile.campus} />
            <ProfileField icon={<User className="w-5 h-5 text-blue-500" />} label="Department" value={profile.department} />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface ProfileFieldProps {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}

function InfoCard({ title, icon, children }: Readonly<InfoCardProps>) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-700">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function ProfileField({ label, value, icon }: Readonly<ProfileFieldProps>) {
  return (
    <div className="flex items-center gap-3 group px-3 py-2 hover:bg-blue-50/50 rounded-lg transition-colors">
      {icon && (
        <div className="text-blue-700 w-5 h-5">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500 mb-0.5">{label}</p>
        <p className="text-gray-900 truncate">{value ?? "-"}</p>
      </div>
    </div>
  );
}