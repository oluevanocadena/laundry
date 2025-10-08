import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { system } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Mantener solo los últimos 100 logs en memoria

  constructor(private nzMessageService: NzMessageService) {}

  /**
   * Maneja un error y muestra un mensaje al usuario
   */
  handleError(error: any, context?: string, userMessage?: string): void {
    const errorLog = this.createErrorLog(error, context, LogLevel.Error);
    this.addLog(errorLog);

    // Mostrar mensaje al usuario
    const message = userMessage || this.getUserFriendlyMessage(error);
    this.nzMessageService.error(message);

    // Log en consola si estamos en desarrollo
    if (!system.production) {
      console.error(`⛔ Error en ${context || 'aplicación'}:`, error);
    }
  }

  /**
   * Maneja un error crítico del sistema
   */
  handleCriticalError(error: any, context?: string, userMessage?: string): void {
    const errorLog = this.createErrorLog(error, context, LogLevel.Critical);
    this.addLog(errorLog);

    // Mostrar mensaje al usuario
    const message = userMessage || 'Ocurrió un error crítico. Por favor, contacte al soporte.';
    this.nzMessageService.error(message, { nzDuration: 5000 });

    // Siempre log en consola para errores críticos
    console.error(`🚨 Error crítico en ${context || 'aplicación'}:`, error);

    // Aquí podrías enviar el error a un servicio externo (Sentry, LogRocket, etc.)
    this.sendToExternalLogger(errorLog);
  }

  /**
   * Muestra una advertencia al usuario
   */
  warning(message: string, context?: string): void {
    const log = this.createLog(message, context, LogLevel.Warning);
    this.addLog(log);
    this.nzMessageService.warning(message);

    if (!system.production) {
      console.warn(`⚠️ Warning en ${context || 'aplicación'}:`, message);
    }
  }

  /**
   * Muestra un mensaje informativo
   */
  info(message: string, context?: string): void {
    const log = this.createLog(message, context, LogLevel.Info);
    this.addLog(log);
    this.nzMessageService.info(message);
  }

  /**
   * Muestra un mensaje de éxito
   */
  success(message: string, context?: string): void {
    const log = this.createLog(message, context, LogLevel.Info);
    this.addLog(log);
    this.nzMessageService.success(message);
  }

  /**
   * Log de debug (solo en desarrollo)
   */
  debug(message: string, details?: any, context?: string): void {
    if (!system.production) {
      const log = this.createLog(message, context, LogLevel.Debug, details);
      this.addLog(log);
      console.log(`🐛 Debug en ${context || 'aplicación'}:`, message, details);
    }
  }

  /**
   * Obtiene todos los logs almacenados
   */
  getLogs(level?: LogLevel): ErrorLog[] {
    if (level !== undefined) {
      return this.logs.filter((log) => log.level === level);
    }
    return [...this.logs];
  }

  /**
   * Limpia todos los logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Exporta los logs como JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Crea un log de error
   */
  private createErrorLog(error: any, context?: string, level: LogLevel = LogLevel.Error): ErrorLog {
    return {
      timestamp: new Date(),
      level,
      message: error?.message || 'Error desconocido',
      context,
      details: {
        code: error?.code,
        status: error?.status,
        raw: error,
      },
      stackTrace: error?.stack,
    };
  }

  /**
   * Crea un log simple
   */
  private createLog(message: string, context?: string, level: LogLevel = LogLevel.Info, details?: any): ErrorLog {
    return {
      timestamp: new Date(),
      level,
      message,
      context,
      details,
    };
  }

  /**
   * Agrega un log a la lista (mantiene solo los últimos maxLogs)
   */
  private addLog(log: ErrorLog): void {
    this.logs.push(log);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Eliminar el más antiguo
    }
  }

  /**
   * Obtiene un mensaje amigable para el usuario basado en el error
   */
  getUserFriendlyMessage(error: any): string {
    // Errores de Supabase
    if (error?.code) {
      switch (error.code) {
        case 'PGRST116':
          return 'No se encontró el registro solicitado';
        case '23505':
          return 'Ya existe un registro con esos datos';
        case '23503':
          return 'No se puede eliminar porque está siendo usado';
        case '42501':
          return 'No tienes permisos para realizar esta acción';
        default:
          return 'Ocurrió un error al realizar la acción';
      }
    }

    // Errores HTTP
    if (error?.status) {
      switch (error.status) {
        case 400:
          return 'El correo electrónico ingresado no es válido';
        case 401:
          return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente';
        case 403:
          return 'No tienes permisos para realizar esta acción';
        case 404:
          return 'No se encontró el recurso solicitado';
        case 500:
          return 'Error en el servidor. Por favor, intenta nuevamente';
        case 503:
          return 'El servicio no está disponible temporalmente';
        default:
          return 'Ocurrió un error al realizar la acción';
      }
    }

    return error?.message || 'Ocurrió un error al realizar la acción';
  }

  /**
   * Envía el error a un servicio externo de logging
   */
  private sendToExternalLogger(log: ErrorLog): void {
    // Aquí puedes integrar con servicios como:
    // - Sentry
    // - LogRocket
    // - Application Insights
    // - Firebase Crashlytics
    // etc.
    // Ejemplo con Sentry (comentado):
    // if (environment.production) {
    //   Sentry.captureException(log.details?.raw, {
    //     level: 'error',
    //     contexts: {
    //       app: {
    //         context: log.context,
    //         message: log.message,
    //       },
    //     },
    //   });
    // }
  }
}

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

export interface ErrorLog {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: string;
  details?: any;
  stackTrace?: string;
}
