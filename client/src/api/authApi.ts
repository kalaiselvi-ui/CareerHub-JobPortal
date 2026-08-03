import axios from "axios";
import type { RegisterSchemaType } from "../schemas/registerSchema.ts";
import axiosInstance from "./axiosInstance.ts";
import type { LoginSchemaType } from "../schemas/loginSchema.ts";

export const registerUser = async (data: RegisterSchemaType) => {
  try {
    const response = await axiosInstance.post(`/api/user/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }
  throw new Error("Something went wrong");
};

export const loginUser = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/api/user/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
  throw new Error("Something went wrong");
};
