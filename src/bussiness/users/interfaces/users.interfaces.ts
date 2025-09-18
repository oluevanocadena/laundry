import { Organization } from '@bussiness/session/interfaces/organizations.interface';
import { Role } from '@bussiness/users/interfaces/users.roles.interfaces';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

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

  AccountRoles?: AccountRole[]; // For UI only
}

export interface AccountRole {
  id?: number; // serial, clave primaria
  AccountId: string;
  RoleId?: number | null;
  Role?: Role; // For UI only
  OrganizationId: string;
}

export interface UsersRequest extends Omit<UITableFilter, 'dateFrom' | 'dateTo'> {
  disabled?: boolean | null;
}
