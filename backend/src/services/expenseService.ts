import db from '../db.js';
import type {
  CreateExpenseInput,
  Expense,
} from '../models/expense.js';

export function createExpense(input: CreateExpenseInput): Expense {
  const statement = db.prepare(`
    INSERT INTO expenses (
      employee,
      description,
      amount,
      expense_date,
      status
    )
    VALUES (?, ?, ?, ?, 'DRAFT')
  `);

  const result = statement.run(
    input.employee,
    input.description,
    input.amount,
    input.expenseDate
  );

  return {
    id: Number(result.lastInsertRowid),
    employee: input.employee,
    description: input.description,
    amount: input.amount,
    expenseDate: input.expenseDate,
    status: 'DRAFT',
  };
}

export function getExpenseById(id: number): Expense | undefined {
  const statement = db.prepare(`
    SELECT
      id,
      employee,
      description,
      amount,
      expense_date AS expenseDate,
      status
    FROM expenses
    WHERE id = ?
  `);

  return statement.get(id) as Expense | undefined;
}

export function submitExpense(id: number): Expense | undefined {
  const expense = getExpenseById(id);

  if (!expense) {
    return undefined;
  }

  if (expense.status !== 'DRAFT') {
    throw new Error('Only DRAFT expenses can be submitted.');
  }

  const statement = db.prepare(`
    UPDATE expenses
    SET status = 'SUBMITTED'
    WHERE id = ?
  `);

  statement.run(id);

  return getExpenseById(id);
}

export function approveExpense(id: number): Expense | undefined {
  const expense = getExpenseById(id);

  if (!expense) {
    return undefined;
  }

  if (expense.status !== 'SUBMITTED') {
    throw new Error('Only SUBMITTED expenses can be approved.');
  }

  const statement = db.prepare(`
    UPDATE expenses
    SET status = 'APPROVED'
    WHERE id = ?
  `);

  statement.run(id);

  return getExpenseById(id);
}

export function rejectExpense(id: number): Expense | undefined {
  const expense = getExpenseById(id);

  if (!expense) {
    return undefined;
  }

  if (expense.status !== 'SUBMITTED') {
    throw new Error('Only SUBMITTED expenses can be rejected.');
  }

  const statement = db.prepare(`
    UPDATE expenses
    SET status = 'REJECTED'
    WHERE id = ?
  `);

  statement.run(id);

  return getExpenseById(id);
}