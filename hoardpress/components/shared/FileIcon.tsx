import {
  File,
  Image,
  Video,
  Music,
  FileText,
  FileArchive,
  Code,
  BookOpen,
  Database,
  Terminal,
  Shield,
  Globe,
  FileSpreadsheet,
  FileAudio,
  FileVideo,
  FileJson,
  Disc,
  Gamepad,
  Joystick
} from 'lucide-react';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const extensionMap: Record<string, IconComponent> = {
  // Emulation
  rvz: Gamepad,
  nes: Gamepad,
  gb: Gamepad,
  gbc: Gamepad,
  snes: Gamepad,
  swf: Joystick,

  // Images
  jpg: Image,
  jpeg: Image,
  png: Image,
  gif: Image,
  webp: Image,
  svg: Image,
  bmp: Image,
  tiff: Image,

  // Videos
  mp4: FileVideo,
  mov: FileVideo,
  avi: FileVideo,
  mkv: FileVideo,
  webm: FileVideo,
  flv: FileVideo,

  // Audio
  mp3: FileAudio,
  wav: FileAudio,
  aac: FileAudio,
  ogg: FileAudio,
  flac: FileAudio,

  // Text / Docs
  txt: FileText,
  md: BookOpen,
  markdown: BookOpen,
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  rtf: FileText,

  // Code
  js: Code,
  jsx: Code,
  ts: Code,
  tsx: Code,
  html: Code,
  css: Code,
  scss: Code,
  py: Code,
  java: Code,
  c: Code,
  cpp: Code,
  cs: Code,
  json: FileJson,
  xml: Code,
  yaml: Code,
  yml: Code,
  sh: Terminal,
  bat: Terminal,

  // Archives
  zip: FileArchive,
  rar: FileArchive,
  tar: FileArchive,
  gz: FileArchive,
  "7z": FileArchive,

  // Spreadsheets
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  csv: FileSpreadsheet,

  // Databases
  db: Database,
  sql: Database,

  // Others
  iso: Disc,
  key: Shield,
  pem: Shield,
  crt: Shield,
  cer: Shield,
  html5: Globe,
};

export default function FileIcon ({ extension }: { extension: string }): React.ReactNode {
  const ext = extension.toLowerCase();
  const Icon = extensionMap[ext] || File;
  return <Icon />;
};
