import React from "react";
import { AuthLayout } from "../../components/auth/AuthLayout.tsx";
import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm.tsx";

export const ForgotPassword: React.FC = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
