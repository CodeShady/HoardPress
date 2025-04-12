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
      setArchives(list);
    }
    fetchArchives();
  }, []);

  return (
    <div className="grid grid-cols-6">
      {archives.map((archive: Archive, index: number) => (
        <ArchiveCard key={index} archive={archive} />
      ))}
    </div>
  );
}
