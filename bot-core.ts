import * as discord from "discord.js";
import { quote } from "./quote";
const client = new discord.Client();

export class BotCore {
  constructor(token: string) {
    client.login(token);
  }

  run(): void {
    quote(client);
  }
}
