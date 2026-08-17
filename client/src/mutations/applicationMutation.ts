import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplicationApi } from "../api/applicationApi";

export const applicationMutation = () => {
  const queryClient = useQueryClient();

  const createApplicationMutation = useMutation({
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

  //   const updateApplicationStatusMutation = useMutation({
  //     mutationFn: updateApplicationStatusApi,

  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["recruiter-applications"],
  //       });

  //       queryClient.invalidateQueries({
  //         queryKey: ["job-applicants"],
  //       });
  //     },
  //   });

  return {
    createApplicationMutation,
  };
};
