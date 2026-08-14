import React from "react";
import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

export interface QuickActionProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  to?: string;
  onClick?: () => void;
  iconBgColor?: string;
  iconColor?: string;
}

export const QuickActionButton: React.FC<QuickActionProps> = ({
  title,
  description,
  icon: Icon,
  to,
  onClick,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
}) => {
  const content = (
    <div className="flex items-start gap-4 w-full">
      <div
        className={`rounded-lg p-3 ${iconBgColor} ${iconColor} transition-colors shrink-0`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-left">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        {description && (
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );

  const containerClasses =
    "flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-xs hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md transition-all cursor-pointer group w-full";

  if (to) {
    return (
      <Link to={to} className={containerClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={containerClasses}>
      {content}
    </button>
  );
};

export default QuickActionButton;
