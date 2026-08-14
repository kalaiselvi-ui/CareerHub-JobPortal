import React from "react";

interface WelcomeSectionProps {
  userName?: string;
  roleDescription?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName = "User",
  roleDescription = "Here's an overview of your recruitment activity.",
}) => (
  <div className="rounded-xl bg-blue-50/60 p-4 sm:p-6 border border-blue-100">
    <h2 className="text-xl font-semibold text-gray-900">
      Welcome back, {userName} 👋
    </h2>
    <p className="mt-1 text-sm text-gray-600">{roleDescription}</p>
  </div>
);

export default WelcomeSection;
