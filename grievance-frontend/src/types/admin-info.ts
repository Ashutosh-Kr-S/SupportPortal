export type AdminRole =
  | "superadmin"
  | "campus admin"
  | "campus academic"
  | "campus examination"
  | "university academic"
  | "campus non-academic"
  | "university examination"
  | "university non-academic";

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
  role: AdminRole[];
  permissions: string[];
  campusId?: number;
};
