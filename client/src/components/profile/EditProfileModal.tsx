import { X } from "lucide-react";
import type { AdminProfile } from "../../pages/admin/Profile.tsx";
import { EditProfileForm } from "./EditProfileForm.tsx";

interface EditProfileModalProps {
  profile: AdminProfile;
  onClose: () => void;
  onSave: (updatedProfile: AdminProfile) => void;
}

function EditProfileModal({ profile, onClose, onSave }: EditProfileModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-border-subtle space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-surface-dark">
            Edit Admin Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <EditProfileForm profile={profile} onSave={onSave} onCancel={onClose} />
      </div>
    </div>
  );
}

export default EditProfileModal;
