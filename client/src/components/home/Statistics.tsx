import React from "react";
import { Briefcase, Building2, Users, TrendingUp } from "lucide-react";

interface StatItem {
  id: string;
  number: string;
  label: string;
  icon: React.ElementType;
}

const statisticsData: StatItem[] = [
  {
    id: "1",
    number: "10K+",
    label: "Active Jobs",
    icon: Briefcase,
  },
  {
    id: "2",
    number: "500+",
    label: "Companies",
    icon: Building2,
  },
  {
    id: "3",
    number: "30K+",
    label: "Job Seekers",
    icon: Users,
  },
  {
    id: "4",
    number: "95%",
    label: "Success Rate",
    icon: TrendingUp,
  },
];

const Statistics: React.FC = () => {
  return (
    <section className="bg-primary py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            CareerHub By Numbers
          </h2>
          <p className="text-base sm:text-lg text-white/80">
            Helping professionals find opportunities and companies discover
            talented people.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statisticsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-xl bg-white/15 text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <p className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    {stat.number}
                  </p>
                  <p className="text-base font-medium text-white/80">
                    {stat.label}
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

export default Statistics;
