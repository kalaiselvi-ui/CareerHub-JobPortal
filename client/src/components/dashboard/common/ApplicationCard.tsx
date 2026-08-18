import React from "react";
import { Building, MapPin, Calendar } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
}

export interface Application {
  _id: string;
  userId: string;
  jobId: Job;
  status: "applied" | "shortlisted" | "rejected";
  resume?: string;
  coverLetter?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicationCardProps {
  application: Application;
}

const statusStyles = {
  applied: "bg-amber-50 text-amber-700 border-amber-200",
  shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusLabels = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
}) => {
  return (
    <div className="bg-white rounded-xl border border-border-subtle p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between gap-4">
      <div className="space-y-3">
        {/* Title and Status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-surface-dark line-clamp-1">
            {application.jobId.title}
          </h3>

          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shrink-0 ${
              statusStyles[application.status]
            }`}
          >
            {statusLabels[application.status]}
          </span>
        </div>

        {/* Company, Location & Date */}
        <div className="space-y-1.5 text-xs text-surface-dark/60">
          <p className="flex items-center gap-1.5 font-medium text-surface-dark/80">
            <Building className="w-3.5 h-3.5 text-surface-dark/40 shrink-0" />
            <span className="truncate">{application.jobId.company}</span>
          </p>

          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-surface-dark/40 shrink-0" />
            <span className="truncate">{application.jobId.location}</span>
          </p>

          <p className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-surface-dark/40 shrink-0" />
            <span>
              Applied {new Date(application.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
