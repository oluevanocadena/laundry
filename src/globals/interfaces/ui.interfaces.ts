import { PagedRequest } from './supabase.interface';

export interface UITableColumn {
  label: string;
  key: string;
  width: string;
  sortable: boolean;
  selected?: boolean;
}

export interface UITablePagination extends PagedRequest {
  rowCount: number;
  totalPages: number;
}

export interface UITableFilterBase {
  dateFrom: string | Date | null;
  dateTo: string | Date | null; 
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  select?: string | null;
  search?: string | null;
}

export interface UITableFilter extends UITableFilterBase, PagedRequest {}
