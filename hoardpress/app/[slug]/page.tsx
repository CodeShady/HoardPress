import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getArchiveBySlug } from "@/lib/actions/filesystem.action";
import { Archive } from "@/lib/models/archive.model";
import { notFound } from "next/navigation";
import FilesList from "./Files";
import Edit from "./Edit";
import { Settings } from "@/lib/settings";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function ArchiveDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const archive: Archive = await getArchiveBySlug(slug);

  if (!archive) notFound();

  return (
    <div className="wrapper">
      {/* Items List */}
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-10 min-w-0">
          <div className="flex gap-10 mt-5">
            {archive.image ? (
              <Image className="aspect-square h-[250px] object-cover rounded-2xl" src={archive.image} width={250} height={250} alt="Cover Image" style={{ backgroundColor: archive.color || "transparent" }} />
             ) : (
              <div className="h-[250px] w-auto aspect-square rounded-2xl bg-accent" />
            )}

            <div className="h-fit w-full">
              <div className="flex gap-1">
                <h3>{archive.folder}</h3>

                <Edit archive={archive} />
              </div>
              {archive.author && (
                <span className="text-sm">
                  By{" "}
                  <Link href="#" className="text-primary">
                    {archive.author}
                  </Link>
                </span>
              )}
              {archive.category && (
                <Badge className="block mt-2">{archive.category}</Badge>
              )}

              <p className="whitespace-pre-line">{archive.description}</p>
            </div>
          </div>

          <FilesList slug={slug} />
        </div>

        <div className="w-[250px] shrink-0 bg-black/10 rounded-2xl p-5 space-y-2.5">
        </div>
      </div>
    </div>
  );
}
