import { PostgrestError } from '@supabase/supabase-js';

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

export interface EdgeFunctionResponse {
  success: boolean; // true si todo salió bien
  error?: boolean; // true si hubo error
  message?: string; // mensaje descriptivo
  statusCode: number; // HTTP-like code
  data?: any; // opcional, datos adicionales
}
