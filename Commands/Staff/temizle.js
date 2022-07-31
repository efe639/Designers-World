const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")

class Sil extends Command {
  constructor(client) {
    super(client, {
      name: "temizle",
      aliases: ['sil', 'temizle'],
      perm:["980373380727472169","980397412873027614","980373381855719435","980373382539411457","980373383634096178","980373384477175848"]

    });
  }
  async run(client, message, args) {
    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) {
      return message.channel.send(`UYARI: En az \`1 - 100\` arasında bir sayı değeri girmelisiniz.`)
    }
    else {
      message.channel.bulkDelete(Number(args[0]), true).then(async msg => {let x = await message.channel.send(`<#${message.channel.id}> kanalında **${msg.size}** adet mesaj başarı ile temizlendi.`)
      setTimeout(() => {if(x)  x.delete();}, mesajSilinmeSüresi.kurucularaİşlem)
    })
    }
  }
}

module.exports = Sil