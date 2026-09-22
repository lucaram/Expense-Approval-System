import { Router } from 'express';

import {
  approveExpense,
  createExpense,
  getExpenseById,
  rejectExpense,
  submitExpense,
} from '../services/expenseService.js';

import { validateCreateExpense } from '../validators/expenseValidator.js';
import type { CreateExpenseInput } from '../models/expense.js';

const router = Router();

router.post('/', (req, res) => {
  const input = req.body as CreateExpenseInput;

  const errors = validateCreateExpense(input);

  if (errors.length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  const expense = createExpense(input);

  return res.status(201).json(expense);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid expense id.',
    });
  }

  const expense = getExpenseById(id);

  if (!expense) {
    return res.status(404).json({
      error: 'Expense not found.',
    });
  }

  return res.status(200).json(expense);
});

router.post('/:id/submit', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid expense id.',
    });
  }

  try {
    const expense = submitExpense(id);

    if (!expense) {
      return res.status(404).json({
        error: 'Expense not found.',
      });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : 'Unable to submit expense.',
    });
  }
});

router.post('/:id/approve', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid expense id.',
    });
  }

  try {
    const expense = approveExpense(id);

    if (!expense) {
      return res.status(404).json({
        error: 'Expense not found.',
      });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : 'Unable to approve expense.',
    });
  }
});

router.post('/:id/reject', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid expense id.',
    });
  }

  try {
    const expense = rejectExpense(id);

    if (!expense) {
      return res.status(404).json({
        error: 'Expense not found.',
      });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : 'Unable to reject expense.',
    });
  }
});

export default router;