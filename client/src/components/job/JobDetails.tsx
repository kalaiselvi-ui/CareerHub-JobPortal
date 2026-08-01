import React from "react";
import {
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Bookmark,
  Send,
  CheckCircle2,
} from "lucide-react";
import type { DetailedJob } from "../../type/job.type.ts";
import { formatPostedDate } from "../../utils/formatDate.ts";

interface JobDetailsProps {
  job: DetailedJob | null;
  onBackToMobileList?: () => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  job,
  onBackToMobileList,
}) => {
  if (!job) {
    return (
      <div className="h-full bg-white border border-border-subtle rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <Briefcase className="w-12 h-12 text-surface-dark/30 mb-3" />
        <h3 className="text-lg font-bold text-surface-dark">
          Select a job to view details
        </h3>
        <p className="text-sm text-surface-dark/60 max-w-xs mt-1">
          Click on any job card from the list to see the full description and
          requirements.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border border-border-subtle rounded-2xl p-6 lg:p-8 overflow-y-auto space-y-8">
      {/* Mobile Back Button */}
      {onBackToMobileList && (
        <button
          onClick={onBackToMobileList}
          className="lg:hidden text-sm text-primary font-medium flex items-center gap-1 mb-2"
        >
          ← Back to Job List
        </button>
      )}

      {/* Header Section */}
      <div className="border-b border-border-subtle pb-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-light border border-border-subtle flex items-center justify-center text-primary shrink-0 font-bold text-xl">
              {job.company.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-surface-dark">
                {job.title}
              </h1>
              <p className="text-base font-medium text-primary flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-4 h-4" />
                <span>{job.company}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Tags */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-surface-dark/70 font-medium">
          <div className="flex items-center gap-1.5 bg-surface-light px-3 py-1.5 rounded-lg border border-border-subtle">
            <MapPin className="w-4 h-4 text-primary" />
            <span>
              {job.location} ({job.workMode})
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-light px-3 py-1.5 rounded-lg border border-border-subtle">
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-surface-dark/50 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>Posted {formatPostedDate(job?.postedDate)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/20 cursor-pointer">
            <Send className="w-4 h-4" />
            <span>Apply Now</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-border-subtle hover:border-primary text-surface-dark hover:text-primary font-semibold px-4 py-3 rounded-xl transition-all bg-white cursor-pointer">
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Save Job</span>
          </button>
        </div>
      </div>

      {/* About this role */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-surface-dark">About this role</h2>
        <p className="text-surface-dark/80 leading-relaxed text-sm sm:text-base">
          {job.description}
        </p>

        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-surface-dark mb-2">
              Key Responsibilities:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-surface-dark/80 pl-1">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Required Skills */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-surface-dark">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-surface-dark">Requirements</h2>
        <div className="space-y-2">
          {job.requirements.map((req, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-surface-dark/80"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information Grid */}
      <div className="bg-surface-light border border-border-subtle rounded-xl p-5 space-y-4">
        <h2 className="text-base font-bold text-surface-dark">
          Additional Information
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-surface-dark/50 font-medium">Employment Type</p>
            <p className="font-semibold text-surface-dark mt-0.5">{job.type}</p>
          </div>
          <div>
            <p className="text-surface-dark/50 font-medium">Experience Level</p>
            <p className="font-semibold text-surface-dark mt-0.5">
              {job.experienceLevel}
            </p>
          </div>
          <div>
            <p className="text-surface-dark/50 font-medium">Work Mode</p>
            <p className="font-semibold text-surface-dark mt-0.5">
              {job.workMode}
            </p>
          </div>
          <div>
            <p className="text-surface-dark/50 font-medium">Location</p>
            <p className="font-semibold text-surface-dark mt-0.5">
              {job.location}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-surface-dark/50 font-medium">Salary Range</p>
            <p className="font-semibold text-surface-dark mt-0.5">
              {job.salary}
            </p>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-surface-dark">
          About {job.company}
        </h2>
        <p className="text-sm text-surface-dark/80 leading-relaxed">
          {job.aboutCompany}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
