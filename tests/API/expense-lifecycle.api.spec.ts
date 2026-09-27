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




test('employee creates, submits and manager rejects an expense', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Maria',
      description: 'Hotel stay',
      amount: 120,
      expenseDate: '2026-09-24',
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

  const rejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${expenseId}/reject`
  );

  expect(rejectResponse.status()).toBe(200);

  const rejectedExpense = await rejectResponse.json();

  expect(rejectedExpense.status).toBe('REJECTED');
});




test('employee can view the current status of a submitted expense', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Taxi fare',
      amount: 45,
      expenseDate: '2026-09-27',
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

  const getResponse = await request.get(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}`
  );

  expect(getResponse.status()).toBe(200);

  const viewedExpense = await getResponse.json();

  expect(viewedExpense.status).toBe('SUBMITTED');
});

test('cannot create an expense when amount is missing', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Train ticket',
      expenseDate: '2026-09-27',
    },
  });

  expect(createResponse.status()).toBe(400);

  const errorResponse = await createResponse.json();

  expect(errorResponse.errors).toContain('Amount is required.');
});

test('cannot create an expense when employee is missing', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      description: 'Train ticket',
      amount: 25,
      expenseDate: '2026-09-27',
    },
  });

  expect(createResponse.status()).toBe(400);

  const errorResponse = await createResponse.json();

  expect(errorResponse.errors).toContain('Employee is required.');
});

test('cannot create an expense when description is missing', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      amount: 25,
      expenseDate: '2026-09-27',
    },
  });

  expect(createResponse.status()).toBe(400);

  const errorResponse = await createResponse.json();

  expect(errorResponse.errors).toContain('Description is required.');
});

test('cannot create an expense when expense date is missing', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Train ticket',
      amount: 25,
    },
  });

  expect(createResponse.status()).toBe(400);

  const errorResponse = await createResponse.json();

  expect(errorResponse.errors).toContain('Expense date is required.');
});

test('cannot create an expense when amount is negative', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Train ticket',
      amount: -1,
      expenseDate: '2026-09-27',
    },
  });

  expect(createResponse.status()).toBe(400);

  const errorResponse = await createResponse.json();

  expect(errorResponse.errors).toContain('Amount must be greater than zero.');
});

test('cannot create an expense when amount is zero', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Train ticket',
      amount: 0,
      expenseDate: '2026-09-27',
    },
  });

  expect(createResponse.status()).toBe(400);

  const errorResponse = await createResponse.json();

  expect(errorResponse.errors).toContain('Amount must be greater than zero.');
});