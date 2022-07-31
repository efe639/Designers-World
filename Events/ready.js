
const fs = require("fs");
const slash = require("../Helpers/slash")
const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const Inviter = require("../Models/Inviter");
const Users = require("../Models/Users");
class Ready {
  Event = "ready"
  async run() {
    client.user.setPresence({ activities: [{ name: '.öneri | .istek | .şikayet' }] });
      const channel = client.channels.cache.get("980373407545835560");
    voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    setInterval(async() => {
      await voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })
    }, 15 * 1000);
    const guild = channel.guild;
    guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Discord.Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      client.invites.set(guild.id, cacheInvites);
      });
const slashCommands = await globPromise(`${process.cwd()}/slashCommand/*/*.js`);  
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
      if (!file?.name) return;
    client.slashCommands.set(file.name, file)
      if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  setTimeout(x=> {
    client.guilds.cache.get(config.guildID).commands.set(arrayOfSlashCommands);
      console.log(`${client.guilds.cache.get(config.guildID).name}` +' için Slash Komutlar yüklendi.');
    }, 1200)
  }
}

module.exports = Ready