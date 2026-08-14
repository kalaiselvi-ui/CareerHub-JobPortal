import { useQuery } from "@tanstack/react-query";
import { getAllUser, getMyProfile } from "../api/userApi.ts";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getMyProfile,
  });
};

export const useALLUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });
};
