const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")
const config = require("../../config")

const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const {turkishDate} = require("../../Helpers/function")
module.exports = {
    name: "unmute",
    description: "Kullanıcıyı Susturur",
    type: 'CHAT_INPUT',
    options: [{
        name: 'uye',
        type: 'USER',
        required: true,
        description: 'Susturmayı kaldırmak için bir üye etiketlemelisin'
      },{
        name: 'sebep',
        type: 'STRING',
        required: true,
        description: 'Neden susturmayı kaldırmak istiyorsunuz ?'
      }],

    run: async (client, interaction) => {
      const embed = new MessageEmbed().setColor(config.Embeds.embedColor).setAuthor({name: interaction.member.user.tag,  iconURL:interaction.member.user.avatarURL({ dynamic: true })}).setTimestamp().setFooter({text: config.Embeds.embedFooter})
        const member = await interaction.options.getMember('uye');
        const sebep = await interaction.options.getString('sebep');
        if(member.id == interaction.member.id) return interaction.followUp({content:emojiler.uyari+" **Kendi** üstüne işlem uygulamana izin veremem.",  ephemeral: true, fetchReply: true });
        if(owners.includes(member.id) || member.id == root) return interaction.followUp({content:emojiler.uyari+" **Kurucular** üstüne işlem uygulamana izin veremem", ephemeral: true, fetchReply: true });
        if(member.bot) return interaction.followUp({content:emojiler.uyari+" **Botlar** üstüne işlem uygulamana izin veremem", ephemeral: true, fetchReply: true });
        if(!member.manageable) return interaction.followUp({content:`${emojilrt.uyari} İşlem uygulamak istediğiniz kullanıcıya her hangi bir işlem uygulamaya yetkim yetmiyor`, ephemeral: true, fetchReply: true });
        const sure =  ms("0")
        const reason = sebep || `${interaction.member.user.username} Tarafından Susturulması Kaldırıldı. (Sebeb Girilmedi)`
        await member.timeout(sure,reason)
        await interaction.guild.channels.cache.get("980429446437797898").send({embeds:[embed.setDescription(`${member}, ${interaction.member} (\`${interaction.member.user.username}\`) tarafından **${reason}** sebebiyle uygulanan zaman aşımı sona erdi.`)]})
        await interaction.followUp({content:`${member}, ${interaction.member} tarafından **${reason}** sebebiyle ses ve yazılı kanallarında susturması kaldırıldı.`})
    },
};