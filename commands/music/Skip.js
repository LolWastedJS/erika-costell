const Command = require("../../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class PlayCommand extends Command {
  constructor() {
    super("skip", {
      aliases: [ "skip", "next" ],
      description: "Skips to the next song.",
      guildOnly: true,
      category: "music"
    });
  }

  /**
   * @param {import("discord.js")} message
   * @param {String[]} args
   * @param {import("discord.js").Client} client
   * @returns {Promise<void>}
   */
  async exec(message, args, client) {
    const player = client.andesite.players.get(message.guild.id)
    if (!player)
      return message.channel.send(new MessageEmbed()
        .setColor("RED")
        .setDescription(`Use \`erika join\` to create a player.`));

    if (!message.guild.channels.resolve(player.channelId).members.has(message.author.id))
      return message.channel.send(new MessageEmbed()
        .setColor("RED")
        .setDescription(`Please join the voice channel i'm in.`));

    const np = player.queue._next()
    await player.queue.start();
    return message.channel.send(new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Skipped to **[${np.song.info.title}](${np.song.info.uri})**`))
  }
};