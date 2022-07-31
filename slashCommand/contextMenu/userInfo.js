const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require("moment");
const {checkDays} = require("../../Helpers/function")
module.exports = {
    name: "User İnfo",
    description: "Kullanıcı bilgilerini gösterir",
    type: 'USER',


    run: async (client, interaction) => {
const mentioned = await interaction.guild.members.cache.get(interaction.targetId);
const TestVoice = mentioned.voice.channel ? `${mentioned.voice.channel} kanalında.` : "**Herhangi bir ses kanalında değil.**";
        const embed = new MessageEmbed();
       
        interaction.followUp({ embeds: [embed.setDescription(` **❯ Kullanıcı bilgisi:**
         ${TestVoice}
         ID: \`${mentioned.id}\`
         Profil: ${mentioned}
         Oluşturma Tarihi: \`${moment(mentioned.user.createdAt).format("LLL")}\`
         (\`${checkDays(mentioned.user.createdAt)}\`)
         
         **❯ Üyelik Bilgisi**
         Sunucu takma adı: \`${mentioned.displayName}\`
         Sunucuya Katılma Tarihi: \`${moment(mentioned.joinedAt).format("LLL")}\`
         (\`${checkDays(mentioned.joinedAt)}\`)
         Ayırıcı Rolü: ${mentioned.roles.cache.array().filter(r => r.hoist).sort((a, b) => b.rawPosition - a.rawPosition)[0] || "Yok"}
`)] });
    },
};