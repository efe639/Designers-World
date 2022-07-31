const {createCanvas, loadImage} = require("canvas")
const {MessageEmbed,MessageAttachment} = require("discord.js")
const coin = require("../../Models/dw")
const invite = require("../../Models/Inviter")
const moment = require("moment")
class Coin extends Command {
  constructor(client) {
    super(client, {
      name: "coin",
      aliases: ["Coin"],
      description: ["<@üye/ID>"],

      category: "Global",
      cooldown: 15,
      channel: ["980373416542617621"],
    });
  }
  async run(client, message, args) {
    const member = await message.guild.members.cache.get(args[0]) || message.member
    if(!member) return;
const c = await coin.findOne({guildID: message.guild.id, userID: member.id});
const b = await invite.findOne({guildID: message.guild.id, userID: member.id})
const totalMessage = c ? c.totalMessage : 0;
const totalVoice = c ? c.totalVoice : 0;
const totalInvite = b ? b.regular : 0;
const totalCoin = c ? c.coin : 0;
const totalBoost = c? c.BoostSize : 0
console.log(Number(totalCoin.toFixed(1)))
const sayfa = await createCanvas(728,284);
const katman = await sayfa.getContext("2d")
const arkaplan = await loadImage("https://cdn.discordapp.com/attachments/980181046354116678/985549265680105492/adwwadaw.png");
katman.drawImage(arkaplan, 0, 0, sayfa.width, sayfa.height);

katman.strokeStyle = '#ffffff';
katman.strokeRect(0, 0, sayfa.width, sayfa.height);
let yazıqwe = `${member ? member.user.username : "İsim Bulunamadı"}`
if(yazıqwe.length >= 17) {yazıqwe = `Undefined`}
katman.font ='20px Impact Bold',
katman.fillStyle = '#ffffff';
katman.fillText(`\n\n\n${yazıqwe} DWC Coin`, 20, 5); //bebas neue
katman.font='30px Inter',
katman.fillStyle='#ffffff';
katman.fillText(`${totalMessage} Mesaj`,315,78,180)
katman.font='30px Inter',
katman.fillStyle='#ffffff';
katman.fillText(`${moment.duration(totalVoice).format("H [saat], m [dakika]")}`,505,78,180)
katman.font='30px Inter',
katman.fillStyle='#ffffff';
katman.fillText(`${totalInvite} Davet`,315,220,180)
katman.font='30px Inter',
katman.fillStyle='#ffffff';
katman.fillText(`${totalBoost} Boost`,550,220,180)
katman.font='30px Inter',
katman.fillStyle='#ffffff';
katman.fillText(`${Number(totalCoin.toFixed())} DWC`,400,150,180)
katman.save();
const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }));
katman.drawImage(avatar, 50,44,  195.5, 195.5);
roundedImage(katman, 250, 20, 150, 150, 25);
katman.clip();
katman.closePath();

katman.clip();
message.channel.send({files:[new MessageAttachment(sayfa.toBuffer(), 'DWC.png')]})

  }
}
function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  }
  function yuvarla(sayi,basamak)
  {
      basamak=Math.pow(10,basamak);
      return Math.round(sayi*basamak)/basamak;  
  }
module.exports = Coin