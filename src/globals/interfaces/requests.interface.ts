export interface ResponseResult<T> {
  data?: T | null;
  success: boolean;
  count?: number;
  error?: RequestError | null;
}

export interface PagedRequest {
  page: number;
  pageSize: number;

  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  search?: string | null;
  segment?: string | null;
  select?: string | null;
  disabled?: boolean | null;
}

export interface ReportRequest {
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
}

export interface RequestError {
  message: string; // Mensaje de error legible
  code?: string; // Código de error (ej: "401", "PGRST116")
  details?: any; // Datos adicionales
  raw?: unknown; // Error original (para debug)
}
