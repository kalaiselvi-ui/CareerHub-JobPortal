import React from "react";
import { ArrowRight } from "lucide-react";
import JobCard from "../common/JobCard.tsx";
import JobData from "../../data/jobData.ts";

export const FeaturedJobs: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            Featured Jobs
          </h2>
          <p className="text-base sm:text-lg text-surface-dark/70">
            Discover the latest opportunities from top companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JobData?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="text-center pt-4">
          <button className="inline-flex items-center justify-center gap-2 border-2 border-border-subtle hover:border-primary text-surface-dark hover:text-primary bg-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <span>View All Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
