import React from "react";
import {
  Briefcase,
  Building2,
  Users,
  Search,
  ArrowRight,
  Star,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-surface-light py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="flex flex-col items-start space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide">
            <Star className="w-4 h-4 fill-primary" />
            <span>Trusted by thousands of job seekers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-dark tracking-tight leading-tight">
            Find Your <span className="text-primary">Dream Job</span> Today
          </h1>

          <p className="text-base sm:text-lg text-surface-dark/80 max-w-xl leading-relaxed">
            Connect with top companies and discover opportunities that match
            your skills and career goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-7 py-3.5 rounded-xl shadow-lg shadow-[#2563EB]/25 transition-all duration-200 hover:-translate-y-0.5">
              <span>Find Jobs</span>
              <Search className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-border-subtle hover:border-secondary text-surface-dark hover:text-secondary bg-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
              <span>Post a Job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative w-full max-w-md lg:max-w-none">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-border-subtle shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="CareerHub professionals collaborating"
                className="w-full h-80 sm:h-100 object-cover"
              />
            </div>

            <div className="absolute -top-6 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-border-subtle shadow-lg flex items-center gap-3 animate-bounce [animation-duration:3s]">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-surface-dark/60 font-medium">
                  Available
                </p>
                <p className="text-sm sm:text-base font-bold text-surface-dark">
                  10K+ Jobs
                </p>
              </div>
            </div>

            <div className="absolute top-1/2 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-border-subtle shadow-lg flex items-center gap-3">
              <div className="p-2.5 bg-secondary/10 rounded-lg text-secondary">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-surface-dark/60 font-medium">
                  Trusted
                </p>
                <p className="text-sm sm:text-base font-bold text-surface-dark">
                  500+ Companies
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 sm:left-12 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-border-subtle shadow-lg flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-surface-dark/60 font-medium">
                  Active
                </p>
                <p className="text-sm sm:text-base font-bold text-surface-dark">
                  30K+ Candidates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
