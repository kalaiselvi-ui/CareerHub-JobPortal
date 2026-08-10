export type JobStatus = "active" | "draft" | "closed";
export type JobType = "full-time" | "part-time" | "contract";
export type WorkMode = "on-site" | "remote" | "hybrid";
export type ExperienceLevel = "entry level" | "mid level" | "senior level";

export interface JobProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: JobType | string;
  skills: string[];
  companyLogo?: string;
  applicationDeadline: string;
  status: JobStatus;
  createdAt: string;
  salary: {
    currency: string;
    min: number;
    max: number;
    period: "month" | "year";
  };
}

export interface DetailedJob extends JobProps {
  workMode: WorkMode | string;
  experienceLevel: ExperienceLevel | string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  aboutCompany: string;
}
