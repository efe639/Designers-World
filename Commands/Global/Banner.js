const {bannerURL} = require("../../Helpers/function")
class Banner extends Command {
    constructor(client) {
        super(client, {
            name: "banner",
            aliases: ["banner","afiş"],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args, embed) {
    
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const approval = await client.api.users(member.id).get();
        if(approval.banner == null || approval== undefined) return;
        let bannerurl = await bannerURL(approval.id,client)

        const button = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
                  .setLabel("Banner URL")
                  .setStyle("LINK")
                  .setURL(bannerurl))
                  await message.channel.send({ content: `${bannerurl}`, components: [button] })
              
                }
}

module.exports = Banner