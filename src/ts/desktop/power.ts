import { get } from "svelte/store";
import { logoffToken } from "../api/cred";
import { defaultDirectory } from "../api/interface";
import {
  FileBrowserCurrentDir,
  FileBrowserDeletingFilename,
  FileBrowserDirContents,
  FileBrowserSelectedFilename,
} from "../applogic/apps/FileBrowser/main";
import { closeWindow } from "../applogic/events";
import { WindowStore } from "../applogic/store";
import { ErrorMessages, ErrorWindowStore } from "../errorlogic/app";
import { selectedMessageId } from "../messaging/main";
import { NotificationStore } from "../notiflogic/main";
import { restarting, shuttingDown } from "./main";

export function logoff() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  FileBrowserCurrentDir.set("./");
  FileBrowserSelectedFilename.set(null);
  FileBrowserDirContents.set(defaultDirectory);
  FileBrowserDeletingFilename.set(null);
  NotificationStore.set({});
  ErrorWindowStore.set([]);
  ErrorMessages.set([]);
  WindowStore.set([]);
  selectedMessageId.set(null);
}

export function shutdown() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  logoffToken();

  shuttingDown.set(true);
}

export function restart(eraseToken = false) {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  if (eraseToken) {
    localStorage.removeItem("arcos-remembered-token");
    logoffToken();
  }

  restarting.set(true);
}
