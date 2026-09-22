export type ExpenseStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'APPROVED'
  | 'REJECTED';

export interface Expense {
  id: number;
  employee: string;
  description: string;
  amount: number;
  expenseDate: string;
  status: ExpenseStatus;
}

export interface CreateExpenseInput {
  employee: string;
  description: string;
  amount: number;
  expenseDate: string;
}