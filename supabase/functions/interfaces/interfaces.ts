export interface EdgeFunctionResponse {
  success: boolean; // true si todo salió bien
  error?: boolean; // true si hubo error
  message?: string; // mensaje descriptivo
  statusCode: number; // HTTP-like code
  data?: any; // opcional, datos adicionales
}
