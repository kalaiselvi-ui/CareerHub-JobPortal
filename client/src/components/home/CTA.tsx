import React from "react";
import { Briefcase, ArrowRight } from "lucide-react";

export const CTASection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-primary rounded-2xl px-6 py-12 sm:px-12 md:py-16 lg:py-20 text-center shadow-xl">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready To Start Your Career Journey?
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of job seekers and connect with companies looking
              for talented professionals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>Find Jobs</span>
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                <span>Post a Job</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
