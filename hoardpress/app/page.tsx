"use client";

import ArchiveList from "@/components/shared/ArchiveList";
import ExploreArchives from "@/components/shared/ExploreArchives";
import { NavigationBar } from "@/components/shared/NavigationBar";
import { Button } from "@/components/ui/button";
import { scanArchivedFolders } from "@/lib/actions/filesystem.action";
import { Settings } from "@/lib/settings";

export default function Home() {
  return (
    <div className="wrapper py-5">
      {/* <Button onClick={() => scanArchivedFolders()}>Scan Filesystem</Button> */}

      <div className="flex flex-col gap-10">
        <ExploreArchives />

        {Object.keys(Settings.categories).map((category: string, index: number) => (
          <ArchiveList key={index} category={category as any} />
        ))}

      </div>
    </div>
  );
}
