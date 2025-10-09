import { LogLevel } from '@globals/bussiness/error/enums/error.enum';

/**
 * Estructura de un log de error
 */
export interface ErrorLog {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: string;
  details?: any;
  stackTrace?: string;
}
