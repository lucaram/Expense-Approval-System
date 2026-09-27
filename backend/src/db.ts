import Database from 'better-sqlite3';

const databasePath = process.env.DB_PATH || 'expenses.db';

const db = new Database(databasePath);

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