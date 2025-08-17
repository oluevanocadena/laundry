export interface Session {
  Organization: Organization;
}

export interface Organization {
  id: string; // uuid
  Name: string;
  PlanId?: string | null; // Puede ser null
  created_at: string; // ISO date string
  Deleted: boolean;
  Disabled: boolean;
}


export interface Account {
  id: string; // uuid
  FullName: string;
  Email: string;
  Phone: string;
  created_at: string; // ISO date string
  Deleted: boolean;
  Disabled: boolean;
}