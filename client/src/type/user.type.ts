export type UserRole = "admin" | "recruiter" | "candidate";
export type UserStatus = "active" | "inactive";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  createdAt: string;
} // Mongoose automatically provides this (ISO date string)}
