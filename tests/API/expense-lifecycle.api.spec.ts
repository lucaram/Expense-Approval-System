import { test, expect } from '@playwright/test';

test('employee creates, submits and manager approves an expense', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Train ticket',
      amount: 25,
      expenseDate: '2026-09-23',
    },
  });

  expect(createResponse.status()).toBe(201);

  const createdExpense = await createResponse.json();

  expect(createdExpense.status).toBe('DRAFT');

  const expenseId = createdExpense.id;

  const submitResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${expenseId}/submit`
  );

  expect(submitResponse.status()).toBe(200);

  const submittedExpense = await submitResponse.json();

  expect(submittedExpense.status).toBe('SUBMITTED');

  const approveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${expenseId}/approve`
  );

  expect(approveResponse.status()).toBe(200);

  const approvedExpense = await approveResponse.json();

  expect(approvedExpense.status).toBe('APPROVED');
});