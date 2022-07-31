const { Client, CommandInteraction } = require("discord.js");
const {bannerURL} = require("../../Helpers/function")
module.exports = {
    name: "banner",
    description: "Bannerinizi Büyütün",
    type: 'CHAT_INPUT',
    options: [{
        name: 'uye',
        type: 'USER',
        required: true,
        description: 'banner için üye etiketlemelisin'
      },],

    run: async (client, interaction) => {
        const member = interaction.options.getMember('uye') ||  interaction.member;
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