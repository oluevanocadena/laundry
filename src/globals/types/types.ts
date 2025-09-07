
export type SupabaseResponse<T> = {
  data?: T | null;
  success: boolean;
  error?: AppError | null;
};

export interface AppError {
  message: string; // Mensaje de error legible
  code?: string; // Código de error (ej: "401", "PGRST116")
  details?: any; // Datos adicionales
  raw?: unknown; // Error original (para debug)
}
