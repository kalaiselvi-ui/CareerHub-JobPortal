import { useQuery } from "@tanstack/react-query";

import { getCandidateProfileApi } from "../api/candidateProfileApi.ts";

export const useCandidateProfile = () => {
  return useQuery({
    queryKey: ["candidate-profile"],
    queryFn: getCandidateProfileApi,
  });
};
