export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  postedDate: string;
  logoUrl?: string;
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
