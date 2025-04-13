"use server";

import { Base64 } from 'js-base64';
import { handleError } from "@/lib/utils";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { lookup } from "mime-types";
import { getArchiveBySlug } from "@/lib/actions/filesystem.action";
import { Archive } from "@/lib/models/archive.model";
import { stat } from "fs/promises";
import { createReadStream } from "fs";
import { Readable } from 'stream';

type Params = {
  params: {
    slug: string;
    file: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const urlParams = await params;
  const slug = urlParams.slug;
  const file = Base64.decode(urlParams.file);

  console.log("FILE NAME =", file);

  // Check if slug exists
  const archive: Archive = await getArchiveBySlug(slug);
  if (!archive) {
    return new NextResponse("Archive does not exist", { status: 404 });
  }

  // TODO: Sanitize input
  
  const filePath = path.join(
    process.cwd(),
    process.env.DATABASE_PATH as string,
    "files",
    archive.folder,
    file
  );

  // Retrieve file
  try {
    await stat(filePath);
    const stream = createReadStream(filePath);
    const mimeType = lookup(filePath) || "application/octet-stream";

    const readable = Readable.toWeb(stream);

    const headers = new Headers();
    headers.set("Content-Type", mimeType);

    // Sanitize filename to avoid encoding issues
    const encodedFileName = encodeURIComponent(file).replace(/%20/g, ' ');
    headers.set(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodedFileName}`
    );

    return new Response(readable as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    handleError(error);
    return new NextResponse("File does not exist", { status: 404 });
  }
}
