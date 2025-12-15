import Database from 'better-sqlite3';
import * as argon2 from 'argon2';

const getConnection = () => {
  let sqliteFile = '.sqlite.db';
  const db = new Database(sqliteFile);
  return db;
}

const database = {
  createUser: async (email, password) => {
    try {
      const hashedPassword = await argon2.hash(password);
      const db = getConnection();
      const insertString = 'INSERT INTO users (email, password) '
                         + 'VALUES (?, ?);';
      const statement = db.prepare(insertString);
      statement.run(firstName, lastName, hashedPassword);
    } catch (err) {
      console.error(err);
    }
  },

  authenticateUser: async (email, password) => {
    const db = getConnection();
    const selectString = 'SELECT (id, email, password) FROM users '
                       + 'WHERE email = ?;';
    const statement = db.prepare(selectString);
    const row = statement.run(email);
    if (await argon2.verify(row.password, password)) {
      return { id: row.id, email: row.email };
    } else {
      return null;
    }
  },

  getUser: async (id) => {
    const db = getConnection();
    const selectString = 'SELECT (id, email) FROM users '
                       + 'WHERE id = ?;';
    const statement = db.prepare(selectString);
    const row = statement.run(id);
    if (row) {
      return { id: row.id, email: row.email };
    } else {
      return null;
    }
  },

  createSMSToken: async (user, phone) => {
    try {
      const db = getConnection();
      const insertString = 'INSERT INTO sms_tokens (user, phone) '
                         + 'VALUES (?, ?);';
      const statement = db.prepare(insertString);
      statement.run(user.id, phone);
    } catch (err) {
      console.error(err);
    }
  },

  migrate: () => {
    try {
      const db = getConnection();
      db.exec(
        `PRAGMA foreign_keys = ON; 
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(128) NOT NULL,
password VARCHAR(255) NOT NULL
); 
CREATE TABLE IF NOT EXISTS sms_tokens (
id INT AUTO_INCREMENT PRIMARY KEY,
user INT REFERENCES users(id),
phone VARCHAR(16)
);`
      );
    } catch (err) {
      console.error('Unable to run database migrations');
    }
  },
}

export default database;
