import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopFilters from "../components/job/TopFilters.tsx";
import JobList from "../components/job/JobList.tsx";
import JobDetails from "../components/job/JobDetails.tsx";
import type { DetailedJob } from "../type/job.type.ts";
import { useJobs } from "../hooks/useJob.ts";

export const JobsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<DetailedJob | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState<boolean>(false);
  const { data: jobs = [], isLoading, isError } = useJobs();
  console.log(jobs);
  useEffect(() => {
    if (id) {
      const foundJob = jobs.find((j) => j._id === id);
      if (foundJob) {
        setSelectedJob(foundJob);
      } else {
        setSelectedJob(jobs[0] || null);
      }
    } else {
      setSelectedJob(jobs[0] || null);
    }
  }, [id, jobs]);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isError) {
    return <div>Failed to load jobs.</div>;
  }

  const handleSelectJob = (job: DetailedJob) => {
    setSelectedJob(job);
    setShowMobileDetails(true);
    navigate(`/jobs/${job._id}`);
  };

  return (
    // Mobile: min-h-screen & auto scroll | Desktop (lg): locked h-screen & hidden overflow
    <div className="min-h-screen flex-1 bg-border-slate lg:h-screen  flex flex-col overflow-y-auto lg:overflow-hidden">
      {/* Top Filter Toolbar */}
      <TopFilters />

      {/* Main Split Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4  min-h-0 sm:px-6 lg:px-8 py-4 ">
        <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
          {/* Left Side: Job List */}
          <div
            className={`w-full lg:w-[38%] lg:h-full lg:min-h-0 flex flex-col ${
              showMobileDetails ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="mb-2 shrink-0 flex items-center justify-between">
              <p className="text-sm font-semibold text-surface-dark">
                Showing <span className="text-primary">{jobs.length}</span> jobs
              </p>
            </div>
            {/* On mobile, standard block list; on desktop, internal scroll */}
            <div className="w-full lg:flex-1 lg:overflow-y-auto pr-1 scrollbar-thin">
              <JobList
                jobs={jobs}
                selectedJobId={selectedJob?._id || null}
                onSelectJob={handleSelectJob}
              />
            </div>
          </div>

          {/* Right Side: Job Details */}
          <div
            className={`w-full lg:w-[62%] lg:h-full lg:min-h-0 lg:overflow-y-auto pr-1 scrollbar-thin ${
              !showMobileDetails ? "hidden lg:block" : "block"
            }`}
          >
            <JobDetails
              job={selectedJob}
              onBackToMobileList={() => setShowMobileDetails(false)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
