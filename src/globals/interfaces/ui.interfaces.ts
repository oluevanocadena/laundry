import { PagedRequest } from './supabase.interface';

export interface UITableColumn {
  label: string;
  key: string;
  width: string;
  sortable: boolean;
}

export interface UITablePagination extends PagedRequest {
  rowCount: number;
  totalPages: number;
}

export interface UITableFilterBase {
  dateFrom: string | Date | null;
  dateTo: string | Date | null;
  statusId: number | null;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
}

export interface UITableFilter extends UITableFilterBase, PagedRequest {}
