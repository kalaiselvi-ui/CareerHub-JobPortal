import { useQuery } from "@tanstack/react-query";
import { getJobById, getJobs, getMyJobs } from "../api/jobApi.ts";

export interface JobFilters {
  search?: string;
  jobType?: string;
  experienceLevel?: string;
  workMode?: string;
  sortBy?: string;
}

export const useJobs = (filters?: JobFilters) => {
  return useQuery({
    queryKey: [
      "jobs",
      filters?.search,
      filters?.jobType,
      filters?.workMode,
      filters?.experienceLevel,
      filters?.sortBy,
    ],
    queryFn: () => getJobs(filters),
  });
};

export const useJobById = (jobId?: string) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId!),
    enabled: Boolean(jobId), // Only run the query if jobId exists
  });
};

// New hook to fetch ONLY the logged-in recruiter's jobs
export const useMyJobs = () => {
  return useQuery({
    queryKey: ["my-jobs"],
    queryFn: getMyJobs,
  });
};
