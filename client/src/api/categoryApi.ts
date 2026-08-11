import type { CategoryResponse } from "../type/category.type.ts";
import axiosInstance from "./axiosInstance.ts";

export const getCategories = async (): Promise<CategoryResponse> => {
  const response = await axiosInstance.get("/api/category/");
  return response.data;
};

export const createCategories = async (name: string) => {
  const data = { name };

  const response = await axiosInstance.post("/api/category/", data);
  return response.data;
};

export const deleteCategories = async (id: string) => {
  const response = await axiosInstance.delete(`/api/category/${id}`);
  return response.data;
};
