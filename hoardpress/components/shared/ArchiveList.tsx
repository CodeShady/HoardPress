import { Archive } from "@/lib/models/archive.model";
import { Settings } from "@/lib/settings";
import ArchiveCard from "./ArchiveCard";
import { getArchives, getArchivesByCategory } from "@/lib/actions/filesystem.action";

export default async function ArchiveList({
  category,
}: {
  category: keyof typeof Settings.categories | "newest";
}) {
  let archives;

  if (category === "newest") {
    archives = await getArchives();
  } else {
    archives = await getArchivesByCategory(category);
  }

  if (!archives || archives.length === 0)
    return ;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="capitalize">{category}</h2>

      <div className="flex overflow-x-scroll no-scrollbar gap-5 w-full">
        {archives.map((archive: Archive, index: number) => (
          <ArchiveCard key={index} archive={archive} />
        ))}
      </div>
    </div>
  );
}
