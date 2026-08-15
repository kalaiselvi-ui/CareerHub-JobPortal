import {
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Clock,
  Bookmark,
  Send,
} from "lucide-react";
import type { JobProps } from "../../../type/job.type.ts";
import { formatDeadline } from "../../../utils/formatDeadline.ts";
import StatusBadge from "./StatusBadge.tsx";

export type UserRole = "admin" | "recruiter" | "user";

interface RecentJobsTableProps {
  jobs?: JobProps[];
  role?: UserRole; // 'admin' | 'recruiter' | 'user'
  onNavigate: (path: string) => void;
  onDelete?: (job: JobProps) => void;
  onApply?: (job: JobProps) => void;
  onBookmark?: (job: JobProps) => void;
  maxItems?: number;
}

export default function JobsTable({
  jobs = [],
  role,
  onNavigate,
  onDelete,
  onApply,
  onBookmark,
  maxItems = 5,
}: RecentJobsTableProps) {
  const displayedJobs = jobs.slice(0, maxItems);
  const showCompany = role === "admin" || role === "user";
  const isManagementRole = role === "admin" || role === "recruiter";

  return (
    <div className="lg:col-span-8 bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border-subtle flex items-center justify-between">
        <h2 className="text-lg font-semibold text-surface-dark">Recent Jobs</h2>
        <button
          onClick={() => onNavigate("/jobs/manage")}
          disabled={jobs.length < 5}
          className="text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View all
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-border-subtle">
            <tr>
              <th className="py-3.5 px-4">Job</th>
              {showCompany && <th className="py-3.5 px-4">Company</th>}
              <th className="py-3.5 px-4">Location</th>
              {isManagementRole && <th className="py-3.5 px-4">Status</th>}
              <th className="py-3.5 px-4">Posted</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-slate-700">
            {displayedJobs.map((job) => (
              <tr
                key={job._id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="py-4 px-4 font-medium text-surface-dark">
                  {job.title}
                </td>
                {showCompany && (
                  <td className="py-4 px-4 text-slate-600">
                    {job.company || "-"}
                  </td>
                )}
                <td className="py-4 px-4 text-slate-500">{job.location}</td>
                {isManagementRole && (
                  <td className="py-4 px-4">
                    <StatusBadge status={job.status} />
                  </td>
                )}
                <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                  {formatDeadline(job.createdAt)}
                </td>
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2 text-slate-500">
                    {/* View Details Action */}
                    <button
                      onClick={() => onNavigate(`/jobs/${job._id}`)}
                      title="View Details"
                      className="p-1.5 hover:text-primary hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Admin & Recruiter Actions */}
                    {isManagementRole && (
                      <>
                        <button
                          onClick={() => onNavigate(`/jobs/${job._id}/edit`)}
                          title="Edit"
                          className="p-1.5 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(job)}
                            title="Delete"
                            className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}

                    {/* User Actions */}
                    {role === "user" && (
                      <>
                        {onBookmark && (
                          <button
                            onClick={() => onBookmark(job)}
                            title="Bookmark"
                            className="p-1.5 hover:text-primary hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        )}
                        {onApply && (
                          <button
                            onClick={() => onApply(job)}
                            className="px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-hover transition-colors"
                          >
                            Apply
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden divide-y divide-border-subtle">
        {displayedJobs.map((job) => (
          <div key={job._id} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-surface-dark">{job.title}</h3>
                {showCompany && job.company && (
                  <p className="text-sm text-slate-600">{job.company}</p>
                )}
              </div>
              {isManagementRole && <StatusBadge status={job.status} />}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDeadline(job.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate(`/jobs/${job._id}`)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-primary"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>

              {isManagementRole ? (
                <>
                  <button
                    onClick={() => onNavigate(`/jobs/${job._id}/edit`)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-amber-600"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(job)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  )}
                </>
              ) : (
                <>
                  {onBookmark && (
                    <button
                      onClick={() => onBookmark(job)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-primary"
                    >
                      <Bookmark className="w-3.5 h-3.5" /> Bookmark
                    </button>
                  )}
                  {onApply && (
                    <button
                      onClick={() => onApply(job)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover"
                    >
                      <Send className="w-3.5 h-3.5" /> Apply
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
