import { supabase } from '@environments/environment';
import { supabaseClient } from '@globals/singleton/supabase.client';
import { Page, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import es from '../../public/assets/i18n/es.json';
import { loginData, registerData } from '../data/login.data';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

const URL_BASE = 'http://localhost:4200';
/**
 * Inicia sesión con credenciales específicas.
 */
export async function loginAs(page: Page, role: keyof typeof loginData) {
  const { email, password } = loginData[role];

  await page.goto(`${URL_BASE}/login`);
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('submit-login').click();

  // Espera que la navegación ocurra correctamente
  await expect(page).toHaveURL(/home|inicio/);
}

async function fillRegisterForm(page: Page, role: keyof typeof registerData) {
  const { email, password, confirmPassword } = registerData[role];
  console.log('⭐ [fillRegisterForm] Filling register form for role:', role);

  await page.goto(`${URL_BASE}/login`);
  await page.getByTestId('register-link').click();
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('confirmPassword').fill(confirmPassword);
  await page.getByTestId('submit-register').click();
}

export async function registerAs(page: Page, role: keyof typeof registerData) {
  await hardDeleteAccount(role);
  await fillRegisterForm(page, role);
  await expect(page.getByText(es.messages.success.accountCreated)).toBeVisible();
}

export async function registerIValidAccountEmail(page: Page, role: keyof typeof registerData) {
  await fillRegisterForm(page, role);
  await expect(page.getByText(es.errors.wofloo.emailInvalid)).toBeVisible();
}

export async function registerExistingAccountEmail(page: Page, role: keyof typeof registerData) {
  await fillRegisterForm(page, role);
  await expect(page.getByText(es.errors.wofloo.emailAlreadyExists)).toBeVisible();
}

export async function loginAsAdmin() {
  console.log('⭐ [loginAsAdmin] Try login as admin');
  const { email: emailAdmin, password: passwordAdmin } = loginData['admin'];

  const { data: session, error: sessionError } = await supabaseClient.auth.signInWithPassword({
    email: emailAdmin,
    password: passwordAdmin,
  });
  if (sessionError) {
    console.log('⛔ [loginAsAdmin] Error signing in as admin to Supabase', sessionError);
    throw sessionError;
  }
  console.log('⭐ [loginAsAdmin] Signed in as admin to Supabase, token: ', session.session.access_token);
  return session;
}

export async function hardDeleteAccount(role: keyof typeof registerData) {
  console.log('⭐ [hardDeleteAccount] Try Deleting account');
  const session = await loginAsAdmin();

  // Delete account if exists to create valid scenario where user can be created
  const existingAccount = await supabaseClient
    .from(SupabaseTables.Accounts)
    .select('*')
    .eq('Email', registerData[role].email)
    .maybeSingle();
  if (!existingAccount.data) {
    return existingAccount;
  }

  const { email } = registerData[role];
  console.log('⭐ [hardDeleteAccount] Invoke delete-user', email);
  const response = await fetch(`${supabase.url}/functions/v1/delete-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.session.access_token}`,
    },
    body: JSON.stringify({ email }),
  });
  console.log('⭐ [hardDeleteAccount] Response', response.status, response.statusText, response.body);
  const data = await response.json();
  if (response.ok === false) {
    console.log('⛔ [hardDeleteAccount] Error deleting account', response.statusText);
    throw new Error(response.statusText);
  }
  console.log('⭐ [hardDeleteAccount] Usuario eliminado', data);
  return data;
}

/**
 * Cierra sesión (según la estructura de tu app Angular).
 */
export async function logout(page: Page) {
  await page.getByTestId('profile-menu').click();
  await page.getByTestId('logout').click();
  await expect(page).toHaveURL(/login/);
}

/**
 * Devuelve si el usuario está autenticado.
 */
export async function isLoggedIn(page: Page): Promise<boolean> {
  const url = page.url();
  return !url.includes('home|inicio');
}
