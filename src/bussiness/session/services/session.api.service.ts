import { Injectable } from '@angular/core';
import { routes } from '@app/routes';
import { Session, User } from '@supabase/supabase-js';

import { Account } from '@bussiness/accounts/interfaces/accounts.interfaces';
import { SetPasswordRequest } from '@bussiness/session/interfaces/session.interface';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';

@Injectable({
  providedIn: 'root',
})
export class SessionApiService extends SupabaseBaseApiService {
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
      return super.buildReponse<Session>(data?.session, error);
    }, 'Signing in');
  }

  // Registrar usuario
  async registerUser(email: string, password: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + routes.InvitationConfirm,
        },
      });
      if (error && error.message) {
        error.message = error.message
          .replaceAll(email, '') // 🔹 Elimina el email si aparece
          .replace(/"/g, '') // 🔹 Quita comillas dobles
          .replace(/\s+/g, ' ') // 🔹 Reemplaza espacios múltiples por uno solo
          .trim(); // 🔹 Elimina espacios al inicio/final
      }
      return super.buildReponse<Session>(data?.session, error);
    }, 'Signing up');
  }

  async confirmEmail(email: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.admin.updateUserById(email, { email_confirm: true });
      const { data: account, error: accountError } = await this.client
        .from(SupabaseTables.Accounts)
        .update({ VerifiedEmail: true, UserId: data.user?.id })
        .eq('Email', email);
      return super.buildReponse<Account>(account, error || accountError);
    }, 'Confirming email');
  }

  // Logout
  async signOut() {
    return this.executeWithBusy(async () => {
      const { error } = await this.client.auth.signOut();
      return super.buildReponse<null>(null, error);
    }, 'Signing out');
  }

  async signInWithProvider(provider: 'google' | 'facebook') {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider,
      });
      return super.buildReponse(data, error);
    }, 'Signing in with provider');
  }

  // Obtener usuario actual
  async getUser() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.getUser();
      return super.buildReponse<User>(data?.user, error);
    }, 'Getting user');
  }

  async getSession() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.auth.getSession();
      console.log('🔑 Sesión obtenida:', data);
      console.log('🔑 Error:', error);
      return super.buildReponse<Session>(data?.session, error);
    }, 'Getting session');
  }

  setPassword(request: SetPasswordRequest) {
    return this.callEdgeFunction('set-password', {
      password: request.password,
      userId: request.userId,
    });
  }
}
