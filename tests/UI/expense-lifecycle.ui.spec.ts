import { test, expect } from '@playwright/test';

test('employee creates, submits and manager approves an expense through the UI', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Employee').fill('Luca');
  await page.getByLabel('Description').fill('Train ticket');
  await page.getByLabel('Amount (£)').fill('25');
  await page.getByLabel('Expense Date').fill('2026-09-23');

  await page.getByRole('button', { name: 'Create Expense' }).click();

  await expect(page.getByRole('status')).toHaveText('DRAFT');

  await page.getByRole('button', { name: 'Submit Expense' }).click();

  await expect(page.getByRole('status')).toHaveText('SUBMITTED');

  await page.getByRole('button', { name: 'Approve' }).click();

  await expect(page.getByRole('status')).toHaveText('APPROVED');
});