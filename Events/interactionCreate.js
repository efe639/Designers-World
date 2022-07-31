
const fs = require("fs");
const slash = require("../Helpers/slash")
const { glob } = require("glob");
const { promisify } = require("util");
const { Client, MessageEmbed } = require("discord.js");
const config = require("../config");

const globPromise = promisify(glob);
class interactionCreate {
  Event = "interactionCreate"
  async run(interaction) {
    const embed = new MessageEmbed().setColor(config.Embeds.embedColor).setAuthor({name: interaction.member.user.tag,  iconURL:interaction.member.user.avatarURL({ dynamic: true })}).setTimestamp().setFooter({text: config.Embeds.embedFooter})
if (interaction.isCommand()) {
  if(interaction.channel.id == "980373415301087243") return interaction.followUp({content:"Bu kanala Bu komutları kullanamazsın"})

    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "Böyle Bir \`Slash\` Komutu Bulunamadı." });

    const args = [];
    for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
      option.options?.forEach((x) => {
        if (x.value) args.push(x.value);
    });
    } else if (option.value) args.push(option.value);
  }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    cmd.run(client, interaction, args, embed);
    client.guilds.cache.get(config.guildID).channels.cache.get("980739047439888414").send({embeds:[new MessageEmbed().setDescription(`${interaction.member} Slash Komut Kullandı.${Discord.Formatters.codeBlock("fix",interaction)}`)]})
  }

  if (interaction.isContextMenu()) {
    if(interaction.channel.id == "980373415301087243") return interaction.followUp({content:"Bu kanala Bu komutları kullanamazsın"})

    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction,embed);
    client.guilds.cache.get(config.guildID).channels.cache.get("980739047439888414").send({embeds:[new MessageEmbed().setDescription(`${interaction.member} **${command.name}** adlı uygulama komutunu kullandı`)]})

  }
      
  }
}

module.exports = interactionCreate