import type { JobFilters } from "../hooks/useJob.ts";
import type { JobFormData } from "../schemas/jobSchema.ts";
import type { DetailedJob } from "../type/job.type.ts";
import axiosInstance from "./axiosInstance.ts";

export const getJobs = async (filters?: JobFilters): Promise<DetailedJob[]> => {
  const params: Record<string, string> = {};
  if (filters) {
    if (filters.search) params.search = filters.search;
    if (filters.jobType && filters.jobType !== "all")
      params.jobType = filters.jobType;
    if (filters.workMode && filters.workMode !== "all")
      params.workMode = filters.workMode;
    if (filters.experienceLevel && filters.experienceLevel !== "any") {
      params.experienceLevel = filters.experienceLevel;
    }
    if (filters.sortBy && filters.sortBy !== "recent")
      params.sortBy = filters.sortBy;
  }
  const response = await axiosInstance.get("/api/jobs/", { params });
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
