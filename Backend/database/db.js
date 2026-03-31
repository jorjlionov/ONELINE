import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "oneline.db");
const SCHEMA_PATH = path.join(__dirname, "schema.sql");

let db = null;

export async function initDatabase() {
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await db.exec("PRAGMA foreign_keys = ON");

  const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
  await db.exec(schema);

  console.log("✅ База данных инициализирована");
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("База данных не инициализирована");
  }
  return db;
}

process.on("SIGINT", async () => {
  if (db) {
    await db.close();
    console.log("📁 База данных закрыта");
  }
  process.exit(0);
});
