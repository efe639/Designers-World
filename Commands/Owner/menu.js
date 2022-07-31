const {MessageActionRow, MessageEmbed,MessageSelectMenu, MessageButton} = require("discord.js")
class ÖzelKomut extends Command {
    constructor(client) {
        super(client, {
            name: "menu",
            aliases: ["select"],
            ownerOnly:true,
        });
    }
    async run(client, message, args,embed) {
if(args[0] == "renk"){
    const roller = [
        "980563218906898474",
        "980563297059360808",
        "980563373894799400",
        "980563510255837245",
        "980563585098989619",
        "980563687251259462"
    ]
client.api.channels(message.channel.id).messages.post({
    data: {
        "content": "🇹🇷 Metin kanallarında renginizi değiştirmek isterseniz aşağıdaki bulunan menüden istediğiniz rengi alabilirsiniz. \n\n🇺🇸 If you want to change your color in text channels, choose the color you want from the menu below",
        "components": [
        {
          "type": 1, "components": [{
              "type": 3, "custom_id": "renk", "options": [
                  { "label": message.guild.roles.cache.get(roller[0]).name,  "value": message.guild.roles.cache.get(roller[0]).name },
                  { "label": message.guild.roles.cache.get(roller[1]).name, "value": message.guild.roles.cache.get(roller[1]).name},
                  { "label": message.guild.roles.cache.get(roller[2]).name,"value": message.guild.roles.cache.get(roller[2]).name },
                  { "label": message.guild.roles.cache.get(roller[3]).name, "value": message.guild.roles.cache.get(roller[3]).name },
                  { "label": message.guild.roles.cache.get(roller[4]).name, "value": message.guild.roles.cache.get(roller[4]).name },
                  { "label": message.guild.roles.cache.get(roller[5]).name, "value": message.guild.roles.cache.get(roller[5]).name },
                  { "label": "🗑️","value": "rolsil",}
              ], "placeholder": "Bir renk seç | Select a color", "min_values": 1, "max_values": 1
          }],
        }
        ]
    }
})
}
if(args[0] == "artist"){
    const roller = [
        "980562827884523563",
        "980562862504280154",
        "980562937011916830",
        "980562964916625468",
        "980562995530825839",
        "980563021682323477",
        "980563035854897172"
    ]
client.api.channels(message.channel.id).messages.post({
    data: {
        "content": "🇹🇷 Sahip olduğunuz becerilere göre uygun rollerinizi aşağıda ki menüden seçebilirsiniz. \n\n🇺🇸 Depending on the skills you have, you can select your appropriate roles from the menu below",
        "components": [
        {
          "type": 1, "components": [{
              "type": 3, "custom_id": "artist", "options": [
                  { "label": message.guild.roles.cache.get(roller[0]).name,  "value": message.guild.roles.cache.get(roller[0]).name },
                  { "label": message.guild.roles.cache.get(roller[1]).name, "value": message.guild.roles.cache.get(roller[1]).name},
                  { "label": message.guild.roles.cache.get(roller[2]).name,"value": message.guild.roles.cache.get(roller[2]).name },
                  { "label": message.guild.roles.cache.get(roller[3]).name, "value": message.guild.roles.cache.get(roller[3]).name },
                  { "label": message.guild.roles.cache.get(roller[4]).name, "value": message.guild.roles.cache.get(roller[4]).name },
                  { "label": message.guild.roles.cache.get(roller[5]).name, "value": message.guild.roles.cache.get(roller[5]).name },
                  { "label": message.guild.roles.cache.get(roller[6]).name, "value": message.guild.roles.cache.get(roller[6]).name },
                  { "label": "🗑️","value": "rolsil",}
              ], "placeholder": "Bir rol seç | Select a role", "min_values": 1, "max_values": 3
          }],
        }
        ]
    }
})
}
    }
    }


module.exports = ÖzelKomut
