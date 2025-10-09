import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import { Account, AccountRole } from '@bussiness/accounts/interfaces/accounts.interfaces';
import { RoleEnum } from '@bussiness/session/enums/role.enums';

export const AccountsDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter,
  sortBy: 'created_at',
};

export const AccountsEmpty: Account = {
  Email: '',
  OrganizationId: '',
  FirstName: '',
  LastName: '',
  Phone: '',
  Street: '',
  Neighborhood: '',
  Municipality: '',
  State: '',
  Country: '',
  ZipCode: '',
  BillingAddress: '',
  IsOwner: true,
};

export const DefaultAccountRoles: AccountRole[] = [
  {
    AccountId: '',
    RoleId: RoleEnum.Owner,
    OrganizationId: '',
  },
  {
    AccountId: '',
    RoleId: RoleEnum.Admin,
    OrganizationId: '',
  },
];
