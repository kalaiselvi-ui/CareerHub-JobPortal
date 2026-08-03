import React from "react";
import { Link } from "react-router-dom";
import {
  Send,
  CheckCircle,
  Briefcase,
  Users,
  Building,
  Target,
  BarChart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-surface-dark">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-blue-200">
              About CareerHub
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Connecting Talent With Opportunity
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
              CareerHub makes it easier for job seekers to discover
              opportunities and for companies to find the right talent through
              modern, streamlined tools.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl max-w-md w-full space-y-6 text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">10,000+ Jobs</h3>
                  <p className="text-xs text-surface-light">
                    Active listings worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-xl">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">2,500+ Companies</h3>
                  <p className="text-xs text-surface-light">
                    Top tech & global employers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About CareerHub */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold text-surface-dark">
            About CareerHub
          </h2>
          <p className="text-surface-dark text-base leading-relaxed">
            Founded with the mission to modernize hiring, CareerHub brings job
            seekers and recruiters together in a clean, transparent platform.
            Whether you are taking the next step in your developer career or
            building an elite engineering team, CareerHub provides the
            end-to-end tooling you need.
          </p>
        </div>
      </section>

      {/* 3. How CareerHub Works */}
      <section className="py-16 bg-white border-y border-border-subtle px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-surface-dark">
              How CareerHub Works
            </h2>
            <p className="text-slate-500 text-sm">
              Simple, intuitive steps to get you hired or help you hire.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Job Seekers */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-border-subtle space-y-6">
              <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-surface-dark">
                  For Job Seekers
                </h3>
              </div>
              <ol className="space-y-4">
                {[
                  {
                    title: "Create your profile",
                    desc: "Build a rich profile showcasing your experience and stack.",
                  },
                  {
                    title: "Discover jobs",
                    desc: "Filter roles tailored to your preferred location and compensation.",
                  },
                  {
                    title: "Apply for opportunities",
                    desc: "Submit applications directly with one click.",
                  },
                  {
                    title: "Track applications",
                    desc: "Monitor your application status in real-time.",
                  },
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-surface-dark text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Recruiters */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-border-subtle space-y-6">
              <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
                <Building className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-surface-dark">
                  For Recruiters
                </h3>
              </div>
              <ol className="space-y-4">
                {[
                  {
                    title: "Create company profile",
                    desc: "Highlight your mission, culture, and active locations.",
                  },
                  {
                    title: "Post jobs",
                    desc: "Publish open roles and reach thousands of qualified applicants.",
                  },
                  {
                    title: "Discover candidates",
                    desc: "Search through curated candidate profiles.",
                  },
                  {
                    title: "Manage applications",
                    desc: "Streamline interviews and candidate communications.",
                  },
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-surface-dark text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why CareerHub */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-surface-dark">
            Why Choose CareerHub
          </h2>
          <p className="text-slate-500 text-sm">
            Designed specifically to make hiring faster and fairer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Find Relevant Opportunities",
              desc: "Smart filters match your skills directly to compatible roles.",
            },
            {
              icon: Send,
              title: "Easy Job Applications",
              desc: "Apply in seconds without repetitive form entries.",
            },
            {
              icon: Building,
              title: "Discover Great Companies",
              desc: "Explore employer profiles, perks, and team cultures.",
            },
            {
              icon: BarChart,
              title: "Recruiter Tools",
              desc: "Powerful applicant management and filtering dashboards.",
            },
            {
              icon: CheckCircle,
              title: "Application Tracking",
              desc: "Always stay informed on where your application stands.",
            },
            {
              icon: ShieldCheck,
              title: "Verified Companies",
              desc: "Safeguarding applicants against spam and fraudulent postings.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-3"
            >
              <div className="p-3 bg-blue-50 text-primary rounded-xl w-fit">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-surface-dark text-base">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Job Seeker / Recruiter CTA */}
      <section className="py-16 bg-slate-100 border-t border-border-subtle px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-border-subtle shadow-sm space-y-4">
            <h3 className="text-2xl font-bold text-surface-dark">
              Job Seekers
            </h3>
            <p className="text-slate-600 text-sm">
              Find your next opportunity and take the next step in your career.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-white font-medium text-sm rounded-xl hover:bg-primary transition-colors shadow-md shadow-primary/20"
            >
              <span>Find Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border-subtle shadow-sm space-y-4">
            <h3 className="text-2xl font-bold text-surface-dark">Recruiters</h3>
            <p className="text-slate-600 text-sm">
              Find talented professionals and build your team with ease.
            </p>
            <Link
              to="/post-job"
              className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-primary/20"
            >
              <span>Post a Job</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-indigo-700 text-white text-center px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to take the next step?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/jobs"
              className="w-full sm:w-auto py-3 px-8 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Find Jobs
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto py-3 px-8 bg-primary border border-blue-400 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors text-sm"
            >
              Join CareerHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
