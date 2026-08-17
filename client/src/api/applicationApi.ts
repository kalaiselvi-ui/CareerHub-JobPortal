import api from "./axiosInstance"; // use your existing axios instance

export const createApplicationApi = async (
  jobId: string,
  formData: FormData,
) => {
  const response = await api.post(`/applications/${jobId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyApplicationsApi = async () => {
  const response = await api.get("/api/applications/my");

  return response.data;
};

export const getRecruiterApplicationsApi = async () => {
  const response = await api.get("/applications/recruiter");

  return response.data;
};

export const getApplicantsForJobApi = async (jobId: string) => {
  const response = await api.get(`/applications/job/${jobId}`);

  return response.data;
};

export const updateApplicationStatusApi = async (
  applicationId: string,
  status: "applied" | "shortlisted" | "rejected" | "accepted",
) => {
  const response = await api.patch(`/applications/status/${applicationId}`, {
    status,
  });

  return response.data;
};
