import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import { UIDefaultTableFilter } from './supabase-tables.constants';

export const CustomerDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter,
  sortBy: 'created_at',
};
