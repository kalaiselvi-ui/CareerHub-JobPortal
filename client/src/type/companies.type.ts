export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  openJobsCount: number;
}

export interface IndustryCategory {
  id: string;
  name: string;
  iconName: string;
  companyCount: number;
}
