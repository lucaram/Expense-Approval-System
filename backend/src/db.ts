import Database from 'better-sqlite3';

const db = new Database('expenses.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee TEXT NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL CHECK (amount > 0),
    expense_date TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
      status IN ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED')
    )
  )
`);

export default db;