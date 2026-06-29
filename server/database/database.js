const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

async function initializeDatabase() {
  db = await open({
    filename: "./database/media-library.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      thumbnail TEXT,
      favorite INTEGER DEFAULT 0,
      categoryId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(categoryId) REFERENCES categories(id)
    );
  `);

  console.log("✅ Database initialized");

  return db;
}

function getDatabase() {
  return db;
}

module.exports = {
  initializeDatabase,
  getDatabase,
};
