const {MessageAttachment, MessageEmbed} = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const coin = require("../Models/dw")
const {
  Canvas
} = require('canvas-constructor');
const {
  loadImage
} = require('canvas');
const {
  join
} = require("path");

var messageSize= 0;
let kod;

class SayıyıBul {
  Event = "messageCreate"
  async run(message) {
    if(message.content.toLocaleLowerCase().startsWith(config.Prefix)) return;
    if (message.author.bot) return;
    if(message.channel.id != "980373415301087243") return;
    messageSize++
    if(messageSize == 244)
    {
      let rastgele = Math.floor(Math.random() * (10- 1)) + 1;
      messageSize = 0;
      let fotolar = ["https://cdn.discordapp.com/attachments/899376765942784040/987712542560358410/dasdasdadasdsa.png"]
      let rand = fotolar[Math.floor(Math.random()* fotolar.length)]
      const avatar = await loadImage(message.author.avatarURL({format: "jpg"}));
    const background = await loadImage(rand);            
    const image = new Canvas(640, 320)
    .printImage(background, 0, 0, 640, 320)
    .setTextFont('48px Arial Black')
    .setColor("#fff")
   .printText(`Ödül 250 DWC`, 150, 310,640)
    image.save()
    console.log(rastgele)
    let verifyMsg = await message.channel.send({content:"**Tahmin et & Kazan** Etkinliği başladı. 1-10 arasında gizlenen sayıyı bul ve kazan", files:[new MessageAttachment(image.toBuffer(), 'DWC.png')]});
    let filter = m => Number(m.content) === rastgele;
    verifyMsg.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] }).then(async collected => {
     let result = collected.first();
     result.react("984872633181040660").catch(err => {
         return undefined;
     });
     messageSize=0;
     await coin.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id}, { $inc:{coin: 250}}, { upsert: true })
     message.channel.send({embeds:[new MessageEmbed().setDescription(`${result.author} **Tahmin et & Kazan** Etkinliğinden 250 DWC <:dw_coin:984872633181040660> kazandın ! \n\`.katla, .maden gibi komutlarla DWC coinlerini katlayabilirsin.\` `)]}).catch(err => {
         return undefined;
     });
   verifyMsg.delete();
 }).catch(async err => {
     message.channel.send({content:`Kimse yazmadığı için işlem iptal edildi!`});
     messageSize=0;
     verifyMsg.delete().catch(err => {
         return undefined;
     });
 });
  }
  }
}

module.exports = SayıyıBul