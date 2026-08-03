import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { SocialLogin } from "./SocialLogin";
import {
  loginSchema,
  type LoginSchemaType,
} from "../../schemas/loginSchema.ts";
import { authMutation } from "../../mutations/authMutation.ts";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore.ts";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const { loginMutation } = authMutation();
  const login = useAuthStore((state) => state.login);
  const onSubmit = async (data: LoginSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        login(response.user, response.token);
        toast.success(`Login Successfully ${response?.user?.fullName}`);
        navigate("/");
      },
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-border-subtle max-w-md w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-surface-dark">Welcome Back</h2>
        <p className="text-sm text-surface-dark/60 mt-1">
          Please enter your credentials to access your account.
        </p>
      </div>

      {loginMutation.isError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {loginMutation.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm placeholder:text-surface-dark/40 outline-none transition-all ${
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

        {/* Password Field with Forgot Password Link */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-surface-dark/80"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl shadow-md shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Logging In...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Social Logins */}
      <SocialLogin />

      {/* Register Link */}
      <p className="text-center text-sm text-surface-dark/70 mt-6">
        Don't have an Account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:text-primary-hover hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};
