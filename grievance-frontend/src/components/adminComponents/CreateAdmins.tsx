"use client";
import React, { useState, useCallback, useMemo } from "react";
import {
  X,
  User,
  Shield,
  Building2,
  AlertCircle,
  MapPin,
  Search,
  ChevronDown,
} from "lucide-react";
import { campuses } from "../../types/AllCampus"; // Adjust the import path as needed

interface CreateAdminsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface AdminFormData {
  nameOrEmail: string;
  role: string;
  campusId: number;
  isMainCampus: boolean;
}

const CreateAdmins: React.FC<CreateAdminsProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Individual useStates for each field
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [inputType, setInputType] = useState<"name" | "email">("name");
  const [role, setRole] = useState("academic");
  const [campusId, setCampusId] = useState(1011);
  const [isMainCampus, setIsMainCampus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<AdminFormData>>({});

  // Search functionality states
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Dummy data for suggestions - Indian names and emails
  const dummyNames = [
    "Arjun Sharma",
    "Priya Patel",
    "Vikram Singh",
    "Sneha Gupta",
    "Rajesh Kumar",
    "Kavya Reddy",
    "Amit Agarwal",
    "Pooja Mehta",
    "Rohit Verma",
    "Ananya Joshi",
    "Karan Malhotra",
    "Shreya Kapoor",
    "Nikhil Shah",
    "Rhea Nair",
    "Arun Pillai",
    "Isha Bansal",
    "Siddharth Rao",
    "Tanvi Jain",
    "Varun Iyer",
    "Meera Srinivasan",
    "Aryan Khanna",
    "Diya Chopra",
    "Manish Tiwari",
    "Kritika Bhatia",
    "Abhishek Dubey",
    "Nisha Pandey",
    "Ravi Chandra",
    "Sakshi Mishra",
    "Deepak Yadav",
    "Ritika Aggarwal",
  ];

  const dummyEmails = [
    "arjun.sharma@university.edu",
    "priya.patel@university.edu",
    "vikram.singh@university.edu",
    "sneha.gupta@university.edu",
    "rajesh.kumar@university.edu",
    "kavya.reddy@university.edu",
    "amit.agarwal@university.edu",
    "pooja.mehta@university.edu",
    "rohit.verma@university.edu",
    "ananya.joshi@university.edu",
    "karan.malhotra@university.edu",
    "shreya.kapoor@university.edu",
    "nikhil.shah@university.edu",
    "rhea.nair@university.edu",
    "arun.pillai@university.edu",
    "isha.bansal@university.edu",
    "siddharth.rao@university.edu",
    "tanvi.jain@university.edu",
    "varun.iyer@university.edu",
    "meera.srinivasan@university.edu",
    "aryan.khanna@university.edu",
    "diya.chopra@university.edu",
    "manish.tiwari@university.edu",
    "kritika.bhatia@university.edu",
    "abhishek.dubey@university.edu",
    "nisha.pandey@university.edu",
    "ravi.chandra@university.edu",
    "sakshi.mishra@university.edu",
    "deepak.yadav@university.edu",
    "ritika.aggarwal@university.edu",
  ];

  // Role options (only academic, exam, campus)
  const roles = [
    { value: "campus", label: "Campus" },
    { value: "academic", label: "Academic" },
    { value: "exam", label: "Examination" },
    { value: "non-academic", label: "Non-Academic " },
  ];

  // Search functionality
  const handleSearchChange = (value: string) => {
    setNameOrEmail(value);
    setSearchTerm(value);

    if (value.length > 0) {
      const suggestions = inputType === "name" ? dummyNames : dummyEmails;
      const filtered = suggestions
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions for performance

      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNameOrEmail(suggestion);
    setSearchTerm(suggestion);
    setShowDropdown(false);
    setFilteredSuggestions([]);

    // Clear any existing errors
    if (errors.nameOrEmail) {
      setErrors((prev) => ({
        ...prev,
        nameOrEmail: undefined,
      }));
    }
  };

  const handleInputTypeChange = (newType: "name" | "email") => {
    setInputType(newType);
    setNameOrEmail("");
    setSearchTerm("");
    setShowDropdown(false);
    setFilteredSuggestions([]);

    // Clear any existing errors
    if (errors.nameOrEmail) {
      setErrors((prev) => ({
        ...prev,
        nameOrEmail: undefined,
      }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<AdminFormData> = {};

    if (!nameOrEmail.trim()) {
      newErrors.nameOrEmail = "Name or Email is required";
    } else if (inputType === "name" && nameOrEmail.trim().length < 2) {
      newErrors.nameOrEmail = "Name must be at least 2 characters";
    } else if (
      inputType === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nameOrEmail)
    ) {
      newErrors.nameOrEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes (for text fields)
  const handleInputChange = (
    field: keyof AdminFormData,
    value: string | number | boolean
  ) => {
    switch (field) {
      case "nameOrEmail":
        setNameOrEmail(value as string);
        break;
      case "role":
        setRole(value as string);
        break;
      case "campusId":
        setCampusId(value as number);
        break;
      case "isMainCampus":
        setIsMainCampus(value as boolean);
        break;
      default:
        break;
    }
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Handle campus selection
  const handleCampusChange = (campusId: number) => {
    const selectedCampus = campuses.find((c) => c.id === campusId);
    setCampusId(campusId);
    setIsMainCampus(selectedCampus?.isMain || false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare the API payload according to your specified structure
      const payload = {
        [inputType]: nameOrEmail.trim(),
        role: role,
        department: role === "academic" ? "academic" : role,
        campusId: campusId,
        isMainCampus: isMainCampus,
      };

      console.log("Creating admin with payload:", payload);

      // Make API call to create admin
      const response = await fetch(
        "https://grievanceportal.vercel.app/api/v1/super-admin/admins",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create admin");
      }

      const result = await response.json();
      console.log("Admin created successfully:", result); // Success - show notification and close modal
      alert("Admin created successfully!");

      // Reset all fields
      setNameOrEmail("");
      setInputType("name");
      setRole("academic");
      setCampusId(1011);
      setIsMainCampus(false);
      setSearchTerm("");
      setShowDropdown(false);
      setFilteredSuggestions([]);

      // Clear any existing errors
      setErrors({});

      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      console.error("Error creating admin:", error);
      alert(
        (error as Error)?.message || "Failed to create admin. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4 h-screen">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Create New Admin
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Add a new administrator to manage campus operations
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Name or Email Field with Search */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {inputType === "name" ? "Full Name" : "Email Address"} *
                </label>
                <div className="flex gap-2">
                  <select
                    value={inputType}
                    onChange={(e) =>
                      handleInputTypeChange(e.target.value as "name" | "email")
                    }
                    className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                  </select>
                  <div className="relative flex-1">
                    <div className="relative">
                      <input
                        type={inputType === "email" ? "email" : "text"}
                        value={nameOrEmail}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onFocus={() => {
                          if (filteredSuggestions.length > 0) {
                            setShowDropdown(true);
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding dropdown to allow clicking on suggestions
                          setTimeout(() => setShowDropdown(false), 200);
                        }}
                        className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                          errors.nameOrEmail
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder={
                          inputType === "name"
                            ? "Search or enter full name..."
                            : "Search or enter email address..."
                        }
                        autoComplete="off"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Search Dropdown */}
                    {showDropdown && filteredSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {filteredSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 focus:bg-purple-50 focus:text-purple-700 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center">
                              {inputType === "name" ? (
                                <User className="w-4 h-4 mr-2 text-gray-400" />
                              ) : (
                                <div className="w-4 h-4 mr-2 text-gray-400">
                                  @
                                </div>
                              )}
                              <span className="text-sm">{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {errors.nameOrEmail && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nameOrEmail}
                  </p>
                )}

                {/* Show suggestion count when typing */}
                {searchTerm &&
                  filteredSuggestions.length > 0 &&
                  !showDropdown && (
                    <p className="mt-1 text-xs text-gray-500">
                      {filteredSuggestions.length} suggestion
                      {filteredSuggestions.length !== 1 ? "s" : ""} available
                    </p>
                  )}
              </div>
            </div>
          </div>

          {/* Administrative Details Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-600" />
              Administrative Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Administrative Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  Campus Assignment *
                </label>
                <select
                  value={campusId}
                  onChange={(e) => handleCampusChange(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  {campuses.map((campus) => (
                    <option key={campus.id} value={campus.id}>
                      {campus.name} ({campus.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campus Status Indicator */}
            <div className="mt-4 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Campus Type:
                <span
                  className={`ml-1 font-medium ${
                    isMainCampus ? "text-purple-600" : "text-blue-600"
                  }`}
                >
                  {isMainCampus ? "Main Campus" : "Branch Campus"}
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -m-6 mt-6 rounded-b-2xl">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Admin...
                  </div>
                ) : (
                  "Create Admin Account"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmins;
