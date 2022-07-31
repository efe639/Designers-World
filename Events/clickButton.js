
const fs = require("fs");
const slash = require("../Helpers/slash")
const { glob } = require("glob");
const { promisify } = require("util");
const { Client, MessageEmbed } = require("discord.js");
const config = require("../config");
const {MessageActionRow, MessageButton} = require("discord.js")
const { Modal, TextInputComponent, SelectMenuComponent, showModal }= require("discord-modals")

const globPromise = promisify(glob);
class clickButton {
  Event = "interactionCreate"
  async run(interaction) {
    if(!interaction.isButton()) return;

    let bilgilendirme = new  MessageButton()
    .setEmoji("981281413573795970")
    .setCustomId("bilgilendir")
    .setLabel("Bilgilendirme")
    .setStyle("SECONDARY")

    let kapat = new MessageButton()
    .setEmoji("981281321156481064")
    .setCustomId("kapat")
    .setLabel("Kapat")
    .setStyle("SECONDARY")

    let butonlar = new MessageActionRow()
    .addComponents(bilgilendirme)
    .addComponents(kapat)

    if(interaction.customId == 'serverSupport') {
        if(interaction.guild.channels.cache.find((ch) => ch.name == interaction.user.id)) return;
        interaction.guild.channels.create(interaction.user.username, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                { id: interaction.guild.roles.everyone, deny: ["VIEW_CHANNEL","SEND_MESSAGES"],
                },
                { id: interaction.member.user.id, allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
                },
                { id: "980373382539411457", allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
                },
                { id: "980373383634096178", allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
                },
                { id: "980397412873027614", allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
                },
                { id: "980373380727472169", allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
                }
            ]
        }).then(async kanal => {
          let embed = new MessageEmbed()
          .setTitle("Server Support")
          .setDescription("Sunucumuz hakkında herşeyi buradan öğrenebilirsiniz.")
          .setColor("BLACK")
      
          await  kanal.send({content:"<@&980373382539411457>, <@"+ interaction.member+">",embeds: [embed], components: [butonlar]})
          await kanal.setParent('984363442876059728', { lockPermissions:false })
        })
        interaction.reply({embeds: [new MessageEmbed().setTitle("Ticket Oluşturuldu").setDescription("Sunucu Hakkında Gerekli Bilgileri Yetkililerimiz Size Vericektir.").setColor("GREEN")], ephemeral: true})
    }
    if(interaction.customId == 'coinİnfo') {
      if(interaction.guild.channels.cache.find((ch) => ch.name == interaction.user.id)) return;
      interaction.guild.channels.create(interaction.user.username, {
          type: 'GUILD_TEXT',
          permissionOverwrites: [
              {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL","SEND_MESSAGES"],
              },
              {
                  id: interaction.user.id,
                  allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
              },
              {
                  id: "980373382539411457",
                  allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
              },
              {
                  id: "980373383634096178",
                  allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
              }
              ,
              {
                  id: "980397412873027614",
                  allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
              },
              {
                  id: "980373380727472169",
                  allow: ["VIEW_CHANNEL","SEND_MESSAGES"],
              }
          ]
      }).then(async kanal => {
        let embed = new MessageEmbed()
        .setTitle("DWC")
        .setDescription("Designers World Coin Sistemi hakkında gereli bilgileri yetkililerimiz size vericektir.")
        .setColor("BLACK")
    
        await  kanal.send({content:"<@&980373382539411457>, <@"+ interaction.member+">",embeds: [embed], components: [butonlar]})
        await kanal.setParent('984363442876059728', { lockPermissions:false })
    })
      interaction.reply({embeds: [new MessageEmbed().setTitle("Ticket Oluşturuldu").setColor("GREEN")], ephemeral: true})
  }
    if(interaction.customId == 'kapat') {
      await interaction.channel.delete()
    }
    if(interaction.customId == 'bilgilendir') {
        interaction.reply({embeds: [new MessageEmbed().setDescription("DWC hakkında yetkililerimiz tarafından bilgi alabilirsiniz.").setColor("DARK_AQUA")]})
    }
    if(interaction.customId == "isteksikayetoneri"){
        const modal = new Modal() 
        .setCustomId('istekonerisikayet')
        .setTitle('İstek - Öneri - Şikayet')
        .addComponents(
                
          new SelectMenuComponent()
          .setCustomId('tur')
          .setPlaceholder('Menüden bir seçenek seçiniz')
          .addOptions(
            {
                label: "İstek",
                description: null,
                value: "istek",
              },   
                 {
                label: "Öneri",
                description: null,
                value: "oneri",
              },
              {
                label: "Şikayet",
                description: null,
                value: "sikayet",
              },
          ),
          new TextInputComponent()
          .setCustomId('mesaj')
          .setLabel('Lütfen Buraya Yazınız')
          .setStyle('SHORT')
          .setPlaceholder('Bizim için değerlisiniz.')
          .setRequired(true),
    
        );
        showModal(modal, {
            client: client, 
            interaction: interaction 
          });
    }
    if(interaction.customId == "yetkilibasvuru"){
        const modal = new Modal() 
        .setCustomId('yetkilibasvuru')
        .setTitle('Yetkili Başvuru')
        .addComponents(
            new TextInputComponent()
            .setCustomId('isimyas')
            .setLabel('İsminiz & Yaşınız')
            .setStyle('SHORT')
            .setPlaceholder('Örneğin: Mehmet 19')
            .setRequired(true),            
            new TextInputComponent()
            .setCustomId('gunlukinvite')
            .setLabel('Günde kaç invite yaparsınız')
            .setStyle('SHORT')
            .setPlaceholder('Örneğin: 10/20/50')
            .setRequired(true),           
             new TextInputComponent()
            .setCustomId('gunlukaktiflik')
            .setLabel('Günde kaç saat aktifsin')
            .setStyle('SHORT')
            .setPlaceholder('Örneğin: 2/4/8 Saat')
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('link')
            .setLabel('Tasarım Portfolyonu Gösteren Bir Site')
            .setStyle('SHORT')
            .setPlaceholder('Link Giriniz')
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('userinfo')
            .setLabel('Bize kendin hakkında bilgi ver')
            .setStyle('SHORT')
            .setPlaceholder('Örneğin: Yazılımla uğraşmayı severim')
            .setRequired(true),
        )
        showModal(modal, {
            client: client, 
            interaction: interaction 
          });
    }
  }
}

module.exports = clickButton