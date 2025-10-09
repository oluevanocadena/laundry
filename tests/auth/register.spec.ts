import { expect, test } from '@playwright/test';
import { registerAs, registerExistingAccountEmail, registerIValidAccountEmail } from './auth.helpers';

test.describe('Register - Nuevo usuario válido', () => {
  test('Se puede registrar un nuevo usuario con credenciales válidas', async ({ page }) => {
    await registerAs(page, 'valid');
    await expect(page).toHaveURL(/register/);
  });
});

test.describe('Register - Usuario inválido', () => {
  test('No se puede registrar un usuario con credenciales inválidas', async ({ page }) => {
    await registerIValidAccountEmail(page, 'invalid');
    await expect(page).toHaveURL(/register/);
  });
});

test.describe('Register - Usuario existente', () => {
  test('No se puede registrar un usuario con email existente', async ({ page }) => {
    await registerExistingAccountEmail(page, 'existing');
    await expect(page).toHaveURL(/register/);
  });
});
