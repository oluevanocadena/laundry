import { UIButtonAppearance } from '@globals/types/ui.button.type';
import { PagedRequest } from '@globals/interfaces/requests.interface';

export interface UITableColumn {
  label: string;
  key: string;
  width: string;
  sortable: boolean;
  selected?: boolean;
}

export interface UITablePagination {
  pageSize: number;
  page: number;
  rowCount: number;
  totalPages: number;
}

export interface UITableActions {
  label: string;
  icon?: string;
  appearance: UIButtonAppearance;
  action: () => void;
}

export interface UITableFilter extends PagedRequest {}
