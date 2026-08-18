import type { Application } from "../components/dashboard/common/ApplicationCard.tsx";
import type { ApplicationProps } from "../components/dashboard/common/ApplicationTable.tsx";
import api from "./axiosInstance"; // use your existing axios instance

export const createApplicationApi = async (
  jobId: string,
  formData: FormData,
) => {
  const response = await api.post(`/api/applications/${jobId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyApplicationsApi = async (): Promise<Application[]> => {
  const response = await api.get("/api/applications/my");

  return response.data.data;
};

export const getRecruiterApplicationsApi = async () => {
  const response = await api.get("/api/applications/recruiter");

  return response.data;
};

export const getApplicantsForJobApi = async (jobId: string) => {
  const response = await api.get(`/api/applications/job/${jobId}`);

  return response.data;
};

export const updateApplicationStatusApi = async (
  applicationId: string,
  status: "applied" | "shortlisted" | "rejected" | "pending",
) => {
  const response = await api.patch(
    `/api/applications/status/${applicationId}`,
    {
      status,
    },
  );

  return response.data;
};

export const getCandidateDashboardStatsApi = async () => {
  const response = await api.get("/api/applications/candidate/stats");

  return response.data;
};
