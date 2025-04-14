"use client";

import { Download, LoaderCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DownloadFileButton({ fileURL }: { fileURL: string }) {
  const [clicked, setClicked] = useState<boolean>(false);

  function handleClicked() {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  }

  return (
    <Button
      asChild
      className="h-8 w-8 p-0"
      variant="ghost"
      title="Download File"
      onClick={handleClicked}
      disabled={clicked}
    >
      <Link href={fileURL} target="_blank">
        {clicked ? <LoaderCircle className="animate-spin" /> : <Download />}
      </Link>
    </Button>
  );
}
