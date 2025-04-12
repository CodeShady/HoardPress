"use client";

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
import { FileInfo } from "@/lib/models/file.model";
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
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead className="text-right">Size</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(({ name, size, modified }, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{modified.toString()}</TableCell>
            <TableCell className="text-right">{size} Bytes</TableCell>
            <TableCell className="text-right">
              <Button>Download</Button>
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
