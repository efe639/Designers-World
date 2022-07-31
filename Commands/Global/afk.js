const Users = require("../../Models/Users");
class Afk extends Command {
    constructor(client) {
        super(client, {
            name: "afk",
            aliases: ["afk", 'uzakta'],
            description: ["<sebep>"],
            cooldown: 15,
            category: "Global",
        });
    }
    async run(client, message, args, embed) {
        const reason = args.join(" ") || "Sebep Belirtilmedi";
        const content = reason.toLocaleLowerCase().trim();
        const erk = await Users.findOne({ userID: message.author.id }) || []
        if (erk.AfkStatus) return message.channel.send("Zaten klavyeden uzakta modundasın!")
        if ( urlEngel.test(reason) || inviteEngel.test(reason)) {
            if (message) message.delete()
            return message.channel.send({ embeds: [embed.setDescription(`Afk sebebi küfür, link veya discord linki içeremez ${emojiler.dikkat}`)] })
        } else {
            if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`)
            await Users.findOneAndUpdate({ userID: message.author.id }, { $set: { AfkStatus: { reason, date: Date.now() } } }, { upsert: true });
            message.channel.send({ embeds: [new Discord.MessageEmbed().setColor("2fc893").setTitle("Klavyeden Uzakta!").setDescription(`${message.author} adlı kullanıcı **${reason}** sebebi ile klavyeden uzakta modunda!`)] })
        }

    }
};

module.exports = Afk