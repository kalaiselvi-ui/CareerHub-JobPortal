import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserById, updateProfile } from "../api/userApi.ts";

export const userMutation = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: deleteUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    updateProfileMutation,
    deleteProfileMutation,
  };
};

// export const useUpdateUserStatus = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: useUpdateUserStatus,
//     onSuccess: () => {
//       toast.success("User status updated!");
//       // Automatically refresh the users list in UI!
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//     onError: (err: any) => {
//       toast.error(err.message || "Failed to update status");
//     },
//   });
// };
