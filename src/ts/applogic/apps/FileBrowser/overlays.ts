import OpeningFile from "../../../../lib/Apps/FileBrowser/Overlays/OpeningFile.svelte";
import type { OverlayableApp } from "../../interface";

export const fbOverlays: { [key: string]: OverlayableApp } = {
  openingFile: {
    info: {
      name: "Opening File",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: OpeningFile,
    size: { w: 430, h: 165 },
    show: false,
  },
};