"use client";
import React from "react";
import {
  CircleUserRound,
  Mail,
  Phone,
  User,
  IdCard,
  Building2,
  ShieldCheck,
  Calendar,
  MapPin,
  Award,
  Settings,
  Edit,
  Download
} from "lucide-react";

const dummyCampusAdmin = {
  name: "Aditya Sharma",
  adminId: "CAMPUS2025",
  email: "aditya.sharma@dseu.ac.in",
  phone: "+91 9876512345",
  role: "Campus Admin",
  campus: "DSEU Okhla Campus",
  department: "Campus Administration",
  joinDate: "July 2022",
  lastLogin: "Today, 10:30 AM",
  permissions: 45,
  managedUsers: 350
};

export default function CampusAdminProfilePage() {
  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-purple-800 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Enhanced Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-full p-1 backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-white/90 to-white/70 rounded-full flex items-center justify-center shadow-inner">
                  <CircleUserRound className="w-24 h-24 text-blue-700" />
                </div>
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {dummyCampusAdmin.name}
                </h1>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2 text-blue-100 mb-4">
                <span className="flex items-center justify-center md:justify-start gap-2">
                  <IdCard className="w-5 h-5" />
                  <span className="text-lg font-medium">{dummyCampusAdmin.adminId}</span>
                </span>
                <span className="flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-lg font-medium">{dummyCampusAdmin.role}</span>
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{dummyCampusAdmin.permissions}</div>
                  <div className="text-sm text-blue-200">Permissions</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{dummyCampusAdmin.managedUsers}</div>
                  <div className="text-sm text-blue-200">Managed Users</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/20">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/20">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <InfoCard 
            title="Contact Information" 
            icon={<Mail className="w-5 h-5" />}
            gradient="from-blue-500 to-blue-600"
          >
            <ProfileField icon={<Mail />} label="Email Address" value={dummyCampusAdmin.email} />
            <ProfileField icon={<Phone />} label="Phone Number" value={dummyCampusAdmin.phone} />
          </InfoCard>

          {/* Work Information */}
          <InfoCard 
            title="Work Information" 
            icon={<Building2 className="w-5 h-5" />}
            gradient="from-purple-500 to-purple-600"
          >
            <ProfileField icon={<Building2 />} label="Campus" value={dummyCampusAdmin.campus} />
            <ProfileField icon={<User />} label="Department" value={dummyCampusAdmin.department} />
          </InfoCard>

          {/* Activity Information */}
          <InfoCard 
            title="Activity Information" 
            icon={<Calendar className="w-5 h-5" />}
            gradient="from-green-500 to-green-600"
          >
            <ProfileField icon={<Calendar />} label="Join Date" value={dummyCampusAdmin.joinDate} />
            <ProfileField icon={<MapPin />} label="Last Login" value={dummyCampusAdmin.lastLogin} />
          </InfoCard>
        </div>

        {/* Enhanced Privileges Card */}
        <InfoCard 
          title="Administrative Privileges" 
          icon={<ShieldCheck className="w-5 h-5" />}
          gradient="from-red-500 to-red-600"
          fullWidth
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                System Management
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Manage campus users and roles
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Access campus data
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Configure campus settings
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                User Management
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Oversee campus grievance process
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Approve/reject campus applications
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Generate campus reports
                </li>
              </ul>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient?: string;
  fullWidth?: boolean;
}

function InfoCard({ title, icon, children, gradient = "from-blue-500 to-blue-600", fullWidth = false }: Readonly<InfoCardProps>) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${fullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 bg-gradient-to-r ${gradient} rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}

function ProfileField({ label, value, icon }: Readonly<ProfileFieldProps>) {
  return (
    <div className="flex items-center gap-4 group px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-100/50">
      {icon && (
        <div className="text-blue-600 w-5 h-5 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900 font-medium truncate">{value ?? "-"}</p>
      </div>
    </div>
  );
}
