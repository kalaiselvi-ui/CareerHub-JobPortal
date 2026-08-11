import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategories, deleteCategories } from "../api/categoryApi.ts";

export const categoryMutation = () => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    createCategoryMutation,
    deleteCategoryMutation,
  };
};
