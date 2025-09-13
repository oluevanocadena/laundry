import { PagedResults } from "@globals/interfaces/supabase.interface";
import { UITableFilter } from "@globals/interfaces/ui.interfaces";

export interface Customer {
  id?: string;
  created_at?: string;
  Address?: string;
  AllowNotifications?: boolean;
  Country: string;
  CustomerNumber?: string;
  CustomerNumberSeq?: number;
  Email: string;
  ExtNumber?: string;
  FirstName: string;
  FullName: string;
  IntNumber?: string | null;
  LastName: string;
  Municipality: string;
  Neighborhood: string;
  Notes?: string;
  Phone?: string;
  State: string; 
  Street: string;
  TotalOrders?: number;
  ZipCode: string;

  OrganizationId: string;
  Deleted?: boolean;
  Disabled?: boolean;
}

export interface CustomerRequest extends UITableFilter {
  locationId?: string | null;
}


export interface CustomerPagedResults extends PagedResults<Customer> {}