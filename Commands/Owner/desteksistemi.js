const util = require("util")
const ms = require("ms")
const moment = require("moment");
const config = require("../../config")
const {createCanvas, loadImage} = require("canvas")
const {MessageEmbed,MessageAttachment, MessageActionRow , MessageButton} = require("discord.js")
const coin = require("../../Models/dw");
const { Modal, TextInputComponent, SelectMenuComponent }= require("discord-modals")
class desteksistemi extends Command {
    constructor(client) {
        super(client, {
            name: "desteksistemi",
            aliases: ["desteksistemi"],
            devOnly: true,
        });
    }
    async run(client, message, args,embed) {
        const butonlar = await  new MessageActionRow()
        .addComponents(
            await new MessageButton()
            .setCustomId("isteksikayetoneri")
            .setLabel("İstek Şikayet Öneri")
            .setStyle("DANGER")
            .setEmoji("981281370330517585"),
            await new MessageButton()
            .setLabel("Yetkili Başvuru")
            .setCustomId("yetkilibasvuru")
            .setStyle("SUCCESS")
            .setEmoji("981281647758549032"),
            await new MessageButton()
            .setCustomId("canlidestek")
            .setLabel("Canlı Destek")
            .setEmoji("981281413573795970")
            .setStyle("SUCCESS")
        )
//message.channel.send({content:"Aşağıda ki butonları kullanarak destek hizmetimizden yararlanabilirsiniz.", components:[butonlar]})
client.api.channels(message.channel.id).messages.post({
    data: {
        "content": "Aşağıda ki butonları kullanarak destek hizmetimizden yararlanabilirsiniz.",
        "components": [butonlar]
    }})
    }
}

module.exports = desteksistemi
