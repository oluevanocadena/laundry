import { PagedRequest } from "./supabase.interface";

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

export interface UITableFilter extends PagedRequest {
  dateFrom: string | null;
  dateTo: string | null;
  statusId: number | null;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
}
