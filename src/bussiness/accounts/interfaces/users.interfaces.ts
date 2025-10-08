import { Role } from '@bussiness/accounts/interfaces/users.roles.interfaces';
import { Organization } from '@bussiness/organizations/interfaces/organizations.interface';
import { PagedRequest } from '@globals/interfaces/supabase.interface';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

export interface Account {
  id?: string;
  created_at?: string;
  invitation_sent?: boolean;
  invited_at?: string;

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
  VerifiedEmail?: boolean;

  OrganizationId: string;
  Organization?: Organization;

  AccountRoles?: AccountRole[]; // For UI only

  UserId?: string;
  Checked?: boolean; // For UI only
}

export interface AccountRole {
  id?: number; // serial, clave primaria
  AccountId: string;
  RoleId: number;
  Role?: Role; // For UI only
  OrganizationId: string;
}

export interface UsersRequest extends Omit<UITableFilter, 'dateFrom' | 'dateTo'> {
  disabled?: boolean | null;
}

export interface InviteUserRequest {
  action: 'invite' | 'resend';
  email: string;
}

export interface AccountRequest extends PagedRequest {
  search?: string;
  disabled?: boolean;
  organizationId?: string;
}
