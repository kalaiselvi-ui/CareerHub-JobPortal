import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import type {
  Application,
  ApplicationStatus,
} from "../../type/application.type";
import { useUpdateApplicationStatus } from "../../mutations/applicationMutation.ts";

interface ApplicationDetailsProps {
  application: Application | null;
  onClose: () => void;
  onStatusChange?: (id: string, newStatus: ApplicationStatus) => void;
}

export const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  onClose,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(
    application?.status || "pending",
  );

  // Hook handles mutation and loading state directly
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();

  // Synchronize local state whenever application prop updates
  useEffect(() => {
    if (application) {
      setSelectedStatus(application.status);
    }
  }, [application]);

  if (!application) return null;

  const hasStatusChanged = selectedStatus !== application.status;

  const handleSave = () => {
    if (hasStatusChanged) {
      updateStatus(
        { applicationId: application.id, status: selectedStatus },
        {
          onSuccess: () => {
            if (onStatusChange) {
              onStatusChange(application.id, selectedStatus);
            }
            onClose();
          },
        },
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 2. Solid Modal Container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
            {application.candidateName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {application.candidateName}
            </h3>
            <p className="text-sm text-gray-600">{application.headline}</p>
          </div>
        </div>

        {/* Contact & Status Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong className="text-gray-900">Email:</strong>{" "}
            {application.email}
          </p>
          <p>
            <strong className="text-gray-900">Phone:</strong>{" "}
            {application.phone || "N/A"}
          </p>
          <p>
            <strong className="text-gray-900">Applied Job:</strong>{" "}
            {application.jobTitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <label className="font-semibold text-gray-900">
              Application Status:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as ApplicationStatus)
              }
              className="bg-gray-50 text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="applied">Applied</option>
              <option value="viewed">Viewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Bio / About */}
        {application.bio && (
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-gray-900">About</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {application.bio}
            </p>
          </div>
        )}

        {/* Skills */}
        {application.skills && application.skills.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-900">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasStatusChanged || isUpdating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Status
          </button>
        </div>
      </div>
    </div>
  );
};
