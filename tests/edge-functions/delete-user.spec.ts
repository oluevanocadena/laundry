import { test, expect } from '@playwright/test';
import { hardDeleteAccount, loginAs, logout, registerAs } from '../auth/auth.helpers';

test.describe('Delete user - Usuario Valido', () => {
  test('Se puede eliminar un usuario valido', async ({ page }) => {
    await hardDeleteAccount('valid');
  });
});
