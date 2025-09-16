import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

export const ProductCategoriesDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter, 
  sortBy: 'created_At',
};
