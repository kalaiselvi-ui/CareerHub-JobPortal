import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import axios from "axios";
import {
  resetPasswordSchema,
  type ResetPasswordSchemaType,
} from "../../schemas/resetPasswordSchema.ts";

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extracts ?token=xxx from URL

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    setApiError(null);

    if (!token) {
      setApiError("Invalid or expired reset token. Please request a new link.");
      return;
    }

    try {
      // API call sending the new password along with the reset token
      await axios.post("/api/auth/reset-password", {
        token,
        password: data.password,
      });

      // Redirect user to login with success message
      navigate("/login", {
        state: { message: "Password updated successfully! Please log in." },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-border-subtle max-w-md w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-surface-dark">
          Set New Password
        </h2>
        <p className="text-sm text-surface-dark/60 mt-1">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      {apiError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* New Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-surface-dark/80"
          >
            New Password
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
            Confirm New Password
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
                showConfirmPassword ? "Hide password" : "Show password"
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
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl shadow-md shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Resetting Password...</span>
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      {/* Back to Login Link */}
      <p className="text-center text-sm text-surface-dark/70 mt-6">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:text-primary-hover hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </div>
  );
};
