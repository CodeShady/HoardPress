"use client";

import ExploreArchives from "@/components/shared/ExploreArchives";
import { NavigationBar } from "@/components/shared/NavigationBar";
import { Button } from "@/components/ui/button";
import { scanArchivedFolders } from "@/lib/actions/filesystem.action";

export default function Home() {
  return (
    <div className="wrapper py-5">
      {/* <Button onClick={() => scanArchivedFolders()}>Scan Filesystem</Button> */}

      <div className="flex flex-col gap-10">
        <ExploreArchives />
        <ExploreArchives />
        <ExploreArchives />
      </div>
    </div>
  );
}
