const coin = require("../../Models/dw");

class Katla extends Command {
    constructor(client) {
        super(client, {
            name: "katla",
            aliases: ['Katla', 'cf'],
            description: ["Girilen Değeri 2ye katlamak için yazı tura oynar"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
        const member = await message.member;
        const miktar = args[0];
        if(!miktar) return message.channel.send({content:"Miktar girmeden oyun başlamaz"}).then(x=> setTimeout(() => {
            x.delete()
        }, 5000*2))
        if(!Number(miktar)) return message.channel.send({content:"Girilen değer sayı olmalıdır."}).then(x=> setTimeout(() => {
            x.delete()
        }, 5000*2))
        if(miktar > 1000) return message.channel.send({content:"Girilen değer `1000-10` arasında olmalıdır"}).then(x=> setTimeout(() => {
            x.delete()
        }, 5000*2))
        const c = await coin.findOne({guildID: message.guild.id, userID: member.id});
        const totalCoin = c ? c.coin : 0;
        if(totalCoin < 0) return message.channel.send({content:"Hiç Coinin Bulunmamaktadır."}).then(x=> setTimeout(() => {
            x.delete()
        }, 5000*2))
        let rastgele = Math.floor(Math.random() * (2- 0)) + 0;
        message.channel.send({content:"**Katla Kazan** Para fırlatıldı iyi şanslar ! <a:dw_coinflip:987605041500291074>"}).then(async x=> {
setTimeout(async () => {
    if(rastgele == 1) {
       await x.edit({content:`**Katla Kazan** Oyunu Kazandın! \`${miktar*2}\` adet DWC <:dw_coin:984872633181040660> Hesabına Eklendi.`})
        await coin.findOneAndUpdate({guildID: message.guild.id, userID: member.id}, { $inc:{coin: miktar}}, { upsert: true })
    }
    else {
        await x.edit({content:`**Katla Kazan** Oyunu Kaybettin! \`${miktar}\` adet DWC <:dw_coin:984872633181040660> Hesabından alındı. `})
        await coin.findOneAndUpdate({guildID: message.guild.id, userID: member.id}, { $inc:{coin: -miktar}}, { upsert: true })
   
    }
}, 5000);
        })

    }
}

module.exports = Katla