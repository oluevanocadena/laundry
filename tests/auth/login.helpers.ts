import { Page, expect } from '@playwright/test';
import { loginData } from './login.data';

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
