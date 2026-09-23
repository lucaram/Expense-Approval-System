import { test, expect } from '@playwright/test';

test('cannot approve an expense while it is still DRAFT', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Narco',
      description: 'Playstation 5',
      amount: 450,
      expenseDate: '2026-09-23',
    },
  });

  expect(createResponse.status()).toBe(201);

  const createdExpense = await createResponse.json();

  expect(createdExpense.status).toBe('DRAFT');

  const approveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/approve`
  );

  expect(approveResponse.status()).toBe(400);

  const errorResponse = await approveResponse.json();

  expect(errorResponse.error).toBe(
    'Only SUBMITTED expenses can be approved.'
  );
});

test('cannot approve an expense that is already APPROVED', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Gianni',
      description: 'Nintendo Switch 2',
      amount: 250,
      expenseDate: '2026-09-23',
    },
  });

  expect(createResponse.status()).toBe(201);

  const createdExpense = await createResponse.json();

  expect(createdExpense.status).toBe('DRAFT');

  const submitResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/submit`
  );

  expect(submitResponse.status()).toBe(200);

  const submittedExpense = await submitResponse.json();

  expect(submittedExpense.status).toBe('SUBMITTED');

  const approveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/approve`
  );

  expect(approveResponse.status()).toBe(200);

  const approvedExpense = await approveResponse.json();

  expect(approvedExpense.status).toBe('APPROVED');

  const secondApproveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/approve`
  );

  expect(secondApproveResponse.status()).toBe(400);

  const errorResponse = await secondApproveResponse.json();

  expect(errorResponse.error).toBe(
    'Only SUBMITTED expenses can be approved.'
  );
});