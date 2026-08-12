import axios from "axios";
import type { RegisterSchemaType } from "../schemas/registerSchema.ts";
import axiosInstance from "./axiosInstance.ts";
import type { LoginSchemaType } from "../schemas/loginSchema.ts";
import type { ForgotPasswordSchemaType } from "../schemas/forgotPasswordSchema.ts";

export const registerUser = async (data: RegisterSchemaType) => {
  try {
    const response = await axiosInstance.post(`/api/auth/register`, data);
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
    const response = await axiosInstance.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
  throw new Error("Something went wrong");
};

export const forgotPassword = async (email: ForgotPasswordSchemaType) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/forgot-password",
      email,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Reset link failed to send",
      );
    }
  }
  throw new Error("Something went wrong");
};
export const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/auth/reset-password/${token}`,
      { password },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "password reset failed");
    }
  }
  throw new Error("Something went wrong");
};
