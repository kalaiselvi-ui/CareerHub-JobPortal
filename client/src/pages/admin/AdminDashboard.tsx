import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  FolderKanban,
  UserCog,
  Briefcase,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import { jobMutation } from "../../mutations/jobMutation.ts";
import toast from "react-hot-toast";
import { DeleteModal } from "../../components/DeleteModal.tsx";
import { useJobs } from "../../hooks/useJob.ts";
import type { DetailedJob, JobProps } from "../../type/job.type.ts";
import { useALLUsers } from "../../hooks/useUser.ts";
import DashboardHeader from "../../components/dashboard/common/DashboardHeader.tsx";
import WelcomeSection from "../../components/dashboard/common/WelcomeSection.tsx";
import { useAuthStore } from "../../store/authStore.ts";
import QuickActionButton from "../../components/dashboard/common/QuickActionButton.tsx";
import StatCard from "../../components/dashboard/common/StatCard.tsx";
import JobsTable from "../../components/dashboard/common/JobsTable.tsx";

// --- TypeScript Interfaces ---

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
}

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
          <JobsTable
            jobs={jobs}
            role="admin"
            onNavigate={navigate}
            onDelete={(job) => setDeletingJob(job)}
          />

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
