import { Archive } from "@/lib/models/archive.model";
import { Settings } from "@/lib/settings";
import { useEffect, useState } from "react";
import ArchiveCard from "./ArchiveCard";
import { getArchivesByCategory } from "@/lib/actions/filesystem.action";

export default function ArchiveList({
  category,
}: {
  category: keyof typeof Settings.categories;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [archives, setArchives] = useState<Archive[]>([]);

  useEffect(() => {
    async function fetchArchives() {
      const list = await getArchivesByCategory(category);
      setTimeout(() => {
        setArchives(list);
        setLoading(false);
      }, 3000);
    }
    fetchArchives();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h3>{category}</h3>

      <div className="flex overflow-x-scroll no-scrollbar gap-5 w-full">
        {loading ? (
          <>
            <ArchiveCard />
            <ArchiveCard />
            <ArchiveCard />
            <ArchiveCard />
            <ArchiveCard />
            <ArchiveCard />
          </>
        ) : (
          <>
            {archives.map((archive: Archive, index: number) => (
              <ArchiveCard key={index} archive={archive} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
