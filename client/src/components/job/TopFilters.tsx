import React from "react";
import {
  Briefcase,
  GraduationCap,
  DollarSign,
  Building2,
  ArrowUpDown,
  RotateCcw,
  Search,
} from "lucide-react";

export const TopFilters: React.FC = () => {
  //   const [jobType, setJobType] = useState<string>('all');
  //   const [experienceLevel, setExperienceLevel] = useState<string>('any');
  //   const [salaryRange, setSalaryRange] = useState<string>('any');
  //   const [workMode, setWorkMode] = useState<string>('all');
  //   const [sortBy, setSortBy] = useState<string>('recent');

  //   const handleClearFilters = () => {
  //     setJobType('all');
  //     setExperienceLevel('any');
  //     setSalaryRange('any');
  //     setWorkMode('all');
  //     setSortBy('recent');
  //   };

  // const isFiltered =
  //   jobType !== 'all' ||
  //   experienceLevel !== 'any' ||
  //   salaryRange !== 'any' ||
  //   workMode !== 'all' ||
  //   sortBy !== 'recent';

  return (
    <div className="w-full bg-surface-light py-4 px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-center mx-auto bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm w-full max-w-lg transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search job title..."
              className="w-full pl-10 pr-4 py-2.5 text-sm text-surface-dark placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Search
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <Briefcase className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none">
                <option value="all">All Jobs</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="relative">
              <GraduationCap className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none">
                <option value="any">Any Experience</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>

            {/* <div className="relative">
              <DollarSign className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none">
                <option value="any">Any Salary</option>
                <option value="0-3k">0-3K</option>
                <option value="3k-6k">3K–6K</option>
                <option value="6k-10k">6K–10K</option>
                <option value="10k+">10K+</option>
              </select>
            </div> */}

            <div className="relative">
              <Building2 className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none">
                <option value="all">All Modes</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown className="w-4 h-4 text-surface-dark/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none">
                <option value="recent">Most Recent</option>
                <option value="relevance">Relevance</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-surface-dark/70 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-all duration-200 cursor-pointer">
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopFilters;
