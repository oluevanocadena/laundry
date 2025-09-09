export type SupabaseResponse<T> = {
  data?: T | null;
  success: boolean;
  count?: number;
  error?: AppError | null;
};

export interface PagedRequest {
  page: number;
  pageSize: number;
}


export interface AppError {
  message: string; // Mensaje de error legible
  code?: string; // Código de error (ej: "401", "PGRST116")
  details?: any; // Datos adicionales
  raw?: unknown; // Error original (para debug)
}

export interface TablePagination extends PagedRequest {
  rowCount: number;
  totalPages: number;
}