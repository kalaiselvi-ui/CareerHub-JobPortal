import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCandidateProfileApi,
  updateCandidateProfileApi,
} from "../api/candidateProfileApi.ts";

export const useCreateCandidateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCandidateProfileApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-profile"],
      });
    },
  });
};

export const useUpdateCandidateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCandidateProfileApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-profile"],
      });
    },
  });
};
