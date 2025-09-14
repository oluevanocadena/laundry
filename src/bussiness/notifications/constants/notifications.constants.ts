import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import moment from 'moment';

export const NotificationsDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter, 
  sortBy: 'created_At',
};
