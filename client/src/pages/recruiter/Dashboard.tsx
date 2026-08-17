import React, { useState } from "react";
import {
  Briefcase,
  BriefcaseBusiness,
  CheckCircle2,
  UserCheck,
  FileText,
  PlusCircle,
  Users,
  Building2,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/common/DashboardHeader.tsx";
import WelcomeSection from "../../components/dashboard/common/WelcomeSection.tsx";
import { useAuthStore } from "../../store/authStore.ts";
import StatCard from "../../components/dashboard/common/StatCard.tsx";
import QuickActionButton from "../../components/dashboard/common/QuickActionButton.tsx";
import { DeleteModal } from "../../components/DeleteModal.tsx";
import type { DetailedJob, JobProps } from "../../type/job.type.ts";
import toast from "react-hot-toast";
import { useMyJobs } from "../../hooks/useJob.ts";
import { useNavigate } from "react-router-dom";
import { jobMutation } from "../../mutations/jobMutation.ts";
import StatusBadge from "../../components/dashboard/common/StatusBadge.tsx";
import JobsTable from "../../components/dashboard/common/JobsTable.tsx";
import EmptyState from "../../components/dashboard/common/EmptyState.tsx";
import ApplicationTable from "../../components/dashboard/common/ApplicationTable.tsx";
import { useMyApplications } from "../../hooks/useApplication.ts";

// ==========================================
// 1. TypeScript Types & Interfaces
// ==========================================

export type Recruiter = {
  id: string;
  fullName: string;
};

export type Application = {
  id: string;
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
  status: "pending" | "shortlisted" | "rejected";
};

// ==========================================
// 2. Mock Data
// ==========================================

const mockApplications: Application[] = [
  {
    id: "app-1",
    candidateName: "Sarah Wilson",
    jobTitle: "Frontend Developer",
    appliedDate: "Aug 13, 2026",
    status: "pending",
  },
  {
    id: "app-2",
    candidateName: "Ahmed Khan",
    jobTitle: "Backend Developer",
    appliedDate: "Aug 12, 2026",
    status: "shortlisted",
  },
  {
    id: "app-3",
    candidateName: "David Thomas",
    jobTitle: "UI/UX Designer",
    appliedDate: "Aug 11, 2026",
    status: "rejected",
  },
  {
    id: "app-4",
    candidateName: "Maria Joseph",
    jobTitle: "Frontend Developer",
    appliedDate: "Aug 10, 2026",
    status: "shortlisted",
  },
  {
    id: "app-5",
    candidateName: "James Miller",
    jobTitle: "Full Stack Developer",
    appliedDate: "Aug 09, 2026",
    status: "pending",
  },
];

const recruiterStats = [
  {
    title: "My Posted Jobs",
    // value: (statsData?.postedJobs ?? 0) || 20,
    value: 3,
    icon: Briefcase,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Listings",
    // value: statsData?.activeJobs ?? 0,
    value: 2,
    icon: CheckCircle2,
    iconBgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Applications",
    // value: statsData?.totalApplications ?? 0,
    value: 100,
    icon: FileText,
    iconBgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Shortlisted Candidates",
    // value: statsData?.shortlistedCandidates ?? 0,
    value: 10,
    icon: UserCheck,
    iconBgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export const recruiterActions = [
  {
    title: "Post New Job",
    description: "Create a new job posting",
    icon: PlusCircle,
    to: "/jobs/create",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Manage My Jobs",
    description: "View and manage active listings",
    icon: BriefcaseBusiness,
    to: "/recruiter/jobs",
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Manage Applications",
    description: "Review candidates & resume submissions",
    icon: Users,
    to: "/recruiter/applications",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Company Profile",
    description: "Update company details & branding",
    icon: Building2,
    to: "/recruiter/company",
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

// ==========================================
// 4. Main Recruiter Dashboard Component
// ==========================================

export default function RecruiterDashboard() {
  const { user } = useAuthStore();
  const [deletingJob, setDeletingJob] = useState<DetailedJob | JobProps | null>(
    null,
  );
  const { deleteJobMutation } = jobMutation();

  const { data: recruiterJobs = [], isLoading, isError } = useMyJobs();
  const navigate = useNavigate();
  const {
    data: applications = [],
    isLoading: applicationLoading,
    isError: applicationError,
  } = useMyApplications();

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isError) {
    return <div>Failed to load jobs.</div>;
  }
  if (applicationLoading) {
    return <div>Loading applications...</div>;
  }

  if (applicationError) {
    return <div>Failed to load applications.</div>;
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
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader
          title="Recruiter Dashboard"
          description="Manage your job listings and view applications."
          buttonText="Post New Job"
          buttonLink="/jobs/create"
        />
        <WelcomeSection
          userName={
            user?.fullName ? `${user.fullName} (Recruiter)` : "Recruiter"
          }
          roleDescription="Here's an overview of your platform and recruitment activity."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recruiterStats.map((stat, index) => (
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
        {/* 5. Quick Actions Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-dark">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recruiterActions.map((action, index) => (
              <QuickActionButton key={index} {...action} />
            ))}
          </div>
        </div>
        {recruiterJobs.length === 0 ? (
          <EmptyState onAction={() => navigate("/jobs/create")} />
        ) : (
          <>
            {/* <RecentJobs jobs={mockJobs} /> */}
            <JobsTable
              jobs={recruiterJobs}
              role="recruiter"
              onNavigate={navigate}
              onDelete={(job) => setDeletingJob(job)}
            />
          </>
        )}
        <ApplicationTable
          applications={applications}
          onNavigate={(path) => navigate(path)}
          onReview={(app) => navigate(`/applications/${app._id}`)}
          maxItems={5}
        />{" "}
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
}
