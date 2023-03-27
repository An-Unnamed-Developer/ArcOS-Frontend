import { get } from "svelte/store";
import { focusedWindowId } from "../applogic/store";
import { UserName } from "../userlogic/interfaces";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";

export class ArcTermInput {
  private lockInput = false;
  target: HTMLDivElement;
  env: ArcTermEnv;
  term: ArcTerm;
  current: HTMLInputElement;

  constructor(T: ArcTerm) {
    this.target = T.target;
    this.env = T.env;
    this.term = T;

    this.commandLoop();
  }

  public commandLoop() {
    setInterval(() => {
      if (this.lockInput) return;

      this.lock();

      this.target.append(this.createPrompt());
    });
  }

  public lock() {
    this.lockInput = true;
  }

  public unlock() {
    this.lockInput = false;
  }

  private getPrompt() {
    const username = get(UserName);
    const server = localStorage.getItem("arcos-server");
    const path = (this.term.path || "./").replace("./", "");
    const prompt = this.env.prompt
      .replace("&u", username)
      .replace("&s", server)
      .replace("&p", path);

    return prompt;
  }

  public createPrompt() {
    if (this.current) this.current.disabled = true;

    const wrap = document.createElement("div");
    const inner = document.createElement("div");
    const input = document.createElement("input");

    wrap.className = "prompt";

    this.term.util.writeColor(
      this.getPrompt(),
      this.env.promptColor,
      "white",
      true,
      wrap
    );

    input.id = `input#${Math.floor(Math.random() * 1e9)}`;
    input.spellcheck = false;
    input.addEventListener("keydown", (e) => this.processInputEvent(e, input));

    this.current = input;

    inner.className = "inner";
    inner.append(input);

    wrap.append(inner);

    setTimeout(() => {
      if (this.term.app && get(focusedWindowId) == this.term.app.id)
        input.focus();
    });

    return wrap;
  }

  private async processInputEvent(e: KeyboardEvent, input: HTMLInputElement) {
    const split = this.term.vars.inline(input.value).split("&&");
    const key = e.key.toLowerCase();

    if (key == "enter") {
      for (let i = 0; i < split.length; i++) {
        const str = split[i].trim();
        const args = str.split(" ");
        const cmd = args[0];

        args.shift();

        await this.term.commandHandler.evaluate(cmd, args);
      }
    }
  }
}
