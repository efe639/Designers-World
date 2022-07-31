const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const {MessageEmbed, Formatters, Util} = require("discord.js")
const {turkishDate} = require("../../Helpers/function")
class Tags extends Command {
    constructor(client) {
        super(client, {
            name: "tagsay",
            aliases: ["tags", 'ts'],
            description: ["tag"],
            category: "Staff",
            cooldown: 15,
            perm:["980373380727472169","980397412873027614","980373381855719435","980373382539411457","980373383634096178","980373384477175848"]
        });
    }
    async run(client, message, args, embed) {
       const tagTürü = await args[0]
       if(tagTürü == "isim"){
        const tag = await args[1]
        const taglısayı =message.guild.members.cache.filter(x=> !x.user.bot && x.user.username.includes(tag)).size
        const taglılar =message.guild.members.cache.filter(x=> !x.user.bot && x.user.username.includes(tag)).map(x=> `${x.user.username} - ID ${x.user.id}`).join('\n').toString()
        const arr = Discord.Util.splitMessage(taglılar, { maxLength: 1950, char: "\n" });
        message.channel.send({embeds:[new MessageEmbed().setDescription(`\`${tag}\` Tagında bulunan kullanıcılar aşağıda listelenmiştir. Toplam **${taglısayı}** kullanıcı bulunuyor.`)]})
if(taglısayı > 0){
        arr.forEach(element => {
            message.channel.send({embeds:[new MessageEmbed()
                .setDescription(`${Formatters.codeBlock("fix",element)}`)]})
            });
}
       }
       if(tagTürü == "etiket"){
        const tag = await args[1]
        if(!Number(tag)) return message.channel.send({content:"Girilen tag sayı olmalıdır. **örneğin: #0001**"})
        const taglısayı =message.guild.members.cache.filter(x=> !x.user.bot && x.user.discriminator.includes(tag)).size
        const taglılar =message.guild.members.cache.filter(x=> !x.user.bot && x.user.discriminator.includes(tag)).map(x=> `${x.user.username}#${x.user.discriminator}`).join('\n').toString()

        const arr = await Util.splitMessage(taglılar,{ maxLength: 1950, char: "\n" });
        console.log(arr)
        message.channel.send({embeds:[new MessageEmbed().setDescription(`\`${tag}\` Tagında bulunan kullanıcılar aşağıda listelenmiştir. Toplam **${taglısayı}** kullanıcı bulunuyor.`)]})
   if(taglısayı > 0){
        arr.forEach(element => {
            message.channel.send({embeds:[new MessageEmbed()
                .setDescription(`${Formatters.codeBlock("fix",element)}`)]})
            });
}

//Formatters.codeBlock("fix",message)
       }

    }
}

module.exports = Tags