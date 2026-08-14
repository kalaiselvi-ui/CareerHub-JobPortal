import React, { useState } from "react";
import {
  Plus,
  Briefcase,
  BriefcaseBusiness,
  Eye,
  Pencil,
  Trash2,
  ChevronRight,
  FolderOpen,
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

// ==========================================
// 1. TypeScript Types & Interfaces
// ==========================================

export type Recruiter = {
  id: string;
  fullName: string;
};

export type RecruiterJob = {
  id: string;
  title: string;
  location: string;
  jobType: string;
  status: "active" | "closed" | "draft";
  applications: number;
  createdAt: string;
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

const mockRecruiter: Recruiter = {
  id: "r1",
  fullName: "John",
};

const mockJobs: RecruiterJob[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    location: "Remote / Dubai, UAE",
    jobType: "Full-time",
    status: "active",
    applications: 12,
    createdAt: "Aug 12, 2026",
  },
  {
    id: "job-2",
    title: "Backend Developer",
    location: "Abu Dhabi, UAE",
    jobType: "Full-time",
    status: "active",
    applications: 8,
    createdAt: "Aug 10, 2026",
  },
  {
    id: "job-3",
    title: "React JS Developer",
    location: "Sharjah, UAE",
    jobType: "Contract",
    status: "draft",
    applications: 0,
    createdAt: "Aug 08, 2026",
  },
  {
    id: "job-4",
    title: "UI/UX Designer",
    location: "Remote",
    jobType: "Full-time",
    status: "closed",
    applications: 25,
    createdAt: "Aug 05, 2026",
  },
  {
    id: "job-5",
    title: "Full Stack Developer",
    location: "Dubai, UAE",
    jobType: "Full-time",
    status: "active",
    applications: 19,
    createdAt: "Aug 01, 2026",
  },
];

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

const JobStatusBadge: React.FC<{ status: RecruiterJob["status"] }> = ({
  status,
}) => {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-gray-100 text-gray-700 border-gray-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const RecentJobs: React.FC<{ jobs: RecruiterJob[] }> = ({ jobs }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <h3 className="text-base font-semibold text-gray-900">Recent Jobs</h3>
      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
        View All <ChevronRight className="h-4 w-4" />
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50/80 text-xs uppercase text-gray-500 border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Location
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Job Type
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Applications
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Posted Date
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">
                {job.title}
              </td>
              <td className="px-6 py-4 text-gray-500">{job.location}</td>
              <td className="px-6 py-4 text-gray-500">{job.jobType}</td>
              <td className="px-6 py-4">
                <JobStatusBadge status={job.status} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {job.applications}
              </td>
              <td className="px-6 py-4 text-gray-500">{job.createdAt}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    title="View"
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    title="Edit"
                    className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    title="Delete"
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ApplicationStatusBadge: React.FC<{ status: Application["status"] }> = ({
  status,
}) => {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const RecentApplications: React.FC<{ applications: Application[] }> = ({
  applications,
}) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <h3 className="text-base font-semibold text-gray-900">
        Recent Applications
      </h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50/80 text-xs uppercase text-gray-500 border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">
              Candidate
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Applied Date
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">
                {app.candidateName}
              </td>
              <td className="px-6 py-4 text-gray-500">{app.jobTitle}</td>
              <td className="px-6 py-4 text-gray-500">{app.appliedDate}</td>
              <td className="px-6 py-4">
                <ApplicationStatusBadge status={app.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-3 text-center">
      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
        View All Applications
      </button>
    </div>
  </div>
);

const EmptyStateSection: React.FC<{ onPostJob?: () => void }> = ({
  onPostJob,
}) => (
  <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
      <FolderOpen className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-gray-900">
      You haven't posted any jobs yet.
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      Start attracting candidates by creating your first job posting.
    </p>
    <div className="mt-6">
      <button
        onClick={onPostJob}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Post Your First Job</span>
      </button>
    </div>
  </div>
);

// ==========================================
// 4. Main Recruiter Dashboard Component
// ==========================================

export default function RecruiterDashboard() {
  // Toggle this flag to test or enable the empty state UI when needed
  const [hasNoJobs] = useState<boolean>(false);
  const { user } = useAuthStore();

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
        {hasNoJobs ? (
          <EmptyStateSection />
        ) : (
          <>
            <RecentJobs jobs={mockJobs} />
            <RecentApplications applications={mockApplications} />
          </>
        )}
      </div>
    </div>
  );
}
