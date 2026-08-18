import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ApplicationCard } from "../../components/dashboard/common/ApplicationCard.tsx";
import { useMyApplications } from "../../hooks/useApplication.ts";

export default function MyApplications() {
  const { data: applications = [] } = useMyApplications();

  return (
    <div className="min-h-screen bg-surface-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border-subtle pb-5">
          <div>
            <h1 className="text-2xl font-bold text-surface-dark tracking-tight">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-surface-dark/60">
              Track the status of your job applications and stay updated on your
              job search.
            </p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            12 Applications
          </span>
        </div>

        {/* APPLICATION FILTERS */}
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-dark/40" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-surface-light border border-border-subtle rounded-lg text-surface-dark placeholder-surface-dark/40 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <select className="w-full sm:w-auto text-sm bg-surface-light border border-border-subtle rounded-lg px-3 py-2 text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all cursor-pointer">
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select className="w-full sm:w-auto text-sm bg-surface-light border border-border-subtle rounded-lg px-3 py-2 text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all cursor-pointer">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* RESPONSIVE GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {applications.map((app) => (
            <ApplicationCard key={app._id} application={app} />
          ))}
        </div>
      </div>
    </div>
  );
}
