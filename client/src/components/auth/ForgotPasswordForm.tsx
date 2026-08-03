import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import axios from "axios";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from "../../schemas/forgotPasswordSchema.ts";

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    setApiError(null);
    try {
      // Send reset request endpoint
      await axios.post("/api/auth/forgot-password", data);

      // Redirect to confirmation page or login with a success prompt
      navigate("/login", {
        state: { message: "Password reset link sent to your email." },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-border-subtle max-w-md w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-surface-dark">
          Forgot Password?
        </h2>
        <p className="text-sm text-surface-dark/60 mt-1">
          Enter your registered email address to receive a password reset link.
        </p>
      </div>

      {apiError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {apiError}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl shadow-md shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Link...</span>
            </>
          ) : (
            "Send Reset Link"
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
