import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";
import messaging from "./apps/messaging";

export default {
  apps: {
    title: "Apps",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  appsSystem: {
    title: "About System Apps",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "apps",
  },
  appsTurnOnAndOff: {
    title: "Turn apps on and off",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "apps",
  },
  ...messaging,
} as HelpCenterStore;
