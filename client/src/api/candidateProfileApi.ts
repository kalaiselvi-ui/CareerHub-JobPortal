import axiosInstance from "./axiosInstance.ts";

export const createCandidateProfileApi = async (data: FormData) => {
  const response = await axiosInstance.post("/api/candidate/profile", data);

  return response.data;
};

export const getCandidateProfileApi = async () => {
  const response = await axiosInstance.get("/api/candidate/profile");

  return response.data.data;
};

export const updateCandidateProfileApi = async (data: FormData) => {
  const response = await axiosInstance.put("/api/candidate/profile", data);

  return response.data;
};
