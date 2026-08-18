import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Building,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import WelcomeSection from "../../components/dashboard/common/WelcomeSection.tsx";
import { useAuthStore } from "../../store/authStore.ts";
import {
  useCandidateDashboardStats,
  useMyApplications,
} from "../../hooks/useApplication.ts";
import ApplicationCard from "../../components/dashboard/common/ApplicationCard.tsx";
import StatCard from "../../components/dashboard/common/StatCard.tsx";
import { useNavigate } from "react-router-dom";

export default function CandidateDashboard() {
  const { user } = useAuthStore();
  const { data: candidateStats } = useCandidateDashboardStats();
  const { data: applications = [] } = useMyApplications();
  const navigate = useNavigate();

  // Stats Configuration using Custom Tokens
  const stats = [
    {
      label: "Total Applications",
      count: candidateStats?.totalApplications ?? 0,
      icon: Briefcase,
      iconBgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      label: "Pending",
      count: candidateStats?.pendingApplications ?? 0,
      icon: Clock,
      iconBgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Shortlisted",
      count: candidateStats?.shortlistedApplications ?? 0,
      icon: CheckCircle,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Rejected",
      count: candidateStats?.rejectedApplications ?? 0,
      icon: XCircle,
      iconBgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  const recommendedJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechNova Solutions",
      location: "Dubai, UAE",
      workMode: "Full-time",
      salary: "AED 10,000 – 14,000 / month",
      skills: ["React.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "Cloud Systems",
      location: "Remote",
      workMode: "Full-time",
      salary: "AED 12,000 – 16,000 / month",
      skills: ["React.js", "Node.js", "MongoDB"],
    },
    {
      id: "3",
      title: "React Developer",
      company: "Digital Labs",
      location: "Abu Dhabi, UAE",
      workMode: "Full-time",
      salary: "AED 9,000 – 13,000 / month",
      skills: ["React.js", "JavaScript", "TypeScript"],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. PAGE HEADER */}
        <WelcomeSection
          userName={
            user?.fullName ? `${user.fullName} (Candidate)` : "Candidate"
          }
          roleDescription="Track your job applications and discover your next opportunity."
        />

        {/* 2. APPLICATION STATISTICS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.label}
              value={stat.count}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
              iconColor={stat.iconColor}
            />
          ))}
        </section>

        {/* 3. RECENT APPLICATIONS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-surface-dark">
              Recent Applications
            </h2>
            <button
              disabled={applications.length < 3}
              onClick={() => navigate("/candidate/dashboard")}
              className="text-sm font-semibold disabled:cursor-not-allowed disabled:text-surface-dark/40 disabled:hover:text-surface-dark/40 text-primary hover:text-primary-hover flex items-center gap-1 transition-colors cursor-pointer"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.slice(0, 3).map((app) => (
              <ApplicationCard key={app._id} application={app} />
            ))}
          </div>
        </section>

        {/* 4. RECOMMENDED JOBS */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-surface-dark">
              Recommended Jobs
            </h2>
            <p className="text-xs sm:text-sm text-surface-dark/60">
              Opportunities that match your skills and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-border-subtle p-5 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-surface-dark text-base">
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-surface-dark/70 flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-surface-dark/40" />
                      {job.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-surface-dark/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-surface-dark/40" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.workMode}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-surface-dark">
                    {job.salary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-surface-light text-surface-dark/70 text-xs rounded border border-border-subtle font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <button className="w-full py-2 px-3 bg-white border border-border-subtle text-surface-dark hover:text-primary hover:border-primary font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROFILE COMPLETION CARD */}
        <section className="bg-white rounded-xl border border-border-subtle p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-surface-dark">
                  Complete Your Profile
                </h2>
              </div>
              <p className="text-sm text-surface-dark/60">
                Complete your profile to help recruiters discover you.
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-surface-dark/70">
                    Profile Completion
                  </span>
                  <span className="text-primary">70%</span>
                </div>
                <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden border border-border-subtle">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center sm:self-center">
              <button className="w-full sm:w-auto px-4 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold text-sm rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer">
                Complete Profile
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
