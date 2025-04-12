import sqlite3 from "sqlite3";
import path from "path";
import { handleError } from "./utils";
import logger from "./logger";

const basePath = process.env.DATABASE_PATH as string;
if (!basePath) handleError("DATABASE_PATH env variable is not defined");

const dbPath = path.join(process.cwd(), basePath, "database.db");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) return handleError(error);
  logger.info("Connected to database");
});

export function setupDatabase() {
  // Setup
  db.serialize(() => {
    // Create archive table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS archive (id INTEGER PRIMARY KEY, folder TEXT, slug TEXT, author TEXT, description TEXT, image TEXT, color TEXT, category TEXT)`,
      (error) => {
        if (error) return handleError(error);
        logger.info(`"archive" table ready`);

        // db.run("DELETE FROM archive");
      }
    );
  });
}

export default db;
