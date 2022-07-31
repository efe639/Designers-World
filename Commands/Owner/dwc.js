const util = require("util")
const ms = require("ms")
const moment = require("moment");
const config = require("../../config")
const {createCanvas, loadImage} = require("canvas")
const {MessageEmbed,MessageAttachment} = require("discord.js")
const coin = require("../../Models/dw");
class Dwc extends Command {
    constructor(client) {
        super(client, {
            name: "Dwc",
            aliases: ["dwc"],
            perm:["980403846192979968","980373380727472169","980373382539411457","980373386209427456"]
        });
    }
    async run(client, message, args,embed) {
const işlem = await args[0];
const member = await message.guild.members.cache.get(args[1]) || message.member
const sayi = await args[2];
if(işlem == "ekle" || işlem == "Ekle"){
    if(!Number(sayi)) return;
await coin.findOneAndUpdate({guildID:message.guild.id, userID:member.id}, { $inc:{coin: sayi}}, { upsert: true })

const dwc = await coin.findOne({guildID:message.guild.id, userID:member.id});
const totalCoin = dwc ? dwc.coin:0
await message.reply({content:`${member}, hesabına **${sayi}** DWC Eklendi!. Toplam **${Number(totalCoin.toFixed())}** DWC'si Bulunuyor.`, allowedMentions: { repliedUser: false} })
}
if(işlem == "cikar" || işlem == "çıkar" || işlem == "sil"){
    if(!Number(sayi)) return;
await coin.findOneAndUpdate({guildID:message.guild.id, userID:member.id}, { $inc:{coin: -sayi}}, { upsert: true })

const dwc = await coin.findOne({guildID:message.guild.id, userID:member.id});
const totalCoin = dwc ? dwc.coin:0
await message.reply({content:`${member}, hesabına **${sayi}** DWC Eklendi!. Toplam **${Number(totalCoin.toFixed())}** DWC'si Bulunuyor.`, allowedMentions: { repliedUser: false} })
}
    }
}

module.exports = Dwc
