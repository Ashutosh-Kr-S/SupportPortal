export type AdminInfo = {
  AdminId: number;
  name: string;
  email: string;
  phone: string;
  isverified: boolean;
  IsActive: boolean;
  LastLogin: string;
  createdAt: string;
  updatedAt: string;
  role: string[];
  permissions: string[];
  campusId?: number;
};