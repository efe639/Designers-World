const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")
const config = require("../../config")

const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const {turkishDate} = require("../../Helpers/function")
module.exports = {
    name: "kick",
    description: "Kullanıcıyı sunucudan atar",
    type: 'CHAT_INPUT',
    options: [{
        name: 'uye',
        type: 'USER',
        required: true,
        description: 'Susturmak için üye etiketlemelisin'
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
        if(member.id == interaction.member.id) return interaction.followUp({content:emojiler.uyari+" **Kendi** üstüne işlem uygulamana izin veremem."})
        if(owners.includes(member.id) || member.id == root) return interaction.followUp({content:emojiler.uyari+" **Kurucular** üstüne işlem uygulamana izin veremem"})
        if(member.bot) return interaction.followUp({content:emojiler.uyari+" **Botlar** üstüne işlem uygulamana izin veremem"})
        if(!member.manageable) return interaction.followUp({content:`${emojilrt.uyari} İşlem uygulamak istediğiniz kullanıcıya her hangi bir işlem uygulamaya yetkim yetmiyor`})
        const reason = sebep || `${interaction.member.user.username} Tarafından sunucudan atıldı. (Sebeb Girilmedi)`;
        await member.kick({reason: reason })
        await interaction.guild.channels.cache.get("980429446437797898").send({embeds:[embed.setDescription(`${member}, ${interaction.member} (\`${interaction.member.user.username}\`) tarafından **${reason}** sebebiyle sunucudan **Atıldı.**`)]})
        await interaction.followUp({content:"İşlem Başarılı !"})
          },
};