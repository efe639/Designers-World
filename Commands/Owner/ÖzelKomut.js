class ÖzelKomut extends Command {
    constructor(client) {
        super(client, {
            name: "ÖzelKomut",
            aliases: ["ozelk","özelkomut","ozelkomut","ok","ök"],
            perm: ["980373380727472169","980397412873027614","980373382539411457","980373383634096178"],
        });
    }
    async run(client, message, args,embed) {
     message.channel.send({embeds:[embed.setDescription(`${Discord.Formatters.codeBlock("fix",require("../../perms").Perms.map(x=> `.${x.commands} @Approval/ID (${x.permissions.map(x=> `${message.guild.roles.cache.get(x).name}`).join(", ")})`).join("\n"))}`)]})
    }
    }


module.exports = ÖzelKomut
