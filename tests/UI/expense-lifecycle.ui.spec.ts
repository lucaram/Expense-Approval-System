import { test, expect } from '@playwright/test';

test('employee creates, submits and manager approves an expense through the UI', async ({ page }, testInfo) => {
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

  await testInfo.attach('Approved expense UI', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('employee creates, submits and manager rejects an expense through the UI', async ({ page }, testInfo) => {
  await page.goto('/');

  await page.getByLabel('Employee').fill('Maria');
  await page.getByLabel('Description').fill('Hotel stay');
  await page.getByLabel('Amount (£)').fill('120');
  await page.getByLabel('Expense Date').fill('2026-09-27');

  await page.getByRole('button', { name: 'Create Expense' }).click();

  await expect(page.getByRole('status')).toHaveText('DRAFT');

  await page.getByRole('button', { name: 'Submit Expense' }).click();

  await expect(page.getByRole('status')).toHaveText('SUBMITTED');

  await page.getByRole('button', { name: 'Reject' }).click();

  await expect(page.getByRole('status')).toHaveText('REJECTED');

  await testInfo.attach('Rejected expense UI', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});