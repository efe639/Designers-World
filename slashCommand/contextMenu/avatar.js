const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require("moment");
const {checkDays} = require("../../Helpers/function")
module.exports = {
    name: "Avatar",
    description: "Kullanıcı bilgilerini gösterir",
    type: 'USER',


    run: async (client, interaction) => {
const member = await interaction.guild.members.cache.get(interaction.targetId);
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