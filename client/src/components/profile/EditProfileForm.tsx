import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileSchema,
  type EditProfileSchemaType,
} from "../../schemas/profileSchema"; // Adjust path to your schema
import type { AdminProfile } from "../../pages/admin/Profile";
import { userMutation } from "../../mutations/userMutation.ts";
import toast from "react-hot-toast";

interface EditProfileFormProps {
  profile: AdminProfile;
  onSave: (updatedProfile: AdminProfile) => void;
  onCancel: () => void;
}

export function EditProfileForm({
  profile,
  onSave,
  onCancel,
}: EditProfileFormProps) {
  // Initialize React Hook Form with Zod resolver & initial values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      bio: profile.bio || "",
    },
  });

  const { updateProfileMutation } = userMutation();

  const onSubmit = (data: EditProfileSchemaType) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("location", data.location || "");
    formData.append("bio", data.bio || "");

    updateProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success("Profile updated successfully!");
        onSave({
          ...profile,
          ...data.data,
        });
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update profile.",
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          {...register("fullName")}
          className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phone")}
            className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          rows={3}
          {...register("bio")}
          className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark resize-none"
        />
        {errors.bio && (
          <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
        <button
          type="button"
          onClick={onCancel}
          disabled={updateProfileMutation.isPending}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-surface-light rounded-lg transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}{" "}
        </button>
      </div>
    </form>
  );
}
