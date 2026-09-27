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



test('cannot reject an expense while it is still DRAFT', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Airline ticket',
      amount: 180,
      expenseDate: '2026-09-25',
    },
  });

  expect(createResponse.status()).toBe(201);

  const createdExpense = await createResponse.json();

  expect(createdExpense.status).toBe('DRAFT');

  const rejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/reject`
  );

  expect(rejectResponse.status()).toBe(400);

  const errorResponse = await rejectResponse.json();

  expect(errorResponse.error).toBe(
    'Only SUBMITTED expenses can be rejected.'
  );
});



test('cannot approve an expense that is already REJECTED', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Maria',
      description: 'Conference booking',
      amount: 300,
      expenseDate: '2026-09-26',
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

  const rejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/reject`
  );

  expect(rejectResponse.status()).toBe(200);

  const rejectedExpense = await rejectResponse.json();

  expect(rejectedExpense.status).toBe('REJECTED');

  const approveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/approve`
  );

  expect(approveResponse.status()).toBe(400);

  const errorResponse = await approveResponse.json();

  expect(errorResponse.error).toBe(
    'Only SUBMITTED expenses can be approved.'
  );
});



test('cannot reject an expense that is already REJECTED', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Client dinner',
      amount: 90,
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

  const rejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/reject`
  );

  expect(rejectResponse.status()).toBe(200);

  const rejectedExpense = await rejectResponse.json();

  expect(rejectedExpense.status).toBe('REJECTED');

  const secondRejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/reject`
  );

  expect(secondRejectResponse.status()).toBe(400);

  const errorResponse = await secondRejectResponse.json();

  expect(errorResponse.error).toBe(
    'Only SUBMITTED expenses can be rejected.'
  );
});



test('cannot reject an expense that is already APPROVED', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Gianni',
      description: 'Office equipment',
      amount: 275,
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

  const approveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/approve`
  );

  expect(approveResponse.status()).toBe(200);

  const approvedExpense = await approveResponse.json();

  expect(approvedExpense.status).toBe('APPROVED');

  const rejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/reject`
  );

  expect(rejectResponse.status()).toBe(400);

  const errorResponse = await rejectResponse.json();

  expect(errorResponse.error).toBe(
    'Only SUBMITTED expenses can be rejected.'
  );
});

test('cannot submit an expense after it leaves DRAFT', async ({ request }) => {
  const apiBaseUrl = process.env.API_BASE_URL!;

  const createResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Luca',
      description: 'Parking fee',
      amount: 20,
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

  const resubmitResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/submit`
  );

  expect(resubmitResponse.status()).toBe(400);

  const resubmitError = await resubmitResponse.json();

  expect(resubmitError.error).toBe('Only DRAFT expenses can be submitted.');

  const approveResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/approve`
  );

  expect(approveResponse.status()).toBe(200);

  const approvedExpense = await approveResponse.json();

  expect(approvedExpense.status).toBe('APPROVED');

  const submitApprovedResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${createdExpense.id}/submit`
  );

  expect(submitApprovedResponse.status()).toBe(400);

  const submitApprovedError = await submitApprovedResponse.json();

  expect(submitApprovedError.error).toBe(
    'Only DRAFT expenses can be submitted.'
  );

  const secondCreateResponse = await request.post(`${apiBaseUrl}/api/expenses`, {
    data: {
      employee: 'Maria',
      description: 'Client lunch',
      amount: 35,
      expenseDate: '2026-09-27',
    },
  });

  expect(secondCreateResponse.status()).toBe(201);

  const secondCreatedExpense = await secondCreateResponse.json();

  const secondSubmitResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${secondCreatedExpense.id}/submit`
  );

  expect(secondSubmitResponse.status()).toBe(200);

  const secondRejectResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${secondCreatedExpense.id}/reject`
  );

  expect(secondRejectResponse.status()).toBe(200);

  const rejectedExpense = await secondRejectResponse.json();

  expect(rejectedExpense.status).toBe('REJECTED');

  const submitRejectedResponse = await request.post(
    `${apiBaseUrl}/api/expenses/${secondCreatedExpense.id}/submit`
  );

  expect(submitRejectedResponse.status()).toBe(400);

  const submitRejectedError = await submitRejectedResponse.json();

  expect(submitRejectedError.error).toBe(
    'Only DRAFT expenses can be submitted.'
  );
});