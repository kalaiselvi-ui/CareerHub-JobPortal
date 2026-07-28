import React from "react";
import { Search, MapPin, Briefcase } from "lucide-react";

export const SearchSection: React.FC = () => {
  return (
    <section className="bg-surface-light py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            Search Your Next Opportunity
          </h2>
          <p className="text-base sm:text-lg text-surface-dark/70">
            Find jobs that match your skills, experience and career goals.
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl shadow-surface-dark/5 border border-border-subtle max-w-5xl mx-auto">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col lg:flex-row items-center gap-4"
          >
            <div className="relative w-full flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Job title, skills or keywords"
                className="w-full pl-11 pr-4 py-3.5 bg-surface-light border border-border-subtle rounded-xl text-surface-dark placeholder-surface-dark/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative w-full flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-11 pr-4 py-3.5 bg-surface-light border border-border-subtle rounded-xl text-surface-dark placeholder-surface-dark/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative w-full lg:w-48">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-dark/40">
                <Briefcase className="w-5 h-5" />
              </div>
              <select
                defaultValue=""
                className="w-full pl-11 pr-8 py-3.5 bg-surface-light border border-border-subtle rounded-xl text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Job Type
                </option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-surface-dark/40">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-primary/20 shrink-0 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Search Jobs</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
