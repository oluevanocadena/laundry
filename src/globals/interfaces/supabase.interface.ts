import { PostgrestError } from '@supabase/supabase-js';

export type SupabaseBaseResponse<T> = {
  data?: T | null;
  success: boolean;
  count?: number;
  error?: AppError | null;
};

export interface SupabaseResponse<T> {
  response?: T;
  success: boolean;
  error?: string | PostgrestError | any | null;
}

export interface PagedResults<T> {
  data: T[];
  count: number;
}

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
