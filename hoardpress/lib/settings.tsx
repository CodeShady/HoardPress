import { Book, Disc3, File, FolderCode, Gamepad, Music } from "lucide-react";

export const Settings = {
  ignoredExtensions: [".DS_Store", ".localized"],
  categories: {
    "Gaming": {
      icon: <Gamepad size={64} />
    },
    "Software": {
      icon: <FolderCode size={64} />
    },
    "CD & DVDs": {
      icon: <Disc3 size={64} />
    },
    "Music": {
      icon: <Music size={64} />
    },
    "Books": {
      icon: <Book size={64} />
    },
    "Other": {
      icon: <File size={64} />
    },
  }
}