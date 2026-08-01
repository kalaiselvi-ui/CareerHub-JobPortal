import React from "react";
import { AuthLayout } from "../../components/auth/AuthLayout.tsx";
import { LoginForm } from "../../components/auth/LoginForm.tsx";

export const Login: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
