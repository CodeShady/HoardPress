import ArchiveList from "@/components/shared/ArchiveList";
import { Settings } from "@/lib/settings";

export default function Home() {
  return (
    <div className="wrapper py-5">
      <div className="flex flex-col gap-10">
        <ArchiveList category={"newest"} />
        
        {Object.keys(Settings.categories).map((category: string, index: number) => (
          <ArchiveList key={index} category={category as any} />
        ))}
      </div>
    </div>
  );
}