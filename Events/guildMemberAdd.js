const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const Inviter = require("../Models/Inviter");
const Users = require("../Models/Users");
const coin = require("../Models/dw")
class guildMemberAdd {
  Event = "guildMemberAdd"
  async run(member) {
    if(member){
      await member.roles.add("980373396548378624")
      await member.guild.channels.cache.get("980397146866065460").send({embeds:[new Discord.MessageEmbed()
.setDescription(`${member}  Sunucuya katıldı.
> **Kullanıcı bilgileri** 
\`•>\` Kullanıcı Adı: ${member.user.username}
\`•>\` ID & Etiket: ${member.user.id} & #${member.user.discriminator}`)
.addFields({name:"__Otorol__",value:"Kullanıcıya <@&980373396548378624> rolü verildi."})]})
await member.guild.channels.cache.get("980373415301087243").send({content:`Hi ${member}, welcome. Say hello to us! 👋`}).then(x=> setTimeout(() => {
  x.delete()
}, 5000))
const invlog = await member.guild.channels.cache.get("985103443821752351")
const guildInvites = client.invites.get(member.guild.id).clone() ||  new Discord.Collection().clone()
const invites = await member.guild.invites.fetch();
const invite = await invites.find((inv) => guildInvites.has(inv.code) && inv.uses > guildInvites.get(inv.code).uses) || guildInvites.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
const cacheInvites = new Discord.Collection();
invites.map((inv) => { cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter }); });
client.invites.set(member.guild.id, cacheInvites);
if (invite === null) {
  invlog.send({ content: `\`>\` ${member.user.tag} Sunucuya Katıldı, Kendisini Davet Eden Kullanıcı **Bulunamadı**`})
      } else if (invite === undefined) {
  invlog.send({ content: `\`>\` ${member.user.tag} Sunucuya Katıldı, Kendisini Davet Eden Kullanıcı **Bulunamadı**`})
  
  } else if (!invite) {
  invlog.send({ content: `\`>\` ${member.user.tag} Sunucuya Katıldı, Kendisini Davet Eden Kullanıcı **Bulunamadı**`})
      }else if (invite === member.guild.vanityURLCode) {
        await Users.findOneAndUpdate({ userID: member.user.id }, { $set: { Inviter: { inviter: member.guild.id, date: Date.now() } } }, { upsert: true });
        await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: member.guild.id }, { $inc: { total: 1 } }, { upsert: true });
        const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: member.guild.id });
        const total = inviterData ? inviterData.total : 0;
        member.guild.fetchVanityData().then(res => {  invlog.send({ content: `\`>\` ${member} Sunucuya (Özel URL) tarafından katıldı, Toplam ${total +res.uses } kullanıma ulaşıldı.`})})

  
      } else {
        await Users.findOneAndUpdate({ userID: member.user.id }, { $set: { Inviter: { inviter: invite.inviter.id, date: Date.now() } } }, { upsert: true });
        if (Date.now() - member.user.createdTimestamp <= 604800000) {
          await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { fake: 1, regular: 1 } }, { upsert: true });
          const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
          const total = inviterData ? inviterData.total : 0;
  invlog.send({ content: `\`>\` ${member} isimli Kullanıcı ${invite.inviter} Tarafından Sunucumuza Katıldı. Toplam **${total}** Davete Ulaştı.`+Discord.Formatters.codeBlock("fix",`https://discord.gg/${invite.code}`)})
  
  
        } else {
          await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
          const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
          const total = inviterData ? inviterData.total : 0;
          await coin.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { coin: config.coin.invite, totalInvite: 1 } }, { upsert: true });
          invlog.send({ content: `\`>\` ${member} isimli Kullanıcı ${invite.inviter} Tarafından Sunucumuza Katıldı. Toplam **${total}** Davete Ulaştı. (+${config.coin.invite} DWC)`+Discord.Formatters.codeBlock("fix",`https://discord.gg/${invite.code}`)})
        }
      }

    }
  }
}

module.exports = guildMemberAdd