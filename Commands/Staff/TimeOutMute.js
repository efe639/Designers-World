const {mesajSilinmeSüresi, owners, emojiler, root} = require("../../config")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const {turkishDate} = require("../../Helpers/function")
class TimeOutMute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            aliases: ["ceza", 'sustur', 'timeout'],
            description: ["<@üye/ID>"],
            category: "Staff",
            cooldown: 15,
            perm:["980373380727472169","980397412873027614","980373381855719435","980373382539411457","980373383634096178","980373384477175848"]
        });
    }
    async run(client, message, args, embed) {
        const member = await message.mentions.users.first() || await message.guild.members.cache.get(args[0]);
        if(member.id == message.member.id) return message.channel.send({content:emojiler.uyari+" **Kendi** üstüne işlem uygulamana izin veremem."}).then(x=> setTimeout(() => {if(x)  x.delete();}, mesajSilinmeSüresi.kendiÜstündeİşlem));
        if(owners.includes(member.id) || member.id == root) return message.channel.send({content:emojiler.uyari+" **Kurucular** üstüne işlem uygulamana izin veremem"}).then(x=> setTimeout(() => {if(x)  x.delete();}, mesajSilinmeSüresi.kurucularaİşlem));
        if(member.bot) return message.channel.send({content:emojiler.uyari+" **Botlar** üstüne işlem uygulamana izin veremem"}).then(x=> setTimeout(() => {if(x)  x.delete();}, mesajSilinmeSüresi.botÜstündeİşlem));
        if(!member.manageable) return message.channel.send({content:`${emojilrt.uyari} İşlem uygulamak istediğiniz kullanıcıya her hangi bir işlem uygulamaya yetkim yetmiyor`}).then(x=> setTimeout(() => {if(x)  x.delete();}, mesajSilinmeSüresi.kurucularaİşlem));
        const sure = args[1] ? ms(args[1]) :  604800000;
        const reason = args.splice(2).join(" ") || `${message.member.user.username} Tarafından Susturuldu. (Sebeb Girilmedi)`
        await member.timeout(sure,reason)
        await message.guild.channels.cache.get("980429446437797898").send({embeds:[embed.setDescription(`${member}, ${message.member} (\`${message.member.user.username}\`) tarafından **${reason}** sebebiyle ${turkishDate(sure)} boyunca zaman aşımına maruz bırakıldı.`)]})
    }
}

module.exports = TimeOutMute