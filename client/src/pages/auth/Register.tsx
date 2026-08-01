import React from "react";
import { AuthLayout } from "../../components/auth/AuthLayout.tsx";
import { RegisterForm } from "../../components/auth/RegistrationForm.tsx";

export const Register: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
