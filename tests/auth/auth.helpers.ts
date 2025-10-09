import { Page, expect } from '@playwright/test';
import { loginData, registerData } from '../data/login.data';
import es from '../../public/assets/i18n/es.json';
import { supabaseClient } from '@globals/singleton/supabase.client';

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
  console.log('🚩 [fillRegisterForm] Filling register form for role:', role);
  
  await page.goto(`${URL_BASE}/login`);
  await page.getByTestId('register-link').click();
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('confirmPassword').fill(confirmPassword);
  await page.getByTestId('submit-register').click();
}

export async function registerAs(page: Page, role: keyof typeof registerData) {
  await fillRegisterForm(page, role);
  await expect(page.getByText(es.messages.success.accountCreated)).toBeVisible();
}

export async function registerIValidAccountEmail(page: Page, role: keyof typeof registerData) {
  await hardDeleteAccount(role);
  await fillRegisterForm(page, role);
  await expect(page.getByText(es.messages.success.accountCreated)).toBeVisible();
}

export async function registerExistingAccountEmail(page: Page, role: keyof typeof registerData) {
  await fillRegisterForm(page, role);
  await expect(page.getByText(es.errors.wofloo.emailAlreadyExists)).toBeVisible();
}

export async function hardDeleteAccount(role: keyof typeof registerData) {
  const { email } = registerData[role];
  const { data, error } = await supabaseClient.functions.invoke('delete-user', {
    body: { email },
  });
  if (error) throw error;
  console.log('🚩 [hardDeleteAccount] Usuario eliminado', data);
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
