const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const Inviter = require("../Models/Inviter");
const Users = require("../Models/Users");
const coin = require("../Models/dw")
class guildMemberRemove {
  Event = "guildMemberRemove"
  async run(member) {
    if(member){
      await member.guild.channels.cache.get("980397146866065460").send({embeds:[new Discord.MessageEmbed()
      .setDescription(`${member}  Sunucudan ayrıldı.
> **Kullanıcı bilgileri** 
\`•>\` Kullanıcı Adı: ${member.user.username}
\`•>\` ID & Etiket: ${member.user.id} & #${member.user.discriminator}
      `)
]})
const inviteMemberData = await Users.findOne({ userID: member.user.id }) || [];
const channel = member.guild.channels.cache.get("985103443821752351")
if (!inviteMemberData.Inviter) {
 return channel.send({ content: `\`>\` **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **Davetçi bulunamadı**` });
} else if (inviteMemberData.Inviter.inviter === member.guild.id) {
  await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: member.guild.id }, { $inc: { total: -1 } }, { upsert: true });
  const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: member.guild.id });
  const total = inviterData ? inviterData.total : 0;
  return channel.send({ content: `\`>\` **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: \`Sunucu Özel URL\` (**${total}** davet)` });
} else {
  if (Date.now() - member.user.createdTimestamp <= 604800000) {
    const inviter = await client.users.fetch(inviteMemberData.Inviter.inviter);
    const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;  
  return channel.send({ content: `\`>\` **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **${inviter.tag}** (**${total}** davet)` })
  } else {
    const inviter = await client.users.fetch(inviteMemberData.Inviter.inviter);
    await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;  
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { coin: -config.coin.invite } }, { upsert: true });

 return channel.send({ content: `\`>\` **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **${inviter.tag}** (**${total}** davet & -${config.coin.invite} DWC)` });
  }
}
    }
  }
}

module.exports = guildMemberRemove