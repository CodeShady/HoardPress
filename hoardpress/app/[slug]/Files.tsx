"use client";

import FileIcon from "@/components/shared/FileIcon";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getArchiveFilesBySlug } from "@/lib/actions/filesystem.action";
import { getFileIcon } from "@/lib/getFileIcon";
import { FileInfo } from "@/lib/models/file.model";
import { getFileExtension, humanFileSize } from "@/lib/utils";
import { Download, Image } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FilesList({ slug }: { slug: string }) {
  const [files, setFiles] = useState<FileInfo[] | null>(null);

  useEffect(() => {
    async function fetchFiles() {
      const res: FileInfo[] = await getArchiveFilesBySlug(slug);
      setFiles(res);
    }
    fetchFiles();
  }, []);

  if (files === null) return <h3>Loading...</h3>;

  return (
    <Table>
      <TableHeader className="bg-black/10">
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead className="text-right">Size</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(({ name, size, modified }, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Button variant="ghost" size="icon" disabled>
                <FileIcon extension={getFileExtension(name)} />
              </Button>
            </TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{modified.toLocaleString()}</TableCell>
            <TableCell className="text-right">{humanFileSize(size)}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="ghost" size="icon">
                <Link href={`/${slug}/download/${name}`} target="_blank">
                  <Download />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {/* {files.map(({ name, date, size }, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell className="text-right">{size}</TableCell>
            <TableCell className="text-right">
              <Button>Download</Button>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
}
