"use client";

import { Button } from "@/components/ui/button";
import { scanArchivedFolders } from "@/lib/actions/filesystem.action";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ScanFilesystem() {
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false);

  async function handleClicked() {
    setClicked(true);

    const response = await scanArchivedFolders();
    if (response) {
      router.refresh();
      setClicked(false);
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <Button
      variant="ghost"
      title="Scan Filesystem"
      onClick={handleClicked}
      disabled={clicked}
    >
      {clicked ? <LoaderCircle className="animate-spin" /> : "Scan Filesystem"}
    </Button>
  );
}
