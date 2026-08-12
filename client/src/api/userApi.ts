import axios from "axios";
import axiosInstance from "./axiosInstance.ts";

export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/api/users/me/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "failed to get the user profile",
      );
    }
  }
  throw new Error("Something went wrong");
};
