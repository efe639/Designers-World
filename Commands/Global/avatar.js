class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["av", 'avatar', 'pp'],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
        const victim = message.mentions.users.first() || await client.fetchUser(args[0]) || message.author;
        const avatar = victim.avatarURL({ dynamic: true, size: 2048 })
        const button = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
                  .setLabel("Avatar URL")
                  .setStyle("LINK")
                  .setURL(avatar))
        const KullaniciAvatar = new Discord.MessageEmbed()
            .setColor("2fc893")
            .setImage(avatar)
        await message.reply({ content: avatar, components:[button] });
    }
}

module.exports = Avatar