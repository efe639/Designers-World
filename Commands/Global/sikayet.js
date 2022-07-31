const {Formatters} = require("discord.js")
class Şikayet extends Command {
    constructor(client) {
        super(client, {
            name: "sikayet",
            aliases: ["şikayet"],
            description: ["şikayet yazın"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
   const istek = await args.join(" ");
   if(!istek) return message.channel.send({content:`şikayetinizi girmeden yetkililere iletemem.`}).then(e => setTimeout(() => e.delete(), 5000));
   if(istek.length < 10) return  message.channel.send({content:`şikayetinizi daha detaylı bir şekilde yazınız.`}).then(e => setTimeout(() => e.delete(), 5000));
   message.guild.channels.cache.get("986548942814732288").send({embeds:[embed.setDescription(`${message.member}, tarafından bir **şikayet** iletildi. ${Formatters.codeBlock("diff", "- "+istek)}`)]})
   await message.reply({content:"Şikayetiiz Yetkililere iletilmiştir."}).then(e => setTimeout(() => e.delete(), 5000));
   await message.delete();    
}
}

module.exports = Şikayet