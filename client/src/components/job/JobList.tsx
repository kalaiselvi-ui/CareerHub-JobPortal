import React from "react";
import JobCard from "../common/JobCard.tsx"; // Reusing your existing JobCard
import type { DetailedJob } from "../type/job.type.ts";

interface JobListProps {
  jobs: DetailedJob[];
  selectedJobId: string | null;
  onSelectJob: (job: DetailedJob) => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  selectedJobId,
  onSelectJob,
}) => {
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
        const isSelected = job.id === selectedJobId;
        return (
          <div key={job.id} onClick={() => onSelectJob(job)}>
            <JobCard job={job} isSelected={isSelected} />
          </div>
        );
      })}
    </div>
  );
};

export default JobList;
