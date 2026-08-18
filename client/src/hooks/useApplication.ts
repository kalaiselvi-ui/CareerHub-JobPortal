import { useQuery } from "@tanstack/react-query";
import {
  getCandidateDashboardStatsApi,
  getMyApplicationsApi,
  getRecruiterApplicationsApi,
} from "../api/applicationApi.ts";

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplicationsApi,
  });
};

export const useRecruiterApplications = () => {
  return useQuery({
    queryKey: ["recruiter-applications"],
    queryFn: getRecruiterApplicationsApi,
  });
};

export const useCandidateDashboardStats = () => {
  return useQuery({
    queryKey: ["candidate-dashboard-stats"],
    queryFn: getCandidateDashboardStatsApi,
  });
};

// export const useApplicantsForJob = (jobId: string) => {
//   return useQuery({
//     queryKey: ["job-applicants", jobId],
//     queryFn: getApplicantsForJobApi(jobId),
//     enabled: Boolean(jobId),
//   });
// };
