"use client";

import ExploreArchives from "@/components/shared/ExploreArchives";
import { NavigationBar } from "@/components/shared/NavigationBar";
import { Button } from "@/components/ui/button";
import { scanArchivedFolders } from "@/lib/actions/filesystem.action";

export default function Home() {
  return (
    <div className="">
      <Button onClick={() => scanArchivedFolders()}>Scan Filesystem</Button>
      
      <ExploreArchives />
    </div>
  );
}
