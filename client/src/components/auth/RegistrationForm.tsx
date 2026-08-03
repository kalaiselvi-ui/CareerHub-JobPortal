import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Mail,
  Lock,
  UserCheck,
  Briefcase,
} from "lucide-react";
import { SocialLogin } from "./SocialLogin";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../../schemas/registerSchema.ts";
import { authMutation } from "../../mutations/authMutation.ts";
import toast from "react-hot-toast";
import axios from "axios";

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "candidate",
    },
  });

  const { registerMutation } = authMutation();

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterSchemaType) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        toast.success("User created successfully");
        navigate("/login");
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          console.log("Backend Error Details:", err.response?.data);
        }
      },
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-border-subtle">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-surface-dark">
          Create an Account
        </h2>
        <p className="text-sm text-surface-dark/60 mt-1">
          Join CareerHub today to access top jobs and companies.
        </p>
      </div>

      {registerMutation.isError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {registerMutation.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Role Selection */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-surface-dark/80">
            I am joining as a
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("role", "candidate")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                selectedRole === "candidate"
                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                  : "border-border-subtle text-surface-dark/70 hover:bg-surface-light"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setValue("role", "recruiter")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                selectedRole === "recruiter"
                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                  : "border-border-subtle text-surface-dark/70 hover:bg-surface-light"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Recruiter
            </button>
          </div>
          {errors.role && (
            <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-surface-dark/80"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
              <User className="w-4 h-4" />
            </div>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              aria-invalid={errors.fullName ? "true" : "false"}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm placeholder:text-surface-dark/40 outline-none transition-all ${
                errors.fullName
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-surface-dark/80"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm placeholder:text-slate-400 outline-none transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-surface-dark/80"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm placeholder:text-surface-dark/40 outline-none transition-all ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-dark/40 hover:text-surface-dark/70"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-surface-dark/80"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm placeholder:text-surface-dark/40 outline-none transition-all ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-dark/40 hover:text-surface-dark/70"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl shadow-md shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Social Logins */}
      <SocialLogin />

      {/* Login Link */}
      <p className="text-center text-sm text-surface-dark/70 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:text-primary-hover hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};
