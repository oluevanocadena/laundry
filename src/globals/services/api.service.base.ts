import { inject, Inject } from '@angular/core';
import { supabaseClient } from '@globals/singleton/supabase.client';
import { BusyProp } from '@globals/types/busy.type';
import { FacadeApiBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { SupabaseBaseResponse } from '@globals/interfaces/supabase.interface';
import { Session } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

export class ApiBaseService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client = supabaseClient;

  public session = new SubjectProp<Session | null>(null);

  @Inject(NzMessageService)
  public nzMessageService: NzMessageService = inject(NzMessageService);

  constructor() {
    // Mantener la sesión en memoria
    this.client.auth.getSession().then(({ data }) => {
      this.session.value = data.session;
    });

    // Escuchar cambios en la sesión (login, logout, refresh)
    this.client.auth.onAuthStateChange((_event, session) => {
      this.session.value = session;
    });
  }

  protected async executeWithBusy<T>(
    fn: () => Promise<SupabaseBaseResponse<T>>,
    message?: string
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

  protected handleResponse<T>(
    data: T | null,
    error: any,
    message?: string,
    count?: number | null
  ): SupabaseBaseResponse<T> {
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
}
