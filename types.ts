export enum UserRole {
  FARMER = 'FARMER',
  WORKER = 'WORKER',
  PROVIDER = 'PROVIDER',
  NONE = 'NONE'
}

export enum Language {
  EN = 'English',
  HI = 'Hindi',
  ES = 'Spanish'
}

export interface Job {
  id: string;
  farmerId: string;
  farmerName: string;
  workType: string;
  date: string;
  wage: number;
  location: string;
  description?: string;
  status: 'OPEN' | 'FILLED' | 'COMPLETED';
}

export interface WorkerProfile {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  distance: number; // km
  available: boolean;
}

export interface Equipment {
  id: string;
  providerId: string;
  type: string;
  name: string;
  image: string;
  rentPerDay: number;
  available: boolean;
  location: string;
}

export interface RentalHistory {
  id: string;
  equipmentName: string;
  farmerName: string;
  date: string;
  amount: number;
}