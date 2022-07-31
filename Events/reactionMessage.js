const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const coin = require("../Models/dw")

class messageReaction {
  Event = "messageCreate"
  async run(message) {
    if(message.content.toLocaleLowerCase().startsWith(config.Prefix)) return;
    if (message.author.bot) return;
    await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { coin: config.coin.message, totalMessage:1 } }, { upsert: true });

    if((message.attachments.size !== 0) && (message.channel.id== "980373421475115008" || message.channel.id== "980373420388782080" || message.channel.id == "981057584121385011")){
      await message.react("980448790089711656")
      await message.react("980448790685306970")
    }
    if((message.attachments.size !== 0) && (message.channel.id== "987389008625668206" )){
      await message.react("👍")
      await message.react("👎")
    }
  }
}

module.exports = messageReaction