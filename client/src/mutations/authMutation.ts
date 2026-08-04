import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../api/authApi.ts";

export const authMutation = () => {
  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
  });
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
  });

  return {
    registerMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  };
};
