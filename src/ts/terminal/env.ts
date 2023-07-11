import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { ArcOSVersion } from "../env/main";
import { D } from "../language/main";
import { ArcTermConfig } from "./config";
import type { Color } from "./interface";
import type { ArcTerm } from "./main";

export class ArcTermEnv {
  config: ArcTermConfig;
  prompt = "[&u]: [~/&p] $ ";
  promptColor: Color = "green";
  greeting = D("at.env.greeting");
  logo: boolean = true;

  constructor(term: ArcTerm) {
    Log({
      source: `ArcTerm ${term.referenceId}`,
      msg: `Creating new ArcTermEnv`,
      level: LogLevel.info,
    });

    this.config = new ArcTermConfig(this, term);
  }
}
