import * as discord from "discord.js";
import { quote } from "./quote"
const client = new discord.Client();

export class BotCore {
  url: string | undefined;
  ServerId: any;
  ChannelId: any;
  MessageId: any;
  constructor(token: string) {
    client.login(token);
  }

  run() {
    quote(client);
  }
}
