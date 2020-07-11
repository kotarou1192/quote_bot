import * as discord from "discord.js";

let url: string;
let ChannelId: string;
let MessageId: string;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function quote(client: discord.Client) {
  client.on("message", async (msg) => {
    if (
      msg.guild === null ||
      client.user === null ||
      msg.author.id === client.user.id
    )
      return;

    if (!isDiscordChatURL(msg)) return;

    const channel = msg.guild.channels.resolve(
      ChannelId
    ) as discord.TextChannel;

    channel.messages
      .fetch(MessageId)
      .then((targetMessage: discord.Message) => {
        const author = msg.client.users.cache.get(targetMessage.author.id);
        if (author === undefined) throw new TypeError("author is empty");

        createEmbed(msg, targetMessage, url, author);
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  });
}

function isDiscordChatURL(msg: discord.Message) {
  const pattern = /https:\/\/discordapp.com\/channels\/\d+\/\d+\/\d+/;
  const result = msg.content.match(pattern);

  if (result === null) return false;

  url = result.toString();

  console.log(url);

  try {
    [, ChannelId, MessageId] = parseUrl(url);
  } catch (error) {
    return false;
  }
  return true;
}

function createEmbed(
  msg: discord.Message,
  message: discord.Message,
  url: string,
  author: discord.User
) {
  if (message.embeds[0] instanceof discord.MessageEmbed) {
    for (let index = 0; index < message.embeds.length; index++) {
      message.embeds[index].setURL(url).setTimestamp();
      msg.channel.send(message.embeds[index]);
    }
    return;
  }
  if (
    message.attachments.values().next().value instanceof
    discord.MessageAttachment
  ) {
    return msg.channel.send(message.attachments.values().next().value);
  }
  const embed = new discord.MessageEmbed()
    .setURL(url)
    .setAuthor(author.username, author.displayAvatarURL())
    .setDescription(message.content)
    .setColor("RANDOM")
    .setTimestamp();

  msg.channel.send(embed);
}

function parseUrl(url: string) {
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
