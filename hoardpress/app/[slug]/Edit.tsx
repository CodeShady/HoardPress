"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateArchive } from "@/lib/actions/filesystem.action";
import { Archive } from "@/lib/models/archive.model";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "@/lib/settings";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

type EditForm = {
  description: string;
  author: string;
  color: string;
  category: string;
  image: string;
};

export default function Edit({ archive }: { archive: Archive }) {
  const router = useRouter();
  const [form, setForm] = useState<EditForm>({
    description: archive.description || "",
    author: archive.author || "",
    color: archive.color || "",
    category: archive.category || "",
    image: archive.image || "",
  });

  async function handleFormSubmit() {
    // Save changes
    const result = await updateArchive({
      slug: archive.slug,
      ...form
    });

    setTimeout(() => router.refresh(), 300);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Edit Archive" variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Archive</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2.5">
            <Label htmlFor="folder" className="text-right">
              Folder
            </Label>
            <Input
              id="folder"
              value={archive.folder}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="col-span-3 h-40"
            />
          </div>
          
          <div className="space-y-2.5">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input
              id="author"
              value={form.author}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, author: e.target.value }))
              }
              className="col-span-3"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="image" className="text-right">
              Cover Image (URL)
            </Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, image: e.target.value }))
              }
              placeholder="https://example.com/uploads/image.png"
              className="col-span-3"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="color" className="text-right">
              Category
            </Label>
            <Select value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(Settings.categories).map((category: string, index: number) => (
                  <SelectItem key={index} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <div className="flex gap-2.5">
              <Input
                id="color"
                value={form.color}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, color: e.target.value }))
                }
                className="col-span-3"
              />
              <div
                className="h-9 w-9 rounded-md aspect-square border transition-colors"
                style={{ backgroundColor: form.color }}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleFormSubmit}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
