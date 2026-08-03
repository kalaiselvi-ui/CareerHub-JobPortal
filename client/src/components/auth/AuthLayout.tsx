import React from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-surface-light text-surface-dark">
      {/* Left side: Hero / Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary to-primary-hover p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Decorative Blur Circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CareerHub</span>
        </div>

        {/* Welcome Text */}
        <div className="space-y-6 max-w-lg z-10 my-auto">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Connect with Opportunity & Build Your Dream Career
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Join thousands of professionals finding top tech roles, or hire
            elite talent tailored to your team's vision.
          </p>

          <ul className="space-y-3 pt-4 text-white/90">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
              <span>Personalized job recommendations</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
              <span>Direct connect with recruiters and hiring managers</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
              <span>Real-time application status updates</span>
            </li>
          </ul>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-white/60">
          © {new Date().getFullYear()} CareerHub Inc. All rights reserved.
        </div>
      </div>

      {/* Right side: Form container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>
    </div>
  );
};
