/**
 * Tipos de error personalizados por dominio
 */
export type TErrorType = 'wofloo' | 'customauth' | 'supabase' | 'http' | 'unknown';

/**
 * Clase base de error personalizado
 */
export class AppError extends Error {
  constructor(public type: TErrorType, public code?: string, public friendlyMessage?: string, public originalError?: any) {
    super(friendlyMessage || originalError?.message || 'Error desconocido');
    this.name = 'AppError';
  }
}
