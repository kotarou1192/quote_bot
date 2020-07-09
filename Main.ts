import * as fs from "fs";
import { promisify } from "util";
import { BotCore } from "./BotCore";

promisify(fs.readFile)(".env", "utf-8")
  .then((data) => {
    const values = JSON.parse(data);
    return values;
  })
  .then((values) => {
    const token = values.token;
    if (typeof token !== "string")
      throw new TypeError("token Type is incorrected");
    const bot = new BotCore(token);
    bot.run();
  })
  .catch((error) => {
    console.error(error);
  });
