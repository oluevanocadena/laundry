import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import { UIDefaultTableFilter } from '../../../globals/constants/supabase-tables.constants';
 

export const UsersDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter,
  sortBy: 'created_at',
};
