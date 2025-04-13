"use client";

import { getArchives } from "@/lib/actions/filesystem.action";
import { Archive } from "@/lib/models/archive.model";
import { useEffect, useState } from "react";
import ArchiveCard from "./ArchiveCard";

export default function ExploreArchives() {
  const [archives, setArchives] = useState<Archive[]>([]);

  useEffect(() => {
    async function fetchArchives() {
      const list = await getArchives();
      setArchives([...list, ...list]);
    }
    fetchArchives();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h3>Explore Archives</h3>
      <div className="flex overflow-x-scroll no-scrollbar gap-5 w-full">
        {archives.map((archive: Archive, index: number) => (
          <ArchiveCard key={index} archive={archive} />
        ))}
      </div>
    </div>
  );
}
