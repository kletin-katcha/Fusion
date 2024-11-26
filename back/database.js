const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Cria a tabela de usuários
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  console.log('Tabela de usuários criada.');
});

module.exports = db;
