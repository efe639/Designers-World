const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
class guildCreate {
  Event = "guildCreate"
  async run(guild) {
    guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      client.invites.set(guild.id, cacheInvites);
    });
  }
}

module.exports = guildCreate