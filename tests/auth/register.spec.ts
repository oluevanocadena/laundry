import { test, expect } from '@playwright/test';
import { loginAs, logout, registerAs } from './auth.helpers';

test.describe('Register - Nuevo usuario válido', () => {
  test('Se puede registrar un nuevo usuario con credenciales válidas', async ({ page }) => {
    await registerAs(page, 'valid');
    await expect(page).toHaveURL(/register/);
  });
});

test.describe('Register - Usuario inválido', () => {
  test('No se puede registrar un usuario con credenciales inválidas', async ({ page }) => {
    await registerAs(page, 'invalid');
    await expect(page).toHaveURL(/register/);
  });
});

test.describe('Register - Usuario existente', () => {
  test('No se puede registrar un usuario con email existente', async ({ page }) => {
    await registerAs(page, 'existing');
    await expect(page).toHaveURL(/register/);
  });
});
