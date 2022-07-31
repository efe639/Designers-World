
const fs = require("fs");
const slash = require("../Helpers/slash")
const { glob } = require("glob");
const { promisify } = require("util");
const { Client, MessageEmbed } = require("discord.js");
const config = require("../config");
const {MessageActionRow, MessageButton} = require("discord.js")

const globPromise = promisify(glob);
class SelectMenu {
  Event = "interactionCreate"
  async run(interaction) {
    if(!interaction.isSelectMenu())return;
    const menu = await interaction.customId;
    const member = await client.guilds.cache.get(config.guildID).members.cache.get(interaction.member.id)
if(!member) return;
    if(menu === "renk"){
        let color = new Map([
            ["🍓", "980563218906898474"],
            ["🍋","980563297059360808"],
            ["🍊", "980563373894799400"],
            ["🥝","980563510255837245"],
            ["🧊", "980563585098989619"],
            ["🫐", "980563687251259462"],
          ])

          const role = await color.get(interaction.values[0])
          const roller = ["980563218906898474","980563297059360808","980563373894799400","980563510255837245","980563585098989619","980563687251259462"]
          if(member.id != "852800814808694814" && !member.roles.cache.has("946509153160024065")) return interaction.reply({content:"🇹🇷 Metin kanallarında renk değiştirmek için sunucumuza takviye yapmanız gerekiyor. \n\n 🇺🇸 You need to boost our server to change color in text channels", ephemeral:true});
          if(interaction.values[0] === "rolsil"){
            await member.roles.remove(roller)
            return interaction.reply({content:"🇹🇷 Renk rolünüz üzerinizden alındı.\n\n🇺🇸 Your color role has been taken from you.", ephemeral:true});
          }else if (role) {
        if (roller.some(m => member.roles.cache.has(m))){ await member.roles.remove(roller)}
            await member.roles.add(role)
            return interaction.reply({ content: "🇹🇷 Başarılı bir şekilde seçtiğiniz rol üzerinize verildi.\n\n🇺🇸 It was based on the role you have chosen successfully.", ephemeral: true })
          }


    }
    if(menu === "artist"){
        let color = new Map([
            ["Graphic Designer", "980562827884523563"],
            ["Illustrator","980562862504280154"],
            ["Motion Designer", "980562937011916830"],
            ["Photographer","980562964916625468"],
            ["Programmer </>", "980562995530825839"],
            ["UI Designer", "980563021682323477"],
            ["3D Designer", "980563035854897172"],

          ])
          var role = []
          for (let index = 0; index < interaction.values.length; index++) {
            let ids = interaction.values[index]
            let den = color.get(ids)
            role.push(den)
          }
          const roller = [
            "980562827884523563",
            "980562862504280154",
            "980562937011916830",
            "980562964916625468",
            "980562995530825839",
            "980563021682323477",
            "980563035854897172"
        ]
          if(interaction.values[0] === "rolsil"){
            await member.roles.remove(roller)
            return interaction.reply({content:"🇹🇷 Yetenek rolünüz üzerinizden alındı.\n\n🇺🇸 Your skills role has been taken from you.", ephemeral:true});
          }else if (role) {
        if (roller.some(m => member.roles.cache.has(m))){await member.roles.remove(roller)}
            await member.roles.add(role)
            return interaction.reply({ content: "🇹🇷 Başarılı bir şekilde seçtiğiniz rol üzerinize verildi.\n\n🇺🇸 It was based on the role you have chosen successfully.", ephemeral: true })
          }


    }
  }
}

module.exports = SelectMenu