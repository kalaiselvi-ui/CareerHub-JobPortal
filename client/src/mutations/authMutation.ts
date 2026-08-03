import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi.ts";

export const authMutation = () => {
  const registerMutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });
  return { registerMutation };
};
