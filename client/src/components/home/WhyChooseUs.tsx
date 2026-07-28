import React from "react";
import { BadgeCheck, Zap, Building2, TrendingUp } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const featuresData: Feature[] = [
  {
    id: "1",
    title: "Verified Companies",
    description: "Explore opportunities from trusted and verified employers.",
    icon: BadgeCheck,
  },
  {
    id: "2",
    title: "Easy Application Process",
    description: "Apply for jobs quickly with a simple and smooth process.",
    icon: Zap,
  },
  {
    id: "3",
    title: "Top Companies",
    description: "Find career opportunities from leading companies.",
    icon: Building2,
  },
  {
    id: "4",
    title: "Career Growth",
    description: "Discover roles that help you grow professionally.",
    icon: TrendingUp,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-surface-light py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            Why Choose CareerHub?
          </h2>
          <p className="text-base sm:text-lg text-surface-dark/70">
            We connect talented professionals with opportunities from trusted
            companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white border border-border-subtle rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-surface-dark group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-surface-dark/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
