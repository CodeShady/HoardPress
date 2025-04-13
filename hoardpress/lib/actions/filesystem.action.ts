"use server";

import fs from "fs";
import path from "path";
import { getFileExtension, handleError, slugify } from "../utils";
import logger from "../logger";
import "../database";
import db from "../database";
import { Archive } from "../models/archive.model";
import { FileInfo } from "../models/file.model";
import { Settings } from "../settings";

/**
 * Get a list of folder names inside the archive storage folder
 */
export async function getArchivedFolders(): Promise<string[]> {
  try {
    const directoryPath = path.join(
      process.cwd(),
      process.env.DATABASE_PATH as string,
      "files"
    );
    const files = await fs.promises.readdir(directoryPath);
    const directories = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        logger.info(`Scanned "${file}"`);
        directories.push(file);
      }
    }

    return directories;
  } catch (error) {
    handleError(error);
    return [];
  }
}

/**
 * Get a single archive by a URL slug
 */
export async function getArchiveBySlug(slug: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM archive WHERE slug = ?", [slug], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * Get a list of files from an archive by a URL slug
 */
export async function getArchiveFilesBySlug(slug: string): Promise<FileInfo[]> {
  const archive: Archive = await getArchiveBySlug(slug);
  const directoryPath = path.join(process.cwd(), process.env.DATABASE_PATH as string, "files", archive.folder);
  let files: FileInfo[] = [];

  try {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

    files = entries.filter((entry) => entry.isFile() && !Settings.ignoredExtensions.includes(entry.name)).map((entry) => {
      const filePath = path.join(directoryPath, entry.name);
      const stats = fs.statSync(filePath);

      return {
        parent: slug,
        name: entry.name,
        size: stats.size,
        modified: stats.mtime,
      };
    });
  } catch (error) {
    handleError(error);
  }

  return files;
}

/**
 * Return a list of all archives
 */
export async function getArchives(): Promise<Archive[]> {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM archive", (error, rows) => {
      if (error) {
        reject(error);
        handleError(error);
      } else {
        resolve(rows as Archive[]);
      }
    });
  });
}

/**
 * Update an archive details by URL slug
 */
export async function updateArchive({ slug, description, author, color, category }: { slug: string; description: string; author: string; color: string; category: string }) {
  try {
    await new Promise<void>((resolve, reject) => {
      db.run(`UPDATE archive SET description = ?, author = ?, color = ?, category = ? WHERE slug = ?`, [description, author, color, category, slug], (error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    logger.info(`Updated archive "${slug}"`);
  } catch (error) {
    handleError(error);
  }
}

/**
 * Scan the filesystem for changes in the archive storage folder
 */
export async function scanArchivedFolders() {
  try {
    // Get all folders inside filesystem
    const folders = await getArchivedFolders();

    folders.map((folder: string) => {
      // Create new item for each archive folder in database
      db.run("INSERT INTO archive(folder, slug) SELECT ? AS folder, ? AS slug WHERE NOT EXISTS (SELECT 1 FROM archive WHERE folder = ?)", [folder, slugify(folder), folder], (error) => {
        if (error) handleError(error);
        logger.info(`Added "${folder}" to database`);
      });
    });
  } catch (error) {
    handleError(error);
  }
}
