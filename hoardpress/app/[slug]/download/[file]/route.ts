"use server";

import { handleError } from "@/lib/utils";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { lookup } from "mime-types";
import { getArchiveBySlug } from "@/lib/actions/filesystem.action";
import { Archive } from "@/lib/models/archive.model";

type Params = {
  params: {
    slug: string;
    file: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const urlParams = await params;
  const slug = urlParams.slug;
  const file = urlParams.file;

  // Check if slug exists
  const archive: Archive = await getArchiveBySlug(slug);
  if (!archive) {
    return new NextResponse("Archive does not exist", { status: 404 });
  }

  // Sanitize file path input
  const safeFile = path.basename(file);

  // Retrieve file
  try {
    const filePath = path.join(
      process.cwd(),
      process.env.DATABASE_PATH as string,
      "files",
      archive.folder,
      safeFile
    );
    const fileBuffer = await readFile(filePath);
    const mimeType = lookup(filePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${safeFile}"`,
      },
    });
  } catch (error) {
    handleError(error);
    return new NextResponse("File does not exist", { status: 404 });
  }
}
