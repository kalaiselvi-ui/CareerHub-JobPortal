import React, { useState, useMemo } from "react";
import { Search, FolderOpen, Loader2 } from "lucide-react";
import type {
  Application,
  ApplicationStatus,
} from "../../type/application.type.ts";
import { ApplicationDetails } from "../../components/application/ApplicationDetails.tsx";
import { ApplicationCard } from "../../components/application/ApplicationCard.tsx";
import { useRecruiterApplications } from "../../hooks/useApplication.ts";
import { useUpdateApplicationStatus } from "../../mutations/applicationMutation.ts";

export const RecruiterApplications: React.FC = () => {
  // Query & Mutation Hooks
  const {
    data: rawApplications = [],
    isLoading,
    isError,
  } = useRecruiterApplications();

  const { mutate: updateStatus } = useUpdateApplicationStatus();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // Transform backend response into component structure
  const applications: Application[] = useMemo(() => {
    if (!Array.isArray(rawApplications)) return [];
    return rawApplications.map((app: any) => ({
      id: app._id,
      candidateName: app.userId?.fullName || "Applicant",
      email: app.userId?.email || "N/A",
      jobTitle: app.jobId?.title || "N/A",
      // Check both app level AND populated userId level
      headline: app.headline || app.userId?.headline || "Candidate",
      location: app.location || app.userId?.location || "N/A",
      phone: app.phone || app.userId?.phone || "N/A",
      bio: app.bio || app.userId?.bio || "No bio provided.",
      skills: app.skills?.length ? app.skills : app.userId?.skills || [],

      appliedAt: new Date(app.createdAt).toLocaleDateString(),
      status: app.status,
      resume: app.resume,
    }));
  }, [rawApplications]);

  // Filter applications by search keyword and status
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  // Handle status update & keep modal updated
  const handleStatusChange = (
    applicationId: string,
    newStatus: ApplicationStatus,
  ) => {
    updateStatus(
      { applicationId, status: newStatus },
      {
        onSuccess: () => {
          if (selectedApplication && selectedApplication.id === applicationId) {
            setSelectedApplication((prev) =>
              prev ? { ...prev, status: newStatus } : null,
            );
          }
        },
      },
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load applications. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-foreground p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Applications
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review and manage candidates who applied to your jobs.
          </p>
        </div>
        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold w-fit">
          {filteredApplications.length} Applications
        </span>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search candidates or jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card text-card-foreground border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-card text-card-foreground border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-w-[140px]"
        >
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="pending">Pending</option>
          <option value="viewed">Viewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Application List Container */}
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={(app) => setSelectedApplication(app)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-lg bg-card space-y-3">
          <div className="p-3 bg-muted rounded-full text-muted-foreground">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No applications found
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Try changing your search terms or filter selection to view candidate
            applications.
          </p>
        </div>
      )}

      {/* Application Details Modal */}
      <ApplicationDetails
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
