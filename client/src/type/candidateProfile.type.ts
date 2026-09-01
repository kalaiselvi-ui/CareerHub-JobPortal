export interface CandidateProfile {
  basicInfo: {
    fullName: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
  };

  about: string;

  skills: string[];

  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];

  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
  }[];

  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };

  resume?: string;
}
