import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getArchiveBySlug } from "@/lib/actions/filesystem.action";
import { Archive } from "@/lib/models/archive.model";
import { notFound } from "next/navigation";
import FilesList from "./Files";
import Edit from "./Edit";

export default async function ArchiveDetails({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const archive: Archive = await getArchiveBySlug(slug);

  if (!archive)
    notFound();

  return (
    <div className="px-5 flex flex-col gap-10">
      {/* Cover */}
      <div className="w-full h-[350px] bg-black/10 rounded-b-2xl" />

      {/* Items List */}
      <div className="mx-10 flex gap-10">
        <div className="w-full flex flex-col gap-10">
          <div>
            <h3>{archive.folder}</h3>
            {archive.author && <span className="text-sm">By <Link href="#" className="text-primary">{archive.author}</Link></span>}
            <p className="whitespace-pre-line">{archive.description}</p>
          </div>

          <FilesList slug={slug} />
        </div>

        <div className="w-[400px] bg-black/10 rounded-2xl p-5 space-y-2.5">
          <h4>Settings</h4>
          <Edit archive={archive} />

          <h4>Download Options</h4>

          <div className="space-x-2.5">
            <Button>.zip</Button>
            <Button>.iso</Button>
            <Button>.7z</Button>
            <Button>.rar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
