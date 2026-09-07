import React from "react";
import JobCard from "../common/JobCard.tsx"; // Reusing your existing JobCard
import type { DetailedJob } from "../../type/job.type.ts";
import { useJobs } from "../../hooks/useJob.ts";
import { useSearchParams } from "react-router-dom";

interface JobListProps {
  jobs: DetailedJob[];
  selectedJobId: string | null;
  onSelectJob: (job: DetailedJob) => void;
}

export const JobList: React.FC<JobListProps> = ({
  selectedJobId,
  onSelectJob,
}) => {
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
    jobType: searchParams.get("jobType") || "all",
    experienceLevel: searchParams.get("experienceLevel") || "any",
    workMode: searchParams.get("workMode") || "all",
    sortBy: searchParams.get("sortBy") || "recent",
  };

  const { data: jobs = [], isLoading, isError } = useJobs(filters);
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

  return (
    <div className="h-full overflow-y-auto pr-1 space-y-4">
      {jobs.map((job) => {
        const isSelected = job._id === selectedJobId;
        return (
          <div key={job._id} onClick={() => onSelectJob(job)}>
            <JobCard job={job} isSelected={isSelected} />
          </div>
        );
      })}
    </div>
  );
};

export default JobList;
