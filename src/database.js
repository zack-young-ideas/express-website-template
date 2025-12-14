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
      console.log(password);
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

  migrate: () => {
    try {
      const db = getConnection();
      db.exec(
        `CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(128) NOT NULL,
password VARCHAR(255) NOT NULL
);`
      );
    } catch (err) {
      console.error('Unable to run database migrations');
    }
  },
}

export default database;
