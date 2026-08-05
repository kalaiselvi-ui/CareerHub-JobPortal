import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi.ts";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
