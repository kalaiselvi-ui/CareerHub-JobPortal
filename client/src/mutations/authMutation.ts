import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/authApi.ts";

export const authMutation = () => {
  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
  });
  return { registerMutation, loginMutation };
};
