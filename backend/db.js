import Database from "better-sqlite3";

const db = new Database("newdatabase.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )
    `);

export default db;
