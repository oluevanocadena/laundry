import { Injectable } from '@angular/core';
import { routes } from '@app/routes';
import { supabase } from '@environments/environment';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { BusyProp } from '@type/busy.type';
import { FacadeApiBase } from '@type/facade.base';
import { StorageProp } from '@type/storage.type';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class SessionApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  public session = new StorageProp<Session | null>(null, 'SESSION_COOKIE');

  constructor(public nzMessageService: NzMessageService) {
    this.client = createClient(supabase.url, supabase.key);

    // Mantener la sesión en memoria
    this.client.auth.getSession().then(({ data }) => {
      this.session.value = data.session;
    });

    // Escuchar cambios en la sesión (login, logout, refresh)
    this.client.auth.onAuthStateChange((_event, session) => {
      this.session.value = session;
    });
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚀 [Session API] ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error('Ocurrió un error al realizar la acción');
      console.error('⛔ Error:', error);
      return error as any;
    } finally {
      this.busy.value = false;
    }
  }

  // Login
  async signIn(email: string, password: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });
      console.log('👉🏽 error', error);
      if (error) {
        this.nzMessageService.error(
          error.message === 'Email not confirmed'
            ? '¡Revisa tu correo para confirmar tu cuenta, antes de iniciar sesión!'
            : '¡Usuario y/o contraseña incorrectos!'
        );
        return null;
      }
      return data;
    }, 'Signing in');
  }

  // Registrar usuario
  async signUp(email: string, password: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + routes.RegisterConfirm,
        },
      });
      if (error) throw error;
      return data.session; // Ojo: con confirm email activado, será null hasta confirmar
    }, 'Signing up');
  }

  async confirmEmail(email: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.admin.updateUserById(
        email,
        {
          email_confirm: true,
        }
      );
      return { data, error };
    }, 'Confirming email');
  }

  // Logout
  async signOut() {
    return this.executeWithBusy(async () => {
      const { error } = await this.client.auth.signOut();
      if (error) throw error;
      return true;
    }, 'Signing out');
  }

  async signInWithProvider(provider: 'google' | 'facebook') {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
      return data;
    }, 'Signing in with provider');
  }

  // Obtener usuario actual
  getUser() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.getUser();
      if (error) throw error;
      return data;
    }, 'Getting user');
  }
}
