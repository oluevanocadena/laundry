import { test, expect } from '@playwright/test';
import { loginAs, logout } from './auth.helpers';

test.describe('Login funcional', () => {
  test('El administrador puede iniciar sesión', async ({ page }) => {
    await loginAs(page, 'admin');
    await expect(page).toHaveURL(/home|inicio/);
  });

  test('Debe poder cerrar sesión', async ({ page }) => {
    await loginAs(page, 'admin');
    await logout(page);
    await expect(page).toHaveURL(/login|inicio/);
  });
});
