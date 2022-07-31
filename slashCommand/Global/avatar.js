const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Avatarınızı Büyütün",
    type: 'CHAT_INPUT',
    options: [{
        name: 'uye',
        type: 'USER',
        required: true,
        description: 'Kayıt için üye etiketlemelisin'
      },],

    run: async (client, interaction) => {
        const member = interaction.options.getMember('uye') ||  interaction.member;
        const avatar = member.user.avatarURL({ dynamic: true, size: 2048 })
        const button = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
                  .setLabel("Avatar URL")
                  .setStyle("LINK")
                  .setURL(avatar))
        const KullaniciAvatar = new Discord.MessageEmbed()
            .setColor("2fc893")
            .setImage(avatar)
        await interaction.followUp({ content: avatar, components:[button] });
       
    },
};