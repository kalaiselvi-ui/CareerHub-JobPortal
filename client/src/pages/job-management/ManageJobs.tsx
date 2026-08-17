import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Eye,
  Pencil,
  Trash2,
  Briefcase,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  Building2,
  Clock,
  FilterX,
  Loader2,
  FileText,
  Archive,
} from "lucide-react";
import { useJobs, useMyJobs } from "../../hooks/useJob.ts";
import type { DetailedJob, JobProps } from "../../type/job.type.ts";
import { jobMutation } from "../../mutations/jobMutation.ts";
import toast from "react-hot-toast";
import { DeleteModal } from "../../components/DeleteModal.tsx";
import DashboardHeader from "../../components/dashboard/common/DashboardHeader.tsx";
import StatCard from "../../components/dashboard/common/StatCard.tsx";
import { useAuthStore } from "../../store/authStore.ts";

export interface FilterState {
  search: string;
  status: string;
  jobType: string;
  workMode: string;
}

// --- Sub-Components ---

const StatusBadge: React.FC<{ status: JobProps["status"] | string }> = ({
  status,
}) => {
  const normalizedStatus = status.toLowerCase();

  const badgeStyles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const style =
    badgeStyles[normalizedStatus] ||
    "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${style}`}
    >
      {status}
    </span>
  );
};

// --- Main Page Component ---

export const ManageJobs: React.FC = () => {
  const { deleteJobMutation } = jobMutation();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const allJobsQuery = useJobs();
  const myJobsQuery = useMyJobs();

  const activeQuery = isAdmin ? allJobsQuery : myJobsQuery;
  const rawData = activeQuery.data;
  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;

  const rawJobs: DetailedJob[] = useMemo(() => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray((rawData as any).data)) return (rawData as any).data;
    return [];
  }, [rawData]);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "All",
    jobType: "All",
    workMode: "All",
  });

  const [deletingJob, setDeletingJob] = useState<DetailedJob | JobProps | null>(
    null,
  );

  // Derived filtered jobs based on user selection
  const filteredJobs = useMemo(() => {
    return rawJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "All" ||
        job.status.toLowerCase() === filters.status.toLowerCase();

      const matchesJobType =
        filters.jobType === "All" ||
        job.jobType.toLowerCase() === filters.jobType.toLowerCase();

      const matchesWorkMode =
        filters.workMode === "All" ||
        (job.workMode &&
          job.workMode.toLowerCase() === filters.workMode.toLowerCase());

      return (
        matchesSearch && matchesStatus && matchesJobType && matchesWorkMode
      );
    });
  }, [rawJobs, filters]);

  const jobStats = [
    {
      title: "Total Jobs",
      value: 21,
      icon: Briefcase,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Jobs",
      value: 19,
      icon: CheckCircle2,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Draft Jobs",
      value: 1,
      icon: FileText,
      iconBgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Closed Jobs",
      value: 1,
      icon: Archive,
      iconBgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "All",
      jobType: "All",
      workMode: "All",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingJob) return;
    deleteJobMutation.mutate(deletingJob._id, {
      onSuccess: () => {
        toast.success("Job Deleted Successfully");
        setDeletingJob(null);
      },
      onError: (error) => {
        toast.error(error.message || "failed to delete");
      },
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-light flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-sm text-slate-500 font-medium">Loading jobs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-surface-light flex flex-col items-center justify-center p-6">
        <div className="p-3 bg-rose-100 text-rose-600 rounded-full mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-surface-dark">
          Failed to load jobs
        </h3>
        <p className="text-sm text-slate-500">
          Something went wrong while fetching the job list.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-light p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Header */}

        <DashboardHeader
          title="Manage Jobs"
          description="Create, manage, and monitor your job postings."
          buttonText="Create Job"
          buttonLink="/jobs/create"
        />

        {/* 2. Dynamic Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobStats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}{" "}
        </div>

        {/* 3. Search and Filters */}
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search job title or company..."
                className="w-full pl-10 pr-3.5 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Job Type Dropdown */}
            <div>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Work Mode Dropdown */}
            <div>
              <select
                name="workMode"
                value={filters.workMode}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option value="All">All Modes</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Option */}
          {(filters.search ||
            filters.status !== "All" ||
            filters.jobType !== "All" ||
            filters.workMode !== "All") && (
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* 4. Desktop Jobs Table & 5. Mobile Cards Container */}
        <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
          {filteredJobs.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-border-subtle">
                    <tr>
                      <th className="py-3.5 px-4">Job</th>
                      <th className="py-3.5 px-4">Company</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Job Type</th>
                      <th className="py-3.5 px-4">Work Mode</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Posted</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-slate-700">
                    {filteredJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-surface-dark">
                          <div>
                            <p className="font-semibold text-surface-dark">
                              {job.title}
                            </p>
                            <p className="text-xs text-slate-400">
                              {"experienceLevel" in job
                                ? job.experienceLevel
                                : "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {job.companyLogo ? (
                              <img
                                src={job.companyLogo}
                                alt={job.company}
                                className="w-7 h-7 rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                <Building2 className="w-4 h-4" />
                              </div>
                            )}
                            <span className="font-medium text-slate-700">
                              {job.company}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-500">
                          <div className="flex items-center gap-1.5 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{job.location}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-600">
                          {job.jobType}
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-600">
                          {"workMode" in job ? job.workMode : "N/A"}
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                          {formatDate(job.createdAt)}
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1 text-slate-500">
                            <Link
                              to={`/jobs/${job._id}`}
                              title="View"
                              className="p-1.5 hover:text-primary hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/jobs/${job._id}/edit`}
                              title="Edit"
                              className="p-1.5 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setDeletingJob(job)}
                              title="Delete"
                              className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet View */}
              <div className="block lg:hidden divide-y divide-border-subtle">
                {filteredJobs.map((job) => (
                  <div key={job._id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-surface-dark text-base">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500">{job.company}</p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDate(job.createdAt)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">
                          Type:
                        </span>{" "}
                        {job.jobType}
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">
                          Mode:
                        </span>{" "}
                        {"workMode" in job ? job.workMode : "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-medium">
                        {"experienceLevel" in job ? job.experienceLevel : "N/A"}
                      </span>
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-primary"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <Link
                          to={`/jobs/${job._id}/edit`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-amber-600"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </Link>
                        <button
                          onClick={() => setDeletingJob(job)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <FilterX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-surface-dark">
                No jobs found
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Try changing your search keywords or clearing your active
                filters to see more results.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingJob)}
        itemName={deletingJob?.title || ""}
        itemType="Job"
        onClose={() => setDeletingJob(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManageJobs;
