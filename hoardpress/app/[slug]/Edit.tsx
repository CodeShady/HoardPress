"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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

type EditForm = {
  description: string;
  author: string;
  color: string;
};

export default function Edit({ archive }: { archive: Archive }) {
  const [form, setForm] = useState<EditForm>({
    description: archive.description || "",
    author: archive.author || "",
    color: "#ffffff",
  });

  async function handleFormSubmit() {
    // Save changes
    const result = await updateArchive({
      slug: archive.slug,
      description: form.description,
      author: form.author,
    });
    console.log(result);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Archive</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Archive</DialogTitle>
          <DialogDescription>
            Make changes to this archive here. Click save when you're done.
          </DialogDescription>
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
            <Label htmlFor="color" className="text-right">
              Category
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Software</SelectItem>
                <SelectItem value="dark">Art</SelectItem>
                <SelectItem value="system">Books</SelectItem>
                <SelectItem value="music">Music</SelectItem>
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
          <Button type="submit" onClick={handleFormSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
