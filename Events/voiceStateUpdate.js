const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const coin = require("../Models/dw")
const joinedAt = require("../Models/voiceJoinedAt")
class voiceStateUpdate {
  Event = "voiceStateUpdate"
  async run(oldState,newState) {
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;

    if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });

    let joinedAtData = await joinedAt.findOne({ userID: oldState.id });

    if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
    joinedAtData = await joinedAt.findOne({ userID: oldState.id });
    const data = Date.now() - joinedAtData.date;
    if(data > 60000) {
    const coinverilcek = (data / 60000) * config.coin.voice
    await coin.findOneAndUpdate({ guildID: oldState.guild.id, userID: oldState.id }, { $inc: { coin: coinverilcek, totalVoice:data } }, { upsert: true });

}
  }
}

module.exports = voiceStateUpdate