import { useQuery } from "@tanstack/react-query";
import { getJobById, getJobs, getMyJobs } from "../api/jobApi.ts";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
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
