import React from "react";
import {
  Layout,
  Server,
  Layers,
  Palette,
  Smartphone,
  Terminal,
  ArrowRight,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  jobsCount: number;
  icon: React.ElementType;
}

const categoriesData: Category[] = [
  { id: "1", name: "Frontend Developer", jobsCount: 120, icon: Layout },
  { id: "2", name: "Backend Developer", jobsCount: 95, icon: Server },
  { id: "3", name: "Full Stack Developer", jobsCount: 150, icon: Layers },
  { id: "4", name: "UI/UX Designer", jobsCount: 80, icon: Palette },
  { id: "5", name: "Mobile Developer", jobsCount: 65, icon: Smartphone },
  { id: "6", name: "DevOps Engineer", jobsCount: 45, icon: Terminal },
];

export const Categories: React.FC = () => {
  return (
    <section className="bg-surface-light py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            Explore Popular Categories
          </h2>
          <p className="text-base sm:text-lg text-surface-dark/70">
            Find opportunities across different technology and career fields.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group bg-white border border-border-subtle rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-surface-dark group-hover:text-primary transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-sm font-medium text-surface-dark/60">
                      {category.jobsCount} Jobs Available
                    </p>
                  </div>
                </div>

                <div className="text-surface-dark/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
