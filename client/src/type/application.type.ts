export type ApplicationStatus =
  | "applied"
  | "pending"
  | "shortlisted"
  | "rejected"
  | "viewed";

export interface Application {
  id: string;
  candidateName: string;
  headline: string;
  location: string;
  avatar?: string;
  jobTitle: string;
  appliedAt: string;
  skills: string[];
  status: ApplicationStatus;
  email: string;
  phone?: string;
  bio?: string;
  resume?: string;
}
