import { UITableFilter } from "@globals/interfaces/ui.interfaces";

export interface Location {
  id?: string;
  created_at?: string;
  Name: string;
  Phone: string;
  Address?: string; //For auto join in supabase

  Street: string;
  IntNumber?: string | null;
  ExtNumber?: string;
  Neighborhood: string;
  Municipality: string;
  State: string;
  Country: string;
  ZipCode: string;

  OrganizationId: string;

  Default?: boolean;
  Deleted?: boolean;
  Disabled?: boolean;

  Checked?: boolean; //Only for UI
}


export interface LocationRequest extends UITableFilter {
  disabled?: boolean | null;
}