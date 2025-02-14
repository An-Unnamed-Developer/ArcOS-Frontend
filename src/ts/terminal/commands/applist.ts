import { get } from "svelte/store";
import type { App } from "../../applogic/interface";
import { getOpenedStore, WindowStore } from "../../applogic/store";
import { switchExists } from "../argv";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const AppList: Command = {
  keyword: "applist",
  exec(cmd, argv, term) {
    const store = switchExists(argv, "open")
      ? getOpenedStore()
      : get(WindowStore);

    header(term);

    for (let i = 0; i < store.length; i++) {
      output(term, store[i]);
    }
  },
  description: "List all- or opened ArcOS apps.",
  syntax: "([opened?])",
};

function output(term: ArcTerm, app: App) {
  const id = app.id.padEnd(30, " ");
  const name = app.info.name.padEnd(30, " ");
  const version = app.info.version;
  term.std.writeColor(`${name}[${id}]${version}`, "gray");
}

function header(term: ArcTerm) {
  const hName = `Name`.padEnd(30, " ");
  const hId = `ID`.padEnd(30, " ");
  const hVer = `Version`;

  const head = `${hName}${hId}${hVer}`;

  term.std.writeColor(`[${head}]`, "yellow");
  term.std.writeSeperator(head.length);
}
