import { test, expect } from '@playwright/test';
import { loginAs, logout, registerAs } from './auth.helpers';

test.describe('Register funcional', () => {
  test('Se puede registrar un nuevo usuario', async ({ page }) => {
    await registerAs(page, 'admin');
    await expect(page).toHaveURL(/register/);
  });
});
