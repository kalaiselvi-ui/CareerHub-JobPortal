import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Pencil,
  X,
  CheckCircle,
} from "lucide-react";
import { userMutation } from "../../mutations/userMutation.ts";

// --- TypeScript Types ---
export type AdminProfile = {
  id: string;
  fullName: string;
  email: string;
  role: "admin";
  phone: string;
  location: string;
  bio: string;
  joinedAt: string;
};

// --- Mock Admin Profile Data ---
const initialAdminProfile: AdminProfile = {
  id: "admin-001",
  fullName: "John Admin",
  email: "admin@careerhub.com",
  role: "admin",
  phone: "+971 50 123 4567",
  location: "Dubai, UAE",
  bio: "Managing the CareerHub platform and supporting users, recruiters, and job seekers.",
  joinedAt: "July 10, 2026",
};

export default function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfile>(initialAdminProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { getProfileMutation } = userMutation();

  // Generate Initials for Avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle local state edit save
  const handleSaveProfile = (updatedProfile: AdminProfile) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header */}
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

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 2. Profile Overview Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold border-2 border-primary/20 shrink-0">
              {getInitials(profile.fullName)}
            </div>

            {/* Name & Email */}
            <div className="space-y-1 w-full">
              <h2 className="text-xl font-bold text-surface-dark truncate">
                {profile.fullName}
              </h2>
              <p className="text-sm text-gray-500 truncate">{profile.email}</p>
            </div>

            {/* Role Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrator
            </span>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-border-subtle w-full">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Right Column: Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3. Personal Information Card */}
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-surface-dark border-b border-border-subtle pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
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

              {/* Email Address */}
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

              {/* Phone Number */}
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

              {/* Location */}
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

          {/* 4. About Section */}
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs space-y-3">
            <h3 className="text-base font-semibold text-surface-dark border-b border-border-subtle pb-3">
              About
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* 5. Account Information */}
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-surface-dark border-b border-border-subtle pb-3">
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Role */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Role</p>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    <ShieldCheck className="w-3 h-3" />
                    Admin
                  </span>
                </div>
              </div>

              {/* Account Status */}
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

              {/* Joined Date */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Joined Date</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-surface-dark">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{profile.joinedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Local Edit Profile Modal */}
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

// ==========================================
// Sub-component: EditProfileModal (UI Only)
// ==========================================
interface EditProfileModalProps {
  profile: AdminProfile;
  onClose: () => void;
  onSave: (updatedProfile: AdminProfile) => void;
}

function EditProfileModal({ profile, onClose, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState<AdminProfile>({ ...profile });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-border-subtle space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-surface-dark">
            Edit Admin Profile
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-surface-light rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
