import { Injectable } from '@angular/core';

import { system } from '@environments/environment';
import { LogLevel } from '@globals/bussiness/error/enums/error.enum';
import { ErrorLog } from '@globals/bussiness/error/interfaces/error.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Mantener solo los últimos 100 logs en memoria
  private _debugMode: boolean = !system.production;

  constructor() {}

  public set debugMode(value: boolean) {
    this._debugMode = value;
  }

  public get debugMode(): boolean {
    return this._debugMode;
  }

  /**
   * Log de nivel debug (solo en desarrollo)
   */
  log(...args: any[]): void {
    if (this._debugMode) {
      console.log(...args);
    }
  }

  /**
   * Log de nivel debug con contexto
   */
  debug(message: string, details?: any, context?: string): void {
    if (this._debugMode) {
      const log = this.createLog(message, context, LogLevel.Debug, details);
      this.addLog(log);
      console.log(`🐛 Debug en ${context || 'aplicación'}:`, message, details);
    }
  }

  /**
   * Log de nivel info
   */
  info(message: string, context?: string, details?: any): void {
    const log = this.createLog(message, context, LogLevel.Info, details);
    this.addLog(log);
    
    if (this._debugMode) {
      console.info(`ℹ️ Info en ${context || 'aplicación'}:`, message, details);
    }
  }

  /**
   * Log de nivel warning
   */
  warn(message: string, context?: string, details?: any): void {
    const log = this.createLog(message, context, LogLevel.Warning, details);
    this.addLog(log);
    
    if (this._debugMode) {
      console.warn(`⚠️ Warning en ${context || 'aplicación'}:`, message, details);
    }
  }

  /**
   * Log de nivel error
   */
  logError(error: any, context?: string): void {
    const errorLog = this.createErrorLog(error, context, LogLevel.Error);
    this.addLog(errorLog);
    
    if (this._debugMode) {
      console.error(`⛔ Error en ${context || 'aplicación'}:`, error);
    }
  }

  /**
   * Log de nivel crítico
   */
  critical(error: any, context?: string): void {
    const errorLog = this.createErrorLog(error, context, LogLevel.Critical);
    this.addLog(errorLog);
    
    console.error(`🚨 Error crítico en ${context || 'aplicación'}:`, error);
    this.sendToExternalLogger(errorLog);
  }

  /**
   * Log de trace (para debugging detallado)
   */
  logTrace(trace: string): void {
    if (this._debugMode) {
      console.trace(trace);
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
   * Obtiene la cantidad de logs por nivel
   */
  getLogCountByLevel(): Record<LogLevel, number> {
    return this.logs.reduce(
      (acc, log) => {
        acc[log.level] = (acc[log.level] || 0) + 1;
        return acc;
      },
      {} as Record<LogLevel, number>
    );
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
        type: error?.type,
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
      this.logs.shift();
    }
  }

  /**
   * Envía el log a un servicio externo de logging (Sentry, etc.)
   */
  private sendToExternalLogger(log: ErrorLog): void {
    // Aquí puedes integrar servicios externos como Sentry, LogRocket, etc.
    // TODO: Implementar integración con servicio externo
  }
}

