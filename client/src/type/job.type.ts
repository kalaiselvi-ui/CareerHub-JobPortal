export interface JobProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  skills: string[];
  companyLogo?: string;
  applicationDeadline: string;
  status: "active" | "closed" | "draft";
  createdAt: string;
  salary: {
    currency: string;
    min: number;
    max: number;
    period: "month" | "year";
  };
}

// Extended interface with full details for JobDetails component
export interface DetailedJob extends JobProps {
  workMode: "Remote" | "Hybrid" | "On-site" | string;
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level" | string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  aboutCompany: string;
}
