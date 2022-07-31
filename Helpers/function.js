
const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu, Client,Intents } = require("discord.js");
const axios = require("axios")
module.exports = {

  checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " Gün" : " Gün") + " Önce";
  },
  rakam(sayi) {
    var basamakbir = sayi.toString().replace(/ /g, "     ");
    var basamakiki = basamakbir.match(/([0-9])/g);
    basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
    if (basamakiki) {
      basamakbir = basamakbir.replace(/([0-9])/g, d => {
        return {
          '0': `${emojiler.sifir}`,
          '1': `${emojiler.bir}`,
          '2': `${emojiler.iki}`,
          '3': `${emojiler.uc}`,
          '4': `${emojiler.dort}`,
          '5': `${emojiler.bes}`,
          '6': `${emojiler.alti}`,
          '7': `${emojiler.yedi}`,
          '8': `${emojiler.sekiz}`,
          '9': `${emojiler.dokuz}`
        }
        [d];
      })
    }
    return basamakbir;
  },
  sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  },
  timeTR(value) {
    const days = Math.floor(value / 86400000);
    value = value % 86400000;
    const hours = Math.floor(value / 3600000);
    value = value % 3600000;
    const minutes = Math.floor(value / 60000);
    value = value % 60000;
    const seconds = Math.floor(value / 1000);
    return (days ? days + ' gün' : '') + (hours ? hours + ' saat' : '') + (minutes ? minutes + ' dakika' : '') + (seconds ? seconds + ' saniye' : '')
},
 turkishDate (date) {
  if (!date || typeof date !== "number") return;
  const aq = require('pretty-ms');
  let convert = aq(date, { verbose: true })
    .replace("minutes", "dakika")
    .replace("minute", "dakika")
    .replace("hours", "saat")
    .replace("hour", "saat")
    .replace("seconds", "saniye")
    .replace("second", "saniye")
    .replace("days", "gün")
    .replace("day", "gün")
    .replace("years", "yıl")
    .replace("year", "yıl");
  return convert
},
async bannerURL(user, client) {
  const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
  if(!response.data.banner) return "Kullanıcının banneri bulunmamakta!"
  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)

}
}