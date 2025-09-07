import { Organization } from '@bussiness/session/organizations.interface';

export interface Account {
  id?: string;
  created_at?: string;

  FirstName: string;
  LastName: string;
  FullName?: string;
  Email: string;
  Phone: string;

  Street: string;
  IntNumber?: string | null;
  ExtNumber?: string;
  Neighborhood: string;
  Municipality: string;
  State: string;
  Country: string;
  ZipCode: string;

  BillingAddress?: string;
  IsOwner?: boolean;

  Deleted?: boolean;
  Disabled?: boolean;

  OrganizationId: string;
  Organization?: Organization;
}

export interface Role {
  id?: string; // uuid
  createdAt?: string;
  Name: string;
  Description?: string;
}

export interface AccountRole {
  id?: number; // serial, clave primaria
  AccountId: string;
  RoleId?: number | null;
  Role?: Role; // For UI only
  OrganizationId: string;
}
