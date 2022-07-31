﻿const coin = require("../../Models/dw");

class Maden extends Command {
    constructor(client) {
        super(client, {
            name: "Maden",
            aliases: ['maden', 'kaz'],
            description: ["Girilen Değeri madenden toplamaya çalışır"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
        const member = await message.member;
        const miktar = args[0];
        if(!miktar) return message.channel.send({content:"Miktar girmeden kazı işlemi başlamaz"}).then(x=> setTimeout(() => {
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
        let rastgele = Math.floor(Math.random() * (2 - 0)) + 0;
        message.channel.send({content:"**Maden** kazısı başladı <a:dw_kazma:987608053140570162> (`Süre: 10 Saniye`)"}).then(async x=> {
setTimeout(async () => {
    if(rastgele == 1) {
       await x.edit({content:`**Kazı işlemi Başarılı** Madenler bulundu ve ${miktar*2} fiyatına satıldı. ${miktar*2} Adet DWC <:dw_coin:984872633181040660> hesabına eklendi.`})
        await coin.findOneAndUpdate({guildID: message.guild.id, userID: member.id}, { $inc:{coin: miktar}}, { upsert: true })
    }
    else {
        await x.edit({content:`**Kazı işlemi Başarısız** Maden bulunamadı. ${miktar} DWC <:dw_coin:984872633181040660> hesabınızdan Alındı.`})
        await coin.findOneAndUpdate({guildID: message.guild.id, userID: member.id}, { $inc:{coin: -miktar}}, { upsert: true })
   
    }
}, 1000*10);
        })

    }
}

module.exports = Maden