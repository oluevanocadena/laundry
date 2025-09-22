import { Injectable } from '@angular/core';
import { routes } from '@app/routes';
import { Session } from '@supabase/supabase-js';

import { ApiBaseService } from '@globals/services/api.service.base';
import { SetPasswordRequest } from '@bussiness/session/interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionApiService extends ApiBaseService {
  constructor() {
    super();
  }

  // Login
  async signIn(email: string, password: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });
      return super.handleResponse(
        data as unknown as Session,
        error,
        error?.message === 'Email not confirmed'
          ? '¡Revisa tu correo para confirmar tu cuenta, antes de iniciar sesión!'
          : '¡Usuario y/o contraseña incorrectos!',
      );
    }, 'Signing in');
  }

  // Registrar usuario
  async registerUser(email: string, password: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + routes.RegisterConfirm,
        },
      });
      return super.handleResponse(data as unknown as Session, error, 'Ocurrió un error al crear la cuenta');
    }, 'Signing up');
  }

  async confirmEmail(email: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.admin.updateUserById(email, { email_confirm: true });
      return super.handleResponse(data, error, 'Ocurrió un error al confirmar el email');
    }, 'Confirming email');
  }

  // Logout
  async signOut() {
    return this.executeWithBusy(async () => {
      const { error } = await this.client.auth.signOut();
      return super.handleResponse(null, error, 'Ocurrió un error al cerrar sesión');
    }, 'Signing out');
  }

  async signInWithProvider(provider: 'google' | 'facebook') {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider,
      });
      return super.handleResponse(data, error, 'Ocurrió un error al iniciar sesión con proveedor');
    }, 'Signing in with provider');
  }

  // Obtener usuario actual
  async getUser() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.getUser();
      return super.handleResponse(data, error, 'Ocurrió un error al obtener el usuario');
    }, 'Getting user');
  }

  async getSession() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.getSession();
      console.log('🔑 Sesión obtenida:', data);
      console.log('🔑 Error:', error);
      return super.handleResponse(data, error, 'Ocurrió un error al obtener la sesión');
    }, 'Getting session');
  }

  setPassword(request: SetPasswordRequest) {
    return this.callEdgeFunction('set-password', {
      password: request.password, 
      userId: request.userId,
    });
  }
}
