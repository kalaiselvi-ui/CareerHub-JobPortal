import { MapPin, Bookmark, Briefcase, Building, Clock } from "lucide-react";
import type { DetailedJob } from "../../type/job.type.ts";
import { Link } from "react-router-dom";
import { formatPostedDate } from "../../utils/formatDate.ts";

interface JobCardComponentProps {
  job: DetailedJob;
  isSelected?: boolean;
  onClick?: () => void;
}

const JobCard = ({ job, isSelected, onClick }: JobCardComponentProps) => {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div
        onClick={onClick}
        className={`group cursor-pointer bg-white rounded-xl p-6 transition-all duration-200 flex flex-col justify-between ${
          isSelected
            ? "border border-primary shadow-md"
            : "border border-border-subtle hover:border-primary/40 hover:shadow-md"
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-light border border-border-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-surface-dark group-hover:text-primary transition-colors duration-200 line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-surface-dark/60 line-clamp-1 overflow-hidden">
                  {job.company}
                </p>
              </div>
            </div>

            {/* Right side container: Posted date & Bookmark button */}
            <div className="flex items-center gap-2 shrink-0">
              {job.createdAt && (
                <span className="flex items-center gap-1 text-xs font-medium text-surface-dark/50">
                  <Clock className="w-3 h-3 text-surface-dark/40" />
                  {formatPostedDate(job.applicationDeadline)}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevents clicking bookmark from navigating to job detail page
                  e.stopPropagation();
                }}
                className="text-surface-dark/40 hover:text-secondary transition-colors duration-200 p-1"
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 text-xs sm:text-sm text-surface-dark/70 font-medium pt-1">
            <div className="flex w-full justify-between gap-1.5 ">
              <div className="bg-surface-light flex gap-1 items-center px-2.5 py-1 rounded-md border border-border-subtle">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{job.jobType}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-light px-2.5 py-1 rounded-md border border-border-subtle shrink-0">
              <span className="whitespace-nowrap">
                {" "}
                {job.salary.currency} {job.salary.min.toLocaleString()} -{" "}
                {job.salary.max.toLocaleString()} / {job.salary.period}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-2 overflow-hidden max-w-full">
            {job.skills?.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-surface-light text-surface-dark/80 px-2.5 py-1 rounded-md border border-border-subtle"
              >
                {skill}
              </span>
            ))}
            {/* Display indicator for extra skills */}
            {job.skills && job.skills.length > 2 && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                +{job.skills.length - 2} more
              </span>
            )}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-border-subtle">
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md shadow-primary/10 transition-all duration-200 cursor-pointer text-center">
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
