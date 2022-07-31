const Users = require("../Models/Users");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const {Formatters} = require("discord.js")
class afkSystem {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || !message.guild || message.channel.type == "dm") return;
    if (message.content.match(inviteEngel)) {
    if(message.member.permissions.has("ADMINISTRATOR") || ayarlar.Owners.includes(message.author.id) ) return;
      const invites = await message.guild.invites.fetch();
      if ((message.guild.vanityURLCode && message.content.match(inviteEngel).some((i) => i === message.guild.vanityURLCode)) || invites.some((x) => message.content.match(inviteEngel).some((i) => i === x))) return;
      if (message.deletable) message.delete();
    }
    const data = await Users.findOne({ userID: message.author.id }) || [];
    if (data.AfkStatus) {
      await Users.updateOne({ userID: message.author.id }, { $unset: { AfkStatus: {} } });
      if (message.member.displayName.includes("[AFK]") && message.member.manageable) await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
      message.channel.send({ embeds: [new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${message.member} adlı kullanıcı tekrar klavye başında hoş geldin!`)] }).then(e => setTimeout(() => e.delete(), 7000))
    }
    const member = message.mentions.members.first();
    if (!member) return;
    const afkData = await Users.findOne({ userID: member.user.id }) || []
    if (!afkData.AfkStatus) return;
    await message.channel.send({ embeds: [new Discord.MessageEmbed().setColor('RANDOM').setDescription(`<@` + message.author.id + `> Etiketlediğiniz kullanıcı **${moment.duration(Date.now() - afkData.AfkStatus.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** den beri, **${afkData.AfkStatus.reason}** sebebiyle klavyeden uzakta!`)] }).then(e => setTimeout(() => e.delete(), 7000))
    await member.send({content:`${message.member} tarafından etiketlendin!\n**Mesaj İçeriği** ${await Formatters.codeBlock("fix", message)}`}).catch(async x=>{
      await client.logger.log(`${member.user.username} Dm Kutusu kapalı oldu için etiket bildirimini yollayamadım.`)
      await message.guild.channels.cache.get("994559623673688074").send({content:`${message.member} tarafından etiketlendi!\n**Mesaj İçeriği** ${await Formatters.codeBlock("fix", message)}`})
    })
  }
}
module.exports = afkSystem