import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

export interface ProductCategory extends Omit<UISelectOption, 'id'> {
  id?: string | number | undefined | null;
  created_At?: string;
  Name: string;
  OrganizationId: string;
  Deleted?: boolean;
  Disabled?: boolean;
}

export interface ProductCategoryRequest extends Omit<UITableFilter, 'dateFrom' | 'dateTo'> {
  disabled?: boolean | null;
}
