import type { CreateExpenseInput } from '../models/expense.js';

export function validateCreateExpense(
  expense: CreateExpenseInput
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
  }

  if (!expense.expenseDate?.trim()) {
    errors.push('Expense date is required.');
  }

  return errors;
}