import sqlite3 from "sqlite3";
import path from "path";
import { handleError } from "./utils";
import logger from "./logger";

const dbPath = path.join(
  process.cwd(),
  process.env.DATABASE_PATH as string,
  "database.db"
);

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) handleError(error);
  logger.info("Connected to database");
});

// Setup
db.serialize(() => {
  // Create archive table if not exists
  db.run(
    `CREATE TABLE IF NOT EXISTS archive (id INTEGER PRIMARY KEY, folder TEXT, slug TEXT, author TEXT, description TEXT, image TEXT)`,
    (error) => {
      if (error) handleError(error);
      logger.info(`Created "archive" table`);

      // db.run("DELETE FROM archive");
    }
  );
});

export default db;