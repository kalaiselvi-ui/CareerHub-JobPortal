import React from "react";
import { AuthLayout } from "../../components/auth/AuthLayout.tsx";
import { ResetPasswordForm } from "../../components/auth/ResetPasswordForm.tsx";

export const ResetPassword: React.FC = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
