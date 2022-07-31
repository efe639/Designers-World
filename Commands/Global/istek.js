const {Formatters} = require("discord.js")
class İstek extends Command {
    constructor(client) {
        super(client, {
            name: "istek",
            aliases: ["talep"],
            description: ["İsteğinizi yazın"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
   const istek = await args.join(" ");
   if(!istek) return message.channel.send({content:`İsteğinizi girmeden yetkililere iletemem.`}).then(e => setTimeout(() => e.delete(), 5000));
   if(istek.length < 10) return  message.channel.send({content:`isteğinizi daha detaylı bir şekilde yazınız.`}).then(e => setTimeout(() => e.delete(), 5000));
   await message.guild.channels.cache.get("986548942814732288").send({embeds:[embed.setDescription(`${message.member}, tarafından bir **istek** iletildi. ${Formatters.codeBlock("diff", "- "+istek)}`)]})
    await message.reply({content:"İsteğiniz Yetkililere iletilmiştir."}).then(e => setTimeout(() => e.delete(), 5000));
    await message.delete();
    }
}

module.exports = İstek