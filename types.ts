
export enum UserRole {
  CLIENT = 'CLIENT',
  EDITOR = 'EDITOR'
}

export interface PortfolioItem {
  id: string | number;
  title: string;
  video: string;
  thumbnail: string;
  client?: string;
}

export interface Review {
  clientName: string;
  company: string;
  rating: number;
  text: string;
  projectType: string;
  date?: string;
}

export interface Package {
  name: string;
  price: number;
  delivery: string;
  revisions?: number | string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePhoto: string;
  avatar?: string; // Kept for backward compatibility if needed
  specialty?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  rate?: number;
  portfolioVideo?: string;
  tags?: string[];
  completedProjects?: number;
  rating?: number;
  turnaround?: string;
  portfolioItems?: PortfolioItem[];
  reviews?: Review[];
  packages?: Package[];
  skills?: string[];
}
