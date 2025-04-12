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

export default function ArchiveCard({ archive }: { archive: Archive }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{archive.folder}</CardTitle>
        <CardDescription>{archive.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Link href={`/${archive.slug}`}>View</Link>
      </CardFooter>
    </Card>
  );
}
