import { Archive } from "@/lib/models/archive.model";
import Link from "next/link";
import Image from "next/image";

export default function ArchiveCard({ archive }: { archive: Archive }) {
  return (
    <Link href={`/${archive.slug}`}>
      <div className="w-[200px] flex flex-col gap-2.5 rounded-xl hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-all hover:p-2.5">
        {archive.image ? (
          <Image
            className="w-auto h-auto aspect-square rounded-lg object-cover"
            style={{ backgroundColor: archive.color || "transparent" }}
            src={archive.image}
            width={256}
            height={256}
            alt="Cover image"
          />
        ) : (
          <div className="w-auto h-auto aspect-square rounded-lg bg-accent" />
        )}

        <div className="flex flex-col">
          <span className="text-sm font-semibold truncate">
            {archive.folder}
          </span>
          <span className="text-xs font-medium opacity-50">
            {archive.author || "No Author"}
          </span>
        </div>
      </div>
    </Link>
  );
}
