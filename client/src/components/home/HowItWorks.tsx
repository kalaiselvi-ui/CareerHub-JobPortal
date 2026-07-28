import React from "react";
import { UserPlus, Search, Rocket } from "lucide-react";

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const stepsData: Step[] = [
  {
    id: "1",
    number: "01",
    title: "Create Your Account",
    description: "Sign up and create your professional profile.",
    icon: UserPlus,
  },
  {
    id: "2",
    number: "02",
    title: "Search Jobs",
    description: "Explore thousands of jobs that match your skills.",
    icon: Search,
  },
  {
    id: "3",
    number: "03",
    title: "Apply & Get Hired",
    description: "Connect with companies and start your career.",
    icon: Rocket,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            How CareerHub Works
          </h2>
          <p className="text-base sm:text-lg text-surface-dark/70">
            Find your next opportunity in three simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-border-subtle -translate-y-6 z-0" />

          {stepsData.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="group relative z-10 bg-white border border-border-subtle rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-surface-dark group-hover:text-primary transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-surface-dark/70 leading-relaxed">
                    {step.description}
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

export default HowItWorks;
