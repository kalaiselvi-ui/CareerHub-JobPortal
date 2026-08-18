import React from "react";

export interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = (status || "").toLowerCase();

  // Mapping keys normalized to lowercase so string casing won't cause broken badges
  const styles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-rose-50 text-rose-700 border-rose-200",
    draft: "bg-slate-100 text-slate-700 border-slate-200",
    // Application Statuses
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
    applied: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const badgeStyle =
    styles[normalized] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${badgeStyle}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
