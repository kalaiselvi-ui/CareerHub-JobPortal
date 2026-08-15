import React, { type ReactNode } from "react";
import { type LucideIcon, FolderOpen, Plus } from "lucide-react";

export interface EmptyStateProps {
  /** Main heading text */
  title?: string;
  /** Subtitle/description text */
  description?: string;
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Background color for the icon container (e.g. "bg-blue-50") */
  iconBgColor?: string;
  /** Icon color class (e.g. "text-blue-600") */
  iconColor?: string;
  /** Label for the primary action button */
  actionLabel?: string;
  /** Click handler for the action button */
  onAction?: () => void;
  /** Choose between dashed or solid border style */
  borderStyle?: "solid" | "dashed";
  /** Optional custom React node for action buttons (replaces default button) */
  customAction?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "You haven't posted any jobs yet.",
  description = "Start attracting candidates by creating your first job posting.",
  icon: Icon = FolderOpen,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600",
  actionLabel = "Post Your First Job",
  onAction,
  borderStyle = "dashed",
  customAction,
}) => {
  const borderClass =
    borderStyle === "dashed"
      ? "border-dashed border-gray-300"
      : "border-border-subtle";

  return (
    <div
      className={`rounded-xl border ${borderClass} bg-white p-12 text-center shadow-sm w-full`}
    >
      {/* Icon Circle */}
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor} ${iconColor}`}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Heading */}
      <h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
          {description}
        </p>
      )}

      {/* Actions */}
      {(onAction || customAction) && (
        <div className="mt-6">
          {customAction ? (
            customAction
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>{actionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
