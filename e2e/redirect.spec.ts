import { expect, test } from '@playwright/test';

test('root redirects to a supported language', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/(es|en)(\/)?$/);
});

test('unsupported language redirects', async ({ page }) => {
  await page.goto('/fr/masajes');
  await expect(page).toHaveURL(/\/(es|en)\/masajes/);
});
