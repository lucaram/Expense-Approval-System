import { test, expect } from '@playwright/test';

test('cannot create an expense when description is missing', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Employee').fill('Luca');

  // Description deliberately left empty.

  await page.getByLabel('Amount (£)').fill('25');

  await page.getByLabel('Expense Date').fill('2026-09-23');

  await page.getByRole('button', { name: 'Create Expense' }).click();

  await expect(
    page.getByRole('alert').filter({ hasText: 'Description is required.' })
  ).toHaveText('Description is required.');
});