import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApplicationApi,
  updateApplicationStatusApi,
} from "../api/applicationApi";

type UpdateStatusParams = {
  applicationId: string;
  status: "applied" | "shortlisted" | "rejected" | "pending" | "viewed";
};

// 1. Standalone Create Application Hook
export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, formData }: { jobId: string; formData: FormData }) =>
      createApplicationApi(jobId, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recruiter-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["job-applicants"],
      });
    },
  });
};

// 2. Standalone Update Status Hook (This makes the import work!)
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, status }: UpdateStatusParams) =>
      updateApplicationStatusApi(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["job-applicants"],
      });
    },
  });
};
