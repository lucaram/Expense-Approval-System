'use client';

import { FormEvent, useState } from 'react';

interface Expense {
  id: number;
  employee: string;
  description: string;
  amount: number;
  expenseDate: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
}

export default function Home() {
  const [employee, setEmployee] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const [expenseId, setExpenseId] = useState('');
  const [expense, setExpense] = useState<Expense | null>(null);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleCreateExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee,
          description,
          amount: Number(amount),
          expenseDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.errors?.join(' ') ??
            data.error ??
            'Unable to create expense.'
        );
        return;
      }

      const createdExpense: Expense = data;

      setExpense(createdExpense);
      setExpenseId(String(createdExpense.id));

      setMessage(
        `Expense #${createdExpense.id} created successfully as DRAFT.`
      );

      setEmployee('');
      setDescription('');
      setAmount('');
      setExpenseDate('');
    } catch {
      setError('Unable to connect to the backend.');
    }
  }

  async function handleViewExpense() {
    setExpense(null);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:3001/api/expenses/${expenseId}`
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? 'Unable to retrieve expense.');
        return;
      }

      const data: Expense = await response.json();

      setExpense(data);
    } catch {
      setError('Unable to connect to the backend.');
    }
  }

  async function handleSubmitExpense() {
    if (!expense) {
      return;
    }

    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:3001/api/expenses/${expense.id}/submit`,
        {
          method: 'POST',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Unable to submit expense.');
        return;
      }

      const submittedExpense: Expense = data;

      setExpense(submittedExpense);

      setMessage(
        `Expense #${submittedExpense.id} submitted successfully.`
      );
    } catch {
      setError('Unable to connect to the backend.');
    }
  }

  async function handleApproveExpense() {
    if (!expense) {
      return;
    }

    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:3001/api/expenses/${expense.id}/approve`,
        {
          method: 'POST',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Unable to approve expense.');
        return;
      }

      const approvedExpense: Expense = data;

      setExpense(approvedExpense);

      setMessage(
        `Expense #${approvedExpense.id} approved successfully.`
      );
    } catch {
      setError('Unable to connect to the backend.');
    }
  }

  async function handleRejectExpense() {
    if (!expense) {
      return;
    }

    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:3001/api/expenses/${expense.id}/reject`,
        {
          method: 'POST',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Unable to reject expense.');
        return;
      }

      const rejectedExpense: Expense = data;

      setExpense(rejectedExpense);

      setMessage(
        `Expense #${rejectedExpense.id} rejected successfully.`
      );
    } catch {
      setError('Unable to connect to the backend.');
    }
  }

  function handleExpenseIdChange(value: string) {
    if (/^\d*$/.test(value)) {
      setExpenseId(value);
    }
  }

  function getStatusStyle(status: Expense['status']) {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';

      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';

      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-700 border-blue-200';

      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Expense Management
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Expense Approval System
          </h1>

          <p className="mt-3 text-slate-600">
            Create, submit, review and manage employee expense claims.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Employee
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Create Expense
            </h2>
          </div>

          <form
            onSubmit={handleCreateExpense}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="employee"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Employee
              </label>

              <input
                id="employee"
                type="text"
                value={employee}
                onChange={(event) => setEmployee(event.target.value)}
                placeholder="Employee name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="expenseDate"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Expense Date
              </label>

              <input
                id="expenseDate"
                type="date"
                value={expenseDate}
                onChange={(event) => setExpenseDate(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <input
                id="description"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="e.g. Train to client office"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Amount (£)
              </label>

              <input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Expense
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Employee / Manager view
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Find Expense
            </h2>
          </div>

          <label
            htmlFor="expenseId"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Expense ID
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="expenseId"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter expense ID"
              value={expenseId}
              onChange={(event) =>
                handleExpenseIdChange(event.target.value)
              }
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              onClick={handleViewExpense}
              disabled={!expenseId}
              className="rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              View Expense
            </button>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-700">
            {message}
          </div>
        )}

        {expense && (
          <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
           <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Manager view
            </p>
                <p className="text-sm text-slate-500">
                  Expense #{expense.id}
                </p>

                <h2 className="text-xl font-bold">
                  Expense Details
                </h2>
              </div>

<span
  role="status"
  className={`rounded-full border px-3 py-1 text-sm font-bold ${getStatusStyle(
    expense.status
  )}`}
>
  {expense.status}
</span>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <ExpenseField
                label="Employee"
                value={expense.employee}
              />

              <ExpenseField
                label="Amount"
                value={`£${expense.amount.toFixed(2)}`}
              />

              <ExpenseField
                label="Description"
                value={expense.description}
              />

              <ExpenseField
                label="Expense Date"
                value={expense.expenseDate}
              />
            </div>

            {expense.status === 'DRAFT' && (
              <div className="border-t border-slate-200 px-6 py-5">
                <button
                  onClick={handleSubmitExpense}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Submit Expense
                </button>
              </div>
            )}

            {expense.status === 'SUBMITTED' && (
              <div className="flex gap-3 border-t border-slate-200 px-6 py-5">
                <button
                  onClick={handleApproveExpense}
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={handleRejectExpense}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function ExpenseField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}