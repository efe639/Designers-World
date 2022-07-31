const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require("moment");
const {checkDays} = require("../../Helpers/function")
module.exports = {
    name: "Banner",
    description: "Kullanıcı bilgilerini gösterir",
    type: 'USER',


    run: async (client, interaction) => {
const member = await interaction.guild.members.cache.get(interaction.targetId);
const approval = await client.api.users(member.id).get();
if(approval.banner == null || approval== undefined) return;
let bannerurl = await bannerURL(approval.id,client)

const button = new Discord.MessageActionRow()
.addComponents(new Discord.MessageButton()
          .setLabel("Banner URL")
          .setStyle("LINK")
          .setURL(bannerurl))
await interaction.followUp({ content: bannerurl, components:[button] });
    },
};