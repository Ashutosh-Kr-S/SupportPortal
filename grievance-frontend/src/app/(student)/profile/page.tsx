"use client";
import { useAuth } from "@/context/AuthContext";
import { CircleUserRound, Mail, Phone, User, GraduationCap, MapPin, Calendar, IdCard, Building2, Users, BookOpen } from "lucide-react";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function StudentProfilePage() {
  const { user, userType } = useAuth();
  console.log('Current user:', user);  // Debug log

  // Dummy data for demonstration
  const dummyProfile = {
    name: "Aarav Sharma",
    rollno: "41522063",
    email: "btech41522063@dseu.ac.in",
    phone: "+91 9876543210",
    course: "B.Tech Computer Science",
    campus: "G. B. Pant Okhla Campus - I",
    year: "3rd Year",
    gender: "Female",
    dob: "2003-05-14",
    address: "123, Sector 10, Dwarka, New Delhi",
    father: "Rajesh Sharma",
    mother: "Sunita Sharma",
    aadhar: "XXXX-XXXX-1234",
    category: "General",
    lateral_entry: "No",
    program:"B.Tech Computer Science"
  };

  // Use real user data if available, else dummy
  const profile = (user && userType === "student") ? { ...dummyProfile, ...(user as object) } : dummyProfile;

  const getLateralEntry = () => {
    if (typeof profile.lateral_entry === "boolean") {
      return profile.lateral_entry ? "Yes" : "No";
    }
    return profile.lateral_entry;
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-24 h-24 bg-white/10 rounded-full p-1 backdrop-blur-sm">
              <div className="w-full h-full bg-gradient-to-br from-white/90 to-white/50 rounded-full flex items-center justify-center">
                <CircleUserRound className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <div className="mt-1.5 space-y-0.5">
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-blue-100">
                  <IdCard className="w-4 h-4" />
                  <span className="text-sm">{profile.rollno}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-blue-100">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{profile.course}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <InfoCard title="Contact Information" icon={<Mail className="w-5 h-5" />}>
            <ProfileField icon={<Mail />} label="Email" value={dummyProfile.email} />
            <ProfileField icon={<Phone />} label="Phone" value={dummyProfile.phone} />
            <ProfileField icon={<MapPin />} label="Address" value={dummyProfile.address} />
          </InfoCard>

          {/* Academic Information */}
          <InfoCard title="Academic Information" icon={<GraduationCap className="w-5 h-5" />}>
            <ProfileField icon={<Building2 className="w-5 h-5 text-blue-500" />} label="Campus" value={dummyProfile.campus} />
            <ProfileField icon={<GraduationCap className="w-5 h-5 text-blue-500" />} label="Program" value={dummyProfile.program} />
            <ProfileField icon={<BookOpen className="w-5 h-5 text-blue-500" />} label="Year" value={dummyProfile.year?.toString()} />
            <ProfileField icon={<IdCard className="w-5 h-5 text-blue-500" />} label="Category" value={dummyProfile.category} />
            <ProfileField icon={<BookOpen className="w-5 h-5 text-blue-500" />} label="Lateral Entry" value={getLateralEntry()} />
          </InfoCard>

          {/* Personal Information */}
          <InfoCard title="Personal Information" icon={<User className="w-5 h-5" />}>
            <ProfileField icon={<User className="w-5 h-5 text-blue-500" />} label="Gender" value={dummyProfile.gender} />
            <ProfileField icon={<Calendar className="w-5 h-5 text-blue-500" />} label="Date of Birth" value={dummyProfile.dob} />
            <ProfileField icon={<Users className="w-5 h-5 text-blue-500" />} label="Father's Name" value={dummyProfile.father} />
            <ProfileField icon={<Users className="w-5 h-5 text-blue-500" />} label="Mother's Name" value={dummyProfile.mother} />
            <ProfileField icon={<IdCard className="w-5 h-5 text-blue-500" />} label="Aadhar" value={dummyProfile.aadhar} />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, icon, children }: Readonly<InfoCardProps>) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
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

function ProfileField({ label, value, icon }: Readonly<{ label: string; value?: string; icon?: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-3 group px-3 py-2 hover:bg-blue-50/50 rounded-lg transition-colors">
      {icon && (
        <div className="text-blue-500 w-5 h-5">
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
