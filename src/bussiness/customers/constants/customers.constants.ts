import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

export const CustomerDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter,
  sortBy: 'created_at',
};
