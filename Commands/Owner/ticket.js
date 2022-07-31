const {MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")
class ÖzelKomut extends Command {
    constructor(client) {
        super(client, {
            name: "ticket",
            aliases: ["tckt"],
            ownerOnly:true,
        });
    }
    async run(client, message, args,embed) {
        const butonlar = await new MessageActionRow()
.addComponents(
    await new MessageButton()
    .setCustomId("serverSupport")
    .setEmoji("981281370330517585")
    .setLabel("Sunucu Destek")
    .setStyle("SECONDARY"),
    await new MessageButton()
    .setCustomId("coinİnfo")
    .setEmoji("981281413573795970")
    .setLabel("DWC İnfo")
    .setStyle("SECONDARY"),
)
message.channel.send({embeds:[await new MessageEmbed()
    .setAuthor({name:"Designers World Ticket", iconURL:message.guild.iconURL()})
    .setDescription(`Ticket açmak için aşşağıda ki butonları kullanabilirsiniz.`)
], components:[butonlar]})
    }
    }


module.exports = ÖzelKomut
