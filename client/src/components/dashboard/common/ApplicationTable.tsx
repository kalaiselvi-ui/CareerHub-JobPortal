import React from "react";
import { Eye, Clock, User, Briefcase } from "lucide-react";
import StatusBadge from "./StatusBadge"; // Adjust import path if needed

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "rejected"
  | "accepted"
  | string;

export interface ApplicationProps {
  _id?: string;
  id?: string;
  candidateName: string;
  candidateEmail?: string;
  jobTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
}

interface ApplicationTableProps {
  applications?: ApplicationProps[];
  onNavigate?: (path: string) => void;
  onReview?: (application: ApplicationProps) => void;
  maxItems?: number;
  title?: string;
  showViewAll?: boolean;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications = [],
  onNavigate,
  onReview,
  maxItems = 5,
  title = "Recent Applications",
  showViewAll = true,
}) => {
  const safeApplications = Array.isArray(applications) ? applications : [];
  const displayedApplications = safeApplications.slice(0, maxItems);

  const handleReview = (app: ApplicationProps) => {
    if (onReview) {
      onReview(app);
    } else if (onNavigate) {
      const appId = app._id || app.id;
      onNavigate(`/api/applications/${appId}`);
    }
  };

  return (
    <div className="lg:col-span-8 bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border-subtle flex items-center justify-between">
        <h2 className="text-lg font-semibold text-surface-dark">{title}</h2>
        {showViewAll && onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate("/applications")}
            disabled={applications.length === 0}
            className="text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium text-primary hover:text-primary-hover transition-colors"
          >
            View all
          </button>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-border-subtle">
            <tr>
              <th className="py-3.5 px-4">Candidate</th>
              <th className="py-3.5 px-4">Job Title</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-slate-700">
            {displayedApplications.map((app) => {
              const appId = app._id || app.id;
              return (
                <tr
                  key={appId}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-surface-dark">
                    <div>
                      <p className="font-medium text-surface-dark">
                        {app.candidateName}
                      </p>
                      {app.candidateEmail && (
                        <p className="text-xs text-slate-400 font-normal">
                          {app.candidateEmail}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{app.jobTitle}</td>
                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                    {app.appliedDate}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleReview(app)}
                        className="px-2.5 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive View */}
      <div className="block md:hidden divide-y divide-border-subtle">
        {displayedApplications.map((app) => {
          const appId = app._id || app.id;
          return (
            <div key={appId} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-surface-dark flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {app.candidateName}
                  </h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {app.jobTitle}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Applied: {app.appliedDate}</span>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleReview(app)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
                >
                  <Eye className="w-3.5 h-3.5" /> Review Application
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTable;
