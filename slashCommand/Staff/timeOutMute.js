const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")
const config = require("../../config")

const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const {turkishDate} = require("../../Helpers/function")
module.exports = {
    name: "mute",
    description: "Kullanıcıyı Susturur",
    type: 'CHAT_INPUT',
    options: [{
        name: 'uye',
        type: 'USER',
        required: true,
        description: 'Susturmak için üye etiketlemelisin'
      },{
        name: 'sure',
        type: 'STRING',
        required: true,
        description: 'Bir süre giriniz. (1m, 1h, 1d, 1w)'
      },{
        name: 'sebep',
        type: 'STRING',
        required: true,
        description: 'Geçerli bir sebep giriniz.'
      }],

    run: async (client, interaction) => {
      const embed = new MessageEmbed().setColor(config.Embeds.embedColor).setAuthor({name: interaction.member.user.tag,  iconURL:interaction.member.user.avatarURL({ dynamic: true })}).setTimestamp().setFooter({text: config.Embeds.embedFooter})

        const member = await interaction.options.getMember('uye');
        const sebep = await interaction.options.getString('sebep');
        const time = await interaction.options.getString('sure');

        if(member.id == interaction.member.id) return interaction.followUp({content:emojiler.uyari+" **Kendi** üstüne işlem uygulamana izin veremem.",  ephemeral: true, fetchReply: true });
        if(owners.includes(member.id) || member.id == root) return interaction.followUp({content:emojiler.uyari+" **Kurucular** üstüne işlem uygulamana izin veremem", ephemeral: true, fetchReply: true });
        if(member.bot) return interaction.followUp({content:emojiler.uyari+" **Botlar** üstüne işlem uygulamana izin veremem", ephemeral: true, fetchReply: true });
        if(!member.manageable) return interaction.followUp({content:`${emojilrt.uyari} İşlem uygulamak istediğiniz kullanıcıya her hangi bir işlem uygulamaya yetkim yetmiyor`, ephemeral: true, fetchReply: true });
        let susturmasüresi = member.communicationDisabledUntilTimestamp || 0
        let şimdikizaman = Date.now();
       if (susturmasüresi > şimdikizaman) return  interaction.followUp({content:`${emojilrt.uyari} Susturmak istediğiniz kullanıcı zaten susturulmuş gözüküyor.`, ephemeral: true, fetchReply: true });
        const sure = time ? ms(time) :  604800000;
        const reason = sebep || `${interaction.member.user.username} Tarafından Susturuldu. (Sebeb Girilmedi)`
        await member.timeout(sure,reason)
        await interaction.guild.channels.cache.get("980429446437797898").send({embeds:[embed.setDescription(`${member}, ${interaction.member} (\`${interaction.member.user.username}\`) tarafından **${reason}** sebebiyle ${turkishDate(sure)} boyunca zaman aşımına maruz bırakıldı.`)]})
        await interaction.followUp({content:`${member}, ${interaction.member} tarafından **${reason}** sebebiyle ${turkishDate(sure)} boyunca ses ve yazılı kanallarda susturuldu.`})
    },
};