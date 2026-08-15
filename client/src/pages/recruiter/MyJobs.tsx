import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Briefcase, CheckCircle2, Archive } from "lucide-react";
import { toast } from "react-hot-toast";
import StatCard from "../../components/dashboard/common/StatCard";
import type { JobProps } from "../../type/job.type";
import JobsTable from "../../components/dashboard/common/JobsTable.tsx";
import EmptyState from "../../components/dashboard/common/EmptyState.tsx";
import { useMyJobs } from "../../hooks/useJob.ts";
import { jobMutation } from "../../mutations/jobMutation.ts";
import { DeleteModal } from "../../components/DeleteModal.tsx";
import {
  JobFilters,
  type FilterState,
} from "../../components/dashboard/common/JobsFilter.tsx";

export const MyJobsPage: React.FC = () => {
  const navigate = useNavigate();

  // 1. Data Fetching
  const { data: jobs = [] } = useMyJobs();

  // 2. Delete State & Mutation
  const [deletingJob, setDeletingJob] = useState<JobProps | null>(null);
  const { deleteJobMutation } = jobMutation();

  // 3. Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "All",
    category: "All",
  });

  // Dynamic Stat Cards
  const stats = useMemo(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((job) => job.status === "active").length;
    const closedJobs = jobs.filter((job) => job.status === "closed").length;

    return [
      {
        title: "Total Jobs",
        value: totalJobs,
        icon: Briefcase,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        title: "Active Jobs",
        value: activeJobs,
        icon: CheckCircle2,
        iconBgColor: "bg-emerald-50",
        iconColor: "text-emerald-600",
      },
      {
        title: "Closed Jobs",
        value: closedJobs,
        icon: Archive,
        iconBgColor: "bg-orange-50",
        iconColor: "text-orange-600",
      },
    ];
  }, [jobs]);

  // Extract unique categories dynamically
  //   const categories = useMemo(() => {
  //     return Array.from(new Set(jobs.map((j) => j?.category).filter(Boolean)));
  //   }, [jobs]);

  // Filter logic (Search, Status, Category)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        (job.title?.toLowerCase() || "").includes(
          filters.search.toLowerCase(),
        ) ||
        (job.location?.toLowerCase() || "").includes(
          filters.search.toLowerCase(),
        );

      const matchesStatus =
        filters.status === "All" || job.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmDelete = () => {
    if (!deletingJob) return;

    deleteJobMutation.mutate(deletingJob._id, {
      onSuccess: () => {
        toast.success("Job deleted successfully");
        setDeletingJob(null);
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to delete job");
      },
    });
  };

  return (
    <div className="min-h-screen bg-surface-light p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-dark">My Jobs</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all jobs you have created and track their current status.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/jobs/create")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Job</span>
          </button>
        </div>

        {/* Dynamic Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Reusable Filters Component */}
        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Content Table OR Empty State */}
        {filteredJobs.length > 0 ? (
          <JobsTable
            jobs={filteredJobs}
            role="recruiter"
            onNavigate={(path) => navigate(path)}
            onDelete={(job) => setDeletingJob(job)}
            maxItems={filteredJobs.length}
          />
        ) : (
          <EmptyState
            title="No jobs found"
            description="No job postings match your selected category or search filters."
            actionLabel="Reset Filters"
            onAction={() =>
              setFilters({ search: "", status: "All", category: "All" })
            }
          />
        )}
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

export default MyJobsPage;
