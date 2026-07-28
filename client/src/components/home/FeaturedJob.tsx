import React from "react";
import {
  MapPin,
  DollarSign,
  Bookmark,
  ArrowRight,
  Briefcase,
  Building,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
}

const jobsData: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120K - $140K / yr",
    type: "Full Time",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Innovate Labs",
    location: "New York, NY",
    salary: "$130K - $150K / yr",
    type: "Full Time",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "3",
    title: "Backend Node.js Developer",
    company: "DataFlow Systems",
    location: "Remote",
    salary: "$110K - $130K / yr",
    type: "Contract",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "4",
    title: "React Native Developer",
    company: "AppPulse Inc",
    location: "Austin, TX",
    salary: "$100K - $125K / yr",
    type: "Full Time",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "5",
    title: "MERN Stack Lead",
    company: "CloudScale Technologies",
    location: "Seattle, WA",
    salary: "$140K - $165K / yr",
    type: "Full Time",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "6",
    title: "Junior Software Engineer",
    company: "NextGen Software",
    location: "Remote",
    salary: "$80K - $95K / yr",
    type: "Internship",
    skills: ["React", "TypeScript", "Node.js"],
  },
];

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
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="group bg-white border border-border-subtle rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-light border border-border-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-surface-dark group-hover:text-primary transition-colors duration-200 line-clamp-1">
                        {job.title}
                      </h3>
                      <p className="text-sm font-medium text-surface-dark/60">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <button className="text-surface-dark/40 hover:text-secondary transition-colors duration-200 p-1">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-surface-dark/70 font-medium pt-1">
                  <div className="flex items-center gap-1.5 bg-surface-light px-2.5 py-1 rounded-md border border-border-subtle">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-light px-2.5 py-1 rounded-md border border-border-subtle">
                    <DollarSign className="w-3.5 h-3.5 text-secondary" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium bg-surface-light text-surface-dark/80 px-2.5 py-1 rounded-md border border-border-subtle"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md shadow-primary/10 transition-all duration-200 cursor-pointer text-center">
                  Apply Now
                </button>
              </div>
            </div>
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
