import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobApi.ts";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
};
