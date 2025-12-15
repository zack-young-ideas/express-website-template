import * as argon2 from 'argon2';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';

const getConnection = () => {
  let sqliteFile = '.sqlite.db';
  const db = new Database(sqliteFile);
  db.pragma('journal_mode = WAL');
  return db;
}

const database = {
  createUser: async (email, password) => {
    try {
      const hashedPassword = await argon2.hash(password);
      const db = getConnection();
      const insertString = 'INSERT INTO Users (email, password) '
                         + 'VALUES (?, ?);';
      const statement = db.prepare(insertString);
      const info = statement.run(email, hashedPassword);
      return { user_id: info.lastInsertRowid, email: email };
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  authenticateUser: async (email, password) => {
    const db = getConnection();
    const selectString = 'SELECT user_id, email, password FROM Users '
                       + 'WHERE email = ?;';
    const statement = db.prepare(selectString);
    const row = statement.get(email);
    if (await argon2.verify(row.password, password)) {
      return { user_id: row.user_id, email: row.email };
    } else {
      return null;
    }
  },

  getUser: (user_id) => {
    const db = getConnection();
    const selectString = 'SELECT user_id, email FROM Users '
                       + 'WHERE user_id = ?;';
    const statement = db.prepare(selectString);
    const row = statement.get(user_id);
    if (row) {
      return { user_id: row.user_id, email: row.email };
    } else {
      return null;
    }
  },

  createSMSToken: (user, phone) => {
    const token = crypto.randomInt(100000, 1000000);
    try {
      const db = getConnection();
      const insertString = 'INSERT INTO SMSTokens (user_id, phone, token) '
                         + 'VALUES (?, ?, ?);';
      const statement = db.prepare(insertString);
      statement.run(user.user_id, phone, token);
      return token;
    } catch (err) {
      console.error(err);
    }
  },

  migrate: () => {
    try {
      const db = getConnection();
      db.exec(
        `PRAGMA foreign_keys = ON; 
CREATE TABLE IF NOT EXISTS Users (
user_id INTEGER PRIMARY KEY,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
phone TEXT
); 
CREATE TABLE IF NOT EXISTS SMSTokens (
token_id INTEGER PRIMARY KEY,
user_id INTEGER NOT NULL,
phone TEXT,
token TEXT,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);`
      );
    } catch (err) {
      console.error('Unable to run database migrations');
    }
  },
}

export default database;
