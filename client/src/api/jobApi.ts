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

export const editJob = async ({
  data,
  id,
}: {
  data: JobFormData;
  id: string;
}): Promise<JobFormData> => {
  const response = await axiosInstance.put(`/api/jobs/${id}`, data);
  return response.data.data;
};

export const getJobById = async (id: string) => {
  const response = await axiosInstance.get(`/api/jobs/${id}`);
  return response.data.data;
};

// Added getMyJobs API function
export const getMyJobs = async (): Promise<DetailedJob[]> => {
  const response = await axiosInstance.get("/api/jobs/my-jobs");
  return response.data.data;
};
