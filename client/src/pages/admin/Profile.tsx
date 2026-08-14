import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Pencil,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import EditProfileModal from "../../components/profile/EditProfileModal.tsx";
import { useMyProfile } from "../../hooks/useUser.ts";

export type AdminProfile = {
  id: string;
  _id?: string;
  fullName: string;
  email: string;
  role: "admin";
  phone: string;
  location: string;
  bio: string;
  createdAt: string;
};

export default function AdminProfile() {
  const { data: dbProfile, isLoading, isError, error } = useMyProfile();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  console.log({ dbProfile });
  // Synchronize local state when fetched data updates
  useEffect(() => {
    if (dbProfile) {
      setProfile({
        id: dbProfile.id || dbProfile._id || "admin-001",
        fullName: dbProfile.fullName || dbProfile.name || "John Admin",
        email: dbProfile.email || "",
        role: dbProfile.role || "admin",
        phone: dbProfile.phone || "Not provided",
        location: dbProfile.location || "Not provided",
        bio: dbProfile.bio || "No bio added yet.",
        createdAt: dbProfile.createdAt
          ? new Date(dbProfile.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "N/A",
      });
    }
  }, [dbProfile]);

  const getInitials = (name: string) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveProfile = (updatedProfile: AdminProfile) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 p-6 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-gray-500">
          Loading profile details...
        </p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">
            Failed to load profile details.{" "}
            {error?.message || "Please try again."}
          </p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-dark">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account information and profile details.
          </p>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold border-2 border-primary/20 shrink-0">
              {getInitials(profile.fullName)}
            </div>

            <div className="space-y-1 w-full">
              <h2 className="text-xl font-bold text-surface-dark truncate">
                {profile.fullName}
              </h2>
              <p className="text-sm text-gray-500 truncate">{profile.email}</p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 capitalize">
              <ShieldCheck className="w-3.5 h-3.5" />
              {profile.role}
            </span>

            <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-border-subtle w-full">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Details Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-surface-dark border-b border-border-subtle pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-surface-light rounded-lg text-gray-500 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Full Name</p>
                  <p className="text-sm font-semibold text-surface-dark mt-0.5">
                    {profile.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-surface-light rounded-lg text-gray-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-surface-dark mt-0.5">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-surface-light rounded-lg text-gray-500 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-sm font-semibold text-surface-dark mt-0.5">
                    {profile.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-surface-light rounded-lg text-gray-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Location</p>
                  <p className="text-sm font-semibold text-surface-dark mt-0.5">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs space-y-3">
            <h3 className="text-base font-semibold text-surface-dark border-b border-border-subtle pb-3">
              About
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-surface-dark border-b border-border-subtle pb-3">
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Role</p>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 capitalize">
                    <ShieldCheck className="w-3 h-3" />
                    {profile.role}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">
                  Account Status
                </p>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Joined Date</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-surface-dark">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{profile.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}
