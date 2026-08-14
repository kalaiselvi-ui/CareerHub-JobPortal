import axios from "axios";
import axiosInstance from "./axiosInstance.ts";
import type { User } from "../type/user.type.ts";

export const getMyProfile = async () => {
  const response = await axiosInstance.get(`/api/users/me`);
  return response.data.data;
};

export const getAllUser = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/api/users/");
  return response.data.data;
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await axiosInstance.put("/api/users/me", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "failed to update profile",
      );
    }
  }
  throw new Error("Something went wrong");
};

export const deleteUserById = async (id: string) => {
  const response = await axiosInstance.delete(`/api/users/${id}`);
  return response.data;
};

// src/api/userApi.ts
// export const updateUserStatus = async ({ userId, status }: { userId: string; status: "active" | "inactive" }) => {
//   const response = await axiosInstance.patch(`/api/users/${userId}/status`, { status });
//   return response.data;
// };
