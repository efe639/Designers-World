const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");

class inviteCreate {
  Event = "inviteCreate"
  async run(invite) {
    invite.guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Discord.Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      client.invites.set(invite.guild.id, cacheInvites);
      console.log(cacheInvites)
    });
   
  }
}

module.exports = inviteCreate