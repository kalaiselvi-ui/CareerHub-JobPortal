import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobs, deleteJob, editJob } from "../api/jobApi.ts";

export const jobMutation = () => {
  const queryClient = useQueryClient();

  const createJobMutation = useMutation({
    mutationFn: createJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
    },
  });
  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
    },
  });

  const editJobMutation = useMutation({
    mutationFn: editJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
    },
  });
  return {
    createJobMutation,
    deleteJobMutation,
    editJobMutation,
  };
};
