const {Formatters} = require("discord.js")
class Cihaz extends Command {
    constructor(client) {
        super(client, {
            name: "cihaz",
            aliases: ["c"],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
        let oc = message.mentions.users.first() || await client.fetchUser(args[0]) || message.author;
        if(!oc) return;
        oc = message.guild.members.cache.get(oc.id)
        if(oc.presence.status == 'offline') return message.reply({content:`${oc} şuanda çevrimdışı`})
       const cihaz = Object.keys(oc.presence.clientStatus).map(x=> x.replace("mobile","Telefon").replace("web","Web Tarayıcı").replace("desktop","Pc")).join(", ")
       message.reply({content:`${oc}, şuanda aşağıda bulunan cihazlardan giriş yapmış durumda. ${Formatters.codeBlock("fix", cihaz)}`})
    }
}

module.exports = Cihaz