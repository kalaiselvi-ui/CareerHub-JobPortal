import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  Eye,
  Pencil,
  Trash2,
  FolderKanban,
  UserCog,
  Briefcase,
  PlusCircle,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { jobMutation } from "../../mutations/jobMutation.ts";
import toast from "react-hot-toast";
import { DeleteModal } from "../../components/DeleteModal.tsx";
import { useJobs } from "../../hooks/useJob.ts";
import type { DetailedJob, JobProps } from "../../type/job.type.ts";
import { formatDeadline } from "../../utils/formatDeadline.ts";
import { useALLUsers } from "../../hooks/useUser.ts";
import DashboardHeader from "../../components/dashboard/common/DashboardHeader.tsx";
import WelcomeSection from "../../components/dashboard/common/WelcomeSection.tsx";
import { useAuthStore } from "../../store/authStore.ts";
import QuickActionButton from "../../components/dashboard/common/QuickActionButton.tsx";
import StatCard from "../../components/dashboard/common/StatCard.tsx";

// --- TypeScript Interfaces ---

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const normalized = (status || "").toLowerCase();

  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Closed: "bg-rose-50 text-rose-700 border-rose-200",
    Draft: "bg-slate-100 text-slate-700 border-slate-200",
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

const stats = [
  {
    title: "Total Jobs",
    value: 24,
    icon: Briefcase,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Jobs",
    value: 18,
    icon: CheckCircle2,
    iconBgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Users",
    value: 156,
    icon: Users,
    iconBgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Recruiters",
    value: 32,
    icon: UserCheck,
    iconBgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const adminActions = [
  {
    title: "Create Job",
    description: "Post a new job opening",
    icon: PlusCircle,
    to: "/jobs/create",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Manage Jobs",
    description: "Review and edit active jobs",
    icon: Briefcase,
    to: "/jobs/manage",
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Manage Users",
    description: "View candidates & recruiters",
    icon: UserCog,
    to: "/users/manage",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Manage Categories",
    description: "Organize job classifications",
    icon: FolderKanban,
    to: "/categories/manage",
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

// --- Main Component ---

export const AdminDashboard: React.FC = () => {
  const handleAction = (actionName: string, id?: string) => {
    console.log(`Action triggered: ${actionName}${id ? ` for ID: ${id}` : ""}`);
  };
  const { user } = useAuthStore();

  const { deleteJobMutation } = jobMutation();
  const [deletingJob, setDeletingJob] = useState<DetailedJob | JobProps | null>(
    null,
  );
  const { data: jobs = [], isLoading, isError } = useJobs();
  const navigate = useNavigate();
  const { data: users = [] } = useALLUsers();

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isError) {
    return <div>Failed to load jobs.</div>;
  }
  if (jobs.length === 0) {
    return (
      <div className="bg-white border border-border-subtle rounded-2xl p-8 text-center text-surface-dark/60">
        No jobs found matching your filter criteria.
      </div>
    );
  }

  const handleConfirmDelete = () => {
    if (!deletingJob) return;
    deleteJobMutation.mutate(deletingJob._id, {
      onSuccess: () => {
        toast.success("Deleted Successfully");
        setDeletingJob(null);
      },
      onError: (error) => {
        toast.error(error.message || "failed to delete");
      },
    });
  };

  return (
    <div className="min-h-screen bg-surface-light p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader
          title="Admin Dashboard"
          description="Manage and monitor the CareerHub platform."
          buttonText="Create Job"
          buttonLink="/jobs/create"
        />

        <WelcomeSection
          userName={user?.fullName ? `${user.fullName} (Admin)` : "Admin"}
          roleDescription="Here's an overview of your platform and recruitment activity."
        />

        {/* 2. Summary Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Main Content Grid: Recent Jobs (8 cols) & Recent Users (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 3. Recent Jobs Section */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-dark">
                Recent Jobs
              </h2>
              <button
                onClick={() => navigate("/jobs/manage")}
                className="text-sm cursor-pointer font-medium text-primary hover:text-primary-hover transition-colors"
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
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Posted</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-slate-700">
                  {jobs.slice(0, 5).map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-surface-dark">
                        {job.title}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {job.company}
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {job.location}
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                        {formatDeadline(job.createdAt)}{" "}
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 text-slate-500">
                          <button
                            onClick={() => navigate(`/jobs/${job._id}`)}
                            title="View"
                            className="p-1.5 hover:text-primary hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/jobs/${job._id}/edit`)}
                            title="Edit"
                            className="p-1.5 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingJob(job)}
                            title="Delete"
                            className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
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

            {/* Mobile Card Layout View */}
            <div className="block md:hidden divide-y divide-border-subtle">
              {jobs.map((job) => (
                <div key={job._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-surface-dark">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-600">{job.company}</p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDeadline(job.createdAt)}{" "}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-primary"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                      onClick={() => navigate(`/jobs/${job._id}/edit`)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-amber-600"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setDeletingJob(job)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-amber-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Users Section */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-border-subtle shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-border-subtle flex items-center justify-between">
                <h2 className="text-lg font-semibold text-surface-dark">
                  Recent Users
                </h2>
                <button
                  onClick={() => handleAction("View All Users")}
                  className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  View all
                </button>
              </div>

              <div className="p-4 space-y-4">
                {users?.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-primary font-bold flex items-center justify-center text-sm">
                        {user?.fullName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-dark leading-tight">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-medium capitalize ${
                        user.role?.toLowerCase() === "recruiter"
                          ? "bg-orange-50 text-secondary border border-orange-200"
                          : user.role?.toLowerCase() === "admin"
                            ? "bg-purple-50 text-purple-700 border border-purple-200" // 👈 Admin styling
                            : "bg-slate-100 text-slate-600 border border-slate-200" // Default (Candidate)
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Quick Actions Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-dark">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminActions.map((action, index) => (
              <QuickActionButton key={index} {...action} />
            ))}
          </div>
        </div>
      </div>
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

export default AdminDashboard;
