import { HttpClient } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { firstValueFrom } from 'rxjs';

import { SessionService } from '@bussiness/session/services/session.service';
import { supabase } from '@environments/environment';
import { ErrorHandlerService } from '@globals/bussiness/error/services/error.handler.service';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { EdgeFunctionResponse } from '@globals/interfaces/supabase.interface';
import { I18nService } from '@globals/services/i18n.service';
import { LoggerService } from '@globals/services/logger.service';
import { supabaseClient } from '@globals/singleton/supabase.client';
import { MemoryCacheStore } from '@globals/strategies/cache/memory.cache.store';
import { BusyProp } from '@globals/types/busy.type';
import { ICacheStore } from '@globals/types/cache.type';
import { IFacadeApiBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';

export class SupabaseBaseApiService implements IFacadeApiBase {
  public busy = new BusyProp(false);
  public client = supabaseClient;
  public cacheStore: ICacheStore;
  public session = new SubjectProp<Session | null>(null);

  //Injects
  @Inject(ErrorHandlerService)
  public errorHandler: ErrorHandlerService = inject(ErrorHandlerService);

  @Inject(HttpClient)
  public http: HttpClient = inject(HttpClient);

  @Inject(SessionService)
  public sessionService: SessionService = inject(SessionService);

  @Inject(I18nService)
  public i18nService: I18nService = inject(I18nService);

  @Inject(LoggerService)
  public logger: LoggerService = inject(LoggerService);

  constructor() {
    this.cacheStore = this.getCacheStore();

    // Mantener la sesión en memoria
    this.client.auth.getSession().then(({ data }) => {
      this.session.value = data.session;
    });

    // Escuchar cambios en la sesión (login, logout, refresh)
    this.client.auth.onAuthStateChange((_event, session) => {
      this.session.value = session;
    });
  }

  protected getCacheStore(): ICacheStore {
    return new MemoryCacheStore();
  }

  protected async executeWithBusy<T>(fn: () => Promise<ResponseResult<T>>, context?: string): Promise<ResponseResult<T>> {
    this.busy.value = true;
    try {
      return await fn();
    } catch (error: any) {
      const errorCode = error?.code?.toString() ?? '500';
      return {
        data: null,
        success: false,
        error: {
          message: this.i18nService.t(`errors.http.${errorCode}`),
          raw: error,
          details: error,
          code: errorCode,
        },
      };
    } finally {
      this.busy.value = false;
    }
  }

  protected async callEdgeFunction<T>(endpoint: string, body: T): Promise<EdgeFunctionResponse> {
    this.busy.value = true;
    try {
      // Incluir JWT del usuario logueado
      const token = await this.sessionService.getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Convierte un observable a una promesa
      return await firstValueFrom<EdgeFunctionResponse>(
        this.http.post<EdgeFunctionResponse>(`${supabase.url}/functions/v1/${endpoint}`, body, { headers }),
      );
    } catch (error: any) {
      // Error de red o HTTP
      const errorCode = error?.status?.toString() || '500';
      return {
        success: false,
        error: error,
        message: this.i18nService.t(`errors.http.${errorCode}`) || this.i18nService.t('errors.http.default'),
        statusCode: error?.status || 500,
      };
    } finally {
      this.busy.value = false;
    }
  }

  protected buildReponse<T>(data: T | null, error: any, context?: string, count?: number | null): ResponseResult<T> {
    //Debug Log
    if (error) {
      this.logger.debug('Error en handleResponse', error, context || 'SupabaseBaseApiService');
    }
    const errorCode = error?.code?.toString() ?? '500';
    return {
      data: data as T | null,
      success: !error ? true : false,
      count: count ?? 0,
      error: error
        ? {
            message: this.i18nService.t(`errors.http.${errorCode}`),
            raw: error,
            details: error,
            code: errorCode,
          }
        : null,
    };
  }

  protected async getWithCache<T>(
    key: string,
    fetchFn: () => Promise<ResponseResult<T>>,
    ttlMs: number = 0,
    onCacheHit?: (data: T) => void,
  ): Promise<ResponseResult<T>> {
    this.busy.value = true;
    const cached = this.cacheStore.get<T>(key);

    if (cached) {
      onCacheHit?.(cached);
      this.busy.value = false;
      return { data: cached as T | null, success: true, count: 0, error: null };
    }

    const result = await fetchFn();
    this.busy.value = false;

    if (result.success && ttlMs > 0 && result.data) {
      this.cacheStore.set(key, result.data, ttlMs);
    }
    return result;
  }

  protected clearCache(key?: string) {
    this.cacheStore.clear(key);
  }

  protected clearAllCaches(): void {
    this.cacheStore.clear();
  }

  protected buildCacheKey(prefix: string, params: any): string {
    const stableStringify = (obj: any) => JSON.stringify(obj, Object.keys(obj).sort());
    return `${prefix}:${stableStringify(params)}`;
  }
}
