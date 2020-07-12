import * as discord from "discord.js";

export async function quote(client: discord.Client): Promise<void> {
  client.on("message", async (msg) => {
    if (
      msg.guild === null ||
      client.user === null ||
      msg.author.id === client.user.id
    )
      return;

    if (!hasDiscordChatURL(msg)) return;

    const [, channelId, messageId] = getDiscordChatURLElements(msg);

    const channel = msg.guild.channels.resolve(
      channelId
    ) as discord.TextChannel;

    channel.messages
      .fetch(messageId)
      .then((targetMessage: discord.Message) => {
        const author = msg.client.users.cache.get(targetMessage.author.id);
        if (author === undefined) throw new TypeError("author is empty");

        generateQupteMessage(msg, targetMessage, author);
      })
      .catch((error) => {
        console.log(new Date());
        console.error(error);
        return;
      });
  });
}

function getDiscordChatURLElements(msg: discord.Message): string[] {
  const pattern = /https:\/\/discordapp.com\/channels\/\d+\/\d+\/\d+/;
  const result = msg.content.match(pattern);

  if (result === null) return [];

  const url = result.toString();

  let guildId: string;
  let channelId: string;
  let messageId: string;

  try {
    [guildId, channelId, messageId] = parseUrl(url);
  } catch (error) {
    return [];
  }
  return [guildId, channelId, messageId];
}

function hasDiscordChatURL(msg: discord.Message): boolean {
  const pattern = /https:\/\/discordapp.com\/channels\/\d+\/\d+\/\d+/;
  const result = msg.content.match(pattern);

  if (result === null) return false;

  const url = result.toString();

  try {
    parseUrl(url);
  } catch (error) {
    return false;
  }
  return true;
}

function generateQupteMessage(
  msg: discord.Message,
  message: discord.Message,
  author: discord.User
): void {
  if (typeof message.content === "string" && message.content !== "") {
    const embed = new discord.MessageEmbed()
      .setAuthor(author.username, author.displayAvatarURL())
      .setDescription(message.content)
      .setColor("RANDOM");
    if (
      message.attachments.values().next().value instanceof
      discord.MessageAttachment
    ) {
      message.attachments.forEach((attachment) => {
        embed.setImage(attachment.url);
      });
    }

    // embedがついていたら全て追加で送信
    msg.channel.send(embed);
    if (message.embeds[0] instanceof discord.MessageEmbed) {
      for (let index = 0; index < message.embeds.length; index++) {
        msg.channel.send(message.embeds[index]);
      }
    }
    return;
  }

  if (
    message.attachments.values().next().value instanceof
    discord.MessageAttachment
  ) {
    message.attachments.forEach((attachment) => {
      const embed = new discord.MessageEmbed()
        .setAuthor(author.username, author.displayAvatarURL())
        .setImage(attachment.url);
      msg.channel.send(embed);
    });
  }
  if (message.embeds[0] instanceof discord.MessageEmbed) {
    for (let index = 0; index < message.embeds.length; index++) {
      msg.channel.send(message.embeds[index]);
    }
  }
}

function parseUrl(url: string): string[] {
  const values = url.match(/\/\d+/g);
  if (values === null) throw new ArgumentError("url type is invalid");
  if (values.length !== 3) throw new ArgumentError("url type is invalid");

  const ServerId = values[0].replace("/", "");
  const ChannelId = values[1].replace("/", "");
  const MessageId = values[2].replace("/", "");

  return [ServerId, ChannelId, MessageId];
}

class ArgumentError extends Error {
  date: Date;
  constructor(message = "", ...params: (string | undefined)[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ArgumentError);
    }

    this.name = "ArgumentError";
    this.message = message;
    this.date = new Date();
  }
}
