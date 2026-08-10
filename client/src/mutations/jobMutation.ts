import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobs, deleteJob } from "../api/jobApi.ts";

export const jobMutation = () => {
  const queryClient = useQueryClient();

  const createJobMutation = useMutation({
    mutationFn: createJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  return {
    createJobMutation,
    deleteMutation,
  };
};
