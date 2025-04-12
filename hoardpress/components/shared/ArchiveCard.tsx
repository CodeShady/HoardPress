import { Archive } from "@/lib/models/archive.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Settings } from "@/lib/settings";
import { Button } from "../ui/button";

export default function ArchiveCard({ archive }: { archive: Archive }) {
  const categoryKey = archive.category as keyof typeof Settings.categories;

  return (
    <Card>
      <CardHeader>
        <div
          className="mb-2.5 aspect-square w-full rounded-2xl border flex justify-center items-center"
          style={{ backgroundColor: archive.color || "transparent" }}
        >
          {categoryKey in Settings.categories &&
            Settings.categories[categoryKey].icon}
        </div>

        <CardTitle>{archive.folder}</CardTitle>
        <CardDescription className="truncate">
          {archive.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-end">
        <Button asChild>
          <Link href={`/${archive.slug}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
