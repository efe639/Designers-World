const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")
const config = require("../../config")

const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const {turkishDate} = require("../../Helpers/function")
module.exports = {
    name: "Karşı Cinse Taciz",
    description: "Karşı Cinse Taciz ve Rahatsız Edici Davranış - 20 Dk",
    type: 'MESSAGE',
  /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction,args) => {
      const embed = new MessageEmbed().setColor(config.Embeds.embedColor).setAuthor({name: interaction.member.user.tag,  iconURL:interaction.member.user.avatarURL({ dynamic: true })}).setTimestamp().setFooter({text: config.Embeds.embedFooter})
      let kanal =interaction.guild.channels.cache.get(interaction.channelId)
      let msg = await kanal.messages.fetch(interaction.targetId)
      let message = msg
      const member = message.member
        if(member.id == interaction.member.id) return interaction.followUp({content:emojiler.uyari+" **Kendi** üstüne işlem uygulamana izin veremem.",  ephemeral: true });
        if(owners.includes(member.id) || member.id == root) return interaction.followUp({content:emojiler.uyari+" **Kurucular** üstüne işlem uygulamana izin veremem", ephemeral: true });
        if(member.bot) return interaction.followUp({content:emojiler.uyari+" **Botlar** üstüne işlem uygulamana izin veremem", ephemeral: true });
        if(!member.manageable) return interaction.followUp({content:`${emojilrt.uyari} İşlem uygulamak istediğiniz kullanıcıya her hangi bir işlem uygulamaya yetkim yetmiyor`, ephemeral: true });
        let susturmasüresi = member.communicationDisabledUntilTimestamp || 0
        let şimdikizaman = Date.now();
       if (susturmasüresi > şimdikizaman) return  interaction.followUp({content:`${emojilrt.uyari} Susturmak istediğiniz kullanıcı zaten susturulmuş gözüküyor.`, ephemeral: true });
        const sure =600000*2;
        const reason =`${interaction.member.user.username} Tarafından Susturuldu.`
        await member.timeout(sure,reason)
        await interaction.guild.channels.cache.get("980429446437797898").send({embeds:[embed.setDescription(`${member}, ${interaction.member} (\`${interaction.member.user.username}\`) tarafından **Karşı Cinse Taciz ve Rahatsız Edici Davranış** sebebiyle ${turkishDate(sure)} boyunca zaman aşımına maruz bırakıldı.`)]})
        await interaction.followUp({content:`${member}, ${interaction.member} tarafından **Karşı Cinse Taciz ve Rahatsız Edici Davranış** sebebiyle ${turkishDate(sure)} boyunca ses ve yazılı kanallarda susturuldu.`})
    },
};