const Discord = require("discord.js");
const permConf = require("../perms")
const ayar = require("../config");
const config = require("../config");
const {MessageActionRow, MessageButton, MessageEmbed, Formatters} = require("discord.js")

class modalSubmit {
  Event = "modalSubmit"
  async run(modal) {
    if(modal.customId === 'istekonerisikayet') {
      const mesaj = modal.getTextInputValue('mesaj');
      const tur = modal.getSelectMenuValues('tur');
      await modal.reply({ content: `İletildi !`}) 
     modal.guild.channels.cache.get("986548942814732288").send({embeds:[ await new MessageEmbed().setDescription(`${modal.user}, size bir **${tur}** iletti. ${Formatters.codeBlock("fix",mesaj)}`)]})
    }  
    if(modal.customId == "yetkilibasvuru"){
      const isimyas = modal.getTextInputValue('isimyas');
      const gunlukinvite = modal.getTextInputValue('gunlukinvite');
      const gunlukaktiflik = modal.getTextInputValue('gunlukaktiflik');
      const onceyetkili = modal.getTextInputValue('dahaonceyetkiliolmusmu');
      const info = modal.getTextInputValue('userinfo');
      const link = modal.getTextInputValue('link');
      modal.guild.channels.cache.get("992096376244686978").send({embeds:[await new MessageEmbed().setTitle("Yeni Başvuru")
    .setDescription(`${modal.user} Yetkili formu iletti.
**Form**
\`İsim & Yaş\`: **${isimyas}**

\`Günlük İnvite\`: **${gunlukinvite}**

\`Günlük Aktiflik\`: **${gunlukaktiflik}**

\`Tasarım Portfolyonu Gösteren Herhangi Bir Site\`: **[Tıkla](${link})**

\`Hakkında\`; ${Formatters.codeBlock("fix", `${info}`)}
`)
]})
await modal.reply({ content: `${modal.user} Başvurun Alındı.`, ephemeral: true})

    }
  }
}

module.exports = modalSubmit