import { randomUUID } from "crypto";
import type { App } from "../applogic/interface";
import { Log, LogLevel } from "../console";
import { ArcOSVersion } from "../env/main";
import sleep from "../sleep";
import { ArcTermCommandHandler } from "./commands";
import { ArcTermEnv } from "./env";
import { initError } from "./error";
import { ArcTermInput } from "./input";
import type { Color, CommandStore } from "./interface";
import { ArcTermIntro } from "./intro";
import { ArcTermStd } from "./std";
import { ArcTermUtil } from "./util";
import { ArcTermVariables } from "./var";

/**
 * @WARNING   This part of ArcOS is seperated from the Svelte framework in
 *            order to make it easier to write and manage. Frequent checks
 *            are performed throught ArcTerm classes in order to keep it clean
 *            and stop it from breaking unexpectedly.
 *
 * - IzKuipers, march 17 2023
 */

export class ArcTerm {
  target: HTMLDivElement;
  commands: CommandStore;
  app: App;
  std: ArcTermStd;
  util: ArcTermUtil;
  env: ArcTermEnv;
  vars: ArcTermVariables;
  input: ArcTermInput;
  path: string;
  commandHandler: ArcTermCommandHandler;
  referenceId: string;
  onload: (term: ArcTerm) => void;

  constructor(
    t: HTMLDivElement,
    cS: CommandStore,
    a: App,
    cb?: (term: ArcTerm) => void
  ) {
    this.target = t;
    this.commands = cS;
    this.app = a;
    this.onload = cb;

    this.initialize();
  }

  public async initialize() {
    this.util = new ArcTermUtil(this);
    this.referenceId = this.util.getReference();

    Log({
      source: `ArcTerm ${this.referenceId}`,
      msg: `Initializing new ArcTerm`,
      level: LogLevel.info,
    });

    if (!this.target) return initError(this.app.id);

    this.target.removeAttribute("style");

    this.path = "./";
    this.target.innerText = `v${ArcOSVersion}`;
    this.commandHandler = new ArcTermCommandHandler(this);
    this.env = new ArcTermEnv(this);
    this.vars = new ArcTermVariables(this);

    setTimeout(async () => {
      this.std = new ArcTermStd(this);
      this.input = new ArcTermInput(this);

      this.input.lock();

      if (this.onload) await this.onload(this);

      await sleep(100);

      this.input.unlock();

      this.util.intro();
      this.util.flushAccent();
    }, 100);
  }

  public dispose() {
    if (!this.target) return;

    this.std.clear();
    this.std = null;
    this.env = null;
    this.input.lock();
    this.input = null;
  }
}
