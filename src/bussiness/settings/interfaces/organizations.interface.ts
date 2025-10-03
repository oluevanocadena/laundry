export interface Organization {
  id?: string; // uuid
  Name: string;
  PlanId?: string | null; // Puede ser null
  created_at?: string; // ISO date string
  Deleted?: boolean;
  Disabled?: boolean;
}
