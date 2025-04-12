"use client";

import { Button } from "@/components/ui/button";
import { scanArchivedFolders } from "@/lib/actions/filesystem.action";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Button onClick={() => scanArchivedFolders()}>Scan Filesystem</Button>
    </div>
  );
}
