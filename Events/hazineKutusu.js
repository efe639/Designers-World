const {MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const coin = require("../Models/dw")

var messageSize = 0;
class hazineKutusu {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot) return;
    if(message.channel.id != "980373415301087243") return;
    messageSize++
    if(messageSize > 75)
    {
     messageSize = 0;

    const buton = await new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId("tikla")
        .setStyle("PRIMARY")
        .setEmoji("985518568181485578")
    )
    let rastgele = Math.floor(Math.random() * (500- 20)) + 20;
    await message.channel.send({content:`${message.member} Tebrikler, Bir adet **Altın Kutu** kazandın. Açmak için tıkla!`, components:[buton]}).then(x=>{
      var filter = (button) => button.user.id === message.author.id;
        const collector = x.createMessageComponentCollector({ filter,time: 30000 })
        collector.on('collect', async (button, user) => {
            if (button.customId === "tikla") {
                 x.delete()
                await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { coin: rastgele} }, { upsert: true });
                await message.channel.send({content: `${button.member}, **Altın Kutu**n açıldı ve içinden **${rastgele}** Adet DWC <:dw_coin:984872633181040660> Çıktı!`})
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

module.exports = hazineKutusu