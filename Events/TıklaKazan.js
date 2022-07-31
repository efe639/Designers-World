const {MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const coin = require("../Models/dw")

var messageSize = 0;
class TıklaKazan {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot) return;
    if(message.channel.id != "980373415301087243") return;
    messageSize++
    if(messageSize > 200)
    {
     messageSize = 0;

    const buton = await new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId("tikla")
        .setLabel("Tıkla Kazan !")
        .setStyle("PRIMARY")
        .setEmoji("984872633181040660")
    )
    let rastgele = Math.floor(Math.random() * (1000- 20)) + 20;
    await message.channel.send({content:`**Tıkla Kazan** Aşağıda bulunan butona ilk basan ${rastgele} <:dw_coin:984872633181040660> DWC Kazanıcak ! hadii Hızlı OLLL`, components:[buton]}).then(x=>{
        const collector = x.createMessageComponentCollector({ time: 30000 })
        collector.on('collect', async (button, user) => {
  
            if (button.customId === "tikla") {
                 x.delete()
                await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { coin: rastgele} }, { upsert: true });
                await message.channel.send({content: `${button.member}, **Tıkla Kazan** Etkinliğinden ${rastgele} DWC <:dw_coin:984872633181040660> Hesabına Yüklendi Aferinnn !`})
            }
        })
        collector.on("end", async (collected, reason) => {
            if (reason === "time") {
              if (x) await x.delete()
            }
    })
    })
    }
  }
}

module.exports = TıklaKazan