import axios from "axios";
import { useAuthStore } from "../store/authStore.ts";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
