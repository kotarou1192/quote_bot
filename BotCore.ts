import * as discord from "discord.js";
const client = new discord.Client();

export class BotCore {
  constructor(token: string) {
    client.login(token);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  run() {
    client.on("message", async (msg) => {
      const pattern = /https:\/\/discordapp.com\/channels\//;
      const result = msg.content.match(pattern);
      if (result !== null) {
        const url = result.input;
        if (url === undefined) throw new Error("undefined error 1");
        try {
          const [serverId, channelId, id] = this.parseUrl(url);
          const channel = msg.guild.channels.resolve(
            channelId
          ) as discord.TextChannel;
          if (channel === null) {
            throw new Error("invalid channel id");
          }
          channel.messages
            .fetch(id)
            .then((targetMessage) => {
              const message = this.createEmbed(targetMessage, url);
              msg.channel.send(message);
            })
            .catch((error) => {
              console.error(error);
              return;
            });
        } catch (error) {
          console.error(error);
          return;
        }
      }
    });
  }

  private createEmbed(message, url) {
    if (message.embeds[0] instanceof discord.MessageEmbed) {
      message.embeds[0].setURL(url);
      return message.embeds[0];
    }
    if (
      message.attachments.values().next().value instanceof
      discord.MessageAttachment
    ) {
      return message.attachments.values().next().value;
    }
    return new discord.MessageEmbed()
      .setURL(url)
      .addField(message.author.username, message.content)
      .setColor("RANDOM")
      .setTimestamp();
  }

  private parseUrl(url: string) {
    const values = url.match(/\/\d+/g);
    if (values === null) throw new Error("undefined error 2");
    if (values.length !== 3) throw new Error("undefined error 3");

    const server = values[0].replace("/", "");
    const channel = values[1].replace("/", "");
    const id = values[2].replace("/", "");
    return [server, channel, id];
  }
}
