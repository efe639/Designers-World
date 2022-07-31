const Canvas = require("canvas")
const {MessageEmbed,MessageAttachment} = require("discord.js")

class Ship extends Command {
    constructor(client) {
        super(client, {
            name: "ship",
            aliases: ["aşkölç","aşkölçer"],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
            channel: ["980373416542617621"],
        });
    }
    async run(client, message, args) {
        let person =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members.cache
           .filter(m => m.id !== message.author.id) 
           .random();

           
        }
        person = message.guild.members.cache.get(person.id)

        var love;
        if(message.author.id == config.root){
        love =  100;

        }else{
         love = Math.random() * 100;

        }
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        let emoticon;
        if (love > 60) {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429'); 
        } else if (love >= 40) {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529'); 
        } else {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900'); 
        }
        const canvas = Canvas.createCanvas(384, 128);
        const ctx = canvas.getContext('2d');
        const emotes = await Canvas.loadImage(emoticon);
        const Ship1 = await Canvas.loadImage(message.member.displayAvatarURL({ format: "png" }));
        const Ship2 = await Canvas.loadImage(person.displayAvatarURL({ format: "png" }));
        ctx.beginPath();
        ctx.moveTo(0 + Number(10), 0);
        ctx.lineTo(0 + 384 - Number(10), 0);
        ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
        ctx.lineTo(0 + 384, 0 + 128 - Number(10));
        ctx.quadraticCurveTo(
        0 + 384,
        0 + 128,
        0 + 384 - Number(10),
        0 + 128
        );
        ctx.lineTo(0 + Number(10), 0 + 128);
        ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
        ctx.lineTo(0, 0 + Number(10));
        ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 384, 128);
        let background = await Canvas.loadImage(message.guild.bannerURL({dynamic: true, format: "png"}) + `?size=4096`);
        ctx.drawImage(background, 0, 0, 384, 129);
        ctx.drawImage(emotes, 160, 30, 64, 64);
        ctx.drawImage(Ship1, 20, 20, 96, 96);
        ctx.drawImage(Ship2, 270, 20, 96, 96);
        const img = new MessageAttachment(canvas.toBuffer(), 'ship.png')
        const embed = new MessageEmbed()
            .setColor("RED")
            .addField(`☁ **${person.displayName}** seni **${message.member.displayName}** Çok Mu Seviyor?`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send({content: `${person}`,embeds: [embed.setImage("attachment://ship.png")], files: [img]});
 
        
    }
}

module.exports = Ship