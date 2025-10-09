import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { system } from '@environments/environment';
import { ErrorTypeEnum } from '@globals/bussiness/error/enums/error.enum';
import { AppError } from '@globals/bussiness/error/types/error.types';
import { I18nService } from '@globals/services/i18n.service';
import { LoggerService } from '@globals/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private nzMessageService: NzMessageService,
    private i18nService: I18nService,
    private logger: LoggerService
  ) {}

  /**
   * Maneja un error y muestra un mensaje al usuario
   */
  handleError(error: any, context?: string, userMessage?: string): void {
    this.logger.logError(error, context);

    const message = userMessage || this.getUserFriendlyMessage(error);
    this.nzMessageService.error(message);
  }

  /**
   * Maneja un error crítico del sistema
   */
  handleCriticalError(error: any, context?: string, userMessage?: string): void {
    this.logger.critical(error, context);

    const message = userMessage || 'Ocurrió un error crítico. Por favor, contacte al soporte.';
    this.nzMessageService.error(message, { nzDuration: 5000 });
  }


  /**
   * Obtiene un mensaje amigable para el usuario basado en el error
   */
  private getUserFriendlyMessage(error: any): string {
    // 🧩 Errores personalizados AppError
    if (error instanceof AppError) {
      switch (error.type) {
        case ErrorTypeEnum.Wofloo:
          switch (error.code) {
            case 'INVALID_CUSTOMER':
              return 'El cliente no existe o no está activo';
            case 'SYNC_FAILED':
              return 'No se pudo sincronizar con Wofloo, intenta más tarde';
            default:
              return error.friendlyMessage || 'Error en el sistema Wofloo';
          }

        case ErrorTypeEnum.CustomAuth:
          switch (error.code) {
            case 'EXPIRED_TOKEN':
              return 'Tu sesión ha expirado, por favor inicia sesión nuevamente';
            case 'INVALID_CREDENTIALS':
              return 'Usuario o contraseña incorrectos';
            default:
              return error.friendlyMessage || 'Error de autenticación';
          }

        case ErrorTypeEnum.Supabase:
          return this.mapSupabaseError(error.code || '');

        case ErrorTypeEnum.Http:
          return this.mapHttpError(error.originalError?.status);

        default:
          return error.friendlyMessage || 'Ocurrió un error inesperado';
      }
    }

    if (error?.constructor?.name === 'AuthApiError') {
      return this.i18nService.t(`errors.auth.${error.message}`);
    }

    // 🔹 Errores Supabase (sin AppError)
    if (error?.code) {
      return this.mapSupabaseError(error.code);
    }

    // 🔹 Errores HTTP (sin AppError)
    if (error?.status) {
      return this.mapHttpError(error.status);
    }

    return error?.message || 'Ocurrió un error al realizar la acción';
  }

  /**
   * Mapeo de errores de Supabase
   */
  private mapSupabaseError(code: string): string {
    switch (code) {
      case 'PGRST116':
        return 'No se encontró el registro solicitado';
      case '23505':
        return 'Ya existe un registro con esos datos';
      case '23503':
        return 'No se puede eliminar porque está siendo usado';
      case '42501':
        return 'No tienes permisos para realizar esta acción';
      default:
        return 'Ocurrió un error en la base de datos';
    }
  }

  /**
   * Mapeo de errores HTTP
   */
  private mapHttpError(status: number): string {
    switch (status) {
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
}
