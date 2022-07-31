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
    if(messageSize == 477)
    {
      kod = makeid(9)
     messageSize = 0;
     let fotolar = ["https://cdn.discordapp.com/attachments/987613116600827935/987624563049365534/Baslksz-1.png"]
     let rand = fotolar[Math.floor(Math.random()* fotolar.length)]
     const avatar = await loadImage(message.author.avatarURL({format: "jpg"}));
   const background = await loadImage(rand);            
   const image = new Canvas(640, 320)
   .printImage(background, 0, 0, 640, 320)
   .setTextFont('48px Arial Black')
   .setColor("#fff")
   .printText(`[ ${kod} ]`, 150, 250,640)
   image.save()
   let verifyMsg = await message.channel.send({content:"**Hızlı olan kazansın** Resimdeki sayıyı ilk sen yaz ve 500 DWC <:dw_coin:984872633181040660> Kazan!", files:[new MessageAttachment(image.toBuffer(), 'DWC.png')]});
   console.log(kod)
   let filter = m => m.content === kod;
   verifyMsg.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] }).then(async collected => {
    let result = collected.first();
    result.react("984872633181040660").catch(err => {
        return undefined;
    });
    messageSize=0;
    await coin.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id}, { $inc:{coin: 500}}, { upsert: true })
    message.channel.send({embeds:[new MessageEmbed().setDescription(`${result.author} **Hızlı olan kazansın** Etkinliğinden 500 DWC <:dw_coin:984872633181040660> kazandın ! \n\`.katla, .maden gibi komutlarla DWC coinlerini katlayabilirsin.\` `)]}).catch(err => {
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
function makeid(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}
module.exports = SayıyıBul