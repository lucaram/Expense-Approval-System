import db from './db.js';

db.exec(`
  DELETE FROM expenses;
  DELETE FROM sqlite_sequence WHERE name = 'expenses';
`);

console.log('Test database reset complete.');