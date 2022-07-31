const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {

const slashCommands = await globPromise(`${process.cwd()}/slashCommand/*/*.js`);  
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
      if (!file?.name) return;
    client.slashCommands.set(file.name, file)
      if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  console.log(arrayOfSlashCommands)
client.on("ready", async () => {
  setTimeout(x=> {
  client.guilds.cache.get(config.guildID).commands.set(arrayOfSlashCommands);
    console.log(`${client.guilds.cache.get(config.guildID).name}` +' için Slash Komutlar yüklendi.');
  }, 1200)
  });
  

client.on("interactionCreate", async (interaction) => {    

if (interaction.isCommand()) {
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
  cmd.run(client, interaction, args);
}

if (interaction.isContextMenu()) {
  await interaction.deferReply({ ephemeral: false });
  const command = client.slashCommands.get(interaction.commandName);
  if (command) command.run(client, interaction);
}

});

};
