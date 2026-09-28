import type { CreateExpenseValidationInput } from '../models/expense.js';

export function validateCreateExpense(
  expense: CreateExpenseValidationInput
): string[] {
  const errors: string[] = [];

  if (!expense.employee?.trim()) {
    errors.push('Employee is required.');
  }

  if (!expense.description?.trim()) {
    errors.push('Description is required.');
  }

  if (expense.amount === undefined || expense.amount === null) {
    errors.push('Amount is required.');
  } else if (typeof expense.amount !== 'number' || expense.amount <= 0) {
    errors.push('Amount must be greater than zero.');
  } else if (expense.amount > 10000) {
    errors.push('Amount must not exceed £10,000.');
  }

  if (!expense.expenseDate?.trim()) {
    errors.push('Expense date is required.');
  }

  return errors;
}