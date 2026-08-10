import type { JobFormData } from "../schemas/jobSchema.ts";
import type { DetailedJob } from "../type/job.type.ts";
import axiosInstance from "./axiosInstance.ts";

export const getJobs = async (): Promise<DetailedJob[]> => {
  const response = await axiosInstance.get("/api/jobs/");
  return response.data.data;
};

export const createJobs = async (data: JobFormData): Promise<JobFormData> => {
  const response = await axiosInstance.post("/api/jobs/", data);
  return response.data.data;
};

export const deleteJob = async (id: string) => {
  const response = await axiosInstance.delete(`/api/jobs/${id}`);
  return response.data.data;
};
