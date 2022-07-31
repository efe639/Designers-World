const { Client, MessageEmbed } = require("discord.js");
const config = require("../config");
const coin = require("../Models/dw")

class Boost {
  Event = "guildMemberUpdate"
  async run(oldMember, newMember) {
    if (!oldMember.roles.cache.has("946509153160024065") && newMember.roles.cache.has("946509153160024065")) try {
      newMember.guild.channels.cache.get("980373415301087243").send({content:`${newMember} Sunucuya takviye yaptığı için bizden 2000 <:dw_coin:984872633181040660> Kazandı!`})
      await coin.findOneAndUpdate({ guildID: newMember.guild.id, userID: newMember.member.id }, { $inc: { coin: 2000,BoostSize:1 } }, { upsert: true });
      await newMember.roles.add("994138203189678120")
    }catch (error) {
        client.logger.log("Boost basana rol ve coin ekleme sisteminde arıza var","error")
      }
  }
}

module.exports = Boost