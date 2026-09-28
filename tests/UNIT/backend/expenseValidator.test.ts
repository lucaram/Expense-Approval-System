// This is a backend unit test for the validateCreateExpense function in expenseValidator.ts
// It covers only backend logic (no http, sqlite) for the following business rules:

// BR-001 — Expense amount must be positive
// An expense claim must have an amount greater than zero.

// BR-006 — Required fields must be present
// An expense claim cannot be created without:
// - employee
// - description
// - amount
// - expense date


import { validateCreateExpense } from '../../../backend/src/validators/expenseValidator';

describe('validateCreateExpense', () => {
  it('returns no errors for a valid expense', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: 25,
      expenseDate: '2026-09-23',
    });

    expect(errors).toEqual([]);
  });

  it('returns an error when employee is missing', () => {
    const errors = validateCreateExpense({
      employee: '',
      description: 'Train ticket',
      amount: 25,
      expenseDate: '2026-09-23',
    });

    expect(errors).toContain('Employee is required.');
  });

  it('returns an error when description is missing', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: '',
      amount: 25,
      expenseDate: '2026-09-23',
    });

    expect(errors).toContain('Description is required.');
  });

  it('returns an error when amount is missing', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: undefined,
      expenseDate: '2026-09-23',
    });

    expect(errors).toContain('Amount is required.');
  });

  it('returns an error when amount is zero', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: 0,
      expenseDate: '2026-09-23',
    });

    expect(errors).toContain('Amount must be greater than zero.');
  });

  it('returns an error when amount is negative', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: -1,
      expenseDate: '2026-09-23',
    });

    expect(errors).toContain('Amount must be greater than zero.');
  });

  it('accepts an amount equal to the £10,000 maximum', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: 10000,
      expenseDate: '2026-09-23',
    });

    expect(errors).toEqual([]);
  });

  it('returns an error when amount exceeds the £10,000 maximum', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: 10000.01,
      expenseDate: '2026-09-23',
    });

    expect(errors).toContain('Amount must not exceed £10,000.');
  });

  it('returns an error when expense date is missing', () => {
    const errors = validateCreateExpense({
      employee: 'Luca',
      description: 'Train ticket',
      amount: 25,
      expenseDate: '',
    });

    expect(errors).toContain('Expense date is required.');
  });
});