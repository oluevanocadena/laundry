import { HttpClient } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

import { SessionService } from '@bussiness/session/services/session.service';
import { supabase } from '@environments/environment';
import { EdgeFunctionResponse, SupabaseBaseResponse } from '@globals/interfaces/supabase.interface';
import { supabaseClient } from '@globals/singleton/supabase.client';
import { MemoryCacheStore } from '@globals/strategies/cache/memory.cache.store';
import { BusyProp } from '@globals/types/busy.type';
import { ICacheStore } from '@globals/types/cache.type';
import { FacadeApiBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';

export class SupabaseBaseApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client = supabaseClient;
  public cacheStore: ICacheStore;
  public session = new SubjectProp<Session | null>(null);

  //Injects
  @Inject(NzMessageService)
  public nzMessageService: NzMessageService = inject(NzMessageService);

  @Inject(HttpClient)
  public http: HttpClient = inject(HttpClient);

  @Inject(SessionService)
  public sessionService: SessionService = inject(SessionService);

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

  protected async executeWithBusy<T>(
    fn: () => Promise<SupabaseBaseResponse<T>>,
    message?: string,
  ): Promise<SupabaseBaseResponse<T>> {
    this.busy.value = true;
    try {
      return await fn();
    } catch (error) {
      this.nzMessageService.error('Ocurrió un error al realizar la acción');
      console.error('⛔ Error:', error);
      return {
        data: null,
        success: false,
        error: {
          message: 'Ocurrió un error al realizar la acción',
          raw: error,
          details: error,
          code: '500',
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

      // Llamada HTTP al endpoint de Supabase Edge Function
      const response = await firstValueFrom(
        this.http.post<EdgeFunctionResponse>(`${supabase.url}/functions/v1/${endpoint}`, body, { headers }),
      );

      // Siempre devolver la respuesta de la función
      return (
        response ?? {
          success: false,
          error: true,
          message: 'No se recibió respuesta del servidor',
          statusCode: 500,
        }
      );
    } catch (err: any) {
      // Error de red o HTTP
      return {
        success: false,
        error: true,
        message: err?.message || 'Error desconocido',
        statusCode: err?.status || 500,
      };
    } finally {
      this.busy.value = false;
    }
  }

  protected handleResponse<T>(data: T | null, error: any, message?: string, count?: number | null): SupabaseBaseResponse<T> {
    if (error) {
      console.error('⛔ Error:', error);
    }
    return {
      data: data,
      success: !error ? true : false,
      count: count ?? 0,
      error: {
        message: message || 'Ocurrió un error al realizar la acción',
        raw: error,
        details: error,
        code: error?.code?.toString() ?? '500',
      },
    };
  }

  protected async getWithCache<T>(
    key: string,
    fetchFn: () => Promise<SupabaseBaseResponse<T>>,
    ttlMs: number = 0,
    onCacheHit?: (data: T) => void,
  ): Promise<SupabaseBaseResponse<T>> {
    this.busy.value = true;
    const cached = this.cacheStore.get<T>(key);

    if (cached) {
      onCacheHit?.(cached);
      this.busy.value = false;
      return { data: cached, success: true, count: 0, error: null };
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
