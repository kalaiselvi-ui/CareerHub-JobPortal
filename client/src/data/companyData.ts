import { type Company, type IndustryCategory } from "../type/companies.type.ts";

export const MOCK_INDUSTRIES: IndustryCategory[] = [
  { id: "1", name: "Technology", iconName: "Laptop", companyCount: 42 },
  { id: "2", name: "Healthcare", iconName: "Activity", companyCount: 18 },
  { id: "3", name: "Finance", iconName: "DollarSign", companyCount: 25 },
  { id: "4", name: "Education", iconName: "GraduationCap", companyCount: 12 },
  { id: "5", name: "Marketing", iconName: "Megaphone", companyCount: 15 },
  { id: "6", name: "E-commerce", iconName: "ShoppingBag", companyCount: 30 },
  { id: "7", name: "Manufacturing", iconName: "Factory", companyCount: 10 },
  { id: "8", name: "Hospitality", iconName: "Hotel", companyCount: 8 },
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "TechPulse Solutions",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Technology",
    location: "Dubai, UAE",
    description:
      "Leading provider of cloud infrastructure and modern web applications across EMEA.",
    openJobsCount: 12,
  },
  {
    id: "c2",
    name: "FinFlow Global",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Finance",
    location: "Abu Dhabi, UAE",
    description:
      "Next-generation fintech company revolutionizing cross-border digital payments.",
    openJobsCount: 8,
  },
  {
    id: "c3",
    name: "HealthCore Innovation",
    logo: "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Healthcare",
    location: "Dubai, UAE",
    description:
      "Pioneering AI-driven patient diagnostic tools and health analytics software.",
    openJobsCount: 5,
  },
  {
    id: "c4",
    name: "OmniCart Digital",
    logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "E-commerce",
    location: "Riyadh, KSA",
    description:
      "Hyper-growth e-commerce ecosystem empowering regional merchants.",
    openJobsCount: 14,
  },
];
