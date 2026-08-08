import type { DetailedJob } from "../type/job.type.ts";
import axiosInstance from "./axiosInstance.ts";

export const getJobs = async (): Promise<DetailedJob[]> => {
  const response = await axiosInstance.get("/api/jobs/");
  return response.data.data;
};
