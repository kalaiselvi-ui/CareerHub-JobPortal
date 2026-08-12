import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "../api/userApi.ts";

export const userMutation = () => {
  const queryClient = useQueryClient();

  const getProfileMutation = useMutation({
    mutationFn: getUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    getProfileMutation,
  };
};
